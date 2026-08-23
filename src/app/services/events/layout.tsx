import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Events Chauffeur Service | Air2Transport',
  description:
    'Chauffeur transport for corporate events, weddings, parties and celebrations across the UK.',
  alternates: { canonical: '/services/events/' },
}

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return children
}
