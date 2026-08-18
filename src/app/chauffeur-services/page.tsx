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
  Heart,
  Mail,
  Navigation,
  Plane,
  Building,
  Calendar
} from 'lucide-react'
import { useScrollAnimation, useStaggeredScrollAnimation } from '@/hooks/useScrollAnimation'

export default function ChauffeurServicesPage() {
  const heroAnimation = useScrollAnimation()
  const servicesAnimation = useScrollAnimation()
  const { visibleItems: visibleServices, setRef: setServiceRef } = useStaggeredScrollAnimation(6)

  const services = [
    {
      title: 'Airport Transfers',
      description: 'Professional airport transfer service with flight monitoring and meet & greet.',
      icon: Plane,
      features: ['Flight monitoring', 'Meet & greet service', '60-minute waiting time', 'Professional drivers']
    },
    {
      title: 'Corporate Travel',
      description: 'Discreet and professional transportation for business meetings and events.',
      icon: Building,
      features: ['Business attire', 'Discreet service', 'Corporate accounts', 'Professional presentation']
    },
    {
      title: 'Event Transportation',
      description: 'Luxury transportation for special events and occasions.',
      icon: Calendar,
      features: ['Event coordination', 'Luxury vehicles', 'Professional service', 'Flexible scheduling']
    },
    {
      title: 'Wedding Services',
      description: 'Make your special day perfect with our luxury wedding car service.',
      icon: Heart,
      features: ['Wedding coordination', 'Luxury wedding cars', 'Bridal party transport', 'Special packages']
    },
    {
      title: 'Intercity Travel',
      description: 'Comfortable and luxurious journeys between cities.',
      icon: Navigation,
      features: ['City-to-city transfers', 'Comfortable journeys', 'Rest stops available', 'Fixed pricing']
    },
    {
      title: 'Hourly & Full-Day',
      description: 'Flexible hourly and full-day chauffeur services.',
      icon: Clock,
      features: ['Flexible rates', 'Full-day packages', 'Custom itineraries', 'Multi-stop journeys']
    }
  ]

  const whyChooseUs = [
    {
      icon: Shield,
      title: 'Professional Drivers',
      description: 'Fully licensed, experienced, and customer-focused chauffeurs'
    },
    {
      icon: Car,
      title: 'Luxury Fleet',
      description: 'Premium vehicles maintained to the highest standards'
    },
    {
      icon: Clock,
      title: 'Punctual Service',
      description: 'On-time guarantee with flight monitoring for airport transfers'
    },
    {
      icon: Users,
      title: 'Customer Focus',
      description: 'Personalized service tailored to your specific needs'
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
              Professional chauffeur-driven transportation services across the UK
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
            <h2 className="text-4xl font-bold text-jet2-dark mb-4">Our Chauffeur Services</h2>
            <p className="text-xl text-jet2-gray max-w-3xl mx-auto">
              Comprehensive transportation solutions for every occasion
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div 
                  key={index} 
                  ref={setServiceRef(index)}
                  className={`group card-hover bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 ${
                    visibleServices[index] ? 'animate-scale-in' : 'opacity-0 scale-75'
                  }`}
                >
                  <div className="p-8">
                    <div className="w-16 h-16 bg-jet2-orange rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
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
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-jet2-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-jet2-dark mb-4">Why Choose Our Chauffeur Services?</h2>
            <p className="text-xl text-jet2-gray max-w-3xl mx-auto">
              Experience the difference with our professional chauffeur services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon
              return (
                <div 
                  key={index} 
                  className="text-center group transition-all duration-500"
                >
                  <div className="w-16 h-16 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-jet2-dark mb-2">{item.title}</h3>
                  <p className="text-jet2-gray">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-jet2-dark mb-4">Our Luxury Fleet</h2>
            <p className="text-xl text-jet2-gray max-w-3xl mx-auto">
              Choose from our selection of premium vehicles
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-jet2-dark mb-2">Mercedes E-Class</h3>
              <p className="text-jet2-gray mb-4">Business Class - Perfect for corporate travel</p>
              <div className="text-2xl font-bold text-jet2-orange">From £85</div>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-jet2-dark mb-2">Range Rover SUV</h3>
              <p className="text-jet2-gray mb-4">Luxury SUV - Spacious and versatile</p>
              <div className="text-2xl font-bold text-jet2-orange">From £120</div>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-jet2-dark mb-2">Mercedes S-Class</h3>
              <p className="text-jet2-gray mb-4">First Class - Ultimate luxury experience</p>
              <div className="text-2xl font-bold text-jet2-orange">From £150</div>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Areas */}
      <section className="py-20 bg-jet2-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-jet2-dark mb-4">Coverage Areas</h2>
            <p className="text-xl text-jet2-gray max-w-3xl mx-auto">
              We provide chauffeur services across major UK cities and airports
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold text-jet2-dark mb-4">Major Cities</h3>
              <div className="grid grid-cols-2 gap-3">
                {['London', 'Birmingham', 'Manchester', 'Leeds', 'Bristol', 'Sheffield', 'Nottingham', 'Leicester'].map((city, index) => (
                  <div key={index} className="flex items-center text-jet2-gray">
                    <MapPin className="h-4 w-4 text-jet2-orange mr-2" />
                    <span>{city}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold text-jet2-dark mb-4">Airports</h3>
              <div className="grid grid-cols-2 gap-3">
                {['Heathrow', 'Gatwick', 'Manchester', 'Birmingham', 'Stansted', 'Luton', 'East Midlands', 'London City'].map((airport, index) => (
                  <div key={index} className="flex items-center text-jet2-gray">
                    <Plane className="h-4 w-4 text-jet2-orange mr-2" />
                    <span>{airport}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Book Your Chauffeur Service?</h2>
          <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Experience luxury transportation with our professional chauffeur services
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