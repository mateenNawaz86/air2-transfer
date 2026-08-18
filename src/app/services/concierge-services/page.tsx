'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Star, CheckCircle, Car, Users, Shield, Award } from 'lucide-react'

export default function ConciergeServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-jet2-dark to-jet2-orange text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Concierge Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Premium concierge services for the ultimate VIP experience
            </p>
            <Link 
              href="/bookings/new" 
              className="bg-white text-jet2-dark px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-block"
            >
              Book Concierge Service
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Concierge Services?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the highest level of personalized service and attention to detail
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">VIP Treatment</h3>
              <p className="text-gray-600">
                Exclusive service with personalized attention and premium amenities
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Discretion Guaranteed</h3>
              <p className="text-gray-600">
                Complete privacy and confidentiality for high-profile clients
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Luxury Experience</h3>
              <p className="text-gray-600">
                Premium vehicles and professional service for the ultimate experience
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
              Our Concierge Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-jet2-dark">Airport Concierge</h3>
              <p className="text-gray-600 mb-4">
                Complete airport assistance including check-in, security, and lounge access
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Meet & greet at arrivals</li>
                <li>• Check-in assistance</li>
                <li>• Fast-track security</li>
                <li>• Lounge access arrangements</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-jet2-dark">Hotel Concierge</h3>
              <p className="text-gray-600 mb-4">
                Premium hotel services including check-in, room preparation, and special requests
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Priority check-in</li>
                <li>• Room preparation</li>
                <li>• Special amenities</li>
                <li>• Restaurant reservations</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-jet2-dark">Event Concierge</h3>
              <p className="text-gray-600 mb-4">
                Complete event coordination and VIP transportation services
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Event coordination</li>
                <li>• VIP transportation</li>
                <li>• Guest management</li>
                <li>• Special arrangements</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-jet2-dark">Business Concierge</h3>
              <p className="text-gray-600 mb-4">
                Professional business support services for executives and corporate clients
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Meeting coordination</li>
                <li>• Business travel support</li>
                <li>• Client transportation</li>
                <li>• Corporate events</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-jet2-dark">Lifestyle Concierge</h3>
              <p className="text-gray-600 mb-4">
                Personal lifestyle management and luxury service coordination
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Restaurant bookings</li>
                <li>• Entertainment tickets</li>
                <li>• Shopping assistance</li>
                <li>• Personal errands</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-jet2-dark">Travel Concierge</h3>
              <p className="text-gray-600 mb-4">
                Complete travel planning and coordination for seamless journeys
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Travel planning</li>
                <li>• Itinerary management</li>
                <li>• Special requests</li>
                <li>• 24/7 support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Concierge Service Benefits
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-jet2-dark">For VIP Clients</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Personalized attention and service</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Complete privacy and discretion</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Access to exclusive amenities</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>24/7 dedicated support</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-jet2-dark">For Business Clients</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Professional business support</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Meeting and event coordination</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Client impression management</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Time-saving solutions</span>
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
            Experience Premium Concierge Services
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Elevate your travel experience with our exclusive concierge services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/bookings/new" 
              className="bg-jet2-orange text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors"
            >
              Book Concierge Service
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
