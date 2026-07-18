import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/server/auth";
import { getDatabaseAdmin } from "@/lib/server/database";
import { getRequestIp, getRequestUserAgent } from "@/lib/server/request-context";

export async function POST(request: NextRequest) {
  try {
    const session = await requireAdminSession(request, "platform");
    if (!session) return NextResponse.json({ code: 401, message: "请先登录平台后台", data: null }, { status: 401 });
    const body = await request.json().catch(() => ({}));
    const enterpriseId = String(body?.enterpriseId || "").trim();
    const points = Number(body?.points);
    if (!enterpriseId || !Number.isInteger(points) || points < 1) {
      return NextResponse.json({ code: 400, message: "企业编号或充值积分不正确", data: null }, { status: 400 });
    }

    const db = getDatabaseAdmin();
    const { data, error } = await db.rpc("adjust_enterprise_credits", {
      p_enterprise_id: enterpriseId,
      p_amount: points,
      p_note: String(body?.note || "平台直接充值"),
      p_admin_id: session.adminId,
    });
    if (error) throw new Error(error.message);
    await db.from("admin_operation_logs").insert({
      admin_type: "platform",
      admin_id: session.adminId,
      enterprise_id: enterpriseId,
      operation: "recharge_enterprise",
      target_type: "enterprise",
      target_id: enterpriseId,
      details: { points },
      ip_address: getRequestIp(request),
      user_agent: getRequestUserAgent(request),
    });
    return NextResponse.json({ code: 0, message: `成功充值 ${points} 积分`, data });
  } catch (error) {
    console.error("Recharge enterprise failed:", error);
    return NextResponse.json({ code: 500, message: "企业充值失败", data: null }, { status: 500 });
  }
}
