import { buildPageMetadata } from '@/lib/pageMetadata'

export const metadata = buildPageMetadata({
  path: '/services/concierge/',
  title: 'Concierge Service at Birmingham Airport | Air2Transport',
  description:
    'Premium concierge and meet-and-greet service for travellers at Birmingham Airport.',
})

export default function ConciergeLayout({ children }: { children: React.ReactNode }) {
  return children
}
