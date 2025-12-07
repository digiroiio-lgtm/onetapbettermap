// Kullanıcı planı ve kredi API endpointi (mock)
import type { NextApiRequest, NextApiResponse } from 'next';
import { PLAN_CREDIT_LIMITS, PlanType } from '@/lib/creditSystem';

// Mock user plan DB
let userPlans: Record<string, { plan: PlanType; credits: number; lastReset: string }> = {
  'demo': { plan: 'starter', credits: 30, lastReset: new Date().toISOString() },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = (req.query.userId as string) || 'demo';
  if (!userPlans[userId]) {
    userPlans[userId] = { plan: 'starter', credits: 30, lastReset: new Date().toISOString() };
  }
  // GET: Plan ve kredi bilgisi
  if (req.method === 'GET') {
    return res.status(200).json({ userId, ...userPlans[userId] });
  }
  // POST: Plan değiştir
  if (req.method === 'POST') {
    const { plan } = req.body as { plan?: PlanType };
    const nextPlan = plan && PLAN_CREDIT_LIMITS[plan] ? plan : null;
    if (!nextPlan) return res.status(400).json({ error: 'Invalid plan' });
    userPlans[userId].plan = nextPlan;
    userPlans[userId].credits = PLAN_CREDIT_LIMITS[nextPlan];
    userPlans[userId].lastReset = new Date().toISOString();
    return res.status(200).json({ userId, ...userPlans[userId] });
  }
  // PATCH: Kredi harca
  if (req.method === 'PATCH') {
    const { amount } = req.body;
    if (typeof amount !== 'number' || amount <= 0) return res.status(400).json({ error: 'Invalid amount' });
    if (userPlans[userId].credits < amount) return res.status(400).json({ error: 'Insufficient credits' });
    userPlans[userId].credits -= amount;
    return res.status(200).json({ userId, ...userPlans[userId] });
  }
  res.status(405).json({ error: 'Method not allowed' });
}
