'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Star, CheckCircle, Car, Building, Users, Shield } from 'lucide-react'

export default function CoventryCityPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-jet2-dark to-jet2-orange text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Coventry Chauffeur Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Professional chauffeur services across the Midlands hub
            </p>
            <Link
              href="/bookings/new"
              className="bg-white text-jet2-dark px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-block"
            >
              Book Coventry Service
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Coventry Service?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience reliable and professional chauffeur services across Coventry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Local Knowledge</h3>
              <p className="text-gray-600">
                Expert drivers with extensive knowledge of Coventry's roads and traffic
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
                premium vehicles for comfortable travel across Coventry
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Coventry Info Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                About Coventry
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Coventry is a city in the West Midlands, known for its automotive heritage and medieval cathedral.
                It's a vibrant city with a rich history and strong industrial background.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-jet2-orange mr-3" />
                  <span className="text-gray-700">City in the West Midlands</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-jet2-orange mr-3" />
                  <span className="text-gray-700">Population of over 360,000</span>
                </div>
                <div className="flex items-center">
                  <Building className="h-5 w-5 text-jet2-orange mr-3" />
                  <span className="text-gray-700">UK City of Culture 2021</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 h-64 rounded-lg overflow-hidden">
              <img 
                src="https://assetshost.sirv.com/jet2transport/coventry.jpg" 
                alt="Coventry cityscape" 
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
              Coventry Services
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

      {/* Popular Areas Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Coventry Areas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2 text-jet2-dark">City Center</h3>
              <p className="text-gray-600 mb-3">Business district and shopping</p>
              <p className="text-sm text-gray-500">West Orchards, Cathedral Lanes</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2 text-jet2-dark">Cathedral Quarter</h3>
              <p className="text-gray-600 mb-3">Historic area and cathedral</p>
              <p className="text-sm text-gray-500">Coventry Cathedral, historic buildings</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2 text-jet2-dark">Earlsdon</h3>
              <p className="text-gray-600 mb-3">Residential and shopping area</p>
              <p className="text-sm text-gray-500">Independent shops, cafes, restaurants</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2 text-jet2-dark">Canley</h3>
              <p className="text-gray-600 mb-3">University area</p>
              <p className="text-sm text-gray-500">University of Warwick, student life</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2 text-jet2-dark">Kenilworth</h3>
              <p className="text-gray-600 mb-3">Nearby historic town</p>
              <p className="text-sm text-gray-500">Kenilworth Castle, historic attractions</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2 text-jet2-dark">Warwick</h3>
              <p className="text-gray-600 mb-3">Historic market town</p>
              <p className="text-sm text-gray-500">Warwick Castle, historic center</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-jet2-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Book Your Coventry Service
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience professional chauffeur services across Coventry with our premium fleet
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
