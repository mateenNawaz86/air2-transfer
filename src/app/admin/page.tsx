'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/auth'
import { 
  Users, 
  FileText,
  Calendar, 
  Clock,
  CheckCircle, 
  AlertCircle,
  Car,
  UserCheck
} from 'lucide-react'

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [stats, setStats] = useState<any>({
    totalDrivers: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    totalBookings: 0,
    assignedBookings: 0,
    unassignedBookings: 0,
    completedBookings: 0,
    pendingBookings: 0
  })
  const [loading, setLoading] = useState(true)

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

      // Fetch dashboard statistics
      await fetchDashboardStats()

    setLoading(false)
    } catch (error) {
      console.error('Error in checkAuth:', error)
      router.push('/login')
    }
  }

  const fetchDashboardStats = async () => {
    try {
      const supabase = createClient()
      
      // Get all drivers
      const { data: driversData, error: driversError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('role', 'driver')

      if (driversError) {
        console.error('Error fetching drivers:', driversError)
      }

      // Get all applications
      const { data: applicationsData, error: applicationsError } = await supabase
        .from('driver_applications')
        .select('*')

      if (applicationsError) {
        console.error('Error fetching applications:', applicationsError)
      }

      // Get all regular bookings
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')

      if (bookingsError) {
        console.error('Error fetching bookings:', bookingsError)
      }

      // Get all guest bookings
      const { data: guestBookingsData, error: guestBookingsError } = await supabase
        .from('guest_bookings')
        .select('*')

      if (guestBookingsError) {
        console.error('Error fetching guest bookings:', guestBookingsError)
      }

      // Combine all bookings
      const allBookings = [...(bookingsData || []), ...(guestBookingsData || [])]

      // Calculate statistics
      const totalDrivers = driversData?.length || 0
      const pendingApplications = applicationsData?.filter((app: any) => app.status === 'pending').length || 0
      const approvedApplications = applicationsData?.filter((app: any) => app.status === 'approved').length || 0
      const totalBookings = allBookings.length
      const assignedBookings = allBookings.filter((booking: any) => 
        booking.driver_id && booking.status !== 'completed'
      ).length
      const unassignedBookings = allBookings.filter((booking: any) => !booking.driver_id).length
      const completedBookings = allBookings.filter((booking: any) => booking.status === 'completed').length
      const pendingBookings = allBookings.filter((booking: any) => 
        booking.status === 'pending' || booking.status === 'confirmed'
      ).length

      console.log('Dashboard Stats:', {
        totalDrivers,
        pendingApplications,
        approvedApplications,
        totalBookings,
        assignedBookings,
        unassignedBookings,
        completedBookings,
        pendingBookings
      })

      setStats({
        totalDrivers,
        pendingApplications,
        approvedApplications,
        totalBookings,
        assignedBookings,
        unassignedBookings,
        completedBookings,
        pendingBookings
      })
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    }
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
            <div className="flex items-center">
                <h1 className="text-xl font-semibold text-jet2-dark">Admin Dashboard</h1>
              </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <UserCheck className="h-5 w-5 text-gray-400" />
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
          {/* Welcome Section */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back, {userProfile?.first_name}!
            </h2>
            <p className="text-gray-600">
              You are logged in as an <span className="font-semibold text-jet2-orange">Administrator</span>
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Drivers</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.totalDrivers}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
              <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Applications</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.pendingApplications}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Approved Applications</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.approvedApplications}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
              <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.totalBookings}</p>
            </div>
          </div>
        </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Car className="h-6 w-6 text-green-600" />
          </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Assigned Bookings</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.assignedBookings}</p>
                      </div>
                    </div>
                      </div>
                      
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                      </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Unassigned Bookings</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.unassignedBookings}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed Bookings</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.completedBookings}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending/In Progress</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.pendingBookings}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/admin/applications" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-jet2-orange" />
                <h3 className="ml-3 text-lg font-medium text-gray-900">Driver Applications</h3>
                </div>
              <p className="mt-2 text-gray-600">Review and manage driver applications</p>
            </Link>
            
            <Link href="/admin/bookings" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-jet2-orange" />
                <h3 className="ml-3 text-lg font-medium text-gray-900">All Bookings</h3>
                    </div>
              <p className="mt-2 text-gray-600">Manage and assign bookings to drivers</p>
            </Link>
            

                  </div>
                </div>
      </main>
    </div>
  )
}
