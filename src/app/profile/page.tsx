'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/auth'
import { 
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  AlertCircle,
  CheckCircle,
  Loader2,
  Save,
  Edit
} from 'lucide-react'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: ''
  })

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
      
      // Initialize form data with current profile data
      setFormData({
        firstName: profile.first_name || '',
        lastName: profile.last_name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        dateOfBirth: profile.date_of_birth || '',
        address: profile.address || '',
        emergencyContact: profile.emergency_contact || '',
        emergencyPhone: profile.emergency_phone || ''
      })
      
      setLoading(false)
    } catch (error) {
      console.error('Error in checkAuth:', error)
      router.push('/login')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage('')

    const supabase = createClient()

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          date_of_birth: formData.dateOfBirth,
          address: formData.address,
          emergency_contact: formData.emergencyContact,
          emergency_phone: formData.emergencyPhone,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userProfile.user_id)

      if (error) throw error

      setMessageType('success')
      setMessage('Profile updated successfully!')
      setEditing(false)
      
      // Refresh profile data
      const { data: updatedProfile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userProfile.user_id)
        .single()
      
      if (updatedProfile) {
        setUserProfile(updatedProfile)
      }
      
      setTimeout(() => {
        setMessage('')
      }, 3000)
    } catch (error) {
      setMessageType('error')
      setMessage(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    // Reset form data to current profile data
    setFormData({
      firstName: userProfile.first_name || '',
      lastName: userProfile.last_name || '',
      email: userProfile.email || '',
      phone: userProfile.phone || '',
      dateOfBirth: userProfile.date_of_birth || '',
      address: userProfile.address || '',
      emergencyContact: userProfile.emergency_contact || '',
      emergencyPhone: userProfile.emergency_phone || ''
    })
    setEditing(false)
    setMessage('')
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
            <div className="flex items-center space-x-4">
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-jet2-orange text-white rounded-md hover:bg-jet2-orange-dark transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
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
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            <p className="mt-2 text-gray-600">Manage your account information</p>
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

          {/* Profile Form */}
          <div className="bg-white rounded-lg shadow p-8">
            <div className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      disabled={!editing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      disabled={!editing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled={true}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
                        placeholder="Enter your email"
                      />
                      <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!editing}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder="Enter your phone number"
                      />
                      <Phone className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        max="2099-12-31"
                        onChange={handleInputChange}
                        disabled={!editing}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                      />
                      <Calendar className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Address Information</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={!editing}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="Enter your full address"
                  />
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Emergency Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact Name
                    </label>
                    <input
                      type="text"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      disabled={!editing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                      placeholder="Enter emergency contact name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact Phone
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="emergencyPhone"
                        value={formData.emergencyPhone}
                        onChange={handleInputChange}
                        disabled={!editing}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                        placeholder="Enter emergency contact phone"
                      />
                      <Phone className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Account Information</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Account Type</p>
                      <p className="text-sm text-gray-900 capitalize">{userProfile?.role}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Member Since</p>
                      <p className="text-sm text-gray-900">
                        {userProfile?.created_at ? new Date(userProfile.created_at).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {editing && (
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center space-x-2 px-4 py-2 bg-jet2-orange text-white rounded-md hover:bg-jet2-orange-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
