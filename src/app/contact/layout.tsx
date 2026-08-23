import { buildPageMetadata } from '@/lib/pageMetadata'

export const metadata = buildPageMetadata({
  path: '/contact/',
  title: 'Contact Air2Transport | Quotes and 24/7 Support',
  description:
    'Get in touch with Air2Transport for airport transfers, chauffeur bookings and general enquiries. Call, WhatsApp or email us, available 24/7.',
})

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
