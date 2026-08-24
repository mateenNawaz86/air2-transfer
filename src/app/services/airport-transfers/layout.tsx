import { buildPageMetadata } from '@/lib/pageMetadata'
import { buildBreadcrumbSchema, buildServiceSchema } from '@/lib/structuredData'
import JsonLd from '@/components/JsonLd'

const TITLE = 'UK Airport Transfers with Flight Monitoring'
const DESCRIPTION =
  'Pre-book reliable UK airport transfers with real-time flight monitoring, meet-and-greet options and fixed pricing before you travel.'
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
