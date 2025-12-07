export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-900 text-gray-200 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          {/* Product */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 mb-4 tracking-widest">PRODUCT</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-200 hover:text-white transition">Home</a></li>
              <li><a href="/scan" className="text-gray-200 hover:text-white transition">Free Scan</a></li>
              <li><a href="/demo" className="text-gray-200 hover:text-white transition">Demo Results</a></li>
            </ul>
          </div>
          {/* Resources */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 mb-4 tracking-widest">RESOURCES</h3>
            <ul className="space-y-2">
              <li><a href="/seo-guides" className="text-gray-200 hover:text-white transition">SEO Guides Hub</a></li>
              <li><a href="/blog" className="text-gray-200 hover:text-white transition">Blog</a></li>
              <li><a href="/help" className="text-gray-200 hover:text-white transition">Help Center</a></li>
            </ul>
          </div>
          {/* Legal */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 mb-4 tracking-widest">LEGAL</h3>
            <ul className="space-y-2">
              <li><a href="/terms" className="text-gray-200 hover:text-white transition">Terms of Service</a></li>
              <li><a href="/privacy" className="text-gray-200 hover:text-white transition">Privacy Policy</a></li>
              <li><a href="/cookies" className="text-gray-200 hover:text-white transition">Cookie Policy</a></li>
            </ul>
          </div>
          {/* Company */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 mb-4 tracking-widest">COMPANY</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-200 hover:text-white transition">About Us</a></li>
              <li><a href="/contact" className="text-gray-200 hover:text-white transition">Contact</a></li>
              <li><a href="/careers" className="text-gray-200 hover:text-white transition">Careers</a></li>
            </ul>
          </div>
          {/* Brand/CTA */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 mb-4 tracking-widest">ONE TAP, BETTER MAP</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">A simple Google Maps SEO checker that runs in one tap. Stop guessing. Start ranking.</p>
            <div className="mt-4">
              <span className="inline-block text-xs text-gray-500">Made with <span className="text-red-500">❤️</span> in London, UK</span>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-400">
          <span>© 2025 One Tap, Better Map. All rights reserved.</span>
          <span>Stop guessing. Start ranking.</span>
        </div>
      </div>
    </footer>
