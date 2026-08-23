import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wedding & Event Chauffeur Services | Air2Transport',
  description:
    'Elegant chauffeur transport for weddings, corporate events, parties and celebrations across the UK. Professional drivers, premium vehicles.',
  alternates: { canonical: '/services/events-chauffeur-service/' },
}

export default function EventsChauffeurServiceLayout({ children }: { children: React.ReactNode }) {
  return children
}
