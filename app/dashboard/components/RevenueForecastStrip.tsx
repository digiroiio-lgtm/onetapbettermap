import type { RevenueMetrics } from '../types'

type Props = {
  revenueMetrics: RevenueMetrics
}

const formatCurrency = (value: number) => `$${value.toLocaleString()}`
const computeCustomers = (calls: number) => Math.max(3, Math.round(calls * 0.22))

export default function RevenueForecastStrip({ revenueMetrics }: Props) {
  const extraRevenue = revenueMetrics.targetRank1Revenue - revenueMetrics.currentMonthlyRevenue
  const forecastVariants = [
    {
      label: 'Rank #3',
      calls: revenueMetrics.estCallsAtRank3,
      revenue: revenueMetrics.targetRank3Revenue,
    },
    {
      label: 'Rank #1',
      calls: revenueMetrics.estCallsAtRank1,
      revenue: revenueMetrics.targetRank1Revenue,
    },
  ]

  return (
    <section className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6 text-slate-100 shadow-xl shadow-black/40">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Revenue Forecast</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Impact if you climb the map</h2>
      </div>

      <div className="mt-6">
        <div className="h-14 rounded-full bg-gradient-to-r from-emerald-500/40 via-sky-500/30 to-fuchsia-500/40" />
        <p className="mt-2 text-xs text-slate-400">Projected call uplift by improving rank</p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {forecastVariants.map((variant) => (
          <div key={variant.label} className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">{variant.label}</p>
            <p className="text-2xl font-semibold text-white">{variant.calls.toLocaleString()} calls</p>
            <p className="text-xs text-slate-500">calls / month</p>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-slate-400">customers / month</span>
              <span className="text-white font-semibold">{computeCustomers(variant.calls)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-slate-400">revenue / month</span>
              <span className="text-white font-semibold">{formatCurrency(variant.revenue)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-2 border-t border-slate-800 pt-4 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <p>
          You’re leaving <span className="text-emerald-300 font-semibold">{formatCurrency(extraRevenue)}</span> on the
          table vs rank #1.
        </p>
        <button
          onClick={() => {
            console.log('TODO: show full forecast modal')
          }}
          className="text-sm font-semibold text-emerald-300 underline-offset-4 transition hover:text-emerald-200"
        >
          See full forecast →
        </button>
      </div>
    </section>
  )
}
