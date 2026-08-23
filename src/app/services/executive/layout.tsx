import { buildPageMetadata } from '@/lib/pageMetadata'

export const metadata = buildPageMetadata({
  path: '/services/executive/',
  title: 'Executive Chauffeur Services Bristol | Air2Transport',
  description:
    'Executive chauffeur services in Bristol for business travel, corporate accounts and airport transfers.',
})

export default function ExecutiveLayout({ children }: { children: React.ReactNode }) {
  return children
}
