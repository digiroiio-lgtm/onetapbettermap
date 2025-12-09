'use client'

export type NotificationTemplate = {
  id: string
  audience: 'demo' | 'free' | 'paid'
  trigger: string
  title: string
  body: string
  ctaLabel: string
}

export const notificationTemplates: NotificationTemplate[] = [
  {
    id: 'streak-protect-demo',
    audience: 'demo',
    trigger: 'streak-at-risk',
    title: '🔥 Don’t lose your streak — 1 scan keeps it alive',
    body: 'Your streak is on the line. Try the demo scan to stay motivated.',
    ctaLabel: 'View Demo Scan',
  },
  {
    id: 'revenue-opportunity-free',
    audience: 'free',
    trigger: 'rank-gap',
    title: 'You’re missing ~$240/month at your current rank',
    body: 'Keep running weekly scans to capture leads and unlock more revenue.',
    ctaLabel: 'Run weekly scan',
  },
  {
    id: 'progress-paid',
    audience: 'paid',
    trigger: 'action-nudge',
    title: 'You’re 1 action away from Rank #3',
    body: 'Finish the last action to climb faster and close the visibility loop.',
    ctaLabel: 'Complete action',
  },
]

export function getNotificationForAudience(audience: NotificationTemplate['audience']) {
  return notificationTemplates.filter((template) => template.audience === audience)
}
