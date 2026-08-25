'use client'

import Image from 'next/image'
import Link from 'next/link'
import { 
  Heart, 
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
  Calendar,
  Car,
  Camera,
  Gift
} from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function WeddingCarsHirePage() {
  const heroAnimation = useScrollAnimation()
  const servicesAnimation = useScrollAnimation()

  const services = [
    {
      title: 'Bridal Transport',
      description: 'Luxury transportation for the bride and bridal party.',
      features: ['Professional chauffeur', 'Luxury vehicle', 'On-time guarantee', 'Special decoration']
    },
    {
      title: 'Groom Transport',
      description: 'Elegant transportation for the groom and groomsmen.',
      features: ['Professional chauffeur', 'Luxury vehicle', 'On-time guarantee', 'Discreet service']
    },
    {
      title: 'Wedding Guests',
      description: 'Transportation for wedding guests and family members.',
      features: ['Group coordination', 'Luxury vehicles', 'Professional service', 'Flexible scheduling']
    },
    {
      title: 'Wedding Tours',
      description: 'Special wedding day tours and photography opportunities.',
      features: ['Custom itineraries', 'Photo stops', 'Professional service', 'Memorable experience']
    }
  ]

  const packages = [
    {
      title: 'Essential Package',
      description: 'Perfect for intimate weddings',
      price: 'From £200',
      features: ['Bridal transport', 'Professional chauffeur', 'Luxury vehicle', 'Basic decoration']
    },
    {
      title: 'Premium Package',
      description: 'Most popular choice for weddings',
      price: 'From £350',
      features: ['Bridal & groom transport', 'Professional chauffeur', 'Luxury vehicle', 'Full decoration', 'Champagne service']
    },
    {
      title: 'Luxury Package',
      description: 'Ultimate wedding experience',
      price: 'From £500',
      features: ['Full wedding party transport', 'Professional chauffeur', 'Luxury fleet', 'Premium decoration', 'Champagne service', 'Wedding coordinator']
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
              Wedding Cars Hire
            </h1>
            <p className="text-xl md:text-2xl text-white opacity-90 max-w-3xl mx-auto">
              Make your special day perfect with our luxury wedding car service
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
            <h2 className="text-4xl font-bold text-jet2-dark mb-4">Wedding Car Services</h2>
            <p className="text-xl text-jet2-gray max-w-3xl mx-auto">
              Comprehensive wedding transportation solutions for your special day
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

      {/* Packages Section */}
      <section className="py-20 bg-jet2-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-jet2-dark mb-4">Wedding Packages</h2>
            <p className="text-xl text-jet2-gray max-w-3xl mx-auto">
              Choose the perfect package for your wedding day
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl"
              >
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-jet2-dark mb-2">{pkg.title}</h3>
                  <p className="text-jet2-gray mb-4">{pkg.description}</p>
                  <div className="text-3xl font-bold text-jet2-orange mb-6">{pkg.price}</div>
                  
                  <div className="space-y-3 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
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
                    Book Package <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-jet2-dark mb-4">Our Wedding Fleet</h2>
            <p className="text-xl text-jet2-gray max-w-3xl mx-auto">
              Choose from our selection of luxury vehicles for your wedding day
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-jet2-dark mb-2">Mercedes E-Class</h3>
              <p className="text-jet2-gray mb-4">Elegant and sophisticated</p>
              <div className="text-2xl font-bold text-jet2-orange">From £200</div>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-jet2-dark mb-2">Mercedes S-Class</h3>
              <p className="text-jet2-gray mb-4">Ultimate luxury experience</p>
              <div className="text-2xl font-bold text-jet2-orange">From £350</div>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-jet2-dark mb-2">Range Rover SUV</h3>
              <p className="text-jet2-gray mb-4">Spacious and versatile</p>
              <div className="text-2xl font-bold text-jet2-orange">From £300</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-jet2-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-jet2-dark mb-4">Why Choose Our Wedding Service?</h2>
            <p className="text-xl text-jet2-gray max-w-3xl mx-auto">
              Professional wedding transportation with attention to every detail
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-jet2-dark mb-2">Special Day Focus</h3>
              <p className="text-jet2-gray">Dedicated to making your wedding day perfect</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-jet2-dark mb-2">Punctual Service</h3>
              <p className="text-jet2-gray">On-time guarantee for your special day</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-jet2-dark mb-2">Professional Drivers</h3>
              <p className="text-jet2-gray">Experienced and courteous chauffeurs</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-jet2-dark mb-2">Special Touches</h3>
              <p className="text-jet2-gray">Decoration and champagne service included</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Book Your Wedding Car Service</h2>
          <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Make your wedding day transportation perfect with our luxury car service
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