'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  Car,
  Shield,
  Clock,
  Users,
  Star,
  Phone,
  ArrowRight,
  Zap,
  Heart,
  Mail,
  Navigation,
  Plane,
  Building,
  Calendar,
  CreditCard,
  Headphones,
} from 'lucide-react'
import { useScrollAnimation, useStaggeredScrollAnimation } from '@/hooks/useScrollAnimation'
import { SERVICE_ROUTES } from '@/lib/serviceRoutes'

export default function Home() {
  // Animation hooks
  const aboutAnimation = useScrollAnimation()
  const servicesAnimation = useScrollAnimation()
  const whyChooseAnimation = useScrollAnimation()
  const fleetAnimation = useScrollAnimation()
  const howItWorksAnimation = useScrollAnimation()
  const testimonialsAnimation = useScrollAnimation()
  const citiesAnimation = useScrollAnimation()
  const featuresAnimation = useScrollAnimation()
  const quoteAnimation = useScrollAnimation()
  const ctaAnimation = useScrollAnimation()
  const airportsAnimation = useScrollAnimation()

  // Staggered animations
  const { visibleItems: visibleServices, setRef: setServiceRef } = useStaggeredScrollAnimation(6)
  const { visibleItems: visibleFeatures, setRef: setFeatureRef } = useStaggeredScrollAnimation(4)
  const { visibleItems: visibleFleet, setRef: setFleetRef } = useStaggeredScrollAnimation(6)
  const { visibleItems: visibleTestimonials, setRef: setTestimonialRef } = useStaggeredScrollAnimation(3)
  const { visibleItems: visibleCities, setRef: setCityRef } = useStaggeredScrollAnimation(8)

  const services = [
    {
      title: 'Airport Transfers',
      description: 'On time, every time',
      icon: Plane,
      image: 'https://assetshost.sirv.com/jet2transport/J2T_website_impovements.pdf-image-009.jpg',
      link: SERVICE_ROUTES.airportTransfers
    },
    {
      title: 'Corporate Travel',
      description: 'Professional rides for business minds',
      icon: Building,
      image: 'https://assetshost.sirv.com/jet2transport/J2T_website_impovements.pdf-image-010.jpg',
      link: SERVICE_ROUTES.chauffeurServices
    },
    {
      title: 'Event Transportation',
      description: 'Arrive in style, every occasion',
      icon: Calendar,
      image: 'https://assetshost.sirv.com/jet2transport/J2T_website_impovements.pdf-image-008.jpg',
      link: SERVICE_ROUTES.eventsAndWeddings
    },
    {
      title: 'Intercity Travel',
      description: 'Seamless journeys city to city',
      icon: Navigation,
      image: 'https://assetshost.sirv.com/jet2transport/J2T_website_impovements.pdf-image-007.jpg',
      link: SERVICE_ROUTES.cityToCityTransfers
    },
    {
      title: 'Wedding Transfers',
      description: 'Your perfect ride for the perfect day',
      icon: Heart,
      image: 'https://assetshost.sirv.com/jet2transport/J2T_website_impovements.pdf-image-005.jpg',
      link: SERVICE_ROUTES.eventsAndWeddings
    },
    {
      title: 'Hourly & Full-Day Hire',
      description: 'Your car, your schedule',
      icon: Clock,
      image: 'https://assetshost.sirv.com/jet2transport/J2T_website_impovements.pdf-image-006.png',
      link: SERVICE_ROUTES.chauffeurServices
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Business Executive',
      content: 'Exceptional service! The driver was punctual, professional, and the car was immaculate. Highly recommended for business travel.',
      rating: 5,
      image: 'https://assetshost.sirv.com/jet2transport/testimonial-sarah.jpg'
    },
    {
      name: 'Michael Chen',
      role: 'Wedding Client',
      content: 'Our wedding day was made perfect with Air2Transport. The luxury car and professional service exceeded our expectations.',
      rating: 5,
      image: 'https://assetshost.sirv.com/jet2transport/testimonial-michael.jpg'
    },
    {
      name: 'Emma Thompson',
      role: 'Frequent Traveler',
      content: 'Reliable, comfortable, and always on time. Air2Transport is my go-to choice for airport transfers.',
      rating: 5,
      image: 'https://assetshost.sirv.com/jet2transport/testimonial-emma.jpg'
    }
  ]

  const whyChooseUs = [
    {
      icon: Shield,
      title: 'Professional Drivers',
      description: 'Trained, licensed & reliable Drivers'
    },
    {
      icon: Car,
      title: 'Safe & Secure',
      description: 'Modern, comfortable & well-maintained vehicles'
    },
    {
      icon: Users,
      title: 'Trusted Nationwide',
      description: 'Thousands of satisfied customers nationwide'
    },
    {
      icon: Zap,
      title: 'Tailored Service',
      description: 'Your journey, your way'
    }
  ]

  const fleetVehicles = [
    {
      name: 'Economy Student',
      category: 'Economy',
      passengers: 4,
      luggage: 2,
      image: 'https://assetshost.sirv.com/jet2transport/2025_toyota_prius_xle-awd_001_0218.png'
    },
    {
      name: 'Comfort',
      category: 'Comfort',
      passengers: 4,
      luggage: 2,
      image: 'https://assetshost.sirv.com/jet2transport/Mercedes%20C-Class.png'
    },
    {
      name: 'Executive',
      category: 'Executive',
      passengers: 4,
      luggage: 2,
      image: 'https://assetshost.sirv.com/jet2transport/Mercedes%20S-Class.png'
    },
    {
      name: 'Executive Business',
      category: 'Executive Business',
      passengers: 4,
      luggage: 2,
      image: 'https://assetshost.sirv.com/jet2transport/BMW%207%20Series.png'
    },
    {
      name: 'XL',
      category: 'XL',
      passengers: 6,
      luggage: 4,
      image: 'https://assetshost.sirv.com/jet2transport/Mercedes%20Vito.png'
    },
    {
      name: 'Executive Business XL',
      category: 'Executive Business XL',
      passengers: 8,
      luggage: 6,
      image: 'https://assetshost.sirv.com/jet2transport/Mercedes%20Sprinter.png'
    }
  ]

  // Every airport below has a dedicated, indexable page at /airport-transfers/[slug]
  const airports = [
    { name: 'Heathrow Airport', slug: 'heathrow' },
    { name: 'Gatwick Airport', slug: 'gatwick' },
    { name: 'Manchester Airport', slug: 'manchester' },
    { name: 'Birmingham Airport', slug: 'birmingham' },
    { name: 'Stansted Airport', slug: 'stansted' },
    { name: 'Luton Airport', slug: 'luton' },
    { name: 'East Midlands Airport', slug: 'east-midlands' },
    { name: 'London City Airport', slug: 'london-city' }
  ]

  // slug is null where there is no dedicated city page yet - those cards link to the cities hub instead of a 404
  const cities = [
    {
      name: 'London',
      slug: 'london',
      image: 'https://assetshost.sirv.com/jet2transport/city-london.jpg'
    },
    {
      name: 'Birmingham',
      slug: 'birmingham',
      image: 'https://assetshost.sirv.com/jet2transport/city-birmingham.jpg'
    },
    {
      name: 'Manchester',
      slug: 'manchester',
      image: 'https://assetshost.sirv.com/jet2transport/city-manchester.jpg'
    },
    {
      name: 'Leeds',
      slug: 'leeds',
      image: 'https://assetshost.sirv.com/jet2transport/city-leeds.jpg'
    },
    {
      name: 'Bristol',
      slug: null,
      image: 'https://assetshost.sirv.com/jet2transport/city-bristol.jpg'
    },
    {
      name: 'Sheffield',
      slug: 'sheffield',
      image: 'https://assetshost.sirv.com/jet2transport/city-sheffield.jpg'
    },
    {
      name: 'Nottingham',
      slug: 'nottingham',
      image: 'https://assetshost.sirv.com/jet2transport/city-nottingham.jpg'
    },
    {
      name: 'Leicester',
      slug: null,
      image: 'https://assetshost.sirv.com/jet2transport/city-leicester.jpg'
    }
  ]

  const features = [
    {
      icon: Plane,
      title: 'Flight Monitoring',
      description: 'Real-time flight tracking for perfect timing'
    },
    {
      icon: Navigation,
      title: 'Full GPS Tracking',
      description: 'Track your vehicle in real-time'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock customer assistance'
    },
    {
      icon: Users,
      title: 'Meet and Greet',
      description: 'Professional meet and greet service'
    },
    {
      icon: CreditCard,
      title: 'Fixed Rates',
      description: 'No hidden charges or surge pricing'
    },
    {
      icon: Clock,
      title: '60 Min Waiting Time',
      description: 'Complimentary waiting time included'
    }
  ]

  const howItWorks = [
    {
      icon: Calendar,
      title: 'Get an Instant Quote',
      description: 'Enter your pickup, drop-off, date and time to see a fixed price in seconds.'
    },
    {
      icon: CreditCard,
      title: 'Confirm Your Booking',
      description: 'Complete your booking and receive an instant email confirmation with your trip details.'
    },
    {
      icon: Users,
      title: 'Meet Your Driver',
      description: 'Your licensed, professional driver arrives on time and meets you as arranged.'
    },
    {
      icon: Car,
      title: 'Arrive Relaxed',
      description: 'Sit back and enjoy a comfortable journey at the fixed price you were quoted.'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative isolate flex items-center overflow-hidden py-24 sm:py-28 lg:h-screen lg:py-0">
        {/* Background Image covering entire section */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://assetshost.sirv.com/jet2transport/1.jpg"
            alt="Luxury transfer service"
            fill
            className="object-cover animate-scale-in"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent lg:from-black/40 lg:via-black/20"></div>
        </div>

        {/* Content - shares the same site container/margins as every section below */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left text-white max-w-lg">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-slide-in-left">
              Your Trusted Partner
              <span className="block gradient-text animate-slide-in-left animate-delay-200">for Transfer Services</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-8 opacity-90 animate-slide-in-left animate-delay-400">
              Birmingham • London • Manchester
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-in-left animate-delay-600">
              <Link href="/bookings/new/" className="btn-primary text-lg px-8 py-4 w-fit animate-pulse hover:animate-none">
                BOOK NOW
              </Link>
              <Link href="/contact" className="btn-secondary text-lg px-8 py-4 w-fit hover:animate-glow">
                Get A Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - general trust signals, shown right after the hero */}
      <section className="relative z-10 py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={whyChooseAnimation.elementRef}
            className={`text-center mb-16 ${
              whyChooseAnimation.isVisible ? 'animate-on-scroll animate-visible' : 'animate-on-scroll'
            }`}
          >
            <h2 className="text-4xl font-bold text-jet2-dark mb-4 animate-slide-down">Why Choose Air2Transport?</h2>
            <p className="text-xl text-jet2-gray max-w-3xl mx-auto animate-fade-in animate-delay-200">
              Choosing Air2Transport guarantees an exceptional travel experience from start to finish
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  ref={setFeatureRef(index)}
                  className={`text-center group transition-all duration-500 ${
                    visibleFeatures[index] ? 'animate-bounce-in' : 'opacity-0 scale-75'
                  }`}
                >
                  <div className="w-16 h-16 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 animate-rotate-in">
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

      {/* Top-Rated Service Section */}
      <section className="relative z-10 py-20 bg-jet2-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={aboutAnimation.elementRef}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className={`transition-all duration-1200 ${
              aboutAnimation.isVisible ? 'opacity-100' : 'opacity-0 -translate-x-8'
            }`}>
              <h2 className="text-4xl font-bold text-jet2-dark mb-6">
                Your Go-To Choice for Transfers Across the UK
              </h2>
              <p className="text-lg text-jet2-gray mb-6 leading-relaxed">
                At Air2Transport, we provide reliable private hire services tailored to every type of journey. From airport transfers and city travel to school runs and corporate accounts, our team is here to keep you moving safely and on time
              </p>
              <p className="text-lg text-jet2-gray mb-8 leading-relaxed">
                Our licensed drivers, modern vehicles, and 24/7 availability make us the trusted choice for individuals, families, businesses, and local authorities nationwide. Whether it’s a one-off trip or ongoing contract work, we deliver transport solutions you can depend on
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/bookings/new/" className="btn-primary hover:animate-pulse">
                  Book Your Ride
                </Link>
                <div className="flex items-center text-jet2-orange font-semibold animate-float">
                  <Phone className="h-5 w-5 mr-2" />
                  <span>01213141080</span>
                </div>
              </div>
            </div>
            <div className={`relative h-96 rounded-2xl overflow-hidden shadow-lg transition-all duration-1200 delay-300 ${
              aboutAnimation.isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'
            }`}>
              <img
                src="https://assetshost.sirv.com/jet2transport/3.jpg"
                alt="Executive car transfer service"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative z-10 py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={servicesAnimation.elementRef}
            className={`text-center mb-16 ${
              servicesAnimation.isVisible ? 'animate-on-scroll animate-visible' : 'animate-on-scroll'
            }`}
          >
            <h2 className="text-4xl font-bold text-jet2-dark mb-4 animate-slide-down">Our Services</h2>
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
                  <div className="relative h-48">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
                    <div className="absolute top-4 left-4 w-12 h-12 bg-jet2-orange rounded-full flex items-center justify-center animate-bounce-in">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-jet2-dark mb-2">{service.title}</h3>
                    <p className="text-jet2-gray mb-4">{service.description}</p>
                    <Link
                      href={service.link}
                      className="text-jet2-orange font-medium hover:text-orange-600 transition-colors inline-flex items-center hover:animate-pulse"
                    >
                      Learn More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/services" className="btn-secondary inline-flex items-center animate-float">
              More Services <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Airport Transfers Section - heading plus genuinely linked airport destinations */}
      <section className="relative z-10 py-20 bg-jet2-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={airportsAnimation.elementRef}
            className={`text-center mb-16 transition-all duration-1200 ${
              airportsAnimation.isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-4xl font-bold text-jet2-dark mb-4">Airport Transfers Across the UK</h2>
            <p className="text-xl text-jet2-gray max-w-3xl mx-auto">
              Pre-book private transfers to and from major UK airports, with flight monitoring and clear pricing before you travel
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {airports.map((airport, index) => (
              <Link
                key={index}
                href={`/airport-transfers/${airport.slug}/`}
                className={`group block text-center bg-white rounded-xl shadow-md hover:shadow-lg p-6 transition-all duration-300 ${
                  airportsAnimation.isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Plane className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-jet2-dark mb-1">{airport.name}</h3>
                <p className="text-sm text-jet2-gray group-hover:text-jet2-orange transition-colors inline-flex items-center justify-center">
                  View transfers <ArrowRight className="ml-1 h-3 w-3" />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Airport Transfer Benefits */}
      <section className="relative z-10 py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={featuresAnimation.elementRef}
            className={`text-center mb-16 transition-all duration-1200 ${
              featuresAnimation.isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-4xl font-bold text-jet2-dark mb-4">Included with Every Airport Transfer</h2>
            <p className="text-xl text-jet2-gray max-w-3xl mx-auto">
              Every airport transfer comes with these benefits as standard, at no extra cost
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className={`text-center group transition-all duration-1000 ${
                  featuresAnimation.isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'
                }`} style={{transitionDelay: `${index * 0.2}s`}}>
                  <div className="w-16 h-16 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-jet2-dark mb-2">{feature.title}</h3>
                  <p className="text-jet2-gray">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section className="relative z-10 py-20 bg-jet2-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={fleetAnimation.elementRef}
            className={`text-center mb-16 ${
              fleetAnimation.isVisible ? 'animate-on-scroll animate-visible' : 'animate-on-scroll'
            }`}
          >
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
      </section>

      {/* How Booking Works */}
      <section className="relative z-10 py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={howItWorksAnimation.elementRef}
            className={`text-center mb-16 transition-all duration-1200 ${
              howItWorksAnimation.isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-4xl font-bold text-jet2-dark mb-4">How Booking Works</h2>
            <p className="text-xl text-jet2-gray max-w-3xl mx-auto">
              From quote to arrival in four simple steps
            </p>
          </div>

          <div className="relative">
            {/* Connecting thread - desktop only, sits behind the step icons */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-jet2-orange/0 via-jet2-orange/30 to-jet2-orange/0"
            />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 lg:gap-8">
              {howItWorks.map((step, index) => {
                const Icon = step.icon
                const isFirst = index === 0
                return (
                  <div key={index} className={`relative z-10 text-center group transition-all duration-1000 ${
                    howItWorksAnimation.isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'
                  }`} style={{transitionDelay: `${index * 0.2}s`}}>
                    <div
                      className={`relative w-16 h-16 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 ${
                        isFirst ? 'ring-4 ring-jet2-orange/25 ring-offset-4 ring-offset-white' : ''
                      }`}
                    >
                      <Icon className={`text-white ${isFirst ? 'h-9 w-9' : 'h-8 w-8'}`} />
                    </div>
                    <span className={`block text-xs font-bold uppercase tracking-wider mb-1 ${
                      isFirst ? 'text-jet2-orange' : 'text-jet2-gray'
                    }`}>
                      Step {index + 1}{isFirst ? ' · Start Here' : ''}
                    </span>
                    <h3 className={`text-lg lg:text-xl text-jet2-dark mb-2 ${isFirst ? 'font-bold' : 'font-semibold'}`}>
                      {step.title}
                    </h3>
                    <p className="text-sm lg:text-base text-jet2-gray">{step.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - genuine customer reviews */}
      <section className="relative z-10 py-20 bg-jet2-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={testimonialsAnimation.elementRef}
            className={`text-center mb-16 ${
              testimonialsAnimation.isVisible ? 'animate-on-scroll animate-visible' : 'animate-on-scroll'
            }`}
          >
            <h2 className="text-4xl font-bold text-jet2-dark mb-4 animate-slide-down">What Our Customers Say About Us!</h2>
            <div className="flex items-center justify-center mb-4 animate-bounce-in animate-delay-200">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current animate-rotate-in" style={{animationDelay: `${i * 0.1}s`}} />
                ))}
              </div>
              <span className="ml-2 text-xl font-bold text-jet2-dark">EXCELLENT</span>
            </div>
            <p className="text-lg text-jet2-gray animate-fade-in animate-delay-400">Based on reviews from our customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                ref={setTestimonialRef(index)}
                className={`bg-white rounded-xl shadow-lg p-8 card-hover transition-all duration-500 ${
                  visibleTestimonials[index] ? 'animate-scale-in' : 'opacity-0 scale-75'
                }`}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current animate-bounce-in" style={{animationDelay: `${i * 0.1}s`}} />
                  ))}
                </div>
                <p className="text-jet2-gray mb-6 italic animate-fade-in animate-delay-200">"{testimonial.content}"</p>
                <div className="flex items-center animate-slide-in-left animate-delay-400">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-jet2-dark">{testimonial.name}</h4>
                    <p className="text-sm text-jet2-gray">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instant Quote Section */}
      <section className="relative z-10 py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={quoteAnimation.elementRef}
            className={`text-center mb-12 transition-all duration-1200 ${
              quoteAnimation.isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-4xl font-bold text-jet2-dark mb-4">Get an Instant Quote</h2>
            <p className="text-xl text-jet2-gray max-w-3xl mx-auto mb-8">
              Have a route in mind? Enter your pickup and drop-off locations to see the price.
            </p>
          </div>

          <div className={`max-w-4xl mx-auto bg-jet2-light rounded-2xl shadow-lg p-8 transition-all duration-1200 delay-300 ${
            quoteAnimation.isVisible ? 'opacity-100' : 'opacity-0 translate-y-8 scale-95'
          }`}>
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className={`transition-all duration-1000 delay-500 ${
                quoteAnimation.isVisible ? 'opacity-100' : 'opacity-0 -translate-x-8'
              }`}>
                <label className="block text-sm font-medium text-jet2-dark mb-2">Pickup Location</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jet2-orange focus:border-transparent transition-all duration-300"
                  placeholder="Enter pickup address"
                />
              </div>
              <div className={`transition-all duration-1000 delay-700 ${
                quoteAnimation.isVisible ? 'opacity-100' : 'opacity-0 -translate-x-8'
              }`}>
                <label className="block text-sm font-medium text-jet2-dark mb-2">Drop-off Location</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jet2-orange focus:border-transparent transition-all duration-300"
                  placeholder="Enter destination"
                />
              </div>
              <div className={`transition-all duration-1000 delay-900 ${
                quoteAnimation.isVisible ? 'opacity-100' : 'opacity-0 translate-x-8'
              }`}>
                <label className="block text-sm font-medium text-jet2-dark mb-2">Date & Time</label>
                <input
                  type="datetime-local"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jet2-orange focus:border-transparent transition-all duration-300"
                />
              </div>
              <div className={`flex items-end transition-all duration-1000 delay-1100 ${
                quoteAnimation.isVisible ? 'opacity-100' : 'opacity-0 translate-x-8'
              }`}>
                <button type="submit" className="btn-primary w-full hover:animate-pulse">
                  Get Quote
                </button>
              </div>
            </form>

            <div className={`mt-8 text-center transition-all duration-1000 delay-1300 ${
              quoteAnimation.isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'
            }`}>
              <p className="text-jet2-gray mb-4">
                Get 10% Discount for advance booking - Use code: <span className="font-bold text-jet2-orange animate-pulse">A2T10</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="flex items-center text-jet2-gray">
                  <Phone className="h-5 w-5 mr-2 text-jet2-orange" />
                  <span>01213141080</span>
                </div>
                <div className="flex items-center text-jet2-gray">
                  <Mail className="h-5 w-5 mr-2 text-jet2-orange" />
                  <span>info@air2transport.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cities / Service Areas Section */}
      <section className="relative z-10 py-20 bg-jet2-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={citiesAnimation.elementRef}
            className={`text-center mb-16 ${
              citiesAnimation.isVisible ? 'animate-on-scroll animate-visible' : 'animate-on-scroll'
            }`}
          >
            <h2 className="text-4xl font-bold text-jet2-dark mb-4 animate-slide-down">Intercity Travel</h2>
            <p className="text-xl text-jet2-gray max-w-3xl mx-auto animate-fade-in animate-delay-200">
              Professional transfer services between major UK cities
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {cities.map((city, index) => (
              <Link
                key={index}
                href={city.slug ? `/cities/${city.slug}/` : '/cities'}
                className="group block text-center"
              >
                <div
                  ref={setCityRef(index)}
                  className={`transition-all duration-500 ${
                    visibleCities[index] ? 'animate-scale-in' : 'opacity-0 scale-75'
                  }`}
                >
                  <div className="city-image-container w-40 h-40 mx-auto mb-3 relative animate-float" style={{animationDelay: `${index * 0.2}s`}}>
                    <Image
                      src={city.image}
                      alt={`${city.name} city skyline`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 160px, 160px"
                      priority={index < 4}
                    />
                    <div className="city-name-overlay absolute inset-0"></div>
                    <div className="absolute bottom-3 left-3 right-3 z-10">
                      <h3 className="text-base font-bold text-white text-center drop-shadow-lg animate-slide-up animate-delay-400">{city.name}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-jet2-gray group-hover:text-jet2-orange transition-colors">
                    Private transfers in {city.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/cities" className="btn-secondary inline-flex items-center hover:scale-105 transition-transform duration-300">
              More Cities <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 gradient-bg">
        <div
          ref={ctaAnimation.elementRef}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1200 ${
            ctaAnimation.isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Book Your Ride?</h2>
          <p className={`text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${
            ctaAnimation.isVisible ? 'opacity-90' : 'opacity-0 translate-y-8'
          }`}>
            Book your ride with Air2Transport and enjoy the flexibility of standard transfers or executive chauffeur services — always reliable, always comfortable
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-600 ${
            ctaAnimation.isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'
          }`}>
            <Link href="/bookings/new/" className="bg-white text-jet2-orange hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Book Your Ride
            </Link>
            <Link href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-jet2-orange font-semibold py-4 px-8 rounded-lg transition-all duration-300">
              Get Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
