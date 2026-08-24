import { buildPageMetadata } from '@/lib/pageMetadata'

export const metadata = buildPageMetadata({
  path: '/services/',
  title: 'Our Chauffeur & Transfer Services UK | Air2Transport',
  description:
    'Airport transfers, executive chauffeur services, events and weddings, city-to-city transfers and concierge services across the UK.',
})

// Breadcrumb JSON-LD lives in page.tsx, not here: this layout also wraps
// every /services/* sub-page, and a layout can't tell "am I wrapping my
// own index page or a child route" — putting it here would stack a
// second, wrong BreadcrumbList onto every service page.
export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
