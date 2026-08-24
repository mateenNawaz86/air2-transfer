import { SITE_URL } from '@/lib/siteConfig'

/**
 * Site audit — "No structured data": adds JSON-LD schema based only on
 * verifiable information already published on the site (phone, email,
 * general "Birmingham, UK" area, 24/7 availability, logo) — deliberately
 * no fabricated street address, no invented social profiles (none exist
 * on the site to link), and no review/rating markup, per the audit's own
 * instruction not to add anything that isn't genuine.
 */

const BUSINESS_NAME = 'Air2Transport'
const LOGO_URL = 'https://assetshost.sirv.com/jet2transport/logoair2.png'
const TELEPHONE = '+441213141080'
const EMAIL = 'info@air2transport.com'

const ALL_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'TaxiService'],
    name: BUSINESS_NAME,
    url: SITE_URL,
    logo: LOGO_URL,
    image: LOGO_URL,
    telephone: TELEPHONE,
    email: EMAIL,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Birmingham',
      addressCountry: 'GB',
    },
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ALL_DAYS,
      opens: '00:00',
      closes: '23:59',
    },
  }
}

export function buildServiceSchema({
  name,
  description,
  path,
}: {
  name: string
  description: string
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: name,
    name,
    description,
    url: `${SITE_URL}${path}`,
    provider: {
      '@type': 'LocalBusiness',
      name: BUSINESS_NAME,
      url: SITE_URL,
      telephone: TELEPHONE,
    },
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
  }
}

export function buildBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

export function buildFaqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}
