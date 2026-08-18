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
  Car,
  UserCheck
} from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function ConciergeServiceBirminghamAirportPage() {
  const heroAnimation = useScrollAnimation()
  const servicesAnimation = useScrollAnimation()

  const services = [
    {
      title: 'Meet & Greet',
      description: 'Personal meet and greet service at Birmingham Airport.',
      features: ['Personal greeter', 'Flight monitoring', 'Luggage assistance', 'VIP treatment']
    },
    {
      title: 'Travel Coordination',
      description: 'Complete travel coordination and planning services.',
      features: ['Itinerary planning', 'Booking assistance', 'Travel coordination', '24/7 support']
    },
    {
      title: 'VIP Services',
      description: 'Exclusive VIP services for discerning travelers.',
      features: ['Priority service', 'Exclusive access', 'Personal assistant', 'Luxury vehicles']
    },
    {
      title: 'Corporate Services',
      description: 'Professional concierge services for corporate clients.',
      features: ['Corporate accounts', 'Business support', 'Professional service', 'Discreet handling']
    }
  ]

  const conciergeServices = [
    'Flight monitoring and updates',
    'Luggage handling and delivery',
    'Hotel reservations and coordination',
    'Restaurant bookings and recommendations',
    'Event ticket procurement',
    'Transportation coordination',
    'Business meeting arrangements',
    'Personal shopping assistance',
    'Travel documentation support',
    'Emergency assistance',
    'VIP lounge access',
    'Custom travel itineraries'
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
              Concierge Service Birmingham Airport
            </h1>
            <p className="text-xl md:text-2xl text-white opacity-90 max-w-3xl mx-auto">
              Premium concierge services at Birmingham Airport for the ultimate travel experience
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
            <h2 className="text-4xl font-bold text-jet2-dark mb-4">Birmingham Airport Concierge Services</h2>
            <p className="text-xl text-jet2-gray max-w-3xl mx-auto">
              Professional concierge services to enhance your travel experience
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

      {/* Features Section */}
      <section className="py-20 bg-jet2-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-jet2-dark mb-4">Our Concierge Services</h2>
            <p className="text-xl text-jet2-gray max-w-3xl mx-auto">
              Comprehensive concierge services to make your travel seamless
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conciergeServices.map((service, index) => (
              <div key={index} className="flex items-center text-jet2-gray">
                <UserCheck className="h-5 w-5 text-jet2-orange mr-3 flex-shrink-0" />
                <span>{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-jet2-dark mb-4">Why Choose Our Concierge Service</h2>
            <p className="text-xl text-jet2-gray max-w-3xl mx-auto">
              Experience the benefits of our professional concierge service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-jet2-dark mb-2">Personal Service</h3>
              <p className="text-jet2-gray">Dedicated personal concierge for your needs</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-jet2-dark mb-2">24/7 Availability</h3>
              <p className="text-jet2-gray">Round-the-clock service for your convenience</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-jet2-dark mb-2">Premium Quality</h3>
              <p className="text-jet2-gray">High-quality service for discerning travelers</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-jet2-dark mb-2">Trusted Service</h3>
              <p className="text-jet2-gray">Reliable and trustworthy concierge service</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Book Your Concierge Service</h2>
          <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Experience premium concierge service at Birmingham Airport
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/bookings/new/" className="bg-white text-jet2-orange hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Book Now
            </Link>
            <Link href="/contact-us" className="border-2 border-white text-white hover:bg-white hover:text-jet2-orange font-semibold py-4 px-8 rounded-lg transition-all duration-300">
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
              <span>info@jet2transport.com</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 