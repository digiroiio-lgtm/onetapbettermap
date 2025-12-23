'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import Link from 'next/link'
import IndustryHero from '@/components/IndustryHero'
import FreeScanForm from '@/components/FreeScanForm'
import RevenueForecastPanel from '@/components/RevenueForecastPanel'
import { faqItems } from './faq/faqContent'

const statCards = [
  {
    value: 1200,
    suffix: '+',
    label: 'Businesses',
    helper: 'Active accounts',
    icon: (
      <svg className="h-6 w-6 text-indigo-300" viewBox="0 0 24 24" fill="none">
        <path d="M4 18v-5a4 4 0 014-4h8a4 4 0 014 4v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 9a4 4 0 108 0 4 4 0 00-8 0z" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    value: 50000,
    suffix: '+',
    label: 'Monthly scans',
    helper: 'GeoGrid volume',
    icon: (
      <svg className="h-6 w-6 text-cyan-300" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2" />
        <rect x="14" y="3" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2" />
        <rect x="3" y="14" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2" />
        <rect x="14" y="14" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    value: 48,
    suffix: '/5',
    label: 'Average rating',
    helper: 'Verified reviews',
    decimals: 1,
    icon: (
      <svg className="h-6 w-6 text-amber-300" viewBox="0 0 24 24" fill="none">
        <path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.1L12 17.5 6.4 20l1.1-6.1L3 9.6l6.2-.9L12 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

const industryShowcase = [
  {
    name: 'Dentists',
    tagline: 'Protect high-value cosmetic and implant calls before competitors claim them.',
    highlight: 'dentist near me',
    before: '#12',
    after: '#3',
    radius: '3.2 mi',
    icon: (
      <svg className="h-6 w-6 text-cyan-300" viewBox="0 0 24 24" fill="none">
        <path d="M7 4c-2 0-3 2-3 4 0 3 2 5 4 5 1 0 2-1 3-2 1 1 2 2 3 2 2 0 4-2 4-5 0-2-1-4-3-4-1 0-2 1-3 2-1-1-2-2-5-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 11v5M15 11v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Restaurants',
    tagline: 'Own delivery and dine-in searches across every neighborhood hotspot.',
    highlight: 'restaurant near me',
    before: '#9',
    after: '#2',
    radius: '2.1 mi',
    icon: (
      <svg className="h-6 w-6 text-amber-300" viewBox="0 0 24 24" fill="none">
        <path d="M7 3v7M11 3v7M7 7h4M16 3v18M20 3v6a3 3 0 01-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Law Firms',
    tagline: 'Win local intent searches before urgency-driven clients scroll away.',
    highlight: 'personal injury lawyer',
    before: '#15',
    after: '#4',
    radius: '5.4 mi',
    icon: (
      <svg className="h-6 w-6 text-indigo-300" viewBox="0 0 24 24" fill="none">
        <path d="M5 21h14M9 7l6 6M7 9l6 6M13 3l8 8-3 3-8-8 3-3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Medical Clinics',
    tagline: 'Capture high-intent patients for urgent care, dermatology, and wellness.',
    highlight: 'urgent care',
    before: '#11',
    after: '#3',
    radius: '4.0 mi',
    icon: (
      <svg className="h-6 w-6 text-emerald-300" viewBox="0 0 24 24" fill="none">
        <path d="M12 6v12M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    name: 'Real Estate',
    tagline: 'Stay visible when buyers search for listings and neighborhood expertise.',
    highlight: 'real estate agent',
    before: '#8',
    after: '#1',
    radius: '6.0 mi',
    icon: (
      <svg className="h-6 w-6 text-rose-300" viewBox="0 0 24 24" fill="none">
        <path d="M3 11l9-7 9 7v9a1 1 0 01-1 1H4a1 1 0 01-1-1v-9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 21v-6h6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
]

const geoGridCells = [
  { rank: 3, tone: 'good', revenue: '$780', area: 'Central' },
  { rank: 12, tone: 'weak', revenue: '$120', area: 'North' },
  { rank: 5, tone: 'mid', revenue: '$420', area: 'East' },
  { rank: 1, tone: 'good', revenue: '$980', area: 'Core' },
  { rank: 8, tone: 'mid', revenue: '$260', area: 'South' },
  { rank: 15, tone: 'weak', revenue: '$80', area: 'West' },
]

const competitorRows = [
  { name: 'BellaDent', coverage: 82, trend: '+2', rank: 3 },
  { name: 'Your practice', coverage: 56, trend: '0', rank: 5 },
  { name: 'UrbanSmile', coverage: 71, trend: '-1', rank: 4 },
  { name: 'PrimeClinic', coverage: 49, trend: '+1', rank: 7 },
]

const featureCards = [
  {
    title: 'Visibility Score',
    body: 'A single KPI that grades your coverage across every neighborhood grid point.',
    accent: 'from-indigo-500/20 to-indigo-500/5',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
        <path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Multi-Area Heatmaps',
    body: 'Drag the grid, compare zones, and reveal blind spots instantly.',
    accent: 'from-cyan-500/20 to-cyan-500/5',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2" />
        <rect x="13" y="4" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2" />
        <rect x="4" y="13" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2" />
        <rect x="13" y="13" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: 'Keyword Position Tracking',
    body: 'Track top search intents and see exactly where you rank by keyword.',
    accent: 'from-amber-500/20 to-amber-500/5',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'AI Action Checklist',
    body: 'Actions prioritized by revenue impact, not vanity metrics.',
    accent: 'from-emerald-500/20 to-emerald-500/5',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
        <path d="M9 11l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: 'Revenue Forecaster',
    body: 'Forecast calls and revenue before you invest in SEO or ads.',
    accent: 'from-rose-500/20 to-rose-500/5',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
        <path d="M4 20h16M6 16l4-4 4 3 4-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Competitor Alerts',
    body: 'Real-time alerts when rivals climb above you in key zones.',
    accent: 'from-slate-500/20 to-slate-500/5',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l7 4v6c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

const testimonialCards = [
  {
    name: 'Dr. Alina Perez',
    company: 'SmileWorks',
    quote: 'We replaced six spreadsheets with one visibility dashboard and gained 32% more implant calls.',
    stats: ['+32% new patients', '+$12k monthly revenue', 'Rank #1 in 8 neighborhoods'],
  },
  {
    name: 'Marcus Li',
    company: 'Urban Realty Group',
    quote: 'The revenue forecast made our SEO budget an easy yes. We finally connect ranking to dollars.',
    stats: ['+$8.4k revenue lift', '20 markets tracked', 'Rank #2 citywide'],
  },
  {
    name: 'Priya Shah',
    company: 'Fresh Bowl Kitchen',
    quote: 'We tightened our delivery radius and jumped from page two to top three in one month.',
    stats: ['+41% delivery orders', '+19% repeat visits', 'Rank #3 in peak zones'],
  },
]

function StatCounter({ value, suffix, label, helper, icon, decimals = 0 }: { value: number; suffix: string; label: string; helper: string; icon: ReactNode; decimals?: number }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [display, setDisplay] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node || hasAnimated.current) {
      return
    }

    if (typeof IntersectionObserver === 'undefined') {
      setDisplay(value)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const start = performance.now()
          const duration = 1200
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            setDisplay(Math.round(value * progress))
            if (progress < 1) {
              requestAnimationFrame(step)
            }
          }
          requestAnimationFrame(step)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className="card card-wide card-top card-compact">
      <div className="flex items-center justify-between">
        {icon}
        <span className="text-xs uppercase tracking-[0.4em] text-slate-400">Live</span>
      </div>
      <p className="mt-4 text-3xl font-semibold text-white">
        {decimals ? (display / Math.pow(10, decimals)).toFixed(decimals) : display.toLocaleString()}
        {suffix.startsWith('+') || suffix.startsWith('/') ? '' : ' '}
        {suffix}
      </p>
      <p className="text-sm text-slate-200 font-semibold">{label}</p>
      <p className="text-xs text-slate-400 uppercase tracking-[0.3em]">{helper}</p>
    </div>
  )
}

function MiniHeatmap({ variant }: { variant: 'problem' | 'solution' }) {
  const palette =
    variant === 'problem'
      ? ['bg-rose-500', 'bg-rose-400', 'bg-slate-700']
      : ['bg-emerald-500', 'bg-emerald-400', 'bg-slate-700']
  return (
    <div className="grid grid-cols-4 gap-1">
      {Array.from({ length: 16 }).map((_, index) => {
        const color = index % 3 === 0 ? palette[0] : index % 2 === 0 ? palette[1] : palette[2]
        return <div key={index} className={`h-6 w-6 rounded-md ${color}`} />
      })}
    </div>
  )
}

function AnimatedNumber({ value, suffix }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(value)
  const prevValue = useRef(value)

  useEffect(() => {
    const start = performance.now()
    const from = prevValue.current
    const duration = 500
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const next = Math.round(from + (value - from) * progress)
      setDisplay(next)
      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        prevValue.current = value
      }
    }
    requestAnimationFrame(step)
  }, [value])

  return (
    <span>
      {display.toLocaleString()} {suffix}
    </span>
  )
}

export default function HomePage() {
  return (
    <div className="bg-[#020617] text-slate-100 font-sans">
      <main>
        <IndustryHero />
        <SocialProofStrip />
        <ProblemSolution />
        <IndustryShowcase />
        <GeoGridSection />
        <RevenueForecasterSection />
        <CompetitorTrackerSection />
        <CoreFeaturesSection />
        <FreeScanForm />
        <TestimonialsSection />
        <LandingFAQ />
        <FinalCTA />
      </main>
    </div>
  )
}

function SocialProofStrip() {
  return (
    <section className="px-4 sm:px-6 lg:px-24 pb-20">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
        {statCards.map((stat) => (
          <StatCounter key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  )
}

function ProblemSolution() {
  return (
    <section className="px-4 sm:px-6 lg:px-24 py-20 border-t border-white/5">
      <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-2">
        <div className="card card-wide card-top card-lg group">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-rose-500/20 p-3">
              <svg className="h-6 w-6 text-rose-300" viewBox="0 0 24 24" fill="none">
                <path d="M4 19h16M4 15l4-4 3 3 5-7 4 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-rose-200">Problem</p>
              <h3 className="text-2xl font-semibold text-white">Your visibility is leaking</h3>
            </div>
          </div>
          <p className="mt-4 text-slate-300">
            Customers see competitors first. Your team only knows the last search you ran.
          </p>
          <div className="mt-6 flex items-center justify-between">
            <MiniHeatmap variant="problem" />
            <div className="text-right text-sm text-slate-400">
              <p className="font-semibold text-rose-300">Blind spots</p>
              <p>Competitors overtaking you</p>
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-rose-400/20 bg-rose-500/10 p-4 text-sm text-rose-100 opacity-0 transition group-hover:opacity-100">
            <p>Missed calls, declining reviews, and no idea where you are slipping.</p>
          </div>
        </div>

        <div className="card card-wide card-top card-lg group">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-emerald-500/20 p-3">
              <svg className="h-6 w-6 text-emerald-300" viewBox="0 0 24 24" fill="none">
                <path d="M4 12l4 4 12-12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-200">Solution</p>
              <h3 className="text-2xl font-semibold text-white">See the full map</h3>
            </div>
          </div>
          <p className="mt-4 text-slate-300">
            GeoGrid highlights coverage, revenue, and competitor movement in every zone.
          </p>
          <div className="mt-6 flex items-center justify-between">
            <MiniHeatmap variant="solution" />
            <div className="text-right text-sm text-slate-400">
              <p className="font-semibold text-emerald-300">Revenue up</p>
              <p>+3,640 forecasted</p>
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-100 opacity-0 transition group-hover:opacity-100">
            <p>Prioritized actions, rising ranks, and a clear path to growth.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function IndustryShowcase() {
  return (
    <section className="px-4 sm:px-6 lg:px-24 py-24 border-t border-white/5">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="text-center space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Industry playbooks</p>
          <h2 className="text-3xl font-semibold text-white">Local winners across five verticals</h2>
          <p className="text-slate-400">Every industry sees a tailored map, ranking, and revenue loop.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {industryShowcase.map((industry) => (
            <div key={industry.name} className="card card-wide card-top card-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/70">
                    {industry.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white">{industry.name}</h3>
                    <p className="text-sm text-slate-300">{industry.tagline}</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-2 text-xs text-slate-300">
                  {industry.highlight}
                </div>
              </div>
              <div className="mt-5 rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800/60 p-4 relative overflow-hidden">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-500/20 blur-2xl" />
                <div className="absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-indigo-500/20 blur-2xl" />
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Local scene</p>
                <div className="mt-3 h-20 rounded-xl border border-white/10 bg-slate-900/70" />
                <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-300" />
                  Radius {industry.radius}
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_1.1fr]">
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Ranking lift</p>
                  <div className="mt-3 flex items-center gap-3 text-lg font-semibold">
                    <span className="text-rose-300">{industry.before}</span>
                    <span className="text-slate-500">to</span>
                    <span className="text-emerald-300">{industry.after}</span>
                  </div>
                  <p className="mt-4 text-xs text-slate-400 uppercase tracking-[0.3em]">Search radius</p>
                  <p className="text-sm text-slate-200">{industry.radius}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Snapshot</p>
                  <div className="mt-4 grid grid-cols-5 gap-1">
                    {Array.from({ length: 15 }).map((_, index) => (
                      <div
                        key={index}
                        className={`h-5 w-5 rounded-md ${index % 3 === 0 ? 'bg-emerald-500/70' : index % 2 === 0 ? 'bg-amber-400/70' : 'bg-rose-500/70'}`}
                      />
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-slate-300">
                    <span>Coverage lift</span>
                    <span className="text-emerald-300">+26%</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-emerald-200">Local map wins</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-400/10 px-3 py-1 text-indigo-200">Revenue forecast</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function GeoGridSection() {
  const toneClass = (tone: string) => {
    if (tone === 'good') return 'bg-emerald-500/80'
    if (tone === 'mid') return 'bg-amber-400/80'
    return 'bg-rose-500/80'
  }

  return (
    <section className="px-4 sm:px-6 lg:px-24 py-24 border-t border-white/5">
      <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">GeoGrid visualization</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Interactive grid reveals hidden revenue zones</h2>
          <p className="mt-3 text-slate-400">
            Hover the cells to see rank, revenue impact, and competitor shifts. Weak zones pulse until you fix them.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4 text-xs text-slate-300">
            {geoGridCells.map((cell) => (
              <div key={cell.area} className="card card-wide card-top card-compact">
                <p className="text-slate-400 uppercase tracking-[0.3em]">{cell.area}</p>
                <p className="mt-2 text-lg font-semibold text-white">#{cell.rank}</p>
                <p className="text-emerald-300">{cell.revenue}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="card card-wide card-top card-lg">
          <div className="grid grid-cols-3 gap-3" style={{ transform: 'perspective(900px) rotateX(10deg) rotateY(-6deg)' }}>
            {geoGridCells.map((cell, index) => (
              <div key={index} className="group relative">
                <div
                  className={`h-24 w-24 rounded-2xl border border-white/10 ${toneClass(cell.tone)} ${
                    cell.tone === 'weak' ? 'animate-pulse' : ''
                  } shadow-[0_12px_30px_rgba(2,6,23,0.45)]`}
                />
                {index === 0 && (
                  <div className="absolute left-2 top-2 rounded-full bg-slate-950/80 px-2 py-1 text-[10px] uppercase tracking-[0.3em] text-emerald-200">
                    You
                  </div>
                )}
                {cell.tone === 'weak' && (
                  <div className="absolute right-2 bottom-2 rounded-full bg-slate-950/80 px-2 py-1 text-[10px] uppercase tracking-[0.3em] text-rose-200">
                    Rival
                  </div>
                )}
                <div className="pointer-events-none absolute left-1/2 top-1/2 w-36 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/10 bg-slate-950/90 px-3 py-2 text-xs text-white opacity-0 transition group-hover:opacity-100">
                  <p className="uppercase tracking-[0.3em] text-slate-400">Rank #{cell.rank}</p>
                  <p className="text-emerald-300">Revenue {cell.revenue}</p>
                  <p className="text-slate-300">{cell.area} zone</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function RevenueForecasterSection() {
  const [targetRank, setTargetRank] = useState(6)
  const normalized = (12 - targetRank) / 11
  const calls = Math.round(8 + normalized * 22)
  const customers = Math.max(2, Math.round(calls * 0.6))
  const revenue = Math.round(1200 + normalized * 6600)

  const chartPoints = useMemo(() => [6, 14, 10, 22, 26, 32], [])

  return (
    <section className="px-4 sm:px-6 lg:px-24 py-24 border-t border-white/5">
      <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div className="card card-wide card-top card-lg">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Revenue forecaster</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Move the slider. Watch revenue respond.</h2>
          <p className="mt-3 text-slate-400">Drag to simulate rank changes and real-time revenue lift.</p>

          <div className="mt-6">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Current: #12</span>
              <span>Target: #{targetRank}</span>
              <span>Goal: #1</span>
            </div>
            <input
              type="range"
              min={1}
              max={12}
              value={targetRank}
              onChange={(event) => setTargetRank(Number(event.target.value))}
              className="mt-3 w-full accent-indigo-400"
            />
            <div className="mt-4 h-2 w-full rounded-full bg-slate-800">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400"
                style={{ width: `${Math.max(8, normalized * 100)}%` }}
              />
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="card card-wide card-top card-compact">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Calls</p>
              <p className="text-2xl font-semibold text-white">
                <AnimatedNumber value={calls} suffix="/mo" />
              </p>
              <p className="text-xs text-slate-400">Inbound intent</p>
            </div>
            <div className="card card-wide card-top card-compact">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Customers</p>
              <p className="text-2xl font-semibold text-white">
                <AnimatedNumber value={customers} suffix="/mo" />
              </p>
              <p className="text-xs text-slate-400">Projected wins</p>
            </div>
            <div className="card card-wide card-top card-compact sm:col-span-2">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Monthly revenue</p>
              <p className="text-3xl font-semibold text-emerald-300">
                $<AnimatedNumber value={revenue} />
              </p>
              <p className="text-xs text-slate-400">Forecasted upside</p>
            </div>
          </div>

          <div className="card card-wide card-top card-compact mt-6">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Revenue trajectory</p>
            <div className="mt-3 flex items-end gap-2">
              {chartPoints.map((point, index) => (
                <div key={index} className="h-24 w-8 rounded-full bg-gradient-to-t from-indigo-500/20 to-emerald-400/80" style={{ height: `${point * 3}px` }} />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <RevenueForecastPanel
            currentRank={12}
            targetRank={targetRank}
            avgOrderValue={260}
            conversionRate={0.26}
            ctrModel={{ 1: 0.25, 2: 0.17, 3: 0.12, 5: 0.08, 10: 0.03 }}
            gbpInsights={{ calls: 62, directions: 25, clicks: 340 }}
          />
          <div className="card card-wide card-top card-lg">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">ROI highlights</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-200">
              <li className="flex items-center justify-between">
                <span>Ranking lift ROI</span>
                <span className="text-emerald-300">+186%</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Payback window</span>
                <span className="text-emerald-300">28 days</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Missed revenue risk</span>
                <span className="text-rose-300">-$3.4k</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function CompetitorTrackerSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-24 py-24 border-t border-white/5">
      <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Competitor movement</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Track who is gaining on you</h2>
          <p className="mt-3 text-slate-400">
            Leaderboard updates show coverage, trend, and who is about to overtake you.
          </p>
        </div>
        <div className="card card-wide card-top card-lg overflow-x-auto">
          <div className="grid grid-cols-4 text-xs uppercase tracking-[0.3em] text-slate-400 min-w-[360px]">
            <span>Rank</span>
            <span>Business</span>
            <span>Coverage</span>
            <span>Trend</span>
          </div>
          <div className="mt-4 space-y-4 min-w-[360px]">
            {competitorRows.map((row) => (
              <div key={row.name} className="grid grid-cols-4 items-center text-sm text-slate-200">
                <span className="font-semibold">#{row.rank}</span>
                <span className={row.name === 'Your practice' ? 'text-emerald-300' : ''}>{row.name}</span>
                <div className="h-2 rounded-full bg-slate-800">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400"
                    style={{ width: `${row.coverage}%` }}
                  />
                </div>
                <span className={row.trend.startsWith('-') ? 'text-rose-300' : 'text-emerald-300'}>{row.trend}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CoreFeaturesSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-24 py-24 border-t border-white/5">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="text-center space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Features</p>
          <h2 className="text-3xl font-semibold text-white">Every signal you need to dominate locally</h2>
          <p className="text-slate-400">Each feature comes with a visual cue and actionable insight.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featureCards.map((feature) => (
            <div key={feature.title} className="card card-wide card-top card-lg group transition hover:-translate-y-1">
              <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${feature.accent} flex items-center justify-center text-white`}>
                {feature.icon}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{feature.body}</p>
              <div className="mt-4 rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-xs text-slate-300">
                <p className="uppercase tracking-[0.3em] text-slate-400">Preview</p>
                <div className="mt-3 h-16 rounded-xl bg-gradient-to-r from-slate-800 via-slate-900 to-slate-950 group-hover:from-indigo-500/20 group-hover:via-cyan-500/20 group-hover:to-emerald-500/20 transition" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-24 py-24 border-t border-white/5">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="text-center space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Social proof</p>
          <h2 className="text-3xl font-semibold text-white">Proof from high-performing teams</h2>
          <p className="text-slate-400">Real stories with measurable revenue wins.</p>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
          {testimonialCards.map((card) => (
            <div key={card.name} className="card card-wide card-top card-lg min-w-[280px] sm:min-w-[340px] snap-center">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400" />
                <div>
                  <p className="text-sm font-semibold text-white">{card.name}</p>
                  <p className="text-xs text-slate-400">{card.company}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1 text-amber-300">
                {Array.from({ length: 5 }).map((_, index) => (
                  <svg key={index} className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.1L12 17.5 6.4 20l1.1-6.1L3 9.6l6.2-.9L12 3z" stroke="currentColor" strokeWidth="2" />
                  </svg>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-200">"{card.quote}"</p>
              <ul className="mt-4 space-y-2 text-xs text-slate-300">
                {card.stats.map((stat) => (
                  <li key={stat} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-300" />
                    {stat}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function LandingFAQ() {
  return (
    <section className="px-4 sm:px-6 lg:px-24 py-24 border-t border-white/5">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-3">
          <p className="text-sm text-slate-400 uppercase tracking-[0.3em]">FAQ</p>
          <h2 className="text-3xl font-semibold text-white">Questions? We have answers.</h2>
        </div>
        <div className="space-y-4">
          {faqItems.map(item => (
            <details key={item.question} className="group rounded-2xl border border-white/10 bg-white/5 p-6">
              <summary className="flex cursor-pointer items-center justify-between text-lg font-semibold text-white">
                {item.question}
                <span className="text-sm text-slate-400 group-open:rotate-45 transition">+</span>
              </summary>
              <p className="mt-3 text-slate-400">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="px-4 sm:px-6 lg:px-24 py-24 border-t border-white/5">
      <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-10 text-center space-y-6">
        <h2 className="text-3xl font-semibold text-white">Start your free visibility scan</h2>
        <p className="text-slate-400">Results in 30 seconds. No credit card required.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#scan-section"
            className="btn"
          >
            <span>Start Free Scan</span>
          </Link>
          <Link href="/upgrade" className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3 font-semibold text-white hover:bg-white/10">
            See pricing
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-3 text-sm text-slate-300">
          <div className="card card-wide card-top card-compact">100 free scans per month</div>
          <div className="card card-wide card-top card-compact">No credit card required</div>
          <div className="card card-wide card-top card-compact">Instant demo report</div>
        </div>
        <div className="relative mx-auto h-24 max-w-md rounded-2xl border border-white/10 bg-white/5">
          <div className="absolute inset-0 bg-grid-animate opacity-30" />
          <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.7)]" />
        </div>
      </div>
    </section>
  )
}
