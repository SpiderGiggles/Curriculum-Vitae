import 'dotenv/config';
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  outputDir: "./test-results",
  timeout: 3 * 60 * 1000,
  expect: {
    timeout: 60000,
  },
  testDir: "./tests",
  forbidOnly: !!process.env.CI,
  retries: 0,
  fullyParallel: true,

  reporter: process.env.CI
  ? [
      ['junit', { outputFile: 'reports/junit/results.xml' }],
      ['html', { open: 'never', outputFolder: 'playwright-report' }],
      // ['github'], // uncomment for GitHub Actions annotations
    ]
  : [
      ['list'],
      ['html', { open: 'on-failure', outputFolder: 'playwright-report' }],
      ['monocart-reporter', {
        name: 'Automation Showcase',
        outputFile: 'playwright-report/monocart.html',
        trend: 'playwright-report/trend.json',
      }],
    ],

  use: {
    baseURL: process.env.BASE_URL ?? "https://practicesoftwaretesting.com/",
    screenshot: { mode: "only-on-failure", fullPage: true },
    trace: {
      mode: "retain-on-first-failure",
      snapshots: true,
      screenshots: true,
      sources: true,
      attachments: true,
    },
    video: { mode: "retain-on-failure", size: { width: 1920, height: 1080 } },
    actionTimeout: 30 * 1000,
    viewport: { width: 1920, height: 1080 },
  },

  projects: [
    {
      name: "Critical Sanity",
      testMatch: ["tests/Critical Sanity/**/*.test.ts"],
      use: { ...devices["Desktop Edge"], channel: "msedge" },
    },
    {
      name: "Smoke Sanity",
      testMatch: ["tests/Smoke Sanity/**/*.test.ts"],
      use: { ...devices["Desktop Edge"], channel: "msedge" },
    },
  ],
});
