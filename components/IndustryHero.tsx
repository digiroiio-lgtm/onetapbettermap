'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import ProductHeroVisual from '@/components/ProductHeroVisual'

import { logAnalyticsEvent } from '@/lib/analytics/events'
import { useIndustry } from '@/components/IndustryProvider'
import type { IndustryKey } from '@/lib/industry/industryConfig'

const MAX_PAIN_POINTS = 3
const MAX_OUTCOMES = 3

const trustBadges = [
  { label: '1,200+ businesses', detail: 'Active accounts' },
  { label: '4.8 star rating', detail: 'Verified reviews' },
  { label: '50K+ scans', detail: 'Monthly volume' },
]

const avatarStack = ['AP', 'ML', 'SK', 'JR', 'VA']
const rankSteps = [12, 9, 6, 3]

function IsometricCity() {
  return (
    <div className="relative h-40 w-full">
      <div className="absolute left-8 top-12 h-16 w-16 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 shadow-[0_20px_40px_rgba(2,6,23,0.5)] rotate-3" />
      <div className="absolute left-28 top-6 h-20 w-20 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 shadow-[0_20px_40px_rgba(2,6,23,0.5)] -rotate-2" />
      <div className="absolute right-10 top-10 h-16 w-16 rounded-2xl bg-gradient-to-br from-slate-600 to-slate-800 shadow-[0_20px_40px_rgba(2,6,23,0.5)] rotate-6" />
      <div className="absolute left-16 top-2 flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">
        <span className="inline-flex h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
        Live map grid
      </div>
      <div className="absolute right-16 top-2 flex items-center gap-2 rounded-full border border-indigo-400/40 bg-indigo-400/10 px-3 py-1 text-xs font-semibold text-indigo-200">
        <span className="inline-flex h-2 w-2 rounded-full bg-indigo-300 shadow-[0_0_12px_rgba(129,140,248,0.8)]" />
        49 points
      </div>
      <div className="absolute left-4 bottom-4 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-200">
        Coverage trend +18%
      </div>
    </div>
  )
}

