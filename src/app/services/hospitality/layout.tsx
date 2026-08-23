import { buildPageMetadata } from '@/lib/pageMetadata'

export const metadata = buildPageMetadata({
  path: '/services/hospitality/',
  title: 'Hospitality & PR Events Chauffeur Service | Air2Transport',
  description:
    'Chauffeur transport for hospitality, PR and corporate events across the UK.',
})

export default function HospitalityLayout({ children }: { children: React.ReactNode }) {
  return children
}
