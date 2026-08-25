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

export default function CityToCityLongDistanceCarServicePage() {
  const heroAnimation = useScrollAnimation()
  const servicesAnimation = useScrollAnimation()

  const services = [
    {
      title: 'London to Birmingham',
      description: 'Professional long-distance service between London and Birmingham.',
      features: ['Direct route', 'Comfort breaks', 'Professional driver', 'Luxury vehicle'],
      duration: '2-3 hours',
      price: 'From £180'
    },
    {
      title: 'Manchester to London',
      description: 'Reliable service between Manchester and London.',
      features: ['Motorway route', 'Rest stops', 'Professional service', 'Comfortable journey'],
      duration: '3-4 hours',
      price: 'From £220'
    },
    {
      title: 'Birmingham to Leeds',
      description: 'Efficient service between Birmingham and Leeds.',
      features: ['Direct journey', 'Professional driver', 'Luxury comfort', 'Reliable service'],
      duration: '2-3 hours',
      price: 'From £160'
    },
    {
      title: 'Custom Routes',
      description: 'Tailored long-distance service for your specific route.',
      features: ['Flexible routing', 'Custom stops', 'Professional service', 'Luxury vehicles'],
      duration: 'Variable',
      price: 'From £150'
    }
  ]

  const popularRoutes = [
    'London ↔ Birmingham',
    'London ↔ Manchester',
    'London ↔ Leeds',
    'Birmingham ↔ Manchester',
    'Birmingham ↔ Leeds',
    'Manchester ↔ Leeds',
    'London ↔ Bristol',
    'Birmingham ↔ Bristol',
    'London ↔ Nottingham',
    'Birmingham ↔ Sheffield'
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
              City to City Long Distance Car Service
            </h1>
            <p className="text-xl md:text-2xl text-white opacity-90 max-w-3xl mx-auto">
              Professional long-distance chauffeur service between major UK cities
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
            <h2 className="text-4xl font-bold text-jet2-dark mb-4">Our Long Distance Services</h2>
            <p className="text-xl text-jet2-gray max-w-3xl mx-auto">
              Professional and comfortable long-distance travel between major UK cities
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
                    <div className="text-sm text-jet2-gray">Duration: {service.duration}</div>
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
            <h2 className="text-4xl font-bold text-jet2-dark mb-4">Why Choose Our Long Distance Service</h2>
            <p className="text-xl text-jet2-gray max-w-3xl mx-auto">
              Experience the benefits of our professional long-distance chauffeur service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-jet2-dark mb-2">Punctual Service</h3>
              <p className="text-jet2-gray">Reliable and on-time service for your journey</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-jet2-dark mb-2">Safe Travel</h3>
              <p className="text-jet2-gray">Professional drivers and well-maintained vehicles</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-jet2-dark mb-2">Luxury Comfort</h3>
              <p className="text-jet2-gray">Premium vehicles for maximum comfort</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-jet2-dark mb-2">Professional Drivers</h3>
              <p className="text-jet2-gray">Experienced and courteous chauffeurs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Routes Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-jet2-dark mb-4">Popular Routes</h2>
            <p className="text-xl text-jet2-gray max-w-3xl mx-auto">
              We serve major routes between UK cities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularRoutes.map((route, index) => (
              <div key={index} className="bg-jet2-light p-6 rounded-lg">
                <div className="flex items-center text-jet2-dark">
                  <MapPin className="h-5 w-5 text-jet2-orange mr-3" />
                  <span className="font-semibold">{route}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section className="py-20 bg-jet2-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-jet2-dark mb-4">Our Long Distance Fleet</h2>
            <p className="text-xl text-jet2-gray max-w-3xl mx-auto">
              Choose from our selection of premium vehicles for long-distance travel
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-jet2-dark mb-2">Mercedes E-Class</h3>
              <p className="text-jet2-gray mb-4">Business Class - Perfect for long journeys</p>
              <div className="text-2xl font-bold text-jet2-orange">From £150</div>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-jet2-dark mb-2">Mercedes V-Class</h3>
              <p className="text-jet2-gray mb-4">People Carrier - Spacious for groups</p>
              <div className="text-2xl font-bold text-jet2-orange">From £180</div>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-jet2-dark mb-2">Mercedes S-Class</h3>
              <p className="text-jet2-gray mb-4">First Class - Ultimate luxury experience</p>
              <div className="text-2xl font-bold text-jet2-orange">From £220</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Book Your Long Distance Journey</h2>
          <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Experience comfortable and professional long-distance travel between UK cities
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