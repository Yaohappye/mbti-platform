import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  const currentPath = request.nextUrl.pathname;
  const isLoginRoute = currentPath === "/admin/login";

  // 无登录凭证，访问后台页面 → 强制跳登录页
  if (!token && !isLoginRoute) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // 已登录但停留在登录页，直接放行，不自动跳转，杜绝循环回弹
  if (token && isLoginRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
