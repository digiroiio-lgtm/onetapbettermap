'use client'

import Link from 'next/link'

const pillars = [
  {
    title: 'Real-world visibility, not averages',
    body:
      'We analyze multiple coordinates around your business to reflect how customers actually see you across your service area.',
  },
  {
    title: 'Clear scores, not vague data',
    body:
      'Our Visibility Score condenses dozens of map signals into a single, actionable number. No vanity metrics, no noise.',
  },
  {
    title: 'Competitive context',
    body:
      'Ranking alone doesn’t matter. MapsRankChecker™ shows how you perform next to the competitors customers really encounter.',
  },
  {
    title: 'Built for action',
    body:
      'Every report highlights exact gaps across keywords, categories, reviews, photos, and proximity—so you always know what to fix next.',
  },
]

const personas = [
  'Local businesses that rely on foot traffic or nearby discovery',
  'Multi-location brands tracking visibility across regions',
  'Marketing teams and agencies managing local SEO clients',
  'Owners and operators who want clarity, not complexity',
]

const principles = [
  'Local visibility should be measurable',
  'Insights should be visual and obvious',
  'Reports should lead to decisions, not confusion',
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-16 px-4 pb-24 pt-28 sm:px-6 lg:px-8">
        <header className="text-center space-y-6">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">About MapsRankChecker™</p>
          <h1 className="text-4xl font-semibold text-white sm:text-5xl">
            Helping businesses get found where it matters most
          </h1>
          <p className="text-lg text-slate-300">
            MapsRankChecker™ helps local businesses understand, track, and improve how they appear on Google Maps—
            without guesswork, spreadsheets, or expensive agencies.
          </p>
          <div className="flex flex-col items-center gap-4 text-slate-400">
            <p>
              If customers are searching nearby, you should know where you rank, why you rank there, and what to fix next.
              That’s exactly why we built MapsRankChecker™.
            </p>
            <Link
              href="/#scan-section"
              className="inline-flex items-center rounded-full bg-white px-8 py-3 text-base font-semibold text-slate-900 transition hover:bg-white/90"
            >
              Start Free Scan →
            </Link>
          </div>
        </header>

        <section className="rounded-[32px] border border-white/5 bg-white/5 px-6 py-10 sm:px-10">
          <h2 className="text-2xl font-semibold text-white">Why MapsRankChecker™ exists</h2>
          <p className="mt-4 text-base text-slate-300">
            Most local SEO tools fall into two extremes:
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">Too simple</p>
              <p className="mt-2 text-sm text-slate-400">
                Surface-level metrics with no real insight or guidance.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-semibold text-white">Too complex</p>
              <p className="mt-2 text-sm text-slate-400">
                Overwhelming dashboards made for specialists, not business owners.
              </p>
            </div>
          </div>
          <p className="mt-6 text-base text-slate-300">
            MapsRankChecker™ sits right in the middle. We focus on one question only:
          </p>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-lg font-semibold text-white">
              “If someone searches near my location, will they find me — and why?”
            </p>
            <p className="mt-3 text-sm text-slate-400">
              By scanning real-world points around your business, we reveal how visible you are across your service area
              and how you compare to the competitors customers actually see.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">What makes us different</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Product-led visibility intelligence</h2>
            <p className="mt-3 text-base text-slate-300">
              No hype, no tricks—just clarity you can act on.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-lg font-semibold text-white">{pillar.title}</p>
                <p className="mt-3 text-sm text-slate-400">{pillar.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-white/5 bg-white/5 px-6 py-10 sm:px-10">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Who it’s for</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">MapsRankChecker™ is built for</h2>
          <ul className="mt-6 space-y-3 text-base text-slate-300">
            {personas.map((persona) => (
              <li key={persona} className="flex items-start gap-3">
                <span className="text-slate-400">•</span>
                <span>{persona}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-slate-400">
            Whether you run a dental clinic, restaurant, law firm, gym, or service business—if Google Maps drives
            customers to you, this tool is for you.
          </p>
        </section>

        <section className="rounded-[32px] border border-white/5 bg-white/5 px-6 py-10 sm:px-10">
          <h2 className="text-2xl font-semibold text-white">Our approach</h2>
          <p className="mt-3 text-base text-slate-300">We believe:</p>
          <ul className="mt-4 space-y-3 text-base text-slate-300">
            {principles.map((principle) => (
              <li key={principle} className="flex items-start gap-3">
                <span className="text-slate-400">•</span>
                <span>{principle}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-slate-400">
            That’s why MapsRankChecker™ is designed around visual heatmaps, plain-language insights, and clear upgrade
            paths—no long-term contracts required. Start small, see real data, upgrade only if it makes sense.
          </p>
        </section>

        <section className="rounded-[32px] border border-emerald-500/30 bg-emerald-500/5 px-6 py-10 sm:px-10">
          <h2 className="text-2xl font-semibold text-white">Transparency & trust</h2>
          <p className="mt-4 text-base text-slate-200">
            MapsRankChecker™ does not manipulate rankings or use unsafe practices. We analyze publicly available Google
            Maps data and present it in a structured, understandable way.
          </p>
          <p className="mt-4 text-base text-slate-200">No tricks. No shortcuts. Just visibility—clearly explained.</p>
        </section>

        <section className="text-center space-y-4">
          <h2 className="text-3xl font-semibold text-white">Try it for yourself</h2>
          <p className="text-base text-slate-300">
            You don’t need an account or a credit card to start. Run a free scan, see how visible your business really is,
            and decide if MapsRankChecker™ is right for you.
          </p>
          <Link
            href="/#scan-section"
            className="inline-flex items-center rounded-full bg-white px-8 py-3 text-base font-semibold text-slate-900 transition hover:bg-white/90"
          >
            Start Free Scan
          </Link>
          <p className="text-sm text-slate-500">Stop guessing. Start ranking.</p>
        </section>
      </div>
    </main>
  )
}
