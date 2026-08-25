import { buildPageMetadata } from '@/lib/pageMetadata'
import { buildBreadcrumbSchema, buildServiceSchema } from '@/lib/structuredData'
import JsonLd from '@/components/JsonLd'

// Deliberately distinct from /airport-transfers/'s title & description: that
// page is the browse-by-airport directory (like /cities is for cities), this
// page describes the airport transfer service itself, alongside its four
// sibling /services/* pages. Two live URLs previously carried the exact same
// <title> and meta description — a literal duplicate-content signal to
// search engines despite each page being genuinely useful on its own.
const TITLE = 'Professional Airport Transfer Service'
const DESCRIPTION =
  'Fixed-price, chauffeur-driven airport transfers across the UK with flight monitoring, meet-and-greet and a premium fleet — part of our full range of chauffeur services.'
const PATH = '/services/airport-transfers/'

export const metadata = buildPageMetadata({
  path: PATH,
  title: `${TITLE} | Air2Transport`,
  description: DESCRIPTION,
})

const breadcrumb = buildBreadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services/' },
  { name: 'Airport Transfers', path: PATH },
])

const service = buildServiceSchema({ name: TITLE, description: DESCRIPTION, path: PATH })

export default function AirportTransfersServiceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={service} />
      {children}
    </>
  )
}
