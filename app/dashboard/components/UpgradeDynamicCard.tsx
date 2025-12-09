import type { PlanInfo, RevenueMetrics } from '../types'

type Props = {
  currentPlan: PlanInfo
  nextPlan: PlanInfo | null
  revenueMetrics: RevenueMetrics
}

const planNarrative = (
  planName: PlanInfo['name'],
  nextPlanLabel: string,
  extraRevenue: number,
) => {
  if (planName === 'Free') {
    return `You’re on the Free plan. You can’t see the full competitor table or 90-day timeline yet. Upgrading to ${nextPlanLabel} could unlock approx. $${extraRevenue.toLocaleString()} / month by acting on hidden opportunities.`
  }
  if (planName === 'Starter') {
    return `You’re on Starter. ${nextPlanLabel} unlocks 21×21 grid scans, white-label exports, and automated alerts—worth approx. $${extraRevenue.toLocaleString()} / month based on your current numbers.`
  }
  if (planName === 'Growth') {
    return `You’re on Growth. Scaling up adds API access, SLA support, and deeper forecasting—worth approx. $${extraRevenue.toLocaleString()} / month when paired with existing action items.`
  }
  return `You’re already on Scale. You have access to the full revenue stack. Talk to success for custom forecasting upgrades.`
}

const formatList = (items: string[]) =>
  items.map((item) => (
    <li key={item} className="text-xs text-slate-300">
      {item}
    </li>
  ))

export default function UpgradeDynamicCard({ currentPlan, nextPlan, revenueMetrics }: Props) {
  const nextPlanLabel = nextPlan ? nextPlan.name : 'Scale'
  const extraRevenue = nextPlan?.estExtraRevenueIfUpgraded ?? currentPlan.estExtraRevenueIfUpgraded

  return (
    <section
      data-testid="upgrade-card"
      className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6 text-slate-100 shadow-xl shadow-black/40"
    >
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Upgrade</p>
        <h2 className="text-2xl font-semibold text-white">Unlock deeper revenue insights & more calls</h2>
      </div>
      <p className="mt-3 text-sm text-slate-400">
        {planNarrative(currentPlan.name, nextPlanLabel, extraRevenue)}
      </p>

      <div className="mt-6 grid gap-4">
        <div className="space-y-2 rounded-2xl border border-slate-800/80 bg-slate-950/40 p-4">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">What you have now</p>
          <p className="text-sm font-semibold text-white">{currentPlan.name}</p>
          <ul className="space-y-1">{formatList(currentPlan.unlockedFeatures)}</ul>
        </div>
        <div className="space-y-2 rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">What you unlock</p>
          <p className="text-sm font-semibold text-white">{nextPlanLabel}</p>
          <ul className="space-y-1">
            {nextPlan ? formatList(nextPlan.lockedFeatures.concat(nextPlan.unlockedFeatures)) : (
              <li className="text-xs text-slate-300">Full stack already unlocked</li>
            )}
          </ul>
        </div>
      </div>

      <p className="mt-4 text-xs uppercase tracking-[0.4em] text-slate-500">
        Estimated extra revenue if upgraded: <span className="text-emerald-300 font-semibold">${extraRevenue.toLocaleString()}/month</span>
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          data-testid="upgrade-next-plan-button"
          type="button"
          disabled={!nextPlan}
          className="w-full rounded-full border border-emerald-500/70 bg-emerald-500/10 px-5 py-3 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          Upgrade to {nextPlanLabel} →
        </button>
        <button
          type="button"
          onClick={() => {
            console.log('TODO: navigate to plans overview')
          }}
          className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400 transition hover:text-white"
        >
          See all plans
        </button>
      </div>
    </section>
  )
}
