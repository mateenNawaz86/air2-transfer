'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/auth'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle,
  CheckCircle,
  Loader2,
  X
} from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('')
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

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

    const supabase = createClient()

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      })

      if (error) throw error

      setMessageType('success')
      setMessage('Login successful! Redirecting...')
      
      // Redirect to dashboard - let the dashboard handle role-based routing
      router.push('/dashboard')
    } catch (error) {
      setMessageType('error')
      setMessage(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setForgotPasswordLoading(true)
    setMessage('')

    if (!forgotPasswordEmail) {
      setMessageType('error')
      setMessage('Please enter your email address')
      setForgotPasswordLoading(false)
      return
    }

    const supabase = createClient()

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(forgotPasswordEmail, {
        redirectTo: `${window.location.origin}/reset-password`
      })

      if (error) throw error

      setMessageType('success')
      setMessage('Password reset email sent! Please check your inbox and follow the instructions.')
      setForgotPasswordEmail('')
      setShowForgotPassword(false)
    } catch (error) {
      setMessageType('error')
      setMessage(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setForgotPasswordLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-jet2-dark">
            Sign In
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Access your dashboard
          </p>
        </div>

        {/* Message */}
        {message && (
          <div className={`p-4 rounded-lg ${
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          <div className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                  placeholder="Enter your email"
                />
                <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                  placeholder="Enter your password"
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-jet2-orange hover:bg-jet2-orange-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jet2-orange disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Sign In'
              )}
            </button>

            {/* Forgot Password Link */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-jet2-orange hover:text-jet2-orange-dark font-medium"
              >
                Forgot your password?
              </button>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/register" className="font-medium text-jet2-orange hover:text-jet2-orange-dark">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Reset Password</h3>
              <button
                onClick={() => {
                  setShowForgotPassword(false)
                  setForgotPasswordEmail('')
                  setMessage('')
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              Enter your email address and we'll send you a link to reset your password.
            </p>

            <form onSubmit={handleForgotPassword}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                  placeholder="Enter your email address"
                />
              </div>

              <button
                type="submit"
                disabled={forgotPasswordLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-jet2-orange hover:bg-jet2-orange-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jet2-orange disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {forgotPasswordLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
