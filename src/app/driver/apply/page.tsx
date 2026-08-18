'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/auth'
import { 
  ArrowLeft,
  User,
  Car,
  FileText,
  Mail,
  Phone,
  Calendar,
  AlertCircle,
  CheckCircle,
  Loader2,
  Upload,
  X,
  Eye,
  EyeOff
} from 'lucide-react'

export default function DriverApplicationPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    ninNumber: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    vehicleColor: '',
    vehicleRegistration: '',
    vehicleOwnerName: '',
    vehicleOwnerPhone: '',
    isVehicleRented: false,
    drivingLicenseExpiry: '',
    councilLicenseExpiry: '',
    vehicleLicenseExpiry: '',
    motCertificateExpiry: '',
    insuranceCertificateExpiry: ''
  })

  const [documents, setDocuments] = useState({
    drivingLicenseFront: null as File | null,
    drivingLicenseBack: null as File | null,
    councilLicense: null as File | null,
    logbook: null as File | null,
    vehicleLicense: null as File | null,
    motCertificate: null as File | null,
    insuranceCertificate: null as File | null,
    proofOfAddress1: null as File | null,
    proofOfAddress2: null as File | null,
    vehicleRentalPermission: null as File | null
  })

  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({})

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
      
      // Pre-fill form with profile data
      setFormData(prev => ({
        ...prev,
        firstName: profile.first_name || '',
        lastName: profile.last_name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        dateOfBirth: profile.date_of_birth || ''
      }))
      
      setLoading(false)
    } catch (error) {
      console.error('Error in checkAuth:', error)
      router.push('/login')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleFileChange = (field: string, file: File | null) => {
    setDocuments(prev => ({
      ...prev,
      [field]: file
    }))
  }

  const uploadFile = async (file: File, path: string): Promise<string> => {
    const supabase = createClient()
    
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `${path}/${fileName}`

    const { data, error } = await supabase.storage
      .from('driver-documents')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage
      .from('driver-documents')
      .getPublicUrl(filePath)

    return publicUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage('')

    const supabase = createClient()

    try {
      // Upload all documents
      const uploadPromises = []
      const documentUrls: {[key: string]: string} = {}

      // Required documents
      const requiredDocs = [
        { field: 'drivingLicenseFront', file: documents.drivingLicenseFront, path: 'licenses' },
        { field: 'drivingLicenseBack', file: documents.drivingLicenseBack, path: 'licenses' },
        { field: 'councilLicense', file: documents.councilLicense, path: 'licenses' },
        { field: 'logbook', file: documents.logbook, path: 'vehicle' },
        { field: 'vehicleLicense', file: documents.vehicleLicense, path: 'vehicle' },
        { field: 'motCertificate', file: documents.motCertificate, path: 'vehicle' },
        { field: 'insuranceCertificate', file: documents.insuranceCertificate, path: 'vehicle' },
        { field: 'proofOfAddress1', file: documents.proofOfAddress1, path: 'address' },
        { field: 'proofOfAddress2', file: documents.proofOfAddress2, path: 'address' }
      ]

      // Check if all required documents are uploaded
      for (const doc of requiredDocs) {
        if (!doc.file) {
          throw new Error(`Please upload ${doc.field.replace(/([A-Z])/g, ' $1').toLowerCase()}`)
        }
      }

      // Upload required documents
      for (const doc of requiredDocs) {
        if (doc.file) {
          uploadPromises.push(
            uploadFile(doc.file, doc.path).then(url => {
              documentUrls[doc.field] = url
            })
          )
        }
      }

      // Upload rental permission if vehicle is rented
      if (formData.isVehicleRented && documents.vehicleRentalPermission) {
        uploadPromises.push(
          uploadFile(documents.vehicleRentalPermission, 'permissions').then(url => {
            documentUrls.vehicleRentalPermission = url
          })
        )
      }

      // Wait for all uploads to complete
      await Promise.all(uploadPromises)

      // Create driver application record
      const { data, error } = await supabase
        .from('driver_applications')
        .insert([{
          user_id: userProfile.id,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          date_of_birth: formData.dateOfBirth,
          nin_number: formData.ninNumber,
          vehicle_make: formData.vehicleMake,
          vehicle_model: formData.vehicleModel,
          vehicle_year: parseInt(formData.vehicleYear),
          vehicle_color: formData.vehicleColor,
          vehicle_registration: formData.vehicleRegistration,
          vehicle_owner_name: formData.vehicleOwnerName || null,
          vehicle_owner_phone: formData.vehicleOwnerPhone || null,
          vehicle_rental_permission_url: documentUrls.vehicleRentalPermission || null,
          driving_license_front_url: documentUrls.drivingLicenseFront,
          driving_license_back_url: documentUrls.drivingLicenseBack,
          driving_license_expiry: formData.drivingLicenseExpiry,
          council_license_url: documentUrls.councilLicense,
          council_license_expiry: formData.councilLicenseExpiry,
          logbook_url: documentUrls.logbook,
          vehicle_license_url: documentUrls.vehicleLicense,
          vehicle_license_expiry: formData.vehicleLicenseExpiry,
          mot_certificate_url: documentUrls.motCertificate,
          mot_certificate_expiry: formData.motCertificateExpiry,
          insurance_certificate_url: documentUrls.insuranceCertificate,
          insurance_certificate_expiry: formData.insuranceCertificateExpiry,
          proof_of_address_1_url: documentUrls.proofOfAddress1,
          proof_of_address_2_url: documentUrls.proofOfAddress2,
          application_status: 'pending'
        }])
        .select()
        .single()

      if (error) throw error

      // Send application submission email
      try {
        const { sendDriverApplicationSubmissionEmail } = await import('@/lib/emailService')
        
        await sendDriverApplicationSubmissionEmail(
          formData.email,
          `${formData.firstName} ${formData.lastName}`,
          {
            applicationId: data.id,
            submissionDate: new Date().toISOString()
          }
        )
      } catch (emailError) {
        console.error('Error sending application email:', emailError)
        // Don't fail the application if email fails
      }

      setMessageType('success')
      setMessage('Application submitted successfully! We will review your documents and contact you within 3-5 business days.')
      
      setTimeout(() => {
        router.push('/dashboard')
      }, 5000)
    } catch (error) {
      setMessageType('error')
      setMessage(error instanceof Error ? error.message : 'An error occurred while submitting your application')
    } finally {
      setSubmitting(false)
    }
  }

  const validateForm = () => {
    console.log('Validating form...')
    console.log('Form data:', formData)
    console.log('Documents:', documents)
    
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'ninNumber',
      'vehicleMake', 'vehicleModel', 'vehicleYear', 'vehicleColor', 'vehicleRegistration',
      'drivingLicenseExpiry', 'councilLicenseExpiry', 'vehicleLicenseExpiry', 
      'motCertificateExpiry', 'insuranceCertificateExpiry'
    ]

    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        console.log(`Missing required field: ${field}`)
        return false
      }
    }

    // Check if all required documents are uploaded
    const requiredDocs = [
      'drivingLicenseFront', 'drivingLicenseBack', 'councilLicense', 'logbook',
      'vehicleLicense', 'motCertificate', 'insuranceCertificate', 'proofOfAddress1', 'proofOfAddress2'
    ]

    for (const doc of requiredDocs) {
      if (!documents[doc as keyof typeof documents]) {
        console.log(`Missing required document: ${doc}`)
        return false
      }
    }

    // If vehicle is rented, check for rental permission
    if (formData.isVehicleRented && !documents.vehicleRentalPermission) {
      console.log('Missing vehicle rental permission')
      return false
    }

    console.log('Form validation passed!')
    return true
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
            <h1 className="text-3xl font-bold text-gray-900">Driver Application</h1>
            <p className="mt-2 text-gray-600">Complete your application to join our professional driver team</p>
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

          {/* Application Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8">
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
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                        placeholder="Enter your phone number"
                      />
                      <Phone className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth *
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        max="2099-12-31"
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                      />
                      <Calendar className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      NIN Number *
                    </label>
                    <input
                      type="text"
                      name="ninNumber"
                      value={formData.ninNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                      placeholder="Enter your NIN number"
                    />
                  </div>
                </div>
              </div>

              {/* Vehicle Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Car className="h-5 w-5 mr-2" />
                  Vehicle Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vehicle Make *
                    </label>
                    <input
                      type="text"
                      name="vehicleMake"
                      value={formData.vehicleMake}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                      placeholder="e.g., Mercedes, BMW"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vehicle Model *
                    </label>
                    <input
                      type="text"
                      name="vehicleModel"
                      value={formData.vehicleModel}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                      placeholder="e.g., S-Class, 7 Series"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vehicle Year *
                    </label>
                    <input
                      type="number"
                      name="vehicleYear"
                      value={formData.vehicleYear}
                      onChange={handleInputChange}
                      required
                      min="2000"
                      max={new Date().getFullYear() + 1}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                      placeholder="e.g., 2020"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vehicle Color *
                    </label>
                    <input
                      type="text"
                      name="vehicleColor"
                      value={formData.vehicleColor}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                      placeholder="e.g., Black, White"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vehicle Registration *
                    </label>
                    <input
                      type="text"
                      name="vehicleRegistration"
                      value={formData.vehicleRegistration}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                      placeholder="Enter vehicle registration number"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="isVehicleRented"
                      checked={formData.isVehicleRented}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-jet2-orange focus:ring-jet2-orange border-gray-300 rounded"
                    />
                    <label className="text-sm font-medium text-gray-700">
                      Vehicle is rented/leased
                    </label>
                  </div>
                </div>

                {/* Vehicle Owner Information (if rented) */}
                {formData.isVehicleRented && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-md font-medium text-gray-900 mb-3">Vehicle Owner Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Vehicle Owner Name *
                        </label>
                        <input
                          type="text"
                          name="vehicleOwnerName"
                          value={formData.vehicleOwnerName}
                          onChange={handleInputChange}
                          required={formData.isVehicleRented}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                          placeholder="Enter vehicle owner name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Vehicle Owner Phone *
                        </label>
                        <input
                          type="tel"
                          name="vehicleOwnerPhone"
                          value={formData.vehicleOwnerPhone}
                          onChange={handleInputChange}
                          required={formData.isVehicleRented}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                          placeholder="Enter vehicle owner phone"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Required Documents */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Required Documents
                </h3>
                <div className="space-y-6">
                  {/* Driving License */}
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-3">Driving License</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Driving License Front *
                        </label>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileChange('drivingLicenseFront', e.target.files?.[0] || null)}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Driving License Back *
                        </label>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileChange('drivingLicenseBack', e.target.files?.[0] || null)}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Driving License Expiry Date *
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          name="drivingLicenseExpiry"
                          value={formData.drivingLicenseExpiry}
                          max="2099-12-31"
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                        />
                        <Calendar className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                      </div>
                    </div>
                  </div>

                  {/* Council License */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Council License for Driver *
                    </label>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileChange('councilLicense', e.target.files?.[0] || null)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                    />
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Council License Expiry Date *
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          name="councilLicenseExpiry"
                          value={formData.councilLicenseExpiry}
                          max="2099-12-31"
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                        />
                        <Calendar className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Documents */}
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-3">Vehicle Documents</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Logbook (All Pages) *
                        </label>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileChange('logbook', e.target.files?.[0] || null)}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Vehicle License from Council *
                        </label>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileChange('vehicleLicense', e.target.files?.[0] || null)}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                        />
                        <div className="mt-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Vehicle License Expiry Date *
                          </label>
                          <div className="relative">
                            <input
                              type="date"
                              name="vehicleLicenseExpiry"
                              value={formData.vehicleLicenseExpiry}
                              max="2099-12-31"
                              onChange={handleInputChange}
                              required
                              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                            />
                            <Calendar className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          MOT Certificate *
                        </label>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileChange('motCertificate', e.target.files?.[0] || null)}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                        />
                        <div className="mt-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            MOT Certificate Expiry Date *
                          </label>
                          <div className="relative">
                            <input
                              type="date"
                              name="motCertificateExpiry"
                              value={formData.motCertificateExpiry}
                              max="2099-12-31"
                              onChange={handleInputChange}
                              required
                              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                            />
                            <Calendar className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Insurance Certificate *
                        </label>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileChange('insuranceCertificate', e.target.files?.[0] || null)}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                        />
                        <div className="mt-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Insurance Certificate Expiry Date *
                          </label>
                          <div className="relative">
                            <input
                              type="date"
                              name="insuranceCertificateExpiry"
                              value={formData.insuranceCertificateExpiry}
                              max="2099-12-31"
                              onChange={handleInputChange}
                              required
                              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                            />
                            <Calendar className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Proof of Address */}
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-3">Proof of Address</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Please provide two different proof of address documents. All documents must show the same address.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Proof of Address 1 *
                        </label>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileChange('proofOfAddress1', e.target.files?.[0] || null)}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Proof of Address 2 *
                        </label>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileChange('proofOfAddress2', e.target.files?.[0] || null)}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Rental Permission */}
                  {formData.isVehicleRented && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vehicle Rental Permission from Owner *
                      </label>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileChange('vehicleRentalPermission', e.target.files?.[0] || null)}
                        required={formData.isVehicleRented}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting || !validateForm()}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-jet2-orange hover:bg-jet2-orange-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jet2-orange disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
