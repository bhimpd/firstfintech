import path from "node:path";
import { defineConfig, devices } from "@playwright/test";

import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, ".env.local") });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./src/tests",
  testMatch: ["**/*.spec.ts", "**/*.setup.ts"],
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 1,
  workers: process.env.CI ? 1 : undefined,
  // reporter: "html",
  reporter: [["line"], ["allure-playwright"]],

  use: {
    baseURL: "",
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    // For screenshot
    screenshot: "only-on-failure",
    // for screen record
    video: "retain-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [


    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],


        // launchOptions: {
        //     slowMo: 1500,
        // },
      },
    },

  ],

  timeout: 60000, // Set timeout to 1 minute
});
