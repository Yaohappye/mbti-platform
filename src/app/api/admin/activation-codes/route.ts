import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/server/auth";
import { getDatabaseAdmin } from "@/lib/server/database";
import {
  getRequestIp,
  getRequestUserAgent,
} from "@/lib/server/request-context";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function clean(value: unknown) {
  return String(value || "").trim();
}

function randomCode() {
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  let value = Array.from(bytes, (byte) => CHARS[byte % CHARS.length]).join("");
  if (!/[A-Z]/.test(value)) value = `A${value.slice(1)}`;
  if (!/\d/.test(value)) value = `${value.slice(0, -1)}1`;
  return value;
}

function unauthorized() {
  return NextResponse.json(
    { code: 401, message: "请先登录平台后台", data: null },
    { status: 401 },
  );
}

async function listCodes() {
  const db = getDatabaseAdmin();
  const { data: codes, error } = await db
    .from("activation_codes")
    .select(
      "id,code,kind,label,total_uses,remaining_uses,status,created_at,updated_at,expires_at",
    )
    .eq("scope", "personal")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);

  const ids = (codes || []).map((item) => item.id);
  let events: Array<Record<string, unknown>> = [];
  if (ids.length > 0) {
    const { data, error: eventError } = await db
      .from("activation_code_events")
      .select(
        "activation_code_id,event_type,before_remaining_uses,after_remaining_uses,created_at,details",
      )
      .in("activation_code_id", ids)
      .order("created_at", { ascending: true });
    if (eventError) throw new Error(eventError.message);
    events = data || [];
  }

  return (codes || []).map((item) => {
    const itemEvents = events.filter(
      (event) => event.activation_code_id === item.id,
    );
    const lastUse = [...itemEvents]
      .reverse()
      .find((event) => event.event_type === "consumed");
    const voidEvent = [...itemEvents]
      .reverse()
      .find((event) => event.event_type === "voided");

    return {
      id: item.id,
      code: item.code,
      kind: item.kind,
      label: item.label || "个人激活码",
      totalUses: item.total_uses,
      remainingUses: item.remaining_uses,
      status: item.status,
      createdAt: item.created_at,
      usedAt: lastUse?.created_at || null,
      voidedAt: voidEvent?.created_at || null,
      expiresAt: item.expires_at,
      useLogs: itemEvents
        .filter((event) => event.event_type === "consumed")
        .map((event, index) => ({
          usedAt: event.created_at,
          useIndex: index + 1,
          beforeRemainingUses: event.before_remaining_uses,
          afterRemainingUses: event.after_remaining_uses,
        })),
    };
  });
}

async function logAdmin(
  request: NextRequest,
  adminId: string,
  operation: string,
  targetId: string,
  details: Record<string, unknown> = {},
) {
  const db = getDatabaseAdmin();
  await db.from("admin_operation_logs").insert({
    admin_type: "platform",
    admin_id: adminId,
    operation,
    target_type: "activation_code",
    target_id: targetId,
    details,
    ip_address: getRequestIp(request),
    user_agent: getRequestUserAgent(request),
  });
}

