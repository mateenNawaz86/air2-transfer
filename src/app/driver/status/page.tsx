'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/auth'
import { 
  ArrowLeft,
  User,
  FileText,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  Loader2
} from 'lucide-react'

export default function DriverApplicationStatusPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [application, setApplication] = useState<any>(null)
  const [loading, setLoading] = useState(true)

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

      // Get driver application by email (since we know the email matches)
      const { data: app, error: appError } = await supabase
        .from('driver_applications')
        .select('*')
        .eq('email', profile.email)
        .single()
      
      if (!appError && app) {
        setApplication(app)
      } else {
        // Try to get all applications for this email in case single() failed due to multiple records
        const { data: allApps, error: allAppsError } = await supabase
          .from('driver_applications')
          .select('*')
          .eq('email', profile.email)
        
        if (allApps && allApps.length > 0) {
          setApplication(allApps[0])
        }
        // No fallback - if no application exists, show "No Application Found"
      }
      
      setLoading(false)
    } catch (error) {
      console.error('Error in checkAuth:', error)
      router.push('/login')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'rejected':
        return 'text-red-600 bg-red-50 border-red-200'
      case 'under_review':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5" />
      case 'rejected':
        return <XCircle className="h-5 w-5" />
      case 'under_review':
        return <Clock className="h-5 w-5" />
      default:
        return <Clock className="h-5 w-5" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Application Approved'
      case 'rejected':
        return 'Application Rejected'
      case 'under_review':
        return 'Under Review'
      default:
        return 'Pending Review'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
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
            <h1 className="text-3xl font-bold text-gray-900">Application Status</h1>
            <p className="mt-2 text-gray-600">Track your driver application progress</p>
          </div>

          {application ? (
            <div className="space-y-6">
              {/* Status Card */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Driver Application</h2>
                    <p className="text-gray-600">Submitted on {formatDate(application.submitted_at)}</p>
                  </div>
                  <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${getStatusColor(application.status || application.application_status)}`}>
                    {getStatusIcon(application.status || application.application_status)}
                    <span className="font-medium">{getStatusText(application.status || application.application_status)}</span>
                  </div>
                </div>
              </div>

              {/* Application Details */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Application Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Name</p>
                    <p className="text-sm text-gray-900">{application.first_name} {application.last_name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Email</p>
                    <p className="text-sm text-gray-900">{application.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Phone</p>
                    <p className="text-sm text-gray-900">{application.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">NIN Number</p>
                    <p className="text-sm text-gray-900">{application.nin_number}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Vehicle</p>
                    <p className="text-sm text-gray-900">{application.vehicle_make} {application.vehicle_model} ({application.vehicle_year})</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Registration</p>
                    <p className="text-sm text-gray-900">{application.vehicle_registration}</p>
                  </div>
                </div>
              </div>

              {/* Admin Notes */}
              {application.admin_notes && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Admin Notes</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700">{application.admin_notes}</p>
                  </div>
                </div>
              )}

              {/* Next Steps */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Next Steps</h3>
                {(application.status || application.application_status) === 'pending' && (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">Your application is currently being reviewed by our team. This process typically takes 3-5 business days.</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• We will verify all submitted documents</li>
                      <li>• Background checks will be conducted</li>
                      <li>• You will receive an email notification once reviewed</li>
                    </ul>
                  </div>
                )}
                {(application.status || application.application_status) === 'under_review' && (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">Your application is currently under detailed review. Additional verification may be required.</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Document verification in progress</li>
                      <li>• Additional checks may be requested</li>
                      <li>• You will be contacted if more information is needed</li>
                    </ul>
                  </div>
                )}
                {(application.status || application.application_status) === 'approved' && (
                  <div className="space-y-3">
                    <p className="text-sm text-green-600 font-medium">Congratulations! Your application has been approved.</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Welcome to our driver team!</li>
                      <li>• You will receive onboarding instructions via email</li>
                      <li>• Training and orientation will be scheduled</li>
                    </ul>
                  </div>
                )}
                {application.application_status === 'rejected' && (
                  <div className="space-y-3">
                    <p className="text-sm text-red-600 font-medium">Your application was not approved at this time.</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Please review the admin notes above</li>
                      <li>• You may reapply after addressing the issues</li>
                      <li>• Contact support if you have questions</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
                     ) : (
             <div className="bg-white rounded-lg shadow p-6 text-center">
               <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
               <h3 className="text-lg font-medium text-gray-900 mb-2">No Application Found</h3>
                               <p className="text-gray-600 mb-4">
                  {userProfile?.role === 'driver' 
                    ? 'You are already a driver but no application record was found. You can submit a new application if needed.'
                    : 'You haven\'t submitted a driver application yet.'
                  }
                </p>
                <Link 
                  href="/driver/apply"
                  className="inline-flex items-center px-4 py-2 bg-jet2-orange text-white rounded-md hover:bg-jet2-orange-dark transition-colors"
                >
                  Submit Application
                </Link>
             </div>
           )}
        </div>
      </main>
    </div>
  )
}
