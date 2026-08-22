import type { MetadataRoute } from 'next'
import { SERVICE_ROUTES } from '@/lib/serviceRoutes'
import { CITIES } from '@/lib/citiesData'
import { AIRPORTS } from '@/lib/airportsData'

/**
 * Site audit — "Missing crawler files": /sitemap.xml returned the site's
 * branded 404 page because the route never existed. Next.js serves this
 * file's export at /sitemap.xml automatically.
 *
 * Per the audit's fix, this only lists canonical, indexable, successful
 * pages: it deliberately excludes login, booking steps, admin/dashboard
 * pages, and — per a follow-up review — every page that isn't actually
 * reachable via the Header, Footer, or homepage nav. Several filesystem
 * routes exist as duplicates or unlinked orphans of the pages below (e.g.
 * /services/business, /contact-us, /terms-and-conditions, an entire
 * unlinked /chauffeur-services city subtree) and are intentionally left
 * out until they're either wired into navigation or retired.
 *
 * Submitting this sitemap to Google Search Console and Bing Webmaster
 * Tools (per the audit) is a manual step outside this codebase — do that
 * once this is live.
 */

const SITE_URL = 'https://air2transport.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/',
    '/about-us',
    '/contact',
    '/fleet',
    '/cities',
    ...CITIES.map((city) => `/cities/${city.slug}`),
    '/airport-transfers',
    ...AIRPORTS.map((airport) => `/airport-transfers/${airport.slug}`),
    '/services',
    ...Object.values(SERVICE_ROUTES),
    '/privacy-policy',
    '/terms-of-service',
    '/cookie-policy',
  ]

  const lastModified = new Date()
  return paths.map((path) => ({ url: `${SITE_URL}${path}`, lastModified }))
}
