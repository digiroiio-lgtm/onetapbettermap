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

const DEFAULT_CENTER = { lat: 37.7749, lng: -122.4194 }
const EMPTY_MARKERS: NonNullable<MapComponentProps['markers']> = []

export default function MapComponent({
  businessName,
  city,
  center,
  zoom = 13,
  markers,
}: MapComponentProps) {
  const resolvedCenter = center ?? DEFAULT_CENTER
  const resolvedMarkers: NonNullable<MapComponentProps['markers']> = markers ?? EMPTY_MARKERS

  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const markersRef = useRef<google.maps.Marker[]>([])
  const centerRef = useRef(resolvedCenter)
  const zoomRef = useRef(zoom)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    centerRef.current = resolvedCenter
  }, [resolvedCenter])

  useEffect(() => {
    zoomRef.current = zoom
  }, [zoom])

  useEffect(() => {
    let isMounted = true

    async function initMap() {
      try {
        setIsLoading(true)
        setError(null)

        await loadGoogleMapsScript()

        if (!isMounted || !mapRef.current) return

        const map = new google.maps.Map(mapRef.current, {
          center: centerRef.current,
          zoom: zoomRef.current,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          zoomControl: true,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'on' }],
            },
          ],
        })

        mapInstanceRef.current = map
        setMapReady(true)
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
      markersRef.current.forEach(marker => marker.setMap(null))
      markersRef.current = []
      mapInstanceRef.current = null
      setMapReady(false)
    }
  }, [])

  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current || !center) {
      return
    }
    mapInstanceRef.current.setCenter(resolvedCenter)
    if (zoom) {
      mapInstanceRef.current.setZoom(zoom)
    }
  }, [mapReady, center, resolvedCenter, zoom])

  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current) {
      return
    }

    markersRef.current.forEach(marker => marker.setMap(null))
    markersRef.current = []

    if (resolvedMarkers.length === 0) {
      return
    }

    resolvedMarkers.forEach(markerData => {
      const marker = new google.maps.Marker({
        position: markerData.position,
        map: mapInstanceRef.current!,
        title: markerData.title,
        animation: google.maps.Animation.DROP,
        icon: markerData.color
          ? { url: `http://maps.google.com/mapfiles/ms/icons/${markerData.color}-dot.png` }
          : undefined,
      })

      markersRef.current.push(marker)

      const infoWindow = new google.maps.InfoWindow({
        content: `<div style="padding: 10px;">
          <h3 style="margin: 0 0 5px 0; color: #1a73e8;">${markerData.title}</h3>
        </div>`,
      })

      marker.addListener('click', () => {
        infoWindow.open(mapInstanceRef.current!, marker)
      })
    })

    if (resolvedMarkers.length > 1) {
      const bounds = new google.maps.LatLngBounds()
      resolvedMarkers.forEach(markerData => bounds.extend(markerData.position))
      mapInstanceRef.current.fitBounds(bounds)
    } else if (resolvedMarkers[0]) {
      mapInstanceRef.current.setCenter(resolvedMarkers[0].position)
    }
  }, [mapReady, resolvedMarkers])

  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current) {
      return
    }
    if (center || resolvedMarkers.length > 0 || !businessName || !city) {
      return
    }

    const map = mapInstanceRef.current
    const geocoder = new google.maps.Geocoder()
    const address = `${businessName}, ${city}`

    console.log('MapComponent geocoding address:', address)

    geocoder.geocode({ address }, (results, status) => {
      if (!mapInstanceRef.current) {
        return
      }

      console.log('MapComponent geocoding status:', status, 'Results:', results?.length)

      markersRef.current.forEach(marker => marker.setMap(null))
      markersRef.current = []

      if (status === 'OK' && results && results[0]) {
        const location = results[0].geometry.location
        console.log('MapComponent setting center to:', location.lat(), location.lng())
        map.setCenter(location)
        map.setZoom(15)

        const marker = new google.maps.Marker({
          position: location,
          map,
          title: businessName,
          animation: google.maps.Animation.BOUNCE,
          icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
            scaledSize: new google.maps.Size(50, 50),
          },
        })

        const infoWindow = new google.maps.InfoWindow({
          content: `<div style="padding: 10px;">
            <h3 style="margin: 0 0 5px 0; color: #1a73e8;">${businessName}</h3>
            <p style="margin: 0; color: #666;">${results[0].formatted_address}</p>
          </div>`,
        })

        marker.addListener('click', () => {
          infoWindow.open(map, marker)
        })

        markersRef.current.push(marker)

        setTimeout(() => {
          marker.setAnimation(null)
        }, 3000)
      } else {
        console.error('Geocoding failed:', status)
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
  }, [mapReady, center, resolvedMarkers, businessName, city])

  if (error) {
    const isMissingApiKey = error.toLowerCase().includes('api key')
    return (
      <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-2xl mb-2">🗺️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {isMissingApiKey ? 'Google Maps API Key Required' : 'Map Loading Error'}
          </h3>
          <p className="text-sm text-gray-600 max-w-sm">
            {isMissingApiKey
              ? 'Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your environment variables.'
              : error}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Loading map...</p>
          </div>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full" />
    </div>
  )
}
