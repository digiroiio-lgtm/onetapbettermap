'use client'

import PlaceAutocomplete from '@/components/PlaceAutocomplete'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function FreeScanForm() {

  const [businessName, setBusinessName] = useState('')
  const [city, setCity] = useState('')
  const [keyword, setKeyword] = useState('')
  const router = useRouter()

  const handlePlaceSelect = (place: google.maps.places.PlaceResult) => {
    setBusinessName(place.name || '')
    const cityComponent = place.address_components?.find(
      c => c.types.includes('locality') || c.types.includes('administrative_area_level_1'),
    )
    if (cityComponent) setCity(cityComponent.long_name)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true'
    if (!isLoggedIn) {
      router.push('/login')
      return
    }
    if (!businessName) {
      alert('Please select a business from the suggestions')
      return
    }
    const params = new URLSearchParams({
      businessName,
      city,
      keyword,
    })
    router.push(`/results?${params.toString()}`)
  }

  return (
    <section id="scan-section" className="px-4 sm:px-6 lg:px-24 py-24 border-t border-white/5">
      <div className="max-w-4xl mx-auto card card-wide card-top card-lg">
        <div className="space-y-3 text-center">
          <p className="text-sm text-slate-400 uppercase tracking-[0.3em]">Quick Scan</p>
          <h2 className="text-3xl font-semibold text-white">
            Check where customers find competitors instead of you — in 30 seconds
          </h2>
          <p className="text-slate-400">Enter your business details to see what nearby customers see.</p>
        </div>
        {/* Limit kaldırıldı: Her zaman form aktif */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <PlaceAutocomplete
            onPlaceSelect={handlePlaceSelect}
            value={businessName}
            onInputChange={setBusinessName}
            placeholder="e.g., SmileBright Dental"
            startIcon="🏢"
            required
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-12 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
          />
          <div>
            <label className="block text-sm text-slate-300 mb-2">City</label>
            <div className="relative">
              <input
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="Antalya"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-12 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
                required
              />
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-lg">📍</span>
            </div>
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-2">Search Keyword (optional)</label>
            <div className="relative">
              <input
                type="text"
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                placeholder='e.g., "dentist near me"'
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-12 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
              />
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-lg">🔍</span>
            </div>
          </div>
          <button
            className="w-full rounded-full bg-[#2563eb] text-white py-3 font-semibold hover:bg-[#1d4ed8] transition"
          >
            Scan My Visibility →
          </button>
        </form>
        <p className="text-center text-sm text-slate-400">
          ✓ Free scans • No credit card required • Takes under 2 minutes
        </p>
      </div>
    </section>
  )
}
