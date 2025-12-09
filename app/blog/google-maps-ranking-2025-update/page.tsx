import Link from 'next/link'
import type { Metadata } from 'next'
import BlogFooterCTA from '../../components/BlogFooterCTA'

const canonical = 'https://mapsrankchecker.com/blog/google-maps-ranking-2025-update'

export const metadata: Metadata = {
  title: 'Google Maps Ranking 2025 Update & Revenue Impact',
  description:
    'Learn how Google Maps ranking is evolving in 2025, what signals still matter, and how to turn the changes into revenue gains.',
  openGraph: {
    title: 'Google Maps Ranking 2025 Update & Revenue Impact',
    description:
      'Learn how Google Maps ranking is evolving in 2025, what signals still matter, and how to turn the changes into revenue gains.',
    url: canonical,
    type: 'article',
  },
  alternates: {
    canonical,
  },
}

export default function RankingUpdatePage() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <article className="space-y-6">
          <header className="space-y-3">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Blog</p>
            <h1 className="text-3xl font-semibold leading-tight">Google Maps Ranking 2025 Update & Revenue Impact</h1>
            <p className="text-slate-400">
              Ranking is evolving, but the revenue calculus stays steady: better visibility equals more calls.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Signals that gained weight</h2>
            <p className="text-slate-300">
              Prominence signals like reviews and photos carry more weight as Google tests local trust indicators. Track these signals weekly and log responses to keep momentum.
            </p>
            <p className="text-slate-300">
              Proximity is still critical, yet now the platform also rewards behavioral signals—click-through rates, direct calls, and conversions. Link this to your <Link href="/features/revenue-forecaster" className="text-emerald-300 underline-offset-4 hover:underline">revenue forecast</Link>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">What to do with ranking volatility</h2>
            <p className="text-slate-300">
              Expect fluctuation. Log competitor movements, tie them to your GeoGrid, and highlight revenue risk when you publish updates to stakeholders.
            </p>
            <p className="text-slate-300">
              The <Link href="/guides/google-maps-grid-visibility" className="text-emerald-300 underline-offset-4 hover:underline">GeoGrid guide</Link> explains how coverage reveals true ranking health.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Keep the revenue story consistent</h2>
            <p className="text-slate-300">
              Build dashboards that say: this rank drop cost X calls; this gain adds Y customers. That is how you keep the conversation on revenue.
            </p>
            <p className="text-slate-300">
              Start with a fresh scan at <Link href="/free-scan" className="text-emerald-300 underline-offset-4 hover:underline">free scan</Link> and prove the delta.
            </p>
          </section>

          <BlogFooterCTA />
        </article>
      </div>
    </main>
  )
}
