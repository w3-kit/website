import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  // tests/unit holds *.test.ts files for the Node test runner (npm test).
  testMatch: "**/*.spec.ts",
  timeout: 30000,
  use: {
    baseURL: "http://localhost:3000",
    headless: true,
  },
  projects: [
    { name: "chromium", use: { browserName: "chromium" } },
  ],
  webServer: {
    command: "npm run dev",
    port: 3000,
    reuseExistingServer: true,
  },
});
