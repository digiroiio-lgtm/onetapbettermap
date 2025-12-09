import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-200 pt-16">
      <div className="mx-auto max-w-6xl space-y-10 px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 border-b border-white/10 pb-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Product</p>
            <nav aria-label="Product links" className="mt-5 space-y-2 text-sm text-slate-300">
              <Link href="/" className="block hover:text-white transition">
                Home
              </Link>
              <Link href="/free-scan" className="block hover:text-white transition">
                Free Scan
              </Link>
              <Link href="/demo" className="block hover:text-white transition">
                Demo Results
              </Link>
              <Link href="/pricing" className="block hover:text-white transition">
                Pricing
              </Link>
              <Link href="/login" className="block hover:text-white transition">
                Login
              </Link>
              <Link href="/signup" className="block hover:text-white transition">
                Sign Up Free
              </Link>
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Features &amp; Use Cases</p>
            <nav aria-label="Features" className="mt-5 space-y-2 text-sm text-slate-300">
              <Link href="/features/google-maps-rank-tracker" className="block hover:text-white transition">
                Google Maps Rank Tracker
              </Link>
              <Link href="/features/google-maps-ranking-grid" className="block hover:text-white transition">
                Ranking Grid (GeoGrid)
              </Link>
              <Link href="/features/revenue-forecaster" className="block hover:text-white transition">
                Revenue Forecaster
              </Link>
              <Link href="/features/competitor-movement" className="block hover:text-white transition">
                Competitor Movement
              </Link>
            </nav>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Use cases</p>
            <nav aria-label="Use case links" className="mt-4 space-y-2 text-sm text-slate-300">
              <Link href="/use-cases/dentists-google-maps-ranking" className="block hover:text-white transition">
                Dentists
              </Link>
              <Link href="/use-cases/restaurants-google-maps-ranking" className="block hover:text-white transition">
                Restaurants
              </Link>
              <Link href="/use-cases/clinics-google-maps-ranking" className="block hover:text-white transition">
                Clinics
              </Link>
              <Link href="/use-cases/real-estate-google-maps-ranking" className="block hover:text-white transition">
                Real Estate
              </Link>
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Guides &amp; Resources</p>
            <nav aria-label="Guides" className="mt-5 space-y-2 text-sm text-slate-300">
              <Link href="/guides" className="block hover:text-white transition">
                Guides Hub
              </Link>
              <Link href="/guides/google-maps-ranking" className="block hover:text-white transition">
                Google Maps Ranking
              </Link>
              <Link href="/guides/google-maps-ranking-factors" className="block hover:text-white transition">
                Ranking Factors
              </Link>
              <Link href="/guides/how-to-rank-higher-on-google-maps" className="block hover:text-white transition">
                Rank Higher on Maps
              </Link>
              <Link href="/guides/google-maps-ranking-algorithm" className="block hover:text-white transition">
                Ranking Algorithm
              </Link>
              <Link href="/guides/google-maps-ranking-checker-tools" className="block hover:text-white transition">
                Ranking Checker Tools
              </Link>
              <Link href="/guides/google-maps-citations" className="block hover:text-white transition">
                Citations &amp; Local SEO
              </Link>
              <Link href="/guides/google-maps-grid-visibility" className="block hover:text-white transition">
                Grid Visibility
              </Link>
              <Link href="/blog" className="block hover:text-white transition">
                Blog
              </Link>
              <Link href="/success-stories" className="block hover:text-white transition">
                Success Stories
              </Link>
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Company &amp; Legal</p>
            <nav aria-label="Company" className="mt-5 space-y-2 text-sm text-slate-300">
              <Link href="/about" className="block hover:text-white transition">
                About Us
              </Link>
              <Link href="/contact" className="block hover:text-white transition">
                Contact
              </Link>
              <Link href="/security" className="block hover:text-white transition">
                Security
              </Link>
              <Link href="/data-handling" className="block hover:text-white transition">
                Data Handling
              </Link>
              <Link href="/privacy-policy" className="block hover:text-white transition">
                Privacy Policy
              </Link>
              <Link href="/terms-of-use" className="block hover:text-white transition">
                Terms of Use
              </Link>
              <Link href="/data-processing-agreement" className="block hover:text-white transition">
                Data Processing Agreement
              </Link>
              <Link href="/whitelabel" className="block hover:text-white transition">
                White-label / Partner
              </Link>
            </nav>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-xs uppercase tracking-[0.3em] text-slate-400">
          © 2025 mapsrankchecker.com. All rights reserved. Stop guessing rankings. Start recovering lost revenue.
        </div>
      </div>
    </footer>
  )
}
