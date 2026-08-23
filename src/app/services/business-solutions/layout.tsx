import { buildPageMetadata } from '@/lib/pageMetadata'

export const metadata = buildPageMetadata({
  path: '/services/business-solutions/',
  title: 'Business Solutions | Air2Transport',
  description:
    'Corporate chauffeur solutions for business accounts, executive travel and client transportation across the UK.',
})

export default function BusinessSolutionsLayout({ children }: { children: React.ReactNode }) {
  return children
}
