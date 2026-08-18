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

export default function SheffieldChauffeurServicePage() {
  const heroAnimation = useScrollAnimation()
  const servicesAnimation = useScrollAnimation()

  const services = [
    {
      title: 'Airport Transfers',
      description: 'Professional airport transfer service from Sheffield to all major airports.',
      features: ['Manchester Airport', 'Leeds Bradford Airport', 'East Midlands Airport', 'Flight monitoring']
    },
    {
      title: 'Business Travel',
      description: 'Corporate chauffeur service for business clients in Sheffield.',
      features: ['Business meetings', 'Corporate events', 'Professional drivers', 'Discreet service']
    },
    {
      title: 'City Tours',
      description: 'Explore Sheffield and surrounding areas with our guided tours.',
      features: ['Local knowledge', 'Historical sites', 'Custom routes', 'Professional guides']
    },
    {
      title: 'Special Events',
      description: 'Luxury transportation for weddings, parties, and special occasions.',
      features: ['Wedding cars', 'Event transport', 'Luxury vehicles', 'Professional service']
    }
  ]

  const destinations = [
    'Manchester',
    'Leeds',
    'Bradford',
    'Nottingham',
    'Derby',
    'Leicester',
    'Birmingham',
    'York',
    'Liverpool',
    'London'
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
              Sheffield Chauffeur Service
            </h1>
            <p className="text-xl md:text-2xl text-white opacity-90 max-w-3xl mx-auto">
              Professional chauffeur service in Sheffield and surrounding areas
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
            <h2 className="text-4xl font-bold text-jet2-dark mb-4">Sheffield Chauffeur Services</h2>
            <p className="text-xl text-jet2-gray max-w-3xl mx-auto">
              Professional and reliable chauffeur services in Sheffield
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

      {/* City Info Section */}
      <section className="py-20 bg-jet2-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-jet2-dark mb-4">Sheffield</h2>
            <p className="text-xl text-jet2-gray max-w-3xl mx-auto">
              Historic steel city in South Yorkshire
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-jet2-dark mb-4">About Sheffield</h3>
              <p className="text-jet2-gray mb-6">
                Sheffield is a historic city in South Yorkshire, known for its rich industrial heritage 
                in steel production. The city is famous for its steel industry and has a proud 
                manufacturing tradition that dates back centuries.
              </p>
              <p className="text-jet2-gray mb-6">
                Today, Sheffield is a vibrant city with excellent transport links, making it an ideal 
                base for exploring Yorkshire and beyond.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-jet2-orange">Steel</div>
                  <div className="text-sm text-jet2-gray">City Heritage</div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-jet2-orange">Yorkshire</div>
                  <div className="text-sm text-jet2-gray">Location</div>
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
            <h2 className="text-4xl font-bold text-jet2-dark mb-4">Our Fleet in Sheffield</h2>
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
              <div className="text-2xl font-bold text-jet2-orange">From £70</div>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-jet2-dark mb-2">Mercedes V-Class</h3>
              <p className="text-jet2-gray mb-4">People Carrier - Spacious for groups</p>
              <div className="text-2xl font-bold text-jet2-orange">From £90</div>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-jet2-dark mb-2">Mercedes S-Class</h3>
              <p className="text-jet2-gray mb-4">First Class - Ultimate luxury experience</p>
              <div className="text-2xl font-bold text-jet2-orange">From £120</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Book Your Sheffield Chauffeur Service</h2>
          <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Experience professional chauffeur service in Sheffield and beyond
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