export async function GET(request: NextRequest) {
  try {
    const session = await requireAdminSession(request, "platform");
    if (!session) return unauthorized();
    const list = await listCodes();

    return NextResponse.json({
      code: 0,
      message: "success",
      data: {
        list,
        stats: {
          total: list.length,
          active: list.filter((item) => item.status === "active").length,
          used: list.filter((item) => item.status === "used").length,
          voided: list.filter((item) => item.status === "voided").length,
        },
      },
    });
  } catch (error) {
    console.error("Read activation codes failed:", error);
    return NextResponse.json(
      { code: 500, message: "读取激活码失败", data: null },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAdminSession(request, "platform");
    if (!session) return unauthorized();
    const body = await request.json().catch(() => ({}));
    const count = Number(body?.count || 1);
    const maxTests = Number(body?.maxTests || body?.totalUses || 1);

    if (!Number.isInteger(count) || count < 1 || count > 1000) {
      return NextResponse.json(
        { code: 400, message: "生成数量必须在1到1000之间", data: null },
        { status: 400 },
      );
    }
    if (!Number.isInteger(maxTests) || maxTests < 1 || maxTests > 10000) {
      return NextResponse.json(
        { code: 400, message: "可使用次数必须在1到10000之间", data: null },
        { status: 400 },
      );
    }

    const db = getDatabaseAdmin();
    const { data: existing, error: existingError } = await db
      .from("activation_codes")
      .select("code");
    if (existingError) throw new Error(existingError.message);
    const used = new Set((existing || []).map((item) => String(item.code)));
    const rows = Array.from({ length: count }, () => {
      let code = randomCode();
      while (used.has(code)) code = randomCode();
      used.add(code);
      return {
        code,
        scope: "personal",
        kind: "single",
        label: maxTests === 1 ? "一次性激活码" : `${maxTests}次激活码`,
        total_uses: maxTests,
        remaining_uses: maxTests,
        created_by_type: "platform",
        created_by_id: session.adminId,
        metadata: { bank_id: "MBTI60" },
      };
    });

    const { data: created, error } = await db
      .from("activation_codes")
      .insert(rows)
      .select("id,code");
    if (error) throw new Error(error.message);

    if (created?.length) {
      await db.from("activation_code_events").insert(
        created.map((item) => ({
          activation_code_id: item.id,
          event_type: "created",
          before_remaining_uses: maxTests,
          after_remaining_uses: maxTests,
          details: { createdBy: session.adminId },
        })),
      );
      await logAdmin(
        request,
        session.adminId,
        "generate_personal_activation_codes",
        String(created[0].id),
        { count, maxTests, codes: created.map((item) => item.id) },
      );
    }

    return NextResponse.json({
      code: 0,
      message: `成功生成 ${created?.length || 0} 个激活码`,
      data: { created, list: await listCodes() },
    });
  } catch (error) {
    console.error("Create activation codes failed:", error);
    return NextResponse.json(
      { code: 500, message: "生成激活码失败", data: null },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await requireAdminSession(request, "platform");
    if (!session) return unauthorized();
    const body = await request.json().catch(() => ({}));
    const action = clean(body?.action);
    const code = clean(body?.code).toUpperCase();

    if (action !== "void" || !code) {
      return NextResponse.json(
        { code: 400, message: "操作参数不正确", data: null },
        { status: 400 },
      );
    }

    const db = getDatabaseAdmin();
    const { data: stored, error: readError } = await db
      .from("activation_codes")
      .select("id,status,remaining_uses")
      .eq("scope", "personal")
      .eq("code", code)
      .maybeSingle();
    if (readError) throw new Error(readError.message);
    if (!stored) {
      return NextResponse.json(
        { code: 404, message: "激活码不存在", data: null },
        { status: 404 },
      );
    }
    if (stored.status !== "active") {
      return NextResponse.json(
        { code: 409, message: "只有有效激活码可以作废", data: null },
        { status: 409 },
      );
    }

    const { error } = await db
      .from("activation_codes")
      .update({ status: "voided" })
      .eq("id", stored.id)
      .eq("status", "active");
    if (error) throw new Error(error.message);

    await db.from("activation_code_events").insert({
      activation_code_id: stored.id,
      event_type: "voided",
      before_remaining_uses: stored.remaining_uses,
      after_remaining_uses: stored.remaining_uses,
      details: { adminId: session.adminId },
    });
    await logAdmin(request, session.adminId, "void_activation_code", String(stored.id));

    return NextResponse.json({
      code: 0,
      message: "激活码已作废",
      data: { list: await listCodes() },
    });
  } catch (error) {
    console.error("Void activation code failed:", error);
    return NextResponse.json(
      { code: 500, message: "激活码作废失败", data: null },
      { status: 500 },
    );
  }
}
