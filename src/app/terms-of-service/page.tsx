import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
          <p className="text-gray-600 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-6">
              By accessing and using Air2Transport services, you accept and agree to be bound by 
              the terms and provision of this agreement. If you do not agree to abide by the above, 
              please do not use this service.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Service Description</h2>
            <p className="text-gray-700 mb-6">
              Air2Transport provides professional chauffeur and transportation services across the UK. 
              Our services include airport transfers, executive chauffeur services, corporate travel, 
              and special event transportation.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Booking and Cancellation</h2>
            <p className="text-gray-700 mb-6">
              All bookings are subject to availability and confirmation. Cancellations must be made 
              at least 24 hours in advance for a full refund. Cancellations made less than 24 hours 
              in advance may be subject to cancellation fees.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Payment Terms</h2>
            <p className="text-gray-700 mb-6">
              Payment is due at the time of booking unless otherwise arranged. We accept all major 
              credit cards, debit cards, and bank transfers. Prices are subject to change without 
              notice, but confirmed bookings will be honored at the quoted price.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Passenger Responsibilities</h2>
            <p className="text-gray-700 mb-6">
              Passengers are responsible for their own safety and the safety of their belongings. 
              We reserve the right to refuse service to anyone who is intoxicated, abusive, or 
              poses a safety risk to our drivers or other passengers.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitation of Liability</h2>
            <p className="text-gray-700 mb-6">
              Air2Transport's liability is limited to the cost of the service provided. We are not 
              liable for any indirect, incidental, or consequential damages arising from the use of 
              our services.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Force Majeure</h2>
            <p className="text-gray-700 mb-6">
              We shall not be liable for any failure to perform our obligations due to circumstances 
              beyond our reasonable control, including but not limited to acts of God, natural 
              disasters, war, terrorism, or government actions.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Governing Law</h2>
            <p className="text-gray-700 mb-6">
              These terms shall be governed by and construed in accordance with the laws of England 
              and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts 
              of England and Wales.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Information</h2>
            <p className="text-gray-700 mb-6">
              For any questions regarding these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong> info@air2transport.com<br />
                <strong>Phone:</strong> 01213141080<br />
                <strong>Address:</strong> Birmingham, UK
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to Terms</h2>
            <p className="text-gray-700 mb-6">
              We reserve the right to modify these terms at any time. Changes will be effective 
              immediately upon posting on our website. Your continued use of our services 
              constitutes acceptance of the modified terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
