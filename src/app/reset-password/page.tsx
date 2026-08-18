'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/auth'
import { 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  ArrowLeft
} from 'lucide-react'

function ResetPasswordContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')
  const [isValidToken, setIsValidToken] = useState(false)
  const [checkingToken, setCheckingToken] = useState(true)

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })

  useEffect(() => {
    const checkToken = async () => {
      const accessToken = searchParams.get('access_token')
      const refreshToken = searchParams.get('refresh_token')
      
      if (!accessToken || !refreshToken) {
        setMessageType('error')
        setMessage('Invalid or missing reset token. Please request a new password reset.')
        setCheckingToken(false)
        return
      }

      const supabase = createClient()
      
      try {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken
        })

        if (error) throw error

        setIsValidToken(true)
        setMessageType('success')
        setMessage('Token validated. You can now set your new password.')
      } catch (error) {
        setMessageType('error')
        setMessage('Invalid or expired reset token. Please request a new password reset.')
      } finally {
        setCheckingToken(false)
      }
    }

    checkToken()
  }, [searchParams])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    if (formData.password !== formData.confirmPassword) {
      setMessageType('error')
      setMessage('Passwords do not match')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setMessageType('error')
      setMessage('Password must be at least 6 characters long')
      setLoading(false)
      return
    }

    const supabase = createClient()

    try {
      const { error } = await supabase.auth.updateUser({
        password: formData.password
      })

      if (error) throw error

      setMessageType('success')
      setMessage('Password updated successfully! Redirecting to login...')
      
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } catch (error) {
      setMessageType('error')
      setMessage(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (checkingToken) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-jet2-orange mx-auto"></div>
          <p className="mt-4 text-gray-600">Validating reset token...</p>
        </div>
      </div>
    )
  }

  if (!isValidToken) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Invalid Reset Link</h2>
            <p className="mt-2 text-gray-600">
              This password reset link is invalid or has expired.
            </p>
            <div className="mt-6">
              <Link 
                href="/login" 
                className="inline-flex items-center text-jet2-orange hover:text-jet2-orange-dark font-medium"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-jet2-orange rounded-full flex items-center justify-center">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Reset Password</h2>
          <p className="mt-2 text-gray-600">
            Enter your new password below
          </p>
        </div>

        {/* Message */}
        {message && (
          <div className={`rounded-md p-4 ${
            messageType === 'success' 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex">
              <div className="flex-shrink-0">
                {messageType === 'success' ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-400" />
                )}
              </div>
              <div className="ml-3">
                <p className={`text-sm ${
                  messageType === 'success' ? 'text-green-800' : 'text-red-800'
                }`}>
                  {message}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                  placeholder="Enter your new password"
                />
                <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                  placeholder="Confirm your new password"
                />
                <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-jet2-orange hover:bg-jet2-orange-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jet2-orange disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              'Update Password'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center">
          <Link 
            href="/login" 
            className="inline-flex items-center text-sm text-jet2-orange hover:text-jet2-orange-dark font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-jet2-orange mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  )
}
