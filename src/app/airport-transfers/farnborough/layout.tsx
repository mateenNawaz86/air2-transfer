import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Farnborough Airport Transfers | Air2Transport',
  description:
    'Chauffeur transfers to and from Farnborough Airport (FAB), a premier business aviation airport in Hampshire. Private and corporate travel welcome.',
  alternates: { canonical: '/airport-transfers/farnborough/' },
}

export default function FarnboroughLayout({ children }: { children: React.ReactNode }) {
  return children
}
