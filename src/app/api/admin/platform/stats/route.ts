import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/server/auth";
import { getDatabaseAdmin } from "@/lib/server/database";

export async function GET(request: NextRequest) {
  try {
    const session = await requireAdminSession(request, "platform");
    if (!session) return NextResponse.json({ code: 401, message: "请先登录平台后台", data: null }, { status: 401 });
    const db = getDatabaseAdmin();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [results, todayResults, enterprises, sessions] = await Promise.all([
      db.from("mbti_results").select("mbti_type"),
      db.from("mbti_results").select("id", { count: "exact", head: true }).gte("created_at", today.toISOString()),
      db.from("enterprises").select("id", { count: "exact", head: true }).eq("status", "active"),
      db.from("test_sessions").select("gender").eq("status", "completed"),
    ]);
    for (const query of [results, todayResults, enterprises, sessions]) {
      if (query.error) throw new Error(query.error.message);
    }

    const typeDistribution: Record<string, number> = {};
    (results.data || []).forEach((item) => {
      const type = String(item.mbti_type || "UNKNOWN");
      typeDistribution[type] = (typeDistribution[type] || 0) + 1;
    });
    const genderDistribution: Record<string, number> = {};
    (sessions.data || []).forEach((item) => {
      const gender = String(item.gender || "unspecified");
      genderDistribution[gender] = (genderDistribution[gender] || 0) + 1;
    });

    return NextResponse.json({
      code: 0,
      message: "success",
      data: {
        totalTests: results.data?.length || 0,
        todayTests: todayResults.count || 0,
        totalEnterprises: enterprises.count || 0,
        typeDistribution,
        genderDistribution,
      },
    });
  } catch (error) {
    console.error("Read platform stats failed:", error);
    return NextResponse.json({ code: 500, message: "读取统计数据失败", data: null }, { status: 500 });
  }
}
