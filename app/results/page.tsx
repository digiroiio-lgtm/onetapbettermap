'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  generateMockHeatmap,
  generateMockCompetitors,
  calculateVisibilityScore,
  type HeatmapCell,
} from '@/lib/mockData'
import { loadGoogleMapsScript } from '@/lib/googleMapsLoader'
import { searchNearbyPlaces, type PlaceResult } from '@/lib/placesApi'
import {
  generateRecommendations,
  getDefaultRecommendations,
  type Recommendation,
} from '@/lib/recommendationEngine'
import RevenueImpactCard from '@/components/RevenueImpactCard'
import BlurredRevenuePreview from '@/components/BlurredRevenuePreview'

function Heatmap({ data }: { data: HeatmapCell[][] }) {
  return (
    <div className="grid grid-cols-7 gap-2 sm:gap-3 max-w-2xl mx-auto">
      {data.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`
              aspect-square rounded-xl flex items-center justify-center text-sm font-semibold
              transition-transform duration-150
              ${cell.color === 'green' ? 'bg-emerald-500 text-white' : ''}
              ${cell.color === 'yellow' ? 'bg-amber-400 text-slate-900' : ''}
              ${cell.color === 'red' ? 'bg-rose-500 text-white' : ''}
            `}
          >
            {cell.rank}
          </div>
        )),
      )}
    </div>
  )
}

