import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StickyPhone from '@/components/StickyPhone'
import StickyWhatsApp from '@/components/StickyWhatsApp'
import ChunkErrorRecovery from '@/components/ChunkErrorRecovery'
import JsonLd from '@/components/JsonLd'
import { SITE_URL } from '@/lib/siteConfig'
import { buildOrganizationSchema } from '@/lib/structuredData'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Air2Transport - Premium Car Transfer Services',
  description: 'Professional car transfer services across the UK. Airport transfers, executive chauffeur services, corporate travel, and luxury transport solutions.',
  keywords: 'car transfer, airport transfer, chauffeur service, executive transport, luxury cars, UK transport',
  authors: [{ name: 'Air2Transport' }],
  icons: {
    icon: '/logoair2.png',
    shortcut: '/logoair2.png',
    apple: '/logoair2.png',
  },
  openGraph: {
    title: 'Air2Transport - Premium Car Transfer Services',
    description: 'Professional car transfer services across the UK',
    url: SITE_URL,
    siteName: 'Air2Transport',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Air2Transport - Premium Car Transfer Services',
    description: 'Professional car transfer services across the UK',
  },
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logoair2.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/logoair2.png" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <JsonLd data={buildOrganizationSchema()} />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <StickyPhone />
          <StickyWhatsApp />
          <ChunkErrorRecovery />
        </div>
      </body>
    </html>
  )
} 