import { buildPageMetadata } from '@/lib/pageMetadata'

export const metadata = buildPageMetadata({
  path: '/services/business/',
  title: 'Corporate Chauffeur Services | Air2Transport',
  description:
    'Professional chauffeur services for corporate travel, client transportation and business accounts across the UK.',
})

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
  return children
}
