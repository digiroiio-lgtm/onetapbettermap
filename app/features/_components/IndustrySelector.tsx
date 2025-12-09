'use client'

import { useEffect, useMemo, useState } from 'react'

import { logAnalyticsEvent } from '@/lib/analytics/events'
import type { IndustryVariant } from '../types'

type Props = {
  featureName: string
  variants: IndustryVariant[]
}

export default function IndustrySelector({ featureName, variants }: Props) {
  const [selectedSlug, setSelectedSlug] = useState(variants[0].slug)

  const selected = useMemo(
    () => variants.find((variant) => variant.slug === selectedSlug) ?? variants[0],
    [selectedSlug, variants]
  )

  useEffect(() => {
    logAnalyticsEvent('industry_selected', {
      feature_name: featureName,
      industry: selected.slug,
      revenue_context: selected.revenueCopy,
    })
  }, [featureName, selected.revenueCopy, selected.slug])

  return (
    <div className="space-y-4 rounded-2xl border border-slate-700 bg-white/5 p-6 text-sm text-slate-200">
      <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Industry signals</p>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => (
          <button
            key={variant.slug}
            type="button"
            aria-pressed={variant.slug === selectedSlug}
            onClick={() => setSelectedSlug(variant.slug)}
            className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] transition ${
              variant.slug === selectedSlug
                ? 'border-emerald-400 bg-emerald-600/10 text-emerald-200'
                : 'border-slate-600 text-slate-400 hover:border-slate-200 hover:text-white'
            }`}
          >
            {variant.label}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        <p className="text-base font-semibold text-white">{selected.kpiHint}</p>
        <p className="text-sm text-emerald-300">{selected.revenueCopy}</p>
        <p className="text-xs text-slate-400">{selected.example}</p>
      </div>
    </div>
  )
}
