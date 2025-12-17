import { spawn } from "node:child_process";

const port = process.env.PORT || "10000";

// Railway expects the web process to bind to 0.0.0.0:$PORT
const listen = `tcp://0.0.0.0:${port}`;

const child = spawn("serve", ["-s", "dist", "-l", listen], {
  stdio: "inherit",
  // On Windows, npm adds node_modules/.bin to PATH, but launching .cmd shims
  // is most reliable via a shell.
  shell: process.platform === "win32",
});

child.on("exit", (code) => process.exit(code ?? 0));

