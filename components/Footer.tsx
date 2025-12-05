export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        {/* Product Column */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3">
            Product
          </h3>
          <ul className="space-y-2 text-slate-300">
            <li>
              <a href="/" className="hover:text-emerald-400 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="/#scan-section" className="hover:text-emerald-400 transition-colors">
                Free Scan
              </a>
            </li>
            <li>
              <a href="/results" className="hover:text-emerald-400 transition-colors">
                Demo Results
              </a>
            </li>
          </ul>
        </div>

        {/* Resources Column */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3">
            Resources
          </h3>
          <ul className="space-y-2 text-slate-300">
            <li>
              <a href="/google-maps-seo/" className="hover:text-emerald-400 transition-colors">
                SEO Guides Hub
              </a>
            </li>
            <li>
              <a href="https://github.com/digiroiio-lgtm/onetapbettermap" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                GitHub
              </a>
            </li>
          </ul>
        </div>

        {/* Google Maps SEO Guides (SEO Silo) */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3">
            Google Maps SEO Guides
          </h3>
          <ul className="space-y-2 text-slate-300">
            <li>
              <a href="/google-maps-seo/checker/" className="hover:text-emerald-400 transition-colors">
                Google Maps SEO Checker
              </a>
            </li>
            <li>
              <a href="/google-maps-seo/optimization/" className="hover:text-emerald-400 transition-colors">
                Google Maps SEO Optimization
              </a>
            </li>
            <li>
              <a href="/google-maps-seo/how-it-works/" className="hover:text-emerald-400 transition-colors">
                How Does Google Maps SEO Work?
              </a>
            </li>
            <li>
              <a href="/google-maps-seo/how-to/" className="hover:text-emerald-400 transition-colors">
                How To Do Google Maps SEO
              </a>
            </li>
            <li>
              <a href="/google-maps-seo/extension/" className="hover:text-emerald-400 transition-colors">
                Google Maps SEO Extension
              </a>
            </li>
          </ul>
        </div>

        {/* Brand Column */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-3">
            One Tap, Better Map
          </h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            A simple Google Maps SEO checker that runs in one tap. Stop guessing. Start ranking.
          </p>
        </div>
      </div>
      
      <div className="border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <span>© {currentYear} One Tap, Better Map. All rights reserved.</span>
          <span>Stop guessing. Start ranking.</span>
        </div>
      </div>
    </footer>
  )
}
