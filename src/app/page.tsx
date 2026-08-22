import type { Metadata } from 'next'
import HomeClient from './HomeClient'

export const metadata: Metadata = {
  title: 'Airport Transfers & Chauffeur Services UK | Air2Transport',
  description:
    'Book reliable airport transfers, chauffeur services and long-distance travel across the UK. Fixed pricing, flight monitoring and 24/7 support.',
}

export default function Home() {
  return <HomeClient />
}
