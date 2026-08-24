import { buildPageMetadata } from '@/lib/pageMetadata'
import { buildBreadcrumbSchema } from '@/lib/structuredData'
import JsonLd from '@/components/JsonLd'

export const metadata = buildPageMetadata({
  path: '/about-us/',
  title: 'About Air2Transport | UK Chauffeur & Transfer Company',
  description:
    "Air2Transport is a trusted UK private-hire and chauffeur company, delivering reliable, professional transfers for business travellers and families alike.",
})

const breadcrumb = buildBreadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about-us/' },
])

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb} />
      {children}
    </>
  )
}