function ResultsContent() {
  const searchParams = useSearchParams()

  const businessName = searchParams?.get('businessName') ?? 'Demo Dental Clinic'
  const city = searchParams?.get('city') ?? 'London'
  const keyword = searchParams?.get('keyword') ?? 'dentist near me'
  const area = searchParams?.get('area') ?? `Central ${city}`
  const isDemo = businessName === 'Demo Business'
  const scanType = isDemo ? 'Demo' : 'Live'

  const [realCompetitors, setRealCompetitors] = useState<PlaceResult[]>([])
  const [isLoadingCompetitors, setIsLoadingCompetitors] = useState(false)
  const [useRealData, setUseRealData] = useState(false)
  const [recommendations, setRecommendations] = useState<Recommendation[]>(
    getDefaultRecommendations(),
  )

  const heatmapData = useMemo(() => generateMockHeatmap(), [])
  const mockCompetitors = useMemo(() => generateMockCompetitors(), [])
  const visibilityScore = useMemo(
    () => calculateVisibilityScore(heatmapData),
    [heatmapData],
  )

  const normalizedBusinessName = businessName.trim().toLowerCase()
  const filteredRealCompetitors = useMemo(
    () =>
      realCompetitors.filter(
        (place) => place.name?.trim().toLowerCase() !== normalizedBusinessName,
      ),
    [realCompetitors, normalizedBusinessName],
  )

  useEffect(() => {
    async function fetchCompetitors() {
      try {
        setIsLoadingCompetitors(true)
        await loadGoogleMapsScript()

        if (!window.google?.maps) {
          throw new Error('Google Maps not available')
        }

        const geocoder = new google.maps.Geocoder()
        const address = `${businessName}, ${city}`

        geocoder.geocode({ address }, async (results, status) => {
          if (status === 'OK' && results && results[0]) {
            const location = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
            }

            const businessPlaceId = results[0].place_id
            const sanitizedKeyword = keyword.replace(/near me/gi, '').trim()

            const places = await searchNearbyPlaces({
              location,
              radius: 5000,
              keyword: sanitizedKeyword,
              businessName,
              businessPlaceId: businessPlaceId || undefined,
              city,
              type: 'establishment',
            })

            setRealCompetitors(places.slice(0, 10))
            setUseRealData(true)
          }

          setIsLoadingCompetitors(false)
        })
      } catch (error) {
        console.error('Error fetching competitors:', error)
        setIsLoadingCompetitors(false)
      }
    }

    if (!isDemo && businessName && city && keyword) {
      fetchCompetitors()
    }
  }, [businessName, city, keyword, isDemo])

  useEffect(() => {
    if (filteredRealCompetitors.length > 0) {
      const dynamicRecommendations = generateRecommendations(
        null,
        null,
        filteredRealCompetitors,
        null,
      )

      setRecommendations(dynamicRecommendations)
    }
  }, [filteredRealCompetitors])

  const displayHeatmap = heatmapData
  const displayScore = visibilityScore

  const competitors =
    filteredRealCompetitors.length > 0
      ? filteredRealCompetitors.slice(0, 3).map((place, index) => ({
          rank: index + 1,
          name: place.name ?? 'Competitor',
          rating:
            typeof place.rating === 'number' ? place.rating.toFixed(1) : 'N/A',
          reviews: place.userRatingsTotal ?? 'N/A',
        }))
      : isDemo
        ? mockCompetitors
        : []

  const competitorCount =
    filteredRealCompetitors.length || (isDemo ? mockCompetitors.length : 0)

  const scoreCopy = useMemo(() => {
    if (displayScore >= 80) {
      return 'Excellent coverage. Keep monitoring to defend your top spots.'
    }
    if (displayScore >= 60) {
      return 'Good visibility, but there are still weak zones to shore up.'
    }
    return 'You are visible, but competitors win most discovery moments.'
  }, [displayScore])

  const baseGapTexts = [
    'Weak keyword match vs competitors',
    'Missing 3 important categories',
    'Low review velocity this month',
    'No recent photo activity',
    'Limited reach beyond 0.5km',
    'Inconsistent profile completeness',
    'Slow response to reviews',
  ]

  const derivedGapTexts = recommendations
    .filter((item) => item.impact !== 'Low')
    .slice(0, 3)
    .map((item) => item.text)

  const gapList = Array.from(new Set([...derivedGapTexts, ...baseGapTexts])).slice(
    0,
    5,
  )

  const totalGapUniverse = 9
  const hiddenGapCount = Math.max(0, totalGapUniverse - gapList.length)

  const actionItems = recommendations.slice(0, 4)

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-20 pt-24 sm:px-6 lg:px-8">
        <section className="rounded-[32px] border border-white/10 bg-white/5 px-6 py-8 sm:px-12 sm:py-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.45em] text-slate-500">
                MapsRankChecker™
              </p>
              <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
                Your Google Maps Visibility Report
              </h1>
              <dl className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <dt className="text-xs uppercase tracking-[0.3em] text-slate-500">
                    Business
                  </dt>
                  <dd className="mt-2 text-lg text-white">{businessName}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.3em] text-slate-500">
                    Keyword
                  </dt>
                  <dd className="mt-2 text-lg text-white">“{keyword}”</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.3em] text-slate-500">
                    Area
                  </dt>
                  <dd className="mt-2 text-lg text-white">{area}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.3em] text-slate-500">
                    Scan Type
                  </dt>
                  <dd className="mt-2 text-lg text-white">{scanType}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.3em] text-slate-500">
                    Competitors Analyzed
                  </dt>
                  <dd className="mt-2 text-lg text-white">
                    {competitorCount || 'Collecting…'}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="flex items-start justify-end">
              <Link
                href="/#scan-section"
                className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white/90"
              >
                Analyze My Business
              </Link>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-white/5 px-6 py-10 text-center sm:px-12">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
            Core Insight
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white">
            Visibility Score
          </h2>
          <div className="mt-8 flex items-end justify-center gap-2 text-[72px] font-semibold leading-none text-white sm:text-[96px]">
            <span>{displayScore}</span>
            <span className="text-2xl text-slate-500">/100</span>
          </div>
          <p className="mt-4 text-base text-slate-400">{scoreCopy}</p>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-white/5 px-6 py-10 sm:px-12">
          <div className="flex flex-col gap-2 text-left">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Revenue Forecaster</p>
            <h3 className="text-2xl font-semibold text-white">See how better ranks turn into cash flow.</h3>
            <p className="text-sm text-slate-400">
              We translate CTR + conversion data into calls, customers, and revenue gains.
            </p>
          </div>
          <div className="mt-6">
            <RevenueImpactCard
              rankImprovementTo3={3}
              callsGained={18}
              directionsGained={7}
              customersGained={2}
              monthlyRevenueImpact={1240}
              className="bg-transparent"
            />
          </div>
          <div className="mt-6">
            <BlurredRevenuePreview />
          </div>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-white/5 px-6 py-10 sm:px-12">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
              Visibility Map
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-white">
              7×7 Visibility Heatmap
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Ranking across 49 locations surrounding your business
            </p>
          </div>
          <div className="mt-10">
            <Heatmap data={displayHeatmap} />
          </div>
          <div className="mt-8 flex flex-col items-start gap-4 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-center">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500 text-xs font-semibold text-white">
                1-3
              </span>
              <span>Top of map pack</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-amber-400 text-xs font-semibold text-slate-900">
                4-7
              </span>
              <span>Still visible but vulnerable</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-rose-500 text-xs font-semibold text-white">
                8+
              </span>
              <span>Outside discovery radius</span>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-white/5 px-6 py-10 sm:px-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                Competitive Snapshot
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-white">
                Top 3 competitors in your radius
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                {useRealData
                  ? 'Live data from Google Places'
                  : 'Sample competitors shown for demo mode'}
              </p>
            </div>
            {isLoadingCompetitors && (
              <span className="text-xs uppercase tracking-[0.4em] text-slate-500">
                fetching…
              </span>
            )}
          </div>
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
            {competitors.length > 0 ? (
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-white/5 text-slate-400">
                    <th className="px-4 py-3 font-medium">Rank</th>
                    <th className="px-4 py-3 font-medium">Business</th>
                    <th className="px-4 py-3 font-medium">Rating</th>
                    <th className="px-4 py-3 font-medium">Reviews</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {competitors.map((competitor) => (
                    <tr key={competitor.rank} className="text-white">
                      <td className="px-4 py-4 text-sm text-slate-400">
                        #{competitor.rank}
                      </td>
                      <td className="px-4 py-4 text-base font-medium">
                        {competitor.name}
                      </td>
                      <td className="px-4 py-4 text-slate-100">{competitor.rating}</td>
                      <td className="px-4 py-4 text-slate-100">
                        {competitor.reviews} reviews
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="px-6 py-10 text-center text-sm text-slate-400">
                {isLoadingCompetitors
                  ? 'Searching Google Maps for competitors…'
                  : 'No competitors found for this keyword and location.'}
              </p>
            )}
          </div>
          <div className="mt-6 flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>Snapshot data only covers basic rating and review signals.</p>
            <span className="inline-flex items-center gap-2 text-white/80">
              🔒
              <Link
                href="/upgrade"
                className="text-sm font-semibold text-white underline-offset-4 hover:underline"
              >
                Compare Full Competitor Data →
              </Link>
            </span>
          </div>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-white/5 px-6 py-10 sm:px-12">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
            What you're missing
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-white">
            What’s holding you back
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            The biggest blockers preventing you from dominating the local pack.
          </p>
          <ul className="mt-8 space-y-3">
            {gapList.map((gap) => (
              <li
                key={gap}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
              >
                <span className="text-lg">⚠️</span>
                <span className="text-white">{gap}</span>
              </li>
            ))}
          </ul>
          {hiddenGapCount > 0 && (
            <p className="mt-4 text-sm text-slate-500">
              + {hiddenGapCount} additional critical gaps hidden
            </p>
          )}
        </section>

        <section className="rounded-[32px] border border-white/10 bg-white/5 px-6 py-10 sm:px-12">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
            Recommended Actions
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-white">
            Execute these next
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            Quick wins to close your visibility gaps.
          </p>
          <div className="mt-8 divide-y divide-white/5">
            {actionItems.map((item) => (
              <div
                key={item.id}
                className="grid gap-4 py-4 sm:grid-cols-[minmax(0,1fr)_auto]"
              >
                <div>
                  <p className="text-base font-medium text-white">{item.text}</p>
                  {item.reason && (
                    <p className="mt-1 text-sm text-slate-400">{item.reason}</p>
                  )}
                </div>
                <span
                  className={`
                    inline-flex h-fit items-center rounded-full px-3 py-1 text-xs font-semibold
                    ${
                      item.impact === 'High'
                        ? 'bg-rose-500/20 text-rose-300'
                        : item.impact === 'Medium'
                          ? 'bg-amber-500/20 text-amber-200'
                          : 'bg-slate-500/30 text-slate-200'
                    }
                  `}
                >
                  {item.impact} impact
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 px-6 py-12 text-center sm:px-12">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-300">
            Upgrade CTA
          </p>
          <h3 className="mt-4 text-3xl font-semibold text-white">
            Unlock your full visibility report
          </h3>
          <p className="mt-3 text-base text-slate-300">
            See exact rankings, competitor metrics, and the fixes that close every gap.
          </p>
          <div className="mt-8 grid gap-3 text-left text-sm text-slate-200 sm:grid-cols-2">
            {[
              'Full keyword & category gaps',
              'Competitor visibility scores',
              'Weekly ranking timeline & alerts',
              'Step-by-step action plan',
            ].map((bullet) => (
              <div key={bullet} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="text-lg">✔</span>
                <span>{bullet}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-center gap-4">
            <div className="text-4xl font-semibold text-white">
              $9 <span className="text-base text-slate-400">/ month</span>
            </div>
            <p className="text-sm text-slate-400">Cancel anytime</p>
            <Link
              href="/upgrade"
              className="inline-flex items-center rounded-full bg-white px-8 py-3 text-base font-semibold text-slate-900 transition hover:bg-white/90"
            >
              Unlock Full Report →
            </Link>
            <p className="text-xs text-slate-500">
              1,247+ businesses already improving their Google Maps rankings
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#020617] text-slate-100">
          <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white"></div>
              <p className="text-sm text-slate-400">Loading report…</p>
            </div>
          </div>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  )
}
