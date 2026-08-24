import { buildPageMetadata } from '@/lib/pageMetadata'
import { buildBreadcrumbSchema } from '@/lib/structuredData'
import JsonLd from '@/components/JsonLd'

export const metadata = buildPageMetadata({
  path: '/airport-transfers/biggin-hill/',
  title: 'Biggin Hill Airport Transfers | Air2Transport',
  description:
    "Chauffeur transfers to and from London Biggin Hill Airport (BQH), London's premier business aviation airport. Private and corporate travel welcome.",
})

const breadcrumb = buildBreadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Airport Transfers', path: '/airport-transfers/' },
  { name: 'Biggin Hill', path: '/airport-transfers/biggin-hill/' },
])

export default function BigginHillLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb} />
      {children}
    </>
  )
}
