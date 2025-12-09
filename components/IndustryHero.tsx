'use client'

import Link from 'next/link'
import { useCallback } from 'react'

import { logAnalyticsEvent } from '@/lib/analytics/events'
import { useIndustry } from '@/components/IndustryProvider'
import type { IndustryKey } from '@/lib/industry/industryConfig'

const MAX_PAIN_POINTS = 3
const MAX_OUTCOMES = 3

export default function IndustryHero() {
  const { industries, selectedIndustry, selectIndustry } = useIndustry()

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
    <section className="px-4 sm:px-6 lg:px-24 pt-32 pb-16">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
        <div className="space-y-6">
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
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{selectedIndustry.hero.eyebrow}</p>
            <h1 className="text-4xl sm:text-5xl font-semibold leading-tight">{selectedIndustry.hero.headline}</h1>
            <p className="text-lg text-slate-300">{selectedIndustry.hero.subheadline}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={selectedIndustry.primaryCta.href}
              className="inline-flex items-center justify-center rounded-full bg-[#2563eb] px-8 py-3 text-base font-semibold text-white transition hover:bg-[#1d4ed8]"
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
          <p className="text-sm text-slate-400">{selectedIndustry.pricingBadge}</p>
        </div>

        <div className="space-y-6">
          <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
            {selectedIndustry.kpis.map((kpi) => (
              <div key={kpi.label} className="space-y-1">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{kpi.label}</p>
                <p className="text-2xl font-semibold text-white">{kpi.value}</p>
                {kpi.helper && <p className="text-xs text-slate-300">{kpi.helper}</p>}
              </div>
            ))}
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

          <div className="space-y-2 rounded-2xl border border-slate-700 bg-slate-900/70 p-4 text-sm text-slate-300">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Feature focus</p>
            <div className="flex flex-wrap gap-2">
              {selectedIndustry.featurePriority.map((feature) => (
                <span key={feature} className="rounded-full border border-slate-600 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-400">
                  {feature.replace(/-/g, ' ')}
                </span>
              ))}
            </div>
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
