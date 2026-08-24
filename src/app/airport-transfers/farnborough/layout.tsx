import { buildPageMetadata } from '@/lib/pageMetadata'
import { buildBreadcrumbSchema } from '@/lib/structuredData'
import JsonLd from '@/components/JsonLd'

export const metadata = buildPageMetadata({
  path: '/airport-transfers/farnborough/',
  title: 'Farnborough Airport Transfers | Air2Transport',
  description:
    'Chauffeur transfers to and from Farnborough Airport (FAB), a premier business aviation airport in Hampshire. Private and corporate travel welcome.',
})

const breadcrumb = buildBreadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Airport Transfers', path: '/airport-transfers/' },
  { name: 'Farnborough', path: '/airport-transfers/farnborough/' },
])

export default function FarnboroughLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb} />
      {children}
    </>
  )
}
