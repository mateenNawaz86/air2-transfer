import { defineConfig, devices } from '@playwright/test'

/**
 * Visual regression coverage for the breakpoints called out in the site audit:
 * 375 (mobile), 768 (tablet), 1280 (small desktop), 1440 (desktop).
 * Heights are arbitrary but tall enough to include the hero without cropping it.
 */
const VIEWPORTS = {
  'mobile-375': { width: 375, height: 812 },
  'tablet-768': { width: 768, height: 1024 },
  'desktop-1280': { width: 1280, height: 800 },
  'desktop-1440': { width: 1440, height: 900 },
} as const

export default defineConfig({
  testDir: './tests/visual',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1,
  reporter: [['html', { open: 'never' }]],
  snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{arg}-{projectName}{ext}',
  // Homepage images are hotlinked from an external CDN (assetshost.sirv.com);
  // give screenshot comparisons room to wait on that network round trip
  // instead of racing it.
  timeout: 60_000,

  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3100',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  expect: {
    timeout: 15_000,
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.02,
      animations: 'disabled',
    },
  },

  projects: Object.entries(VIEWPORTS).map(([name, viewport]) => ({
    name,
    use: { ...devices['Desktop Chrome'], viewport },
  })),

  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: 'npm run build && npm run start -- -p 3100',
        url: 'http://localhost:3100',
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
      },
})
