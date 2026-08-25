import { buildPageMetadata } from '@/lib/pageMetadata'
import { buildBreadcrumbSchema } from '@/lib/structuredData'
import JsonLd from '@/components/JsonLd'

export const metadata = buildPageMetadata({
  path: '/chauffeur-services/leeds/',
  title: 'Leeds Chauffeur Tour & Hourly Hire | Air2Transport',
  description:
    'Hire a professional chauffeur by the hour or for a full-day tour in Leeds, with a premium fleet and flexible, custom itineraries.',
})

const breadcrumb = buildBreadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Chauffeur Services', path: '/chauffeur-services/' },
  { name: 'Leeds', path: '/chauffeur-services/leeds/' },
])

export default function LeedsChauffeurTourLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb} />
      {children}
    </>
  )
}
