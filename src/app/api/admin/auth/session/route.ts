import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/server/auth";
import { getDatabaseAdmin } from "@/lib/server/database";

export async function GET(request: NextRequest) {
  try {
    const session = await getAdminSession(request);
    if (!session) {
      return NextResponse.json(
        { code: 401, message: "登录已失效", data: null },
        { status: 401 },
      );
    }

    let enterprise = null;
    if (session.enterpriseId) {
      const db = getDatabaseAdmin();
      const { data, error } = await db
        .from("enterprises")
        .select("id,code,name,short_name,contact_name,contact_phone,avatar_url,status,credits,expiry_at")
        .eq("id", session.enterpriseId)
        .maybeSingle();
      if (error) throw new Error(error.message);
      enterprise = data;
    }

    return NextResponse.json({
      code: 0,
      message: "success",
      data: { ...session, enterprise },
    });
  } catch (error) {
    console.error("Read admin session failed:", error);
    return NextResponse.json(
      { code: 500, message: "读取登录状态失败", data: null },
      { status: 500 },
    );
  }
}
