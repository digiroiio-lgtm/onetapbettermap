import type { Metadata } from 'next'
import Link from 'next/link'
import { caseStudies } from '@/lib/caseStudies'

export const metadata: Metadata = {
  title: 'Industry Case Studies | MapsRankChecker',
  description:
    'See how dentists, restaurants, clinics, law firms, and real estate teams recover revenue with MapsRankChecker.',
  alternates: {
    canonical: 'https://mapsrankchecker.com/case-studies',
  },
}

export default function CaseStudiesHub() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-100">
      <div className="mx-auto max-w-5xl px-4 py-12 space-y-10">
        <header className="space-y-3 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Case Studies</p>
          <h1 className="text-4xl font-semibold text-white">
            Industry-specific proof that Maps visibility equals revenue
          </h1>
          <p className="text-slate-400">
            Each story follows our 6-block template: Who, Problem, Insight, Action, Result, Quote.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2">
          {caseStudies.map((study) => (
            <Link
              key={study.slug}
              href={`/case-studies/${study.slug}`}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-white/30"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{study.title}</p>
              <p className="mt-2 text-lg font-semibold text-white">{study.description}</p>
              <p className="text-sm text-slate-300 mt-3">Case study →</p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  )
}
