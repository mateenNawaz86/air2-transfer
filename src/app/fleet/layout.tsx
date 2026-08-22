import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Private-Hire and Executive Vehicle Fleet | Air2Transport',
  description:
    'Explore our fleet of executive saloons, estates and people carriers, maintained to a high standard for comfortable transfers across the UK.',
}

export default function FleetLayout({ children }: { children: React.ReactNode }) {
  return children
}
