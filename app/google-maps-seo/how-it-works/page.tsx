import type { Metadata } from 'next'
import Link from 'next/link'
import GuidePageLayout from '@/components/GuidePageLayout'

export const metadata: Metadata = {
  title: 'How Google Maps SEO Works — Algorithm Explained | One Tap, Better Map',
  description: 'Understand the Google Maps ranking algorithm: relevance, distance, prominence, and hidden signals that determine your local search visibility.',
}

export default function HowItWorksPage() {
  return (
    <GuidePageLayout
      url="https://onetapbettermap.com/google-maps-seo/how-it-works/"
      breadcrumbTitle="How Does Google Maps SEO Work?"
      headline="How Google Maps SEO Works — Algorithm Explained"
      description="Understand the Google Maps ranking algorithm: relevance, distance, prominence, and hidden signals that determine your local search visibility."
    >
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <article className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg mb-6">
                <span className="text-3xl">🧠</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                How Google Maps SEO Works
              </h1>
              <p className="text-xl text-gray-600">
                Understanding the algorithm behind local pack rankings.
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2>The Three Pillars</h2>

              <h3>1. Relevance (40%)</h3>
              <p>
                How well your business matches the search query. Google looks at:
              </p>
              <ul>
                <li>Primary and secondary categories</li>
                <li>Business name and description keywords</li>
                <li>Services listed</li>
                <li>Review content mentioning searched terms</li>
              </ul>

              <h3>2. Distance (30%)</h3>
              <p>
                Physical proximity to the searcher. This is why rankings change based on location. A business 1 mile away will usually outrank one 5 miles away, all else equal.
              </p>

              <h3>3. Prominence (30%)</h3>
              <p>
                How well-known and authoritative your business is:
              </p>
              <ul>
                <li>Number and quality of reviews</li>
                <li>Average star rating</li>
                <li>Website backlinks and citations</li>
                <li>Engagement (clicks, calls, direction requests)</li>
                <li>Photo/post activity</li>
              </ul>

              <div className="not-prose bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg my-8">
                <p className="text-sm font-semibold text-primary mb-2">KEY INSIGHT</p>
                <p className="text-gray-700">
                  Distance can't be changed, but you can maximize relevance and prominence. Focus your optimization efforts there.
                </p>
              </div>

              <h2>Hidden Ranking Factors</h2>
              <ul>
                <li><strong>Profile completeness</strong> — Businesses with 100% complete profiles rank higher</li>
                <li><strong>User behavior</strong> — High click-through rates signal quality</li>
                <li><strong>Freshness</strong> — Recent photos and posts boost rankings</li>
                <li><strong>Website quality</strong> — Fast, mobile-friendly sites help</li>
                <li><strong>Q&A engagement</strong> — Active Q&A sections show legitimacy</li>
              </ul>

              <h2>Why Rankings Fluctuate</h2>
              <p>
                Google constantly tests variations to improve user satisfaction. Your rank may shift daily as:
              </p>
              <ul>
                <li>Competitors get new reviews</li>
                <li>User behavior patterns change</li>
                <li>Algorithm updates roll out</li>
                <li>Seasonal search intent varies</li>
              </ul>

              <p>
                This is why continuous monitoring with tools like our GeoGrid checker is essential.
              </p>
            </div>

            <div className="mt-12 bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                See How You Rank
              </h3>
              <Link
                href="/#scan-section"
                className="inline-block bg-white text-primary font-semibold px-8 py-4 rounded-full text-lg hover:scale-105 transition-transform"
              >
                Check Rankings Now
              </Link>
            </div>
          </div>
        </article>
      </main>
    </GuidePageLayout>
  )
}