export default function IndustryHero() {
  const { industries, selectedIndustry, selectIndustry } = useIndustry()
  const [rankIndex, setRankIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setRankIndex((prev) => (prev + 1) % rankSteps.length)
    }, 1800)
    return () => clearInterval(timer)
  }, [])

  const handlePrimaryCta = useCallback(() => {
    logAnalyticsEvent(`cta_click_${selectedIndustry.key}`, {
      industry: selectedIndustry.key,
      location: 'hero',
      plan: selectedIndustry.recommendedPlan,
    })
  }, [selectedIndustry])

  const handleSecondaryCta = useCallback(() => {
    logAnalyticsEvent(`cta_click_${selectedIndustry.key}`, {
      industry: selectedIndustry.key,
      location: 'hero-secondary',
      plan: selectedIndustry.recommendedPlan,
    })
  }, [selectedIndustry])

  return (
    <section className="relative overflow-hidden px-4 sm:px-6 lg:px-24 pt-28 pb-20">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1220] via-[#0f172a] to-[#0b1220]" />
      <div className="absolute inset-0 bg-grid-animate opacity-60" />
      <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.28),transparent_70%)] blur-2xl" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.25),transparent_70%)] blur-2xl" />

      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-7">
          <div className="hidden flex-wrap items-center gap-3 md:flex">
            {industries.map((industry) => (
              <button
                key={industry.key}
                type="button"
                onClick={() => selectIndustry(industry.key)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.4em] transition ${
                  industry.key === selectedIndustry.key
                    ? 'border-emerald-400 bg-emerald-600/10 text-emerald-200'
                    : 'border-slate-600 text-slate-400 hover:border-white hover:text-white'
                }`}
              >
                {industry.shortLabel}
              </button>
            ))}
          </div>
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{selectedIndustry.hero.eyebrow}</p>
            <h1 className="text-4xl sm:text-6xl font-semibold leading-tight">
              {selectedIndustry.hero.headline}
            </h1>
            <p className="text-lg text-slate-300">{selectedIndustry.hero.subheadline}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={selectedIndustry.primaryCta.href}
              className="inline-flex items-center justify-center rounded-full bg-[#2563eb] px-8 py-3 text-base font-semibold text-white transition hover:bg-[#1d4ed8] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:scale-[1.02]"
              onClick={handlePrimaryCta}
            >
              {selectedIndustry.primaryCta.text}
            </Link>
            {selectedIndustry.secondaryCta && (
              <Link
                href={selectedIndustry.secondaryCta.href}
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3 text-base font-semibold text-white transition hover:bg-white/10"
                onClick={handleSecondaryCta}
              >
                {selectedIndustry.secondaryCta.text}
              </Link>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300">
                <p className="font-semibold text-white">{badge.label}</p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">{badge.detail}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex -space-x-2">
              {avatarStack.map((initials, index) => (
                <div
                  key={initials}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-gradient-to-br from-slate-700 to-slate-900 text-xs font-semibold text-white"
                  style={{ zIndex: avatarStack.length - index }}
                >
                  {initials}
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-400">Teams switching from spreadsheets every day.</p>
          </div>
          <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Pain points</p>
              <ul className="mt-2 space-y-2 text-sm text-slate-300">
                {selectedIndustry.primaryPainPoints.slice(0, MAX_PAIN_POINTS).map((point) => (
                  <li key={point} className="list-disc pl-4">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Outcomes</p>
              <ul className="mt-2 space-y-2 text-sm text-slate-100">
                {selectedIndustry.primaryOutcomes.slice(0, MAX_OUTCOMES).map((outcome) => (
                  <li key={outcome} className="list-disc pl-4 text-emerald-200">
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-sm text-slate-400">{selectedIndustry.pricingBadge}</p>
        </div>

        <div className="relative">
          <IsometricCity />
          <div className="relative mt-6 rounded-[32px] border border-white/10 bg-white/5 p-4 backdrop-blur">
            <div className="absolute -top-6 left-6 rounded-2xl border border-indigo-400/40 bg-indigo-400/10 px-4 py-2 text-xs text-indigo-200 shadow-lg glow-pulse">
              <p className="text-[10px] uppercase tracking-[0.3em] text-indigo-200">Ranking lift</p>
              <div className="flex items-center gap-2 text-base font-semibold text-white">
                <span>#{rankSteps[rankIndex]}</span>
                <span className="text-indigo-300">→</span>
                <span className="text-emerald-300">#3</span>
              </div>
            </div>
            <div className="absolute -bottom-6 right-6 rounded-2xl border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-xs text-emerald-200 shadow-lg float-slow">
              <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-200">Revenue preview</p>
              <p className="text-sm font-semibold text-white">+$3,640 / month</p>
            </div>
            <ProductHeroVisual />
          </div>
          <div className="absolute -left-6 top-32 hidden rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-xs text-slate-200 shadow-lg lg:block float-slow">
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Visibility swing</p>
            <p className="text-sm font-semibold text-white">+32% zones covered</p>
          </div>
          <div className="absolute -right-4 top-10 hidden rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-xs text-slate-200 shadow-lg lg:block float-slow">
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Competitive alert</p>
            <p className="text-sm font-semibold text-white">BellaDent ↑ 2</p>
          </div>
        </div>
      </div>

      <div className="mt-8 lg:hidden">
        <label className="sr-only" htmlFor="industry-selector">
          Choose industry
        </label>
        <select
          id="industry-selector"
          value={selectedIndustry.key}
          onChange={(event) => selectIndustry(event.target.value as IndustryKey)}
          className="w-full rounded-2xl border border-slate-700 bg-slate-950/40 px-4 py-3 text-sm text-white"
        >
          {industries.map((industry) => (
            <option key={industry.key} value={industry.key}>
              {industry.label}
            </option>
          ))}
        </select>
      </div>
    </section>
  )
}
