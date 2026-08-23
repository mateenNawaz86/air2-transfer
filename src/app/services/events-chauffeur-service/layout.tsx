import { buildPageMetadata } from '@/lib/pageMetadata'

export const metadata = buildPageMetadata({
  path: '/services/events-chauffeur-service/',
  title: 'Wedding & Event Chauffeur Services | Air2Transport',
  description:
    'Elegant chauffeur transport for weddings, corporate events, parties and celebrations across the UK. Professional drivers, premium vehicles.',
})

export default function EventsChauffeurServiceLayout({ children }: { children: React.ReactNode }) {
  return children
}
