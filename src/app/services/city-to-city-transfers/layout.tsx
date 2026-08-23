import { buildPageMetadata } from '@/lib/pageMetadata'

export const metadata = buildPageMetadata({
  path: '/services/city-to-city-transfers/',
  title: 'Long-Distance City to City Transfers | Air2Transport',
  description:
    'Comfortable long-distance transfers between UK cities, with fixed pricing and professional drivers for every intercity journey.',
})

export default function CityToCityTransfersLayout({ children }: { children: React.ReactNode }) {
  return children
}
