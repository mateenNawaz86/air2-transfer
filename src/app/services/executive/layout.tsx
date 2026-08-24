import { buildPageMetadata } from '@/lib/pageMetadata'
import { buildBreadcrumbSchema } from '@/lib/structuredData'
import JsonLd from '@/components/JsonLd'

export const metadata = buildPageMetadata({
  path: '/services/executive/',
  title: 'Executive Chauffeur Services Bristol | Air2Transport',
  description:
    'Executive chauffeur services in Bristol for business travel, corporate accounts and airport transfers.',
})

const breadcrumb = buildBreadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services/' },
  { name: 'Executive Chauffeur Services', path: '/services/executive/' },
])

export default function ExecutiveLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb} />
      {children}
    </>
  )
}
