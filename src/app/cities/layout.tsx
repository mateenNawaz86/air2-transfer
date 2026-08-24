import { buildPageMetadata } from '@/lib/pageMetadata'

export const metadata = buildPageMetadata({
  path: '/cities/',
  title: 'Private Transfer Services Across UK Cities | Air2Transport',
  description:
    'Book private chauffeur and transfer services in London, Birmingham, Manchester and cities across the UK. Fixed pricing, professional drivers.',
})

// Breadcrumb JSON-LD lives in page.tsx, not here: this layout also wraps
// /cities/[city]/, and a layout can't tell "am I wrapping my own index page
// or a child route" — putting it here would stack a second, wrong
// BreadcrumbList onto every city page.
export default function CitiesLayout({ children }: { children: React.ReactNode }) {
  return children
}
