import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biggin Hill Airport Transfers | Air2Transport',
  description:
    "Chauffeur transfers to and from London Biggin Hill Airport (BQH), London's premier business aviation airport. Private and corporate travel welcome.",
  alternates: { canonical: '/airport-transfers/biggin-hill/' },
}

export default function BigginHillLayout({ children }: { children: React.ReactNode }) {
  return children
}
