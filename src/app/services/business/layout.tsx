import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Corporate Chauffeur Services | Air2Transport',
  description:
    'Professional chauffeur services for corporate travel, client transportation and business accounts across the UK.',
  alternates: { canonical: '/services/business/' },
}

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
  return children
}
