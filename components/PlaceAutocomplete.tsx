'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { loadGoogleMapsScript } from '@/lib/googleMapsLoader'

interface PlaceAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult) => void
  placeholder?: string
  className?: string
  types?: string[]
  value?: string
  onInputChange?: (value: string) => void
  startIcon?: ReactNode
  required?: boolean
}

export default function PlaceAutocomplete({
  onPlaceSelect,
  placeholder = 'Search for your business...',
  className = '',
  types = ['establishment'],
  value,
  onInputChange,
  startIcon = '🏢',
  required = false,
}: PlaceAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function initScript() {
      if (window.google?.maps?.places) {
        setIsLoaded(true)
        return
      }

      try {
        await loadGoogleMapsScript()
        if (isMounted) {
          setIsLoaded(true)
        }
      } catch (err) {
        console.error('Failed to load Google Places script', err)
        if (isMounted) {
          setError('Google Autocomplete failed to load')
        }
      }
    }

    initScript()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
  if (!isLoaded || !inputRef.current || !window.google?.maps?.places) return

  const elementOptions = {
    input: inputRef.current,
    types,
    fields: ['name', 'formatted_address', 'place_id', 'geometry', 'address_components', 'business_status'],
  }

  const autocompleteElement = new google.maps.places.PlaceAutocompleteElement(elementOptions)

  const onPlaceChanged = () => {
    const place = autocompleteElement.getPlace()
    if (!place) return
    if (place.name) {
      onInputChange?.(place.name)
    }
    onPlaceSelect(place)
  }

  const listener = autocompleteElement.addListener('place_changed', onPlaceChanged)

  return () => {
    listener?.remove()
  }
  }, [isLoaded, onPlaceSelect, onInputChange, types])

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onInputChange?.(e.target.value)}
        placeholder={placeholder}
        className={className}
        required={required}
        aria-invalid={!!error}
      />
      {startIcon && (
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
          {startIcon}
        </div>
      )}
      {!isLoaded && !error && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {error && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500" title={error}>
          !
        </div>
      )}
    </div>
  )
}
