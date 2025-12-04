import type { GridData, CompetitorMetrics, CompetitorData } from '@/types/database'
import { calculateAverageRank, calculateVisibilityPercentage } from './geoGridScanner'

export interface VisibilityScoreBreakdown {
  total_score: number // 0-100
  rank_score: number // 0-50
  review_score: number // 0-20
  category_score: number // 0-15
  photo_score: number // 0-15
}

/**
 * Calculate comprehensive visibility score (0-100)
 * 
 * Weights:
 * - Rank: 50% (better average rank = higher score)
 * - Reviews: 20% (more reviews vs competitors)
 * - Categories: 15% (match with common categories)
 * - Photos: 15% (more photos vs competitors)
 */
export function calculateVisibilityScore(
  gridData: GridData,
  businessData: {
    review_count: number
    photos_count: number
    categories: string[]
  },
  competitorMetrics: CompetitorMetrics
): VisibilityScoreBreakdown {
  // 1. Rank Score (0-50)
  const avgRank = calculateAverageRank(gridData)
  const visibilityPct = calculateVisibilityPercentage(gridData)

  let rank_score = 0
  if (avgRank !== null) {
    // Better rank = higher score
    // Rank 1-3: 45-50, Rank 4-7: 35-44, Rank 8-10: 25-34, Rank 11+: 0-24
    const rankComponent = Math.max(0, 50 - (avgRank * 3))
    const visibilityComponent = (visibilityPct / 100) * 50
    rank_score = Math.round((rankComponent + visibilityComponent) / 2)
  }

  // 2. Review Score (0-20)
  const reviewGap = businessData.review_count - competitorMetrics.avg_reviews
  let review_score = 10 // baseline

  if (competitorMetrics.avg_reviews > 0) {
    const reviewRatio = businessData.review_count / competitorMetrics.avg_reviews
    if (reviewRatio >= 1.2) {
      review_score = 20 // 20% more reviews
    } else if (reviewRatio >= 1.0) {
      review_score = 16 // At par
    } else if (reviewRatio >= 0.8) {
      review_score = 12 // Within 20%
    } else if (reviewRatio >= 0.6) {
      review_score = 8 // Within 40%
    } else {
      review_score = 4 // Far behind
    }
  }

  // 3. Category Score (0-15)
  const matchedCategories = businessData.categories.filter((cat) =>
    competitorMetrics.common_categories.includes(cat)
  ).length

  const category_score = Math.min(15, (matchedCategories / competitorMetrics.common_categories.length) * 15)

  // 4. Photo Score (0-15)
  let photo_score = 7 // baseline

  if (competitorMetrics.avg_photos > 0) {
    const photoRatio = businessData.photos_count / competitorMetrics.avg_photos
    if (photoRatio >= 1.2) {
      photo_score = 15 // 20% more photos
    } else if (photoRatio >= 1.0) {
      photo_score = 12 // At par
    } else if (photoRatio >= 0.8) {
      photo_score = 9 // Within 20%
    } else if (photoRatio >= 0.6) {
      photo_score = 6 // Within 40%
    } else {
      photo_score = 3 // Far behind
    }
  }

  const total_score = Math.round(rank_score + review_score + category_score + photo_score)

  return {
    total_score: Math.min(100, total_score),
    rank_score: Math.round(rank_score),
    review_score: Math.round(review_score),
    category_score: Math.round(category_score),
    photo_score: Math.round(photo_score),
  }
}
