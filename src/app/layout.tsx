import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import StickyPhone from '@/components/StickyPhone'
import StickyWhatsApp from '@/components/StickyWhatsApp'
import ChunkErrorRecovery from '@/components/ChunkErrorRecovery'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Air2Transport - Premium Car Transfer Services',
  description: 'Professional car transfer services across the UK. Airport transfers, executive chauffeur services, corporate travel, and luxury transport solutions.',
  keywords: 'car transfer, airport transfer, chauffeur service, executive transport, luxury cars, UK transport',
  authors: [{ name: 'Air2Transport' }],
  icons: {
    icon: 'https://assetshost.sirv.com/jet2transport/favicon.ico',
    shortcut: 'https://assetshost.sirv.com/jet2transport/favicon.ico',
    apple: 'https://assetshost.sirv.com/jet2transport/logoair2.png',
  },
  openGraph: {
    title: 'Air2Transport - Premium Car Transfer Services',
    description: 'Professional car transfer services across the UK',
    url: 'https://jet2transport.com',
    siteName: 'Air2Transport',
    images: [
      {
        url: 'https://assetshost.sirv.com/jet2transport/logoair2.png',
        width: 300,
        height: 120,
        alt: 'Air2Transport - Premium Car Transfer Services',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Air2Transport - Premium Car Transfer Services',
    description: 'Professional car transfer services across the UK',
    images: ['https://assetshost.sirv.com/jet2transport/logoair2.png'],
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
        <link rel="icon" href="https://assetshost.sirv.com/jet2transport/favicon.ico" sizes="any" />
        <link rel="icon" href="https://assetshost.sirv.com/jet2transport/logoair2.png" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="https://assetshost.sirv.com/jet2transport/logoair2.png" />
      </head>
      <body className={`${inter.className} antialiased`}>
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