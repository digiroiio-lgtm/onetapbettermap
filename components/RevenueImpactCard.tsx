import Link from 'next/link'

type RevenueImpactCardProps = {
  rankImprovementTo3: number
  callsGained: number
  directionsGained: number
  customersGained: number
  monthlyRevenueImpact: number
  className?: string
  ctaHref?: string
  ctaLabel?: string
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)

export default function RevenueImpactCard({
  rankImprovementTo3,
  callsGained,
  directionsGained,
  customersGained,
  monthlyRevenueImpact,
  className,
  ctaHref = '/upgrade',
  ctaLabel = 'View detailed forecast →',
}: RevenueImpactCardProps) {
  return (
    <div
      className={`rounded-[24px] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)] ${className ?? ''}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Revenue Impact</p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#3b82f6]/30 bg-[#3b82f6]/10 px-3 py-1 text-xs font-semibold text-[#3b82f6]">
            <span className="inline-flex h-5 items-center justify-center rounded-full bg-[#3b82f6] px-2 text-[10px] text-white">NEW</span>
            Revenue Forecaster
          </div>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300">
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden className="text-emerald-300">
            <path
              fill="currentColor"
              d="M5 14.5L10 9.5L13.5 13L20 6.5V11H22V4H15V6H19.086L13.5 11.586L10 8.086L3.5 14.586L5 16.5Z"
            />
          </svg>
        </div>
      </div>
      <div className="mt-6 space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5">
        <p className="text-sm font-semibold text-white">If rank improves to #{rankImprovementTo3}</p>
        <ul className="space-y-2 text-sm text-slate-200">
          <li>+{callsGained} calls / month</li>
          <li>+{directionsGained} direction requests</li>
          <li>+{customersGained} booked appointments</li>
          <li className="font-semibold text-emerald-300">≈ {formatCurrency(monthlyRevenueImpact)} monthly revenue ↑</li>
        </ul>
      </div>
      <div className="mt-6 flex items-center justify-between text-sm">
        <p className="text-slate-400">Powered by CTR + conversion benchmarks.</p>
        <Link href={ctaHref} className="font-semibold text-white underline-offset-4 hover:underline">
          {ctaLabel}
        </Link>
      </div>
    </div>
  )
}
