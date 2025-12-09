import Link from 'next/link'
import type { Metadata } from 'next'
import BlogFooterCTA from '../components/BlogFooterCTA'

const canonical = 'https://mapsrankchecker.com/blog/how-to-check-google-maps-ranking'

export const metadata: Metadata = {
  title: 'How to Check Google Maps Ranking the Right Way',
  description:
    'Use GeoGrid data, competitor probes, and revenue context to check your Google Maps ranking without chasing vanity metrics.',
  openGraph: {
    title: 'How to Check Google Maps Ranking the Right Way',
    description:
      'Use GeoGrid data, competitor probes, and revenue context to check your Google Maps ranking without chasing vanity metrics.',
    url: canonical,
    type: 'article',
  },
  alternates: {
    canonical,
  },
}

export default function HowToCheckPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <article className="space-y-6">
          <header className="space-y-3">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Blog</p>
            <h1 className="text-3xl font-semibold leading-tight">
              How to Check Google Maps Ranking the Right Way
            </h1>
            <p className="text-slate-400">
              Combine GeoGrid insights, revenue forecasting, and competitor probes to see how your visibility really fares.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">GeoGrid &gt; single-point checks</h2>
            <p className="text-slate-300">
              Google Maps rankings shift every few blocks. A single search result is noise. Instead, run a GeoGrid scan that captures 49 nearby points and spot where you really outrank competitors.
            </p>
            <p className="text-slate-300">
              Match those cells to your revenue model via the <Link href="/features/revenue-forecaster" className="text-emerald-300 underline-offset-4 hover:underline">Revenue Forecaster</Link> so you know which rank buckets cost you money.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Combine local queries and revenue context</h2>
            <p className="text-slate-300">
              Use consistent search terms from top intent keywords, then compare the ranks across at least three neighborhoods. Logging the average gives a better signal than relying on one device.
            </p>
            <ul className="list-disc space-y-2 pl-5 text-slate-300">
              <li>Record keyword, city, and neighborhood so you can surface trends.</li>
              <li>Overlay rank snapshots with call volume or revenue data from your CRM.</li>
              <li>Focus on how rank drops correlate to the <Link href="/guides/google-maps-ranking" className="text-emerald-300 underline-offset-4 hover:underline">core ranking guide</Link> metrics: relevance, proximity, and prominence.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Keep checks fast and repeatable</h2>
            <p className="text-slate-300">
              Short-form scans every Monday keep you honest. Notice when a rival overtakes you, then test whether your updates moved the needle in a few days.
            </p>
            <p className="text-slate-300">
              When you trust the process, the next step is obvious: channel readers to <Link href="/free-scan" className="text-emerald-300 underline-offset-4 hover:underline">run a free Google Maps visibility scan</Link> and baseline revenue leak points.
            </p>
          </section>

          <BlogFooterCTA />
        </article>
      </div>
    </main>
  )
}
