import { Loader } from '@googlemaps/js-api-loader'

// Service types with pricing
export const SERVICE_TYPES = {
  'economy-student': {
    name: 'Economy Student',
    pickupFee: 5,
    perMileRate: 2,
    description: 'Affordable option for students'
  },
  'comfort': {
    name: 'Comfort',
    pickupFee: 10,
    perMileRate: 2,
    description: 'Standard comfortable ride'
  },
  'executive': {
    name: 'Executive',
    pickupFee: 20,
    perMileRate: 2,
    description: 'Premium executive service'
  },
  'executive-business': {
    name: 'Executive Business',
    pickupFee: 20,
    perMileRate: 2.5,
    description: 'Business class executive service'
  },
  'excel': {
    name: 'XL',
    pickupFee: 25,
    perMileRate: 3,
    description: 'Luxury XL service'
  },
  'executive-business-excel': {
    name: 'Executive Business (XL)',
    pickupFee: 25,
    perMileRate: 3,
    description: 'Premium business XL service'
  }
} as const

export type ServiceType = keyof typeof SERVICE_TYPES

// Google Maps API configuration
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY


if (!GOOGLE_MAPS_API_KEY) {
  console.warn('Google Maps API key not found. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your environment variables.')
}

let mapsLoader: Loader | null = null
let mapsInstance: typeof google | null = null

// Initialize Google Maps
export const initializeGoogleMaps = async (): Promise<typeof google> => {
  if (mapsInstance) {
    return mapsInstance
  }

  if (!GOOGLE_MAPS_API_KEY) {
    throw new Error('Google Maps API key is required')
  }

  if (!mapsLoader) {
    mapsLoader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      version: 'weekly',
      libraries: ['places', 'geometry']
    })
  }

  try {
    mapsInstance = await mapsLoader.load()
    return mapsInstance
  } catch (error) {
    console.error('Error loading Google Maps:', error)
    throw error
  }
}

// Helper function to improve location input for better API results
const improveLocationInput = (location: string): string => {
  // Add common suffixes if not present
  if (!location.toLowerCase().includes('uk') && !location.toLowerCase().includes('united kingdom')) {
    return `${location}, UK`
  }
  return location
}

// Get distance between two points
export const getDistance = async (
  origin: string,
  destination: string
): Promise<{ distance: number; duration: number }> => {
  try {
    const google = await initializeGoogleMaps()
    
    // Validate inputs
    if (!origin.trim() || !destination.trim()) {
      throw new Error('Both origin and destination must be provided')
    }
    
    // Improve location inputs for better API results
    const improvedOrigin = improveLocationInput(origin)
    const improvedDestination = improveLocationInput(destination)
    
    const service = new google.maps.DistanceMatrixService()
    
    return new Promise((resolve, reject) => {
      service.getDistanceMatrix(
        {
          origins: [improvedOrigin],
          destinations: [improvedDestination],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.IMPERIAL,
          avoidHighways: false,
          avoidTolls: false,
        },
        (response, status) => {
          if (status === google.maps.DistanceMatrixStatus.OK && response) {
            const element = response.rows[0].elements[0]
            
            if (element.status === google.maps.DistanceMatrixElementStatus.OK) {
              const distance = element.distance.value / 1609.34 // Convert meters to miles
              const duration = element.duration.value / 60 // Convert seconds to minutes
              resolve({ distance, duration })
            } else {
              console.error('Element status not OK:', element.status)
              
              // Handle specific error cases
              let errorMessage = 'Unable to calculate distance'
              switch (element.status) {
                case 'NOT_FOUND':
                  errorMessage = 'One or both locations could not be found. Please check the addresses and try again.'
                  break
                case 'ZERO_RESULTS':
                  errorMessage = 'No route found between the specified locations.'
                  break
                default:
                  errorMessage = `Distance calculation failed: ${element.status}`
              }
              
              reject(new Error(errorMessage))
            }
          } else {
            console.error('Distance matrix failed:', status)
            reject(new Error(`Distance calculation failed: ${status}`))
          }
        }
      )
    })
  } catch (error) {
    console.error('Error calculating distance:', error)
    throw error
  }
}

// Get place suggestions
export const getPlaceSuggestions = async (input: string): Promise<google.maps.places.AutocompletePrediction[]> => {
  try {
    const google = await initializeGoogleMaps()
    
    return new Promise((resolve, reject) => {
      const service = new google.maps.places.AutocompleteService()
      
      service.getPlacePredictions(
        {
          input,
          types: ['establishment', 'geocode'],
          componentRestrictions: { country: 'uk' } // Restrict to UK
        },
        (predictions, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
            resolve(predictions)
          } else {
            resolve([])
          }
        }
      )
    })
  } catch (error) {
    console.error('Error getting place suggestions:', error)
    return []
  }
}

// Calculate price based on service type and distance
export const calculatePrice = (serviceType: ServiceType, distance: number): number => {
  const service = SERVICE_TYPES[serviceType]
  return Math.round((service.pickupFee + (distance * service.perMileRate)) * 100) / 100
}
