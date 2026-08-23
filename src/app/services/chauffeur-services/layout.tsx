import { buildPageMetadata } from '@/lib/pageMetadata'

export const metadata = buildPageMetadata({
  path: '/services/chauffeur-services/',
  title: 'Executive Chauffeur Services Across the UK | Air2Transport',
  description:
    'Professional, licensed chauffeurs for business travel, corporate accounts and hourly hire across the UK. Punctual, comfortable and reliable.',
})

export default function ChauffeurServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
