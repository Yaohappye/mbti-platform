import { after, NextRequest, NextResponse } from "next/server";
import {
  clearAdminSessionCookies,
  revokeAdminSession,
} from "@/lib/server/auth";

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ code: 0, message: "已退出登录" });
  clearAdminSessionCookies(response);
  response.headers.set("Cache-Control", "no-store");

  // The browser only needs the cookies cleared before it can leave the admin
  // area. Persist the server-side revocation after returning the response.
  after(async () => {
    try {
      await revokeAdminSession(request);
    } catch (error) {
      console.error("Admin logout session revoke failed:", error);
    }
  });

  return response;
}
