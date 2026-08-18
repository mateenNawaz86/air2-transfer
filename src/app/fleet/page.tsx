'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Users, Car, Shield, Star, CheckCircle, Phone, Mail, MapPin, Clock } from 'lucide-react'
import { useScrollAnimation, useStaggeredScrollAnimation } from '@/hooks/useScrollAnimation'

export default function FleetPage() {
  // Staggered animations
  const { visibleItems: visibleFleet, setRef: setFleetRef } = useStaggeredScrollAnimation(6)

  const fleetVehicles = [
    {
      name: 'Economy Student',
      category: 'Economy',
      passengers: 4,
      luggage: 2,
      image: 'https://assetshost.sirv.com/jet2transport/2025_toyota_prius_xle-awd_001_0218.png',
      href: '/fleet/economy-student'
    },
    {
      name: 'Comfort',
      category: 'Comfort',
      passengers: 4,
      luggage: 2,
      image: 'https://assetshost.sirv.com/jet2transport/Mercedes%20C-Class.png',
      href: '/fleet/comfort'
    },
    {
      name: 'Executive',
      category: 'Executive',
      passengers: 4,
      luggage: 2,
      image: 'https://assetshost.sirv.com/jet2transport/Mercedes%20S-Class.png',
      href: '/fleet/executive'
    },
    {
      name: 'Executive Business',
      category: 'Executive Business',
      passengers: 4,
      luggage: 2,
      image: 'https://assetshost.sirv.com/jet2transport/BMW%207%20Series.png',
      href: '/fleet/executive-business'
    },
    {
      name: 'XL',
      category: 'XL',
      passengers: 6,
      luggage: 4,
      image: 'https://assetshost.sirv.com/jet2transport/Mercedes%20Vito.png',
      href: '/fleet/excel'
    },
    {
      name: 'Executive Business XL',
      category: 'Executive Business XL',
      passengers: 8,
      luggage: 6,
      image: 'https://assetshost.sirv.com/jet2transport/Mercedes%20Sprinter.png',
      href: '/fleet/executive-business-excel'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-jet2-dark to-jet2-orange text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Vehicle Fleet
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Premium vehicles for every occasion
            </p>
          </div>
        </div>
      </div>

      {/* Fleet Grid Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-jet2-dark mb-4 animate-slide-down">Our Fleet</h2>
            <p className="text-xl text-jet2-gray max-w-3xl mx-auto animate-fade-in animate-delay-200">
              Catering for every occasion
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fleetVehicles.map((vehicle, index) => (
              <div 
                key={index} 
                ref={setFleetRef(index)}
                className={`fleet-card rounded-xl overflow-hidden card-hover group transition-all duration-500 ${
                  visibleFleet[index] ? 'animate-scale-in' : 'opacity-0 scale-75'
                }`}
              >
                <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    fill
                    className="fleet-image-professional object-contain object-center group-hover:scale-105 transition-transform duration-500 p-4"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 right-4 professional-badge text-jet2-dark px-3 py-1 rounded-full text-xs font-medium animate-slide-in-right">
                    Premium
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-jet2-dark mb-4 animate-fade-in">{vehicle.name}</h3>
                  <div className="flex justify-center space-x-8 mb-6">
                    <div className="flex items-center text-jet2-gray animate-slide-in-left animate-delay-200">
                      <div className="icon-container w-8 h-8 rounded-full flex items-center justify-center mr-2">
                        <Users className="h-4 w-4 text-jet2-orange" />
                      </div>
                      <span className="text-sm font-medium">Passengers {vehicle.passengers}</span>
                    </div>
                    <div className="flex items-center text-jet2-gray animate-slide-in-right animate-delay-200">
                      <div className="icon-container w-8 h-8 rounded-full flex items-center justify-center mr-2">
                        <Car className="h-4 w-4 text-jet2-orange" />
                      </div>
                      <span className="text-sm font-medium">Luggage {vehicle.luggage}</span>
                    </div>
                  </div>
                  <Link href="/bookings/new/" className="btn-primary w-full py-3 text-center font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300">
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fleet Features Section */}
      <div className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Fleet Features
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Why choose our premium vehicle fleet
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-jet2-orange rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fully Insured</h3>
              <p className="text-gray-600">Comprehensive insurance coverage for your peace of mind</p>
            </div>

            <div className="text-center">
              <div className="bg-jet2-orange rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">Only the finest vehicles in excellent condition</p>
            </div>

            <div className="text-center">
              <div className="bg-jet2-orange rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Professional Drivers</h3>
              <p className="text-gray-600">Experienced and courteous chauffeurs</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-jet2-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book Your Transfer?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Choose from our premium fleet and experience luxury travel at its finest
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
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-jet2-dark transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}