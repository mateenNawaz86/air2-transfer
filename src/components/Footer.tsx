import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { SERVICE_ROUTES } from '@/lib/serviceRoutes'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const services = [
    { name: 'Airport Transfers', href: SERVICE_ROUTES.airportTransfers },
    { name: 'Chauffeur Services', href: SERVICE_ROUTES.chauffeurServices },
    { name: 'Events & Weddings', href: SERVICE_ROUTES.eventsAndWeddings },
    { name: 'City to City Transfers', href: SERVICE_ROUTES.cityToCityTransfers },
    { name: 'Concierge Services', href: SERVICE_ROUTES.conciergeServices },
  ]

  const quickLinks = [
    { name: 'About Us', href: '/about-us' },
    { name: 'Our Fleet', href: '/fleet' },
    { name: 'Book Now', href: '/bookings/new/' },
    { name: 'Cities Covered', href: '/cities' },
    { name: 'Contact', href: '/contact' },
  ]


  return (
    <footer className="bg-jet2-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="https://assetshost.sirv.com/jet2transport/logoair2-white.png"
                alt="Air2Transport"
                width={200}
                height={48}
                className="h-auto w-auto brightness-0 invert"
                style={{ width: '200px', height: 'auto' }}
              />
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Professional transfer services across the UK. We provide reliable, 
              comfortable, and dependable transportation for all your travel needs.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-gray-300 hover:text-jet2-orange transition-colors text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-jet2-orange transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-jet2-orange" />
                <a
                  href="tel:+441213141080"
                  aria-label="Call Air2Transport on 0121 314 1080"
                  className="text-gray-300 hover:text-jet2-orange transition-colors text-sm"
                >
                  01213141080
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-jet2-orange" />
                <a
                  href="mailto:info@air2transport.com"
                  className="text-gray-300 hover:text-jet2-orange transition-colors text-sm"
                >
                  info@air2transport.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-jet2-orange" />
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-jet2-orange transition-colors text-sm"
                >
                  Birmingham, UK
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-jet2-orange" />
                <span className="text-gray-300 text-sm">24/7 Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Air2Transport. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="text-gray-400 hover:text-jet2-orange text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-gray-400 hover:text-jet2-orange text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookie-policy" className="text-gray-400 hover:text-jet2-orange text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 