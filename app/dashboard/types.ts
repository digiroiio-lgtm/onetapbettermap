export type RevenueMetrics = {
  currency: 'USD' | 'EUR' | 'GBP'
  currentRank: number
  currentMonthlyRevenue: number
  targetRank3Revenue: number
  targetRank1Revenue: number
  estCallsAtCurrent: number
  estCallsAtRank3: number
  estCallsAtRank1: number
}

export type HeatmapCell = {
  id: string
  row: number
  col: number
  areaLabel: string
  rank: number
  estCallsPerMonth: number
  estRevenuePerMonth: number
  trend: 'up' | 'down' | 'flat'
  isStrongest?: boolean
  isWeakest?: boolean
}

export type ActionItem = {
  id: string
  label: string
  estScoreImpact: number
  estRevenueImpact: number
  category: 'photos' | 'reviews' | 'categories' | 'profile' | 'other'
  status: 'todo' | 'in_progress' | 'done'
}

export type PlanInfo = {
  name: 'Free' | 'Starter' | 'Growth' | 'Scale'
  pricePerMonth: number
  current?: boolean
  lockedFeatures: string[]
  unlockedFeatures: string[]
  estExtraRevenueIfUpgraded: number
}
