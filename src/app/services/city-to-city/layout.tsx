import { buildPageMetadata } from '@/lib/pageMetadata'

export const metadata = buildPageMetadata({
  path: '/services/city-to-city/',
  title: 'City to City Long Distance Car Service | Air2Transport',
  description:
    'Comfortable long-distance car service between UK cities, with professional drivers and fixed pricing.',
})

export default function CityToCityLayout({ children }: { children: React.ReactNode }) {
  return children
}
