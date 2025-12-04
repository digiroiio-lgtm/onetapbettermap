// Database types based on Supabase schema

export type SubscriptionTier = 'starter' | 'pro' | 'agency'
export type UserRole = 'user' | 'agency'
export type ScanStatus = 'pending' | 'processing' | 'completed' | 'failed'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  role: UserRole
  subscription_tier: SubscriptionTier
  created_at: string
  updated_at: string
}

export interface Location {
  id: string
  user_id: string
  business_name: string
  address: string | null
  city: string
  latitude: number
  longitude: number
  target_keyword: string
  place_id: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface GridPoint {
  lat: number
  lng: number
  rank: number | null
}

export interface GridData {
  grid_size: number
  keyword: string
  center: { lat: number; lng: number }
  results: GridPoint[]
}

export interface CompetitorMetrics {
  avg_rating: number
  avg_reviews: number
  avg_photos: number
  common_categories: string[]
  top_competitors: Array<{
    name: string
    rating: number
    review_count: number
    rank: number
  }>
}

export interface ChecklistItem {
  priority: 'high' | 'medium' | 'low'
  message: string
  category: 'photos' | 'reviews' | 'categories' | 'hours' | 'other'
}

export interface Scan {
  id: string
  location_id: string
  scan_date: string
  status: ScanStatus
  visibility_score: number | null
  grid_data: GridData | null
  competitor_data: CompetitorMetrics | null
  checklist_data: ChecklistItem[] | null
  error_message: string | null
  created_at: string
}

export interface Competitor {
  id: string
  scan_id: string
  place_id: string
  name: string
  rating: number | null
  review_count: number | null
  photos_count: number | null
  categories: string[]
  website: string | null
  has_hours: boolean
  business_status: string | null
  created_at: string
}

// API Response types
export interface PlacesNearbyResult {
  place_id: string
  name: string
  rating?: number
  user_ratings_total?: number
  types?: string[]
  photos?: Array<{ photo_reference: string }>
  geometry: {
    location: {
      lat: number
      lng: number
    }
  }
  business_status?: string
  opening_hours?: {
    open_now?: boolean
  }
  website?: string
}

export interface PlaceDetails extends PlacesNearbyResult {
  formatted_address?: string
  international_phone_number?: string
  website?: string
  opening_hours?: {
    open_now?: boolean
    weekday_text?: string[]
  }
}
