import { buildPageMetadata } from '@/lib/pageMetadata'

export const metadata = buildPageMetadata({
  path: '/fleet/',
  title: 'Private-Hire and Executive Vehicle Fleet | Air2Transport',
  description:
    'Explore our fleet of executive saloons, estates and people carriers, maintained to a high standard for comfortable transfers across the UK.',
})

export default function FleetLayout({ children }: { children: React.ReactNode }) {
  return children
}
