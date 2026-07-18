import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/server/auth";
import { getDatabaseAdmin } from "@/lib/server/database";
import { getRequestIp, getRequestUserAgent } from "@/lib/server/request-context";

const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function randomCode() {
  const bytes = new Uint8Array(10);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => CHARS[byte % CHARS.length]).join("");
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
    .from("enterprise_recharge_codes")
    .select("id,code,points,status,bound_enterprise_id,created_at,used_at,voided_at,expires_at")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);

  const enterpriseIds = Array.from(
    new Set((codes || []).map((item) => item.bound_enterprise_id).filter(Boolean)),
  ) as string[];
  const enterpriseNames = new Map<string, string>();
  if (enterpriseIds.length > 0) {
    const { data: enterprises, error: enterpriseError } = await db
      .from("enterprises")
      .select("id,name")
      .in("id", enterpriseIds);
    if (enterpriseError) throw new Error(enterpriseError.message);
    for (const enterprise of enterprises || []) {
      enterpriseNames.set(String(enterprise.id), String(enterprise.name));
    }
  }

  return (codes || []).map((item) => ({
    code_id: item.id,
    code: item.code,
    points: Number(item.points),
    status: item.status,
    bound_enterprise_id: item.bound_enterprise_id,
    bound_enterprise_name: item.bound_enterprise_id
      ? enterpriseNames.get(String(item.bound_enterprise_id)) || ""
      : "",
    created_at: item.created_at,
    used_at: item.used_at,
    voided_at: item.voided_at,
    expires_at: item.expires_at,
  }));
}

async function audit(
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
    target_type: "enterprise_recharge_code",
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
    return NextResponse.json({ code: 0, message: "success", data: { list: await listCodes() } });
  } catch (error) {
    console.error("Read recharge codes failed:", error);
    return NextResponse.json(
      { code: 500, message: "读取企业充值码失败", data: null },
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
    const points = Number(body?.points || 0);
    if (!Number.isInteger(count) || count < 1 || count > 1000) {
      return NextResponse.json(
        { code: 400, message: "生成数量必须在1到1000之间", data: null },
        { status: 400 },
      );
    }
    if (!Number.isInteger(points) || points < 1 || points > 10000000) {
      return NextResponse.json(
        { code: 400, message: "积分必须在1到10000000之间", data: null },
        { status: 400 },
      );
    }

    const db = getDatabaseAdmin();
    const { data: existing, error: existingError } = await db
      .from("enterprise_recharge_codes")
      .select("code");
    if (existingError) throw new Error(existingError.message);
    const used = new Set((existing || []).map((item) => String(item.code)));
    const rows = Array.from({ length: count }, () => {
      let code = randomCode();
      while (used.has(code)) code = randomCode();
      used.add(code);
      return { code, points, created_by: session.adminId };
    });

    const { data: created, error } = await db
      .from("enterprise_recharge_codes")
      .insert(rows)
      .select("id,code,points");
    if (error) throw new Error(error.message);

    if (created?.length) {
      await db.from("enterprise_recharge_code_events").insert(
        created.map((item) => ({
          recharge_code_id: item.id,
          admin_type: "platform",
          admin_id: session.adminId,
          event_type: "created",
          ip_address: getRequestIp(request),
          user_agent: getRequestUserAgent(request),
          details: { points: item.points },
        })),
      );
      await audit(request, session.adminId, "generate_recharge_codes", String(created[0].id), {
        count,
        points,
        codeIds: created.map((item) => item.id),
      });
    }

    return NextResponse.json({
      code: 0,
      message: `成功生成 ${created?.length || 0} 个充值码`,
      data: { created: created || [], list: await listCodes() },
    });
  } catch (error) {
    console.error("Create recharge codes failed:", error);
    return NextResponse.json(
      { code: 500, message: "生成企业充值码失败", data: null },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await requireAdminSession(request, "platform");
    if (!session) return unauthorized();
    const body = await request.json().catch(() => ({}));
    const id = String(body?.id || body?.codeId || "").trim();
    if (body?.action !== "void" || !id) {
      return NextResponse.json(
        { code: 400, message: "操作参数不正确", data: null },
        { status: 400 },
      );
    }

    const db = getDatabaseAdmin();
    const { data: stored, error: readError } = await db
      .from("enterprise_recharge_codes")
      .select("id,status")
      .eq("id", id)
      .maybeSingle();
    if (readError) throw new Error(readError.message);
    if (!stored) {
      return NextResponse.json(
        { code: 404, message: "充值码不存在", data: null },
        { status: 404 },
      );
    }
    if (stored.status !== "unused") {
      return NextResponse.json(
        { code: 409, message: "只有未使用的充值码可以作废", data: null },
        { status: 409 },
      );
    }

    const { data: updated, error } = await db
      .from("enterprise_recharge_codes")
      .update({ status: "voided", voided_at: new Date().toISOString() })
      .eq("id", id)
      .eq("status", "unused")
      .select("id")
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!updated) {
      return NextResponse.json(
        { code: 409, message: "充值码状态已变化，请刷新后重试", data: null },
        { status: 409 },
      );
    }

    await db.from("enterprise_recharge_code_events").insert({
      recharge_code_id: id,
      admin_type: "platform",
      admin_id: session.adminId,
      event_type: "voided",
      ip_address: getRequestIp(request),
      user_agent: getRequestUserAgent(request),
    });
    await audit(request, session.adminId, "void_recharge_code", id);

    return NextResponse.json({ code: 0, message: "充值码已作废", data: { list: await listCodes() } });
  } catch (error) {
    console.error("Void recharge code failed:", error);
    return NextResponse.json(
      { code: 500, message: "充值码作废失败", data: null },
      { status: 500 },
    );
  }
}
