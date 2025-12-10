import type { Metadata } from 'next'
import Link from 'next/link'
import GuidePageLayout from '@/components/GuidePageLayout'

export const metadata: Metadata = {
  title: 'How To Do Google Maps SEO — Step-by-Step Guide | One Tap, Better Map',
  description: 'A practical tutorial on how to do Google Maps SEO. Learn categories, photos, reviews, backlinks, and GeoGrid tracking to boost local rankings fast.',
}

export default function HowToPage() {
  return (
    <GuidePageLayout
      url="https://mapsrankchecker.com/google-maps-seo/how-to/"
      breadcrumbTitle="How To Do Google Maps SEO"
      headline="How To Do Google Maps SEO — Step-by-Step Guide"
      description="A practical tutorial on how to do Google Maps SEO. Learn categories, photos, reviews, backlinks, and GeoGrid tracking to boost local rankings fast."
    >
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <article className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg mb-6">
                <span className="text-3xl">📝</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                How To Do Google Maps SEO
              </h1>
              <p className="text-xl text-gray-600">
                A practical, actionable tutorial for local businesses.
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2>Step 1: Claim & Verify Your Profile</h2>
              <ol>
                <li>Go to <code>business.google.com</code></li>
                <li>Search for your business or click "Add your business"</li>
                <li>Complete verification (postcard, phone, or email)</li>
                <li>Fill out every single field — aim for 100% completion</li>
              </ol>

              <h2>Step 2: Choose the Right Category</h2>
              <p>
                Your primary category is critical. Choose the most specific option:
              </p>
              <ul>
                <li>❌ Bad: "Restaurant"</li>
                <li>✅ Good: "Italian Restaurant"</li>
                <li>✅ Better: "Neapolitan Pizza Restaurant"</li>
              </ul>

              <h2>Step 3: Optimize Your Profile</h2>
              <ul>
                <li><strong>Business description</strong> — 750 characters, natural keywords</li>
                <li><strong>Photos</strong> — Upload 12+ images (interior, exterior, products)</li>
                <li><strong>Hours</strong> — Keep accurate, add special hours for holidays</li>
                <li><strong>Services</strong> — List all services with descriptions</li>
                <li><strong>Attributes</strong> — Enable everything relevant to your business</li>
              </ul>

              <h2>Step 4: Get Reviews Systematically</h2>
              <p>
                Don't just ask "can you leave a review?" Create a system:
              </p>
              <ol>
                <li>Generate your Google review link</li>
                <li>Send it via email/text after every transaction</li>
                <li>Make it easy — one-click process</li>
                <li>Respond to every review within 24 hours</li>
              </ol>

              <div className="not-prose bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg my-8">
                <p className="text-sm font-semibold text-yellow-700 mb-2">⚠️ WARNING</p>
                <p className="text-gray-700">
                  Never buy fake reviews or offer incentives. Google detects this and can suspend your profile.
                </p>
              </div>

              <h2>Step 5: Build Citations</h2>
              <p>
                List your business on:
              </p>
              <ul>
                <li>Yelp, Facebook, Apple Maps</li>
                <li>Industry-specific directories</li>
                <li>Local chamber of commerce sites</li>
              </ul>
              <p>
                Ensure NAP (Name, Address, Phone) is <strong>exactly identical</strong> everywhere.
              </p>

              <h2>Step 6: Create Posts Weekly</h2>
              <p>
                Google Business Posts keep your profile active:
              </p>
              <ul>
                <li>Share promotions, events, new products</li>
                <li>Add a call-to-action button</li>
                <li>Post at least once per week</li>
              </ul>

              <h2>Step 7: Track Your Rankings</h2>
              <p>
                Use our free GeoGrid checker to monitor progress. Check weekly and adjust strategy based on results.
              </p>
            </div>

            <div className="mt-12 bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Track Your Optimization Progress
              </h3>
              <Link
                href="/#scan-section"
                className="inline-block bg-white text-primary font-semibold px-8 py-4 rounded-full text-lg hover:scale-105 transition-transform"
              >
                Start Free Tracking
              </Link>
            </div>
          </div>
        </article>
      </main>
    </GuidePageLayout>
  )
}
