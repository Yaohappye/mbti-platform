import "server-only";

import type { NextRequest } from "next/server";

export function getRequestIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || null;
}

export function getRequestUserAgent(request: NextRequest) {
  return request.headers.get("user-agent")?.slice(0, 1000) || null;
}
