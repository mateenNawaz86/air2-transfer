import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Executive Chauffeur Services Across the UK | Air2Transport',
  description:
    'Professional, licensed chauffeurs for business travel, corporate accounts and hourly hire across the UK. Punctual, comfortable and reliable.',
}

export default function ChauffeurServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
