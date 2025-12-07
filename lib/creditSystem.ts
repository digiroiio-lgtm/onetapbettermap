// Kredi sistemi tipleri ve limitleri (API ile kullanılacak)
export type PlanType = 'starter' | 'scale' | 'dominance';
export const PLAN_CREDIT_LIMITS: Record<PlanType, number> = {
  starter: 30,
  scale: 20000,
  dominance: 30000,
};
