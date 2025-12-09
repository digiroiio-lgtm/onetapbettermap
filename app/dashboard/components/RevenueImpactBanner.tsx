import type { RevenueMetrics } from '../types'

type Props = {
  revenueMetrics: RevenueMetrics
  onViewActions: () => void
  onViewForecast: () => void
}

export default function RevenueImpactBanner({
  revenueMetrics,
  onViewActions,
  onViewForecast,
}: Props) {
  const delta3 = revenueMetrics.targetRank3Revenue - revenueMetrics.currentMonthlyRevenue
  const delta1 = revenueMetrics.targetRank1Revenue - revenueMetrics.currentMonthlyRevenue
  const deltaCallsPerPosition = Math.max(
    1,
    Math.round(
      (revenueMetrics.estCallsAtRank1 - revenueMetrics.estCallsAtCurrent) /
        Math.max(1, revenueMetrics.currentRank - 1),
    ),
  )
  return (
    <section className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6 text-slate-100 shadow-xl shadow-black/50">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Current Momentum</p>
          <div>
            <p className="text-3xl font-semibold">Rank #{revenueMetrics.currentRank}</p>
            <p className="text-lg text-slate-400">≈ ${revenueMetrics.currentMonthlyRevenue.toLocaleString()} / mo</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
            Extra revenue: +${delta1.toLocaleString()} vs rank #1
          </div>
        </div>

        <div className="space-y-3 border-l border-slate-800/60 pl-0 md:pl-6">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">If you hit rank #3</p>
          <p className="text-2xl font-semibold text-white">${revenueMetrics.targetRank3Revenue.toLocaleString()}</p>
          <p className="text-sm text-emerald-300">+${delta3.toLocaleString()} vs today</p>
        </div>

        <div className="space-y-3 border-l border-slate-800/60 pl-0 md:pl-6">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">If you reach rank #1</p>
          <p className="text-2xl font-semibold text-white">${revenueMetrics.targetRank1Revenue.toLocaleString()}</p>
          <p className="text-sm text-emerald-300">+${delta1.toLocaleString()} vs today</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <p>
          Every 1 position you climb on Maps adds approx.{' '}
          <span className="text-emerald-300 font-semibold">{deltaCallsPerPosition} extra calls</span> / month for
          this keyword.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={onViewActions}
            className="rounded-full border border-slate-800 bg-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/20"
          >
            See how to get there
          </button>
          <button
            onClick={onViewForecast}
            className="rounded-full border border-emerald-500/70 px-5 py-2 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/10"
          >
            View full forecast
          </button>
        </div>
      </div>
    </section>
  )
}
