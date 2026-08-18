'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Star, CheckCircle, Calendar, Users } from 'lucide-react'

export default function EventsChauffeurServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-jet2-dark to-jet2-orange text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Events Chauffeur Service
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Make your special events unforgettable with our premium chauffeur services
            </p>
            <Link 
              href="/bookings/new" 
              className="bg-white text-jet2-dark px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-block"
            >
              Book Event Transportation
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Perfect for Every Special Occasion
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From weddings to corporate events, we ensure your transportation is as special as your event
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Event Coordination</h3>
              <p className="text-gray-600">
                Seamless coordination with your event timeline and multiple pickup points
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Group Transportation</h3>
              <p className="text-gray-600">
                Accommodate large groups with our fleet of luxury vehicles and professional drivers
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Luxury Experience</h3>
              <p className="text-gray-600">
                Arrive in style with our premium fleet, perfect for making a lasting impression
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Event Types Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Event Types We Serve
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-jet2-dark">Weddings</h3>
              <p className="text-gray-600 mb-4">
                Make your wedding day transportation as special as the occasion itself
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Bride & groom transportation</li>
                <li>• Wedding party coordination</li>
                <li>• Guest transportation</li>
                <li>• Aesthetic vehicles</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-jet2-dark">Corporate Events</h3>
              <p className="text-gray-600 mb-4">
                Professional transportation for conferences, meetings, and corporate functions
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Executive transportation</li>
                <li>• Client transportation</li>
                <li>• Group coordination</li>
                <li>• Business-appropriate vehicles</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-jet2-dark">Birthday Celebrations</h3>
              <p className="text-gray-600 mb-4">
                Celebrate special birthdays with luxury transportation for the guest of honor
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Birthday party transportation</li>
                <li>• Group celebrations</li>
                <li>• Special decorations available</li>
                <li>• Flexible scheduling</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-jet2-dark">Anniversaries</h3>
              <p className="text-gray-600 mb-4">
                Celebrate your special milestone with romantic and elegant transportation
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Romantic atmosphere</li>
                <li>• Special decorations</li>
                <li>• Champagne service available</li>
                <li>• Intimate vehicle options</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-jet2-dark">Graduations</h3>
              <p className="text-gray-600 mb-4">
                Honor the graduate with special transportation for this important milestone
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Graduate transportation</li>
                <li>• Family coordination</li>
                <li>• Celebration transportation</li>
                <li>• Group arrangements</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-jet2-dark">Special Occasions</h3>
              <p className="text-gray-600 mb-4">
                Any special occasion deserves special transportation to make it memorable
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Custom arrangements</li>
                <li>• Special decorations</li>
                <li>• Flexible scheduling</li>
                <li>• Personalized service</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Event Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-jet2-dark">Event Planning Support</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Timeline coordination with your event planner</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Multiple pickup and drop-off locations</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Real-time updates and communication</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Backup vehicle arrangements</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-jet2-dark">Special Features</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Vehicle decorations and customization</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Champagne and refreshment service</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Professional photography assistance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Luggage and equipment handling</span>
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
            Make Your Event Special
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let us handle your transportation so you can focus on enjoying your special occasion
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/bookings/new" 
              className="bg-jet2-orange text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors"
            >
              Book Event Transportation
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
