'use client'

export function logAnalyticsEvent(name: string, payload: Record<string, unknown>) {
  if (typeof window === 'undefined') {
    return
  }

  // TODO: Replace console logging with analytics provider integration.
  console.log('Analytics event:', name, payload)
}
