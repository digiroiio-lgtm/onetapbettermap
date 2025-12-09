'use client'

import type { HabitHeaderData } from '../mockRetentionData'

type Props = {
  data: HabitHeaderData
}

export default function HabitHeaderStrip({ data }: Props) {
  const progressPercent = Math.min(
    100,
    Math.round((data.visibilityPoints / Math.max(1, data.nextMilestonePoints)) * 100),
  )
  const gainPositive = data.weeklyGainPercent >= 0
  const gainColor = gainPositive ? 'text-emerald-600' : 'text-rose-600'
  const gainIcon = gainPositive ? '▲' : '▼'

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm text-slate-900">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
            <span>Weekly Scan Streak</span>
            <span aria-hidden>🔥</span>
          </div>
          <p className="text-3xl font-semibold text-slate-900">{data.streakWeeks} weeks</p>
          <p className="text-sm text-slate-500">
            {data.streakWeeks > 0
              ? `You’ve run a scan ${data.streakWeeks} weeks in a row. Keep it going!`
              : 'Start scanning weekly to build your streak.'}
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Visibility Points</p>
          <p className="text-3xl font-semibold text-slate-900">{data.visibilityPoints.toLocaleString()} XP</p>
          <div className="text-xs text-slate-500">Next milestone: {data.nextMilestonePoints.toLocaleString()} XP</div>
          <div className="h-2 w-full rounded-full bg-slate-200">
            <div
              className="h-2 rounded-full bg-emerald-500 transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">This Week’s Gain</p>
          <p className={`text-3xl font-semibold ${gainColor}`}>{gainIcon} {Math.abs(data.weeklyGainPercent)}%</p>
          <p className="text-xs text-slate-500">Avg. Maps visibility vs last week</p>
          <button
            type="button"
            onClick={() => {
              console.log('TODO: trigger scan modal')
            }}
            className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            Run Weekly Scan
          </button>
        </div>
      </div>
    </section>
  )
}
