import type { MetadataRoute } from 'next'
import { SERVICE_ROUTES } from '@/lib/serviceRoutes'
import { CITIES } from '@/lib/citiesData'
import { AIRPORTS } from '@/lib/airportsData'
import { SITE_URL } from '@/lib/siteConfig'

const CHAUFFEUR_TOUR_SLUGS = [
  'birmingham-tour',
  'cheltenham',
  'coventry',
  'derby',
  'leeds',
  'leicester',
  'london',
  'nottingham',
  'oxford',
  'peterborough',
  'sheffield',
]

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
 * /services/business, /terms-and-conditions) and are intentionally left
 * out until they're either wired into navigation or retired. (/contact-us
 * was one of these too, but it was also the target of ~25 internal
 * "Contact Us" links from indexed pages — not actually an orphan — so it
 * was retired with a permanent redirect to /contact instead of just left
 * unlisted.)
 *
 * The /chauffeur-services hub + city pages were a similar orphan subtree,
 * now wired in: given metadata/breadcrumbs, linked from the related
 * /services/chauffeur-services page, and listed here. They're positioned
 * as hourly/full-day chauffeur *hire* (title/description say so explicitly)
 * rather than point-to-point transfers, to avoid competing with /cities/*
 * for the five city names both trees cover (London, Coventry, Leeds,
 * Nottingham, Sheffield).
 *
 * Submitting this sitemap to Google Search Console and Bing Webmaster
 * Tools (per the audit) is a manual step outside this codebase — do that
 * once this is live.
 */

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
    '/chauffeur-services',
    ...CHAUFFEUR_TOUR_SLUGS.map((slug) => `/chauffeur-services/${slug}`),
    '/privacy-policy',
    '/terms-of-service',
    '/cookie-policy',
  ]

  const lastModified = new Date()
  return paths.map((path) => ({ url: `${SITE_URL}${path}`, lastModified }))
}
