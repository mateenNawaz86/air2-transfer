import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Long-Distance City to City Transfers | Air2Transport',
  description:
    'Comfortable long-distance transfers between UK cities, with fixed pricing and professional drivers for every intercity journey.',
  alternates: { canonical: '/services/city-to-city-transfers/' },
}

export default function CityToCityTransfersLayout({ children }: { children: React.ReactNode }) {
  return children
}
