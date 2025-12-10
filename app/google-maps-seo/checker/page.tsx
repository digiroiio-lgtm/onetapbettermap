import type { Metadata } from 'next'
import Link from 'next/link'
import GuidePageLayout from '@/components/GuidePageLayout'

export const metadata: Metadata = {
  title: 'Google Maps SEO Checker — Real-Time Local Ranking Scan | One Tap, Better Map',
  description: 'Instantly check your true Google Maps ranking with a GeoGrid scan. View visibility scores, competitors, and actionable SEO insights in seconds.',
}

export default function CheckerGuidePage() {
  const url = 'https://mapsrankchecker.com/google-maps-seo/checker/'

  return (
    <GuidePageLayout
      url={url}
      breadcrumbTitle="Google Maps SEO Checker"
      headline="Google Maps SEO Checker — Real-Time Local Ranking Scan"
      description="Instantly check your true Google Maps ranking with a GeoGrid scan. View visibility scores, competitors, and actionable SEO insights in seconds."
    >
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <article className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero */}
            <div className="mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg mb-6">
                <span className="text-3xl">🔍</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Google Maps SEO Checker
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Stop guessing where you rank. Our GeoGrid technology scans 49 geographic points around your business to show your real Google Maps visibility.
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <h2>What is a Google Maps SEO Checker?</h2>
              <p>
                A Google Maps SEO checker is a tool that reveals your true local search rankings across multiple locations. Unlike basic rank trackers that check from a single point, our checker uses <strong>7×7 GeoGrid scanning</strong> to show visibility variations across your service area.
              </p>

              <h2>How Our Checker Works</h2>
              <ol>
                <li><strong>Enter your business details</strong> — Name, city, and target keyword</li>
                <li><strong>GeoGrid scan activates</strong> — We query 49 points around your location</li>
                <li><strong>Get visibility score</strong> — See your ranking heatmap and competitor analysis</li>
                <li><strong>Take action</strong> — Review optimization recommendations</li>
              </ol>

              <h2>What You'll Discover</h2>
              <ul>
                <li><strong>Visibility Score (0-100)</strong> — How often you appear in top results</li>
                <li><strong>Ranking Heatmap</strong> — Where you rank strong vs. weak in your area</li>
                <li><strong>Top Competitors</strong> — Real-time data from Google Places API</li>
                <li><strong>Optimization Tips</strong> — Actionable steps to improve rankings</li>
              </ul>

              <h2>Why GeoGrid Matters</h2>
              <p>
                Google Maps rankings vary by searcher location. A customer 2 miles north might see completely different results than someone south of your business. Our GeoGrid scan reveals these patterns so you can optimize strategically.
              </p>

              <div className="not-prose bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg my-8">
                <p className="text-sm font-semibold text-primary mb-2">PRO TIP</p>
                <p className="text-gray-700">
                  Run scans weekly to track optimization progress. Rankings shift as you add photos, get reviews, and improve your Google Business Profile.
                </p>
              </div>

              <h2>Start Your Free Scan</h2>
              <p>
                Ready to see where you really rank? Enter your business info and get results in 60 seconds.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-12 bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Check Your Google Maps Rankings Now
              </h3>
              <Link
                href="/#scan-section"
                className="inline-block bg-white text-primary font-semibold px-8 py-4 rounded-full text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Start Free Scan
              </Link>
            </div>

            {/* Related Guides */}
            <div className="mt-16 pt-12 border-t border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Guides</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/google-maps-seo/optimization/" className="block p-6 bg-white rounded-xl border border-gray-200 hover:border-primary hover:shadow-lg transition-all">
                  <h4 className="font-semibold text-gray-900 mb-2">Google Maps SEO Optimization →</h4>
                  <p className="text-sm text-gray-600">Learn how to improve your rankings</p>
                </Link>
                <Link href="/google-maps-seo/how-it-works/" className="block p-6 bg-white rounded-xl border border-gray-200 hover:border-primary hover:shadow-lg transition-all">
                  <h4 className="font-semibold text-gray-900 mb-2">How Google Maps SEO Works →</h4>
                  <p className="text-sm text-gray-600">Understand the ranking algorithm</p>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
    </GuidePageLayout>
  )
}
