import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Executive Chauffeur Services Bristol | Air2Transport',
  description:
    'Executive chauffeur services in Bristol for business travel, corporate accounts and airport transfers.',
  alternates: { canonical: '/services/executive/' },
}

export default function ExecutiveLayout({ children }: { children: React.ReactNode }) {
  return children
}
