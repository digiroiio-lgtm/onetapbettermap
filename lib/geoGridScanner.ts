import { findBusinessRank, batchProcessWithRateLimit } from './googlePlaces'
import type { GridPoint, GridData } from '@/types/database'

/**
 * Calculate grid points around a center location
 * Creates a 7x7 grid with specified spacing
 */
export function calculateGridPoints(
  centerLat: number,
  centerLng: number,
  gridSize: number = 7,
  spacingKm: number = 0.5 // 500 meters between points
): Array<{ lat: number; lng: number }> {
  const points: Array<{ lat: number; lng: number }> = []

  // Earth's radius in km
  const R = 6371

  // Convert spacing to degrees (approximate)
  const latSpacing = (spacingKm / R) * (180 / Math.PI)
  const lngSpacing = (spacingKm / (R * Math.cos((centerLat * Math.PI) / 180))) * (180 / Math.PI)

  // Calculate offset to center the grid
  const offset = Math.floor(gridSize / 2)

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const latOffset = (row - offset) * latSpacing
      const lngOffset = (col - offset) * lngSpacing

      points.push({
        lat: centerLat + latOffset,
        lng: centerLng + lngOffset,
      })
    }
  }

  return points
}

/**
 * Scan a single grid point for business rank
 */
async function scanGridPoint(
  point: { lat: number; lng: number },
  businessName: string,
  keyword: string,
  radius: number = 2000
): Promise<GridPoint> {
  const location = `${point.lat},${point.lng}`

  try {
    const rank = await findBusinessRank(businessName, location, keyword, radius)

    return {
      lat: point.lat,
      lng: point.lng,
      rank: rank && rank <= 20 ? rank : null, // Only track top 20
    }
  } catch (error) {
    console.error(`Error scanning point (${point.lat}, ${point.lng}):`, error)
    return {
      lat: point.lat,
      lng: point.lng,
      rank: null,
    }
  }
}

/**
 * Main GeoGrid scanning function
 * Scans 7x7 grid (49 points) around business location
 */
export async function runGeoGridScan(
  businessName: string,
  centerLat: number,
  centerLng: number,
  keyword: string,
  gridSize: number = 7,
  spacingKm: number = 0.5
): Promise<GridData> {
  console.log(`Starting GeoGrid scan for: ${businessName}`)
  console.log(`Center: ${centerLat}, ${centerLng}`)
  console.log(`Keyword: ${keyword}`)

  // Generate grid points
  const gridPoints = calculateGridPoints(centerLat, centerLng, gridSize, spacingKm)

  console.log(`Generated ${gridPoints.length} grid points`)

  // Scan each point with rate limiting (10 requests per second)
  const results = await batchProcessWithRateLimit(
    gridPoints,
    (point) => scanGridPoint(point, businessName, keyword),
    10 // requests per second
  )

  console.log(`Scan completed. Found rankings in ${results.filter((r) => r.rank !== null).length}/${results.length} points`)

  return {
    grid_size: gridSize,
    keyword,
    center: { lat: centerLat, lng: centerLng },
    results,
  }
}

/**
 * Calculate average rank from grid data
 */
export function calculateAverageRank(gridData: GridData): number | null {
  const rankedPoints = gridData.results.filter((point) => point.rank !== null)

  if (rankedPoints.length === 0) {
    return null
  }

  const sum = rankedPoints.reduce((acc, point) => acc + (point.rank || 0), 0)
  return sum / rankedPoints.length
}

/**
 * Get visibility percentage (how many points show the business in top 20)
 */
export function calculateVisibilityPercentage(gridData: GridData): number {
  const totalPoints = gridData.results.length
  const visiblePoints = gridData.results.filter((point) => point.rank !== null).length

  return Math.round((visiblePoints / totalPoints) * 100)
}
