'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/auth'

export default function AuthCallback() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const supabase = createClient()
        
        // Get the session from the URL hash
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Auth callback error:', error)
          setError('Authentication failed. Please try again.')
          return
        }

        if (data.session?.user) {
          // Get user profile to determine role
          const { data: profile, error: profileError } = await supabase
            .from('user_profiles')
            .select('role')
            .eq('user_id', data.session.user.id)
            .single()

          if (profileError) {
            console.error('Profile fetch error:', profileError)
            setError('Failed to load user profile.')
            return
          }

          // Redirect based on user role
          if (profile?.role === 'admin') {
            router.push('/admin')
          } else if (profile?.role === 'driver') {
            router.push('/bookings')
          } else {
            // Default for clients or users without specific role
            router.push('/dashboard')
          }
        } else {
          // No session, redirect to login
          router.push('/login')
        }
      } catch (err) {
        console.error('Unexpected error:', err)
        setError('An unexpected error occurred.')
      } finally {
        setLoading(false)
      }
    }

    handleAuthCallback()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-jet2-orange mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Confirming your account...</h2>
          <p className="text-gray-600">Please wait while we set up your dashboard.</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="text-red-600 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-red-900 mb-2">Authentication Error</h2>
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={() => router.push('/login')}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
