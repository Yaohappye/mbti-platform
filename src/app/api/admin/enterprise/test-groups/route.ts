import { NextRequest, NextResponse } from "next/server";
import {
  getTestBankConfig,
  getTestTypeConfig,
  normalizeResultVisibility,
  type EmployeeResultVisibility,
} from "@/data/test-catalog";
import { requireAdminSession } from "@/lib/server/auth";
import { getDatabaseAdmin } from "@/lib/server/database";
import {
  getRequestIp,
  getRequestUserAgent,
} from "@/lib/server/request-context";

const CODE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function clean(value: unknown) {
  return String(value || "").trim();
}

function randomCode() {
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  let value = Array.from(bytes, (byte) => CODE_CHARS[byte % CODE_CHARS.length]).join("");
  if (!/[A-Z]/.test(value)) value = `A${value.slice(1)}`;
  if (!/\d/.test(value)) value = `${value.slice(0, -1)}1`;
  return value;
}

function unauthorized() {
  return NextResponse.json(
    { code: 401, message: "请先登录企业后台", data: null },
    { status: 401 },
  );
}

async function listGroups(enterpriseId: string) {
  const db = getDatabaseAdmin();
  const { data: groups, error } = await db
    .from("enterprise_test_groups")
    .select(
      "id,enterprise_id,group_code,name,note,test_type_id,bank_id,result_visibility,status,created_at,updated_at",
    )
    .eq("enterprise_id", enterpriseId)
    .neq("status", "archived")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);

  const groupIds = (groups || []).map((group) => group.id);
  let codes: Array<Record<string, unknown>> = [];
  if (groupIds.length > 0) {
    const { data, error: codeError } = await db
      .from("activation_codes")
      .select(
        "id,code,group_id,status,points_cost,claimed_by_employee_id,claimed_at,completed_at,created_at,updated_at",
      )
      .in("group_id", groupIds)
      .order("created_at", { ascending: false });
    if (codeError) throw new Error(codeError.message);
    codes = data || [];
  }

  const employeeIds = codes
    .map((code) => clean(code.claimed_by_employee_id))
    .filter(Boolean);
  const employees = new Map<string, { name: string; department: string }>();
  if (employeeIds.length > 0) {
    const { data } = await db
      .from("enterprise_employees")
      .select("id,name,department")
      .in("id", employeeIds);
    (data || []).forEach((employee) => {
      employees.set(String(employee.id), {
        name: String(employee.name),
        department: String(employee.department),
      });
    });
  }

  return (groups || []).map((group) => ({
    id: group.id,
    enterpriseId: group.enterprise_id,
    groupCode: group.group_code,
    name: group.name,
    note: group.note || "",
    testTypeId: group.test_type_id,
    bankId: group.bank_id,
    testType: group.bank_id,
    resultVisibility: group.result_visibility,
    createdAt: group.created_at,
    updatedAt: group.updated_at,
    codes: codes
      .filter((code) => code.group_id === group.id)
      .map((code) => {
        const employee = employees.get(clean(code.claimed_by_employee_id));
        return {
          id: code.id,
          code: code.code,
          status: code.status,
          pointsCost: code.points_cost,
          claimedAt: code.claimed_at,
          startedAt: code.claimed_at,
          completedAt: code.completed_at,
          employeeName: employee?.name || null,
          department: employee?.department || null,
          createdAt: code.created_at,
        };
      }),
  }));
}

async function audit(
  request: NextRequest,
  session: NonNullable<Awaited<ReturnType<typeof requireAdminSession>>>,
  operation: string,
  targetType: string,
  targetId: string,
  details: Record<string, unknown> = {},
) {
  const db = getDatabaseAdmin();
  await db.from("admin_operation_logs").insert({
    admin_type: session.adminType,
    admin_id: session.adminId,
    enterprise_id: session.enterpriseId,
    operation,
    target_type: targetType,
    target_id: targetId,
    details,
    ip_address: getRequestIp(request),
    user_agent: getRequestUserAgent(request),
  });
}

