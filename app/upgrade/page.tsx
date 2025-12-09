'use client'

import Link from 'next/link'

const plans = [
  {
    name: 'Free',
    price: '$0',
    headline: 'Start seeing what you’re leaving on the table',
    subcopy: 'Perfect for discovering how MapsRankChecker translates visibility into revenue.',
    bullets: [
      '100 scans / month',
      '1 business profile',
      'Track 1 location area',
      'Basic grid depth',
    ],
    revenueContext: 'See your current rank, estimated calls, and revenue gaps — no credit card required.',
    cta: 'Run Free Scan',
    ctaHref: '/#scan-section',
    highlight: false,
    badge: null,
    tier: 'demo',
  },
  {
    name: 'Starter',
    price: '$29 / mo',
    headline: 'Unlock your first local revenue gains',
    subcopy: 'Best for single-location owners starting to convert visibility into calls.',
    bullets: [
      '50 scans / month',
      '1 business profile',
      'Up to 5 keywords',
      '5 competitors',
      'Basic grid depth',
    ],
    revenueContext: 'Typically helps unlock an extra $300–$600/month once your ranking starts moving.',
    extraNote: 'Most users outgrow Starter within 7–10 days as more zones need tracking.',
    cta: 'Start Tracking',
    ctaHref: '/signup',
    highlight: false,
    badge: null,
    tier: 'paid',
  },
  {
    name: 'Growth',
    price: '$79 / mo',
    headline: 'Where real revenue growth starts',
    subcopy: 'Designed for businesses that want predictable inbound from Google Maps.',
    bullets: [
      '500 scans / month',
      '5 business profiles',
      'Unlimited keywords',
      '10 competitors',
      'Advanced grid depth',
      'Visibility score & timeline',
      'Team access',
    ],
    revenueContext: 'Enough scan depth to identify $1k–$5k/month in missed calls and opportunities.',
    extraNote: 'Most teams upgrade to Growth after their first week.',
    cta: 'Grow My Visibility',
    ctaHref: '/signup',
    highlight: true,
    badge: '⭐ MOST POPULAR',
    tier: 'paid',
  },
  {
    name: 'Scale',
    price: '$199 / mo',
    headline: 'Replace guesswork with scalable inbound revenue',
    subcopy: 'Built for agencies and multi-location brands managing growth at scale.',
    bullets: [
      '20k+ scans / month',
      'Up to 50 business profiles',
      'Unlimited keywords',
      '20+ competitors',
      'Pro grid depth',
      'White-label reporting',
      'Multi-location dashboard',
      'Priority support',
    ],
    revenueContext: 'Designed to replace 1–2 junior SEO hires at a fraction of the cost.',
    cta: 'Step Up to Scale',
    ctaHref: '/signup',
    highlight: false,
    badge: null,
    tier: 'paid',
  },
]

const revenueForecastFeatures = [
  'Call & customer projections by rank',
  'Revenue impact of moving from #12 → #3 → #1',
  'Zone-level visibility and money insights',
]

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
        <header className="text-center space-y-3">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-500">PRICING</p>
          <h1 className="text-4xl font-semibold text-white">Simple plans. Real revenue impact.</h1>
          <p className="text-base text-slate-400">
            Choose the plan that fits your business today — upgrade anytime as your visibility turns into calls and customers.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-4">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`flex flex-col justify-between rounded-[28px] border p-6 shadow-2xl transition ${
                plan.highlight
                  ? 'bg-gradient-to-b from-[#111827] via-[#111827] to-[#0f172a] border-emerald-500/60 shadow-emerald-500/20 scale-[1.02]'
                  : 'bg-white/5 border-white/10'
              }`}
            >
              <div className="space-y-4">
                {plan.badge && (
                  <div className="text-[10px] uppercase tracking-[0.5em] text-amber-300">{plan.badge}</div>
                )}
                <div>
                  <p className="text-2xl font-semibold text-white">{plan.name}</p>
                  <p className="text-2xl text-slate-300">{plan.price}</p>
                </div>
                <p className="text-sm text-slate-300">{plan.headline}</p>
                <p className="text-xs text-slate-400">{plan.subcopy}</p>
                <ul className="space-y-2 text-sm text-slate-200">
                  {plan.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2">
                      <span>•</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
                <p className="text-xs italic text-slate-400 border-l-2 border-slate-600 pl-3">{plan.revenueContext}</p>
                {plan.extraNote && (
                  <p className="text-[11px] text-slate-500">{plan.extraNote}</p>
                )}
              </div>
              <Link
                href={plan.ctaHref}
                className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-4 py-3 text-sm font-semibold transition ${
                  plan.highlight
                    ? 'bg-white text-black hover:bg-white/90'
                    : 'border border-white/30 hover:bg-white/10'
                }`}
              >
                {plan.cta}
              </Link>
            </article>
          ))}
        </section>

        <section className="rounded-[32px] border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-white">Revenue Forecasting — always on</h2>
          <p className="text-sm text-slate-300 mt-1">
            We don’t lock forecasts behind paywalls — we use them to help you decide when to upgrade. Included in every paid plan.
          </p>
          <ul className="mt-4 grid gap-2 text-sm text-slate-200 md:grid-cols-3">
            {revenueForecastFeatures.map((feature) => (
              <li key={feature} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
                {feature}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-[28px] border border-white/10 bg-white/5 p-8 space-y-3">
          <p className="text-sm text-slate-400 uppercase tracking-[0.3em]">🏆 DOMINANCE — Enterprise Grade</p>
          <h3 className="text-2xl font-semibold text-white">When visibility IS your growth engine</h3>
          <p className="text-sm text-slate-300">
            Lead-capture positioning for teams ready to dominate local search without overpromising implementation details.
          </p>
          <ul className="space-y-2 text-sm text-slate-200">
            <li>30k+ scans</li>
            <li>Unlimited locations</li>
            <li>API access & SLA</li>
            <li>Custom exports & reporting</li>
          </ul>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            Talk to Sales
          </Link>
        </section>

        <footer className="text-center text-sm text-slate-400">
          <p>No credit card required • 100 scans/month free • Upgrade anytime</p>
          <p className="mt-1">Stop guessing. Start ranking — and start capturing missed revenue.</p>
        </footer>
      </div>
    </main>
  )
}
