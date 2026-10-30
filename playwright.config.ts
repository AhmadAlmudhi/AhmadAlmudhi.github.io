import { defineConfig, devices } from "@playwright/test";

// End-to-end tests against the built static export (npm run build first). They drive the installed
// Google Chrome (`channel: "chrome"`), which GitHub's Ubuntu runners have too, so no browser download.
export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://localhost:4173",
    channel: "chrome",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], channel: "chrome", viewport: { width: 1440, height: 900 } } },
    { name: "phone", use: { ...devices["Pixel 7"], channel: "chrome" } },
  ],
  webServer: {
    command: "node scripts/serve.mjs",
    url: "http://localhost:4173",
    reuseExistingServer: !process.env.CI,
  },
});
