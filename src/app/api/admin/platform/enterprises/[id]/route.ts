import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/server/auth";
import { getDatabaseAdmin } from "@/lib/server/database";

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireAdminSession(request, "platform");
    if (!session) return NextResponse.json({ code: 401, message: "请先登录平台后台", data: null }, { status: 401 });
    const { id } = await context.params;
    const body = await request.json().catch(() => ({}));
    const db = getDatabaseAdmin();
    const enterpriseUpdates: Record<string, unknown> = {};
    if (body?.contact_person !== undefined) enterpriseUpdates.contact_name = String(body.contact_person || "").trim() || null;
    if (body?.phone !== undefined) {
      const phone = String(body.phone || "").trim();
      if (phone && !/^1[3-9]\d{9}$/.test(phone)) return NextResponse.json({ code: 400, message: "手机号格式不正确", data: null }, { status: 400 });
      enterpriseUpdates.contact_phone = phone || null;
    }
    if (Object.keys(enterpriseUpdates).length) {
      const { error } = await db.from("enterprises").update(enterpriseUpdates).eq("id", id);
      if (error) throw new Error(error.message);
    }
    if (body?.password) {
      const password = String(body.password);
      if (password.length < 8 || password.length > 72) return NextResponse.json({ code: 400, message: "密码长度必须在8到72位之间", data: null }, { status: 400 });
      const { error } = await db.from("enterprise_admins").update({ password_hash: await hash(password, 12) }).eq("enterprise_id", id).eq("role", "owner");
      if (error) throw new Error(error.message);
    }
    await db.from("admin_operation_logs").insert({ admin_type: "platform", admin_id: session.adminId, enterprise_id: id, operation: body?.password ? "reset_enterprise_password" : "update_enterprise", target_type: "enterprise", target_id: id, details: { changedFields: Object.keys(body).filter((key) => key !== "password") } });
    return NextResponse.json({ code: 0, message: "企业信息已更新", data: null });
  } catch (error) {
    console.error("Update enterprise failed:", error);
    return NextResponse.json({ code: 500, message: "更新企业信息失败", data: null }, { status: 500 });
  }
}
