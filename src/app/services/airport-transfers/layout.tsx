import { buildPageMetadata } from '@/lib/pageMetadata'

export const metadata = buildPageMetadata({
  path: '/services/airport-transfers/',
  title: 'UK Airport Transfers with Flight Monitoring | Air2Transport',
  description:
    'Pre-book reliable UK airport transfers with real-time flight monitoring, meet-and-greet options and fixed pricing before you travel.',
})

export default function AirportTransfersServiceLayout({ children }: { children: React.ReactNode }) {
  return children
}
