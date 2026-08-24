import { buildPageMetadata } from '@/lib/pageMetadata'
import { buildBreadcrumbSchema } from '@/lib/structuredData'
import JsonLd from '@/components/JsonLd'

export const metadata = buildPageMetadata({
  path: '/services/concierge/',
  title: 'Concierge Service at Birmingham Airport | Air2Transport',
  description:
    'Premium concierge and meet-and-greet service for travellers at Birmingham Airport.',
})

const breadcrumb = buildBreadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services/' },
  { name: 'Concierge Service', path: '/services/concierge/' },
])

export default function ConciergeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb} />
      {children}
    </>
  )
}
