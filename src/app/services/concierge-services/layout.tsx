import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Concierge Services for Private Travel | Air2Transport',
  description:
    'Premium concierge services including airport assistance, VIP meet and greet, and personalised travel support across the UK.',
}

export default function ConciergeServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
