import { buildPageMetadata } from '@/lib/pageMetadata'

export const metadata = buildPageMetadata({
  path: '/services/',
  title: 'Our Chauffeur & Transfer Services UK | Air2Transport',
  description:
    'Airport transfers, executive chauffeur services, events and weddings, city-to-city transfers and concierge services across the UK.',
})

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
