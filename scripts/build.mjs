import { existsSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const projectRoot = resolve(process.env.COZE_WORKSPACE_PATH || process.cwd());
const pnpm = process.platform === "win32" ? "pnpm.cmd" : "pnpm";

function run(args) {
  const result = spawnSync(pnpm, args, {
    cwd: projectRoot,
    env: {
      ...process.env,
      NODE_ENV: "production",
      NEXT_TELEMETRY_DISABLED: "1",
    },
    shell: process.platform === "win32",
    stdio: "inherit",
  });

  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

rmSync(resolve(projectRoot, ".next"), { recursive: true, force: true });

if (
  !existsSync(resolve(projectRoot, "node_modules")) ||
  !existsSync(resolve(projectRoot, "node_modules", ".modules.yaml"))
) {
  run(["install", "--frozen-lockfile", "--prefer-offline"]);
}

run(["next", "build"]);
