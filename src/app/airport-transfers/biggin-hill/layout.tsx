import { buildPageMetadata } from '@/lib/pageMetadata'

export const metadata = buildPageMetadata({
  path: '/airport-transfers/biggin-hill/',
  title: 'Biggin Hill Airport Transfers | Air2Transport',
  description:
    "Chauffeur transfers to and from London Biggin Hill Airport (BQH), London's premier business aviation airport. Private and corporate travel welcome.",
})

export default function BigginHillLayout({ children }: { children: React.ReactNode }) {
  return children
}
