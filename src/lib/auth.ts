import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://gvfnxloqyvmaxaxjewna.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Client-side Supabase client (for use in client components)
export const createClient = () => {
  // Debug logging
  console.log('Creating Supabase client with:', {
    url: supabaseUrl,
    hasKey: !!supabaseKey,
    keyLength: supabaseKey.length
  })

  if (!supabaseKey) {
    console.error('Supabase key is missing!')
    // Return a mock client if no key is provided (for development)
    return {
      auth: {
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        signInWithPassword: () => Promise.resolve({ data: { user: null }, error: { message: 'Supabase not configured' } }),
        signUp: () => Promise.resolve({ data: { user: null }, error: { message: 'Supabase not configured' } }),
        signOut: () => Promise.resolve({ error: null })
      },
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
  
  try {
    const client = createBrowserClient(supabaseUrl, supabaseKey)
    console.log('Supabase client created successfully')
    return client
  } catch (error) {
    console.error('Error creating Supabase client:', error)
    throw error
  }
}

// Authentication types
export interface User {
  id: string
  email: string
  role: 'driver' | 'admin' | 'client'
  created_at: string
}

export interface AuthState {
  user: User | null
  loading: boolean
}
