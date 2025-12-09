import Link from 'next/link'
import type { Metadata } from 'next'
import BlogFooterCTA from '../../components/BlogFooterCTA'

const canonical = 'https://mapsrankchecker.com/blog/google-maps-ranking-for-dentists'

export const metadata: Metadata = {
  title: 'Google Maps Ranking for Dentists: Local SEO Guide',
  description:
    'Dentists need predictable visibility. Use GeoGrid, reviews, and revenue modeling to keep your patients calling instead of clicking competitors.',
  openGraph: {
    title: 'Google Maps Ranking for Dentists: Local SEO Guide',
    description:
      'Dentists need predictable visibility. Use GeoGrid, reviews, and revenue modeling to keep your patients calling instead of clicking competitors.',
    url: canonical,
    type: 'article',
  },
  alternates: {
    canonical,
  },
}

export default function DentistsRankingPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <article className="space-y-6">
          <header className="space-y-3">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Blog</p>
            <h1 className="text-3xl font-semibold leading-tight">Google Maps Ranking for Dentists: Local SEO Guide</h1>
            <p className="text-slate-400">
              Build a visibility playbook that turns map rankings into patient calls and predictable revenue.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Dentist visibility challenges</h2>
            <p className="text-slate-300">
              Competing across neighborhoods and specialties means local relevance matters. Track service-specific keywords and compare them through the <Link href="/guides/google-maps-ranking" className="text-emerald-300 underline-offset-4 hover:underline">core guide</Link> so you understand what patients actually see.
            </p>
            <p className="text-slate-300">
              Reviews, photos, and citations all impact impressions—and thus calls. Keep your brand consistent across every citation you count in your GeoGrid.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Frame ranking gains as revenue wins</h2>
            <p className="text-slate-300">
              Model each position change with a revenue formula. When rank #10 → #3 adds an extra 40 calls, multiply that by your closing rate and average case value.
            </p>
            <p className="text-slate-300">
              The <Link href="/features/revenue-forecaster" className="text-emerald-300 underline-offset-4 hover:underline">Revenue Forecaster</Link> automates this so you can report patient growth without spreadsheets.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Habit loop for dental teams</h2>
            <p className="text-slate-300">
              Weekly scans, action checklists, and review responses keep rankings stable. Capture the data, share the insights, and point them toward the free scan at <Link href="/free-scan" className="text-emerald-300 underline-offset-4 hover:underline">free scan</Link>.
            </p>
            <p className="text-slate-300">
              The more reliable your reporting, the easier it is to keep that revenue steady.
            </p>
          </section>

          <BlogFooterCTA />
        </article>
      </div>
    </main>
  )
}
