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
          {/* Animated map pin */}
          <div className="inline-block relative">
            <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse mx-auto mb-6">
              <svg className="w-12 h-12 text-white animate-bounce" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            {/* Ripple effect */}
            <div className="absolute inset-0 w-24 h-24 mx-auto bg-red-500 rounded-full animate-ping opacity-20"></div>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Scanning your map ranking…
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          This usually takes around 15–20 seconds. We're checking 49 points around your business.
        </p>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto border border-gray-100">
          <div className="space-y-4">
            <div className="flex items-center gap-3 transform transition-all duration-300 hover:translate-x-1">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm shadow-md">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                </svg>
              </div>
              <span className="text-gray-700 font-medium">Analyzing location data...</span>
            </div>
            <div className="flex items-center gap-3 transform transition-all duration-300 hover:translate-x-1">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm shadow-md">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                </svg>
              </div>
              <span className="text-gray-700 font-medium">Checking competitor rankings...</span>
            </div>
            <div className="flex items-center gap-3 transform transition-all duration-300 hover:translate-x-1">
              <div className="w-8 h-8 bg-primary rounded-full animate-pulse flex items-center justify-center shadow-md">
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
              <span className="text-gray-700 font-medium">Generating visibility map...</span>
            </div>
            <div className="flex items-center gap-3 opacity-50">
              <div className="w-8 h-8 border-2 border-gray-300 rounded-full"></div>
              <span className="text-gray-500">Preparing your report...</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-blue-50 rounded-lg p-4 inline-block border border-blue-100">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span>Scanning for: <span className="font-semibold">{businessName}</span> in <span className="font-semibold">{city}</span></span>
          </div>
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
