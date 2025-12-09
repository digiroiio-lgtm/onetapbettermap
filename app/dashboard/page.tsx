'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Phase =
  | 'initializing'
  | 'welcome'
  | 'business'
  | 'keywords'
  | 'area'
  | 'competitors'
  | 'confirm'
  | 'loading'
  | 'wow'
  | 'dashboard'

type BusinessSuggestion = {
  id: string
  name: string
  address: string
  category: string
}

type CompetitorOption = {
  id: string
  name: string
  rating: number
  reviews: number
}

type ChecklistItem = {
  id: string
  title: string
  points: string
}

const businessSuggestions: BusinessSuggestion[] = [
  {
    id: 'b1',
    name: 'Demo Dental Clinic',
    address: '45 Regent St, London',
    category: 'Dental Clinic',
  },
  {
    id: 'b2',
    name: 'Lara Smile Studio',
    address: 'Konyaaltı Cad. 18, Antalya',
    category: 'Dental Studio',
  },
  {
    id: 'b3',
    name: 'Marina Family Dental',
    address: 'Poyraz Sok. 12, Antalya',
    category: 'Dental Practice',
  },
  {
    id: 'b4',
    name: 'White Pearl Clinic',
    address: 'Baker St. 102, London',
    category: 'Cosmetic Dentistry',
  },
]

const keywordSuggestions = [
  'dentist near me',
  'dental implants antalya',
  'teeth whitening antalya',
  'emergency dentist lara',
  'invisible braces london',
]

const competitorOptions: CompetitorOption[] = [
  { id: 'comp1', name: 'BellaDent Clinic', rating: 4.9, reviews: 312 },
  { id: 'comp2', name: 'WhiteSmile Antalya', rating: 4.8, reviews: 201 },
  { id: 'comp3', name: 'Elite Dental Center', rating: 4.7, reviews: 178 },
  { id: 'comp4', name: 'DentGlow Studio', rating: 4.9, reviews: 420 },
]

const navItems = [
  'Dashboard',
  'Scans',
  'Competitors',
  'Keywords',
  'Reports',
  'My Locations',
  'Upgrade',
  'Settings',
  'Logout',
]

const opportunityAlerts = [
  {
    title: 'Low Competition Keyword Found',
    detail: '“Implant center antalya” is trending with low competition this week.',
  },
  {
    title: 'Service Area Gap',
    detail: 'Eastern Konyaaltı is invisible on your grid. Run a focused scan there.',
  },
  {
    title: 'Competitor Spike',
    detail: 'DentGlow gained +4 in 4 days. Investigate their new campaign.',
  },
]

const actionChecklist: ChecklistItem[] = [
  { id: 'check-1', title: 'Improve your GBP description', points: '+4 pts' },
  { id: 'check-2', title: 'Add 5 new photos', points: '+3 pts' },
  { id: 'check-3', title: 'Respond to old reviews', points: '+2 pts' },
  { id: 'check-4', title: 'Add service categories', points: '+3 pts' },
]

const loadingTexts = [
  'Calculating visibility…',
  'Analyzing local pack positions…',
  'Finding competitor movement…',
  'Preparing your map heatmap…',
]

const wowSummary = {
  score: 34,
  positionRange: '#1 → #52',
  bestZone: 'Lara, Antalya',
  weakZone: 'Konyaaltı, Antalya',
  mover: 'BellaDent +3',
}

const heatmapPreview = [
  [3, 8, 11, 16, 22, 33, 45],
  [2, 5, 9, 12, 18, 31, 52],
  [1, 4, 7, 11, 16, 24, 37],
  [1, 3, 6, 9, 14, 21, 35],
  [2, 4, 8, 13, 20, 28, 41],
  [5, 9, 13, 19, 27, 36, 52],
  [7, 12, 18, 26, 34, 45, 58],
]

