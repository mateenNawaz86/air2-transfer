import { buildPageMetadata } from '@/lib/pageMetadata'
import { buildBreadcrumbSchema, buildFaqSchema } from '@/lib/structuredData'
import JsonLd from '@/components/JsonLd'

export const metadata = buildPageMetadata({
  path: '/contact/',
  title: 'Contact Air2Transport | Quotes and 24/7 Support',
  description:
    'Get in touch with Air2Transport for airport transfers, chauffeur bookings and general enquiries. Call, WhatsApp or email us, available 24/7.',
})

const breadcrumb = buildBreadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Contact', path: '/contact/' },
])

// Verbatim from the FAQ section rendered on this page — keep in sync if that copy changes.
const faq = buildFaqSchema([
  {
    question: 'How far in advance should I book?',
    answer:
      'We recommend booking at least 24 hours in advance for airport transfers and 48 hours for special events. However, we can accommodate last-minute bookings subject to availability.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards, debit cards, and bank transfers. Payment can be made online at the time of booking or in cash to the driver.',
  },
  {
    question: 'Do you provide child seats?',
    answer:
      'Yes, we provide complimentary child seats for families traveling with children. Please specify the age and number of children when booking.',
  },
  {
    question: 'What if my flight is delayed?',
    answer:
      'We monitor all flights and will adjust pickup times automatically for delays. There are no additional charges for flight delays.',
  },
])

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={faq} />
      {children}
    </>
  )
}
