import Link from 'next/link'

type CTRModel = {
  [key: number]: number;
  [key: string]: number;
};

type GbpInsights = {
  calls: number
  directions: number
  clicks: number
}

type RevenueForecastPanelProps = {
  currentRank: number
  targetRank: number
  avgOrderValue: number
  conversionRate: number
  ctrModel: CTRModel
  gbpInsights: GbpInsights
}

type Projection = {
  rank: number
  calls: number
  customers: number
  revenue: number
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)

const getCtrValue = (rank: number, ctrModel: CTRModel) => {
  const numericRecord = ctrModel as Record<number, number>
  if (typeof numericRecord[rank] === 'number') {
    return numericRecord[rank]!
  }

  const stringRecord = ctrModel as Record<string, number>
  const stringKey = rank.toString()
  if (typeof stringRecord[stringKey] === 'number') {
    return stringRecord[stringKey]!
  }

  if (rank === 1) return 0.22
  if (rank === 2) return 0.16
  if (rank === 3) return 0.12
  if (rank <= 5) return 0.08
  if (rank <= 10) return 0.035
  return 0.01
}

const buildProjection = (
  rank: number,
  ctrModel: CTRModel,
  gbpInsights: GbpInsights,
  conversionRate: number,
  avgOrderValue: number,
): Projection => {
  const opportunityVolume = Math.max(
    gbpInsights.calls * 1.5 + gbpInsights.directions + gbpInsights.clicks,
    60,
  )
  const ctr = getCtrValue(rank, ctrModel)
  const projectedCalls = Math.round(opportunityVolume * ctr)
  const projectedCustomers = Math.max(1, Math.round(projectedCalls * conversionRate))
  const projectedRevenue = projectedCustomers * avgOrderValue

  return {
    rank,
    calls: projectedCalls,
    customers: projectedCustomers,
    revenue: projectedRevenue,
  }
}

export default function RevenueForecastPanel({
  currentRank,
  targetRank,
  avgOrderValue,
  conversionRate,
  ctrModel,
  gbpInsights,
}: RevenueForecastPanelProps) {
  const currentProjection = buildProjection(
    currentRank,
    ctrModel,
    gbpInsights,
    conversionRate,
    avgOrderValue,
  )
  const targetProjection = buildProjection(
    targetRank,
    ctrModel,
    gbpInsights,
    conversionRate,
    avgOrderValue,
  )
  const rankOneProjection = buildProjection(
    1,
    ctrModel,
    gbpInsights,
    conversionRate,
    avgOrderValue,
  )

  const deltaToTarget = targetProjection.revenue - currentProjection.revenue
  const deltaToRankOne = rankOneProjection.revenue - currentProjection.revenue

  return (
    <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-white/10 via-[#0f172a]/40 to-transparent p-6 text-white shadow-[0_25px_60px_rgba(2,6,23,0.45)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Revenue Forecast</p>
          <h3 className="mt-2 text-2xl font-semibold">Impact if you climb the map</h3>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-emerald-400/10 px-4 py-2 text-xs font-semibold text-emerald-200">
          <span className="inline-flex h-5 items-center justify-center rounded-full bg-emerald-300/80 px-2 text-[10px] text-slate-900">
            NEW
          </span>
          Revenue Forecaster
        </div>
      </div>

      <div className="mt-6 relative">
        <div className="h-32 rounded-3xl border border-white/10 bg-gradient-to-r from-[#3b82f6]/10 via-transparent to-[#22c55e]/10">
          <svg viewBox="0 0 320 120" className="absolute inset-3 h-[calc(100%-24px)] w-[calc(100%-24px)] opacity-70">
            <defs>
              <linearGradient id="revLine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            <path
              d="M10 90 C 90 20, 150 100, 230 40 S 300 10, 310 20"
              stroke="url(#revLine)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="absolute inset-0 flex items-center justify-between px-6 text-xs text-slate-400">
          <span>Current #{currentRank}</span>
          <span>Target #{targetRank}</span>
          <span>#1</span>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {[targetProjection, rankOneProjection].map((projection) => (
          <div key={projection.rank} className="rounded-2xl border border-white/15 bg-white/5 p-5">
            <p className="text-sm text-slate-400">
              If you reach <span className="font-semibold text-white">rank #{projection.rank}</span>
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              <li>
                +{projection.calls} calls · +{Math.max(2, Math.round(projection.calls * 0.4))} direction
                requests
              </li>
              <li>≈ {projection.customers} customers / month</li>
              <li className="text-base font-semibold text-emerald-300">
                {formatCurrency(projection.revenue)} monthly revenue ↑
              </li>
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-emerald-100 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-white">
            +{formatCurrency(deltaToTarget)} vs rank #{currentRank}
          </p>
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-200">Target #{targetRank}</p>
        </div>
        <div>
          <p className="font-semibold text-white">+{formatCurrency(deltaToRankOne)} potential</p>
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-200">If you own rank #1</p>
        </div>
        <Link href="/upgrade" className="text-sm font-semibold text-white underline-offset-4 hover:underline">
          See full forecast →
        </Link>
      </div>
    </div>
  )
}
