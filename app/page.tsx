"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useTranslation } from '@/lib/i18n';
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

// Dynamic import to avoid SSR issues
const PlaceAutocomplete = dynamic(() => import('@/components/PlaceAutocomplete'), {
  ssr: false,
  loading: () => (
    <div className="relative">
      <input
        type="text"
        className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 outline-none"
        placeholder="Loading..."
        disabled
      />
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
        🏢
      </div>
    </div>
  )
})


export default function Home() {
  const t = useTranslation().scan;
  const router = useRouter();
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [city, setCity] = useState('');
  const [keyword, setKeyword] = useState('');
  const [freeScansLeft, setFreeScansLeft] = useState(3);
  const [limitReached, setLimitReached] = useState(false);

  // Helper: get current month key
  const getMonthKey = () => {
    const now = new Date();
    return `freeScans_${now.getFullYear()}_${now.getMonth() + 1}`;
  };

  // On mount, check localStorage for scan count
  useEffect(() => {
    const key = getMonthKey();
    const scans = parseInt(localStorage.getItem(key) || '0', 10);
    setFreeScansLeft(Math.max(0, 3 - scans));
    setLimitReached(scans >= 3);
  }, []);

  const scrollToScan = () => {
    const scanSection = document.getElementById('scan-section')
    scanSection?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToDemo = () => {
    const demoSection = document.getElementById('demo-section')
    demoSection?.scrollIntoView({ behavior: 'smooth' })
  }

  const handlePlaceSelect = (place: google.maps.places.PlaceResult) => {
    setSelectedPlace(place);
    // Extract city from address components
    const cityComponent = place.address_components?.find(
      component => component.types.includes('locality') || component.types.includes('administrative_area_level_1')
    );
    if (cityComponent) {
      setCity(cityComponent.long_name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (limitReached) return;
    if (!selectedPlace) {
      alert('Please select a business from the suggestions');
      return;
    }
    const businessName = selectedPlace.name || '';
    const finalCity = city || 'Unknown';
    const finalKeyword = keyword || 'business near me';

    // Update localStorage scan count
    const key = getMonthKey();
    const scans = parseInt(localStorage.getItem(key) || '0', 10) + 1;
    localStorage.setItem(key, scans.toString());
    setFreeScansLeft(Math.max(0, 3 - scans));
    setLimitReached(scans >= 3);

    router.push(`/scanning?businessName=${encodeURIComponent(businessName)}&city=${encodeURIComponent(finalCity)}&keyword=${encodeURIComponent(finalKeyword)}`);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Decorative map pins */}
          <div className="flex justify-center gap-4 mb-8">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{animationDelay: '0s'}}>
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{animationDelay: '0.2s'}}>
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{animationDelay: '0.4s'}}>
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            One Tap, Better Map.
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto">
            Boost your Google Maps visibility with a single tap – no SEO complexity.
          </p>
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto italic">
            Think of it as a simple Google Maps SEO checker that runs in one tap.
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
          
          {/* Auth CTA */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <p className="text-gray-600">Already have an account?</p>
            <Link
              href="/login"
              className="text-primary hover:text-blue-600 font-semibold underline"
            >
              Login
            </Link>
            <span className="text-gray-400">|</span>
            <Link
              href="/signup"
              className="text-primary hover:text-blue-600 font-semibold underline"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </section>

      {/* Scan Form Section */}
      <section id="scan-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 relative overflow-hidden">
            {/* Decorative background pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg transform rotate-12">
                <svg className="w-8 h-8 text-white transform -rotate-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
                Check Your Map Ranking
              </h2>
            <p className="text-gray-600 mb-8 text-center">
              Enter your business details to see how you rank on Google Maps
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {limitReached && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-center">
                  <p className="text-red-600 font-semibold text-lg">You have reached your free scan limit for this month.</p>
                  <p className="text-gray-600 mt-2">Sign up or upgrade to Pro for unlimited scans.</p>
                  <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-center">
                    <Link href="/signup" className="bg-primary text-white px-6 py-2 rounded font-bold hover:bg-blue-700 transition">Sign Up Free</Link>
                    <Link href="/login" className="bg-white border border-primary text-primary px-6 py-2 rounded font-bold hover:bg-blue-50 transition">Login</Link>
                  </div>
                </div>
              )}
              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-7 3c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3zm6 12H6v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1z"/>
                  </svg>
                  Business Name
                </label>
                <PlaceAutocomplete
                  onPlaceSelect={handlePlaceSelect}
                  placeholder="Start typing your business name..."
                  className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  types={['establishment']}
                />
                {selectedPlace && (
                  <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    Selected: {selectedPlace?.name}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  City
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="e.g., San Francisco"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    📍
                  </div>
                </div>
              </div>
                {/* City field removed as requested */}
              <div>
                <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                  </svg>
                  Search Keyword
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="keyword"
                    name="keyword"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                      // required
                    className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="e.g., dentist near me"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    🔍
                  </div>
                </div>
                  <span className="text-xs text-gray-500 mt-1 block">{t.keywordPlaceholder} ({t.keyword} optional)</span>
              </div>
              
              <button
                type="submit"
                className="w-full bg-primary hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={limitReached}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"/>
                </svg>
                {limitReached ? 'Limit Reached' : `Run My Free Scan (${freeScansLeft} left)`}
              </button>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-sm text-gray-600 text-center">
                  💡 <strong>Tip:</strong> Start typing your business name and select from Google's suggestions for accurate results
                </p>
              </div>
            </form>
            </div>
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
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Visibility Score</h3>
              <p className="text-gray-600">
                Get a clear score showing how visible your business is across 49 key locations
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Heatmap Analysis</h3>
              <p className="text-gray-600">
                Visual heatmap showing your ranking in different areas around your business
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                </svg>
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

      {/* CTA Section - Sign Up */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary to-indigo-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Boost Your Visibility?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses tracking their Google Maps performance. Start with 3 free scans per month.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/signup"
              className="bg-white hover:bg-gray-50 text-primary font-bold px-10 py-4 rounded-full text-lg transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              🚀 Sign Up Free
            </Link>
            <Link
              href="/login"
              className="bg-transparent hover:bg-white/10 text-white font-semibold px-10 py-4 rounded-full text-lg transition-all duration-200 border-2 border-white"
            >
              Login to Dashboard
            </Link>
          </div>
          <p className="text-blue-100 text-sm mt-6">
            No credit card required • 3 scans/month free • Upgrade anytime to Pro
          </p>
        </div>
      </section>
    </main>
  )
}
