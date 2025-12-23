'use client'

import { useSearchParams } from 'next/navigation'
import AppGuard from '@/components/AppGuard'
import FreeScanForm from '@/components/FreeScanForm'
import ScanProgress from '@/components/ScanProgress'

export default function NewScanPage() {
  const searchParams = useSearchParams()
  const businessName = searchParams?.get('businessName') ?? ''
  const city = searchParams?.get('city') ?? ''
  const keyword = searchParams?.get('keyword') ?? ''
  const showProgress = Boolean(businessName && city)

  return (
    <AppGuard>
      {showProgress ? (
        <ScanProgress businessName={businessName} city={city} keyword={keyword} />
      ) : (
        <div className="min-h-screen bg-[#020617] text-slate-100">
          <FreeScanForm />
        </div>
      )}
    </AppGuard>
  )
}
