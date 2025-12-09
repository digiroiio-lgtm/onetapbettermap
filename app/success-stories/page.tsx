import type { Metadata } from 'next'
import Link from 'next/link'

const stories = [
  {
    company: 'SmileWorks Dental',
    industry: 'Dental clinics — Antalya, Türkiye',
    challenge:
      'Ranked #6 for “implant dentist near me” and invisible outside the office radius, costing an estimated $7,200 in lost implant cases each month.',
    solution:
      'GeoGrid scans revealed 17/49 cells in the top 10 while the key implant keywords were nowhere to be found in surrounding neighborhoods; action checklist prioritized review velocity and localized photo shoots.',
    results: [
      '+3 implant cases per month',
      '+$8,400 in recovered revenue with no new ad budget',
      'Growth plan unlocked unlimited keyword tracking across the city',
    ],
  },
  {
    company: 'Urban Table Bistro',
    industry: 'Restaurants — Istanbul, Türkiye',
    challenge:
      'Strong reviews but rankings fluctuated between #10–#15 depending on time of day, yielding thirty-eight missed reservations per month (~$4,600).',
    solution:
      '14×14 ranking grid segmented lunch vs dinner zones, surfaced the “open now” keywords, and automated refresh alerts ahead of the weekend rush.',
    results: [
      '+38 reservations / month (+$4,600 in bookings)',
      'Scale plan onboarded to keep every location’s grid in sync',
      'Weekly alerts routed to operations to keep staff aligned',
    ],
  },
  {
    company: 'Atlas Injury Law',
    industry: 'Law firms — Miami, USA',
    challenge:
      'Paid spend was steady yet Maps generated only 1–2 cases a month because competitors showed up higher for accident + injury searches.',
    solution:
      'Revenue Forecaster quantified what a single rank gain meant ($12,000 pipeline), competitor alerts tracked velocity, and action automation refreshed case-specific listings.',
    results: [
      '+1–2 high-ticket cases / month',
      '+$12,000/month pipeline lift validated the Growth budget',
      'Alerts reduced reaction time to 3 days before competitors gained ground',
    ],
  },
]

export const metadata: Metadata = {
  title: 'Success Stories | MapsRankChecker',
  description: 'Revenue-focused success stories from dentists, restaurants, and law firms using MapsRankChecker to win ranking fights and unlock clean MRR.',
}

export default function SuccessStoriesPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-100">
      <section className="bg-slate-900">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-2">
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">Client revenue wins</p>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              Magnetic proof that MapsRankChecker turns search visibility into revenue.
            </h1>
            <p className="text-lg text-slate-300">
              These teams stopped guessing what customers see on Google Maps. They now point stakeholders to dashboards, not screenshots, and track the revenue unlocked every week.
            </p>
            <div className="flex flex-wrap gap-3">
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
                Show the pricing story →
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Playbook highlights</p>
              <h2 className="text-2xl font-semibold text-white">Revenue-first cadence</h2>
            </div>
            <ul className="space-y-3 text-sm text-slate-200">
              <li>→ Rank moves mapped to calls, then to dollars (rank → CTR → calls → revenue).</li>
              <li>→ Alerts flagged competitor jumps that steal ~22 calls within a week.</li>
              <li>→ Action checklists shipped to ops, not just SEO teams.</li>
              <li>→ Stripe-backed reporting proves the ROI for every upgrade.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-4 py-16">
        {stories.map((story) => (
          <article
            key={story.company}
            className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl"
          >
            <div className="flex flex-col gap-3 border-b border-slate-800 pb-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">{story.industry}</p>
                <h2 className="text-3xl font-semibold text-white">{story.company}</h2>
              </div>
              <span className="rounded-full border border-emerald-500/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
                Revenue proof live
              </span>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white">Challenge</h3>
                <p className="text-sm text-slate-300">{story.challenge}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white">Solution</h3>
                <p className="text-sm text-slate-300">{story.solution}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white">Results</h3>
                <ul className="space-y-1 text-sm text-emerald-100">
                  {story.results.map((result) => (
                    <li key={result} className="list-disc pl-4 text-slate-200">
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="bg-gradient-to-r from-emerald-500/80 to-sky-500/70 px-4 py-16 text-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-white/80">Ready to show that map wins money?</p>
          <h2 className="text-4xl font-semibold">Turn your case study into an upgrade story.</h2>
          <p className="text-lg text-white/90">
            Launch a scan, invite leadership, and show them the Maps report that proves uplift before you spend another dollar.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/demo"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              View the demo report
            </Link>
            <Link
              href="/pricing?highlight=growth"
              className="inline-flex items-center justify-center rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Highlight Growth plan
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
