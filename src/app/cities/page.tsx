'use client'

import Link from 'next/link'
import { MapPin, CheckCircle, Car, Building } from 'lucide-react'
import JsonLd from '@/components/JsonLd'
import { buildBreadcrumbSchema } from '@/lib/structuredData'

const breadcrumb = buildBreadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Cities', path: '/cities/' },
])

export default function CitiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <JsonLd data={breadcrumb} />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-jet2-dark to-jet2-orange text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Cities We Serve
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Professional chauffeur services across major UK cities
            </p>
            <Link 
              href="/bookings/new" 
              className="bg-white text-jet2-dark px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-block"
            >
              Book Your Service
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our City Transfer Services?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience reliable and professional services in every city we serve
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Local Knowledge</h3>
              <p className="text-gray-600">
                Drivers with extensive knowledge of local routes and traffic patterns
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Business Ready</h3>
              <p className="text-gray-600">
                Professional service perfect for business meetings and corporate travel
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Luxury Fleet</h3>
              <p className="text-gray-600">
                Premium vehicles available in every city we serve
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cities Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our City Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link href="/cities/london" className="group">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow text-center">
                <div className="bg-gray-100 h-32 rounded-lg mb-4 overflow-hidden">
                  <img 
                    src="https://assetshost.sirv.com/jet2transport/london.jpg" 
                    alt="London cityscape" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-jet2-dark">London</h3>
                <p className="text-sm text-gray-600">Capital city</p>
              </div>
            </Link>

            <Link href="/cities/birmingham" className="group">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow text-center">
                <div className="bg-gray-100 h-32 rounded-lg mb-4 overflow-hidden">
                  <img 
                    src="https://assetshost.sirv.com/jet2transport/birmingham.jpg" 
                    alt="Birmingham cityscape" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-jet2-dark">Birmingham</h3>
                <p className="text-sm text-gray-600">Second city</p>
              </div>
            </Link>

            <Link href="/cities/manchester" className="group">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow text-center">
                <div className="bg-gray-100 h-32 rounded-lg mb-4 overflow-hidden">
                  <img 
                    src="https://assetshost.sirv.com/jet2transport/manchester.jpg" 
                    alt="Manchester cityscape" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-jet2-dark">Manchester</h3>
                <p className="text-sm text-gray-600">Northern powerhouse</p>
              </div>
            </Link>

            <Link href="/cities/leeds" className="group">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow text-center">
                <div className="bg-gray-100 h-32 rounded-lg mb-4 overflow-hidden">
                  <img 
                    src="https://assetshost.sirv.com/jet2transport/leeds.jpg" 
                    alt="Leeds cityscape" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-jet2-dark">Leeds</h3>
                <p className="text-sm text-gray-600">Yorkshire's capital</p>
              </div>
            </Link>

            <Link href="/cities/liverpool" className="group">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow text-center">
                <div className="bg-gray-100 h-32 rounded-lg mb-4 overflow-hidden">
                  <img 
                    src="https://assetshost.sirv.com/jet2transport/liverpool.jpg" 
                    alt="Liverpool cityscape" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-jet2-dark">Liverpool</h3>
                <p className="text-sm text-gray-600">Historic port city</p>
              </div>
            </Link>

            <Link href="/cities/sheffield" className="group">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow text-center">
                <div className="bg-gray-100 h-32 rounded-lg mb-4 overflow-hidden">
                  <img 
                    src="https://assetshost.sirv.com/jet2transport/sheffield.jpg" 
                    alt="Sheffield cityscape" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-jet2-dark">Sheffield</h3>
                <p className="text-sm text-gray-600">Steel city</p>
              </div>
            </Link>

            <Link href="/cities/nottingham" className="group">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow text-center">
                <div className="bg-gray-100 h-32 rounded-lg mb-4 overflow-hidden">
                  <img 
                    src="https://assetshost.sirv.com/jet2transport/nottingham.jpg" 
                    alt="Nottingham cityscape" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-jet2-dark">Nottingham</h3>
                <p className="text-sm text-gray-600">Robin Hood city</p>
              </div>
            </Link>

            <Link href="/cities/coventry" className="group">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow text-center">
                <div className="bg-gray-100 h-32 rounded-lg mb-4 overflow-hidden">
                  <img 
                    src="https://assetshost.sirv.com/jet2transport/coventry.jpg" 
                    alt="Coventry cityscape" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-jet2-dark">Coventry</h3>
                <p className="text-sm text-gray-600">Midlands hub</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              City Services We Offer
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-jet2-dark">Business Travel</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Meeting and conference transportation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Client pickup and drop-off</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Airport transfers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Corporate event transportation</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-jet2-dark">Leisure Travel</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>City tours and sightseeing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Restaurant and entertainment</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Shopping and retail districts</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Hotel and accommodation transfers</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-jet2-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Book Your City Service
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience professional chauffeur services in your city with our premium fleet
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
