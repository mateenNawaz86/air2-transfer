'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Star, CheckCircle } from 'lucide-react'

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
              Professional, reliable, and comfortable airport transfer services across the UK
            </p>
            <Link 
              href="/bookings/new" 
              className="bg-white text-jet2-dark px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-block"
            >
              Book Your Transfer
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">24/7 Service</h3>
              <p className="text-gray-600">
                Available round the clock for all your airport transfer needs, regardless of flight times
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Flight Monitoring</h3>
              <p className="text-gray-600">
                We track your flight and adjust pickup times automatically for delays or early arrivals
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Premium Fleet</h3>
              <p className="text-gray-600">
                Travel in style with our luxury fleet, ensuring comfort and elegance
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Airport Transfer Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">Meet & Greet</h3>
              <p className="text-gray-600 mb-4">
                Your driver will meet you at arrivals with a name board for easy identification
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Professional driver in uniform</li>
                <li>• Name board for easy identification</li>
                <li>• Assistance with luggage</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">Fixed Pricing</h3>
              <p className="text-gray-600 mb-4">
                Transparent, fixed pricing with no hidden charges or surge pricing
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• No hidden fees</li>
                <li>• Fixed rates regardless of time</li>
                <li>• All taxes included</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">Child Seats</h3>
              <p className="text-gray-600 mb-4">
                Complimentary child seats available for families traveling with children
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Various sizes available</li>
                <li>• Complimentary service</li>
                <li>• Safety certified</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-jet2-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Book Your Airport Transfer?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience the ultimate in comfort and reliability with our premium airport transfer services
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
