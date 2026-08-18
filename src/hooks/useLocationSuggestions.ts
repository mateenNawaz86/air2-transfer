import { useState, useEffect, useCallback } from 'react'
import { getPlaceSuggestions } from '@/lib/googleMaps'

export interface LocationSuggestion {
  description: string
  place_id: string
}

export const useLocationSuggestions = (input: string, enabled: boolean = true) => {
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchSuggestions = useCallback(async (query: string) => {
    if (!query.trim() || !enabled) {
      setSuggestions([])
      return
    }

    setLoading(true)
    setError(null)

    try {
      const predictions = await getPlaceSuggestions(query)
      const formattedSuggestions = predictions.map(prediction => ({
        description: prediction.description,
        place_id: prediction.place_id
      }))
      setSuggestions(formattedSuggestions)
    } catch (err) {
      setError('Failed to fetch location suggestions')
      setSuggestions([])
    } finally {
      setLoading(false)
    }
  }, [enabled])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchSuggestions(input)
    }, 300) // Debounce for 300ms

    return () => clearTimeout(timeoutId)
  }, [input, fetchSuggestions])

  return {
    suggestions,
    loading,
    error,
    clearSuggestions: () => setSuggestions([])
  }
}
