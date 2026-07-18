import { compare, hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/server/auth";
import { getDatabaseAdmin } from "@/lib/server/database";
import { getRequestIp, getRequestUserAgent } from "@/lib/server/request-context";

function clean(value: unknown) {
  return String(value || "").trim();
}

async function loadProfile(enterpriseId: string, adminId: string) {
  const db = getDatabaseAdmin();
  const [{ data: enterprise, error }, { data: admin, error: adminError }] = await Promise.all([
    db.from("enterprises").select("id,code,name,short_name,contact_name,contact_phone,avatar_url,status,credits,expiry_at,created_at,updated_at").eq("id", enterpriseId).single(),
    db.from("enterprise_admins").select("id,username,display_name,phone,role,status,last_login_at").eq("id", adminId).single(),
  ]);
  if (error) throw new Error(error.message);
  if (adminError) throw new Error(adminError.message);

  return {
    enterpriseId: enterprise.id,
    enterpriseCode: enterprise.code,
    enterpriseName: enterprise.name,
    enterpriseShortName: enterprise.short_name || "",
    contactName: enterprise.contact_name || "",
    phone: enterprise.contact_phone || "",
    avatar: enterprise.avatar_url || "",
    status: enterprise.status,
    credits: enterprise.credits,
    expiryAt: enterprise.expiry_at,
    createdAt: enterprise.created_at,
    updatedAt: enterprise.updated_at,
    adminId: admin.id,
    adminAccount: admin.username,
    adminDisplayName: admin.display_name,
    adminRole: admin.role,
    lastLoginAt: admin.last_login_at,
  };
}

export async function GET(request: NextRequest) {
  try {
    const session = await requireAdminSession(request, "enterprise");
    if (!session?.enterpriseId) {
      return NextResponse.json({ code: 401, message: "请先登录企业后台", data: null }, { status: 401 });
    }
    return NextResponse.json({ code: 0, message: "success", data: await loadProfile(session.enterpriseId, session.adminId) });
  } catch (error) {
    console.error("Read enterprise profile failed:", error);
    return NextResponse.json({ code: 500, message: "读取企业资料失败", data: null }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await requireAdminSession(request, "enterprise");
    if (!session?.enterpriseId) {
      return NextResponse.json({ code: 401, message: "请先登录企业后台", data: null }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const db = getDatabaseAdmin();
    const enterpriseUpdates: Record<string, unknown> = {};
    const adminUpdates: Record<string, unknown> = {};

    if ("enterpriseName" in body) {
      const name = clean(body.enterpriseName);
      if (!name) return NextResponse.json({ code: 400, message: "企业名称不能为空", data: null }, { status: 400 });
      enterpriseUpdates.name = name;
    }
    if ("enterpriseShortName" in body) enterpriseUpdates.short_name = clean(body.enterpriseShortName) || null;
    if ("contactName" in body) enterpriseUpdates.contact_name = clean(body.contactName) || null;
    if ("phone" in body) {
      const phone = clean(body.phone);
      if (phone && !/^1[3-9]\d{9}$/.test(phone)) {
        return NextResponse.json({ code: 400, message: "手机号格式不正确", data: null }, { status: 400 });
      }
      enterpriseUpdates.contact_phone = phone || null;
      adminUpdates.phone = phone || null;
    }
    if ("avatar" in body) enterpriseUpdates.avatar_url = clean(body.avatar) || null;

    if (body?.newPassword) {
      const currentPassword = String(body?.currentPassword || "");
      const newPassword = String(body?.newPassword || "");
      if (newPassword.length < 8 || newPassword.length > 72) {
        return NextResponse.json({ code: 400, message: "新密码长度必须在8到72位之间", data: null }, { status: 400 });
      }
      const { data: admin, error } = await db.from("enterprise_admins").select("password_hash").eq("id", session.adminId).single();
      if (error) throw new Error(error.message);
      if (!(await compare(currentPassword, String(admin.password_hash)))) {
        return NextResponse.json({ code: 403, message: "当前密码不正确", data: null }, { status: 403 });
      }
      adminUpdates.password_hash = await hash(newPassword, 12);
    }

    if (Object.keys(enterpriseUpdates).length > 0) {
      const { error } = await db.from("enterprises").update(enterpriseUpdates).eq("id", session.enterpriseId);
      if (error) throw new Error(error.message);
    }
    if (Object.keys(adminUpdates).length > 0) {
      const { error } = await db.from("enterprise_admins").update(adminUpdates).eq("id", session.adminId);
      if (error) throw new Error(error.message);
    }

    await db.from("admin_operation_logs").insert({
      admin_type: "enterprise",
      admin_id: session.adminId,
      enterprise_id: session.enterpriseId,
      operation: body?.newPassword ? "update_profile_and_password" : "update_profile",
      target_type: "enterprise",
      target_id: session.enterpriseId,
      details: { changedFields: Object.keys({ ...enterpriseUpdates, ...adminUpdates }).filter((key) => key !== "password_hash") },
      ip_address: getRequestIp(request),
      user_agent: getRequestUserAgent(request),
    });

    return NextResponse.json({ code: 0, message: "企业资料已保存", data: await loadProfile(session.enterpriseId, session.adminId) });
  } catch (error) {
    console.error("Update enterprise profile failed:", error);
    return NextResponse.json({ code: 500, message: "保存企业资料失败", data: null }, { status: 500 });
  }
}
