import { buildPageMetadata } from '@/lib/pageMetadata'

export const metadata = buildPageMetadata({
  path: '/services/events/',
  title: 'Events Chauffeur Service | Air2Transport',
  description:
    'Chauffeur transport for corporate events, weddings, parties and celebrations across the UK.',
})

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return children
}
