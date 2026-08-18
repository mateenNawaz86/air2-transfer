'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Star, CheckCircle, Car, Navigation } from 'lucide-react'

export default function CityToCityTransfersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-jet2-dark to-jet2-orange text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              City to City Transfers
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Comfortable and reliable long-distance transfers between cities across the UK
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
              Why Choose Our City to City Transfers?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the ultimate in comfort and convenience for your long-distance travel
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Luxury Comfort</h3>
              <p className="text-gray-600">
                Travel in style with our premium fleet, designed for long-distance comfort
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Navigation className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Direct Routes</h3>
              <p className="text-gray-600">
                Professional drivers with extensive knowledge of routes and traffic patterns
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Flexible Scheduling</h3>
              <p className="text-gray-600">
                Book transfers at any time with our 24/7 availability and flexible scheduling
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Routes Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular City Routes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-jet2-dark">London ↔ Birmingham</h3>
              <p className="text-gray-600 mb-4">
                Direct transfers between the capital and the heart of the Midlands
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Approx. 2.5 hours journey time</li>
                <li>• Door-to-door service</li>
                <li>• Luggage assistance included</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-jet2-dark">London ↔ Manchester</h3>
              <p className="text-gray-600 mb-4">
                Premium transfers to the vibrant northern city
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Approx. 3.5 hours journey time</li>
                <li>• Comfort breaks available</li>
                <li>• WiFi and refreshments</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-jet2-dark">Birmingham ↔ Manchester</h3>
              <p className="text-gray-600 mb-4">
                Direct connections between major business hubs
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Approx. 2 hours journey time</li>
                <li>• Business-friendly service</li>
                <li>• Meeting preparation time</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-jet2-dark">London ↔ Leeds</h3>
              <p className="text-gray-600 mb-4">
                Professional transfers to Yorkshire's business capital
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Approx. 3 hours journey time</li>
                <li>• Corporate travel solutions</li>
                <li>• Flexible pickup times</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-jet2-dark">London ↔ Liverpool</h3>
              <p className="text-gray-600 mb-4">
                Comfortable transfers to the historic port city
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Approx. 4 hours journey time</li>
                <li>• Scenic route options</li>
                <li>• Group travel available</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3 text-jet2-dark">Birmingham ↔ Sheffield</h3>
              <p className="text-gray-600 mb-4">
                Direct connections to the Steel City
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Approx. 1.5 hours journey time</li>
                <li>• Regular service available</li>
                <li>• Cost-effective options</li>
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
              Our City Transfer Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-jet2-dark">Business Travel</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Professional drivers with business etiquette</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Meeting preparation time included</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>WiFi and charging facilities</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Flexible scheduling for meetings</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-jet2-dark">Leisure Travel</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Comfortable seating for long journeys</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Luggage space and assistance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Refreshments and amenities</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Scenic route options available</span>
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
            Book Your City to City Transfer
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience comfortable and reliable long-distance travel with our premium service
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
