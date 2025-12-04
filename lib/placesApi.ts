// Google Places API integration for competitor analysis

export interface PlaceResult {
  name: string
  rating: number
  userRatingsTotal: number
  vicinity: string
  placeId: string
  geometry: {
    location: {
      lat: number
      lng: number
    }
  }
  businessStatus?: string
}

export interface NearbySearchParams {
  location: { lat: number; lng: number }
  radius: number
  keyword: string
  type?: string
}

export async function searchNearbyPlaces(
  params: NearbySearchParams
): Promise<PlaceResult[]> {
  return new Promise((resolve, reject) => {
    if (!window.google?.maps?.places) {
      reject(new Error('Google Places library not loaded'))
      return
    }

    const map = new google.maps.Map(document.createElement('div'))
    const service = new google.maps.places.PlacesService(map)

    const request: google.maps.places.PlaceSearchRequest = {
      location: new google.maps.LatLng(params.location.lat, params.location.lng),
      radius: params.radius,
      keyword: params.keyword,
      type: params.type,
    }

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const places: PlaceResult[] = results
          .filter(place => place.name && place.rating && place.user_ratings_total)
          .filter(place => {
            // Filter out the business itself based on location proximity
            if (!place.geometry?.location) return true
            
            const placeLat = place.geometry.location.lat()
            const placeLng = place.geometry.location.lng()
            const distance = calculateDistance(
              params.location.lat,
              params.location.lng,
              placeLat,
              placeLng
            )
            
            // Remove if within 50 meters (likely same business)
            return distance >= 0.05
          })
          .map(place => ({
            name: place.name || '',
            rating: place.rating || 0,
            userRatingsTotal: place.user_ratings_total || 0,
            vicinity: place.vicinity || '',
            placeId: place.place_id || '',
            geometry: {
              location: {
                lat: place.geometry?.location?.lat() || 0,
                lng: place.geometry?.location?.lng() || 0,
              }
            },
            businessStatus: place.business_status,
          }))
          .sort((a, b) => {
            // Sort by rating first, then by review count
            if (b.rating !== a.rating) {
              return b.rating - a.rating
            }
            return b.userRatingsTotal - a.userRatingsTotal
          })

        resolve(places)
      } else {
        reject(new Error(`Places search failed: ${status}`))
      }
    })
  })
}

export interface PlaceDetails {
  name: string
  rating: number
  userRatingsTotal: number
  formattedAddress: string
  formattedPhoneNumber?: string
  website?: string
  openingHours?: {
    weekdayText: string[]
  }
  photos?: google.maps.places.PlacePhoto[]
  reviews?: google.maps.places.PlaceReview[]
}

export async function getPlaceDetails(placeId: string): Promise<PlaceDetails | null> {
  return new Promise((resolve, reject) => {
    if (!window.google?.maps?.places) {
      reject(new Error('Google Places library not loaded'))
      return
    }

    const map = new google.maps.Map(document.createElement('div'))
    const service = new google.maps.places.PlacesService(map)

    const request: google.maps.places.PlaceDetailsRequest = {
      placeId: placeId,
      fields: [
        'name',
        'rating',
        'user_ratings_total',
        'formatted_address',
        'formatted_phone_number',
        'website',
        'opening_hours',
        'photos',
        'reviews',
      ],
    }

    service.getDetails(request, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && place) {
        resolve({
          name: place.name || '',
          rating: place.rating || 0,
          userRatingsTotal: place.user_ratings_total || 0,
          formattedAddress: place.formatted_address || '',
          formattedPhoneNumber: place.formatted_phone_number,
          website: place.website,
          openingHours: place.opening_hours ? {
            weekdayText: place.opening_hours.weekday_text || []
          } : undefined,
          photos: place.photos,
          reviews: place.reviews,
        })
      } else {
        resolve(null)
      }
    })
  })
}

export function calculateDistance(
  point1: { lat: number; lng: number },
  point2: { lat: number; lng: number }
): number {
  if (!window.google?.maps?.geometry) {
    return 0
  }

  const from = new google.maps.LatLng(point1.lat, point1.lng)
  const to = new google.maps.LatLng(point2.lat, point2.lng)
  
  return google.maps.geometry.spherical.computeDistanceBetween(from, to)
}
