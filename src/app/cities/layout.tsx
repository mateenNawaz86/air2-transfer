import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Private Transfer Services Across UK Cities | Air2Transport',
  description:
    'Book private chauffeur and transfer services in London, Birmingham, Manchester and cities across the UK. Fixed pricing, professional drivers.',
  alternates: { canonical: '/cities/' },
}

export default function CitiesLayout({ children }: { children: React.ReactNode }) {
  return children
}
