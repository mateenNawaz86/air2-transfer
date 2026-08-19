'use client'

import { useState } from 'react'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  MessageSquare,
  Send,
  CheckCircle
} from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Contact form submitted:', formData)
    setIsSubmitted(true)
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '01213141080',
      subtitle: 'Available 24/7'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'info@air2transport.com',
      subtitle: 'Quick response guaranteed'
    },
    {
      icon: MapPin,
      title: 'Service Area',
      details: 'All UK Locations',
      subtitle: 'London, Birmingham, Manchester & more'
    },
    {
      icon: Clock,
      title: 'Operating Hours',
      details: '24/7 Service',
      subtitle: 'Available round the clock'
    }
  ]

  const services = [
    'Airport Transfers',
    'Corporate Travel',
    'Event Transportation',
    'Intercity Travel',
    'Wedding Transfers',
    'Hourly & Full-Day Hire'
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-jet2-dark to-jet2-orange">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl text-white opacity-90 max-w-3xl mx-auto">
            Get in touch with us for any questions or booking inquiries
          </p>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-jet2-dark mb-4">Get In Touch</h2>
            <p className="text-xl text-jet2-gray max-w-3xl mx-auto">
              We're here to help with all your transportation needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-jet2-orange rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-jet2-dark mb-2">{info.title}</h3>
                  <p className="text-jet2-gray font-medium mb-1">{info.details}</p>
                  <p className="text-sm text-jet2-gray">{info.subtitle}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-jet2-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-jet2-dark mb-6">Send Us a Message</h2>
              
              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-green-700">Thank you! Your message has been sent successfully. We'll get back to you soon.</span>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-jet2-dark mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-jet2-dark mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-jet2-dark mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-jet2-dark mb-2">Subject</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="booking-inquiry">Booking Inquiry</option>
                      <option value="quote-request">Quote Request</option>
                      <option value="general-inquiry">General Inquiry</option>
                      <option value="complaint">Complaint</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-jet2-dark mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                    placeholder="Tell us about your transportation needs..."
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="btn-primary w-full py-4 inline-flex items-center justify-center"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-jet2-dark mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-jet2-orange mr-3 mt-1" />
                    <div>
                      <p className="font-semibold text-jet2-dark">Phone</p>
                      <p className="text-jet2-gray">01213141080</p>
                      <p className="text-sm text-jet2-gray">Available 24/7</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-jet2-orange mr-3 mt-1" />
                    <div>
                      <p className="font-semibold text-jet2-dark">Email</p>
                      <p className="text-jet2-gray">info@air2transport.com</p>
                      <p className="text-sm text-jet2-gray">Quick response guaranteed</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-jet2-orange mr-3 mt-1" />
                    <div>
                      <p className="font-semibold text-jet2-dark">Service Area</p>
                      <p className="text-jet2-gray">All UK Locations</p>
                      <p className="text-sm text-jet2-gray">London, Birmingham, Manchester & more</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-6 w-6 text-jet2-orange mr-3 mt-1" />
                    <div>
                      <p className="font-semibold text-jet2-dark">Operating Hours</p>
                      <p className="text-jet2-gray">24/7 Service</p>
                      <p className="text-sm text-jet2-gray">Available round the clock</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-jet2-dark mb-4">Our Services</h3>
                <div className="grid grid-cols-1 gap-2">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center text-jet2-gray">
                      <CheckCircle className="h-4 w-4 text-jet2-orange mr-2" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-jet2-orange rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Need Immediate Assistance?</h3>
                <p className="mb-4">For urgent bookings or immediate assistance, call us directly:</p>
                <div className="text-2xl font-bold">01213141080</div>
                <p className="text-sm opacity-90">Available 24/7 for your convenience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-jet2-dark mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-jet2-gray">Find answers to common questions about our services</p>
          </div>
          
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-jet2-dark mb-2">How far in advance should I book?</h3>
              <p className="text-jet2-gray">We recommend booking at least 24 hours in advance for airport transfers and 48 hours for special events. However, we can accommodate last-minute bookings subject to availability.</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-jet2-dark mb-2">What happens if my flight is delayed?</h3>
              <p className="text-jet2-gray">We monitor all flights and will adjust pickup times accordingly. There's no additional charge for reasonable delays, and we provide 60 minutes of complimentary waiting time.</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-jet2-dark mb-2">Do you provide child seats?</h3>
              <p className="text-jet2-gray">Yes, we can provide child seats upon request. Please let us know the age and weight of your child when booking so we can provide the appropriate seat.</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-jet2-dark mb-2">What payment methods do you accept?</h3>
              <p className="text-jet2-gray">We accept all major credit cards, debit cards, and cash payments. Corporate accounts can be set up for regular clients with monthly invoicing.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 