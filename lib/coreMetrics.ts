/**
 * TODO: move IndustryConfig definitions into a backend-driven config service
 * once the Revenue Engine is stable.
 */
export type IndustrySlug =
  | 'dentist'
  | 'restaurant'
  | 'law_firm'
  | 'medspa'
  | 'real_estate'
  | 'generic'

export type MetricCurrency = 'USD' | 'EUR' | 'GBP'

export interface IndustryConfig {
  slug: IndustrySlug
  displayName: string
  rankToCtrCurve: number[]
  clickToCallConversion: number
  callToCustomerConversion: number
  avgTicketSize: number
  currency: MetricCurrency
}

export interface GridPoint {
  rank: number | null
  weight?: number
}

export interface VisibilityScoreInput {
  grid: GridPoint[]
}

export interface VisibilityScoreResult {
  score: number
  visibleCells: number
  avgRank: number | null
}

export interface ForecastInput {
  industry: IndustrySlug
  currentRank: number
  targetRank: number
  monthlySearchVolume: number
}

export interface ForecastResult {
  industry: IndustrySlug
  currentRank: number
  targetRank: number
  estimatedCTRCurrent: number
  estimatedCTRTarget: number
  estimatedCallsCurrent: number
  estimatedCallsTarget: number
  estimatedRevenueCurrent: number
  estimatedRevenueTarget: number
  revenueDelta: number
  currency: MetricCurrency
}

export interface ActionImpactInput {
  industry: IndustrySlug
  fromRank: number
  toRank: number
  monthlySearchVolume: number
}

export interface ActionImpactResult {
  industry: IndustrySlug
  fromRank: number
  toRank: number
  extraCalls: number
  extraCustomers: number
  extraRevenue: number
  currency: MetricCurrency
}

const industryConfigMap: Record<IndustrySlug, IndustryConfig> = {
  dentist: {
    slug: 'dentist',
    displayName: 'Dentist',
    rankToCtrCurve: [
      0.27, 0.16, 0.12, 0.09, 0.07, 0.06, 0.05, 0.045, 0.04, 0.036,
      0.032, 0.029, 0.027, 0.025, 0.023, 0.021, 0.019, 0.017, 0.015, 0.013,
    ],
    clickToCallConversion: 0.32,
    callToCustomerConversion: 0.18,
    avgTicketSize: 320,
    currency: 'USD',
  },
  restaurant: {
    slug: 'restaurant',
    displayName: 'Restaurant',
    rankToCtrCurve: [
      0.24, 0.14, 0.11, 0.09, 0.075, 0.06, 0.052, 0.046, 0.04, 0.035,
      0.03, 0.027, 0.025, 0.023, 0.021, 0.019, 0.018, 0.016, 0.015, 0.013,
    ],
    clickToCallConversion: 0.28,
    callToCustomerConversion: 0.22,
    avgTicketSize: 160,
    currency: 'USD',
  },
  law_firm: {
    slug: 'law_firm',
    displayName: 'Law Firm',
    rankToCtrCurve: [
      0.26, 0.18, 0.13, 0.11, 0.09, 0.075, 0.065, 0.055, 0.048, 0.042,
      0.038, 0.034, 0.031, 0.028, 0.026, 0.024, 0.022, 0.020, 0.018, 0.016,
    ],
    clickToCallConversion: 0.36,
    callToCustomerConversion: 0.2,
    avgTicketSize: 580,
    currency: 'USD',
  },
  medspa: {
    slug: 'medspa',
    displayName: 'MedSpa',
    rankToCtrCurve: [
      0.25, 0.17, 0.13, 0.1, 0.08, 0.07, 0.059, 0.052, 0.045, 0.04,
      0.036, 0.032, 0.029, 0.026, 0.024, 0.022, 0.02, 0.018, 0.016, 0.014,
    ],
    clickToCallConversion: 0.3,
    callToCustomerConversion: 0.19,
    avgTicketSize: 260,
    currency: 'USD',
  },
  real_estate: {
    slug: 'real_estate',
    displayName: 'Real Estate',
    rankToCtrCurve: [
      0.22, 0.15, 0.11, 0.095, 0.08, 0.069, 0.06, 0.054, 0.048, 0.043,
      0.039, 0.035, 0.032, 0.029, 0.027, 0.025, 0.023, 0.021, 0.019, 0.017,
    ],
    clickToCallConversion: 0.26,
    callToCustomerConversion: 0.17,
    avgTicketSize: 460,
    currency: 'USD',
  },
  generic: {
    slug: 'generic',
    displayName: 'Generic',
    rankToCtrCurve: [
      0.2, 0.13, 0.1, 0.085, 0.072, 0.065, 0.058, 0.051, 0.045, 0.04,
      0.036, 0.032, 0.029, 0.027, 0.025, 0.023, 0.021, 0.019, 0.017, 0.015,
    ],
    clickToCallConversion: 0.25,
    callToCustomerConversion: 0.16,
    avgTicketSize: 210,
    currency: 'USD',
  },
}

