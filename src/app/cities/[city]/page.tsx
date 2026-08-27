import Link from 'next/link'
import { MapPin, Building, Users, Car, CheckCircle } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CITIES, getCityBySlug, possessive } from '@/lib/citiesData'
import { buildPageMetadata } from '@/lib/pageMetadata'
import { buildBreadcrumbSchema } from '@/lib/structuredData'
import JsonLd from '@/components/JsonLd'

export function generateStaticParams() {
  return CITIES.map((city) => ({ city: city.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: citySlug } = await params
  const city = getCityBySlug(citySlug)
  if (!city) return {}

  return buildPageMetadata({
    path: `/cities/${city.slug}/`,
    title: `Chauffeur & Transfer Services in ${city.name} | Air2Transport`,
    description: `Reliable chauffeur-driven transfers and airport journeys in ${city.name}. Fixed pricing, professional drivers and 24/7 support.`,
  })
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params
  const city = getCityBySlug(citySlug)
  if (!city) notFound()

  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Cities', path: '/cities/' },
    { name: city.name, path: `/cities/${city.slug}/` },
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <JsonLd data={breadcrumb} />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-jet2-dark to-jet2-orange text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {city.name} Chauffeur Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Professional chauffeur services across {city.tagline}
            </p>
            <Link
              href="/bookings/new"
              className="bg-white text-jet2-dark px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-block"
            >
              Book {city.name} Service
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our {city.name} Service?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience reliable and professional chauffeur services across {city.name}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Local Knowledge</h3>
              <p className="text-gray-600">
                Expert drivers with deep knowledge of {possessive(city.name)} roads and traffic, from {city.areas[0].name} to {city.areas[1].name}
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Business Ready</h3>
              <p className="text-gray-600">
                Professional, discreet service for business meetings and corporate travel across {city.tagline}
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Luxury Fleet</h3>
              <p className="text-gray-600">
                Premium, comfortable vehicles for every journey across {city.name} — {city.facts[1]}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* City Info Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                About {city.name}
              </h2>
              <p className="text-lg text-gray-600 mb-6">{city.about}</p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-jet2-orange mr-3" />
                  <span className="text-gray-700">{city.facts[0]}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-jet2-orange mr-3" />
                  <span className="text-gray-700">{city.facts[1]}</span>
                </div>
                <div className="flex items-center">
                  <Building className="h-5 w-5 text-jet2-orange mr-3" />
                  <span className="text-gray-700">{city.facts[2]}</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 h-64 rounded-lg overflow-hidden">
              <img
                src={`https://assetshost.sirv.com/jet2transport/${city.slug}.jpg`}
                alt={`${city.name} cityscape`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {city.name} Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-jet2-dark">Business Travel</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Meeting and conference transportation in {city.areas[0].name} and {city.areas[1].name}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Client pickup and drop-off across {city.name}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Airport transfers to and from {city.name}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Corporate event transportation, including venues near {city.areas[2].landmarks}</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-jet2-dark">Leisure Travel</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>City tours and sightseeing around {city.areas[0].landmarks}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Restaurant and entertainment trips in {city.areas[1].name}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Shopping trips to {city.areas[2].name}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Hotel and accommodation transfers across {city.name}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Areas Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular {city.name} Areas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {city.areas.map((area) => (
              <div key={area.name} className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2 text-jet2-dark">{area.name}</h3>
                <p className="text-gray-600 mb-3">{area.description}</p>
                <p className="text-sm text-gray-500">{area.landmarks}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service Coverage & Travel Tips */}
      <div className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Where We Cover in {city.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-jet2-dark">Service Coverage</h3>
              <p className="text-gray-600">
                We cover the whole of {city.name} and the surrounding area, including {city.areas[0].name},{' '}
                {city.areas[1].name} and {city.areas[2].name} — from {city.areas[0].landmarks} to{' '}
                {city.areas[2].landmarks}.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-jet2-dark">Local Travel Considerations</h3>
              <p className="text-gray-600">
                As with any major UK city, traffic in {city.name} can be heavier during weekday rush hours
                (typically 7–9am and 4–6:30pm) and around major events. We recommend booking a little extra time
                for these periods to guarantee an on-time arrival.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {city.name} Chauffeur Service FAQs
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-jet2-dark mb-2">
                Where in {city.name} do you provide chauffeur services?
              </h3>
              <p className="text-gray-600">
                We cover the whole of {city.name} and the surrounding area, including {city.areas[0].name},{' '}
                {city.areas[1].name} and {city.areas[2].name}.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-jet2-dark mb-2">
                Can I book an airport transfer from {city.name}?
              </h3>
              <p className="text-gray-600">
                Yes. We combine {city.name} chauffeur services with fixed-price airport transfers, including flight
                monitoring and meet-and-greet.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-jet2-dark mb-2">
                Do you offer discounts for regular {city.name} bookings?
              </h3>
              <p className="text-gray-600">
                Yes, we offer discounted rates for corporate accounts and regular bookings — get in touch to discuss
                a tailored plan for your business.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-jet2-dark mb-2">
                Is pricing fixed for journeys in {city.name}?
              </h3>
              <p className="text-gray-600">
                Yes, every {city.name} journey is quoted with a fixed, all-inclusive price before you travel.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-jet2-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Book Your {city.name} Service
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience professional chauffeur services across {city.name} with our premium fleet
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
