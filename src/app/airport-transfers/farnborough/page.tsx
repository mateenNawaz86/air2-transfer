'use client'

import Image from 'next/image'
import Link from 'next/link'
import { 
  Plane, 
  Shield, 
  Clock, 
  Users, 
  Star, 
  MapPin, 
  Phone, 
  ArrowRight,
  CheckCircle,
  Award,
  Zap,
  Mail,
  Navigation,
  Building,
  Calendar,
  Car
} from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function FarnboroughAirportChauffeurPage() {
  const heroAnimation = useScrollAnimation()
  const servicesAnimation = useScrollAnimation()

  const services = [
    {
      title: 'Farnborough Arrivals',
      description: 'Meet and greet service from Farnborough Airport to your destination.',
      features: ['Flight monitoring', 'Meet & greet', '60 min waiting', 'Professional drivers']
    },
    {
      title: 'Farnborough Departures',
      description: 'Reliable transfers from your location to Farnborough Airport.',
      features: ['Punctual service', 'Flight monitoring', 'Professional drivers', 'Luggage assistance']
    },
    {
      title: 'Business Aviation',
      description: 'Specialized service for private and business aviation.',
      features: ['Private jets', 'Business aviation', 'VIP treatment', 'Professional drivers']
    },
    {
      title: 'Corporate Travel',
      description: 'Professional service for corporate clients and executives.',
      features: ['Executive service', 'Corporate accounts', 'Professional presentation', 'Discreet service']
    }
  ]

  const destinations = [
    'Central London',
    'West London',
    'South London',
    'Surrey',
    'Hampshire',
    'Berkshire',
    'Oxfordshire',
    'Windsor',
    'Ascot',
    'Reading'
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-jet2-dark to-jet2-orange">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div 
            ref={heroAnimation.elementRef}
            className={`transition-all duration-1200 ${
              heroAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Farnborough Airport Chauffeur
            </h1>
            <p className="text-xl md:text-2xl text-white opacity-90 max-w-3xl mx-auto">
              Professional chauffeur service to and from Farnborough Airport (FAB)
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={servicesAnimation.elementRef}
            className={`text-center mb-16 ${
              servicesAnimation.isVisible ? 'animate-on-scroll animate-visible' : 'animate-on-scroll'
            }`}
          >
            <h2 className="text-4xl font-bold text-jet2-dark mb-4">Farnborough Airport Chauffeur Services</h2>
            <p className="text-xl text-jet2-gray max-w-3xl mx-auto">
              Professional and reliable chauffeur services to and from Farnborough Airport
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="group card-hover bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500"
              >
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-jet2-dark mb-4">{service.title}</h3>
                  <p className="text-jet2-gray mb-6">{service.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-jet2-gray">
                        <CheckCircle className="h-4 w-4 text-jet2-orange mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link 
                    href="/bookings/new/"
                    className="btn-primary inline-flex items-center w-full justify-center"
                  >
                    Book Service <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Airport Info Section */}
      <section className="py-20 bg-jet2-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-jet2-dark mb-4">Farnborough Airport (FAB)</h2>
            <p className="text-xl text-jet2-gray max-w-3xl mx-auto">
              Premier business aviation airport serving private and corporate flights
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-jet2-dark mb-4">About Farnborough Airport</h3>
              <p className="text-jet2-gray mb-6">
                Farnborough Airport (FAB) is a premier business aviation airport located in Hampshire, 
                approximately 35 miles southwest of Central London. It specializes in private and 
                corporate aviation, serving high-end business travelers and private jet operators.
              </p>
              <p className="text-jet2-gray mb-6">
                The airport is particularly popular with executives, celebrities, and high-net-worth 
                individuals who require discreet and luxurious travel arrangements.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-jet2-orange">Business</div>
                  <div className="text-sm text-jet2-gray">Aviation Focus</div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-jet2-orange">Private</div>
                  <div className="text-sm text-jet2-gray">Jet Services</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-jet2-dark mb-4">Popular Destinations</h3>
              <div className="grid grid-cols-1 gap-2">
                {destinations.map((destination, index) => (
                  <div key={index} className="flex items-center text-jet2-gray">
                    <MapPin className="h-4 w-4 text-jet2-orange mr-2" />
                    <span>{destination}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-jet2-dark mb-4">Our Fleet for Farnborough Airport</h2>
            <p className="text-xl text-jet2-gray max-w-3xl mx-auto">
              Choose from our selection of premium vehicles for your airport transfer
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-jet2-dark mb-2">Mercedes E-Class</h3>
              <p className="text-jet2-gray mb-4">Business Class - Perfect for airport transfers</p>
              <div className="text-2xl font-bold text-jet2-orange">From £85</div>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-jet2-dark mb-2">Mercedes V-Class</h3>
              <p className="text-jet2-gray mb-4">People Carrier - Spacious for groups</p>
              <div className="text-2xl font-bold text-jet2-orange">From £105</div>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-jet2-dark mb-2">Mercedes S-Class</h3>
              <p className="text-jet2-gray mb-4">First Class - Ultimate luxury experience</p>
              <div className="text-2xl font-bold text-jet2-orange">From £130</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Book Your Farnborough Airport Chauffeur Service</h2>
          <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Ensure a stress-free journey to and from Farnborough Airport with our reliable chauffeur service
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/bookings/new/" className="bg-white text-jet2-orange hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Book Now
            </Link>
            <Link href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-jet2-orange font-semibold py-4 px-8 rounded-lg transition-all duration-300">
              Contact Us
            </Link>
          </div>
          
          <div className="mt-12 flex flex-col sm:flex-row gap-8 justify-center text-white">
                            <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  <span>01213141080</span>
                </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              <span>info@air2transport.com</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 