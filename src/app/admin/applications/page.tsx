'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/auth'
import Link from 'next/link'
import { 
  Eye, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  Clock,
  User,
  Car,
  FileText,
  Phone,
  Mail,
  Calendar,
  MapPin,
  X
} from 'lucide-react'

export default function AdminApplications() {
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [selectedApplication, setSelectedApplication] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [selectedImageTitle, setSelectedImageTitle] = useState<string>('')

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const supabase = createClient()
      
      // Get all driver applications with user information
      const { data: applicationsData, error } = await supabase
        .from('driver_applications')
        .select('*')
        .order('submitted_at', { ascending: false })

      if (error) {
        console.error('Error fetching applications:', error)
        return
      }

      // Use application data directly since it contains user information
      const applicationsWithUserData = applicationsData?.map((application: any) => ({
        ...application,
        user_profiles: {
          first_name: application.first_name,
          last_name: application.last_name,
          email: application.email,
          phone: application.phone
        }
      })) || []

      setApplications(applicationsWithUserData)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching applications:', error)
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (applicationId: string, newStatus: string) => {
    try {
      const supabase = createClient()
      
      // Get application details before updating
      const { data: applicationData } = await supabase
        .from('driver_applications')
        .select('*')
        .eq('id', applicationId)
        .single()

      if (!applicationData) {
        alert('Application not found.')
        return
      }
      
      const { error } = await supabase
        .from('driver_applications')
        .update({ status: newStatus })
        .eq('id', applicationId)

      if (error) {
        console.error('Error updating application status:', error)
        alert('Failed to update application status. Please try again.')
        return
      }

      // Send approval email if application is approved
      if (newStatus === 'approved') {
        try {
          const { sendDriverApplicationApprovalEmail } = await import('@/lib/emailService')
          
          await sendDriverApplicationApprovalEmail(
            applicationData.email,
            `${applicationData.first_name} ${applicationData.last_name}`,
            {
              applicationId: applicationData.id,
              approvalDate: new Date().toISOString()
            }
          )
        } catch (emailError) {
          console.error('Error sending approval email:', emailError)
          // Don't fail the approval if email fails
        }
      }

      // Update local state
      setApplications(prev => prev.map(app => 
        app.id === applicationId ? { ...app, status: newStatus } : app
      ))

      // Update modal if it's open
      if (selectedApplication && selectedApplication.id === applicationId) {
        setSelectedApplication((prev: any) => ({ ...prev, status: newStatus }))
      }

      alert(`Application ${newStatus} successfully.`)
    } catch (error) {
      console.error('Error updating application status:', error)
      alert('Failed to update application status. Please try again.')
    }
  }

  const handleDeleteApplication = async (applicationId: string) => {
    if (!confirm('Are you sure you want to delete this application? This action cannot be undone.')) {
      return
    }

    try {
      const supabase = createClient()
      
      const { error } = await supabase
        .from('driver_applications')
        .delete()
        .eq('id', applicationId)

      if (error) {
        console.error('Error deleting application:', error)
        alert('Failed to delete application. Please try again.')
        return
      }

      // Update local state
      setApplications(prev => prev.filter(app => app.id !== applicationId))
      
      // Close modal if it's open for this application
      if (selectedApplication && selectedApplication.id === applicationId) {
        setShowModal(false)
        setSelectedApplication(null)
      }

      alert('Application deleted successfully.')
    } catch (error) {
      console.error('Error deleting application:', error)
      alert('Failed to delete application. Please try again.')
    }
  }

  const openApplicationModal = (application: any) => {
    setSelectedApplication(application)
    setShowModal(true)
  }

  const closeApplicationModal = () => {
    setShowModal(false)
    setSelectedApplication(null)
  }

  const openLightbox = (imageUrl: string, title: string) => {
    setSelectedImage(imageUrl)
    setSelectedImageTitle(title)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setSelectedImage('')
    setSelectedImageTitle('')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />
      case 'approved':
        return <CheckCircle className="h-4 w-4" />
      case 'rejected':
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const filteredApplications = applications.filter((app: any) => {
    if (filter === 'all') return true
    return app.status === filter
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-jet2-orange mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading applications...</p>
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
                ← Back to Dashboard
              </Link>
              <h1 className="text-xl font-semibold text-jet2-dark">Driver Applications</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Filter Tabs */}
          <div className="mb-6">
            <nav className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium ${filter === 'all' ? 'bg-jet2-orange text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setFilter('all')}
              >
                All ({applications.length})
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium ${filter === 'pending' ? 'bg-jet2-orange text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setFilter('pending')}
              >
                Pending ({applications.filter((app: any) => app.status === 'pending').length})
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium ${filter === 'approved' ? 'bg-jet2-orange text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setFilter('approved')}
              >
                Approved ({applications.filter((app: any) => app.status === 'approved').length})
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium ${filter === 'rejected' ? 'bg-jet2-orange text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setFilter('rejected')}
              >
                Rejected ({applications.filter((app: any) => app.status === 'rejected').length})
              </button>
            </nav>
          </div>

          {/* Applications List */}
          {filteredApplications.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No applications found.</p>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {filteredApplications.map((application) => (
                  <li key={application.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-jet2-orange flex items-center justify-center">
                            <User className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center space-x-2">
                            <h3 className="text-sm font-medium text-gray-900">
                              {application.first_name} {application.last_name}
                            </h3>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                              {getStatusIcon(application.status)}
                              <span className="ml-1 capitalize">{application.status}</span>
                            </span>
                          </div>
                          <div className="text-sm text-gray-500">
                            <div className="flex items-center space-x-4">
                              <span className="flex items-center">
                                <Mail className="h-4 w-4 mr-1" />
                                {application.email}
                              </span>
                              <span className="flex items-center">
                                <Phone className="h-4 w-4 mr-1" />
                                {application.phone}
                              </span>
                              <span className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {new Date(application.submitted_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => openApplicationModal(application)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </button>
                        {application.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(application.id, 'approved')}
                              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(application.id, 'rejected')}
                              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDeleteApplication(application.id)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>

      {/* Application Details Modal */}
      {showModal && selectedApplication && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
            <div className="mt-3">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Application Details - {selectedApplication.first_name} {selectedApplication.last_name}
                </h3>
                <button
                  onClick={closeApplicationModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Application Status and Actions */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-md font-medium text-gray-900">Application Status</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Submitted on {new Date(selectedApplication.submitted_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedApplication.status)}`}>
                      {getStatusIcon(selectedApplication.status)}
                      <span className="ml-1 capitalize">{selectedApplication.status}</span>
                    </span>
                    {selectedApplication.status === 'pending' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleStatusUpdate(selectedApplication.id, 'approved')}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(selectedApplication.id, 'rejected')}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="bg-white border rounded-lg p-6 mb-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Personal Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedApplication.first_name} {selectedApplication.last_name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-sm text-gray-900 flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      {selectedApplication.email}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="mt-1 text-sm text-gray-900 flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      {selectedApplication.phone}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <p className="mt-1 text-sm text-gray-900 flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(selectedApplication.date_of_birth).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">NIN Number</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedApplication.nin_number}</p>
                  </div>
                </div>
              </div>

              {/* Vehicle Information */}
              <div className="bg-white border rounded-lg p-6 mb-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Car className="h-5 w-5 mr-2" />
                  Vehicle Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Make & Model</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedApplication.vehicle_make} {selectedApplication.vehicle_model}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Year</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedApplication.vehicle_year}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Color</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedApplication.vehicle_color}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Registration</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedApplication.vehicle_registration}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Owner Name</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedApplication.vehicle_owner_name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Owner Phone</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedApplication.vehicle_owner_phone}</p>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="bg-white border rounded-lg p-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Documents
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-md font-medium text-gray-700 mb-3">Driving License</h5>
                    <div className="space-y-2">
                      <button 
                        onClick={() => openLightbox(selectedApplication.driving_license_front_url, 'Driving License - Front View')}
                        className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Front View
                      </button>
                      <button 
                        onClick={() => openLightbox(selectedApplication.driving_license_back_url, 'Driving License - Back View')}
                        className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Back View
                      </button>
                      {selectedApplication.driving_license_expiry && (
                        <div className="mt-2 p-2 bg-gray-50 rounded">
                          <span className="text-sm font-medium text-gray-700">Expiry Date: </span>
                          <span className="text-sm text-gray-900">
                            {new Date(selectedApplication.driving_license_expiry).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-md font-medium text-gray-700 mb-3">Vehicle Documents</h5>
                    <div className="space-y-2">
                      <button 
                        onClick={() => openLightbox(selectedApplication.logbook_url, 'Logbook')}
                        className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Logbook
                      </button>
                      <div>
                        <button 
                          onClick={() => openLightbox(selectedApplication.vehicle_license_url, 'Vehicle License')}
                          className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Vehicle License
                        </button>
                        {selectedApplication.vehicle_license_expiry && (
                          <div className="mt-1 ml-6 p-2 bg-gray-50 rounded">
                            <span className="text-sm font-medium text-gray-700">Expiry: </span>
                            <span className="text-sm text-gray-900">
                              {new Date(selectedApplication.vehicle_license_expiry).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <button 
                          onClick={() => openLightbox(selectedApplication.mot_certificate_url, 'MOT Certificate')}
                          className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          MOT Certificate
                        </button>
                        {selectedApplication.mot_certificate_expiry && (
                          <div className="mt-1 ml-6 p-2 bg-gray-50 rounded">
                            <span className="text-sm font-medium text-gray-700">Expiry: </span>
                            <span className="text-sm text-gray-900">
                              {new Date(selectedApplication.mot_certificate_expiry).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <button 
                          onClick={() => openLightbox(selectedApplication.insurance_certificate_url, 'Insurance Certificate')}
                          className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Insurance Certificate
                        </button>
                        {selectedApplication.insurance_certificate_expiry && (
                          <div className="mt-1 ml-6 p-2 bg-gray-50 rounded">
                            <span className="text-sm font-medium text-gray-700">Expiry: </span>
                            <span className="text-sm text-gray-900">
                              {new Date(selectedApplication.insurance_certificate_expiry).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-md font-medium text-gray-700 mb-3">Other Documents</h5>
                    <div className="space-y-2">
                      <div>
                        <button 
                          onClick={() => openLightbox(selectedApplication.council_license_url, 'Council License')}
                          className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Council License
                        </button>
                        {selectedApplication.council_license_expiry && (
                          <div className="mt-1 ml-6 p-2 bg-gray-50 rounded">
                            <span className="text-sm font-medium text-gray-700">Expiry: </span>
                            <span className="text-sm text-gray-900">
                              {new Date(selectedApplication.council_license_expiry).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>
                      {selectedApplication.vehicle_rental_permission_url && (
                        <button 
                          onClick={() => openLightbox(selectedApplication.vehicle_rental_permission_url, 'Rental Permission')}
                          className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Rental Permission
                        </button>
                      )}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-md font-medium text-gray-700 mb-3">Proof of Address</h5>
                    <div className="space-y-2">
                      <button 
                        onClick={() => openLightbox(selectedApplication.proof_of_address_1_url, 'Proof of Address 1')}
                        className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Proof of Address 1
                      </button>
                      <button 
                        onClick={() => openLightbox(selectedApplication.proof_of_address_2_url, 'Proof of Address 2')}
                        className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Proof of Address 2
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => handleDeleteApplication(selectedApplication.id)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Application
                </button>
                <button
                  onClick={closeApplicationModal}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative max-w-4xl max-h-full p-4">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-2 right-2 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2"
            >
              <X className="h-6 w-6" />
            </button>
            
            {/* Image Container */}
            <div className="bg-white rounded-lg overflow-hidden">
              {/* Title */}
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">{selectedImageTitle}</h3>
              </div>
              
              {/* Image */}
              <div className="flex items-center justify-center p-4">
                <img
                  src={selectedImage}
                  alt={selectedImageTitle}
                  className="max-w-full max-h-96 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04MCAxMDBDODAgODkuNTQ0IDg4LjU0NCA4MSA5OSA4MUgxMDFDMTExLjQ1NiA4MSAxMjAgODkuNTQ0IDEyMCAxMDBDMTIwIDExMC40NTYgMTExLjQ1NiAxMTkgMTAxIDExOUg5OUM4OC41NDQgMTE5IDgwIDExMC40NTYgODAgMTAwWiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMTIwIDgxVjExOUg4MFY4MUgxMjBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjc3NDhEIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+Cjwvc3ZnPgo=';
                  }}
                />
              </div>
              
              {/* Download Button */}
              <div className="px-6 py-4 border-t border-gray-200">
                <a
                  href={selectedImage}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Download
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
