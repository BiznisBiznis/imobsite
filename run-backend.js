#!/usr/bin/env node

// Simple backend runner for development
// This will start the backend server with the mock data fallbacks

const { spawn } = require("child_process");
const path = require("path");

console.log("🚀 Starting Casa Vis Backend Server...");
console.log("📁 Backend directory:", path.join(__dirname, "backend"));

const backend = spawn("node", ["start-dev.js"], {
  cwd: path.join(__dirname, "backend"),
  stdio: "inherit",
});

backend.on("error", (error) => {
  console.error("❌ Failed to start backend:", error.message);
  process.exit(1);
});

backend.on("close", (code) => {
  console.log(`🔚 Backend process exited with code ${code}`);
  process.exit(code);
});

// Handle Ctrl+C gracefully
process.on("SIGINT", () => {
  console.log("\n🛑 Shutting down backend server...");
  backend.kill("SIGINT");
});

process.on("SIGTERM", () => {
  console.log("\n🛑 Shutting down backend server...");
  backend.kill("SIGTERM");
});
