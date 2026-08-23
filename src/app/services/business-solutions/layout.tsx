import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Business Solutions | Air2Transport',
  description:
    'Corporate chauffeur solutions for business accounts, executive travel and client transportation across the UK.',
  alternates: { canonical: '/services/business-solutions/' },
}

export default function BusinessSolutionsLayout({ children }: { children: React.ReactNode }) {
  return children
}