const dashboardHeatmap = [
  [4, 7, 10, 12, 28, 37, 40],
  [2, 3, 5, 9, 16, 24, 32],
  [1, 2, 4, 7, 11, 18, 27],
  [1, 2, 3, 5, 9, 14, 22],
  [3, 5, 8, 12, 18, 25, 33],
  [6, 9, 15, 21, 29, 38, 47],
  [9, 14, 20, 29, 38, 49, 57],
]

const competitorRows = [
  { name: 'BellaDent', rank: '#3', change: '+3', coverage: '41/49', locked: false },
  { name: 'WhiteSmile', rank: '#11', change: '-1', coverage: '32/49', locked: true },
  { name: 'Elite Dent', rank: '#16', change: '+1', coverage: '24/49', locked: true },
]

function HeatmapGrid({
  data,
  size = 'md',
}: {
  data: number[][]
  size?: 'sm' | 'md'
}) {
  return (
    <div className={`grid grid-cols-7 ${size === 'sm' ? 'gap-1.5' : 'gap-2.5'}`}>
      {data.map((row, rowIndex) =>
        row.map((value, colIndex) => {
          const color =
            value <= 3
              ? 'bg-emerald-500'
              : value <= 10
                ? 'bg-emerald-400'
                : value <= 20
                  ? 'bg-amber-400'
                  : value <= 35
                    ? 'bg-orange-500'
                    : 'bg-rose-600'
          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`aspect-square rounded-lg text-center text-xs font-semibold ${color} text-white/90 flex items-center justify-center`}
            >
              {value}
            </div>
          )
        }),
      )}
    </div>
  )
}

