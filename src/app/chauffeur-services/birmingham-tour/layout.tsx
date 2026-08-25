import { buildPageMetadata } from '@/lib/pageMetadata'
import { buildBreadcrumbSchema } from '@/lib/structuredData'
import JsonLd from '@/components/JsonLd'

export const metadata = buildPageMetadata({
  path: '/chauffeur-services/birmingham-tour/',
  title: 'Birmingham Chauffeur Tour & Hourly Hire | Air2Transport',
  description:
    'Hire a professional chauffeur by the hour or for a full-day tour in Birmingham, with a premium fleet and flexible, custom itineraries.',
})

const breadcrumb = buildBreadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Chauffeur Services', path: '/chauffeur-services/' },
  { name: 'Birmingham', path: '/chauffeur-services/birmingham-tour/' },
])

export default function BirminghamChauffeurTourLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb} />
      {children}
    </>
  )
}
