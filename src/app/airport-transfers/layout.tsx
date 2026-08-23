import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'UK Airport Transfers with Flight Monitoring | Air2Transport',
  description:
    'Pre-book reliable UK airport transfers with real-time flight monitoring, meet-and-greet options and fixed pricing before you travel.',
  alternates: { canonical: '/airport-transfers/' },
}

export default function AirportTransfersLayout({ children }: { children: React.ReactNode }) {
  return children
}
