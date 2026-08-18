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

export default function ChauffeursNeededPage() {
  const heroAnimation = useScrollAnimation()
  const requirementsAnimation = useScrollAnimation()

  const requirements = [
    {
      title: 'Professional License',
      description: 'Valid UK driving license with PCO or equivalent qualification.',
      icon: <Award className="h-8 w-8" />
    },
    {
      title: 'Experience',
      description: 'Minimum 2 years of professional driving experience.',
      icon: <Users className="h-8 w-8" />
    },
    {
      title: 'Customer Service',
      description: 'Excellent customer service and communication skills.',
      icon: <Star className="h-8 w-8" />
    },
    {
      title: 'Reliability',
      description: 'Punctual, reliable, and professional attitude.',
      icon: <Clock className="h-8 w-8" />
    }
  ]

  const benefits = [
    {
      title: 'Competitive Pay',
      description: 'Attractive salary with performance bonuses.',
      icon: <Award className="h-8 w-8" />
    },
    {
      title: 'Flexible Hours',
      description: 'Flexible working hours to suit your lifestyle.',
      icon: <Clock className="h-8 w-8" />
    },
    {
      title: 'Professional Fleet',
      description: 'Drive luxury Mercedes vehicles maintained to high standards.',
      icon: <Car className="h-8 w-8" />
    },
    {
      title: 'Career Growth',
      description: 'Opportunities for career advancement and development.',
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
              Chauffeurs Needed
            </h1>
            <p className="text-xl md:text-2xl text-white opacity-90 max-w-3xl mx-auto">
              Join our professional team of chauffeurs and drive luxury vehicles
            </p>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={requirementsAnimation.elementRef}
            className={`text-center mb-16 ${
              requirementsAnimation.isVisible ? 'animate-on-scroll animate-visible' : 'animate-on-scroll'
            }`}
          >
            <h2 className="text-4xl font-bold text-jet2-dark mb-4">Requirements</h2>
            <p className="text-xl text-jet2-gray max-w-3xl mx-auto">
              What we look for in our professional chauffeurs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {requirements.map((requirement, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-white">
                    {requirement.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-jet2-dark mb-2">{requirement.title}</h3>
                <p className="text-jet2-gray">{requirement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-jet2-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-jet2-dark mb-4">Benefits</h2>
            <p className="text-xl text-jet2-gray max-w-3xl mx-auto">
              Why join our professional chauffeur team
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

      {/* Application Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-jet2-dark mb-4">How to Apply</h2>
            <p className="text-xl text-jet2-gray max-w-3xl mx-auto">
              Join our professional chauffeur team
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-jet2-dark mb-2">Send CV</h3>
              <p className="text-jet2-gray mb-4">Send your CV and cover letter to our HR team</p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-jet2-dark mb-2">Interview</h3>
              <p className="text-jet2-gray mb-4">Attend an interview with our management team</p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-jet2-dark mb-2">Start Driving</h3>
              <p className="text-jet2-gray mb-4">Begin your career as a professional chauffeur</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Join Our Team</h2>
          <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Become part of our professional chauffeur team and drive luxury vehicles
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact-us" className="bg-white text-jet2-orange hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Apply Now
            </Link>
            <Link href="/contact-us" className="border-2 border-white text-white hover:bg-white hover:text-jet2-orange font-semibold py-4 px-8 rounded-lg transition-all duration-300">
              Contact HR
            </Link>
          </div>
          
          <div className="mt-12 flex flex-col sm:flex-row gap-8 justify-center text-white">
            <div className="flex items-center">
              <Phone className="h-5 w-5 mr-2" />
              <span>01213141080</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              <span>hr@jet2transport.com</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 