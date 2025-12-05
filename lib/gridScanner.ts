// Grid-based ranking scanner for Google Maps

import { searchNearbyPlaces, type PlaceResult } from './placesApi'

export interface GridPoint {
  lat: number
  lng: number
  row: number
  col: number
}

export interface RankingResult {
  point: GridPoint
  rank: number | null
  found: boolean
  competitors: PlaceResult[]
}

export interface ScanProgress {
  current: number
  total: number
  percentage: number
}

/**
 * Generate a 7x7 grid of points around a center location
 * Each point is approximately 1km apart
 */
export function generateGrid(
  centerLat: number,
  centerLng: number,
  gridSize: number = 7,
  distanceKm: number = 1
): GridPoint[] {
  const points: GridPoint[] = []
  const halfGrid = Math.floor(gridSize / 2)
  
  // Approximate degrees per km (varies by latitude)
  // At equator: 1 degree = ~111km
  const latPerKm = 1 / 111
  const lngPerKm = 1 / (111 * Math.cos(centerLat * Math.PI / 180))
  
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const latOffset = (row - halfGrid) * distanceKm * latPerKm
      const lngOffset = (col - halfGrid) * distanceKm * lngPerKm
      
      points.push({
        lat: centerLat + latOffset,
        lng: centerLng + lngOffset,
        row,
        col
      })
    }
  }
  
  return points
}

/**
 * Find the rank of a business at a specific point
 */
export async function findRankAtPoint(
  point: GridPoint,
  businessName: string,
  keyword: string,
  radius: number = 3000
): Promise<RankingResult> {
  try {
    // Search for places at this point
    const places = await searchNearbyPlaces({
      location: { lat: point.lat, lng: point.lng },
      radius,
      keyword: keyword.replace(' near me', ''),
    })
    
    // Find the business in results
    const rank = places.findIndex(place => 
      place.name.toLowerCase().includes(businessName.toLowerCase()) ||
      businessName.toLowerCase().includes(place.name.toLowerCase())
    )
    
    return {
      point,
      rank: rank === -1 ? null : rank + 1, // Convert to 1-based index
      found: rank !== -1,
      competitors: places.slice(0, 20) // Top 20 competitors at this point
    }
  } catch (error) {
    console.error('Error finding rank at point:', error)
    return {
      point,
      rank: null,
      found: false,
      competitors: []
    }
  }
}

/**
 * Scan entire grid and calculate rankings
 */
export async function scanGrid(
  centerLat: number,
  centerLng: number,
  businessName: string,
  keyword: string,
  onProgress?: (progress: ScanProgress) => void
): Promise<RankingResult[]> {
  const grid = generateGrid(centerLat, centerLng)
  const results: RankingResult[] = []
  
  // Scan points with delay to avoid rate limiting
  for (let i = 0; i < grid.length; i++) {
    const point = grid[i]
    
    // Update progress
    if (onProgress) {
      onProgress({
        current: i + 1,
        total: grid.length,
        percentage: Math.round(((i + 1) / grid.length) * 100)
      })
    }
    
    try {
      const result = await findRankAtPoint(point, businessName, keyword)
      results.push(result)
      
      // Add delay to avoid hitting rate limits (adjust as needed)
      // Google allows ~150 requests per minute for Places API
      await new Promise(resolve => setTimeout(resolve, 500))
    } catch (error) {
      console.error(`Error scanning point (${point.row}, ${point.col}):`, error)
      results.push({
        point,
        rank: null,
        found: false,
        competitors: []
      })
    }
  }
  
  return results
}

/**
 * Calculate visibility score based on grid scan results
 * 
 * Algorithm:
 * - Visibility Rate (40%): Percentage of grid points where business appears in top 20
 * - Average Rank Score (60%): Quality of rankings where business appears
 *   - Rank 1-3: 100 points (excellent visibility)
 *   - Rank 4-7: 75 points (good visibility)
 *   - Rank 8-12: 50 points (moderate visibility)
 *   - Rank 13-16: 25 points (low visibility)
 *   - Rank 17-20: 10 points (very low visibility)
 * 
 * Final Score = (Visibility Rate × 0.4) + (Avg Rank Score × 0.6)
 */
export function calculateRealVisibilityScore(results: RankingResult[]): number {
  const totalPoints = results.length
  const foundPoints = results.filter(r => r.found).length
  
  // Visibility Rate: percentage of points where business appears (0-100)
  const visibilityRate = (foundPoints / totalPoints) * 100
  
  // Calculate average rank score for found points
  let rankScoreSum = 0
  for (const result of results) {
    if (result.rank !== null) {
      // Convert rank to score (1-20 scale)
      let rankScore: number
      if (result.rank <= 3) {
        rankScore = 100
      } else if (result.rank <= 7) {
        rankScore = 75
      } else if (result.rank <= 12) {
        rankScore = 50
      } else if (result.rank <= 16) {
        rankScore = 25
      } else {
        rankScore = 10
      }
      rankScoreSum += rankScore
    }
  }
  
  const avgRankScore = foundPoints > 0 ? rankScoreSum / foundPoints : 0
  
  // Weighted final score: 40% visibility rate + 60% rank quality
  const finalScore = (visibilityRate * 0.4) + (avgRankScore * 0.6)
  
  return Math.round(finalScore)
}

/**
 * Get grid statistics
 */
export function getGridStats(results: RankingResult[]) {
  const found = results.filter(r => r.found).length
  const notFound = results.filter(r => !r.found).length
  const avgRank = results
    .filter(r => r.rank !== null)
    .reduce((sum, r) => sum + r.rank!, 0) / Math.max(found, 1)
  
  const bestRank = Math.min(...results.filter(r => r.rank !== null).map(r => r.rank!))
  const worstRank = Math.max(...results.filter(r => r.rank !== null).map(r => r.rank!))
  
  return {
    totalPoints: results.length,
    foundInResults: found,
    notFoundInResults: notFound,
    visibilityRate: Math.round((found / results.length) * 100),
    averageRank: Math.round(avgRank * 10) / 10,
    bestRank: bestRank === Infinity ? null : bestRank,
    worstRank: worstRank === -Infinity ? null : worstRank,
  }
}

/**
 * Convert ranking results to heatmap format
 */
export function resultsToHeatmap(results: RankingResult[]): Array<Array<{ rank: number | null; color: 'green' | 'yellow' | 'red' | 'gray' }>> {
  const gridSize = Math.sqrt(results.length)
  const heatmap: Array<Array<{ rank: number | null; color: 'green' | 'yellow' | 'red' | 'gray' }>> = []
  
  for (let row = 0; row < gridSize; row++) {
    const rowData: Array<{ rank: number | null; color: 'green' | 'yellow' | 'red' | 'gray' }> = []
    
    for (let col = 0; col < gridSize; col++) {
      const result = results.find(r => r.point.row === row && r.point.col === col)
      
      let color: 'green' | 'yellow' | 'red' | 'gray' = 'gray'
      const rank = result?.rank ?? null
      
      if (rank === null || rank === undefined) {
        color = 'gray'
      } else if (rank <= 3) {
        color = 'green'
      } else if (rank <= 7) {
        color = 'yellow'
      } else {
        color = 'red'
      }
      
      rowData.push({ rank, color })
    }
    
    heatmap.push(rowData)
  }
  
  return heatmap
}
