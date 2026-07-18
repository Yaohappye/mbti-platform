import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const projectRoot = resolve(process.env.COZE_WORKSPACE_PATH || process.cwd());

function patchOpenNextWindowsSymlinks() {
  if (process.platform !== "win32") return;

  const pnpmStore = resolve(projectRoot, "node_modules", ".pnpm");
  const packageDirectory = readdirSync(pnpmStore).find((name) =>
    name.startsWith("@opennextjs+aws@"),
  );
  if (!packageDirectory) {
    throw new Error("Unable to locate the OpenNext AWS build helper");
  }

  const helperPath = resolve(
    pnpmStore,
    packageDirectory,
    "node_modules",
    "@opennextjs",
    "aws",
    "dist",
    "build",
    "copyTracedFiles.js",
  );
  const source = readFileSync(helperPath, "utf8");
  if (source.includes('e.code === "EPERM" && process.platform === "win32"')) {
    return;
  }

  const original = `            catch (e) {
                if (e.code !== "EEXIST") {
                    throw e;
                }
            }`;
  const replacement = `            catch (e) {
                if (e.code === "EPERM" && process.platform === "win32") {
                    cpSync(from, to, { recursive: true, dereference: true });
                }
                else if (e.code !== "EEXIST") {
                    throw e;
                }
            }`;

  if (!source.includes(original)) {
    throw new Error("OpenNext Windows compatibility patch no longer applies");
  }
  writeFileSync(helperPath, source.replace(original, replacement));
}

patchOpenNextWindowsSymlinks();

const openNextCli = resolve(
  projectRoot,
  "node_modules",
  "@opennextjs",
  "cloudflare",
  "dist",
  "cli",
  "index.js",
);
const build = spawnSync(process.execPath, [openNextCli, "build"], {
  cwd: projectRoot,
  env: process.env,
  stdio: "inherit",
});

if (build.error) {
  throw build.error;
}

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

const openNext = resolve(projectRoot, ".open-next");
const dist = resolve(projectRoot, "dist");
const server = resolve(dist, "server");
const client = resolve(dist, "client");
const hostingOutput = resolve(dist, ".openai");

rmSync(dist, { recursive: true, force: true });
mkdirSync(server, { recursive: true });
mkdirSync(client, { recursive: true });
mkdirSync(hostingOutput, { recursive: true });

// Sites runs dist/server/index.js as the Worker entrypoint. Keep the rest of
// the OpenNext server bundle beside it so generated relative imports remain
// valid, and expose static files through Sites' client asset directory.
cpSync(openNext, server, { recursive: true });
renameSync(resolve(server, "worker.js"), resolve(server, "index.js"));
rmSync(resolve(server, "assets"), { recursive: true, force: true });
cpSync(resolve(openNext, "assets"), client, { recursive: true });
cpSync(
  resolve(projectRoot, ".openai", "hosting.json"),
  resolve(hostingOutput, "hosting.json"),
);

if (!existsSync(resolve(server, "index.js"))) {
  throw new Error("Sites Worker entrypoint was not created");
}
