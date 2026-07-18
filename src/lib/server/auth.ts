import "server-only";

import type { NextRequest, NextResponse } from "next/server";
import { getDatabaseAdmin } from "@/lib/server/database";

export type AdminRole = "platform" | "enterprise";

export interface AdminSession {
  sessionId: string;
  adminType: AdminRole;
  adminId: string;
  enterpriseId: string | null;
  username: string;
  displayName: string | null;
  expiresAt: string;
}

const SESSION_COOKIE = "admin_token";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24;

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = "";
  bytes.forEach((value) => {
    binary += String.fromCharCode(value);
  });
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function createOpaqueToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return bytesToBase64Url(bytes);
}

async function hashToken(token: string) {
  const secret = process.env.SESSION_SECRET?.trim();
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET must contain at least 32 characters");
  }

  const encoded = new TextEncoder().encode(`${secret}:${token}`);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(digest))
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("");
}

export async function createAdminSession(input: {
  adminType: AdminRole;
  adminId: string;
  enterpriseId?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
}) {
  const token = createOpaqueToken();
  const tokenHash = await hashToken(token);
  const expiresAt = new Date(
    Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
  ).toISOString();
  const db = getDatabaseAdmin();

  const { data, error } = await db
    .from("admin_sessions")
    .insert({
      token_hash: tokenHash,
      admin_type: input.adminType,
      admin_id: input.adminId,
      enterprise_id: input.enterpriseId || null,
      ip_address: input.ipAddress || null,
      user_agent: input.userAgent || null,
      expires_at: expiresAt,
    })
    .select("id")
    .single();

  if (error || !data) {
    throw new Error(`Create admin session failed: ${error?.message || "no data"}`);
  }

  return { token, expiresAt, sessionId: String(data.id) };
}

export function setAdminSessionCookies(
  response: NextResponse,
  input: {
    token: string;
    adminType: AdminRole;
    enterpriseId?: string | null;
    adminId: string;
  },
) {
  const secure = process.env.NODE_ENV === "production";
  const common = {
    httpOnly: true,
    secure,
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  };

  response.cookies.set(SESSION_COOKIE, input.token, common);
  response.cookies.set("admin_role", input.adminType, common);
  response.cookies.set("admin_id", input.adminId, common);

  if (input.enterpriseId) {
    response.cookies.set("enterprise_id", input.enterpriseId, common);
  } else {
    response.cookies.delete("enterprise_id");
  }
}

export function clearAdminSessionCookies(response: NextResponse) {
  for (const name of [
    SESSION_COOKIE,
    "admin_role",
    "admin_id",
    "enterprise_id",
    "enterprise_name",
  ]) {
    response.cookies.set(name, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
  }
}

export async function getAdminSession(
  request: NextRequest,
): Promise<AdminSession | null> {
  const token = request.cookies.get(SESSION_COOKIE)?.value?.trim();
  if (!token) return null;

  const tokenHash = await hashToken(token);
  const db = getDatabaseAdmin();
  const { data: stored, error } = await db
    .from("admin_sessions")
    .select("id,admin_type,admin_id,enterprise_id,expires_at,revoked_at")
    .eq("token_hash", tokenHash)
    .is("revoked_at", null)
    .gt("expires_at", new Date().toISOString())
    .maybeSingle();

  if (error) {
    throw new Error(`Read admin session failed: ${error.message}`);
  }
  if (!stored) return null;

  const adminType = stored.admin_type as AdminRole;
  const table = adminType === "platform" ? "platform_admins" : "enterprise_admins";
  const { data: admin, error: adminError } = await db
    .from(table)
    .select("username,display_name,status")
    .eq("id", stored.admin_id)
    .maybeSingle();

  if (adminError) {
    throw new Error(`Read admin account failed: ${adminError.message}`);
  }
  if (!admin || admin.status !== "active") return null;

  return {
    sessionId: String(stored.id),
    adminType,
    adminId: String(stored.admin_id),
    enterpriseId: stored.enterprise_id ? String(stored.enterprise_id) : null,
    username: String(admin.username),
    displayName: admin.display_name ? String(admin.display_name) : null,
    expiresAt: String(stored.expires_at),
  };
}

export async function requireAdminSession(
  request: NextRequest,
  allowed: AdminRole | AdminRole[],
) {
  const session = await getAdminSession(request);
  const allowedRoles = Array.isArray(allowed) ? allowed : [allowed];

  if (!session || !allowedRoles.includes(session.adminType)) {
    return null;
  }

  return session;
}

export async function revokeAdminSession(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value?.trim();
  if (!token) return;

  const tokenHash = await hashToken(token);
  const db = getDatabaseAdmin();
  const { error } = await db
    .from("admin_sessions")
    .update({ revoked_at: new Date().toISOString() })
    .eq("token_hash", tokenHash)
    .is("revoked_at", null);

  if (error) {
    throw new Error(`Revoke admin session failed: ${error.message}`);
  }
}
