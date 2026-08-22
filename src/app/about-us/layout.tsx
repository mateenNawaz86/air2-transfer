import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Air2Transport | UK Chauffeur & Transfer Company',
  description:
    "Air2Transport is a trusted UK private-hire and chauffeur company, delivering reliable, professional transfers for business travellers and families alike.",
}

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
  return children
}
