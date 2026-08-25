import { test, expect, type Locator } from '@playwright/test'

/**
 * Guards against the regression from the site audit: lower homepage sections
 * (Airport Transfers, Why Choose Air2Transport, Get an Instant Quote, Ready to
 * Book Your Ride, Footer) rendering with their text present in the DOM but
 * visually hidden or covered (opacity: 0 / bad stacking context) at some
 * viewport widths. Run across the breakpoints named in the audit: 375, 768,
 * 1280, 1440.
 */

// { level: 1 } is the hero h1 (its accessible name concatenates a child
// <span>, so it's matched by substring); everything else is a top-level (h2)
// section heading matched by exact text. Several of these strings also
// appear as h3 service/feature card titles elsewhere on the page, so level +
// exact text keep each locator pinned to a single element.
const SECTION_HEADINGS: Array<{ name: string; level: 1 | 2; exact?: boolean }> = [
  { name: 'Your Trusted Partner', level: 1, exact: false },
  { name: 'Why Choose Air2Transport?', level: 2 },
  { name: 'Our Services', level: 2 },
  // Renamed from 'Airport Transfers' / duplicate 'Why Choose Air2Transport'
  // when the two identically-titled "why choose" sections were deduped and
  // the homepage section order was revised (see git history on this file).
  { name: 'Airport Transfers Across the UK', level: 2 },
  { name: 'Included with Every Airport Transfer', level: 2 },
  { name: 'Our Fleet', level: 2 },
  { name: 'How Booking Works', level: 2 },
  { name: 'What Our Customers Say About Us!', level: 2 },
  { name: 'Get an Instant Quote', level: 2 },
  { name: 'Intercity Travel', level: 2 },
  { name: 'Ready to Book Your Ride?', level: 2 },
]

async function expectOpaque(locator: Locator) {
  await expect(locator).toBeVisible()
  const opacity = await locator.evaluate((el) => getComputedStyle(el).opacity)
  expect.soft(Number(opacity)).toBeGreaterThan(0)
}

test.describe('Homepage visual regression', () => {
  test('renders every section without needing scroll (no hidden/covered content)', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })

    // Assert on real visibility first: a passing screenshot is worthless if the
    // baseline itself was captured with content stuck invisible.
    for (const { name, level, exact = true } of SECTION_HEADINGS) {
      await expectOpaque(page.getByRole('heading', { name, level, exact }))
    }
    await expectOpaque(page.locator('footer'))

    await expect(page).toHaveScreenshot('homepage-full.png', { fullPage: true })
  })

  test('hero section is not clipped or covered by adjacent content', async ({ page }) => {
    await page.goto('/')

    const hero = page.locator('section').first()
    await expect(hero).toBeVisible()
    await expect(hero.getByRole('heading', { name: 'Your Trusted Partner' })).toBeVisible()
    await expect(hero.getByRole('link', { name: 'BOOK NOW' })).toBeVisible()

    await expect(hero).toHaveScreenshot('hero.png')
  })
})