export async function GET(request: NextRequest) {
  try {
    const session = await requireAdminSession(request, "enterprise");
    if (!session?.enterpriseId) return unauthorized();

    return NextResponse.json({
      code: 0,
      message: "success",
      data: { list: await listGroups(session.enterpriseId) },
    });
  } catch (error) {
    console.error("Read enterprise groups failed:", error);
    return NextResponse.json(
      { code: 500, message: "读取企业分组失败", data: null },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAdminSession(request, "enterprise");
    if (!session?.enterpriseId) return unauthorized();

    const body = await request.json().catch(() => ({}));
    const action = clean(body?.action);
    const db = getDatabaseAdmin();

    if (action === "create_group") {
      const name = clean(body?.name);
      const note = clean(body?.note);
      const testTypeId = clean(body?.testTypeId).toUpperCase();
      const bankId = clean(body?.bankId).toUpperCase();
      const visibility = clean(body?.resultVisibility) as EmployeeResultVisibility;
      const type = getTestTypeConfig(testTypeId);
      const bank = getTestBankConfig(testTypeId, bankId);

      if (!name || !type?.enabled || !bank?.enabled) {
        return NextResponse.json(
          { code: 400, message: "分组名称、测试类型或题库配置不正确", data: null },
          { status: 400 },
        );
      }
      if (!(["hidden", "summary", "full"] as string[]).includes(visibility)) {
        return NextResponse.json(
          { code: 400, message: "员工结果权限设置不正确", data: null },
          { status: 400 },
        );
      }

      let group: Record<string, unknown> | null = null;
      let lastError = "";
      for (let attempt = 0; attempt < 8 && !group; attempt += 1) {
        const { data, error } = await db
          .from("enterprise_test_groups")
          .insert({
            enterprise_id: session.enterpriseId,
            group_code: randomCode(),
            name,
            note: note || null,
            test_type_id: type.id,
            bank_id: bank.id,
            result_visibility: visibility,
            created_by: session.adminId,
          })
          .select("id,group_code,name")
          .maybeSingle();
        if (!error && data) group = data;
        else lastError = error?.message || "创建失败";
      }
      if (!group) throw new Error(lastError);

      await audit(request, session, "create_group", "enterprise_test_group", String(group.id), {
        name,
        testTypeId,
        bankId,
        resultVisibility: visibility,
      });

      return NextResponse.json({
        code: 0,
        message: "企业分组创建成功",
        data: { group, list: await listGroups(session.enterpriseId) },
      });
    }

    if (action === "generate_code") {
      const groupId = clean(body?.groupId);
      const { data: group, error: groupError } = await db
        .from("enterprise_test_groups")
        .select("id,status")
        .eq("id", groupId)
        .eq("enterprise_id", session.enterpriseId)
        .maybeSingle();
      if (groupError) throw new Error(groupError.message);
      if (!group || group.status !== "active") {
        return NextResponse.json(
          { code: 404, message: "企业分组不存在", data: null },
          { status: 404 },
        );
      }

      let created: Record<string, unknown> | null = null;
      let message = "";
      for (let attempt = 0; attempt < 8 && !created; attempt += 1) {
        const { data, error } = await db.rpc("create_enterprise_activation_code", {
          p_enterprise_id: session.enterpriseId,
          p_group_id: groupId,
          p_code: randomCode(),
          p_points_cost: 5,
          p_admin_id: session.adminId,
        });
        if (!error && data) created = data as Record<string, unknown>;
        else {
          message = error?.message || "生成失败";
          if (message.includes("INSUFFICIENT_CREDITS")) break;
        }
      }

      if (!created) {
        const insufficient = message.includes("INSUFFICIENT_CREDITS");
        return NextResponse.json(
          {
            code: insufficient ? 409 : 500,
            message: insufficient ? "企业积分不足" : "生成激活码失败",
            data: null,
          },
          { status: insufficient ? 409 : 500 },
        );
      }

      await audit(
        request,
        session,
        "generate_activation_code",
        "activation_code",
        clean(created.id),
        { groupId, pointsCost: 5 },
      );

      return NextResponse.json({
        code: 0,
        message: "企业激活码生成成功",
        data: {
          activationCode: created,
          pointsCost: 5,
          credits: created.credits,
          list: await listGroups(session.enterpriseId),
        },
      });
    }

    return NextResponse.json(
      { code: 400, message: "不支持的操作", data: null },
      { status: 400 },
    );
  } catch (error) {
    console.error("Enterprise group operation failed:", error);
    return NextResponse.json(
      { code: 500, message: "企业分组操作失败", data: null },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await requireAdminSession(request, "enterprise");
    if (!session?.enterpriseId) return unauthorized();
    const body = await request.json().catch(() => ({}));

    if (clean(body?.action) !== "void_code") {
      return NextResponse.json(
        { code: 400, message: "不支持的操作", data: null },
        { status: 400 },
      );
    }

    const groupId = clean(body?.groupId);
    const code = clean(body?.code).toUpperCase();
    const db = getDatabaseAdmin();
    const { data: stored, error: readError } = await db
      .from("activation_codes")
      .select("id,status")
      .eq("code", code)
      .eq("enterprise_id", session.enterpriseId)
      .eq("group_id", groupId)
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
        { code: 409, message: "只有未使用激活码可以作废", data: null },
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
      enterprise_id: session.enterpriseId,
      event_type: "voided",
      details: { adminId: session.adminId },
    });
    await audit(request, session, "void_activation_code", "activation_code", String(stored.id));

    return NextResponse.json({
      code: 0,
      message: "激活码已作废",
      data: { list: await listGroups(session.enterpriseId) },
    });
  } catch (error) {
    console.error("Void enterprise activation code failed:", error);
    return NextResponse.json(
      { code: 500, message: "激活码作废失败", data: null },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await requireAdminSession(request, "enterprise");
    if (!session?.enterpriseId) return unauthorized();
    const body = await request.json().catch(() => ({}));
    const groupId = clean(body?.groupId);
    const db = getDatabaseAdmin();

    const { data: group, error: groupError } = await db
      .from("enterprise_test_groups")
      .select("id,status")
      .eq("id", groupId)
      .eq("enterprise_id", session.enterpriseId)
      .maybeSingle();
    if (groupError) throw new Error(groupError.message);
    if (!group) {
      return NextResponse.json(
        { code: 404, message: "企业分组不存在", data: null },
        { status: 404 },
      );
    }

    await db
      .from("activation_codes")
      .update({ status: "voided" })
      .eq("group_id", groupId)
      .eq("status", "active");
    const { error } = await db
      .from("enterprise_test_groups")
      .update({ status: "archived" })
      .eq("id", groupId);
    if (error) throw new Error(error.message);

    await audit(request, session, "archive_group", "enterprise_test_group", groupId);

    return NextResponse.json({
      code: 0,
      message: "企业分组已归档，历史记录已保留",
      data: { list: await listGroups(session.enterpriseId) },
    });
  } catch (error) {
    console.error("Archive enterprise group failed:", error);
    return NextResponse.json(
      { code: 500, message: "归档企业分组失败", data: null },
      { status: 500 },
    );
  }
}
