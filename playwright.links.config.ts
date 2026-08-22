import { defineConfig } from '@playwright/test'

/**
 * Internal-link integrity check from the site audit: crawl every internal
 * href reachable from the homepage and fail if any resolves to a non-2xx
 * status (following redirects). Runs as a plain HTTP crawl (no browser),
 * so it's kept in its own config/project rather than the visual-regression
 * one to avoid multiplying requests across viewport projects.
 */
export default defineConfig({
  testDir: './tests/links',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: [['list']],
  timeout: 120_000,

  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3200',
  },

  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: 'npm run build && npm run start -- -p 3200',
        url: 'http://localhost:3200',
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
      },
})
