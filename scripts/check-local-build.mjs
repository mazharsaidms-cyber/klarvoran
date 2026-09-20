import { spawn } from "node:child_process";

// Server and client share the same execution/network environment.
const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", "3091"], {
  stdio: ["ignore", "pipe", "pipe"],
});

try {
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Local production server did not start")), 15000);
    server.once("error", (error) => { clearTimeout(timer); reject(error); });
    server.once("exit", (code) => { clearTimeout(timer); reject(new Error(`Server exited: ${code}`)); });
    server.stderr.on("data", (data) => process.stderr.write(data));
    server.stdout.on("data", (data) => {
      if (data.toString().includes("Ready")) { clearTimeout(timer); resolve(); }
    });
  });
  process.env.SITE_QA_URL = "http://127.0.0.1:3091";
  await import("./check-local-seo.mjs");
} finally {
  server.kill("SIGTERM");
}
