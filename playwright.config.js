// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  
  /* Increase default timeout (fixes 30s failures) */
  timeout: 60 * 1000, // 60 seconds per test

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if test.only is left */
  forbidOnly: !!process.env.CI,

  /* Retry failed tests */
  retries: process.env.CI ? 2 : 1,

  /* Limit workers on CI to reduce flakiness */
  workers: process.env.CI ? 1 : 2,

  /* Reporter */
  reporter: [
    ['html'],
    ['list']
  ],

  /* Shared settings */
  use: {
    /* Headless by default */
    headless: true,

    /* Action timeout (click, fill, etc.) */
    actionTimeout: 15 * 1000,

    /* Navigation timeout */
    navigationTimeout: 30 * 1000,

    /* Helpful for debugging failures */
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    /* Trace only when retrying */
    trace: 'on-first-retry',
  },

  /* Browser projects */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],
});
