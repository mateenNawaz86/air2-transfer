'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Star, CheckCircle, Users, Award, Shield } from 'lucide-react'

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-jet2-dark to-jet2-orange text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About Air2Transport
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Delivering excellence in transportation across the UK since
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded with the goal of delivering the highest standards in private hire and chauffeur services, Air2Transport has built a reputation as one of the UK's most trusted names in transportation.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Backed by vast industry expertise and a proven track record, we combine professionalism with attention to detail to provide a seamless service for every client.
              </p>
              <p className="text-lg text-gray-600">
                Trusted by business executives, families, and travellers alike, we are committed to ensuring every journey is defined by reliability, comfort, and exceptional customer care.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 text-jet2-dark">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                To deliver exceptional and reliable transportation with a focus on trust, comfort, and safety - exceeding client expectations and ensuring every journey is memorable.
              </p>
              <h3 className="text-2xl font-semibold mb-6 text-jet2-dark">Our Vision</h3>
              <p className="text-gray-600">
                To be the UK's leading provider of premium transportation solutions - a one-stop service for our clients' diverse travel needs. Whether for business, leisure, events, or everyday journeys, we aim to deliver seamless, reliable, and tailored experiences built on quality, innovation, and customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in every aspect of our service, from vehicle maintenance to driver professionalism
              </p>
            </div>

            <div className="text-center">
              <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Reliability</h3>
              <p className="text-gray-600">
                Our clients can always count on us to be punctual, professional, and dependable
              </p>
            </div>

            <div className="text-center">
              <div className="bg-jet2-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Customer Focus</h3>
              <p className="text-gray-600">
                Every decision we make is centered around providing the best possible experience for our clients
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated professionals behind our success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-24 h-24 bg-jet2-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">JD</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">John Driver</h3>
              <p className="text-jet2-orange mb-3">Senior Chauffeur</p>
              <p className="text-gray-600 text-sm">
                With over 10 years of experience, John ensures every journey is smooth and professional.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-24 h-24 bg-jet2-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">SM</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sarah Manager</h3>
              <p className="text-jet2-orange mb-3">Operations Manager</p>
              <p className="text-gray-600 text-sm">
                Sarah oversees all operations, ensuring seamless service delivery and customer satisfaction.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-24 h-24 bg-jet2-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">MC</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Mike Coordinator</h3>
              <p className="text-jet2-orange mb-3">Customer Service</p>
              <p className="text-gray-600 text-sm">
                Mike ensures every booking is handled with care and every client receives personalized attention.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Achievements
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-jet2-orange mb-2">5000+</div>
              <p className="text-gray-600">Happy Clients</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-jet2-orange mb-2">10+</div>
              <p className="text-gray-600">Years Experience</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-jet2-orange mb-2">50+</div>
              <p className="text-gray-600">Luxury Vehicles</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-jet2-orange mb-2">24/7</div>
              <p className="text-gray-600">Service Available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Air2Transport?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-jet2-dark">Quality Assurance</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Fully licensed and insured service</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Regularly maintained luxury vehicles</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Professional, experienced drivers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Comprehensive safety protocols</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-jet2-dark">Customer Experience</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Personalized service for every client</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>24/7 customer support</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Real-time tracking and updates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-jet2-orange mr-3 mt-0.5 flex-shrink-0" />
                  <span>Flexible booking and cancellation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-jet2-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied clients who choose Air2Transport for their transportation needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/bookings/new" 
              className="bg-jet2-orange text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-colors"
            >
              Book Your Journey
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