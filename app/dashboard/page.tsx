'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import ActionRevenueChecklist from './components/ActionRevenueChecklist'
import HabitHeaderStrip from './components/HabitHeaderStrip'
import HeatmapWithZones from './components/HeatmapWithZones'
import RetentionSection from './components/RetentionSection'
import RevenueForecastStrip from './components/RevenueForecastStrip'
import RevenueImpactBanner from './components/RevenueImpactBanner'
import UpgradeDynamicCard from './components/UpgradeDynamicCard'
import ZoneDetailPanel from './components/ZoneDetailPanel'
import { mockRetentionData, type HabitHeaderData } from './mockRetentionData'
import { useMockDashboardData } from './mockData'
import type { HeatmapCell } from './types'
import { useRouter } from 'next/navigation'
// ...existing code...

export default function DashboardPage() {
  // Mock/Gerçek data geçişi için state
  const [useMock, setUseMock] = useState(true)
  // Mock data
  const mockData = useMockDashboardData()
  const { habitHeader: mockHabitHeader } = mockRetentionData
  // Gerçek data (örnek: API'den çekilecek, burada placeholder)
  const realData = {
    actions: [],
    currentPlan: {},
    heatmap: [],
    plans: [],
    revenueMetrics: {},
  }
  // Gerçek retention data (örnek: API'den çekilecek, burada placeholder)
  const realHabitHeader: HabitHeaderData = {
    streakWeeks: 0,
    visibilityPoints: 0,
    nextMilestonePoints: 0,
    weeklyGainPercent: 0,
  }
  // Seçilen data
  const actions = useMock ? mockData.actions : realData.actions
  const currentPlan = useMock ? mockData.currentPlan : realData.currentPlan
  const heatmap = useMock ? mockData.heatmap : realData.heatmap
  const plans = useMock ? mockData.plans : realData.plans
  const revenueMetrics = useMock ? mockData.revenueMetrics : realData.revenueMetrics
  const habitHeader = useMock ? mockHabitHeader : realHabitHeader
  const [selectedCell, setSelectedCell] = useState<HeatmapCell | null>(null)
  const actionSectionRef = useRef<HTMLDivElement | null>(null)
  const forecastRef = useRef<HTMLDivElement | null>(null)
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem('currentUser') : null
    if (!storedUser) {
      router.replace('/login')
      return
    }

    try {
      const parsedUser = JSON.parse(storedUser)
      const plan = (parsedUser?.plan ?? 'free').toString().toLowerCase()
      const freePlans = new Set(['free', 'starter', 'trial'])
      if (freePlans.has(plan)) {
        router.replace('/pricing')
        return
      }
      setIsAuthorized(true)
    } catch (error) {
      router.replace('/login')
    }
  }, [router])

  const sortedPlans = useMemo(() => [...plans].sort((a, b) => a.pricePerMonth - b.pricePerMonth), [plans])
  const nextPlan = useMemo(() => {
    const index = sortedPlans.findIndex((plan) => plan.name === currentPlan.name)
    return sortedPlans[index + 1] ?? null
  }, [currentPlan.name, sortedPlans])

  if (!isAuthorized) {
    return null
  }

  const handleViewActions = () => {
    actionSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const handleViewForecast = () => {
    forecastRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleActionClick = (actionId: string) => {
    console.log('TODO: track action click:', actionId)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex justify-end mb-2">
          <button
            type="button"
            className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition mr-2 ${useMock ? 'bg-gray-700 text-white' : 'bg-emerald-500 text-white'}`}
            onClick={() => setUseMock(!useMock)}
          >
            {useMock ? 'Gerçek Data ile Çalış' : 'Mock Data ile Çalış'}
          </button>
        </div>
        <header className="flex flex-col gap-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">MapsRankChecker™ Dashboard</p>
              <h1 className="text-3xl font-semibold text-white">Visibility & Habit Loop</h1>
              <p className="text-sm text-slate-400">Retain momentum, track progress, and keep the revenue loop tight.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                const params = new URLSearchParams({
                  businessName: 'Demo Business',
                  city: 'London',
                  keyword: 'dental clinic',
                })
                router.push(`/scanning?${params.toString()}`)
              }}
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-400"
            >
              Run new scan
            </button>
          </div>
        </header>

        <HabitHeaderStrip data={habitHeader} />

        <RevenueImpactBanner
          revenueMetrics={revenueMetrics}
          onViewActions={handleViewActions}
          onViewForecast={handleViewForecast}
        />

        <div ref={forecastRef}>
          <RevenueForecastStrip revenueMetrics={revenueMetrics} />
        </div>

        <HeatmapWithZones
          heatmap={heatmap}
          onSelectCell={(cell) => setSelectedCell(cell)}
          selectedCellId={selectedCell?.id ?? null}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <div ref={actionSectionRef} className="lg:col-span-1">
            <ActionRevenueChecklist
              actions={actions}
              revenueMetrics={revenueMetrics}
              onActionClick={handleActionClick}
            />
          </div>
          <UpgradeDynamicCard currentPlan={currentPlan} nextPlan={nextPlan} revenueMetrics={revenueMetrics} />
        </div>

        <RetentionSection data={mockRetentionData} />
      </div>

      <ZoneDetailPanel cell={selectedCell} onClose={() => setSelectedCell(null)} />
    </div>
  )
}
