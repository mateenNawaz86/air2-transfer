import { buildPageMetadata } from '@/lib/pageMetadata'
import { buildBreadcrumbSchema } from '@/lib/structuredData'
import JsonLd from '@/components/JsonLd'

export const metadata = buildPageMetadata({
  path: '/chauffeur-services/',
  title: 'Executive Chauffeur Tours & Hourly Hire | Air2Transport',
  description:
    "Book an executive chauffeur by the hour or for a full-day tour across the UK's major cities, with a professional driver and premium fleet.",
})

const breadcrumb = buildBreadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Chauffeur Services', path: '/chauffeur-services/' },
])

export default function ChauffeurServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb} />
      {children}
    </>
  )
}
