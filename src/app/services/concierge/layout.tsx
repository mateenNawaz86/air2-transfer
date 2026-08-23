import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Concierge Service at Birmingham Airport | Air2Transport',
  description:
    'Premium concierge and meet-and-greet service for travellers at Birmingham Airport.',
  alternates: { canonical: '/services/concierge/' },
}

export default function ConciergeLayout({ children }: { children: React.ReactNode }) {
  return children
}
