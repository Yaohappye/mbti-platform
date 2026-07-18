import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/server/auth";
import { getDatabaseAdmin } from "@/lib/server/database";
import { getRequestIp, getRequestUserAgent } from "@/lib/server/request-context";

export async function POST(request: NextRequest) {
  try {
    const session = await requireAdminSession(request, "enterprise");
    if (!session?.enterpriseId) {
      return NextResponse.json(
        { code: 401, message: "请先登录企业后台", data: null },
        { status: 401 },
      );
    }
    const body = await request.json().catch(() => ({}));
    const code = String(body?.code || "").trim().toUpperCase();
    if (!/^[A-HJ-NP-Z2-9]{10}$/.test(code)) {
      return NextResponse.json(
        { code: 400, message: "充值码格式不正确", data: null },
        { status: 400 },
      );
    }

    const db = getDatabaseAdmin();
    const { data, error } = await db.rpc("redeem_enterprise_recharge_code", {
      p_enterprise_id: session.enterpriseId,
      p_admin_id: session.adminId,
      p_code: code,
      p_ip: getRequestIp(request),
      p_user_agent: getRequestUserAgent(request),
    });
    if (error) {
      const message = error.message || "";
      if (message.includes("RECHARGE_CODE_NOT_FOUND")) {
        return NextResponse.json({ code: 404, message: "充值码不存在", data: null }, { status: 404 });
      }
      if (message.includes("RECHARGE_CODE_NOT_AVAILABLE")) {
        return NextResponse.json({ code: 409, message: "充值码已使用或已作废", data: null }, { status: 409 });
      }
      if (message.includes("RECHARGE_CODE_EXPIRED")) {
        return NextResponse.json({ code: 409, message: "充值码已过期", data: null }, { status: 409 });
      }
      throw new Error(message);
    }
    if (data?.error === "RECHARGE_CODE_EXPIRED") {
      return NextResponse.json({ code: 409, message: "充值码已过期", data: null }, { status: 409 });
    }

    await db.from("admin_operation_logs").insert({
      admin_type: "enterprise",
      admin_id: session.adminId,
      enterprise_id: session.enterpriseId,
      operation: "redeem_recharge_code",
      target_type: "enterprise_recharge_code",
      target_id: String(data?.rechargeCodeId || code),
      details: { points: data?.points, ledgerId: data?.ledgerId },
      ip_address: getRequestIp(request),
      user_agent: getRequestUserAgent(request),
    });

    return NextResponse.json({ code: 0, message: `成功充值 ${data?.points || 0} 积分`, data });
  } catch (error) {
    console.error("Redeem recharge code failed:", error);
    return NextResponse.json(
      { code: 500, message: "兑换充值码失败", data: null },
      { status: 500 },
    );
  }
}
