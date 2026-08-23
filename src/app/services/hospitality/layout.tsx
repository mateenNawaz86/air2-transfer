import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hospitality & PR Events Chauffeur Service | Air2Transport',
  description:
    'Chauffeur transport for hospitality, PR and corporate events across the UK.',
  alternates: { canonical: '/services/hospitality/' },
}

export default function HospitalityLayout({ children }: { children: React.ReactNode }) {
  return children
}
