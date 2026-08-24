import { buildPageMetadata } from '@/lib/pageMetadata'

export const metadata = buildPageMetadata({
  path: '/airport-transfers/',
  title: 'UK Airport Transfers with Flight Monitoring | Air2Transport',
  description:
    'Pre-book reliable UK airport transfers with real-time flight monitoring, meet-and-greet options and fixed pricing before you travel.',
})

// Breadcrumb JSON-LD lives in page.tsx, not here: this layout also wraps
// [airport], biggin-hill and farnborough, and a layout can't tell "am I
// wrapping my own index page or a child route" — putting it here would
// stack a second, wrong BreadcrumbList onto every one of those pages.
export default function AirportTransfersLayout({ children }: { children: React.ReactNode }) {
  return children
}
