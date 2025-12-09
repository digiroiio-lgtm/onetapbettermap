'use client'

import Link from 'next/link'

const partnerBenefits = [
  {
    title: 'Recurring commissions',
    detail:
      'Earn 20% on every subscription you refer—paid monthly for as long as the account stays active. Higher tiers unlock a 30% share.',
  },
  {
    title: 'Ready-made revenue playbooks',
    detail:
      'Send prospects a live demo, revenue forecast, and SaaS proof bundle without building a single slide. The content is polished and structured for C-suite decision makers.',
  },
  {
    title: 'Dedicated partner success',
    detail:
      'Partner managers help you qualify leads, map the ideal plan, and track analytics so you can attribute every upgrade back to your referral.',
  },
]

const steps = [
  {
    label: '01',
    title: 'Join the partner list',
    description:
      'Apply with your agency, platform, or community. We vet proof of work, then grant access to the partner portal in under 24 hours.',
  },
  {
    label: '02',
    title: 'Recommend MapsRankChecker™',
    description:
      'Share your unique link inside proposals, dashboards, or email cadences. We provide battle-tested copy that frames the product as revenue recovery.',
  },
  {
    label: '03',
    title: 'Celebrate clean revenue',
    description:
      'Watch dashboards update with credited upgrades. Celebrate wins with co-branded collateral and tactically timed nudge emails.',
  },
]

export default function AffiliatePage() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-100">
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">
              Partner & Affiliate
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Turn your audience into a revenue stream while their businesses stop losing local calls.
            </h1>
            <p className="text-lg text-slate-300">
              Every plan we sell comes with a revenue forecast, competitor intelligence, and CTA-ready dashboards—so partners can confidently pitch MapsRankChecker™ as the “Map visibility recovery” lever that pays for itself.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-8 py-3 text-base font-semibold text-slate-900 transition hover:bg-emerald-400"
              >
                Apply as a partner
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-3 text-base font-semibold text-white transition hover:bg-white/10"
              >
                View demo collateral
              </Link>
            </div>
            <div className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
              <p className="font-semibold text-white">Focus</p>
              <p>
                We vet partners who generate demand from dental, restaurant, law firm, agency, and enterprise audiences. If you sell or advise local SEO, we want to work with you.
              </p>
            </div>
          </div>
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 text-sm">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Partner promise</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Monthly payouts + transparent tracking</h2>
            <ul className="mt-6 space-y-3 text-slate-300">
              <li>• Unique tracking links per partner with daily attribution</li>
              <li>• Stripe payouts every month, no minimum</li>
              <li>• Co-branded decks & revenue proof to accelerate trust</li>
              <li>• Early access to roadmap + new features</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-slate-900/70">
        <div className="mx-auto max-w-6xl space-y-8 px-4 py-16">
          <div className="space-y-3 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">How it works</p>
            <h2 className="text-3xl font-semibold text-white">Three simple steps to drive MAP upgrades</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <article key={step.label} className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/80 p-6">
                <span className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">{step.label}</span>
                <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                <p className="text-sm text-slate-300">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">Why partners love it</p>
            <h2 className="text-3xl font-semibold text-white">Programs that feel like revenue machines</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {partnerBenefits.map((benefit) => (
              <article key={benefit.title} className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
                <p className="text-lg font-semibold text-white">{benefit.title}</p>
                <p className="mt-3 text-sm text-slate-300">{benefit.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-emerald-500/60 to-sky-500/60 px-4 py-16">
        <div className="mx-auto max-w-4xl space-y-4 text-center text-slate-900">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-800">Ready to add recurring MRR</p>
          <h2 className="text-3xl font-semibold">Apply, promote, and collect—without building a new SaaS.</h2>
          <p className="text-base">
            Partners get immediate access to referral collateral, revenue scripts, and a dashboard that shows how each upgrade ties back to their audience. Set it up once; keep getting paid.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Apply to partner →
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-full border border-white/70 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Pricing & partner tiers
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
