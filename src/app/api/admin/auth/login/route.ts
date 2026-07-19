import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import {
  createAdminSession,
  setAdminSessionCookies,
  type AdminRole,
} from "@/lib/server/auth";
import { getDatabaseAdmin } from "@/lib/server/database";
import {
  getRequestIp,
  getRequestUserAgent,
} from "@/lib/server/request-context";

export const runtime = "nodejs";

interface AdminAccount {
  id: string;
  enterprise_id?: string | null;
  username: string;
  password_hash: string;
  display_name: string | null;
  status: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const username = String(body?.username || body?.account || "").trim();
    const password = String(body?.password || "");
    const role: AdminRole = body?.role === "enterprise" ? "enterprise" : "platform";

    if (!username || !password) {
      return NextResponse.json(
        { code: 400, message: "请输入账号和密码", data: null },
        { status: 400 },
      );
    }

    const db = getDatabaseAdmin();
    let account: AdminAccount | null = null;
    let readError: { message: string } | null = null;
    if (role === "platform") {
      const { data, error } = await db
        .from("platform_admins")
        .select("id,username,password_hash,display_name,status")
        .eq("username", username)
        .maybeSingle();
      account = data as AdminAccount | null;
      readError = error;
    } else {
      const { data, error } = await db
        .from("enterprise_admins")
        .select("id,enterprise_id,username,password_hash,display_name,status")
        .eq("username", username)
        .maybeSingle();
      account = data as AdminAccount | null;
      readError = error;
    }

    if (readError) {
      throw new Error(`读取管理员账号失败: ${readError.message}`);
    }

    if (
      !account ||
      account.status !== "active" ||
      !(await compare(password, String(account.password_hash)))
    ) {
      return NextResponse.json(
        { code: 401, message: "账号或密码错误", data: null },
        { status: 401 },
      );
    }

    const enterpriseId =
      role === "enterprise" && account.enterprise_id
        ? String(account.enterprise_id)
        : null;
    let enterprise: { code: string; name: string } | null = null;

    if (enterpriseId) {
      const { data, error: enterpriseError } = await db
        .from("enterprises")
        .select("code,name,status")
        .eq("id", enterpriseId)
        .maybeSingle();

      if (enterpriseError) {
        throw new Error(`读取企业失败: ${enterpriseError.message}`);
      }
      if (!data || data.status !== "active") {
        return NextResponse.json(
          { code: 403, message: "企业账号当前不可用", data: null },
          { status: 403 },
        );
      }
      enterprise = { code: String(data.code), name: String(data.name) };
    }

    const ipAddress = getRequestIp(request);
    const userAgent = getRequestUserAgent(request);
    const session = await createAdminSession({
      adminType: role,
      adminId: String(account.id),
      enterpriseId,
      ipAddress,
      userAgent,
    });

    const [logResult, lastLoginResult] = await Promise.all([
      db.from("admin_operation_logs").insert({
        admin_type: role,
        admin_id: account.id,
        enterprise_id: enterpriseId,
        operation: "login",
        target_type: "admin_session",
        target_id: session.sessionId,
        ip_address: ipAddress,
        user_agent: userAgent,
      }),
      db
        .from(role === "platform" ? "platform_admins" : "enterprise_admins")
        .update({ last_login_at: new Date().toISOString() })
        .eq("id", account.id),
    ]);

    if (logResult.error) {
      throw new Error(`记录登录日志失败: ${logResult.error.message}`);
    }
    if (lastLoginResult.error) {
      throw new Error(`更新登录时间失败: ${lastLoginResult.error.message}`);
    }

    const response = NextResponse.json({
      code: 0,
      message: "登录成功",
      data: {
        role,
        admin_id: account.id,
        username: account.username,
        display_name: account.display_name,
        enterprise_id: enterpriseId,
        enterprise_code: enterprise?.code || null,
        enterprise_name: enterprise?.name || null,
      },
    });

    setAdminSessionCookies(response, {
      token: session.token,
      adminType: role,
      adminId: String(account.id),
      enterpriseId,
    });

    return response;
  } catch (error) {
    console.error("Admin login failed:", error);
    return NextResponse.json(
      { code: 500, message: "登录服务暂不可用", data: null },
      { status: 500 },
    );
  }
}
