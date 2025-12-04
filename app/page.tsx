'use client'

import Link from 'next/link'

export default function Home() {
  const scrollToScan = () => {
    const scanSection = document.getElementById('scan-section')
    scanSection?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToDemo = () => {
    const demoSection = document.getElementById('demo-section')
    demoSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            One Tap, Better Map.
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Boost your Google Maps visibility with a single tap – no SEO complexity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={scrollToScan}
              className="bg-primary hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Start Free Scan
            </button>
            <button
              onClick={scrollToDemo}
              className="bg-white hover:bg-gray-50 text-primary font-semibold px-8 py-4 rounded-full text-lg transition-all duration-200 border-2 border-primary"
            >
              See Demo
            </button>
          </div>
        </div>
      </section>

      {/* Scan Form Section */}
      <section id="scan-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
              Check Your Map Ranking
            </h2>
            <p className="text-gray-600 mb-8 text-center">
              Enter your business details to see how you rank on Google Maps
            </p>
            
            <form action="/scanning" method="GET" className="space-y-6">
              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="e.g., Smith Dental Care"
                />
              </div>
              
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="e.g., San Francisco"
                />
              </div>
              
              <div>
                <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-2">
                  Search Keyword
                </label>
                <input
                  type="text"
                  id="keyword"
                  name="keyword"
                  defaultValue="dentist near me"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="e.g., dentist near me"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-primary hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Run My Free Scan
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            See What You'll Get
          </h2>
          <p className="text-xl text-gray-600 mb-12 text-center">
            A complete analysis of your Google Maps visibility
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Visibility Score</h3>
              <p className="text-gray-600">
                Get a clear score showing how visible your business is across 49 key locations
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🗺️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Heatmap Analysis</h3>
              <p className="text-gray-600">
                Visual heatmap showing your ranking in different areas around your business
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Action Checklist</h3>
              <p className="text-gray-600">
                Specific recommendations to improve your ranking and visibility
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link
              href="/results?businessName=Demo%20Business&city=San%20Francisco&keyword=dentist%20near%20me"
              className="inline-block bg-primary hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              View Sample Report
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
