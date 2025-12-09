'use client'

import Link from 'next/link'

const proofPoints = [
  {
    label: 'Maps moves customers',
    stat: '+42%',
    detail: 'Average lift in organic calls after teams act on grid + action checklist insights.',
  },
  {
    label: 'Automation beats manual',
    stat: '4h → 15m',
    detail: 'Time saved per week once alerts and action plans are automated.',
  },
  {
    label: 'Revenue clarity',
    stat: '$1,200–$5,000',
    detail: 'Monthly revenue captured when a keyword moves from rank #12 → #3.',
  },
]

const leadership = [
  {
    title: 'Mission',
    body:
      'MapsRankChecker exists to turn Google Maps visibility into predictable revenue. We instrument every rank change so operators know exactly what a position is worth.',
  },
  {
    title: 'Approach',
    body:
      'We focus on clarity: intuitive heatmaps, revenue models, and guided actions—no guesses, no vanity metrics, just the playbook your team can execute weekly.',
  },
  {
    title: 'Trust',
    body:
      'We never inflate rankings or take shortcuts. All insights come from public Google Maps data, paired with conversion assumptions that match your industry.',
  },
]

const milestones = [
  'Built maps scanning tech that replays 49+ coordinates per location',
  'Open-sourced data models that translate rank → calls → revenue',
  'Partnered with agencies and clinics to run revenue-only case studies',
  'Guaranteed transparent billing—no hidden fees, no long-term lock-ins',
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-16 sm:px-6 lg:px-8">
        <header className="space-y-6 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">About MapsRankChecker™</p>
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Built to stop revenue leaks hiding inside Google Maps rankings.
          </h1>
          <p className="text-lg text-slate-300">
            We live at the intersection of local SEO, revenue ops, and product-grade automation. Our job is to highlight how visible your business remains across every street corner and what that visibility is worth.
          </p>
          <div className="flex flex-col items-center gap-4 text-slate-300 sm:flex-row sm:justify-center">
            <Link
              href="/free-scan"
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-8 py-3 text-base font-semibold text-slate-900 transition hover:bg-emerald-400"
            >
              Run a revenue-focused scan
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-3 text-base font-semibold text-white transition hover:bg-white/10"
            >
              Compare Growth & Scale
            </Link>
          </div>
        </header>

        <section className="grid gap-6 rounded-[32px] border border-white/10 bg-white/5 p-6 md:grid-cols-3">
          {proofPoints.map((point) => (
            <article key={point.label} className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500">{point.label}</p>
              <p className="text-3xl font-semibold text-white">{point.stat}</p>
              <p className="text-sm text-slate-300">{point.detail}</p>
            </article>
          ))}
        </section>

        <section className="space-y-6 rounded-[32px] border border-emerald-500/30 bg-emerald-500/10 p-6">
          <p className="text-xs uppercase tracking-[0.4em] text-emerald-100">Leadership</p>
          <h2 className="text-3xl font-semibold text-white">Revenue-first founders</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {leadership.map((item) => (
              <article key={item.title} className="rounded-2xl border border-emerald-200/40 bg-emerald-900/40 p-5">
                <p className="text-sm uppercase tracking-[0.3em] text-emerald-200">{item.title}</p>
                <p className="mt-3 text-sm text-white">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6 rounded-[32px] border border-white/10 bg-white/5 p-6">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">What we ship</p>
          <h2 className="text-2xl font-semibold text-white">Eyes on the map, money in the bank</h2>
          <p className="text-sm text-slate-300">
            Every release prioritizes clarity, not more charts. We ship guided playbooks, revenue dashboards, and analytics hooks that prove the ROI of every scan.
          </p>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            {milestones.map((milestone) => (
              <li key={milestone} className="flex items-start gap-3">
                <span className="text-slate-500">•</span>
                <span>{milestone}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-[32px] border border-white/5 bg-slate-900/60 p-6">
          <h2 className="text-2xl font-semibold text-white">Who we serve</h2>
          <p className="mt-2 text-sm text-slate-300">
            Operators who depend on Google Maps visibility to deliver revenue: dental clinics, restaurants, law firms, agencies, multi-location brands, and medical centers.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {['Map pack leadership', 'Revenue justification', 'Actionable automation'].map((item) => (
              <div key={item} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-white/5 p-6 text-center">
          <h2 className="text-3xl font-semibold text-white">Prove the impact</h2>
          <p className="mt-3 text-base text-slate-300">
            Bring MapsRankChecker dashboards to your next revenue review. Show leadership the call volume you gained, the keywords you won, and the revenue you recovered.
          </p>
          <Link
            href="/pricing"
            className="mt-6 inline-flex items-center justify-center rounded-full border border-emerald-400/70 px-8 py-3 text-base font-semibold text-white transition hover:bg-emerald-500/20"
          >
            See Growth vs Scale
          </Link>
        </section>
      </div>
    </main>
  )
}
