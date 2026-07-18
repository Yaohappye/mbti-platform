import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/server/auth";
import { getDatabaseAdmin } from "@/lib/server/database";

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireAdminSession(request, "platform");
    if (!session) return NextResponse.json({ code: 401, message: "请先登录平台后台", data: null }, { status: 401 });
    const { id } = await context.params;
    const body = await request.json().catch(() => ({}));
    const status = body?.status === "frozen" || body?.status === "disabled" ? "disabled" : "active";
    const db = getDatabaseAdmin();
    const { error } = await db.from("enterprises").update({ status }).eq("id", id);
    if (error) throw new Error(error.message);
    await db.from("admin_operation_logs").insert({ admin_type: "platform", admin_id: session.adminId, enterprise_id: id, operation: status === "disabled" ? "disable_enterprise" : "enable_enterprise", target_type: "enterprise", target_id: id });
    return NextResponse.json({ code: 0, message: status === "disabled" ? "企业已停用" : "企业已恢复", data: { status } });
  } catch (error) {
    console.error("Update enterprise status failed:", error);
    return NextResponse.json({ code: 500, message: "更新企业状态失败", data: null }, { status: 500 });
  }
}
