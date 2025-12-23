'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import ScanProgress from '@/components/ScanProgress'

function ScanningContent() {
  const searchParams = useSearchParams()
  const businessName = searchParams?.get('businessName') ?? ''
  const city = searchParams?.get('city') ?? ''
  const keyword = searchParams?.get('keyword') ?? ''

  return (
    <ScanProgress businessName={businessName} city={city} keyword={keyword} />
  )
}

export default function ScanningPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4">
            <div className="loader loader-md">
              <span></span>
            </div>
          </div>
          <p className="text-gray-600">Preparing scan...</p>
        </div>
      </div>
    }>
      <ScanningContent />
    </Suspense>
  )
}
