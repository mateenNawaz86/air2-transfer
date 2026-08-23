import { buildPageMetadata } from '@/lib/pageMetadata'

export const metadata = buildPageMetadata({
  path: '/services/hourly/',
  title: 'Hourly & Full Day Chauffeur Services | Air2Transport',
  description:
    'Flexible hourly and full-day chauffeur hire across the UK, with professional drivers and a premium fleet.',
})

export default function HourlyLayout({ children }: { children: React.ReactNode }) {
  return children
}
