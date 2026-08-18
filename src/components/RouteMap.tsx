'use client'

import { useEffect, useRef, useState } from 'react'
import { initializeGoogleMaps } from '@/lib/googleMaps'

interface RouteMapProps {
  pickupLocation: string
  dropoffLocation: string
  distance?: number
  duration?: number
}

// Helper function to improve location input for better API results
const improveLocationInput = (location: string): string => {
  // Add common suffixes if not present
  if (!location.toLowerCase().includes('uk') && !location.toLowerCase().includes('united kingdom')) {
    return `${location}, UK`
  }
  return location
}

export default function RouteMap({ pickupLocation, dropoffLocation, distance, duration }: RouteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null)
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initializeMap = async () => {
      if (!pickupLocation || !dropoffLocation || !mapRef.current) return

      setLoading(true)
      setError(null)

      try {
        const googleMaps = await initializeGoogleMaps()
        
        // Initialize map
        const mapInstance = new googleMaps.maps.Map(mapRef.current, {
          zoom: 10,
          center: { lat: 51.5074, lng: -0.1278 }, // Default to London
          mapTypeId: googleMaps.maps.MapTypeId.ROADMAP,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        })

        // Initialize directions service and renderer
        const directionsServiceInstance = new googleMaps.maps.DirectionsService()
        const directionsRendererInstance = new googleMaps.maps.DirectionsRenderer({
          map: mapInstance,
          suppressMarkers: false,
          polylineOptions: {
            strokeColor: '#f97316', // jet2-orange color
            strokeWeight: 4,
            strokeOpacity: 0.8
          },
          markerOptions: {
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="12" fill="#f97316" stroke="#fff" stroke-width="2"/>
                  <text x="16" y="20" text-anchor="middle" fill="white" font-size="12" font-weight="bold">A</text>
                </svg>
              `)
            }
          }
        })

        setMap(mapInstance)
        setDirectionsService(directionsServiceInstance)
        setDirectionsRenderer(directionsRendererInstance)

        // Calculate and display route
        const improvedOrigin = improveLocationInput(pickupLocation)
        const improvedDestination = improveLocationInput(dropoffLocation)
        
        directionsServiceInstance.route(
          {
            origin: improvedOrigin,
            destination: improvedDestination,
            travelMode: googleMaps.maps.TravelMode.DRIVING,
            avoidHighways: false,
            avoidTolls: false,
          },
          (result, status) => {
            if (status === googleMaps.maps.DirectionsStatus.OK && result) {
              directionsRendererInstance.setDirections(result)
              
              // Fit map to show entire route
              const bounds = new googleMaps.maps.LatLngBounds()
              result.routes[0].legs.forEach(leg => {
                bounds.extend(leg.start_location)
                bounds.extend(leg.end_location)
              })
              mapInstance.fitBounds(bounds)
            } else {
              // Handle specific error cases
              let errorMessage = 'Route calculation failed'
              switch (status) {
                case 'NOT_FOUND':
                  errorMessage = 'One or both locations could not be found. Please check the addresses and try again.'
                  break
                case 'ZERO_RESULTS':
                  errorMessage = 'No route found between the specified locations.'
                  break
                case 'MAX_WAYPOINTS_EXCEEDED':
                  errorMessage = 'Too many waypoints in the route.'
                  break
                case 'INVALID_REQUEST':
                  errorMessage = 'Invalid request parameters.'
                  break
                case 'OVER_QUERY_LIMIT':
                  errorMessage = 'Query limit exceeded. Please try again later.'
                  break
                case 'REQUEST_DENIED':
                  errorMessage = 'Request denied. Please check your API key.'
                  break
                case 'UNKNOWN_ERROR':
                  errorMessage = 'An unknown error occurred. Please try again.'
                  break
                default:
                  errorMessage = `Route calculation failed: ${status}`
              }
              
              // Try to show basic markers even if route fails
              try {
                const geocoder = new googleMaps.maps.Geocoder()
                
                // Geocode pickup location
                geocoder.geocode({ address: improvedOrigin }, (results, status) => {
                  if (status === 'OK' && results && results[0]) {
                    new googleMaps.maps.Marker({
                      position: results[0].geometry.location,
                      map: mapInstance,
                      title: 'Pickup Location',
                      icon: {
                        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                          <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="16" cy="16" r="12" fill="#f97316" stroke="#fff" stroke-width="2"/>
                            <text x="16" y="20" text-anchor="middle" fill="white" font-size="12" font-weight="bold">A</text>
                          </svg>
                        `)
                      }
                    })
                    mapInstance.setCenter(results[0].geometry.location)
                  }
                })
                
                // Geocode dropoff location
                geocoder.geocode({ address: improvedDestination }, (results, status) => {
                  if (status === 'OK' && results && results[0]) {
                    new googleMaps.maps.Marker({
                      position: results[0].geometry.location,
                      map: mapInstance,
                      title: 'Dropoff Location',
                      icon: {
                        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                          <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="16" cy="16" r="12" fill="#dc2626" stroke="#fff" stroke-width="2"/>
                            <text x="16" y="20" text-anchor="middle" fill="white" font-size="12" font-weight="bold">B</text>
                          </svg>
                        `)
                      }
                    })
                  }
                })
              } catch (geocodeError) {
                console.error('Geocoding failed:', geocodeError)
              }
              
              setError(errorMessage)
            }
          }
        )

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize map')
      } finally {
        setLoading(false)
      }
    }

    initializeMap()
  }, [pickupLocation, dropoffLocation])

  if (!pickupLocation || !dropoffLocation) {
    return (
      <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-2">🗺️</div>
          <p>Enter pickup and dropoff locations to see the route</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Map Container */}
      <div className="relative">
        <div 
          ref={mapRef} 
          className="w-full h-64 rounded-lg border border-gray-200"
        />
        
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-jet2-orange mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Loading route...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute top-2 left-2 right-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-start">
              <div className="text-yellow-600 mr-2">⚠️</div>
              <div className="text-sm text-yellow-800">
                <p className="font-medium">Route not available</p>
                <p className="text-xs mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Route Information */}
      {(distance || duration) && (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            {distance && (
              <div className="text-center">
                <div className="font-semibold text-gray-900">{distance.toFixed(1)} miles</div>
                <div className="text-gray-600">Distance</div>
              </div>
            )}
            {duration && (
              <div className="text-center">
                <div className="font-semibold text-gray-900">{Math.round(duration)} min</div>
                <div className="text-gray-600">Duration</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
