// Frontend: Plan ve kredi API entegrasyonu
import { PLAN_CREDIT_LIMITS, PlanType } from './creditSystem';

export interface UserPlan {
  userId: string;
  plan: PlanType;
  credits: number;
  lastReset: string;
}

export async function getUserPlan(userId: string = 'demo'): Promise<UserPlan> {
  const res = await fetch(`/api/user/plan?userId=${userId}`);
  if (!res.ok) throw new Error('Plan bilgisi alınamadı');
  return res.json();
}

export async function changeUserPlan(plan: PlanType, userId: string = 'demo'): Promise<UserPlan> {
  const res = await fetch(`/api/user/plan?userId=${userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ plan }),
  });
  if (!res.ok) throw new Error('Plan değiştirilemedi');
  return res.json();
}

export async function spendCredits(amount: number, userId: string = 'demo'): Promise<UserPlan> {
  const res = await fetch(`/api/user/plan?userId=${userId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount }),
  });
  if (!res.ok) throw new Error('Kredi harcanamadı');
  return res.json();
}
