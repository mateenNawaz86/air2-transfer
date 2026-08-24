import Link from 'next/link'
import { MapPin, Clock, Users, CheckCircle, Car, Plane, Shield } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AIRPORTS, getAirportBySlug } from '@/lib/airportsData'
import { buildPageMetadata } from '@/lib/pageMetadata'
import { buildBreadcrumbSchema } from '@/lib/structuredData'
import JsonLd from '@/components/JsonLd'

export function generateStaticParams() {
  return AIRPORTS.map((airport) => ({ airport: airport.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ airport: string }> }): Promise<Metadata> {
  const { airport: airportSlug } = await params
  const airport = getAirportBySlug(airportSlug)
  if (!airport) return {}

  return buildPageMetadata({
    path: `/airport-transfers/${airport.slug}/`,
    title: `${airport.name} Airport Transfers | Air2Transport`,
    description: `Reliable transfers to and from ${airport.fullName}, with flight monitoring, meet-and-greet and fixed pricing. Book your ${airport.name} transfer today.`,
  })
}

export default async function AirportPage({ params }: { params: Promise<{ airport: string }> }) {
  const { airport: airportSlug } = await params
  const airport = getAirportBySlug(airportSlug)
  if (!airport) notFound()

  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Airport Transfers', path: '/airport-transfers/' },
    { name: airport.name, path: `/airport-transfers/${airport.slug}/` },
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <JsonLd data={breadcrumb} />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-jet2-dark to-jet2-orange text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {airport.name} Airport Transfers
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Professional airport transfer service to and from {airport.fullName}
            </p>
            <Link
              href="/bookings/new"
              className="bg-white text-jet2-dark px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-block"
            >
              Book {airport.name} Transfer
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our {airport.name} Service?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience reliable and comfortable transfers to {airport.whyChooseTagline}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Flight Monitoring</h3>
              <p className="text-gray-600">
                Real-time flight tracking to ensure timely pickup and drop-off
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Meet & Greet</h3>
              <p className="text-gray-600">
                Professional meet and greet service at arrivals with name board
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Luxury Fleet</h3>
              <p className="text-gray-600">
                Premium vehicles for comfortable airport transfers
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Airport Info Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                About {airport.name} Airport
              </h2>
              <p className="text-lg text-gray-600 mb-6">{airport.about}</p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-jet2-orange mr-3" />
                  <span className="text-gray-700">{airport.facts[0]}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-jet2-orange mr-3" />
                  <span className="text-gray-700">{airport.facts[1]}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-jet2-orange mr-3" />
                  <span className="text-gray-700">{airport.facts[2]}</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
              <Plane className="h-24 w-24 text-jet2-orange" />
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {airport.name} Transfer Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-jet2-dark">Arrival Transfers</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Meet and greet service with name board</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Flight monitoring for delays</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Luggage assistance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Direct transfer to your destination</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-jet2-dark">Departure Transfers</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Pickup from your location</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Arrive at airport with time to spare</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Drop-off at your terminal</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Professional and reliable service</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Routes Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular {airport.name} Routes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {airport.routes.map((route) => (
              <div key={route.name} className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2 text-jet2-dark">{route.name}</h3>
                <p className="text-gray-600 mb-3">{route.description}</p>
                <p className="text-sm text-gray-500">{route.duration}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-jet2-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Book Your {airport.name} Transfer
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience professional and reliable airport transfers to and from {airport.fullName}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/bookings/new"
              className="bg-jet2-orange text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors"
            >
              Book Now
            </Link>
            <Link
              href="/contact"
              className="border border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-jet2-dark transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
