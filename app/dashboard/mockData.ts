'use client'

import { useMemo } from 'react'
import type { RevenueMetrics, HeatmapCell, ActionItem, PlanInfo } from './types'

const areaGrid = [
  ['Lara Heights', 'Lara East', 'Lara Harbor', 'Lara South', 'Konyaaltı Ridge', 'Konyaaltı Central', 'Konyaaltı West'],
  ['Downtown Antalya', 'Antalya Core', 'Antalya South', 'Kepez Heights', 'Karaalioğlu Park', 'Dokuma', 'Nejdet'],
  ['Kaleiçi', 'Mermerli', 'Çallı', 'Gazipaşa', 'Uncalı', 'Varosha', 'Döşemealtı'],
  ['Murtiyeli', 'Balbey', 'Kepez North', 'Tünektepe', 'Altınova', 'Samatya', 'Limak'],
  ['Konyaaltı Beach', 'University Hill', 'Metrocity', 'Serik Yolu', 'Belek Edge', 'Kemer Highridge', 'Büyükşehir'],
  ['Lara Planet', 'Zona T', 'Agora', 'Breakwater', 'Port Residences', 'Seaside Drive', 'Pelin'],
  ['Village Trail', 'Hadrian Gate', 'Harbiye', 'Hilltop Spa', 'Canal View', 'Opera', 'Arena Hills'],
]

const rankGrid = [
  [3, 6, 8, 14, 20, 28, 33],
  [4, 5, 7, 11, 18, 26, 39],
  [1, 2, 4, 9, 16, 23, 30],
  [5, 7, 9, 13, 21, 29, 36],
  [6, 8, 12, 17, 24, 32, 41],
  [10, 14, 18, 22, 31, 37, 43],
  [12, 15, 19, 25, 34, 38, 45],
]

const trendGrid: Array<Array<HeatmapCell['trend']>> = [
  ['up', 'up', 'flat', 'flat', 'down', 'down', 'down'],
  ['up', 'up', 'up', 'flat', 'flat', 'down', 'down'],
  ['up', 'up', 'up', 'flat', 'flat', 'down', 'down'],
  ['up', 'flat', 'flat', 'flat', 'down', 'down', 'down'],
  ['flat', 'flat', 'down', 'down', 'down', 'down', 'down'],
  ['down', 'down', 'down', 'down', 'down', 'down', 'down'],
  ['down', 'down', 'down', 'down', 'down', 'down', 'down'],
]

export function useMockDashboardData() {
  return useMemo(() => {
    const revenueMetrics: RevenueMetrics = {
      currency: 'USD',
      currentRank: 12,
      currentMonthlyRevenue: 3360,
      targetRank3Revenue: 5040,
      targetRank1Revenue: 6720,
      estCallsAtCurrent: 128,
      estCallsAtRank3: 196,
      estCallsAtRank1: 260,
    }

    const heatmap: HeatmapCell[] = areaGrid.flatMap((rowAreas, rowIndex) =>
      rowAreas.map((label, colIndex) => {
        const rank = rankGrid[rowIndex][colIndex]
        const calls = Math.max(12, 150 - rank * 2 + colIndex * 1.5)
        const revenue = Math.round(calls * 42)
        const trend = trendGrid[rowIndex][colIndex]
        const isStrongest = rowIndex === 2 && colIndex === 0
        const isWeakest = rowIndex === 6 && colIndex === 6
        return {
          id: `cell-${rowIndex}-${colIndex}`,
          row: rowIndex,
          col: colIndex,
          areaLabel: label,
          rank,
          estCallsPerMonth: Math.round(calls),
          estRevenuePerMonth: revenue,
          trend,
          isStrongest,
          isWeakest,
        }
      }),
    )

    const actions: ActionItem[] = [
      {
        id: 'action-photos',
        label: 'Add 5 new patient stories to the gallery',
        estScoreImpact: 4,
        estRevenueImpact: 320,
        category: 'photos',
        status: 'todo',
      },
      {
        id: 'action-reviews',
        label: 'Respond to 8 recent reviews with keywords',
        estScoreImpact: 3,
        estRevenueImpact: 270,
        category: 'reviews',
        status: 'in_progress',
      },
      {
        id: 'action-categories',
        label: 'Refine service categories + add subcategories',
        estScoreImpact: 2,
        estRevenueImpact: 210,
        category: 'categories',
        status: 'todo',
      },
      {
        id: 'action-profile',
        label: 'Review business description for local landmarks',
        estScoreImpact: 2,
        estRevenueImpact: 180,
        category: 'profile',
        status: 'todo',
      },
      {
        id: 'action-other',
        label: 'Publish 3 Google Posts with special offers',
        estScoreImpact: 1,
        estRevenueImpact: 150,
        category: 'other',
        status: 'done',
      },
    ]

    const plans: PlanInfo[] = [
      {
        name: 'Free',
        pricePerMonth: 0,
        lockedFeatures: ['90-day ranking timeline', 'Competitor table', 'Branded exports'],
        unlockedFeatures: ['100 scans/month', 'Basic visibility score', 'Alert emails'],
        estExtraRevenueIfUpgraded: 820,
      },
      {
        name: 'Starter',
        pricePerMonth: 49,
        current: true,
        lockedFeatures: ['21×21 GeoGrid scans', 'Full competitor alerts', 'White-label reports'],
        unlockedFeatures: ['14-day history', 'Revenue forecaster', 'Action checklist'],
        estExtraRevenueIfUpgraded: 1260,
      },
      {
        name: 'Growth',
        pricePerMonth: 99,
        lockedFeatures: ['24/7 support', 'Custom SLA', 'API access'],
        unlockedFeatures: ['30-day history', 'Automated alerts', 'Collaborative workspaces'],
        estExtraRevenueIfUpgraded: 1820,
      },
      {
        name: 'Scale',
        pricePerMonth: 199,
        lockedFeatures: [],
        unlockedFeatures: ['90-day history', 'Unlimited exports', 'Priority onboarding'],
        estExtraRevenueIfUpgraded: 3100,
      },
    ]

    const currentPlan = plans.find((plan) => plan.current) ?? plans[1]

    return {
      revenueMetrics,
      heatmap,
      actions,
      plans,
      currentPlan,
    }
  }, [])
}
