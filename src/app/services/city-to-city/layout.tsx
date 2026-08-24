import { buildPageMetadata } from '@/lib/pageMetadata'
import { buildBreadcrumbSchema } from '@/lib/structuredData'
import JsonLd from '@/components/JsonLd'

export const metadata = buildPageMetadata({
  path: '/services/city-to-city/',
  title: 'City to City Long Distance Car Service | Air2Transport',
  description:
    'Comfortable long-distance car service between UK cities, with professional drivers and fixed pricing.',
})

const breadcrumb = buildBreadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services/' },
  { name: 'City to City Car Service', path: '/services/city-to-city/' },
])

export default function CityToCityLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb} />
      {children}
    </>
  )
}
