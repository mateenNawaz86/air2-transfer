import { buildPageMetadata } from '@/lib/pageMetadata'
import { buildBreadcrumbSchema } from '@/lib/structuredData'
import JsonLd from '@/components/JsonLd'

export const metadata = buildPageMetadata({
  path: '/services/hospitality/',
  title: 'Hospitality & PR Events Chauffeur Service | Air2Transport',
  description:
    'Chauffeur transport for hospitality, PR and corporate events across the UK.',
})

const breadcrumb = buildBreadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services/' },
  { name: 'Hospitality & PR Events', path: '/services/hospitality/' },
])

export default function HospitalityLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb} />
      {children}
    </>
  )
}
