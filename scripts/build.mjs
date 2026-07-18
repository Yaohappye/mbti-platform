import { existsSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const projectRoot = resolve(process.env.COZE_WORKSPACE_PATH || process.cwd());

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: projectRoot,
    env: {
      ...process.env,
      NODE_ENV: "production",
      NEXT_TELEMETRY_DISABLED: "1",
    },
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
  const packageManagerCli = process.env.npm_execpath;
  if (!packageManagerCli) {
    throw new Error("Install project dependencies before building");
  }
  run(process.execPath, [
    packageManagerCli,
    "install",
    "--frozen-lockfile",
    "--prefer-offline",
  ]);
}

run(process.execPath, [
  resolve(projectRoot, "node_modules", "next", "dist", "bin", "next"),
  "build",
]);
