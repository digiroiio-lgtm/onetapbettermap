'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function ScanningContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const businessName = searchParams.get('businessName')
  const city = searchParams.get('city')
  const keyword = searchParams.get('keyword')

  useEffect(() => {
    // Simulate scanning process with 2.5 seconds delay
    const timer = setTimeout(() => {
      const params = new URLSearchParams({
        businessName: businessName || '',
        city: city || '',
        keyword: keyword || '',
      })
      router.push(`/results?${params.toString()}`)
    }, 2500)

    return () => clearTimeout(timer)
  }, [businessName, city, keyword, router])

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          {/* Animated spinner */}
          <div className="inline-block">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Scanning your map ranking…
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          This usually takes around 15–20 seconds. We're checking 49 points around your business.
        </p>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">✓</div>
              <span className="text-gray-700">Analyzing location data...</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">✓</div>
              <span className="text-gray-700">Checking competitor rankings...</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-primary rounded-full animate-pulse"></div>
              <span className="text-gray-700">Generating visibility map...</span>
            </div>
            <div className="flex items-center gap-3 opacity-50">
              <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
              <span className="text-gray-500">Preparing your report...</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          Scanning for: <span className="font-semibold">{businessName}</span> in <span className="font-semibold">{city}</span>
        </div>
      </div>
    </main>
  )
}

export default function ScanningPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Preparing scan...</p>
        </div>
      </div>
    }>
      <ScanningContent />
    </Suspense>
  )
}
