import { buildPageMetadata } from '@/lib/pageMetadata'

export const metadata = buildPageMetadata({
  path: '/services/wedding/',
  title: 'Wedding Car Hire | Air2Transport',
  description:
    'Elegant wedding car hire and chauffeur service for your special day, across the UK.',
})

export default function WeddingLayout({ children }: { children: React.ReactNode }) {
  return children
}
