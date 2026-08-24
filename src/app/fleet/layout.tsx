import { buildPageMetadata } from '@/lib/pageMetadata'
import { buildBreadcrumbSchema } from '@/lib/structuredData'
import JsonLd from '@/components/JsonLd'

export const metadata = buildPageMetadata({
  path: '/fleet/',
  title: 'Private-Hire and Executive Vehicle Fleet | Air2Transport',
  description:
    'Explore our fleet of executive saloons, estates and people carriers, maintained to a high standard for comfortable transfers across the UK.',
})

const breadcrumb = buildBreadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Fleet', path: '/fleet/' },
])

export default function FleetLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb} />
      {children}
    </>
  )
}
