import type { NextApiRequest, NextApiResponse } from 'next'

type ForecastInput = {
  rank_current: number
  rank_target: number
  avg_order_value: number
  conversion_rate: number
  ctr_model?: Record<string, number>
  gbp_metrics?: {
    calls?: number
    directions?: number
    clicks?: number
  }
}

const DEFAULT_CTR_MODEL: Record<number, number> = {
  1: 0.22,
  2: 0.16,
  3: 0.12,
  4: 0.09,
  5: 0.08,
  6: 0.05,
  10: 0.03,
}

const normalizeBody = (body: NextApiRequest['body']) => {
  if (typeof body === 'string') {
    try {
      return JSON.parse(body) as ForecastInput
    } catch (error) {
      return null
    }
  }
  return body as ForecastInput
}

const getCtrValue = (rank: number, ctrModel: Record<string, number>) => {
  const normalizedKey = String(rank)
  if (typeof ctrModel[normalizedKey] === 'number') {
    return ctrModel[normalizedKey] as number
  }
  if (rank <= 3) return 0.12
  if (rank <= 5) return 0.08
  if (rank <= 10) return 0.035
  return 0.01
}

const buildProjection = (
  rank: number,
  ctrModel: Record<string, number>,
  avgOrderValue: number,
  conversionRate: number,
  gbpMetrics: NonNullable<ForecastInput['gbp_metrics']>,
) => {
  const totalInterest = Math.max(
    (gbpMetrics.calls ?? 0) * 1.5 +
      (gbpMetrics.directions ?? 0) +
      (gbpMetrics.clicks ?? 0),
    60,
  )
  const ctr = getCtrValue(rank, ctrModel)
  const projectedCalls = Math.round(totalInterest * ctr)
  const projectedCustomers = Math.max(1, Math.round(projectedCalls * conversionRate))
  const projectedRevenue = projectedCustomers * avgOrderValue

  return {
    rank,
    projected_calls: projectedCalls,
    projected_customers: projectedCustomers,
    projected_revenue: projectedRevenue,
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const payload = normalizeBody(req.body)

  if (!payload) {
    return res.status(400).json({ error: 'Invalid JSON payload' })
  }

  const {
    rank_current,
    rank_target,
    avg_order_value,
    conversion_rate,
    ctr_model,
    gbp_metrics,
  } = payload

  if (
    typeof rank_current !== 'number' ||
    typeof rank_target !== 'number' ||
    typeof avg_order_value !== 'number' ||
    typeof conversion_rate !== 'number'
  ) {
    return res.status(400).json({ error: 'Missing or invalid required fields' })
  }

  const metrics = gbp_metrics ?? { calls: 30, directions: 12, clicks: 220 }
  const ctrModel = { ...DEFAULT_CTR_MODEL, ...(ctr_model ?? {}) }

  const current = buildProjection(rank_current, ctrModel, avg_order_value, conversion_rate, metrics)
  const target = buildProjection(rank_target, ctrModel, avg_order_value, conversion_rate, metrics)
  const rankOne = buildProjection(1, ctrModel, avg_order_value, conversion_rate, metrics)

  return res.status(200).json({
    projected_calls: target.projected_calls,
    projected_customers: target.projected_customers,
    projected_revenue: target.projected_revenue,
    delta_vs_current: target.projected_revenue - current.projected_revenue,
    delta_vs_rank_one: rankOne.projected_revenue - current.projected_revenue,
    breakdown: {
      current,
      target,
      rank_one: rankOne,
    },
  })
}
