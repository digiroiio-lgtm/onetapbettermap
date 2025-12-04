import { searchNearbyPlaces, getPlaceDetails } from './googlePlaces'
import type { PlacesNearbyResult, CompetitorMetrics } from '@/types/database'

export interface CompetitorData {
  place_id: string
  name: string
  rating: number | null
  review_count: number | null
  photos_count: number | null
  categories: string[]
  website: string | null
  has_hours: boolean
  business_status: string | null
}

/**
 * Fetch competitor data from a location
 */
export async function fetchCompetitors(
  lat: number,
  lng: number,
  keyword: string,
  radius: number = 5000,
  maxResults: number = 20
): Promise<CompetitorData[]> {
  const location = `${lat},${lng}`

  try {
    const response = await searchNearbyPlaces({
      location,
      keyword,
      radius,
    })

    if (response.status !== 'OK') {
      throw new Error(`Places API returned status: ${response.status}`)
    }

    // Take top N results
    const places = response.results.slice(0, maxResults)

    // Transform to CompetitorData
    const competitors: CompetitorData[] = places.map((place) => ({
      place_id: place.place_id,
      name: place.name,
      rating: place.rating || null,
      review_count: place.user_ratings_total || null,
      photos_count: place.photos?.length || 0,
      categories: place.types || [],
      website: place.website || null,
      has_hours: !!place.opening_hours,
      business_status: place.business_status || null,
    }))

    return competitors
  } catch (error) {
    console.error('Error fetching competitors:', error)
    throw error
  }
}

/**
 * Analyze competitor metrics
 */
export function analyzeCompetitors(competitors: CompetitorData[]): CompetitorMetrics {
  if (competitors.length === 0) {
    return {
      avg_rating: 0,
      avg_reviews: 0,
      avg_photos: 0,
      common_categories: [],
      top_competitors: [],
    }
  }

  // Calculate averages
  const totalRating = competitors.reduce((sum, c) => sum + (c.rating || 0), 0)
  const totalReviews = competitors.reduce((sum, c) => sum + (c.review_count || 0), 0)
  const totalPhotos = competitors.reduce((sum, c) => sum + (c.photos_count || 0), 0)

  const validRatings = competitors.filter((c) => c.rating !== null).length
  const validReviews = competitors.filter((c) => c.review_count !== null).length
  const validPhotos = competitors.filter((c) => c.photos_count !== null).length

  const avg_rating = validRatings > 0 ? totalRating / validRatings : 0
  const avg_reviews = validReviews > 0 ? totalReviews / validReviews : 0
  const avg_photos = validPhotos > 0 ? totalPhotos / validPhotos : 0

  // Find common categories
  const categoryCount = new Map<string, number>()
  competitors.forEach((c) => {
    c.categories.forEach((cat) => {
      categoryCount.set(cat, (categoryCount.get(cat) || 0) + 1)
    })
  })

  const common_categories = Array.from(categoryCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([cat]) => cat)

  // Top 3 competitors by rating and reviews
  const top_competitors = competitors
    .slice(0, 3)
    .map((c, index) => ({
      name: c.name,
      rating: c.rating || 0,
      review_count: c.review_count || 0,
      rank: index + 1,
    }))

  return {
    avg_rating: Math.round(avg_rating * 10) / 10,
    avg_reviews: Math.round(avg_reviews),
    avg_photos: Math.round(avg_photos),
    common_categories,
    top_competitors,
  }
}
