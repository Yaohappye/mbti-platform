import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/server/auth";
import { getDatabaseAdmin } from "@/lib/server/database";
import type { EmployeeResultVisibility } from "@/data/test-catalog";

function clean(value: unknown) {
  return String(value || "").trim();
}

async function loadStoredResult(accessKey: string) {
  const db = getDatabaseAdmin();
  const { data: session, error: sessionError } = await db
    .from("test_sessions")
    .select(
      "id,access_key,test_type_id,bank_id,mode,status,gender,result_visibility,enterprise_id,employee_id,group_id,started_at,completed_at,duration_seconds,created_at",
    )
    .eq("access_key", accessKey)
    .maybeSingle();

  if (sessionError) throw new Error(sessionError.message);
  if (!session) return null;

  const { data: result, error: resultError } = await db
    .from("mbti_results")
    .select(
      "id,mbti_type,ei_score,sn_score,tf_score,jp_score,dimension_scores,report,report_version,calculation_version,created_at",
    )
    .eq("session_id", session.id)
    .maybeSingle();

  if (resultError) throw new Error(resultError.message);
  if (!result) return null;

  let enterprise: { code: string; name: string } | null = null;
  let employee: { name: string; department: string; phone: string | null } | null = null;
  let group: { group_code: string; name: string } | null = null;

  if (session.enterprise_id) {
    const { data } = await db
      .from("enterprises")
      .select("code,name")
      .eq("id", session.enterprise_id)
      .maybeSingle();
    enterprise = data;
  }
  if (session.employee_id) {
    const { data } = await db
      .from("enterprise_employees")
      .select("name,department,phone")
      .eq("id", session.employee_id)
      .maybeSingle();
    employee = data;
  }
  if (session.group_id) {
    const { data } = await db
      .from("enterprise_test_groups")
      .select("group_code,name")
      .eq("id", session.group_id)
      .maybeSingle();
    group = data;
  }

  return { session, result, enterprise, employee, group };
}

function fullView(stored: NonNullable<Awaited<ReturnType<typeof loadStoredResult>>>) {
  const { session, result, enterprise, employee, group } = stored;
  return {
    id: result.id,
    accessKey: session.access_key,
    session_id: session.id,
    testType: session.bank_id,
    test_type: session.bank_id,
    testTypeId: session.test_type_id,
    test_type_id: session.test_type_id,
    reportType: session.mode,
    report_type: session.mode,
    gender: session.gender,
    mbti_type: result.mbti_type,
    ei_score: result.ei_score,
    sn_score: result.sn_score,
    tf_score: result.tf_score,
    jp_score: result.jp_score,
    dimensionScores: result.dimension_scores,
    dimension_scores: result.dimension_scores,
    report: result.report,
    resultVisibility: session.result_visibility,
    employeeResultVisibility: session.result_visibility,
    employee_result_visibility: session.result_visibility,
    enterpriseId: session.enterprise_id,
    enterprise_id: session.enterprise_id,
    enterpriseCode: enterprise?.code || null,
    enterprise_code: enterprise?.code || null,
    enterpriseName: enterprise?.name || null,
    enterprise_name: enterprise?.name || null,
    employeeId: session.employee_id,
    employee_id: session.employee_id,
    employeeName: employee?.name || null,
    employee_name: employee?.name || null,
    department: employee?.department || null,
    phone: employee?.phone || null,
    groupId: session.group_id,
    group_id: session.group_id,
    groupCode: group?.group_code || null,
    group_code: group?.group_code || null,
    groupName: group?.name || null,
    group_name: group?.name || null,
    startedAt: session.started_at,
    started_at: session.started_at,
    completedAt: session.completed_at,
    completed_at: session.completed_at,
    endedAt: session.completed_at,
    ended_at: session.completed_at,
    durationSeconds: session.duration_seconds,
    duration_seconds: session.duration_seconds,
    createdAt: result.created_at,
    created_at: result.created_at,
  };
}

async function buildView(
  request: NextRequest,
  accessKey: string,
  audience: string,
) {
  const stored = await loadStoredResult(accessKey);
  if (!stored) return { status: 404, message: "测评结果不存在", data: null };

  const complete = fullView(stored);
  if (stored.session.mode === "personal") {
    return { status: 200, message: "success", data: { ...complete, audience: "personal" } };
  }

  if (audience === "enterprise") {
    const admin = await getAdminSession(request);
    const allowed =
      admin?.adminType === "platform" ||
      (admin?.adminType === "enterprise" &&
        admin.enterpriseId === String(stored.session.enterprise_id));

    if (!allowed) {
      return { status: 403, message: "无权查看企业完整测评结果", data: null };
    }

    return { status: 200, message: "success", data: { ...complete, audience: "enterprise" } };
  }

  const visibility = stored.session
    .result_visibility as EmployeeResultVisibility;
  const common = {
    id: complete.id,
    accessKey: complete.accessKey,
    session_id: complete.session_id,
    testType: complete.testType,
    test_type: complete.test_type,
    reportType: "enterprise" as const,
    report_type: "enterprise" as const,
    audience: "employee" as const,
    employeeResultVisibility: visibility,
    employee_result_visibility: visibility,
  };

  if (visibility === "hidden") {
    return {
      status: 200,
      message: "success",
      data: {
        ...common,
        employeeView: true,
        employee_view: true,
        resultHidden: true,
        result_hidden: true,
        visibleSections: [],
        visible_sections: [],
      },
    };
  }

  if (visibility === "summary") {
    return {
      status: 200,
      message: "success",
      data: {
        ...common,
        mbti_type: complete.mbti_type,
        employeeView: true,
        employee_view: true,
        resultHidden: false,
        result_hidden: false,
        visibleSections: ["type_description"],
        visible_sections: ["type_description"],
      },
    };
  }

  return {
    status: 200,
    message: "success",
    data: {
      ...complete,
      ...common,
      employeeView: false,
      employee_view: false,
      resultHidden: false,
      result_hidden: false,
      visibleSections: ["full_report"],
      visible_sections: ["full_report"],
    },
  };
}

async function respond(request: NextRequest, accessKey: string, audience: string) {
  if (!accessKey) {
    return NextResponse.json(
      { code: 400, message: "缺少访问凭证", data: null },
      { status: 400 },
    );
  }

  const result = await buildView(request, accessKey, audience);
  return NextResponse.json(
    {
      code: result.status === 200 ? 0 : result.status,
      message: result.message,
      data: result.data,
    },
    { status: result.status },
  );
}

export async function GET(request: NextRequest) {
  try {
    const accessKey = clean(request.nextUrl.searchParams.get("accessKey"));
    const audience = clean(
      request.nextUrl.searchParams.get("audience") ||
        request.nextUrl.searchParams.get("view") ||
        "employee",
    );
    return await respond(request, accessKey, audience);
  } catch (error) {
    console.error("Read MBTI result failed:", error);
    return NextResponse.json(
      { code: 500, message: "读取测评结果失败", data: null },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    return await respond(
      request,
      clean(body?.accessKey || body?.key),
      clean(body?.audience || body?.view || "employee"),
    );
  } catch (error) {
    console.error("Read MBTI result failed:", error);
    return NextResponse.json(
      { code: 500, message: "读取测评结果失败", data: null },
      { status: 500 },
    );
  }
}
