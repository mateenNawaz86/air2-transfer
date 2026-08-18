'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/auth'
import { 
  User, 
  LogOut,
  Calendar,
  Car,
  FileText,
  Settings,
  Plus
} from 'lucide-react'

console.log('Dashboard: Module loaded')

export default function DashboardPage() {
  console.log('Dashboard: Component rendering...')
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [driverApplication, setDriverApplication] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('Dashboard: useEffect triggered')
    
    // Check if dashboard has been refreshed before
    const hasRefreshed = document.cookie.includes('dashboardRefreshed=true')
    
    if (!hasRefreshed) {
      console.log('Dashboard: First visit detected, setting cookie and refreshing...')
      // Set cookie for 1 day
      document.cookie = 'dashboardRefreshed=true; path=/; max-age=86400'
      window.location.reload()
      return
    }
    
    console.log('Dashboard: Cookie found, proceeding with auth check...')
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      console.log('Dashboard: Starting auth check...')
      const supabase = createClient()
      
      // Check if user is authenticated
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      console.log('Dashboard: Auth check result:', { user: !!user, error: authError })
      
      if (authError || !user) {
        console.log('No authenticated user, redirecting to login')
        router.push('/login')
        return
      }

      setUser(user)
      console.log('Dashboard: User set, fetching profile...')

      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

      console.log('Dashboard: Profile fetch result:', { profile: !!profile, error: profileError })

      let newProfile = null

      if (profileError) {
        console.error('Profile error:', profileError)
        // If no profile exists, create one
        console.log('Dashboard: Creating new profile...')
        const { data: createdProfile, error: createError } = await supabase
          .from('user_profiles')
          .insert([{
            user_id: user.id,
            email: user.email,
            first_name: user.user_metadata?.first_name || 'User',
            last_name: user.user_metadata?.last_name || 'User',
            role: user.user_metadata?.role || 'client'
          }])
          .select()
          .single()

        if (createError) {
          console.error('Failed to create profile:', createError)
          router.push('/login')
          return
        }

        newProfile = createdProfile
        setUserProfile(newProfile)
        console.log('Dashboard: New profile created and set')
      } else {
        setUserProfile(profile)
        console.log('Dashboard: Existing profile set')
      }

      // Check if user is admin and redirect to admin dashboard
      const currentProfile = profile || newProfile
      console.log('Dashboard: Current profile role:', currentProfile?.role)
      
      if (currentProfile?.role === 'admin') {
        console.log('Admin user detected, redirecting to admin dashboard')
        router.push('/admin')
        return
      }

      // Check if user has a driver application (for both clients and drivers)
      console.log('Dashboard: Checking for driver application...')
      const { data: application } = await supabase
        .from('driver_applications')
        .select('*')
        .eq('user_id', user.id)
        .single()
      
      console.log('Dashboard: Driver application result:', { application: !!application })
      
      if (application) {
        setDriverApplication(application)
      }

      console.log('Dashboard: Setting loading to false...')
      setLoading(false)
    } catch (error) {
      console.error('Error in checkAuth:', error)
      router.push('/login')
    }
  }

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    
    // Delete the dashboard refresh cookie on logout
    document.cookie = 'dashboardRefreshed=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    
    router.push('/')
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
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome Section */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back, {userProfile?.first_name}!
            </h2>
            <p className="text-gray-600">
              You are logged in as a <span className="font-semibold text-jet2-orange">{userProfile?.role}</span>
            </p>
          </div>

          {/* Role-based Content */}
          {userProfile?.role === 'driver' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/bookings/" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-jet2-orange" />
                  <h3 className="ml-3 text-lg font-medium text-gray-900">My Bookings</h3>
                </div>
                <p className="mt-2 text-gray-600">View and manage your upcoming rides</p>
              </Link>
              
              <Link href="/driver/status" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-jet2-orange" />
                  <h3 className="ml-3 text-lg font-medium text-gray-900">My Application</h3>
                </div>
                <p className="mt-2 text-gray-600">View your driver application status</p>
              </Link>
            </div>
          )}

          {userProfile?.role === 'client' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/bookings/new" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center">
                  <Plus className="h-8 w-8 text-jet2-orange" />
                  <h3 className="ml-3 text-lg font-medium text-gray-900">Book a Ride</h3>
                </div>
                <p className="mt-2 text-gray-600">Schedule your next journey</p>
              </Link>
              
              <Link href="/bookings/" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-jet2-orange" />
                  <h3 className="ml-3 text-lg font-medium text-gray-900">My Bookings</h3>
                </div>
                <p className="mt-2 text-gray-600">View your booking history</p>
              </Link>
              
              <Link href="/profile" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center">
                  <Settings className="h-8 w-8 text-jet2-orange" />
                  <h3 className="ml-3 text-lg font-medium text-gray-900">Profile</h3>
                </div>
                <p className="mt-2 text-gray-600">Update your account information</p>
              </Link>
              
              {driverApplication && (
                <Link href="/driver/status" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-jet2-orange" />
                    <h3 className="ml-3 text-lg font-medium text-gray-900">Application Status</h3>
                  </div>
                  <p className="mt-2 text-gray-600">Check your driver application progress</p>
                </Link>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
