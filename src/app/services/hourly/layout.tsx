import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hourly & Full Day Chauffeur Services | Air2Transport',
  description:
    'Flexible hourly and full-day chauffeur hire across the UK, with professional drivers and a premium fleet.',
  alternates: { canonical: '/services/hourly/' },
}

export default function HourlyLayout({ children }: { children: React.ReactNode }) {
  return children
}
