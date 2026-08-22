import type { MetadataRoute } from 'next'

/**
 * Site audit — "Missing crawler files": /robots.txt returned the site's
 * branded 404 page because the route never existed. Next.js serves this
 * file's export at /robots.txt automatically.
 *
 * Per the audit's fix: allow crawling generally, disallow login, booking
 * steps, and other account/admin areas that shouldn't be indexed, and
 * point crawlers at the sitemap.
 */

const SITE_URL = 'https://air2transport.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/login/',
        '/register/',
        '/reset-password/',
        '/auth/',
        '/bookings/',
        '/dashboard/',
        '/admin/',
        '/profile/',
        '/driver/',
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
