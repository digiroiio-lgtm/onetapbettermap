import Link from 'next/link'
import type { Metadata } from 'next'
import BlogFooterCTA from '../components/BlogFooterCTA'

const canonical = 'https://mapsrankchecker.com/blog/google-maps-ranking-report-template'

export const metadata: Metadata = {
  title: 'Google Maps Ranking Report Template & Checklist',
  description:
    'Build a repeatable report with visibility score, GeoGrid coverage, and revenue impact so stakeholders trust your Maps strategy.',
  openGraph: {
    title: 'Google Maps Ranking Report Template & Checklist',
    description:
      'Build a repeatable report with visibility score, GeoGrid coverage, and revenue impact so stakeholders trust your Maps strategy.',
    url: canonical,
    type: 'article',
  },
  alternates: {
    canonical,
  },
}

export default function ReportTemplatePage() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <article className="space-y-6">
          <header className="space-y-3">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Blog</p>
            <h1 className="text-3xl font-semibold leading-tight">
              Google Maps Ranking Report Template & Checklist
            </h1>
            <p className="text-slate-400">
              Stakeholders buy into Maps strategy when you tie visibility to calls, zones, and revenue.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Report structure</h2>
            <p className="text-slate-300">
              Start with the visibility score, then drop in GeoGrid coverage, competitor movement, and revenue delta. Keep each section short so leadership can skim.
            </p>
            <ul className="list-disc space-y-2 pl-5 text-slate-300">
              <li>Summary: current rank, revenue at rank #3, and a quick narrative.</li>
              <li>GeoGrid heatmap: color-coded zones with rank references.</li>
              <li>Action plan: tie each action to visibility points and expected revenue (see <Link href="/guides/google-maps-ranking" className="text-emerald-300 underline-offset-4 hover:underline">the ranking guide</Link>).</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Checklist</h2>
            <ol className="list-decimal space-y-2 pl-5 text-slate-300">
              <li>Run the GeoGrid scan and export the coverage report.</li>
              <li>Capture competitor movement from the last 7 days.</li>
              <li>Estimate the revenue hit via <Link href="/features/revenue-forecaster" className="text-emerald-300 underline-offset-4 hover:underline">Revenue Forecaster</Link>.</li>
              <li>Publish insights with clear CTAs: re-scan, run actions, or upgrade visibility.</li>
            </ol>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Delivery tips</h2>
            <p className="text-slate-300">
              Share the report weekly and include the CTA to <Link href="/free-scan" className="text-emerald-300 underline-offset-4 hover:underline">run a free scan</Link> so new prospects can validate their ranks instantly.
            </p>
            <p className="text-slate-300">
              Keep it educational: focus on what the data shows, not on product pitches.
            </p>
          </section>

          <BlogFooterCTA />
        </article>
      </div>
    </main>
  )
}
