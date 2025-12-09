'use client'

import type { RetentionSectionData } from '../mockRetentionData'

type Props = {
  data: RetentionSectionData
}

const renderBadge = (text: string, active = true) => (
  <span
    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${
      active ? 'border-emerald-200 bg-emerald-50 text-emerald-600' : 'border-slate-200 bg-slate-50 text-slate-500'
    }`}
  >
    {text}
  </span>
)

const formatPercentText = (value: number) => {
  if (value === 0) return '0%'
  return `${value > 0 ? '+' : ''}${value}%`
}

export default function RetentionSection({ data }: Props) {
  const { weeklyWins, timeline, milestones } = data

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm text-slate-900">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Retention & Progress</p>
        <h2 className="text-2xl font-semibold text-slate-900">Turn weekly scans into a compounding visibility habit</h2>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {weeklyWins.map((win) => (
          <div
            key={win.label}
            className="rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
              {win.label}
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{win.value}</p>
            <p className="text-xs text-slate-500">{win.subtext}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Weekly Habit Timeline</p>
            <p className="text-xs text-slate-500">Last 6 weeks • TODO: compute streak from real timeline data</p>
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Streak view</p>
        </div>

        {/* TODO: compute streak from live timeline data instead of hard-coded values */}
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {timeline.map((item) => {
            const percentColor =
              item.weeklyChangePercent > 0
                ? 'text-emerald-600'
                : item.weeklyChangePercent < 0
                  ? 'text-rose-600'
                  : 'text-slate-500'
            return (
              <div
                key={item.weekLabel}
                className="flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50/70 p-3 text-center"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-slate-500">
                  {item.weekLabel}
                </p>
                <div className="flex items-center justify-center">
                  {item.scanDone ? (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/80 text-xs font-semibold text-white">
                      ✓
                    </div>
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-dashed border-slate-300 text-[10px] text-slate-400">
                      Missed
                    </div>
                  )}
                </div>
                <p className={`text-sm font-semibold ${percentColor}`}>
                  {formatPercentText(item.weeklyChangePercent)}
                </p>
                {renderBadge(item.scanDone ? 'Active' : 'Missed', item.scanDone)}
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Next Milestones</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {milestones.map((milestone) => (
            <span
              key={milestone.label}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600"
            >
              <span className="font-semibold text-slate-800">{milestone.label}</span>
              <span className="text-slate-500">→ {milestone.detail}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
