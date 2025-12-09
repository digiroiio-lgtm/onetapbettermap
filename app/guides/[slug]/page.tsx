'use client'

import type { Metadata } from 'next'
import type { GuideSlug } from '@/lib/seo/guidesSeo'
import { getGuideSeoConfig, guidesSeoConfig } from '@/lib/seo/guidesSeo'
import GuideLayout from '../_components/GuideLayout'
import { guideContent } from '../guideContent'

type Params = { slug: GuideSlug }

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const cfg = getGuideSeoConfig(params.slug)

  if (!cfg) {
    return {
      title: 'Google Maps Guides | MapsRankChecker™',
      description:
        'In-depth Google Maps ranking guides on visibility, GeoGrid scans, revenue forecasting, and local SEO.',
    }
  }

  return {
    title: cfg.metaTitle,
    description: cfg.metaDescription,
    openGraph: {
      title: cfg.metaTitle,
      description: cfg.metaDescription,
      url: `https://mapsrankchecker.com${cfg.url}`,
      type: 'article',
    },
    alternates: {
      canonical: `https://mapsrankchecker.com${cfg.url}`,
    },
  }
}

export function generateStaticParams(): Params[] {
  return guidesSeoConfig.map((guide) => ({ slug: guide.slug }))
}

export default function GuidePage({ params }: { params: Params }) {
  const cfg = getGuideSeoConfig(params.slug)
  const content = guideContent[params.slug]

  if (!cfg || !content) {
    return (
      <div className="min-h-screen bg-[#020617] text-slate-100">
        <main className="mx-auto max-w-4xl px-4 py-16 text-center">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Guide not found</p>
          <h1 className="text-3xl font-semibold text-white mt-4">We couldn’t find that guide.</h1>
          <p className="mt-3 text-slate-400">
            Browse our full list of Google Maps guides to recover visibility and revenue.
          </p>
        </main>
      </div>
    )
  }

  return (
    <GuideLayout
      h1={cfg.h1}
      intro={cfg.introHeading}
      sections={content.sections}
    />
  )
}
