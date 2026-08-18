'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/auth'
import { sendBookingConfirmationEmail, sendDriverAssignmentNotification } from '@/lib/emailService'
import { 
  ArrowLeft,
  Calendar,
  User,
  Car,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Eye,
  X,
  DollarSign,
  Navigation,
  Phone,
  Mail,
  Star,
  XCircle,
  Clock as ClockIcon,
  MessageSquare
} from 'lucide-react'

export default function AdminBookings() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [bookings, setBookings] = useState<any[]>([])
  const [drivers, setDrivers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, assigned, unassigned, completed
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedDriver, setSelectedDriver] = useState('')

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const supabase = createClient()
      
      // Check if user is authenticated
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      
      if (authError || !user) {
        console.log('No authenticated user, redirecting to login')
        router.push('/login')
        return
      }

      setUser(user)

      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (profileError) {
        console.error('Profile error:', profileError)
        router.push('/login')
        return
      }

      setUserProfile(profile)

      // Check if user is admin
      if (profile.role !== 'admin') {
        console.log('User is not admin, redirecting to dashboard')
        router.push('/dashboard')
        return
      }

      // Fetch bookings and drivers
      await Promise.all([fetchBookings(), fetchDrivers()])

      setLoading(false)
    } catch (error) {
      console.error('Error in checkAuth:', error)
      router.push('/login')
    }
  }

  const fetchBookings = async () => {
    try {
      const supabase = createClient()
      
      // Get all regular bookings with user profile data
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select(`
          *,
          user_profiles!bookings_client_id_fkey (
            email,
            first_name,
            last_name
          )
        `)
        .order('created_at', { ascending: false })

      if (bookingsError) {
        console.error('Error fetching bookings:', bookingsError)
        return
      }

      // Get all guest bookings
      const { data: guestBookingsData, error: guestBookingsError } = await supabase
        .from('guest_bookings')
        .select('*')
        .order('created_at', { ascending: false })

      if (guestBookingsError) {
        console.error('Error fetching guest bookings:', guestBookingsError)
        return
      }

      // Get all user profiles for clients and drivers
      const clientIds = bookingsData?.map((booking: any) => booking.client_id).filter(Boolean) || []
      const driverIds = [...bookingsData?.map((booking: any) => booking.driver_id).filter(Boolean) || [], 
                         ...guestBookingsData?.map((booking: any) => booking.driver_id).filter(Boolean) || []]
      const allUserIds = [...new Set([...clientIds, ...driverIds])]

      const { data: profilesData, error: profilesError } = await supabase
        .from('user_profiles')
        .select('id, user_id, first_name, last_name, email, phone')
        .in('id', allUserIds)

      if (profilesError) {
        console.error('Error fetching user profiles:', profilesError)
        return
      }

      // Combine regular bookings with profiles
      const bookingsWithProfiles = bookingsData?.map((booking: any) => ({
        ...booking,
        booking_type: 'regular',
        client: profilesData?.find((profile: any) => profile.id === booking.client_id) || {},
        driver: profilesData?.find((profile: any) => profile.id === booking.driver_id) || null
      })) || []

      // Combine guest bookings with profiles
      const guestBookingsWithProfiles = guestBookingsData?.map((booking: any) => ({
        ...booking,
        booking_type: 'guest',
        client: {
          first_name: booking.customer_name?.split(' ')[0] || '',
          last_name: booking.customer_name?.split(' ').slice(1).join(' ') || '',
          email: booking.customer_email,
          phone: booking.customer_phone
        },
        driver: profilesData?.find((profile: any) => profile.id === booking.driver_id) || null
      })) || []

      // Combine all bookings
      const allBookings = [...bookingsWithProfiles, ...guestBookingsWithProfiles]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

      setBookings(allBookings)
    } catch (error) {
      console.error('Error fetching bookings:', error)
    }
  }

  const fetchDrivers = async () => {
    try {
      const supabase = createClient()
      
      // First get all approved driver applications
      const { data: applications, error: applicationsError } = await supabase
        .from('driver_applications')
        .select('user_id, status')
        .eq('status', 'approved')

      console.log('Approved applications found:', applications)

      if (applicationsError) {
        console.error('Error fetching applications:', applicationsError)
        return
      }

      if (!applications || applications.length === 0) {
        console.log('No approved applications found, showing all drivers')
        // Fallback: show all drivers if no approved applications
        const { data, error } = await supabase
          .from('user_profiles')
          .select('id, user_id, first_name, last_name, email, phone')
          .eq('role', 'driver')
          .order('first_name', { ascending: true })

        if (error) {
          console.error('Error fetching all drivers:', error)
          return
        }

        setDrivers(data || [])
        return
      }

      // Get user profiles for approved drivers
      const userIds = applications.map((app: any) => app.user_id)
      console.log('User IDs from approved applications:', userIds)
      
      const { data, error } = await supabase
        .from('user_profiles')
        .select('id, user_id, first_name, last_name, email, phone')
        .eq('role', 'driver')
        .in('id', userIds)
        .order('first_name', { ascending: true })

      if (error) {
        console.error('Error fetching drivers:', error)
        return
      }

      console.log('Approved drivers found:', data)
      setDrivers(data || [])
    } catch (error) {
      console.error('Error fetching drivers:', error)
    }
  }

  const handleAssignDriver = async () => {
    if (!selectedBooking || !selectedDriver) return

    try {
      const supabase = createClient()
      
      // Find the selected driver's user_id
      const selectedDriverProfile = drivers.find(driver => driver.id === selectedDriver)
      if (!selectedDriverProfile) {
        console.error('Selected driver not found')
        return
      }
      
      // Update booking with driver assignment based on booking type
      let error
      if (selectedBooking.booking_type === 'guest') {
        // Update guest booking (no assigned_at field)
        const { error: guestError } = await supabase
          .from('guest_bookings')
          .update({ 
            driver_id: selectedDriverProfile.id
          })
          .eq('id', selectedBooking.id)
        error = guestError
      } else {
        // Update regular booking
        const { error: regularError } = await supabase
          .from('bookings')
          .update({ 
            driver_id: selectedDriverProfile.id,
            assigned_at: new Date().toISOString()
          })
          .eq('id', selectedBooking.id)
        error = regularError
      }

      if (error) {
        console.error('Error assigning driver:', error)
        return
      }

      // Send confirmation email to customer
      try {
        const customerEmail = selectedBooking.booking_type === 'guest' 
          ? selectedBooking.customer_email 
          : selectedBooking.user_profiles?.email
        const customerName = selectedBooking.booking_type === 'guest'
          ? selectedBooking.customer_name
          : `${selectedBooking.user_profiles?.first_name} ${selectedBooking.user_profiles?.last_name}`

        console.log('Email data for driver assignment:', {
          customerEmail,
          customerName,
          bookingType: selectedBooking.booking_type
        })

        await sendBookingConfirmationEmail(
          customerEmail,
          customerName,
          {
            pickupLocation: selectedBooking.pickup_location,
            dropoffLocation: selectedBooking.dropoff_location,
            pickupTime: selectedBooking.pickup_time,
            serviceType: selectedBooking.service_type || 'Standard',
            price: selectedBooking.price,
            status: 'confirmed'
          }
        )
      } catch (emailError) {
        console.error('Error sending confirmation email:', emailError)
        // Don't fail the assignment if email fails
      }

      // Send notification email to driver
      try {
        const driverCustomerName = selectedBooking.booking_type === 'guest'
          ? selectedBooking.customer_name
          : `${selectedBooking.user_profiles?.first_name} ${selectedBooking.user_profiles?.last_name}`
        
        await sendDriverAssignmentNotification(
          selectedDriverProfile.email,
          `${selectedDriverProfile.first_name} ${selectedDriverProfile.last_name}`,
          {
            pickupLocation: selectedBooking.pickup_location,
            dropoffLocation: selectedBooking.dropoff_location,
            pickupTime: selectedBooking.pickup_time,
            serviceType: selectedBooking.service_type || 'Standard',
            price: selectedBooking.price,
            customerName: driverCustomerName,
            customerPhone: selectedBooking.booking_type === 'guest' 
              ? selectedBooking.customer_phone 
              : selectedBooking.user_profiles?.phone
          }
        )
      } catch (driverEmailError) {
        console.error('Error sending driver notification:', driverEmailError)
        // Don't fail the assignment if driver email fails
      }

      // Refresh bookings
      await fetchBookings()
      
      // Close modal
      setShowAssignModal(false)
      setSelectedBooking(null)
      setSelectedDriver('')
    } catch (error) {
      console.error('Error assigning driver:', error)
    }
  }

  const getStatusBadge = (booking: any) => {
    if (booking.driver_id) {
      if (booking.driver_accepted === true) {
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Accepted
          </span>
        )
      } else if (booking.driver_accepted === false) {
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </span>
        )
      } else {
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <ClockIcon className="h-3 w-3 mr-1" />
            Pending Response
          </span>
        )
      }
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <AlertCircle className="h-3 w-3 mr-1" />
          Unassigned
        </span>
      )
    }
  }

  const getServiceTypeDisplayName = (serviceType: string) => {
    const serviceNames = {
      'economy-student': 'Economy Student',
      'comfort': 'Comfort',
      'executive': 'Executive',
      'executive-business': 'Executive Business',
      'excel': 'XL',
      'executive-business-excel': 'Executive Business (XL)'
    }
    return serviceNames[serviceType as keyof typeof serviceNames] || serviceType
  }

  const filteredBookings = bookings.filter((booking: any) => {
    if (filter === 'all') return true
    if (filter === 'assigned') return booking.driver_id
    if (filter === 'unassigned') return !booking.driver_id
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
              <Link href="/admin" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Link>
              <h1 className="text-xl font-semibold text-jet2-dark">All Bookings</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Filter Tabs */}
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
                  onClick={() => setFilter('assigned')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    filter === 'assigned'
                      ? 'border-jet2-orange text-jet2-orange'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Assigned ({bookings.filter((booking: any) => booking.driver_id).length})
                </button>
                <button
                  onClick={() => setFilter('unassigned')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    filter === 'unassigned'
                      ? 'border-jet2-orange text-jet2-orange'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Unassigned ({bookings.filter((booking: any) => !booking.driver_id).length})
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

          {/* Bookings List */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            {filteredBookings.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {filter === 'all' 
                    ? 'No bookings found.'
                    : `No ${filter} bookings found.`
                  }
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {filteredBookings.map((booking: any) => (
                  <li key={booking.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-jet2-orange flex items-center justify-center">
                            <Calendar className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center space-x-2">
                            <h3 className="text-sm font-medium text-gray-900">
                              Booking #{booking.id.slice(0, 8)}
                            </h3>
                            {getStatusBadge(booking)}
                            {booking.booking_type === 'guest' && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Guest Booking
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-4">
                                <span className="flex items-center">
                                  <User className="h-4 w-4 mr-1" />
                                  {booking.client?.first_name && booking.client?.last_name 
                                    ? `${booking.client.first_name} ${booking.client.last_name}`
                                    : 'Customer information not available'
                                  }
                                </span>
                                <span className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {booking.pickup_time ? new Date(booking.pickup_time).toLocaleDateString() : 'Date not set'}
                                </span>
                              </div>
                              <div className="flex items-center space-x-4">
                                <span className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  <span className="text-green-600">From:</span> {booking.pickup_location}
                                </span>
                              </div>
                              <div className="flex items-center space-x-4">
                                <span className="flex items-center">
                                  <Navigation className="h-4 w-4 mr-1" />
                                  <span className="text-red-600">To:</span> {booking.dropoff_location}
                                </span>
                              </div>
                            </div>
                          </div>
                          {booking.driver && (
                            <div className="text-sm text-gray-500 mt-1">
                              <span className="flex items-center">
                                <Car className="h-4 w-4 mr-1" />
                                Driver: {booking.driver.first_name} {booking.driver.last_name}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedBooking(booking)
                            setShowDetailsModal(true)
                          }}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jet2-orange"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </button>
                        {!booking.driver_id && (
                          <button
                            onClick={() => {
                              setSelectedBooking(booking)
                              setShowAssignModal(true)
                            }}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-jet2-orange hover:bg-jet2-orange-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jet2-orange"
                          >
                            <Users className="h-4 w-4 mr-1" />
                            Assign Driver
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>

      {/* Assign Driver Modal */}
      {showAssignModal && selectedBooking && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Assign Driver to Booking
              </h3>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  Booking #{selectedBooking.id.slice(0, 8)}
                </p>
                <p className="text-sm text-gray-600">
                  {selectedBooking.pickup_location} → {selectedBooking.dropoff_location}
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Driver
                </label>
                <select
                  value={selectedDriver}
                  onChange={(e) => setSelectedDriver(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                >
                  <option value="">Choose a driver...</option>
                  {drivers.map((driver: any) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.first_name} {driver.last_name} ({driver.email})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowAssignModal(false)
                    setSelectedBooking(null)
                    setSelectedDriver('')
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAssignDriver}
                  disabled={!selectedDriver}
                  className="px-4 py-2 bg-jet2-orange text-white rounded-md hover:bg-jet2-orange-dark transition-colors disabled:opacity-50"
                >
                  Assign Driver
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Details Modal */}
      {showDetailsModal && selectedBooking && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Booking Details #{selectedBooking.id.slice(0, 8)}
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Basic Info */}
              <div className="space-y-6">
                {/* Customer Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2 text-jet2-orange" />
                    Customer Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-sm text-gray-600">Name:</span>
                      <span className="ml-2 text-sm font-medium">
                        {selectedBooking.client?.first_name && selectedBooking.client?.last_name 
                          ? `${selectedBooking.client.first_name} ${selectedBooking.client.last_name}`
                          : 'Customer information not available'
                        }
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-sm text-gray-600">Email:</span>
                      <span className="ml-2 text-sm font-medium">{selectedBooking.client?.email || 'Not available'}</span>
                    </div>
                    {selectedBooking.client?.phone && (
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm text-gray-600">Phone:</span>
                        <span className="ml-2 text-sm font-medium">{selectedBooking.client.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Trip Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-jet2-orange" />
                    Trip Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400 mt-1" />
                      <div>
                        <span className="text-sm text-gray-600">Pickup:</span>
                        <p className="text-sm font-medium">{selectedBooking.pickup_location}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400 mt-1" />
                      <div>
                        <span className="text-sm text-gray-600">Dropoff:</span>
                        <p className="text-sm font-medium">{selectedBooking.dropoff_location}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-sm text-gray-600">Date & Time:</span>
                      <span className="ml-2 text-sm font-medium">
                        {new Date(selectedBooking.pickup_time).toLocaleString()}
                      </span>
                    </div>
                    {selectedBooking.distance && (
                      <div className="flex items-center">
                        <Navigation className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm text-gray-600">Distance:</span>
                        <span className="ml-2 text-sm font-medium">
                          {selectedBooking.distance.toFixed(1)} miles
                        </span>
                      </div>
                    )}
                    {selectedBooking.duration && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm text-gray-600">Duration:</span>
                        <span className="ml-2 text-sm font-medium">
                          {Math.round(selectedBooking.duration)} minutes
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Driver Information */}
                {selectedBooking.driver && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <Car className="h-5 w-5 mr-2 text-jet2-orange" />
                      Assigned Driver
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm text-gray-600">Name:</span>
                        <span className="ml-2 text-sm font-medium">
                          {selectedBooking.driver.first_name} {selectedBooking.driver.last_name}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm text-gray-600">Email:</span>
                        <span className="ml-2 text-sm font-medium">{selectedBooking.driver.email}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-600">Response:</span>
                        <span className="ml-2">
                          {selectedBooking.driver_accepted === true ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Accepted
                            </span>
                          ) : selectedBooking.driver_accepted === false ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              <XCircle className="h-3 w-3 mr-1" />
                              Rejected
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              <ClockIcon className="h-3 w-3 mr-1" />
                              Pending
                            </span>
                          )}
                        </span>
                      </div>
                      {selectedBooking.driver_accepted === false && selectedBooking.driver_rejection_reason && (
                        <div className="flex items-start">
                          <MessageSquare className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                          <div>
                            <span className="text-sm text-gray-600">Rejection Reason:</span>
                            <p className="text-sm text-gray-800 mt-1">{selectedBooking.driver_rejection_reason}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Service & Pricing */}
              <div className="space-y-6">
                {/* Service Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <Star className="h-5 w-5 mr-2 text-jet2-orange" />
                    Service Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Car className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-sm text-gray-600">Service Type:</span>
                      <span className="ml-2 text-sm font-medium">
                        {getServiceTypeDisplayName(selectedBooking.service_type || 'comfort')}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="text-sm text-gray-600">Passengers:</span>
                      <span className="ml-2 text-sm font-medium">
                        {selectedBooking.passengers || 1}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600">Status:</span>
                      <span className="ml-2">{getStatusBadge(selectedBooking)}</span>
                    </div>
                  </div>
                </div>

                {/* Pricing Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-jet2-orange" />
                    Pricing Information
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Price:</span>
                      <span className="text-lg font-bold text-jet2-orange">
                        £{selectedBooking.price?.toFixed(2) || '0.00'}
                      </span>
                    </div>
                    {selectedBooking.distance && (
                      <div className="text-xs text-gray-500">
                        Based on {selectedBooking.distance.toFixed(1)} miles
                      </div>
                    )}
                  </div>
                </div>

                {/* Special Requests */}
                {selectedBooking.special_requests && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2 text-jet2-orange" />
                      Special Requests
                    </h4>
                    <p className="text-sm text-gray-700 bg-white p-3 rounded border">
                      {selectedBooking.special_requests}
                    </p>
                  </div>
                )}

                {/* Booking Metadata */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-jet2-orange" />
                    Booking Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Booking ID:</span>
                      <span className="font-mono">{selectedBooking.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Created:</span>
                      <span>{new Date(selectedBooking.created_at).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Updated:</span>
                      <span>{new Date(selectedBooking.updated_at || selectedBooking.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Close
              </button>
              {!selectedBooking.driver_id && (
                <button
                  onClick={() => {
                    setShowDetailsModal(false)
                    setShowAssignModal(true)
                  }}
                  className="px-4 py-2 bg-jet2-orange text-white rounded-md text-sm font-medium hover:bg-jet2-orange-dark"
                >
                  Assign Driver
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
