'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { logAnalyticsEvent } from '@/lib/analytics/events'
import {
  INDUSTRY_CONFIG,
  INDUSTRY_LIST,
  IndustryConfig,
  IndustryKey,
  isIndustryKey,
} from '@/lib/industry/industryConfig'

type IndustryContextValue = {
  industries: IndustryConfig[]
  selectedIndustry: IndustryConfig
  selectIndustry: (key: IndustryKey) => void
}

const IndustryContext = createContext<IndustryContextValue | null>(null)

export function IndustryProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [selectedKey, setSelectedKey] = useState<IndustryKey>('dental')

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const params = new URLSearchParams(window.location.search)
    const query = params.get('industry')
    if (query && isIndustryKey(query)) {
      setSelectedKey(query)
      return
    }

    const stored = window.localStorage.getItem('industry')
    if (stored && isIndustryKey(stored)) {
      setSelectedKey(stored)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    window.localStorage.setItem('industry', selectedKey)
  }, [selectedKey])

  useEffect(() => {
    if (pathname === '/pricing') {
      logAnalyticsEvent(`pricing_view_${selectedKey}`, {
        industry: selectedKey,
        location: 'pricing',
      })
    }
  }, [pathname, selectedKey])

  const selectIndustry = useCallback(
    (key: IndustryKey) => {
      if (key === selectedKey) {
        return
      }

      setSelectedKey(key)

      const params = new URLSearchParams(window?.location.search ?? '')
      params.set('industry', key)

      router.replace(`${pathname}?${params.toString()}`, { scroll: false })

      logAnalyticsEvent('industry_selected', {
        industry: key,
        location: 'hero',
        plan: INDUSTRY_CONFIG[key].recommendedPlan,
      })
    },
    [pathname, router, selectedKey]
  )

  const contextValue = useMemo<IndustryContextValue>(
    () => ({
      industries: INDUSTRY_LIST,
      selectedIndustry: INDUSTRY_CONFIG[selectedKey],
      selectIndustry,
    }),
    [selectedKey, selectIndustry]
  )

  return <IndustryContext.Provider value={contextValue}>{children}</IndustryContext.Provider>
}

export function useIndustry() {
  const context = useContext(IndustryContext)
  if (!context) {
    throw new Error('useIndustry must be used within IndustryProvider')
  }
  return context
}

export default IndustryProvider
