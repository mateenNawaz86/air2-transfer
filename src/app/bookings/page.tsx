'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/auth'
import { 
  ArrowLeft,
  Plus,
  MapPin,
  Calendar,
  Clock,
  User,
  Car,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
  AlertCircle
} from 'lucide-react'

export default function BookingsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, pending, completed
  const [updating, setUpdating] = useState<string | null>(null)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [rejectionReason, setRejectionReason] = useState('')

  useEffect(() => {
    checkAuth()
  }, [])

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

      // Fetch bookings based on user role
      if (profile.role === 'client') {
        const { data: bookingsData, error: bookingsError } = await supabase
          .from('bookings')
          .select(`
            *,
            driver:user_profiles!bookings_driver_id_fkey(first_name, last_name, email)
          `)
          .eq('client_id', profile.id)
          .order('created_at', { ascending: false })

        if (bookingsError) {
          console.error('Error fetching bookings:', bookingsError)
        } else {
          setBookings(bookingsData || [])
        }
      } else if (profile.role === 'driver') {
        // Fetch both regular bookings and guest bookings assigned to this driver
        const [regularBookingsResult, guestBookingsResult] = await Promise.all([
          supabase
            .from('bookings')
            .select(`
              *,
              client:user_profiles!bookings_client_id_fkey(first_name, last_name, email)
            `)
            .eq('driver_id', profile.id)
            .order('created_at', { ascending: false }),
          
          supabase
            .from('guest_bookings')
            .select('*')
            .eq('driver_id', profile.id)
            .order('created_at', { ascending: false })
        ])

        // Combine regular bookings with profiles
        const regularBookings = regularBookingsResult.data?.map((booking: any) => ({
          ...booking,
          booking_type: 'regular'
        })) || []

        // Combine guest bookings with client info
        const guestBookings = guestBookingsResult.data?.map((booking: any) => ({
          ...booking,
          booking_type: 'guest',
          client: {
            first_name: booking.customer_name?.split(' ')[0] || '',
            last_name: booking.customer_name?.split(' ').slice(1).join(' ') || '',
            email: booking.customer_email,
            phone: booking.customer_phone
          }
        })) || []

        // Combine and sort all bookings
        const allBookings = [...regularBookings, ...guestBookings]
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

        setBookings(allBookings)
      } else {
        // Admin can see all bookings
        const { data: bookingsData, error: bookingsError } = await supabase
          .from('bookings')
          .select(`
            *,
            client:user_profiles!bookings_client_id_fkey(first_name, last_name, email),
            driver:user_profiles!bookings_driver_id_fkey(first_name, last_name, email)
          `)
          .order('created_at', { ascending: false })

        if (bookingsError) {
          console.error('Error fetching bookings:', bookingsError)
        } else {
          setBookings(bookingsData || [])
        }
      }

      setLoading(false)
    } catch (error) {
      console.error('Error in checkAuth:', error)
      router.push('/login')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'confirmed':
        return 'bg-blue-100 text-blue-800'
      case 'in_progress':
        return 'bg-orange-100 text-orange-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <ClockIcon className="h-4 w-4" />
      case 'confirmed':
        return <CheckCircle className="h-4 w-4" />
      case 'in_progress':
        return <AlertCircle className="h-4 w-4" />
      case 'completed':
        return <CheckCircle className="h-4 w-4" />
      case 'cancelled':
        return <XCircle className="h-4 w-4" />
      default:
        return <ClockIcon className="h-4 w-4" />
    }
  }

  const markBookingComplete = async (bookingId: string, bookingType: string) => {
    setUpdating(bookingId)
    try {
      const supabase = createClient()
      
      // Get booking details before updating
      let bookingData
      if (bookingType === 'guest') {
        const { data } = await supabase
          .from('guest_bookings')
          .select('*')
          .eq('id', bookingId)
          .single()
        bookingData = data
      } else {
        const { data } = await supabase
          .from('bookings')
          .select(`
            *,
            user_profiles!bookings_client_id_fkey (
              email,
              first_name,
              last_name
            )
          `)
          .eq('id', bookingId)
          .single()
        bookingData = data
      }

      if (!bookingData) {
        console.error('Booking not found')
        return
      }

      // Update booking status
      if (bookingType === 'guest') {
        const { error } = await supabase
          .from('guest_bookings')
          .update({ status: 'completed' })
          .eq('id', bookingId)
        
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('bookings')
          .update({ status: 'completed' })
          .eq('id', bookingId)
        
        if (error) throw error
      }

      // Send completion email notification
      await sendBookingCompletionEmail(bookingId, bookingType, bookingData)

      // Refresh bookings
      await checkAuth()
    } catch (error) {
      console.error('Error updating booking:', error)
    } finally {
      setUpdating(null)
    }
  }

  const sendBookingCompletionEmail = async (bookingId: string, bookingType: string, bookingData: any) => {
    try {
      // Get customer details
      const customerEmail = bookingType === 'guest' 
        ? bookingData.customer_email 
        : bookingData.user_profiles?.email
      const customerName = bookingType === 'guest'
        ? bookingData.customer_name
        : `${bookingData.user_profiles?.first_name} ${bookingData.user_profiles?.last_name}`

      if (!customerEmail) return

      // Send completion email notification
      const { sendBookingCompletionEmail } = await import('@/lib/emailService')

      await sendBookingCompletionEmail(
        customerEmail,
        customerName,
        {
          pickupLocation: bookingData.pickup_location,
          dropoffLocation: bookingData.dropoff_location,
          pickupTime: bookingData.pickup_time,
          serviceType: bookingData.service_type || 'Standard',
          price: bookingData.price
        }
      )
    } catch (error) {
      console.error('Error sending completion email:', error)
    }
  }

  const acceptBooking = async (bookingId: string, bookingType: string) => {
    setUpdating(bookingId)
    try {
      const supabase = createClient()
      
      if (bookingType === 'guest') {
        const { error } = await supabase
          .from('guest_bookings')
          .update({ 
            driver_accepted: true,
            driver_accepted_at: new Date().toISOString()
          })
          .eq('id', bookingId)
        
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('bookings')
          .update({ 
            driver_accepted: true,
            driver_accepted_at: new Date().toISOString()
          })
          .eq('id', bookingId)
        
        if (error) throw error
      }
      
      // Send acceptance email notification
      await sendDriverAcceptanceEmail(bookingId, bookingType, true)
      
      // Refresh bookings
      await checkAuth()
    } catch (error) {
      console.error('Error accepting booking:', error)
    } finally {
      setUpdating(null)
    }
  }

  const rejectBooking = async (bookingId: string, bookingType: string, reason: string) => {
    setUpdating(bookingId)
    try {
      const supabase = createClient()
      
      if (bookingType === 'guest') {
        const { error } = await supabase
          .from('guest_bookings')
          .update({ 
            driver_accepted: false,
            driver_accepted_at: new Date().toISOString(),
            driver_rejection_reason: reason
          })
          .eq('id', bookingId)
        
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('bookings')
          .update({ 
            driver_accepted: false,
            driver_accepted_at: new Date().toISOString(),
            driver_rejection_reason: reason
          })
          .eq('id', bookingId)
        
        if (error) throw error
      }
      
      // Send rejection email notification
      await sendDriverAcceptanceEmail(bookingId, bookingType, false, reason)
      
      // Refresh bookings
      await checkAuth()
    } catch (error) {
      console.error('Error rejecting booking:', error)
    } finally {
      setUpdating(null)
    }
  }

  const sendDriverAcceptanceEmail = async (bookingId: string, bookingType: string, accepted: boolean, reason?: string) => {
    try {
      const supabase = createClient()
      
      // Get booking details
      let bookingData
      if (bookingType === 'guest') {
        const { data } = await supabase
          .from('guest_bookings')
          .select('*')
          .eq('id', bookingId)
          .single()
        bookingData = data
      } else {
        const { data } = await supabase
          .from('bookings')
          .select(`
            *,
            user_profiles!bookings_client_id_fkey (
              email,
              first_name,
              last_name
            )
          `)
          .eq('id', bookingId)
          .single()
        bookingData = data
      }

      if (!bookingData) return

      // Get customer details
      const customerEmail = bookingType === 'guest' 
        ? bookingData.customer_email 
        : bookingData.user_profiles?.email
      const customerName = bookingType === 'guest'
        ? bookingData.customer_name
        : `${bookingData.user_profiles?.first_name} ${bookingData.user_profiles?.last_name}`

      if (!customerEmail) return

      // Send email notification
      const { sendDriverAcceptanceEmail } = await import('@/lib/emailService')

      await sendDriverAcceptanceEmail(
        customerEmail,
        customerName,
        {
          pickupLocation: bookingData.pickup_location,
          dropoffLocation: bookingData.dropoff_location,
          pickupTime: bookingData.pickup_time,
          serviceType: bookingData.service_type || 'Standard',
          price: bookingData.price
        },
        accepted,
        reason
      )
    } catch (error) {
      console.error('Error sending driver acceptance email:', error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Filter bookings based on selected filter
  const filteredBookings = bookings.filter((booking: any) => {
    if (filter === 'all') return true
    if (filter === 'pending') return booking.status === 'pending' || booking.status === 'confirmed'
    if (filter === 'completed') return booking.status === 'completed'
    return true
  })

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
            <div className="flex items-center space-x-4">
              {userProfile?.role === 'client' && (
                <Link
                  href="/bookings/new"
                  className="flex items-center space-x-2 px-4 py-2 bg-jet2-orange text-white rounded-md hover:bg-jet2-orange-dark transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>New Booking</span>
                </Link>
              )}
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {userProfile?.first_name} {userProfile?.last_name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {userProfile?.role === 'client' ? 'My Bookings' : 
               userProfile?.role === 'driver' ? 'My Rides' : 'All Bookings'}
            </h1>
            <p className="mt-2 text-gray-600">
              {userProfile?.role === 'client' ? 'View and manage your ride bookings' :
               userProfile?.role === 'driver' ? 'View and manage your assigned rides' :
               'Manage all system bookings'}
            </p>
          </div>

          {/* Filter Tabs - Only for drivers */}
          {userProfile?.role === 'driver' && (
            <div className="mb-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setFilter('all')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      filter === 'all'
                        ? 'border-jet2-orange text-jet2-orange'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    All ({bookings.length})
                  </button>
                  <button
                    onClick={() => setFilter('pending')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      filter === 'pending'
                        ? 'border-jet2-orange text-jet2-orange'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Pending ({bookings.filter((booking: any) => booking.status === 'pending' || booking.status === 'confirmed').length})
                  </button>
                  <button
                    onClick={() => setFilter('completed')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      filter === 'completed'
                        ? 'border-jet2-orange text-jet2-orange'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Completed ({bookings.filter((booking: any) => booking.status === 'completed').length})
                  </button>
                </nav>
              </div>
            </div>
          )}

          {/* Bookings List */}
          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-600 mb-6">
                {userProfile?.role === 'client' ? 'You haven\'t made any bookings yet.' :
                 userProfile?.role === 'driver' ? 'No rides have been assigned to you yet.' :
                 'No bookings exist in the system.'}
              </p>
              {userProfile?.role === 'client' && (
                <Link
                  href="/bookings/new"
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-jet2-orange text-white rounded-md hover:bg-jet2-orange-dark transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Book Your First Ride</span>
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((booking: any) => (
                <div key={booking.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-medium text-gray-900">
                          Booking #{booking.id.slice(0, 8)}
                        </h3>
                        {booking.booking_type === 'guest' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Guest Booking
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        Created on {formatDate(booking.created_at)}
                      </p>
                    </div>
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                      {getStatusIcon(booking.status)}
                      <span className="capitalize">{booking.status.replace('_', ' ')}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Pickup</p>
                        <p className="text-sm text-gray-600">{booking.pickup_location}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Destination</p>
                        <p className="text-sm text-gray-600">{booking.dropoff_location}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Date</p>
                        <p className="text-sm text-gray-600">{formatDate(booking.pickup_time)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Time</p>
                        <p className="text-sm text-gray-600">{formatTime(booking.pickup_time)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Price</p>
                        <p className="text-sm text-gray-600">£{booking.price}</p>
                      </div>
                    </div>
                  </div>

                  {/* User Information */}
                  {userProfile?.role === 'client' && booking.driver && (
                    <div className="border-t pt-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Assigned Driver</p>
                      <p className="text-sm text-gray-600">
                        {booking.driver.first_name} {booking.driver.last_name}
                      </p>
                    </div>
                  )}

                  {userProfile?.role === 'driver' && booking.client && (
                    <div className="border-t pt-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Client</p>
                      <p className="text-sm text-gray-600">
                        {booking.client.first_name} {booking.client.last_name}
                      </p>
                    </div>
                  )}

                  {userProfile?.role === 'admin' && (
                    <div className="border-t pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {booking.client && (
                          <div>
                            <p className="text-sm font-medium text-gray-900 mb-2">Client</p>
                            <p className="text-sm text-gray-600">
                              {booking.client.first_name} {booking.client.last_name}
                            </p>
                          </div>
                        )}
                        {booking.driver && (
                          <div>
                            <p className="text-sm font-medium text-gray-900 mb-2">Driver</p>
                            <p className="text-sm text-gray-600">
                              {booking.driver.first_name} {booking.driver.last_name}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Driver Acceptance Buttons */}
                  {userProfile?.role === 'driver' && booking.driver_id && booking.driver_accepted === null && booking.status !== 'completed' && booking.status !== 'cancelled' && (
                    <div className="border-t pt-4 mt-4">
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => acceptBooking(booking.id, booking.booking_type || 'regular')}
                          disabled={updating === booking.id}
                          className="flex justify-center items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {updating === booking.id ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Processing...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Accept
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => {
                            setSelectedBooking(booking)
                            setShowRejectModal(true)
                          }}
                          disabled={updating === booking.id}
                          className="flex justify-center items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Driver Acceptance Status */}
                  {userProfile?.role === 'driver' && booking.driver_accepted !== null && (
                    <div className="border-t pt-4 mt-4">
                      <div className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                        booking.driver_accepted 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {booking.driver_accepted ? (
                          <>
                            <CheckCircle className="h-4 w-4" />
                            <span>You accepted this booking</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-4 w-4" />
                            <span>You rejected this booking</span>
                            {booking.driver_rejection_reason && (
                              <span className="text-xs">- {booking.driver_rejection_reason}</span>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Mark Complete Button for Drivers */}
                  {userProfile?.role === 'driver' && booking.status !== 'completed' && booking.status !== 'cancelled' && booking.driver_accepted === true && (
                    <div className="border-t pt-4 mt-4">
                      <button
                        onClick={() => markBookingComplete(booking.id, booking.booking_type || 'regular')}
                        disabled={updating === booking.id}
                        className="w-full flex justify-center items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {updating === booking.id ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Updating...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Mark as Complete
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Rejection Modal */}
      {showRejectModal && selectedBooking && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Reject Booking
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Please provide a reason for rejecting this booking:
              </p>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter reason for rejection..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                rows={3}
              />
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={() => {
                    setShowRejectModal(false)
                    setSelectedBooking(null)
                    setRejectionReason('')
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (rejectionReason.trim()) {
                      rejectBooking(selectedBooking.id, selectedBooking.booking_type || 'regular', rejectionReason)
                      setShowRejectModal(false)
                      setSelectedBooking(null)
                      setRejectionReason('')
                    }
                  }}
                  disabled={!rejectionReason.trim()}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reject Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
