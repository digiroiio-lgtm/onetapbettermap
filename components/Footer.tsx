export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-900 text-gray-200 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Brand + CTA */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-2">mapsrankchecker.com</p>
            <h3 className="text-2xl font-bold text-white">Boost your Google Maps visibility with a single tap.</h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href="/scan"
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 transition"
            >
              Start Free Scan
            </a>
            <a
              href="/demo"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 font-semibold text-white hover:border-white hover:bg-white/10 transition"
            >
              See Demo
            </a>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h4 className="text-xs font-bold text-gray-400 tracking-[0.3em] mb-4">PRODUCT</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/scan" className="hover:text-white transition">Free Scan</a></li>
              <li><a href="/demo" className="hover:text-white transition">Demo Results</a></li>
              <li><a href="/login" className="hover:text-white transition">Login</a></li>
              <li><a href="/signup" className="hover:text-white transition">Sign Up Free</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-400 tracking-[0.3em] mb-4">SUPPORT & RESOURCES</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/support" className="hover:text-white transition">Get Support</a></li>
              <li><a href="/learning-center" className="hover:text-white transition">Learning Center</a></li>
              <li><a href="/reviews" className="hover:text-white transition">Customer Reviews</a></li>
              <li><a href="/success-stories" className="hover:text-white transition">Success Stories</a></li>
              <li><a href="/blog" className="hover:text-white transition">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-400 tracking-[0.3em] mb-4">COMPANY & LEGAL</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/about" className="hover:text-white transition">About Us</a></li>
              <li><a href="/contact" className="hover:text-white transition">Contact Us</a></li>
              <li><a href="/privacy-policy" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="/terms-of-use" className="hover:text-white transition">Terms of Use</a></li>
              <li><a href="/cookies-policy" className="hover:text-white transition">Cookies Policy</a></li>
              <li><a href="/data-processing-agreement" className="hover:text-white transition">Data Processing Agreement</a></li>
              <li><a href="/affiliate" className="hover:text-white transition">Affiliate / Partner</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-400 tracking-[0.3em] mb-4">EXTRAS</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/faq" className="hover:text-white transition">FAQ</a></li>
              <li><a href="/help" className="hover:text-white transition">Help Center</a></li>
              <li><a href="/docs" className="hover:text-white transition">Docs</a></li>
              <li className="flex gap-3">
                <a href="https://twitter.com" className="hover:text-white transition" aria-label="Twitter">Twitter</a>
                <a href="https://linkedin.com" className="hover:text-white transition" aria-label="LinkedIn">LinkedIn</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col gap-4 text-sm text-gray-400 md:flex-row md:items-center md:justify-between">
          <span>© {currentYear} mapsrankchecker.com. All rights reserved.</span>
          <span className="text-xs text-gray-500">
            No credit card required • 3 scans/month free • Upgrade anytime to Pro
          </span>
        </div>
        <p className="text-center text-xs text-gray-600">Stop guessing. Start ranking.</p>
      </div>
    </footer>
  )
}
