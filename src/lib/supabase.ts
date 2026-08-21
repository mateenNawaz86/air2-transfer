import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Create a mock client if no key is provided (for build time and development)
const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseKey) {
    // Return a mock client for build time and development without keys
    return {
      from: () => ({
        select: () => Promise.resolve({ data: [], error: null }),
        insert: () => Promise.resolve({ data: null, error: null }),
        update: () => Promise.resolve({ data: null, error: null }),
        delete: () => Promise.resolve({ data: null, error: null })
      }),
      storage: {
        from: () => ({
          upload: () => Promise.resolve({ data: null, error: null }),
          getPublicUrl: () => ({ data: { publicUrl: '' } })
        })
      }
    } as any
  }
  
  return createClient(supabaseUrl, supabaseKey)
}

export const supabase = createSupabaseClient()

// Database types
export interface Driver {
  id: string
  created_at: string
  email: string
  first_name: string
  last_name: string
  phone: string
  date_of_birth: string
  address: string
  city: string
  postcode: string
  nin_number: string
  council_license: string
  vehicle_owner_permission?: string
  proof_of_address_1: string
  proof_of_address_2: string
  driving_license_front: string
  driving_license_back: string
  council_driver_license: string
  logbook_pages: string[]
  vehicle_council_license: string
  mot_certificate: string
  insurance_certificate: string
  status: 'pending' | 'approved' | 'rejected'
  admin_notes?: string
}

export interface Booking {
  id: string
  created_at: string
  client_id: string
  pickup_location: string
  dropoff_location: string
  pickup_time: string
  price: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  driver_id?: string
  // New fields for Google Maps integration
  service_type?: 'economy-student' | 'comfort' | 'executive' | 'executive-business' | 'excel' | 'executive-business-excel'
  distance?: number
  duration?: number // Duration in minutes (can be decimal)
  passengers?: number
  special_requests?: string
}

export interface Vehicle {
  id: string
  name: string
  type: string
  description: string
  image_url: string
  hourly_rate: number
  per_mile_rate: number
  available: boolean
}
