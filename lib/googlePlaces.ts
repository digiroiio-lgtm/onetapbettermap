import axios from 'axios'
import type { PlacesNearbyResult, PlaceDetails } from '@/types/database'

const GOOGLE_PLACES_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!
const PLACES_NEARBY_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
const PLACE_DETAILS_URL = 'https://maps.googleapis.com/maps/api/place/details/json'

export interface NearbySearchParams {
  location: string // "lat,lng"
  radius?: number // meters, default 1000
  keyword?: string
  type?: string
}

export interface NearbySearchResponse {
  results: PlacesNearbyResult[]
  status: string
  next_page_token?: string
}

/**
 * Search for places nearby a location
 */
export async function searchNearbyPlaces(
  params: NearbySearchParams
): Promise<NearbySearchResponse> {
  try {
    const response = await axios.get(PLACES_NEARBY_URL, {
      params: {
        location: params.location,
        radius: params.radius || 1000,
        keyword: params.keyword,
        type: params.type,
        key: GOOGLE_PLACES_API_KEY,
      },
    })

    return response.data
  } catch (error) {
    console.error('Google Places API Error:', error)
    throw new Error('Failed to fetch nearby places')
  }
}

/**
 * Get detailed information about a place
 */
export async function getPlaceDetails(placeId: string): Promise<PlaceDetails | null> {
  try {
    const response = await axios.get(PLACE_DETAILS_URL, {
      params: {
        place_id: placeId,
        fields: 'place_id,name,rating,user_ratings_total,types,photos,geometry,business_status,opening_hours,website,formatted_address,international_phone_number',
        key: GOOGLE_PLACES_API_KEY,
      },
    })

    if (response.data.status === 'OK') {
      return response.data.result
    }

    return null
  } catch (error) {
    console.error('Google Place Details API Error:', error)
    return null
  }
}

/**
 * Find rank of a specific business in nearby search results
 */
export async function findBusinessRank(
  businessName: string,
  location: string,
  keyword: string,
  radius: number = 5000
): Promise<number | null> {
  try {
    const response = await searchNearbyPlaces({
      location,
      keyword,
      radius,
    })

    if (response.status !== 'OK') {
      return null
    }

    // Normalize business name for comparison
    const normalizedTarget = businessName.toLowerCase().trim()

    const rank = response.results.findIndex((place) => {
      const placeName = place.name.toLowerCase().trim()
      return placeName.includes(normalizedTarget) || normalizedTarget.includes(placeName)
    })

    return rank !== -1 ? rank + 1 : null // 1-indexed
  } catch (error) {
    console.error('Error finding business rank:', error)
    return null
  }
}

/**
 * Rate limiting helper
 */
export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Batch process with rate limiting
 * Google Places API: 50 requests per second
 */
export async function batchProcessWithRateLimit<T, R>(
  items: T[],
  processor: (item: T) => Promise<R>,
  requestsPerSecond: number = 10
): Promise<R[]> {
  const results: R[] = []
  const delayMs = 1000 / requestsPerSecond

  for (const item of items) {
    const result = await processor(item)
    results.push(result)
    await delay(delayMs)
  }

  return results
}
