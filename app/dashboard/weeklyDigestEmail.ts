'use client'

export type WeeklyDigestMetrics = {
  streakWeeks: number
  xpGainedThisWeek: number
  visibilityChangePercent: number
  recommendedActions: string[]
  weeklyRevenueImpact: number
}

export type WeeklyDigestPayload = {
  userId: string
  plan: 'demo' | 'free' | 'paid'
  username: string
  metrics: WeeklyDigestMetrics
  isDemo: boolean
}

export function renderWeeklyDigestEmail(payload: WeeklyDigestPayload) {
  const { metrics, plan, username, isDemo } = payload
  const { visibilityChangePercent, xpGainedThisWeek, streakWeeks, recommendedActions, weeklyRevenueImpact } = metrics
  const visibilitySign = visibilityChangePercent >= 0 ? '+' : ''
  const subjectSuffix = isDemo ? ' (sample data)' : ''
  const subject =
    visibilityChangePercent !== 0
      ? `Your Maps visibility is ${visibilitySign}${visibilityChangePercent}% this week${subjectSuffix}`
      : `Your Maps visibility update is ready${subjectSuffix}`

  const recommendedList = recommendedActions.length
    ? recommendedActions.map((action) => `<li>${action}</li>`).join('')
    : '<li>No queued actions yet — add one in the dashboard.</li>'

  const introCopy = isDemo
    ? 'Sample summary based on demo data — nothing was actually sent.'
    : `Nice work, ${username}!`

  const body = `
    <div style="font-family: 'Inter', system-ui, sans-serif; color: #0f172a; background:#f8fafc; padding:24px;">
      <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:24px; padding:32px; border:1px solid #e2e8f0;">
        <p style="font-size:12px; letter-spacing:0.2em; text-transform:uppercase; color:#94a3b8;">MapsRankChecker Weekly Digest</p>
        <h1 style="margin-top:8px; font-size:28px; color:#0f172a;">${introCopy}</h1>
        <p style="margin-bottom:24px; color:#475569;">${streakWeeks}-week streak active &mdash; ${
    visibilityChangePercent >= 0 ? 'visibility trending up' : 'some dips'
  }.</p>
        <div style="display:flex; flex-wrap:wrap; gap:12px;">
          <div style="flex:1; min-width:180px; padding:12px; border-radius:16px; background:#ecfdf5; border:1px solid #22c55e;">
            <p style="margin:0; font-size:12px; color:#22c55e; text-transform:uppercase;">This week</p>
            <p style="margin:4px 0; font-size:24px; font-weight:600; color:#0f172a;">+${xpGainedThisWeek} XP</p>
            <p style="margin:0; font-size:12px; color:#475569;">Keep stacking XP toward ${streakWeeks + 1} week streak.</p>
          </div>
          <div style="flex:1; min-width:180px; padding:12px; border-radius:16px; background:#e0f2fe; border:1px solid #38bdf8;">
            <p style="margin:0; font-size:12px; color:#0ea5e9; text-transform:uppercase;">Visibility</p>
            <p style="margin:4px 0; font-size:24px; font-weight:600; color:#0f172a;">${visibilitySign}${visibilityChangePercent}%</p>
            <p style="margin:0; font-size:12px; color:#475569;">vs last week</p>
          </div>
          <div style="flex:1; min-width:180px; padding:12px; border-radius:16px; background:#fefce8; border:1px solid #facc15;">
            <p style="margin:0; font-size:12px; color:#ca8a04; text-transform:uppercase;">Impact</p>
            <p style="margin:4px 0; font-size:24px; font-weight:600; color:#0f172a;">≈ $${weeklyRevenueImpact.toLocaleString()}</p>
            <p style="margin:0; font-size:12px; color:#475569;">revenue modeled this week</p>
          </div>
        </div>
        <div style="margin-top:24px;">
          <p style="margin-bottom:8px; font-size:14px; font-weight:600; color:#0f172a;">Top recommended actions</p>
          <ul style="margin:0; padding-left:16px; color:#475569;">${recommendedList}</ul>
        </div>
        <a
          href="${plan === 'demo' ? '/pricing' : '/dashboard'}"
          style="display:inline-flex; margin-top:24px; padding:12px 20px; border-radius:999px; background:#16a34a; color:#fff; text-decoration:none; font-weight:600;"
        >
          View full report
        </a>
        ${plan === 'demo' ? '<p style="margin-top:8px; font-size:11px; color:#94a3b8;">Demo preview — no email was sent.</p>' : ''}
      </div>
    </div>
  `

  return {
    subject,
    html: body,
  }
}
