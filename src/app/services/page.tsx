'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Star, CheckCircle, Car, Users, Calendar, Building } from 'lucide-react'

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-jet2-dark to-jet2-orange text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Premium chauffeur services tailored to your every need
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

      {/* Services Overview Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Professional Chauffeur Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From airport transfers to corporate events, we provide the highest quality transportation services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/services/airport-transfers" className="group">
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Car className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-jet2-dark">Airport Transfers</h3>
                <p className="text-gray-600 mb-4">
                  Reliable airport transportation with flight monitoring and meet & greet service
                </p>
                <div className="text-jet2-orange font-semibold">Learn More →</div>
              </div>
            </Link>

            <Link href="/services/chauffeur-services" className="group">
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Building className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-jet2-dark">Business Services</h3>
                <p className="text-gray-600 mb-4">
                  Professional chauffeur services for corporate clients and business travel
                </p>
                <div className="text-jet2-orange font-semibold">Learn More →</div>
              </div>
            </Link>

            <Link href="/services/events-chauffeur-service" className="group">
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-jet2-dark">Events & Weddings</h3>
                <p className="text-gray-600 mb-4">
                  Special transportation for weddings, corporate events, and celebrations
                </p>
                <div className="text-jet2-orange font-semibold">Learn More →</div>
              </div>
            </Link>

            <Link href="/services/city-to-city-transfers" className="group">
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-jet2-dark">City to City</h3>
                <p className="text-gray-600 mb-4">
                  Long-distance transfers between cities with comfort and reliability
                </p>
                <div className="text-jet2-orange font-semibold">Learn More →</div>
              </div>
            </Link>

            <Link href="/services/concierge-services" className="group">
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-jet2-dark">Concierge Services</h3>
                <p className="text-gray-600 mb-4">
                  Premium concierge services including airport assistance and VIP treatment
                </p>
                <div className="text-jet2-orange font-semibold">Learn More →</div>
              </div>
            </Link>

            <Link href="/fleet" className="group">
              <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-jet2-dark">Our Fleet</h3>
                <p className="text-gray-600 mb-4">
                  Explore our luxury fleet designed for comfort and style
                </p>
                <div className="text-jet2-orange font-semibold">Learn More →</div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Air2Transport?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">24/7 Service</h3>
              <p className="text-gray-600">
                Available round the clock for all your transportation needs
              </p>
            </div>

            <div className="text-center">
              <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Professional Drivers</h3>
              <p className="text-gray-600">
                Experienced, licensed, and well-trained chauffeurs
              </p>
            </div>

            <div className="text-center">
              <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Luxury Fleet</h3>
              <p className="text-gray-600">
                Premium vehicles maintained to the highest standards
              </p>
            </div>

            <div className="text-center">
              <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">UK Wide Coverage</h3>
              <p className="text-gray-600">
                Serving all major cities and airports across the UK
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-jet2-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Experience Our Services?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book your premium chauffeur service today and experience the difference
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
