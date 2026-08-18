'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Star, CheckCircle, Car, Building, Users, Shield } from 'lucide-react'

export default function SheffieldCityPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-jet2-dark to-jet2-orange text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Sheffield Chauffeur Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Professional chauffeur services across the steel city
            </p>
            <Link
              href="/bookings/new"
              className="bg-white text-jet2-dark px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-block"
            >
              Book Sheffield Service
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Sheffield Service?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience reliable and professional chauffeur services across Sheffield
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Local Knowledge</h3>
              <p className="text-gray-600">
                Expert drivers with extensive knowledge of Sheffield's roads and traffic
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
                premium vehicles for comfortable travel across Sheffield
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sheffield Info Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                About Sheffield
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Sheffield is a city in South Yorkshire, known for its steel industry heritage and green spaces.
                It's the UK's greenest city with over 250 parks and woodlands.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-jet2-orange mr-3" />
                  <span className="text-gray-700">City in South Yorkshire</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-jet2-orange mr-3" />
                  <span className="text-gray-700">Population of over 580,000</span>
                </div>
                <div className="flex items-center">
                  <Building className="h-5 w-5 text-jet2-orange mr-3" />
                  <span className="text-gray-700">UK's greenest city</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 h-64 rounded-lg overflow-hidden">
              <img 
                src="https://assetshost.sirv.com/jet2transport/sheffield.jpg" 
                alt="Sheffield cityscape" 
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
              Sheffield Services
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
              Popular Sheffield Areas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2 text-jet2-dark">City Center</h3>
              <p className="text-gray-600 mb-3">Business district and shopping</p>
              <p className="text-sm text-gray-500">Meadowhall, The Moor</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2 text-jet2-dark">Ecclesall Road</h3>
              <p className="text-gray-600 mb-3">Trendy dining and shopping</p>
              <p className="text-sm text-gray-500">Restaurants, bars, independent shops</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2 text-jet2-dark">Kelham Island</h3>
              <p className="text-gray-600 mb-3">Industrial heritage area</p>
              <p className="text-sm text-gray-500">Museums, craft breweries, restaurants</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2 text-jet2-dark">Broomhill</h3>
              <p className="text-gray-600 mb-3">Student and residential area</p>
              <p className="text-sm text-gray-500">University area, cafes, shops</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2 text-jet2-dark">Dore</h3>
              <p className="text-gray-600 mb-3">Affluent suburb</p>
              <p className="text-sm text-gray-500">Village atmosphere, good schools</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2 text-jet2-dark">Peak District</h3>
              <p className="text-gray-600 mb-3">National park access</p>
              <p className="text-sm text-gray-500">Hiking, outdoor activities</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-jet2-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Book Your Sheffield Service
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience professional chauffeur services across Sheffield with our premium fleet
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
