import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cachedClient: SupabaseClient | null = null;

type AppEnvironment = "local" | "production";

function requiredEnv(...names: string[]) {
  for (const name of names) {
    const value = process.env[name]?.trim();
    if (value) return value;
  }

  throw new Error(`Missing required deployment environment variable: ${names[0]}`);
}

export function getDatabaseAdmin(): SupabaseClient {
  if (cachedClient) return cachedClient;

  const appEnvironment = requiredEnv("APP_ENVIRONMENT") as AppEnvironment;
  if (appEnvironment !== "local" && appEnvironment !== "production") {
    throw new Error("APP_ENVIRONMENT must be local or production");
  }

  const url = requiredEnv("SUPABASE_URL", "COZE_SUPABASE_URL");
  const serviceRoleKey = requiredEnv(
    "SUPABASE_SERVICE_ROLE_KEY",
    "COZE_SUPABASE_SERVICE_ROLE_KEY",
  );

  const databaseHostname = new URL(url).hostname;
  const isLocalDatabase = ["127.0.0.1", "localhost", "::1"].includes(
    databaseHostname,
  );
  if (appEnvironment === "local" && !isLocalDatabase) {
    throw new Error("Local application is not allowed to use the cloud database");
  }
  if (appEnvironment === "production" && isLocalDatabase) {
    throw new Error("Production application is not allowed to use the local database");
  }

  cachedClient = createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
    global: {
      headers: {
        "X-Client-Info": "mbti-platform-server",
      },
    },
  });

  return cachedClient;
}

export function isDatabaseConfigured() {
  return Boolean(
    process.env.APP_ENVIRONMENT &&
      (process.env.SUPABASE_URL || process.env.COZE_SUPABASE_URL) &&
      (process.env.SUPABASE_SERVICE_ROLE_KEY ||
        process.env.COZE_SUPABASE_SERVICE_ROLE_KEY),
  );
}

export function assertDatabaseResult<T>(
  result: { data: T | null; error: { message: string; code?: string } | null },
  operation: string,
): T {
  if (result.error) {
    throw new Error(`${operation}: ${result.error.message}`);
  }
  if (result.data === null) {
    throw new Error(`${operation}: database returned no data`);
  }
  return result.data;
}
