'use client'

import Image from 'next/image'
import Link from 'next/link'
import { 
  Car, 
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
  Settings
} from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function HourlyFullDayChauffeurServicesPage() {
  const heroAnimation = useScrollAnimation()
  const servicesAnimation = useScrollAnimation()

  const services = [
    {
      title: 'Hourly Chauffeur Service',
      description: 'Flexible hourly chauffeur service for short journeys and appointments.',
      features: ['Minimum 2 hours', 'Flexible booking', 'Professional drivers', 'Luxury vehicles'],
      price: 'From £45/hour'
    },
    {
      title: 'Half Day Service',
      description: 'Perfect for business meetings, shopping trips, or city tours.',
      features: ['4-6 hours', 'Business ready', 'Professional presentation', 'Discreet service'],
      price: 'From £180'
    },
    {
      title: 'Full Day Service',
      description: 'Comprehensive full-day chauffeur service for extended travel needs.',
      features: ['8-10 hours', 'All-inclusive', 'Professional chauffeur', 'Luxury comfort'],
      price: 'From £350'
    },
    {
      title: 'Multi-Day Service',
      description: 'Extended chauffeur service for business trips and special events.',
      features: ['Multiple days', 'Corporate rates', 'Professional service', 'Luxury vehicles'],
      price: 'From £300/day'
    }
  ]

  const benefits = [
    {
      title: 'Flexible Booking',
      description: 'Book by the hour, half day, or full day to suit your needs.',
      icon: <Clock className="h-8 w-8" />
    },
    {
      title: 'Professional Drivers',
      description: 'Experienced and courteous chauffeurs for your comfort.',
      icon: <Users className="h-8 w-8" />
    },
    {
      title: 'Luxury Fleet',
      description: 'premium vehicles maintained to the highest standards.',
      icon: <Car className="h-8 w-8" />
    },
    {
      title: '24/7 Availability',
      description: 'Round-the-clock service for your convenience.',
      icon: <Zap className="h-8 w-8" />
    }
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
              Hourly & Full Day Chauffeur Services
            </h1>
            <p className="text-xl md:text-2xl text-white opacity-90 max-w-3xl mx-auto">
              Flexible chauffeur services tailored to your schedule and requirements
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
            <h2 className="text-4xl font-bold text-jet2-dark mb-4">Our Flexible Services</h2>
            <p className="text-xl text-jet2-gray max-w-3xl mx-auto">
              Choose the service that best fits your schedule and requirements
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
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-2xl font-bold text-jet2-orange">{service.price}</div>
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

      {/* Benefits Section */}
      <section className="py-20 bg-jet2-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-jet2-dark mb-4">Why Choose Our Services</h2>
            <p className="text-xl text-jet2-gray max-w-3xl mx-auto">
              Experience the benefits of our flexible chauffeur services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-white">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-jet2-dark mb-2">{benefit.title}</h3>
                <p className="text-jet2-gray">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-jet2-dark mb-4">Our Fleet</h2>
            <p className="text-xl text-jet2-gray max-w-3xl mx-auto">
              Choose from our selection of premium vehicles for your journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-jet2-dark mb-2">Mercedes E-Class</h3>
              <p className="text-jet2-gray mb-4">Business Class - Perfect for all occasions</p>
              <div className="text-2xl font-bold text-jet2-orange">From £45/hour</div>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-jet2-dark mb-2">Mercedes V-Class</h3>
              <p className="text-jet2-gray mb-4">People Carrier - Spacious for groups</p>
              <div className="text-2xl font-bold text-jet2-orange">From £55/hour</div>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-jet2-dark mb-2">Mercedes S-Class</h3>
              <p className="text-jet2-gray mb-4">First Class - Ultimate luxury experience</p>
              <div className="text-2xl font-bold text-jet2-orange">From £65/hour</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Book Your Flexible Chauffeur Service</h2>
          <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Experience flexible and professional chauffeur services tailored to your needs
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