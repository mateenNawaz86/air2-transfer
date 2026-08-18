'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/auth'
import { sendBookingConfirmationEmail, sendAdminBookingNotification } from '@/lib/emailService'
import { 
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  User,
  Car,
  AlertCircle,
  CheckCircle,
  Loader2,
  Navigation,
  DollarSign
} from 'lucide-react'
import LocationInput from '@/components/LocationInput'
import RouteMap from '@/components/RouteMap'
import StripePaymentForm from '@/components/StripePaymentForm'
import { SERVICE_TYPES, ServiceType, getDistance, calculatePrice } from '@/lib/googleMaps'

export default function NewBookingPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    pickupTime: '',
    passengers: 1,
    serviceType: 'comfort' as ServiceType,
    specialRequests: '',
    customerName: '',
    customerEmail: '',
    customerPhone: ''
  })

  const [distance, setDistance] = useState<number | null>(null)
  const [duration, setDuration] = useState<number | null>(null)
  const [calculatingDistance, setCalculatingDistance] = useState(false)
  const [price, setPrice] = useState<number | null>(null)
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null)
  const [paymentCompleted, setPaymentCompleted] = useState(false)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const supabase = createClient()
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (user && !error) {
        setIsAuthenticated(true)
        setUser(user)
        
        // Get user profile
        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single()
        
        if (profile && !profileError) {
          setUserProfile(profile)
        }
      } else {
        setIsAuthenticated(false)
      }
      setLoading(false)
    } catch (error) {
      console.error('Error checking auth status:', error)
      setIsAuthenticated(false)
      setLoading(false)
    }
  }


  const checkAuth = async () => {
    try {
      const supabase = createClient()
      
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      
      if (authError || !user) {
        router.push('/login')
        return
      }

      setUser(user)

      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (profileError) {
        router.push('/login')
        return
      }

      setUserProfile(profile)
      setLoading(false)
    } catch (error) {
      console.error('Error in checkAuth:', error)
      router.push('/login')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLocationChange = (field: 'pickupLocation' | 'dropoffLocation', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear any previous error messages when user starts typing
    if (message && messageType === 'error') {
      setMessage('')
    }
  }

  // Calculate distance and price when both locations are provided
  useEffect(() => {
    const calculateDistanceAndPrice = async () => {
      if (formData.pickupLocation && formData.dropoffLocation) {
        setCalculatingDistance(true)
        try {
          const { distance: calculatedDistance, duration: calculatedDuration } = await getDistance(
            formData.pickupLocation,
            formData.dropoffLocation
          )
          
          setDistance(calculatedDistance)
          setDuration(calculatedDuration)
          
          const calculatedPrice = calculatePrice(formData.serviceType, calculatedDistance)
          setPrice(calculatedPrice)
        } catch (error) {
          console.error('Error calculating distance:', error)
          
          // Show user-friendly error message
          const errorMessage = error instanceof Error ? error.message : 'Failed to calculate distance'
          setMessageType('error')
          setMessage(`Distance calculation failed: ${errorMessage}`)
          
          // Set fallback values for demo purposes
          const fallbackDistance = 10 // Assume 10 miles as fallback
          setDistance(fallbackDistance)
          setDuration(20) // Assume 20 minutes as fallback
          const fallbackPrice = calculatePrice(formData.serviceType, fallbackDistance)
          setPrice(fallbackPrice)
        } finally {
          setCalculatingDistance(false)
        }
      } else {
        setDistance(null)
        setDuration(null)
        setPrice(null)
      }
    }

    // Add a small delay to prevent too many API calls
    const timeoutId = setTimeout(() => {
      calculateDistanceAndPrice()
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [formData.pickupLocation, formData.dropoffLocation, formData.serviceType])

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    setPaymentIntentId(paymentIntentId)
    setPaymentCompleted(true)
    
    // Automatically submit the booking after successful payment
    await submitBooking(paymentIntentId)
  }

  const handlePaymentError = (error: string) => {
    setMessageType('error')
    setMessage(`Payment failed: ${error}`)
    setSubmitting(false)
  }

  const submitBooking = async (paymentIntentId: string) => {
    setSubmitting(true)
    setMessage('')

    const supabase = createClient()

    try {
      // Check if user is authenticated
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      
      if (authError || !user) {
        // User is not authenticated - use guest_bookings table
        const { data, error } = await supabase
          .from('guest_bookings')
          .insert([{
            customer_name: formData.customerName,
            customer_email: formData.customerEmail,
            customer_phone: formData.customerPhone,
            pickup_location: formData.pickupLocation,
            dropoff_location: formData.dropoffLocation,
            pickup_time: `${formData.pickupDate}T${formData.pickupTime}`,
            status: 'confirmed',
            price: price || 0,
            service_type: formData.serviceType,
            distance: distance,
            duration: duration,
            passengers: formData.passengers,
            special_requests: formData.specialRequests,
            payment_intent_id: paymentIntentId
          }])
          .select()
          .single()

        if (error) throw error

        // Send booking confirmation email to customer
        try {
          const emailResult = await sendBookingConfirmationEmail(
            formData.customerEmail,
            formData.customerName,
            {
              pickupLocation: formData.pickupLocation,
              dropoffLocation: formData.dropoffLocation,
              pickupTime: `${formData.pickupDate}T${formData.pickupTime}`,
              serviceType: formData.serviceType,
              price: price || 0,
              status: 'pending'
            }
          )
          
          if (!emailResult.success) {
            console.warn('Email sending failed, but booking was created successfully')
          }
        } catch (emailError) {
          console.error('Error sending booking email:', emailError)
          // Don't fail the booking if email fails
        }

        // Send admin notification email
        try {
          await sendAdminBookingNotification({
            bookingId: data.id,
            customerName: formData.customerName,
            customerEmail: formData.customerEmail,
            customerPhone: formData.customerPhone,
            pickupLocation: formData.pickupLocation,
            dropoffLocation: formData.dropoffLocation,
            pickupTime: `${formData.pickupDate}T${formData.pickupTime}`,
            serviceType: formData.serviceType,
            price: price || 0,
            passengers: formData.passengers,
            specialRequests: formData.specialRequests,
            distance: distance,
            duration: duration,
            paymentIntentId: paymentIntentId,
            bookingType: 'guest'
          })
        } catch (adminEmailError) {
          console.error('Error sending admin notification email:', adminEmailError)
          // Don't fail the booking if admin email fails
        }

        setMessageType('success')
        setMessage('Payment successful! Your booking has been confirmed.')
        
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' })
        
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            pickupLocation: '',
            dropoffLocation: '',
            pickupDate: '',
            pickupTime: '',
            passengers: 1,
            serviceType: 'comfort' as ServiceType,
            specialRequests: '',
            customerName: '',
            customerEmail: '',
            customerPhone: ''
          })
          setDistance(null)
          setDuration(null)
          setPrice(null)
          setPaymentIntentId(null)
          setPaymentCompleted(false)
        }, 3000)
      } else {
        // User is authenticated - use regular bookings table
        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (profileError) throw profileError

        const { data, error } = await supabase
          .from('bookings')
          .insert([{
            client_id: profile.id,
            pickup_location: formData.pickupLocation,
            dropoff_location: formData.dropoffLocation,
            pickup_time: `${formData.pickupDate}T${formData.pickupTime}`,
            status: 'confirmed',
            price: price || 0,
            service_type: formData.serviceType,
            distance: distance,
            duration: duration,
            passengers: formData.passengers,
            special_requests: formData.specialRequests,
            payment_intent_id: paymentIntentId
          }])
          .select()
          .single()

        if (error) throw error

        // Send booking confirmation email to customer
        try {
          const emailResult = await sendBookingConfirmationEmail(
            profile.email,
            `${profile.first_name} ${profile.last_name}`,
            {
              pickupLocation: formData.pickupLocation,
              dropoffLocation: formData.dropoffLocation,
              pickupTime: `${formData.pickupDate}T${formData.pickupTime}`,
              serviceType: formData.serviceType,
              price: price || 0,
              status: 'pending'
            }
          )
          
          if (!emailResult.success) {
            console.warn('Email sending failed, but booking was created successfully')
          }
        } catch (emailError) {
          console.error('Error sending booking email:', emailError)
          // Don't fail the booking if email fails
        }

        // Send admin notification email
        try {
          await sendAdminBookingNotification({
            bookingId: data.id,
            customerName: `${profile.first_name} ${profile.last_name}`,
            customerEmail: profile.email,
            customerPhone: profile.phone,
            pickupLocation: formData.pickupLocation,
            dropoffLocation: formData.dropoffLocation,
            pickupTime: `${formData.pickupDate}T${formData.pickupTime}`,
            serviceType: formData.serviceType,
            price: price || 0,
            passengers: formData.passengers,
            specialRequests: formData.specialRequests,
            distance: distance,
            duration: duration,
            paymentIntentId: paymentIntentId,
            bookingType: 'authenticated'
          })
        } catch (adminEmailError) {
          console.error('Error sending admin notification email:', adminEmailError)
          // Don't fail the booking if admin email fails
        }

        setMessageType('success')
        setMessage('Payment successful! Your booking has been confirmed.')
        
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' })
        
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            pickupLocation: '',
            dropoffLocation: '',
            pickupDate: '',
            pickupTime: '',
            passengers: 1,
            serviceType: 'comfort' as ServiceType,
            specialRequests: '',
            customerName: '',
            customerEmail: '',
            customerPhone: ''
          })
          setDistance(null)
          setDuration(null)
          setPrice(null)
          setPaymentIntentId(null)
          setPaymentCompleted(false)
        }, 3000)
      }
    } catch (error) {
      setMessageType('error')
      setMessage(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setSubmitting(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    if (!formData.pickupLocation || !formData.dropoffLocation || !formData.pickupDate || !formData.pickupTime) {
      setMessageType('error')
      setMessage('Please fill in all required fields')
      return
    }

    if (!price || price <= 0) {
      setMessageType('error')
      setMessage('Please wait for price calculation to complete')
      return
    }

    // Payment will be handled by StripePaymentForm component
    // The form submission is now handled after payment success
  }



  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-jet2-orange mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Dashboard</span>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">
                {userProfile?.first_name} {userProfile?.last_name}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Book a Ride</h1>
            <p className="mt-2 text-gray-600">Schedule your journey with our professional chauffeurs</p>
          </div>

          {/* Message */}
          {message && (
            <div className={`p-4 rounded-lg mb-6 ${
              messageType === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-800' 
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              <div className="flex items-center">
                {messageType === 'success' ? (
                  <CheckCircle className="h-5 w-5 mr-2" />
                ) : (
                  <AlertCircle className="h-5 w-5 mr-2" />
                )}
                {message}
              </div>
            </div>
          )}


          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6" style={{ position: 'relative' }}>
                <div className="space-y-6">
                  {/* Pickup Location */}
                  <LocationInput
                    value={formData.pickupLocation}
                    onChange={(value) => handleLocationChange('pickupLocation', value)}
                    placeholder="Enter pickup address"
                    label="Pickup Location"
                    required
                  />

                  {/* Dropoff Location */}
                  <LocationInput
                    value={formData.dropoffLocation}
                    onChange={(value) => handleLocationChange('dropoffLocation', value)}
                    placeholder="Enter destination address"
                    label="Dropoff Location"
                    required
                  />

                  {/* Date and Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pickup Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          name="pickupDate"
                          value={formData.pickupDate}
                          max="2099-12-31"
                          onChange={handleInputChange}
                          required
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                        />
                        <Calendar className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pickup Time
                      </label>
                      <div className="relative">
                        <input
                          type="time"
                          name="pickupTime"
                          value={formData.pickupTime}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                        />
                        <Clock className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                      </div>
                    </div>
                  </div>

                  {/* Service Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Type
                    </label>
                    <div className="relative">
                      <select
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                      >
                        {Object.entries(SERVICE_TYPES).map(([key, service]) => (
                          <option key={key} value={key}>
                            {service.name} - £{service.pickupFee} pickup + £{service.perMileRate}/mile
                          </option>
                        ))}
                      </select>
                      <Car className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {SERVICE_TYPES[formData.serviceType].description}
                    </p>
                  </div>

                  {/* Passengers */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Passengers
                    </label>
                    <div className="relative">
                      <select
                        name="passengers"
                        value={formData.passengers}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num: number) => (
                          <option key={num} value={num}>{num} {num === 1 ? 'passenger' : 'passengers'}</option>
                        ))}
                      </select>
                      <User className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                      placeholder="Any special requirements or requests..."
                    />
                  </div>

                  {/* Customer Information - Only for non-authenticated users */}
                  {!isAuthenticated && (
                    <div className="border-t pt-6 bg-gray-50 -mx-6 px-6 py-6 rounded-lg">
                      <div className="flex items-center mb-4">
                        <User className="h-5 w-5 text-jet2-orange mr-2" />
                        <h3 className="text-lg font-medium text-gray-900">Your Contact Information</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        Please provide your contact details so we can confirm your booking and reach you if needed.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="customerEmail"
                            value={formData.customerEmail}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                            placeholder="Enter your email"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            name="customerPhone"
                            value={formData.customerPhone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                            placeholder="Enter your phone number"
                          />
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <CheckCircle className="h-5 w-5 text-blue-400" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-blue-700">
                              <strong>Guest Booking:</strong> Your booking will be processed as a guest booking. 
                              We'll contact you to confirm the details and arrange payment.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Payment Section */}
                  {price && price > 0 && (
                    <div className="border-t pt-6 mt-6" style={{ position: 'relative', zIndex: 10 }}>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Payment</h3>
                      {paymentCompleted ? (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                            <span className="text-sm font-medium text-green-800">
                              Payment completed successfully! Processing your booking...
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10 }}>
                          <StripePaymentForm
                            amount={price}
                            onPaymentSuccess={handlePaymentSuccess}
                            onPaymentError={handlePaymentError}
                            disabled={submitting}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Submit Button - Only show if payment is not required or already completed */}
                  {(!price || price <= 0) && (
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-jet2-orange hover:bg-jet2-orange-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jet2-orange disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        'Book Ride'
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Route Map & Price Estimate */}
            <div className="lg:col-span-1">
              {/* Route Map */}
              <div className="bg-white rounded-lg shadow p-6 mb-6 sticky top-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Route Map</h3>
                <RouteMap
                  pickupLocation={formData.pickupLocation}
                  dropoffLocation={formData.dropoffLocation}
                  distance={distance || undefined}
                  duration={duration || undefined}
                />
              </div>

              {/* Price Estimate */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Price Estimate</h3>
                
                {calculatingDistance ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-jet2-orange mr-2" />
                    <span className="text-gray-600">Calculating distance...</span>
                  </div>
                ) : distance !== null ? (
                  <div className="space-y-3">
                    {/* Pricing Breakdown */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Pickup fee</span>
                        <span className="font-medium">£{SERVICE_TYPES[formData.serviceType].pickupFee}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Distance ({distance.toFixed(1)} miles)</span>
                        <span className="font-medium">£{(distance * SERVICE_TYPES[formData.serviceType].perMileRate).toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between">
                          <span className="text-lg font-medium text-gray-900">Total</span>
                          <span className="text-lg font-bold text-jet2-orange">£{price?.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">
                      Enter pickup and dropoff locations to see price estimate
                    </p>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center mb-2">
                    <DollarSign className="h-4 w-4 text-jet2-orange mr-2" />
                    <span className="text-sm font-medium text-gray-700">Service Details</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {SERVICE_TYPES[formData.serviceType].name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    £{SERVICE_TYPES[formData.serviceType].pickupFee} pickup + £{SERVICE_TYPES[formData.serviceType].perMileRate} per mile
                  </p>
                </div>

                <p className="text-sm text-gray-500 mt-4">
                  *Final price may vary based on traffic conditions and route optimization
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
