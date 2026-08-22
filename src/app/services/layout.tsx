import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Chauffeur & Transfer Services UK | Air2Transport',
  description:
    'Airport transfers, executive chauffeur services, events and weddings, city-to-city transfers and concierge services across the UK.',
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
