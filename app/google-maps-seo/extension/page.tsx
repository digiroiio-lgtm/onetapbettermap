import type { Metadata } from 'next'
import Link from 'next/link'
import GuidePageLayout from '@/components/GuidePageLayout'

export const metadata: Metadata = {
  title: 'Google Maps SEO Extension — One-Tap Rank Checker | One Tap, Better Map',
  description: 'Preview the upcoming Google Maps SEO Chrome extension for instant rank checks, competitor analysis, category audits, and visibility scoring.',
}

export default function ExtensionPage() {
  return (
    <GuidePageLayout
      url="https://mapsrankchecker.com/google-maps-seo/extension/"
      breadcrumbTitle="Google Maps SEO Extension"
      headline="Google Maps SEO Extension — One-Tap Rank Checker"
      description="Preview the upcoming Google Maps SEO Chrome extension for instant rank checks, competitor analysis, category audits, and visibility scoring."
    >
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <article className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg mb-6">
                <span className="text-3xl">🔌</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Google Maps SEO Extension
              </h1>
              <p className="text-xl text-gray-600">
                One-tap rank checking directly in your browser (coming soon).
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="not-prose bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white mb-8">
                <p className="text-sm font-semibold mb-2">🚀 COMING SOON</p>
                <h3 className="text-2xl font-bold mb-4">Chrome Extension in Development</h3>
                <p className="text-purple-100">
                  We're building a powerful Chrome extension that brings GeoGrid scanning directly to your browser. Get instant insights while browsing Google Maps.
                </p>
              </div>

              <h2>Planned Features</h2>

              <h3>⚡ Instant Rank Checks</h3>
              <p>
                Click the extension icon while viewing any business on Google Maps to instantly see:
              </p>
              <ul>
                <li>Current visibility score</li>
                <li>Ranking position for target keywords</li>
                <li>Geographic ranking heatmap</li>
                <li>Trend over the last 30 days</li>
              </ul>

              <h3>🔍 Competitor Analysis</h3>
              <p>
                Scan any competitor's profile to reveal:
              </p>
              <ul>
                <li>Review velocity (reviews per month)</li>
                <li>Category strategy</li>
                <li>Photo count and freshness</li>
                <li>Estimated search traffic</li>
              </ul>

              <h3>✅ Category Audit</h3>
              <p>
                Automatic suggestions for:
              </p>
              <ul>
                <li>Primary category optimization</li>
                <li>Missing secondary categories</li>
                <li>Competitor category patterns</li>
              </ul>

              <h3>📊 Real-Time Alerts</h3>
              <ul>
                <li>Notification when you rank for new keywords</li>
                <li>Alert if competitors outrank you</li>
                <li>Daily visibility score updates</li>
              </ul>

              <h2>How It Will Work</h2>
              <ol>
                <li><strong>Install from Chrome Web Store</strong></li>
                <li><strong>Connect to your dashboard</strong></li>
                <li><strong>Browse Google Maps normally</strong></li>
                <li><strong>Click extension icon</strong> on any business profile</li>
                <li><strong>Get instant SEO insights</strong></li>
              </ol>

              <h2>Why an Extension?</h2>
              <p>
                While our web app provides comprehensive GeoGrid scans, an extension offers:
              </p>
              <ul>
                <li><strong>Speed</strong> — Instant checks without leaving Maps</li>
                <li><strong>Convenience</strong> — Always accessible while researching</li>
                <li><strong>Competitor intel</strong> — Analyze any business you see</li>
                <li><strong>Workflow integration</strong> — Fits naturally into your routine</li>
              </ul>

              <h2>Join the Waitlist</h2>
              <p>
                We'll notify early access users when the extension launches. In the meantime, use our web app for full GeoGrid scans.
              </p>
            </div>

            <div className="mt-12 bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Try Our Web App Now
              </h3>
              <p className="text-blue-100 mb-6">
                Get full GeoGrid scans while we build the extension
              </p>
              <Link
                href="/#scan-section"
                className="inline-block bg-white text-primary font-semibold px-8 py-4 rounded-full text-lg hover:scale-105 transition-transform"
              >
                Start Free Scan
              </Link>
            </div>
          </div>
        </article>
      </main>
    </GuidePageLayout>
  )
}
