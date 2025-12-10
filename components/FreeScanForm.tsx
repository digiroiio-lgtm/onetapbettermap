'use client'

import Link from 'next/link'
import PlaceAutocomplete from '@/components/PlaceAutocomplete'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function FreeScanForm() {
  const [businessName, setBusinessName] = useState('')
  const [city, setCity] = useState('')
  const [keyword, setKeyword] = useState('')
  const [freeScansLeft, setFreeScansLeft] = useState(3)
  const [limitReached, setLimitReached] = useState(false)
  const router = useRouter()

  const getMonthKey = () => {
    const now = new Date()
    return `freeScans_${now.getFullYear()}_${now.getMonth() + 1}`
  }

  useEffect(() => {
    const key = getMonthKey()
    const scans = parseInt(localStorage.getItem(key) || '0', 10)
    setFreeScansLeft(Math.max(0, 3 - scans))
    setLimitReached(scans >= 3)
  }, [])

  const handlePlaceSelect = (place: google.maps.places.PlaceResult) => {
    setBusinessName(place.name || '')
    const cityComponent = place.address_components?.find(
      c => c.types.includes('locality') || c.types.includes('administrative_area_level_1'),
    )
    if (cityComponent) setCity(cityComponent.long_name)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (limitReached) return
    if (!businessName) {
      alert('Please select a business from the suggestions')
      return
    }
    const key = getMonthKey()
    const scans = parseInt(localStorage.getItem(key) || '0', 10) + 1
    localStorage.setItem(key, scans.toString())
    setFreeScansLeft(Math.max(0, 3 - scans))
    setLimitReached(scans >= 3)
    const params = new URLSearchParams({
      businessName,
      city,
      keyword,
    })
    router.push(`/results?${params.toString()}`)
  }

  return (
    <section id="scan-now" className="px-4 sm:px-6 lg:px-24 py-24 border-t border-white/5">
      <div className="max-w-4xl mx-auto rounded-[32px] bg-white/5 border border-white/10 p-8 space-y-6">
        <div className="space-y-3 text-center">
          <p className="text-sm text-slate-400 uppercase tracking-[0.3em]">Quick Scan</p>
          <h2 className="text-3xl font-semibold text-white">
            Check where customers find competitors instead of you — in 30 seconds
          </h2>
          <p className="text-slate-400">Enter your business details to see what nearby customers see.</p>
        </div>
        {limitReached ? (
          <div className="rounded-2xl bg-rose-500/10 border border-rose-500/30 p-4 text-sm text-rose-100">
            <p className="font-semibold">⚠️ You’ve used all 3 free scans this month.</p>
            <p className="text-rose-200 mt-1">
              <Link href="/signup" className="underline">
                Sign up
              </Link>{' '}
              for 100/month or{' '}
              <Link href="/upgrade" className="underline">
                upgrade
              </Link>{' '}
              for unlimited scans.
            </p>
          </div>
        ) : (
          <p className="text-center text-sm text-slate-400">
            You have {freeScansLeft} free scan{freeScansLeft === 1 ? '' : 's'} left this month.
          </p>
        )}
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
            className="w-full rounded-full bg-[#2563eb] text-white py-3 font-semibold hover:bg-[#1d4ed8] transition disabled:opacity-50"
            disabled={limitReached}
          >
            Scan My Visibility →
          </button>
        </form>
        <p className="text-center text-sm text-slate-400">
          ✓ 3 free scans/month • No credit card required • Takes under 2 minutes
        </p>
      </div>
    </section>
  )
}
