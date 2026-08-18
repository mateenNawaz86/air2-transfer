'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Star, CheckCircle, Users, Briefcase } from 'lucide-react'

export default function BusinessChauffeurServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-jet2-dark to-jet2-orange text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Chauffeur Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Professional chauffeur services for corporate clients, ensuring punctuality and luxury for any of your needs
            </p>
            <Link 
              href="/bookings/new" 
              className="bg-white text-jet2-dark px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-block"
            >
              Book Transfer
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Chauffeur Services?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Elevate your travel needs with our premium chauffeur services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Punctuality Guaranteed</h3>
              <p className="text-gray-600">
                Never late with our guaranteed on-time service and real-time tracking
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Professional Drivers</h3>
              <p className="text-gray-600">
                Experienced, well-dressed chauffeurs with extensive knowledge of business districts
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Luxury Fleet</h3>
              <p className="text-gray-600">
                Travel in style with our premium fleet, perfect for making the right impression
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
              Chauffeur Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">Airport Transfers</h3>
              <p className="text-gray-600 mb-4">
                Reliable airport transfers for business travelers with flight monitoring
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Flight tracking</li>
                <li>• Meet & greet service</li>
                <li>• Luggage assistance</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">Corporate Events</h3>
              <p className="text-gray-600 mb-4">
                Transportation for corporate events, conferences, and business meetings
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Group transportation</li>
                <li>• Event coordination</li>
                <li>• Flexible scheduling</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">Client Transportation</h3>
              <p className="text-gray-600 mb-4">
                Impress your clients with professional chauffeur services
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Professional presentation</li>
                <li>• Client-focused service</li>
                <li>• Brand enhancement</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">Daily Commute</h3>
              <p className="text-gray-600 mb-4">
                Reliable daily transportation for executives and business professionals
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Regular scheduling</li>
                <li>• Consistent service</li>
                <li>• Time efficiency</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">Business Travel</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive business travel solutions across the UK
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Multi-city travel</li>
                <li>• Business district knowledge</li>
                <li>• Flexible arrangements</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">VIP Services</h3>
              <p className="text-gray-600 mb-4">
                Premium VIP chauffeur services for high-profile business clients
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Discretion guaranteed</li>
                <li>• Premium vehicles</li>
                <li>• Personalized service</li>
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
              Business Benefits
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-jet2-dark">For Executives</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Maximize productivity during travel time</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Arrive refreshed and ready for meetings</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Professional image maintenance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Reliable transportation regardless of weather</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-jet2-dark">For Companies</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Enhanced client relationships</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Improved employee satisfaction</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Cost-effective transportation solution</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Professional brand representation</span>
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
            Elevate Your Business Travel
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience the difference with our professional chauffeur services
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
