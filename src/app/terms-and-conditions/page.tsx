'use client'

import Link from 'next/link'
import { Shield, FileText, AlertTriangle, CheckCircle } from 'lucide-react'

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-jet2-dark to-jet2-orange">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Terms and Conditions
          </h1>
          <p className="text-xl md:text-2xl text-white opacity-90 max-w-3xl mx-auto">
            Our terms of service and booking conditions
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-jet2-dark mb-4">Terms and Conditions</h2>
              <p className="text-jet2-gray mb-4">Last updated: {new Date().toLocaleDateString()}</p>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-jet2-dark mb-4">1. Booking and Reservations</h3>
                <p className="text-jet2-gray mb-4">
                  By making a booking with Air2Transport, you agree to these terms and conditions:
                </p>
                <ul className="list-disc list-inside text-jet2-gray space-y-2 ml-4">
                  <li>All bookings must be confirmed at least 24 hours in advance</li>
                  <li>Full payment is required at the time of booking</li>
                  <li>Booking confirmations will be sent via email</li>
                  <li>Changes to bookings must be made at least 12 hours before travel</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-jet2-dark mb-4">2. Cancellation Policy</h3>
                <p className="text-jet2-gray mb-4">Our cancellation policy is as follows:</p>
                <ul className="list-disc list-inside text-jet2-gray space-y-2 ml-4">
                  <li>Free cancellation up to 24 hours before travel</li>
                  <li>50% refund for cancellations between 12-24 hours before travel</li>
                  <li>No refund for cancellations less than 12 hours before travel</li>
                  <li>Force majeure events may result in full refunds</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-jet2-dark mb-4">3. Service Standards</h3>
                <p className="text-jet2-gray mb-4">We commit to providing:</p>
                <ul className="list-disc list-inside text-jet2-gray space-y-2 ml-4">
                  <li>Professional and courteous service</li>
                  <li>Clean and well-maintained vehicles</li>
                  <li>Punctual arrival times</li>
                  <li>Safe and comfortable journeys</li>
                  <li>Professional drivers with appropriate licenses</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-jet2-dark mb-4">4. Passenger Responsibilities</h3>
                <p className="text-jet2-gray mb-4">Passengers are responsible for:</p>
                <ul className="list-disc list-inside text-jet2-gray space-y-2 ml-4">
                  <li>Providing accurate pickup and destination information</li>
                  <li>Being ready at the agreed pickup time</li>
                  <li>Treating drivers and vehicles with respect</li>
                  <li>Not exceeding the vehicle's passenger capacity</li>
                  <li>Not consuming alcohol or illegal substances in vehicles</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-jet2-dark mb-4">5. Luggage and Baggage</h3>
                <p className="text-jet2-gray mb-4">
                  Luggage allowances and restrictions:
                </p>
                <ul className="list-disc list-inside text-jet2-gray space-y-2 ml-4">
                  <li>Standard luggage allowance applies to all bookings</li>
                  <li>Oversized luggage must be declared in advance</li>
                  <li>We are not responsible for lost or damaged luggage</li>
                  <li>Fragile items should be handled with care</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-jet2-dark mb-4">6. Payment Terms</h3>
                <p className="text-jet2-gray mb-4">Payment terms and conditions:</p>
                <ul className="list-disc list-inside text-jet2-gray space-y-2 ml-4">
                  <li>Full payment required at time of booking</li>
                  <li>We accept major credit cards and bank transfers</li>
                  <li>Corporate accounts may be invoiced monthly</li>
                  <li>All prices include VAT where applicable</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-jet2-dark mb-4">7. Liability and Insurance</h3>
                <p className="text-jet2-gray mb-4">
                  Our liability and insurance coverage:
                </p>
                <ul className="list-disc list-inside text-jet2-gray space-y-2 ml-4">
                  <li>All vehicles are fully insured for passenger transport</li>
                  <li>We maintain appropriate public liability insurance</li>
                  <li>Our liability is limited to the cost of the journey</li>
                  <li>We are not liable for indirect or consequential losses</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-jet2-dark mb-4">8. Force Majeure</h3>
                <p className="text-jet2-gray mb-4">
                  We reserve the right to cancel or modify services due to circumstances beyond our control, including:
                </p>
                <ul className="list-disc list-inside text-jet2-gray space-y-2 ml-4">
                  <li>Severe weather conditions</li>
                  <li>Road closures or traffic incidents</li>
                  <li>Vehicle breakdowns or accidents</li>
                  <li>Government restrictions or regulations</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-jet2-dark mb-4">9. Privacy and Data Protection</h3>
                <p className="text-jet2-gray mb-4">
                  We are committed to protecting your privacy and personal data in accordance with applicable data protection laws.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-jet2-dark mb-4">10. Contact Information</h3>
                <p className="text-jet2-gray mb-4">
                  For questions about these terms and conditions, please contact us:
                </p>
                <div className="bg-jet2-light p-6 rounded-lg">
                  <p className="text-jet2-gray mb-2">Email: info@air2transport.com</p>
                  <p className="text-jet2-gray mb-2">Phone: 01213141080</p>
                  <p className="text-jet2-gray">Address: Birmingham, UK</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-jet2-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-jet2-dark mb-4">Questions About Our Terms?</h2>
          <p className="text-xl text-jet2-gray mb-8 max-w-2xl mx-auto">
            We're here to help clarify any terms or conditions
          </p>
          <Link href="/contact" className="btn-primary inline-flex items-center">
            Contact Us <FileText className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
} 