import { buildPageMetadata } from '@/lib/pageMetadata'
import { buildBreadcrumbSchema, buildServiceSchema } from '@/lib/structuredData'
import JsonLd from '@/components/JsonLd'

const TITLE = 'Concierge Services for Private Travel'
const DESCRIPTION =
  'Premium concierge services including airport assistance, VIP meet and greet, and personalised travel support across the UK.'
const PATH = '/services/concierge-services/'

export const metadata = buildPageMetadata({
  path: PATH,
  title: `${TITLE} | Air2Transport`,
  description: DESCRIPTION,
})

const breadcrumb = buildBreadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services/' },
  { name: 'Concierge Services', path: PATH },
])

const service = buildServiceSchema({ name: TITLE, description: DESCRIPTION, path: PATH })

export default function ConciergeServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={service} />
      {children}
    </>
  )
}
