import Link from 'next/link'
import type { Metadata } from 'next'
import { guidesSeoConfig } from '@/lib/seo/guidesSeo'

export const metadata: Metadata = {
  title: 'Google Maps SEO Guides: Rankings, Revenue & Real Visibility',
  description:
    'Explore the MapsRankChecker guide hub to understand rankings, revenue impact, and the actions that keep you visible on Google Maps.',
  alternates: {
    canonical: 'https://mapsrankchecker.com/guides',
  },
  openGraph: {
    title: 'Google Maps SEO Guides: Rankings, Revenue & Real Visibility',
    description:
      'Explore the MapsRankChecker guide hub to understand rankings, revenue impact, and the actions that keep you visible on Google Maps.',
    url: 'https://mapsrankchecker.com/guides',
    type: 'website',
  },
}

const featuredSections = [
  {
    title: 'Learn how Google Maps ranking really works',
    paragraphs: [
      'Local ranking pivots on relevance, proximity, and prominence, but the full story includes revenue impact and coverage. We break it down so you know where to act next.',
      'Each guide ties into the Metrics Library and Revenue Forecaster so you can link rank gains to real calls.',
    ],
  },
  {
    title: 'What these guides help you achieve',
    paragraphs: [
      'Know where customers actually see you across neighborhoods.',
      'Understand ranking factors that impact revenue.',
      'Turn Maps visibility into calls and customers with a repeatable habit.',
    ],
  },
]

export default function GuidesHubPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-100">
      <div className="mx-auto max-w-5xl px-4 py-12 space-y-10">
        <header className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Guides</p>
          <h1 className="text-4xl font-semibold text-white text-center">
            Google Maps SEO Guides: Rankings, Revenue & Real Visibility
          </h1>
          <p className="text-center text-slate-400">
            A curated path from ranking insight to revenue action. Each guide links to internal tools like the{' '}
            <Link href="/features/revenue-forecaster" className="text-emerald-300 underline-offset-4 hover:underline">
              Revenue Forecaster
            </Link>{' '}
            and the{' '}
            <Link href="/features/google-maps-rank-tracker" className="text-emerald-300 underline-offset-4 hover:underline">
              rank tracker
            </Link>{' '}
            so you can move faster.
          </p>
        </header>

        <section className="space-y-6">
          {featuredSections.map((section) => (
            <div key={section.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-3">
              <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-slate-300">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Explore all Google Maps ranking guides</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {guidesSeoConfig.map((guide) => (
              <Link
                key={guide.slug}
                href={guide.url}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left transition hover:border-white/30"
              >
                <p className="text-lg font-semibold text-white">{guide.h1}</p>
                <p className="text-sm text-slate-400">{guide.metaDescription}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
