// Recommendation Engine - Analyzes competitor data and generates actionable insights

import { PlaceResult } from './placesApi'

export interface Recommendation {
  id: number
  text: string
  impact: 'High' | 'Medium' | 'Low'
  category: 'reviews' | 'photos' | 'rating' | 'hours' | 'info' | 'engagement'
  reason?: string
}

export interface CompetitorAnalysis {
  avgRating: number
  avgReviews: number
  topRating: number
  topReviews: number
  totalCompetitors: number
}

/**
 * Analyze competitor data to understand market benchmarks
 */
export function analyzeCompetitors(competitors: PlaceResult[]): CompetitorAnalysis {
  if (competitors.length === 0) {
    return {
      avgRating: 0,
      avgReviews: 0,
      topRating: 0,
      topReviews: 0,
      totalCompetitors: 0
    }
  }

  const ratings = competitors.map(c => c.rating)
  const reviews = competitors.map(c => c.userRatingsTotal)

  return {
    avgRating: ratings.reduce((a, b) => a + b, 0) / ratings.length,
    avgReviews: reviews.reduce((a, b) => a + b, 0) / reviews.length,
    topRating: Math.max(...ratings),
    topReviews: Math.max(...reviews),
    totalCompetitors: competitors.length
  }
}

/**
 * Generate personalized recommendations based on business data and competitor analysis
 */
export function generateRecommendations(
  businessRating: number | null,
  businessReviews: number | null,
  competitors: PlaceResult[],
  visibilityScore: number | null
): Recommendation[] {
  const recommendations: Recommendation[] = []
  let id = 1

  // Analyze competitors
  const analysis = analyzeCompetitors(competitors)
  
  console.log('🎯 Generating recommendations:', {
    businessRating,
    businessReviews,
    competitorCount: competitors.length,
    analysis
  })

  // 1. REVIEW COUNT RECOMMENDATIONS
  if (businessReviews !== null && analysis.avgReviews > 0) {
    const reviewGap = analysis.avgReviews - businessReviews
    
    if (reviewGap > 100) {
      recommendations.push({
        id: id++,
        text: `Request ${Math.ceil(reviewGap / 2)} new Google reviews - you're significantly behind competitors`,
        impact: 'High',
        category: 'reviews',
        reason: `Competitors average ${Math.round(analysis.avgReviews)} reviews vs your ${businessReviews}`
      })
    } else if (reviewGap > 30) {
      recommendations.push({
        id: id++,
        text: `Get ${Math.ceil(reviewGap / 3)} more reviews to match market average`,
        impact: 'High',
        category: 'reviews',
        reason: `Market average: ${Math.round(analysis.avgReviews)} reviews`
      })
    } else if (reviewGap > 0) {
      recommendations.push({
        id: id++,
        text: 'Request 5-10 new reviews to stay competitive',
        impact: 'Medium',
        category: 'reviews'
      })
    }
  } else if (businessReviews === null || businessReviews < 10) {
    recommendations.push({
      id: id++,
      text: 'Start collecting Google reviews - critical for visibility',
      impact: 'High',
      category: 'reviews',
      reason: 'Businesses with reviews rank significantly higher'
    })
  }

  // 2. RATING RECOMMENDATIONS
  if (businessRating !== null && analysis.avgRating > 0) {
    const ratingGap = analysis.avgRating - businessRating
    
    if (ratingGap > 0.5) {
      recommendations.push({
        id: id++,
        text: 'Improve service quality - your rating is below market average',
        impact: 'High',
        category: 'rating',
        reason: `Your ${businessRating.toFixed(1)} vs market ${analysis.avgRating.toFixed(1)} average`
      })
    } else if (ratingGap > 0.2) {
      recommendations.push({
        id: id++,
        text: 'Focus on customer satisfaction to boost rating',
        impact: 'Medium',
        category: 'rating'
      })
    }
  } else if (businessRating === null || businessRating < 4.0) {
    recommendations.push({
      id: id++,
      text: 'Address negative feedback and improve service quality',
      impact: 'High',
      category: 'rating',
      reason: 'Low ratings severely impact visibility'
    })
  }

  // 3. VISIBILITY SCORE RECOMMENDATIONS
  if (visibilityScore !== null && visibilityScore < 50) {
    recommendations.push({
      id: id++,
      text: 'Optimize Google Business Profile with complete information',
      impact: 'High',
      category: 'info',
      reason: `Current visibility score: ${visibilityScore}%`
    })
  }

  // 4. PHOTOS RECOMMENDATIONS
  // Assuming competitors have good photo coverage
  if (competitors.length > 0) {
    recommendations.push({
      id: id++,
      text: 'Upload 15-20 high-quality photos of your business',
      impact: 'High',
      category: 'photos',
      reason: 'Photos increase engagement by 42% on average'
    })
  }

  // 5. BUSINESS HOURS RECOMMENDATIONS
  recommendations.push({
    id: id++,
    text: 'Update business hours including holidays and special dates',
    impact: 'Medium',
    category: 'hours',
    reason: 'Accurate hours improve customer trust and prevent negative experiences'
  })

  // 6. ENGAGEMENT RECOMMENDATIONS
  if (businessReviews && businessReviews > 5) {
    recommendations.push({
      id: id++,
      text: 'Respond to all recent Google reviews (positive and negative)',
      impact: 'High',
      category: 'engagement',
      reason: 'Response rate affects ranking and customer trust'
    })
  }

  // 7. CATEGORY RECOMMENDATIONS
  if (competitors.length > 0) {
    recommendations.push({
      id: id++,
      text: 'Add all relevant business categories to maximize visibility',
      impact: 'Medium',
      category: 'info',
      reason: 'Multiple categories help you appear in more searches'
    })
  }

  // 8. COMPETITIVE POSITIONING
  if (analysis.topReviews > 0 && businessReviews && businessReviews < analysis.topReviews * 0.5) {
    recommendations.push({
      id: id++,
      text: `Top competitor has ${analysis.topReviews} reviews - create a review campaign`,
      impact: 'High',
      category: 'reviews',
      reason: 'Review count is a major ranking factor'
    })
  }

  // Sort by impact: High > Medium > Low
  const impactOrder = { 'High': 0, 'Medium': 1, 'Low': 2 }
  recommendations.sort((a, b) => impactOrder[a.impact] - impactOrder[b.impact])

  // Limit to top 8 most impactful recommendations
  const topRecommendations = recommendations.slice(0, 8)
  
  console.log('✅ Generated', topRecommendations.length, 'recommendations:', 
    topRecommendations.map(r => ({ text: r.text, impact: r.impact }))
  )

  return topRecommendations
}

/**
 * Get recommendations for businesses without competitor data (fallback)
 */
export function getDefaultRecommendations(): Recommendation[] {
  return [
    {
      id: 1,
      text: 'Complete your Google Business Profile with all information',
      impact: 'High',
      category: 'info'
    },
    {
      id: 2,
      text: 'Upload 15-20 high-quality photos',
      impact: 'High',
      category: 'photos'
    },
    {
      id: 3,
      text: 'Request Google reviews from satisfied customers',
      impact: 'High',
      category: 'reviews'
    },
    {
      id: 4,
      text: 'Respond to all customer reviews',
      impact: 'High',
      category: 'engagement'
    },
    {
      id: 5,
      text: 'Update business hours and special dates',
      impact: 'Medium',
      category: 'hours'
    },
    {
      id: 6,
      text: 'Add all relevant business categories',
      impact: 'Medium',
      category: 'info'
    }
  ]
}
