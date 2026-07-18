import { NextRequest, NextResponse } from "next/server";
import {
  clearAdminSessionCookies,
  revokeAdminSession,
} from "@/lib/server/auth";

export async function POST(request: NextRequest) {
  try {
    await revokeAdminSession(request);
  } catch (error) {
    console.error("Admin logout session revoke failed:", error);
  }

  const response = NextResponse.json({ code: 0, message: "已退出登录" });
  clearAdminSessionCookies(response);
  return response;
}
