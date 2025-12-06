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
  console.log('🔍 searchNearbyPlaces called with params:', params)
  
  return new Promise((resolve, reject) => {
    if (!window.google?.maps?.places) {
      console.error('❌ Google Places library not loaded')
      reject(new Error('Google Places library not loaded'))
      return
    }

    console.log('✅ Google Places library is loaded')
    const map = new google.maps.Map(document.createElement('div'))
    const service = new google.maps.places.PlacesService(map)

    const request: google.maps.places.PlaceSearchRequest = {
      location: new google.maps.LatLng(params.location.lat, params.location.lng),
      radius: params.radius,
      keyword: params.keyword,
      type: params.type,
    }

    console.log('📍 Sending nearbySearch request:', request)

    service.nearbySearch(request, (results, status) => {
      console.log('📥 nearbySearch response:', { status, resultsCount: results?.length })
      
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        console.log('✅ Places API returned', results.length, 'results')
        console.log('First 3 results:', results.slice(0, 3).map(p => ({ name: p.name, rating: p.rating })))
        
        const businessPlaceId = results.find(place => {
          const placeLat = place.geometry?.location?.lat?.() || 0;
          const placeLng = place.geometry?.location?.lng?.() || 0;
          const distance = calculateDistance(params.location, { lat: placeLat, lng: placeLng });
          return distance < 0.05;
        })?.place_id;

        const filteredByData = results.filter(place => place.name && place.rating && place.user_ratings_total);
        console.log('After data filter:', filteredByData.length, 'places');

        const places: PlaceResult[] = filteredByData
          .filter(place => {
            // Filter out the business itself by placeId or name match, and by location proximity
            if (!place.geometry?.location) return true;
            const placeLat = place.geometry.location.lat();
            const placeLng = place.geometry.location.lng();
            const distance = calculateDistance(params.location, { lat: placeLat, lng: placeLng });
            const isSameBusiness = (businessPlaceId && place.place_id === businessPlaceId) || (place.name && place.name.trim().toLowerCase() === params.keyword.trim().toLowerCase());
            const keep = distance >= 0.05 && !isSameBusiness;
            if (!keep) {
              console.log('🚫 Filtered out (self or too close):', place.name, 'distance:', distance.toFixed(3), 'km');
            }
            return keep;
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
              return b.rating - a.rating;
            }
            return b.userRatingsTotal - a.userRatingsTotal;
          });

        console.log('✅ Returning', places.length, 'final places:', places.slice(0, 3).map(p => p.name));
        resolve(places);
      } else {
        console.error('❌ Places API error:', status)
        console.error('Status details:', {
          OK: status === google.maps.places.PlacesServiceStatus.OK,
          ZERO_RESULTS: status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS,
          OVER_QUERY_LIMIT: status === google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT,
          REQUEST_DENIED: status === google.maps.places.PlacesServiceStatus.REQUEST_DENIED,
          INVALID_REQUEST: status === google.maps.places.PlacesServiceStatus.INVALID_REQUEST,
        })
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
