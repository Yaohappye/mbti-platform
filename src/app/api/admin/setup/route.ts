import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { getDatabaseAdmin } from "@/lib/server/database";

export async function POST(request: NextRequest) {
  try {
    const configuredSecret = process.env.ADMIN_SETUP_SECRET?.trim();
    const suppliedSecret = request.headers.get("x-admin-setup-secret")?.trim();

    if (!configuredSecret || suppliedSecret !== configuredSecret) {
      return NextResponse.json(
        { code: 401, message: "未授权", data: null },
        { status: 401 },
      );
    }

    const body = await request.json().catch(() => ({}));
    const username = String(body?.username || "").trim();
    const password = String(body?.password || "");
    const displayName = String(body?.displayName || "平台管理员").trim();

    if (!username || password.length < 10) {
      return NextResponse.json(
        { code: 400, message: "账号不能为空，密码至少10位", data: null },
        { status: 400 },
      );
    }

    const db = getDatabaseAdmin();
    const { count, error: countError } = await db
      .from("platform_admins")
      .select("id", { count: "exact", head: true });

    if (countError) throw new Error(countError.message);
    if ((count || 0) > 0) {
      return NextResponse.json(
        { code: 409, message: "平台管理员已经初始化", data: null },
        { status: 409 },
      );
    }

    const passwordHash = await hash(password, 12);
    const { data, error } = await db
      .from("platform_admins")
      .insert({
        username,
        password_hash: passwordHash,
        display_name: displayName,
      })
      .select("id,username,display_name,created_at")
      .single();

    if (error) throw new Error(error.message);

    return NextResponse.json({
      code: 0,
      message: "平台管理员初始化成功",
      data,
    });
  } catch (error) {
    console.error("Admin setup failed:", error);
    return NextResponse.json(
      { code: 500, message: "初始化失败", data: null },
      { status: 500 },
    );
  }
}
