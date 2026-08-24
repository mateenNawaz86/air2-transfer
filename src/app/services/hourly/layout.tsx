import { buildPageMetadata } from '@/lib/pageMetadata'
import { buildBreadcrumbSchema } from '@/lib/structuredData'
import JsonLd from '@/components/JsonLd'

export const metadata = buildPageMetadata({
  path: '/services/hourly/',
  title: 'Hourly & Full Day Chauffeur Services | Air2Transport',
  description:
    'Flexible hourly and full-day chauffeur hire across the UK, with professional drivers and a premium fleet.',
})

const breadcrumb = buildBreadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services/' },
  { name: 'Hourly & Full Day Hire', path: '/services/hourly/' },
])

export default function HourlyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb} />
      {children}
    </>
  )
}