export default function DashboardPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>('initializing')
  const [sessionReady, setSessionReady] = useState(false)
  const [userName, setUserName] = useState('Demo User')

  const [selectedBusiness, setSelectedBusiness] = useState<BusinessSuggestion | null>(
    businessSuggestions[0],
  )
  const [businessQuery, setBusinessQuery] = useState('')
  const filteredBusinesses = useMemo(() => {
    if (!businessQuery) return businessSuggestions
    return businessSuggestions.filter((item) =>
      `${item.name} ${item.address} ${item.category}`
        .toLowerCase()
        .includes(businessQuery.toLowerCase()),
    )
  }, [businessQuery])

  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([
    keywordSuggestions[0],
    keywordSuggestions[1],
  ])
  const [keywordInput, setKeywordInput] = useState('')
  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword)
        ? prev.filter((item) => item !== keyword)
        : prev.length < 5
          ? [...prev, keyword]
          : prev,
    )
  }
  const addCustomKeyword = () => {
    const trimmed = keywordInput.trim()
    if (!trimmed) return
    if (selectedKeywords.length >= 5) return
    setSelectedKeywords((prev) => [...prev, trimmed])
    setKeywordInput('')
  }

  const [serviceArea, setServiceArea] = useState<'2km' | '5km' | 'custom'>('5km')
  const [customRadius, setCustomRadius] = useState(7)

  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>([
    competitorOptions[0].id,
    competitorOptions[1].id,
  ])

  const [loadingStep, setLoadingStep] = useState(0)

  useEffect(() => {
    const loggedIn = typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true'
    if (!loggedIn) {
      router.push('/login')
      return
    }

    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser)
        if (parsed?.name) setUserName(parsed.name)
      } catch (_) {
        setUserName('Demo User')
      }
    }

    const hasOnboarded = localStorage.getItem('mrcOnboardingComplete') === 'true'
    setPhase(hasOnboarded ? 'dashboard' : 'welcome')
    setSessionReady(true)
  }, [router])

  useEffect(() => {
    if (phase === 'loading') {
      setLoadingStep(0)
      let index = 0
      const interval = setInterval(() => {
        index = Math.min(index + 1, loadingTexts.length - 1)
        setLoadingStep(index)
      }, 800)
      const timeout = setTimeout(() => {
        clearInterval(interval)
        setPhase('wow')
      }, 3600)
      return () => {
        clearInterval(interval)
        clearTimeout(timeout)
      }
    }
  }, [phase])

  const markOnboardingComplete = () => {
    localStorage.setItem('mrcOnboardingComplete', 'true')
    setPhase('dashboard')
  }

  if (!sessionReady || phase === 'initializing') {
    return (
      <div className="min-h-screen bg-[#010314] text-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white"></div>
          <p className="text-sm text-slate-400">Preparing your workspace…</p>
        </div>
      </div>
    )
  }

  if (phase !== 'dashboard') {
    return (
      <div className="min-h-screen bg-[#010314] text-slate-100 px-4 py-10 sm:px-6 lg:px-12">
        {phase === 'welcome' && (
          <div className="mx-auto max-w-2xl rounded-[32px] border border-white/10 bg-white/5 p-10 text-center">
            <p className="text-sm uppercase tracking-[0.45em] text-slate-500">Welcome</p>
            <h1 className="mt-6 text-4xl font-semibold text-white">👋 Welcome to MapsRankChecker</h1>
            <p className="mt-4 text-base text-slate-300">
              Let’s get your real visibility insights in less than 60 seconds.
            </p>
            <div className="mt-8 space-y-3 text-left text-base text-slate-200">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                <p className="font-semibold">Your Visibility Score</p>
                <p className="text-sm text-slate-400">Understand your baseline instantly.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                <p className="font-semibold">Where you rank around your city</p>
                <p className="text-sm text-slate-400">49-point heatmap coverage.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                <p className="font-semibold">Your top competitors & timeline</p>
                <p className="text-sm text-slate-400">See who is moving faster.</p>
              </div>
            </div>
            <button
              onClick={() => setPhase('business')}
              className="mt-10 inline-flex items-center rounded-full bg-white px-8 py-3 text-base font-semibold text-slate-900 transition hover:bg-white/90"
            >
              Start Setup →
            </button>
          </div>
        )}

        {phase === 'business' && (
          <div className="mx-auto max-w-5xl rounded-[32px] border border-white/10 bg-white/5 p-10">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Step 1</p>
                <h2 className="mt-4 text-4xl font-semibold text-white">What’s your business?</h2>
                <p className="mt-3 text-base text-slate-400">
                  Search your Google Business Profile. We’ll auto-detect the rest.
                </p>
                <div className="mt-6">
                  <input
                    value={businessQuery}
                    onChange={(e) => setBusinessQuery(e.target.value)}
                    placeholder="Search business name or city"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-base text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                </div>
                <p className="mt-3 text-sm text-slate-500">
                  Not listed? <button className="underline underline-offset-4">Add manually →</button>
                </p>
              </div>
              <div className="space-y-3">
                {filteredBusinesses.map((business) => (
                  <button
                    key={business.id}
                    onClick={() => setSelectedBusiness(business)}
                    className={`w-full rounded-2xl border px-5 py-4 text-left transition hover:border-white/40 hover:bg-white/10 ${
                      selectedBusiness?.id === business.id
                        ? 'border-white/60 bg-white/10'
                        : 'border-white/10 bg-white/5'
                    }`}
                  >
                    <p className="text-lg font-semibold text-white">{business.name}</p>
                    <p className="text-sm text-slate-400">{business.address}</p>
                    <p className="text-xs uppercase tracking-[0.4em] text-slate-500 mt-2">
                      {business.category}
                    </p>
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-10 flex justify-end">
              <button
                disabled={!selectedBusiness}
                onClick={() => setPhase('keywords')}
                className="inline-flex items-center rounded-full border border-white/40 px-8 py-3 text-base font-semibold text-white transition enabled:hover:bg-white enabled:hover:text-slate-900 disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {phase === 'keywords' && (
          <div className="mx-auto max-w-5xl rounded-[32px] border border-white/10 bg-white/5 p-10">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Step 2</p>
            <h2 className="mt-4 text-4xl font-semibold text-white">Which searches matter to you?</h2>
            <p className="mt-3 text-base text-slate-400">Select up to 5. Don’t worry — you can add more later.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {keywordSuggestions.map((keyword) => (
                <button
                  key={keyword}
                  onClick={() => toggleKeyword(keyword)}
                  className={`rounded-full px-5 py-2 text-sm transition border ${
                    selectedKeywords.includes(keyword)
                      ? 'border-white/60 bg-white text-slate-900'
                      : 'border-white/20 bg-white/5 text-white'
                  }`}
                >
                  {keyword}
                </button>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <input
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                placeholder="Add your own keyword"
                className="flex-1 min-w-[220px] rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-base text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <button
                onClick={addCustomKeyword}
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-slate-900"
              >
                Add keyword
              </button>
            </div>
            <div className="mt-10 flex justify-end gap-4">
              <button
                onClick={() => setPhase('business')}
                className="text-sm text-slate-400 hover:text-white"
              >
                ← Back
              </button>
              <button
                disabled={selectedKeywords.length === 0}
                onClick={() => setPhase('area')}
                className="inline-flex items-center rounded-full border border-white/40 px-8 py-3 text-base font-semibold text-white transition enabled:hover:bg-white enabled:hover:text-slate-900 disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {phase === 'area' && (
          <div className="mx-auto max-w-5xl rounded-[32px] border border-white/10 bg-white/5 p-10">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Step 3</p>
            <h2 className="mt-4 text-4xl font-semibold text-white">Where do your customers come from?</h2>
            <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
              <div className="space-y-3">
                {['2km', '5km', 'custom'].map((radius) => (
                  <button
                    key={radius}
                    onClick={() => setServiceArea(radius as '2km' | '5km' | 'custom')}
                    className={`w-full rounded-2xl border px-5 py-4 text-left transition ${
                      serviceArea === radius
                        ? 'border-white/60 bg-white/10'
                        : 'border-white/10 bg-white/5'
                    }`}
                  >
                    <p className="text-lg font-semibold text-white">
                      {radius === 'custom' ? 'Custom zone' : `${radius} radius`}
                    </p>
                    <p className="text-sm text-slate-400">
                      {radius === 'custom'
                        ? 'Drag a custom circle on the map'
                        : 'Default service radius'}
                    </p>
                  </button>
                ))}
                {serviceArea === 'custom' && (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-slate-400">Custom radius (km)</p>
                    <input
                      type="range"
                      min={2}
                      max={15}
                      value={customRadius}
                      onChange={(e) => setCustomRadius(Number(e.target.value))}
                      className="mt-2 w-full"
                    />
                    <p className="mt-1 text-sm text-white">{customRadius} km</p>
                  </div>
                )}
              </div>
              <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-center">
                <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Mini Map</p>
                <div className="mt-4 h-[320px] rounded-2xl bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.25),_transparent_70%)]"></div>
                <p className="mt-4 text-sm text-slate-400">Drag to define the exact zone.</p>
              </div>
            </div>
            <div className="mt-10 flex justify-end gap-4">
              <button onClick={() => setPhase('keywords')} className="text-sm text-slate-400 hover:text-white">
                ← Back
              </button>
              <button
                onClick={() => setPhase('competitors')}
                className="inline-flex items-center rounded-full border border-white/40 px-8 py-3 text-base font-semibold text-white transition hover:bg-white hover:text-slate-900"
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {phase === 'competitors' && (
          <div className="mx-auto max-w-5xl rounded-[32px] border border-white/10 bg-white/5 p-10">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Step 4</p>
            <h2 className="mt-4 text-4xl font-semibold text-white">We found your top competitors. Track them?</h2>
            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
              <div className="space-y-3">
                {competitorOptions.map((competitor) => (
                  <label
                    key={competitor.id}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCompetitors.includes(competitor.id)}
                      onChange={() => {
                        setSelectedCompetitors((prev) =>
                          prev.includes(competitor.id)
                            ? prev.filter((id) => id !== competitor.id)
                            : [...prev, competitor.id],
                        )
                      }}
                      className="h-5 w-5 rounded border-white/30 bg-transparent"
                    />
                    <div>
                      <p className="text-lg font-semibold text-white">{competitor.name}</p>
                      <p className="text-sm text-slate-400">
                        ★ {competitor.rating.toFixed(1)} • {competitor.reviews} reviews
                      </p>
                    </div>
                  </label>
                ))}
              </div>
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.4em] text-slate-400">Preview</p>
                <div className="mt-4 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                  <p className="text-lg font-semibold text-white">
                    {competitorOptions.find((c) => selectedCompetitors.includes(c.id))?.name ?? 'Select a competitor'}
                  </p>
                  <p className="text-sm text-slate-400">Ranking snapshots, reviews, coverage are ready.</p>
                  <div className="mt-6 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Next Insight</p>
                    <p className="mt-2 text-white">Ranking timeline unlocks once you run your first scan.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 flex justify-between text-sm text-slate-400">
              <button onClick={() => setPhase('area')} className="text-slate-400 hover:text-white">
                ← Back
              </button>
              <div className="flex gap-4">
                <button
                  onClick={() => setPhase('confirm')}
                  className="rounded-full border border-white/30 px-6 py-3 text-white hover:bg-white/10"
                >
                  Add Competitors →
                </button>
                <button
                  onClick={() => setPhase('confirm')}
                  className="rounded-full border border-white/10 px-6 py-3 text-slate-400 hover:border-white/30 hover:text-white"
                >
                  Skip for now →
                </button>
              </div>
            </div>
          </div>
        )}

        {phase === 'confirm' && (
          <div className="mx-auto max-w-3xl rounded-[32px] border border-white/10 bg-white/5 p-10 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Step 5</p>
            <h2 className="mt-4 text-4xl font-semibold text-white">You're ready. Let’s map your true visibility.</h2>
            <div className="mt-8 space-y-4 text-left">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3">
                <span className="text-lg">✅</span>
                <span className="text-white">Business detected: {selectedBusiness?.name}</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3">
                <span className="text-lg">✅</span>
                <span className="text-white">Keywords selected: {selectedKeywords.length}</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3">
                <span className="text-lg">✅</span>
                <span className="text-white">
                  Service area defined: {serviceArea === 'custom' ? `${customRadius} km custom zone` : serviceArea}
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3">
                <span className="text-lg">✅</span>
                <span className="text-white">Competitors added: {selectedCompetitors.length}</span>
              </div>
            </div>
            <button
              onClick={() => setPhase('loading')}
              className="mt-10 inline-flex items-center rounded-full bg-white px-8 py-3 text-base font-semibold text-slate-900 transition hover:bg-white/90"
            >
              Run My First Scan →
            </button>
          </div>
        )}

        {phase === 'loading' && (
          <div className="mx-auto max-w-3xl rounded-[32px] border border-white/10 bg-white/5 p-10 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Running Scan</p>
            <h2 className="mt-4 text-4xl font-semibold text-white">Hold tight. We’re crunching real map data.</h2>
            <div className="mt-8 space-y-4 text-left">
              {loadingTexts.map((text, index) => (
                <div
                  key={text}
                  className={`rounded-2xl border px-5 py-3 ${
                    index <= loadingStep ? 'border-white/40 bg-white/10 text-white' : 'border-white/10 bg-white/5 text-slate-500'
                  }`}
                >
                  {text}
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="h-48 animate-pulse rounded-xl bg-gradient-to-br from-slate-700/60 via-slate-800/40 to-slate-900"></div>
              <p className="mt-4 text-sm text-slate-400">Heatmap preview loading…</p>
            </div>
          </div>
        )}

        {phase === 'wow' && (
          <div className="mx-auto max-w-6xl rounded-[32px] border border-white/10 bg-white/5 p-10">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-500">First Scan Complete</p>
            <h2 className="mt-4 text-4xl font-semibold text-white">🎉 Your Visibility Results Are Ready</h2>
            <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,380px)_1fr]">
              <div className="space-y-4 rounded-[28px] border border-white/10 bg-white/5 p-6">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm uppercase tracking-[0.4em] text-slate-400">Visibility Score</p>
                  <p className="mt-4 text-6xl font-semibold text-white">{wowSummary.score}<span className="text-2xl text-slate-500">/100</span></p>
                  <p className="mt-2 text-sm text-slate-400">Position Range: {wowSummary.positionRange}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Best zone</p>
                    <p className="mt-2 text-lg text-white">{wowSummary.bestZone}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Weak zone</p>
                    <p className="mt-2 text-lg text-white">{wowSummary.weakZone}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Competitor mover</p>
                    <p className="mt-2 text-lg text-white">{wowSummary.mover}</p>
                  </div>
                </div>
                <Link
                  href="/results"
                  className="block rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-slate-900 hover:bg-white/90"
                >
                  View Full Report →
                </Link>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-slate-400">🔒 Ranking timeline (past 14 days)</p>
                  <p className="text-sm text-slate-400">🔒 Full competitor table</p>
                  <p className="text-sm text-slate-400">🔒 White-label report</p>
                </div>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.4em] text-slate-400">Heatmap Preview</p>
                <div className="mt-6">
                  <HeatmapGrid data={heatmapPreview} />
                </div>
                <p className="mt-6 text-sm text-slate-400">Green = rank 1-3 • Amber = 4-7 • Red = 8+</p>
              </div>
            </div>
            <div className="mt-12 flex flex-wrap gap-4">
              <button
                onClick={markOnboardingComplete}
                className="rounded-full border border-white/40 px-8 py-3 text-base font-semibold text-white transition hover:bg-white hover:text-slate-900"
              >
                Go to Dashboard →
              </button>
              <p className="text-sm text-slate-400">
                Ready to keep tracking? Your dashboard is building the habit loop.
              </p>
            </div>
          </div>
        )}
      </div>
    )
  }

  const coverageSummary = {
    visibilityScore: 34,
    delta: '+4 this week',
    avgRank: '#12.4',
    avgDelta: '+1 since yesterday',
    coverage: '24/49 zones',
    coverageDelta: '+2 new zones visible',
  }

  return (
    <div className="min-h-screen bg-[#010314] text-slate-100 flex">
      <aside className="hidden w-64 flex-shrink-0 border-r border-white/5 bg-white/5/30 px-6 py-8 lg:flex lg:flex-col">
        <div className="text-xl font-semibold tracking-tight text-white">MapsRankChecker™</div>
        <nav className="mt-10 space-y-2">
          {navItems.map((item) => (
            <button
              key={item}
              className={`w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                item === 'Dashboard'
                  ? 'bg-white text-slate-900 shadow-lg'
                  : 'text-slate-400 hover:bg-white/10 hover:text-white'
              } ${item === 'Upgrade' ? 'border border-white/10' : ''}`}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-12">
        <header className="flex flex-col gap-4 pb-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Dashboard</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Welcome back, {userName}</h1>
            <p className="text-sm text-slate-500">Habit-forming visibility loop unlocked.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/70">
              🔔
            </button>
            <button className="rounded-full border border-white/10 px-6 py-2 text-sm font-semibold text-white">
              Upgrade to Scale →
            </button>
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-white/40 to-white/10"></div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-400">Visibility Score</p>
            <p className="mt-3 text-4xl font-semibold text-white">{coverageSummary.visibilityScore}<span className="text-xl text-slate-500">/100</span></p>
            <p className="mt-2 text-sm text-emerald-300">{coverageSummary.delta}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-400">Average Rank (Map Pack)</p>
            <p className="mt-3 text-4xl font-semibold text-white">{coverageSummary.avgRank}</p>
            <p className="mt-2 text-sm text-emerald-300">{coverageSummary.avgDelta}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-400">Coverage Score</p>
            <p className="mt-3 text-4xl font-semibold text-white">{coverageSummary.coverage}</p>
            <p className="mt-2 text-sm text-emerald-300">{coverageSummary.coverageDelta}</p>
          </div>
        </section>

        <section className="mt-8 rounded-[32px] border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Heatmap</p>
              <h2 className="text-2xl font-semibold text-white">Your live visibility grid</h2>
              <div className="mt-3 inline-flex gap-3 rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300">
                <span>Keyword:</span>
                <select className="bg-transparent text-white focus:outline-none">
                  <option className="bg-slate-900">dentist near me</option>
                  <option className="bg-slate-900">dental implants antalya</option>
                </select>
              </div>
            </div>
            <button className="rounded-full border border-white/20 px-6 py-2 text-sm font-semibold text-white">
              Run New Scan →
            </button>
          </div>
          <div className="mt-6">
            <HeatmapGrid data={dashboardHeatmap} />
          </div>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-400">
            <span>Highest: Lara (avg #3)</span>
            <span>Weakest: Konyaaltı (avg #21)</span>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Ranking Timeline</p>
                <h3 className="text-2xl font-semibold text-white">Your ranking over time</h3>
              </div>
              <button className="text-sm text-slate-400 underline">Unlock full history →</button>
            </div>
            <div className="mt-6 h-36 rounded-2xl bg-gradient-to-r from-emerald-400/40 via-amber-400/40 to-rose-500/40"></div>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-slate-400">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                Free plan: 7 days history
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                Starter: 14 days • Growth: 30 days • Scale: 90 days
              </div>
            </div>
          </div>
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Competitor Movement</p>
                <h3 className="text-2xl font-semibold text-white">Stay ahead daily</h3>
              </div>
              <button className="text-sm text-slate-400 underline">Compare more →</button>
            </div>
            <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
              <table className="w-full text-sm">
                <thead className="bg-white/5 text-slate-400">
                  <tr>
                    <th className="px-4 py-3 text-left">Competitor</th>
                    <th className="px-4 py-3 text-left">Today Rank</th>
                    <th className="px-4 py-3 text-left">7-Day Change</th>
                    <th className="px-4 py-3 text-left">Coverage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {competitorRows.map((row) => (
                    <tr key={row.name} className={row.locked ? 'text-slate-500' : 'text-white'}>
                      <td className="px-4 py-4">{row.name}</td>
                      <td className="px-4 py-4">{row.rank}</td>
                      <td className="px-4 py-4">{row.change}</td>
                      <td className="px-4 py-4">{row.coverage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-slate-500">Free plan shows 1 competitor. Unlock the rest.</p>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Opportunity Alerts</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">New chances to win</h3>
            <div className="mt-6 space-y-4">
              {opportunityAlerts.map((alert) => (
                <div key={alert.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-lg text-white">{alert.title}</p>
                  <p className="text-sm text-slate-400">{alert.detail}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Action Checklist</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">AI-prioritized steps</h3>
            <div className="mt-6 space-y-4">
              {actionChecklist.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full border border-white/30"></div>
                    <p className="text-sm text-white">{item.title}</p>
                  </div>
                  <span className="text-xs text-emerald-300">{item.points}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Exports & Reports</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Share insights instantly</h3>
            <div className="mt-6 flex flex-wrap gap-4">
              <button className="flex-1 min-w-[160px] rounded-2xl border border-dashed border-white/20 px-4 py-3 text-sm text-slate-400">
                🔒 Download PDF
              </button>
              <button className="flex-1 min-w-[160px] rounded-2xl border border-dashed border-white/20 px-4 py-3 text-sm text-slate-400">
                🔒 Download CSV
              </button>
            </div>
            <p className="mt-3 text-sm text-slate-500">Unlocked on Growth plan and above.</p>
          </div>
          <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-amber-500/20 via-rose-500/20 to-white/10 p-6">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-200">Upgrade</p>
            <h3 className="mt-2 text-3xl font-semibold text-white">Unlock deeper insights, longer timelines, and full competitor intelligence.</h3>
            <div className="mt-6 space-y-3 text-sm text-white/80">
              <p>✔ Full competitor table</p>
              <p>✔ 90-day ranking timeline</p>
              <p>✔ 21×21 grid scans</p>
            </div>
            <button className="mt-8 rounded-full border border-white/30 px-8 py-3 text-base font-semibold text-white hover:bg-white hover:text-slate-900">
              Upgrade to Scale →
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
