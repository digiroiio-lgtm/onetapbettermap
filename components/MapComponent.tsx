'use client'

import { useEffect, useRef, useState } from 'react'
import { loadGoogleMapsScript } from '@/lib/googleMapsLoader'

interface MapComponentProps {
  businessName: string
  city: string
  center?: { lat: number; lng: number }
  zoom?: number
  markers?: Array<{
    position: { lat: number; lng: number }
    title?: string
    color?: 'red' | 'green' | 'yellow' | 'blue'
  }>
}

export default function MapComponent({ 
  businessName, 
  city, 
  center = { lat: 37.7749, lng: -122.4194 }, // Default: San Francisco
  zoom = 13,
  markers = []
}: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const markersRef = useRef<google.maps.Marker[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function initMap() {
      try {
        setIsLoading(true)
        setError(null)

        // Load Google Maps script
        await loadGoogleMapsScript()

        if (!isMounted || !mapRef.current) return

        // Initialize map
        const map = new google.maps.Map(mapRef.current, {
          center,
          zoom,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          zoomControl: true,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'on' }]
            }
          ]
        })

        mapInstanceRef.current = map

        // Clear existing markers
        markersRef.current.forEach(marker => marker.setMap(null))
        markersRef.current = []

        // Add markers
        markers.forEach(markerData => {
          const marker = new google.maps.Marker({
            position: markerData.position,
            map,
            title: markerData.title || businessName,
            animation: google.maps.Animation.DROP,
            icon: markerData.color ? {
              url: `http://maps.google.com/mapfiles/ms/icons/${markerData.color}-dot.png`
            } : undefined
          })

          markersRef.current.push(marker)
        })

        // If no markers provided, try to geocode the business
        if (markers.length === 0 && businessName && city) {
          const geocoder = new google.maps.Geocoder()
          const address = `${businessName}, ${city}, Turkey`
          
          console.log('MapComponent geocoding address:', address)
          
          geocoder.geocode({ 
            address,
            region: 'TR',
            componentRestrictions: {
              country: 'TR'
            }
          }, (results, status) => {
            console.log('MapComponent geocoding status:', status, 'Results:', results?.length)
            
            if (status === 'OK' && results && results[0]) {
              const location = results[0].geometry.location
              console.log('MapComponent setting center to:', location.lat(), location.lng())
              map.setCenter(location)
              map.setZoom(15) // Closer zoom for business location
              
              const marker = new google.maps.Marker({
                position: location,
                map,
                title: businessName,
                animation: google.maps.Animation.BOUNCE,
                icon: {
                  url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                  scaledSize: new google.maps.Size(50, 50)
                }
              })

              // Info window with business details
              const infoWindow = new google.maps.InfoWindow({
                content: `<div style="padding: 10px;">
                  <h3 style="margin: 0 0 5px 0; color: #1a73e8;">${businessName}</h3>
                  <p style="margin: 0; color: #666;">${results[0].formatted_address}</p>
                </div>`
              })

              marker.addListener('click', () => {
                infoWindow.open(map, marker)
              })

              markersRef.current.push(marker)

              // Stop bouncing after 3 seconds
              setTimeout(() => {
                marker.setAnimation(null)
              }, 3000)
            } else {
              console.error('Geocoding failed:', status)
              // Fallback: try just the city
              if (city) {
                geocoder.geocode({ address: city }, (cityResults, cityStatus) => {
                  if (cityStatus === 'OK' && cityResults && cityResults[0]) {
                    map.setCenter(cityResults[0].geometry.location)
                    map.setZoom(12)
                  }
                })
              }
            }
          })
        }

        setIsLoading(false)
      } catch (err) {
        console.error('Error loading map:', err)
        setError(err instanceof Error ? err.message : 'Failed to load map')
        setIsLoading(false)
      }
    }

    initMap()

    return () => {
      isMounted = false
      // Cleanup markers
      markersRef.current.forEach(marker => marker.setMap(null))
      markersRef.current = []
    }
  }, [businessName, city, zoom]) // Remove center and markers from dependencies

  // Separate effect to update center when it changes
  useEffect(() => {
    if (mapInstanceRef.current && center) {
      console.log('Updating map center to:', center)
      mapInstanceRef.current.setCenter(center)
      if (zoom) {
        mapInstanceRef.current.setZoom(zoom)
      }
    }
  }, [center.lat, center.lng, zoom])

  // Separate effect to update markers when they change
  useEffect(() => {
    if (mapInstanceRef.current && markers.length > 0) {
      console.log('Updating markers:', markers.length)
      
      // Clear existing markers
      markersRef.current.forEach(marker => marker.setMap(null))
      markersRef.current = []

      // Add new markers
      markers.forEach(markerData => {
        const marker = new google.maps.Marker({
          position: markerData.position,
          map: mapInstanceRef.current!,
          title: markerData.title,
          animation: google.maps.Animation.DROP,
          icon: markerData.color ? {
            url: `http://maps.google.com/mapfiles/ms/icons/${markerData.color}-dot.png`
          } : undefined
        })

        markersRef.current.push(marker)

        // Add click listener for info window
        const infoWindow = new google.maps.InfoWindow({
          content: `<div style="padding: 10px;">
            <h3 style="margin: 0 0 5px 0; color: #1a73e8;">${markerData.title}</h3>
          </div>`
        })

        marker.addListener('click', () => {
          infoWindow.open(mapInstanceRef.current!, marker)
        })
      })

      // Fit bounds to show all markers
      if (markers.length > 1) {
        const bounds = new google.maps.LatLngBounds()
        markers.forEach(m => bounds.extend(m.position))
        mapInstanceRef.current!.fitBounds(bounds)
      }
    }
  }, [markers])

  if (error) {
    return (
      <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center p-4">
        <div className="text-center">
          <svg className="w-12 h-12 text-red-500 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <p className="text-red-600 font-medium">Failed to load map</p>
          <p className="text-sm text-gray-600 mt-1">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center z-10">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      )}
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-lg shadow-lg"
        style={{ minHeight: '400px' }}
      />
    </div>
  )
}
