'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Star, CheckCircle, Car, Plane } from 'lucide-react'

export default function AirportTransfersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-jet2-dark to-jet2-orange text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Airport Transfers
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Professional airport transfer services to all major UK airports
            </p>
            <Link 
              href="/bookings/new" 
              className="bg-white text-jet2-dark px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-block"
            >
              Book Airport Transfer
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Airport Transfers?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience reliable, comfortable, and professional airport transportation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Flight Monitoring</h3>
              <p className="text-gray-600">
                We track your flight and adjust pickup times automatically for delays
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Meet & Greet</h3>
              <p className="text-gray-600">
                Professional driver meets you at arrivals with a name board
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Luxury Fleet</h3>
              <p className="text-gray-600">
                Travel in comfort with our premium vehicles
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Airport Services Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Airport Transfer Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link href="/airport-transfers/heathrow" className="group">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow text-center">
                <div className="bg-gray-100 h-32 rounded-lg mb-4 flex items-center justify-center group-hover:bg-jet2-orange group-hover:text-white transition-colors">
                  <Plane className="h-12 w-12" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-jet2-dark">Heathrow Airport</h3>
                <p className="text-sm text-gray-600">London's busiest airport</p>
              </div>
            </Link>

            <Link href="/airport-transfers/gatwick" className="group">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow text-center">
                <div className="bg-gray-100 h-32 rounded-lg mb-4 flex items-center justify-center group-hover:bg-jet2-orange group-hover:text-white transition-colors">
                  <Plane className="h-12 w-12" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-jet2-dark">Gatwick Airport</h3>
                <p className="text-sm text-gray-600">London's second airport</p>
              </div>
            </Link>

            <Link href="/airport-transfers/birmingham" className="group">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow text-center">
                <div className="bg-gray-100 h-32 rounded-lg mb-4 flex items-center justify-center group-hover:bg-jet2-orange group-hover:text-white transition-colors">
                  <Plane className="h-12 w-12" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-jet2-dark">Birmingham Airport</h3>
                <p className="text-sm text-gray-600">Midlands hub</p>
              </div>
            </Link>

            <Link href="/airport-transfers/manchester" className="group">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow text-center">
                <div className="bg-gray-100 h-32 rounded-lg mb-4 flex items-center justify-center group-hover:bg-jet2-orange group-hover:text-white transition-colors">
                  <Plane className="h-12 w-12" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-jet2-dark">Manchester Airport</h3>
                <p className="text-sm text-gray-600">Northern gateway</p>
              </div>
            </Link>

            <Link href="/airport-transfers/stansted" className="group">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow text-center">
                <div className="bg-gray-100 h-32 rounded-lg mb-4 flex items-center justify-center group-hover:bg-jet2-orange group-hover:text-white transition-colors">
                  <Plane className="h-12 w-12" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-jet2-dark">Stansted Airport</h3>
                <p className="text-sm text-gray-600">Budget airline hub</p>
              </div>
            </Link>

            <Link href="/airport-transfers/luton" className="group">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow text-center">
                <div className="bg-gray-100 h-32 rounded-lg mb-4 flex items-center justify-center group-hover:bg-jet2-orange group-hover:text-white transition-colors">
                  <Plane className="h-12 w-12" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-jet2-dark">Luton Airport</h3>
                <p className="text-sm text-gray-600">London Luton</p>
              </div>
            </Link>

            <Link href="/airport-transfers/london-city" className="group">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow text-center">
                <div className="bg-gray-100 h-32 rounded-lg mb-4 flex items-center justify-center group-hover:bg-jet2-orange group-hover:text-white transition-colors">
                  <Plane className="h-12 w-12" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-jet2-dark">London City Airport</h3>
                <p className="text-sm text-gray-600">Business airport</p>
              </div>
            </Link>

            <Link href="/airport-transfers/east-midlands" className="group">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow text-center">
                <div className="bg-gray-100 h-32 rounded-lg mb-4 flex items-center justify-center group-hover:bg-jet2-orange group-hover:text-white transition-colors">
                  <Plane className="h-12 w-12" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-jet2-dark">East Midlands Airport</h3>
                <p className="text-sm text-gray-600">Central England</p>
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
              Our Airport Transfer Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-jet2-dark">Arrival Transfers</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Meet & greet at arrivals hall</span>
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
                  <span>Direct transfer to destination</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-jet2-dark">Departure Transfers</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Punctual pickup from your location</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Luggage handling and loading</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Direct drop-off at terminal</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Flight time monitoring</span>
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
            Book Your Airport Transfer
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience reliable and comfortable airport transportation with our premium service
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