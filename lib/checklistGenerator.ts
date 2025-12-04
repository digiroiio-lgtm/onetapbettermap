import type { ChecklistItem, CompetitorMetrics } from '@/types/database'

export interface BusinessProfile {
  name: string
  review_count: number
  photos_count: number
  categories: string[]
  has_website: boolean
  has_hours: boolean
  rating: number | null
}

/**
 * Generate optimization checklist based on business data and competitor analysis
 */
export function generateOptimizationChecklist(
  business: BusinessProfile,
  competitors: CompetitorMetrics
): ChecklistItem[] {
  const checklist: ChecklistItem[] = []

  // 1. Photo Analysis
  const photoGap = competitors.avg_photos - business.photos_count
  if (photoGap > 10) {
    checklist.push({
      priority: 'high',
      message: `Upload ${Math.round(photoGap)} new photos to match top competitors`,
      category: 'photos',
    })
  } else if (photoGap > 5) {
    checklist.push({
      priority: 'medium',
      message: `Add ${Math.round(photoGap)} more photos to improve visual presence`,
      category: 'photos',
    })
  } else if (business.photos_count < 10) {
    checklist.push({
      priority: 'low',
      message: 'Consider adding more diverse photos (interior, exterior, products, team)',
      category: 'photos',
    })
  }

  // 2. Review Analysis
  const reviewGap = competitors.avg_reviews - business.review_count
  if (reviewGap > 20) {
    checklist.push({
      priority: 'high',
      message: `Request ${Math.min(10, Math.round(reviewGap / 2))} new Google reviews from satisfied customers`,
      category: 'reviews',
    })
  } else if (reviewGap > 10) {
    checklist.push({
      priority: 'medium',
      message: `Aim for ${Math.round(reviewGap)} more reviews to match competitors`,
      category: 'reviews',
    })
  } else if (reviewGap > 5) {
    checklist.push({
      priority: 'low',
      message: 'Maintain steady review flow with follow-up emails',
      category: 'reviews',
    })
  }

  // 3. Category Analysis
  const missingCategories = competitors.common_categories.filter(
    (cat) => !business.categories.includes(cat)
  )

  if (missingCategories.length > 0) {
    const topMissing = missingCategories.slice(0, 3)
    topMissing.forEach((category, index) => {
      checklist.push({
        priority: index === 0 ? 'high' : 'medium',
        message: `Add category: '${formatCategory(category)}'`,
        category: 'categories',
      })
    })
  }

  // 4. Hours Check
  if (!business.has_hours) {
    checklist.push({
      priority: 'high',
      message: 'Add business hours to your Google Business Profile',
      category: 'hours',
    })
  }

  // 5. Website Check
  if (!business.has_website) {
    checklist.push({
      priority: 'medium',
      message: 'Add your website URL to improve credibility',
      category: 'other',
    })
  }

  // 6. Rating Analysis
  if (business.rating !== null && competitors.avg_rating > 0) {
    const ratingGap = competitors.avg_rating - business.rating
    if (ratingGap > 0.5) {
      checklist.push({
        priority: 'high',
        message: 'Focus on improving service quality to increase your average rating',
        category: 'reviews',
      })
    }
  }

  // 7. General Optimizations
  if (business.photos_count < 20) {
    checklist.push({
      priority: 'low',
      message: 'Update photos seasonally to keep profile fresh',
      category: 'photos',
    })
  }

  if (business.review_count < 50) {
    checklist.push({
      priority: 'medium',
      message: 'Set up automated review request system (email/SMS)',
      category: 'reviews',
    })
  }

  // Sort by priority
  const priorityOrder = { high: 0, medium: 1, low: 2 }
  checklist.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])

  return checklist
}

/**
 * Format category name for display
 */
function formatCategory(category: string): string {
  return category
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Generate email template for review requests
 */
export function generateReviewRequestTemplate(businessName: string): string {
  return `
Hi [Customer Name],

Thank you for choosing ${businessName}! We hope you had a great experience with us.

We'd love to hear about your visit. Would you mind taking a moment to leave us a review on Google?

👉 [Review Link]

Your feedback helps us improve and helps others discover us too.

Best regards,
${businessName} Team
  `.trim()
}
