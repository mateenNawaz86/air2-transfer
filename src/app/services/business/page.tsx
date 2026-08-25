'use client'

import Image from 'next/image'
import Link from 'next/link'
import { 
  Building, 
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
  Plane,
  Calendar
} from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function BusinessChauffeurServicesPage() {
  const heroAnimation = useScrollAnimation()
  const servicesAnimation = useScrollAnimation()

  const services = [
    {
      title: 'Corporate Travel',
      description: 'Professional transportation for business meetings and corporate events.',
      features: ['Business attire', 'Discreet service', 'Corporate accounts', 'Professional presentation']
    },
    {
      title: 'Airport Transfers',
      description: 'Reliable airport transfers with flight monitoring for business travelers.',
      features: ['Flight monitoring', 'Meet & greet', '60 min waiting', 'Professional drivers']
    },
    {
      title: 'Intercity Travel',
      description: 'Comfortable journeys between cities for business meetings.',
      features: ['City-to-city transfers', 'Comfortable journeys', 'Rest stops available', 'Fixed pricing']
    },
    {
      title: 'Event Transportation',
      description: 'Professional transportation for corporate events and conferences.',
      features: ['Event coordination', 'Luxury vehicles', 'Professional service', 'Flexible scheduling']
    }
  ]

  const benefits = [
    {
      icon: Shield,
      title: 'Professional Service',
      description: 'Experienced drivers in business attire'
    },
    {
      icon: Clock,
      title: 'Punctuality',
      description: 'On-time guarantee for all business appointments'
    },
    {
      icon: Building,
      title: 'Corporate Accounts',
      description: 'Monthly invoicing and account management'
    },
    {
      icon: Users,
      title: 'Business Focus',
      description: 'Understanding of business travel needs'
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
              Chauffeur Services
            </h1>
            <p className="text-xl md:text-2xl text-white opacity-90 max-w-3xl mx-auto">
              Professional transportation solutions for corporate clients
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
            <h2 className="text-4xl font-bold text-jet2-dark mb-4">Business Services</h2>
            <p className="text-xl text-jet2-gray max-w-3xl mx-auto">
              Comprehensive transportation solutions for corporate clients
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

      {/* Benefits Section */}
      <section className="py-20 bg-jet2-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-jet2-dark mb-4">Why Choose Our Business Services?</h2>
            <p className="text-xl text-jet2-gray max-w-3xl mx-auto">
              Professional transportation tailored for business needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div 
                  key={index} 
                  className="text-center group transition-all duration-500"
                >
                  <div className="w-16 h-16 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-jet2-dark mb-2">{benefit.title}</h3>
                  <p className="text-jet2-gray">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Book Your Business Service?</h2>
          <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Experience professional transportation tailored for your business needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/bookings/new/" className="bg-white text-jet2-orange hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Book Now
            </Link>
            <Link href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-jet2-orange font-semibold py-4 px-8 rounded-lg transition-all duration-300">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 