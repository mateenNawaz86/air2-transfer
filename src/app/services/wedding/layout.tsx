import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wedding Car Hire | Air2Transport',
  description:
    'Elegant wedding car hire and chauffeur service for your special day, across the UK.',
  alternates: { canonical: '/services/wedding/' },
}

export default function WeddingLayout({ children }: { children: React.ReactNode }) {
  return children
}
