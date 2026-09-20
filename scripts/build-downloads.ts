import { spawnSync } from "node:child_process";
import path from "node:path";
import { loadEnvConfig } from "@next/env";

async function main() {
  // Match Next.js public contact configuration without exposing server secrets.
  loadEnvConfig(process.cwd());
  const [{ siteConfig }, { coachingModules }, { institutionalDownloads }] = await Promise.all([
    import("../lib/site-config"),
    import("../lib/content/modules"),
    import("../lib/content/downloads"),
  ]);
  const python = process.env.PDF_PYTHON || process.env.CODEX_PRIMARY_RUNTIME_PYTHON || "python3";
  const result = spawnSync(python, [path.resolve("scripts/render-downloads.py")], {
    input: JSON.stringify({ site: siteConfig, modules: coachingModules, downloads: institutionalDownloads }),
    encoding: "utf8",
    maxBuffer: 4 * 1024 * 1024,
  });
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
