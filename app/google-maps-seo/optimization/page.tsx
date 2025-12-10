import type { Metadata } from 'next'
import Link from 'next/link'
import GuidePageLayout from '@/components/GuidePageLayout'

export const metadata: Metadata = {
  title: 'Google Maps SEO Optimization Guide (2025 Update) | One Tap, Better Map',
  description: 'Learn how to optimize your Google Business Profile for higher map rankings. Categories, reviews, prominence, citations, and full optimization steps.',
}

export default function OptimizationGuidePage() {
  return (
    <GuidePageLayout
      url="https://mapsrankchecker.com/google-maps-seo/optimization/"
      breadcrumbTitle="Google Maps SEO Optimization"
      headline="Google Maps SEO Optimization Guide (2025 Update)"
      description="Learn how to optimize your Google Business Profile for higher map rankings. Categories, reviews, prominence, citations, and full optimization steps."
    >
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <article className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg mb-6">
                <span className="text-3xl">⚡</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Google Maps SEO Optimization
              </h1>
              <p className="text-xl text-gray-600">
                Complete guide to optimizing your Google Business Profile for maximum local visibility in 2025.
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2>Key Optimization Factors</h2>
              
              <h3>1. Categories (Most Important)</h3>
              <p>
                Your primary category directly impacts which searches you appear in. Choose the most specific category that matches your core business.
              </p>

              <h3>2. Reviews & Ratings</h3>
              <ul>
                <li>Request reviews from every satisfied customer</li>
                <li>Respond to all reviews (positive and negative)</li>
                <li>Aim for 4.5+ star average with 50+ reviews</li>
              </ul>

              <h3>3. Photos & Videos</h3>
              <ul>
                <li>Upload 12+ high-quality photos</li>
                <li>Add photos monthly to show activity</li>
                <li>Include interior, exterior, product shots</li>
              </ul>

              <h3>4. NAP Consistency</h3>
              <p>
                Your Name, Address, Phone must match exactly across your website, Google Business Profile, and all citations.
              </p>

              <h3>5. Business Description</h3>
              <p>
                Write a detailed 750-character description with natural keyword usage. Focus on services, location, and unique value.
              </p>

              <div className="not-prose bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg my-8">
                <p className="text-sm font-semibold text-green-700 mb-2">QUICK WIN</p>
                <p className="text-gray-700">
                  Most businesses forget to add their service areas. If you serve multiple cities, list them in your profile to appear in "near me" searches from those areas.
                </p>
              </div>

              <h2>Advanced Optimization</h2>
              <ul>
                <li><strong>Posts</strong> — Share updates weekly (Google rewards activity)</li>
                <li><strong>Q&A</strong> — Pre-populate common questions with keyword-rich answers</li>
                <li><strong>Attributes</strong> — Enable all relevant attributes (e.g., "wheelchair accessible")</li>
                <li><strong>Products/Services</strong> — Add detailed service descriptions with pricing</li>
              </ul>

              <h2>Track Your Progress</h2>
              <p>
                Use our free checker to monitor ranking improvements as you optimize. Most businesses see changes within 2-4 weeks.
              </p>
            </div>

            <div className="mt-12 bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Check Your Current Rankings
              </h3>
              <Link
                href="/#scan-section"
                className="inline-block bg-white text-primary font-semibold px-8 py-4 rounded-full text-lg hover:scale-105 transition-transform"
              >
                Run Free Scan
              </Link>
            </div>
          </div>
        </article>
      </main>
    </GuidePageLayout>
  )
}
