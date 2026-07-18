import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config({ path: process.env.ENV_FILE || ".env.local" });
dotenv.config();

const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
if (!databaseUrl) {
  throw new Error("Missing DATABASE_URL (or POSTGRES_URL)");
}

const appEnvironment = process.env.APP_ENVIRONMENT;
if (appEnvironment !== "local" && appEnvironment !== "production") {
  throw new Error("APP_ENVIRONMENT must be local or production");
}

const databaseHostname = new URL(databaseUrl).hostname;
const isLocalDatabase = ["127.0.0.1", "localhost", "::1"].includes(
  databaseHostname,
);
if (appEnvironment === "local" && !isLocalDatabase) {
  throw new Error("Refusing to run a local migration against a remote database");
}
if (appEnvironment === "production" && isLocalDatabase) {
  throw new Error("Refusing to run a production migration against a local database");
}

const migrationsDirectory = path.resolve(process.cwd(), "supabase", "migrations");
async function main() {
  const files = (await readdir(migrationsDirectory))
    .filter((file) => file.endsWith(".sql"))
    .sort();

  if (files.length === 0) throw new Error("No SQL migrations found");

  const client = new pg.Client({ connectionString: databaseUrl });
  await client.connect();

  try {
  await client.query(`
    create table if not exists public.schema_migrations (
      filename text primary key,
      checksum char(64) not null,
      applied_at timestamptz not null default now()
    )
  `);

  for (const filename of files) {
    const sql = await readFile(path.join(migrationsDirectory, filename), "utf8");
    const checksum = createHash("sha256").update(sql).digest("hex");
    const existing = await client.query<{ checksum: string }>(
      "select checksum from public.schema_migrations where filename = $1",
      [filename],
    );
    if (existing.rowCount) {
      if (existing.rows[0].checksum !== checksum) {
        throw new Error(`Migration ${filename} changed after it was applied`);
      }
      console.log(`skip ${filename}`);
      continue;
    }

    await client.query("begin");
    try {
      await client.query("select pg_advisory_xact_lock(684274913)");
      await client.query(sql);
      await client.query(
        "insert into public.schema_migrations (filename, checksum) values ($1, $2)",
        [filename, checksum],
      );
      await client.query("commit");
      console.log(`applied ${filename}`);
    } catch (error) {
      await client.query("rollback");
      throw error;
    }
  }
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
