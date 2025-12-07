// Kullanıcı planı ve kredi API endpointi (mock)
import type { NextApiRequest, NextApiResponse } from 'next'
import { PLAN_CREDIT_LIMITS, PlanType } from '@/lib/creditSystem'

type PlanRecord = { plan: PlanType; credits: number; lastReset: string }

// Mock user plan DB
let userPlans: Record<string, PlanRecord> = {
  demo: { plan: 'starter', credits: 30, lastReset: new Date().toISOString() },
}

const resetIfNeeded = (record: PlanRecord) => {
  const last = new Date(record.lastReset)
  const now = new Date()
  if (last.getMonth() !== now.getMonth() || last.getFullYear() !== now.getFullYear()) {
    record.credits = PLAN_CREDIT_LIMITS[record.plan]
    record.lastReset = now.toISOString()
  }
}

const getNextResetDate = () => {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth() + 1, 1)
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = (req.query.userId as string) || 'demo'
  if (!userPlans[userId]) {
    userPlans[userId] = { plan: 'starter', credits: PLAN_CREDIT_LIMITS.starter, lastReset: new Date().toISOString() }
  }

  resetIfNeeded(userPlans[userId])
  const payload = { userId, ...userPlans[userId], nextReset: getNextResetDate().toISOString() }

  if (req.method === 'GET') {
    return res.status(200).json(payload)
  }

  if (req.method === 'POST') {
    const { plan } = req.body as { plan?: PlanType }
    const nextPlan = plan && PLAN_CREDIT_LIMITS[plan] ? plan : null
    if (!nextPlan) return res.status(400).json({ error: 'Invalid plan' })
    userPlans[userId].plan = nextPlan
    userPlans[userId].credits = PLAN_CREDIT_LIMITS[nextPlan]
    userPlans[userId].lastReset = new Date().toISOString()
    return res.status(200).json({ userId, ...userPlans[userId], nextReset: getNextResetDate().toISOString() })
  }

  if (req.method === 'PATCH') {
    const { amount } = req.body
    if (typeof amount !== 'number' || amount <= 0) return res.status(400).json({ error: 'Invalid amount' })
    if (userPlans[userId].credits < amount) {
      return res.status(402).json({
        error: 'Plan limit reached',
        nextReset: getNextResetDate().toISOString(),
      })
    }
    userPlans[userId].credits -= amount
    return res.status(200).json({ userId, ...userPlans[userId], nextReset: getNextResetDate().toISOString() })
  }

  res.status(405).json({ error: 'Method not allowed' })
}
