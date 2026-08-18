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

export default function BirminghamChauffeurTourPage() {
  const heroAnimation = useScrollAnimation()
  const toursAnimation = useScrollAnimation()

  const tours = [
    {
      title: 'City Centre Tour',
      description: 'Explore Birmingham\'s vibrant city centre with our guided tour.',
      features: ['Bullring Shopping Centre', 'Birmingham Museum', 'Library of Birmingham', 'Professional guide'],
      duration: '3-4 hours',
      price: 'From £120'
    },
    {
      title: 'Historical Tour',
      description: 'Discover Birmingham\'s rich industrial heritage and history.',
      features: ['Jewellery Quarter', 'Cadbury World', 'Thinktank Museum', 'Historical sites'],
      duration: '4-5 hours',
      price: 'From £150'
    },
    {
      title: 'Cultural Tour',
      description: 'Experience Birmingham\'s diverse cultural attractions and landmarks.',
      features: ['Birmingham Cathedral', 'Art galleries', 'Theatres', 'Cultural districts'],
      duration: '3-4 hours',
      price: 'From £130'
    },
    {
      title: 'Custom Tour',
      description: 'Tailored tour based on your specific interests and preferences.',
      features: ['Personalized route', 'Flexible duration', 'Custom stops', 'Professional guide'],
      duration: 'Variable',
      price: 'From £100'
    }
  ]

  const attractions = [
    'Bullring Shopping Centre',
    'Library of Birmingham',
    'Birmingham Museum & Art Gallery',
    'Jewellery Quarter',
    'Cadbury World',
    'Thinktank Science Museum',
    'Birmingham Cathedral',
    'Birmingham Hippodrome',
    'National SEA LIFE Centre',
    'Birmingham Botanical Gardens'
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
              Birmingham Chauffeur Tour
            </h1>
            <p className="text-xl md:text-2xl text-white opacity-90 max-w-3xl mx-auto">
              Discover Birmingham with our professional guided chauffeur tours
            </p>
          </div>
        </div>
      </section>

      {/* Tours Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={toursAnimation.elementRef}
            className={`text-center mb-16 ${
              toursAnimation.isVisible ? 'animate-on-scroll animate-visible' : 'animate-on-scroll'
            }`}
          >
            <h2 className="text-4xl font-bold text-jet2-dark mb-4">Our Birmingham Tours</h2>
            <p className="text-xl text-jet2-gray max-w-3xl mx-auto">
              Professional guided tours of Birmingham with luxury chauffeur service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tours.map((tour, index) => (
              <div 
                key={index} 
                className="group card-hover bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500"
              >
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-jet2-dark mb-4">{tour.title}</h3>
                  <p className="text-jet2-gray mb-6">{tour.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    {tour.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-jet2-gray">
                        <CheckCircle className="h-4 w-4 text-jet2-orange mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-sm text-jet2-gray">Duration: {tour.duration}</div>
                    <div className="text-2xl font-bold text-jet2-orange">{tour.price}</div>
                  </div>
                  
                  <Link 
                    href="/bookings/new/"
                    className="btn-primary inline-flex items-center w-full justify-center"
                  >
                    Book Tour <ArrowRight className="ml-2 h-4 w-4" />
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
            <h2 className="text-4xl font-bold text-jet2-dark mb-4">Discover Birmingham</h2>
            <p className="text-xl text-jet2-gray max-w-3xl mx-auto">
              England\'s second city with rich history and vibrant culture
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-jet2-dark mb-4">About Birmingham</h3>
              <p className="text-jet2-gray mb-6">
                Birmingham is England\'s second-largest city, known for its rich industrial heritage, 
                diverse culture, and vibrant arts scene. The city is famous for its manufacturing 
                history and has transformed into a modern metropolis.
              </p>
              <p className="text-jet2-gray mb-6">
                Today, Birmingham offers world-class shopping, dining, entertainment, and cultural 
                attractions, making it an ideal destination for visitors and tourists.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-jet2-orange">Industrial</div>
                  <div className="text-sm text-jet2-gray">Heritage</div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-jet2-orange">Cultural</div>
                  <div className="text-sm text-jet2-gray">Diversity</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-jet2-dark mb-4">Popular Attractions</h3>
              <div className="grid grid-cols-1 gap-2">
                {attractions.map((attraction, index) => (
                  <div key={index} className="flex items-center text-jet2-gray">
                    <MapPin className="h-4 w-4 text-jet2-orange mr-2" />
                    <span>{attraction}</span>
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
            <h2 className="text-4xl font-bold text-jet2-dark mb-4">Our Tour Fleet</h2>
            <p className="text-xl text-jet2-gray max-w-3xl mx-auto">
              Choose from our selection of premium vehicles for your Birmingham tour
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-jet2-dark mb-2">Mercedes E-Class</h3>
              <p className="text-jet2-gray mb-4">Business Class - Perfect for city tours</p>
              <div className="text-2xl font-bold text-jet2-orange">From £120</div>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-jet2-dark mb-2">Mercedes V-Class</h3>
              <p className="text-jet2-gray mb-4">People Carrier - Spacious for groups</p>
              <div className="text-2xl font-bold text-jet2-orange">From £150</div>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-jet2-dark mb-2">Mercedes S-Class</h3>
              <p className="text-jet2-gray mb-4">First Class - Ultimate luxury experience</p>
              <div className="text-2xl font-bold text-jet2-orange">From £180</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Book Your Birmingham Tour</h2>
          <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Experience Birmingham with our professional chauffeur tour service
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