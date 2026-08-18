'use client'

import { useState, useRef, useEffect } from 'react'
import { MapPin, Loader2 } from 'lucide-react'
import { useLocationSuggestions } from '@/hooks/useLocationSuggestions'

interface LocationInputProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
  label: string
  required?: boolean
}

export default function LocationInput({ 
  value, 
  onChange, 
  placeholder, 
  label, 
  required = false 
}: LocationInputProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  
  const { suggestions, loading, clearSuggestions } = useLocationSuggestions(value, isOpen)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    onChange(newValue)
    setIsOpen(true)
    setSelectedIndex(-1)
  }

  const handleSuggestionClick = (suggestion: { description: string; place_id: string }) => {
    onChange(suggestion.description)
    setIsOpen(false)
    clearSuggestions()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex])
        }
        break
      case 'Escape':
        setIsOpen(false)
        setSelectedIndex(-1)
        break
    }
  }

  const handleBlur = () => {
    // Delay closing to allow for suggestion clicks
    setTimeout(() => {
      setIsOpen(false)
      setSelectedIndex(-1)
    }, 200)
  }

  const handleFocus = () => {
    if (value.trim()) {
      setIsOpen(true)
    }
  }

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={handleFocus}
          required={required}
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-jet2-orange focus:border-transparent"
          placeholder={placeholder}
          autoComplete="off"
        />
        <MapPin className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
        {loading && (
          <Loader2 className="h-4 w-4 text-gray-400 absolute right-3 top-3 animate-spin" />
        )}
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && (suggestions.length > 0 || loading) && (
        <ul
          ref={listRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {loading ? (
            <li className="px-3 py-2 text-gray-500 flex items-center">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Loading suggestions...
            </li>
          ) : suggestions.length === 0 ? (
            <li className="px-3 py-2 text-gray-500">No suggestions found</li>
          ) : (
            suggestions.map((suggestion, index) => (
              <li
                key={suggestion.place_id}
                className={`px-3 py-2 cursor-pointer hover:bg-gray-50 ${
                  index === selectedIndex ? 'bg-jet2-orange bg-opacity-10' : ''
                }`}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-900 truncate">
                    {suggestion.description}
                  </span>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}
