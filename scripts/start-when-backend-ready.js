import process from "node:process";
import { spawn } from "node:child_process";
import { loadEnv } from "vite";

const frontendEnv = loadEnv("development", process.cwd(), "BACKEND_");
const backendOrigin = process.env.BACKEND_URL || frontendEnv.BACKEND_URL || "http://localhost:3001";
process.env.BACKEND_URL = backendOrigin;
const backendUrl = new URL("/api/health", backendOrigin);
const timeoutAt = Date.now() + 60_000;
let lastError = "the health endpoint did not return status ok";
let backendReady = false;

while (Date.now() < timeoutAt) {
  try {
    const response = await fetch(backendUrl, { signal: AbortSignal.timeout(2000) });
    const health = response.ok ? await response.json() : null;
    if (health?.status === "ok") {
      backendReady = true;
      break;
    }
    lastError = `health endpoint returned HTTP ${response.status}`;
  } catch (error) {
    lastError = error.message;
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));
}

if (!backendReady) {
  console.error(
    `Backend not ready at ${backendUrl} after 60 seconds (${lastError}). Start the backend first or set BACKEND_URL.`,
  );
  process.exit(1);
}

console.log(`Backend is ready at ${backendUrl}; starting the frontend.`);
const vite = spawn(process.execPath, ["node_modules/vite/bin/vite.js", "dev"], {
  stdio: "inherit",
});

vite.on("error", (error) => {
  console.error("Could not start the frontend:", error);
  process.exitCode = 1;
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => vite.kill(signal));
}

vite.on("exit", (code, signal) => {
  process.exitCode = code ?? (signal ? 1 : 0);
});
