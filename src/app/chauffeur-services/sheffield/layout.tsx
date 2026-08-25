import { buildPageMetadata } from '@/lib/pageMetadata'
import { buildBreadcrumbSchema } from '@/lib/structuredData'
import JsonLd from '@/components/JsonLd'

export const metadata = buildPageMetadata({
  path: '/chauffeur-services/sheffield/',
  title: 'Sheffield Chauffeur Tour & Hourly Hire | Air2Transport',
  description:
    'Hire a professional chauffeur by the hour or for a full-day tour in Sheffield, with a premium fleet and flexible, custom itineraries.',
})

const breadcrumb = buildBreadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Chauffeur Services', path: '/chauffeur-services/' },
  { name: 'Sheffield', path: '/chauffeur-services/sheffield/' },
])

export default function SheffieldChauffeurTourLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb} />
      {children}
    </>
  )
}
