import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-lg bg-gradient-to-br from-blue-500 to-green-400 shadow text-white font-extrabold text-2xl tracking-tight logo-font">
              <svg className="w-7 h-7 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              One Tap, Better Map
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/#scan-section" 
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Scan
            </Link>
            <Link 
              href="/results?businessName=Demo%20Business&city=San%20Francisco&keyword=dentist%20near%20me" 
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Results (Demo)
            </Link>
          </div>
          
          {/* Mobile menu button - simplified for now */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-primary">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