export function getIndustryConfig(slug: IndustrySlug): IndustryConfig {
  const config = industryConfigMap[slug]
  if (!config) {
    throw new Error(`Industry config not found for slug: ${slug}`)
  }
  return config
}

export function rankToCTR(rank: number, industry: IndustrySlug): number {
  if (!Number.isFinite(rank)) {
    return 0
  }
  const config = getIndustryConfig(industry)
  const curve = config.rankToCtrCurve
  if (!curve.length) {
    return 0
  }
  const normalizedRank = Math.max(1, Math.floor(rank))
  const idx = Math.min(curve.length - 1, normalizedRank - 1)
  return curve[idx] ?? 0
}

export function ctrToCalls(ctr: number, monthlySearchVolume: number): number {
  if (ctr <= 0 || monthlySearchVolume <= 0) {
    return 0
  }
  return Math.round(monthlySearchVolume * ctr)
}

export function callsToRevenue(
  calls: number,
  industry: IndustrySlug,
): { customers: number; revenue: number; currency: MetricCurrency } {
  const config = getIndustryConfig(industry)
  const customers = Math.round(calls * config.callToCustomerConversion)
  const revenue = Math.round(customers * config.avgTicketSize)
  return { customers, revenue, currency: config.currency }
}

export function computeVisibilityScore(
  input: VisibilityScoreInput,
): VisibilityScoreResult {
  const visiblePoints = input.grid.filter(point => typeof point.rank === 'number')
  const visibleCells = visiblePoints.length
  if (!visibleCells) {
    return { score: 0, visibleCells: 0, avgRank: null }
  }

  let totalWeight = 0
  let scorePoints = 0
  let rankSum = 0

  visiblePoints.forEach(point => {
    const rank = point.rank ?? 0
    const weight = point.weight ?? 1
    const cellScore = Math.max(0, 100 - (rank - 1) * 2)
    totalWeight += weight
    scorePoints += cellScore * weight
    rankSum += rank * weight
  })

  const normalizedScore = totalWeight > 0 ? (scorePoints / (totalWeight * 100)) * 100 : 0
  return {
    score: Number(normalizedScore.toFixed(2)),
    visibleCells,
    avgRank: totalWeight > 0 ? Number((rankSum / totalWeight).toFixed(2)) : null,
  }
}

export function forecastRevenue(input: ForecastInput): ForecastResult {
  const { industry, currentRank, targetRank, monthlySearchVolume } = input
  const estimatedCTRCurrent = rankToCTR(currentRank, industry)
  const estimatedCTRTarget = rankToCTR(targetRank, industry)
  const estimatedCallsCurrent = ctrToCalls(estimatedCTRCurrent, monthlySearchVolume)
  const estimatedCallsTarget = ctrToCalls(estimatedCTRTarget, monthlySearchVolume)
  const currentRevenue = callsToRevenue(estimatedCallsCurrent, industry)
  const targetRevenue = callsToRevenue(estimatedCallsTarget, industry)

  return {
    industry,
    currentRank,
    targetRank,
    estimatedCTRCurrent,
    estimatedCTRTarget,
    estimatedCallsCurrent,
    estimatedCallsTarget,
    estimatedRevenueCurrent: currentRevenue.revenue,
    estimatedRevenueTarget: targetRevenue.revenue,
    revenueDelta: targetRevenue.revenue - currentRevenue.revenue,
    currency: currentRevenue.currency,
  }
}

export function computeActionImpact(input: ActionImpactInput): ActionImpactResult {
  const {
    industry,
    fromRank,
    toRank,
    monthlySearchVolume,
  } = input

  const baseline = forecastRevenue({
    industry,
    currentRank: fromRank,
    targetRank: fromRank,
    monthlySearchVolume,
  })
  const improved = forecastRevenue({
    industry,
    currentRank: toRank,
    targetRank: toRank,
    monthlySearchVolume,
  })

  const deltaCalls = improved.estimatedCallsCurrent - baseline.estimatedCallsCurrent
  const extraCalls = Math.max(0, deltaCalls)
  const extraMetrics = callsToRevenue(extraCalls, industry)
  const extraCustomers = extraMetrics.customers
  const extraRevenue = extraMetrics.revenue
  return {
    industry,
    fromRank,
    toRank,
    extraCalls,
    extraCustomers,
    extraRevenue,
    currency: baseline.currency,
  }
}
