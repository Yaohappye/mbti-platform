import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/server/auth";
import { getDatabaseAdmin } from "@/lib/server/database";

function clean(value: unknown) {
  return String(value || "").trim();
}

export async function GET(request: NextRequest) {
  try {
    const session = await requireAdminSession(request, ["enterprise", "platform"]);
    if (!session) {
      return NextResponse.json(
        { code: 401, message: "请先登录后台", data: null },
        { status: 401 },
      );
    }

    const requestedEnterpriseId = clean(request.nextUrl.searchParams.get("enterpriseId"));
    const enterpriseId =
      session.adminType === "enterprise" ? session.enterpriseId : requestedEnterpriseId;
    if (!enterpriseId) {
      return NextResponse.json(
        { code: 400, message: "缺少企业编号", data: null },
        { status: 400 },
      );
    }

    const keyword = clean(request.nextUrl.searchParams.get("keyword")).toLowerCase();
    const departmentFilter = clean(request.nextUrl.searchParams.get("department"));
    const db = getDatabaseAdmin();
    const { data: sessions, error } = await db
      .from("test_sessions")
      .select("id,access_key,employee_id,group_id,bank_id,gender,started_at,completed_at,duration_seconds,created_at")
      .eq("enterprise_id", enterpriseId)
      .eq("status", "completed")
      .order("completed_at", { ascending: false });
    if (error) throw new Error(error.message);

    const sessionIds = (sessions || []).map((item) => item.id);
    const employeeIds = (sessions || []).map((item) => item.employee_id).filter(Boolean);
    const groupIds = (sessions || []).map((item) => item.group_id).filter(Boolean);

    const [resultsQuery, employeesQuery, groupsQuery] = await Promise.all([
      sessionIds.length
        ? db.from("mbti_results").select("id,session_id,mbti_type,ei_score,sn_score,tf_score,jp_score,created_at").in("session_id", sessionIds)
        : Promise.resolve({ data: [], error: null }),
      employeeIds.length
        ? db.from("enterprise_employees").select("id,name,department,phone,email").in("id", employeeIds)
        : Promise.resolve({ data: [], error: null }),
      groupIds.length
        ? db.from("enterprise_test_groups").select("id,group_code,name").in("id", groupIds)
        : Promise.resolve({ data: [], error: null }),
    ]);

    if (resultsQuery.error) throw new Error(resultsQuery.error.message);
    if (employeesQuery.error) throw new Error(employeesQuery.error.message);
    if (groupsQuery.error) throw new Error(groupsQuery.error.message);

    const results = new Map((resultsQuery.data || []).map((item) => [String(item.session_id), item]));
    const employees = new Map((employeesQuery.data || []).map((item) => [String(item.id), item]));
    const groups = new Map((groupsQuery.data || []).map((item) => [String(item.id), item]));

    const list = (sessions || [])
      .map((item) => {
        const result = results.get(String(item.id));
        const employee = employees.get(String(item.employee_id));
        const group = groups.get(String(item.group_id));
        if (!result) return null;
        return {
          id: result.id,
          session_id: item.id,
          access_key: item.access_key,
          mbti_type: result.mbti_type,
          ei_score: result.ei_score,
          sn_score: result.sn_score,
          tf_score: result.tf_score,
          jp_score: result.jp_score,
          employee_name: employee?.name || null,
          department: employee?.department || null,
          phone: employee?.phone || null,
          email: employee?.email || null,
          gender: item.gender,
          test_type: item.bank_id,
          group_name: group?.name || null,
          group_code: group?.group_code || null,
          started_at: item.started_at,
          ended_at: item.completed_at,
          completed_at: item.completed_at,
          duration_seconds: item.duration_seconds,
          created_at: result.created_at,
        };
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item))
      .filter((item) => !departmentFilter || item.department === departmentFilter)
      .filter((item) => {
        if (!keyword) return true;
        return [
          item.employee_name,
          item.department,
          item.phone,
          item.mbti_type,
          item.group_name,
          item.group_code,
          item.access_key,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(keyword);
      });

    return NextResponse.json({
      code: 0,
      message: "success",
      data: {
        list,
        total: list.length,
        departments: Array.from(new Set(list.map((item) => item.department).filter(Boolean))),
      },
    });
  } catch (error) {
    console.error("Read enterprise results failed:", error);
    return NextResponse.json(
      { code: 500, message: "读取企业员工测评记录失败", data: null },
      { status: 500 },
    );
  }
}
