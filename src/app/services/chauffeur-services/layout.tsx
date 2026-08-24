import { buildPageMetadata } from '@/lib/pageMetadata'
import { buildBreadcrumbSchema, buildServiceSchema } from '@/lib/structuredData'
import JsonLd from '@/components/JsonLd'

const TITLE = 'Executive Chauffeur Services Across the UK'
const DESCRIPTION =
  'Professional, licensed chauffeurs for business travel, corporate accounts and hourly hire across the UK. Punctual, comfortable and reliable.'
const PATH = '/services/chauffeur-services/'

export const metadata = buildPageMetadata({
  path: PATH,
  title: `${TITLE} | Air2Transport`,
  description: DESCRIPTION,
})

const breadcrumb = buildBreadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services/' },
  { name: 'Chauffeur Services', path: PATH },
])

const service = buildServiceSchema({ name: TITLE, description: DESCRIPTION, path: PATH })

export default function ChauffeurServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={service} />
      {children}
    </>
  )
}
