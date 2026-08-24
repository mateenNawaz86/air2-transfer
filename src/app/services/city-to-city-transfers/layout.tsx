import { buildPageMetadata } from '@/lib/pageMetadata'
import { buildBreadcrumbSchema, buildServiceSchema } from '@/lib/structuredData'
import JsonLd from '@/components/JsonLd'

const TITLE = 'Long-Distance City to City Transfers'
const DESCRIPTION =
  'Comfortable long-distance transfers between UK cities, with fixed pricing and professional drivers for every intercity journey.'
const PATH = '/services/city-to-city-transfers/'

export const metadata = buildPageMetadata({
  path: PATH,
  title: `${TITLE} | Air2Transport`,
  description: DESCRIPTION,
})

const breadcrumb = buildBreadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services/' },
  { name: 'City to City Transfers', path: PATH },
])

const service = buildServiceSchema({ name: TITLE, description: DESCRIPTION, path: PATH })

export default function CityToCityTransfersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={service} />
      {children}
    </>
  )
}
