import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'City to City Long Distance Car Service | Air2Transport',
  description:
    'Comfortable long-distance car service between UK cities, with professional drivers and fixed pricing.',
  alternates: { canonical: '/services/city-to-city/' },
}

export default function CityToCityLayout({ children }: { children: React.ReactNode }) {
  return children
}
