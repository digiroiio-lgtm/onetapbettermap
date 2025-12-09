'use client'

import { useEffect } from 'react'
import type { HeatmapCell } from '../types'

type Props = {
  cell: HeatmapCell | null
  onClose: () => void
}

const trendCopy: Record<HeatmapCell['trend'], string> = {
  up: 'Trending up',
  down: 'Trending down',
  flat: 'Holding steady',
}

export default function ZoneDetailPanel({ cell, onClose }: Props) {
  useEffect(() => {
    if (!cell) return undefined
    const handle = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [cell, onClose])

  if (!cell) return null

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/60" aria-hidden onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        className="relative ml-auto flex h-full w-full max-w-sm flex-col gap-6 overflow-y-auto bg-slate-950/95 p-6 shadow-2xl shadow-black"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Zone detail</p>
            <h3 className="text-2xl font-semibold text-white">{cell.areaLabel}</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close zone detail panel"
            className="rounded-full border border-slate-800 px-3 py-1 text-sm text-slate-400 hover:border-white/40"
          >
            Close
          </button>
        </div>

        <div className="space-y-3 rounded-2xl border border-slate-800/80 bg-slate-900/70 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">Current rank</p>
            <p className="text-lg font-semibold text-white">#{cell.rank}</p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Calls / mo</p>
              <p className="text-xl font-semibold text-white">{cell.estCallsPerMonth.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Revenue / mo</p>
              <p className="text-xl font-semibold text-emerald-300">${cell.estRevenuePerMonth.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {cell.isStrongest && (
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                Strongest area
              </span>
            )}
            {cell.isWeakest && (
              <span className="rounded-full bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-300">
                Weakest area
              </span>
            )}
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
              {trendCopy[cell.trend]}
            </span>
          </div>
        </div>

        <p className="text-sm text-slate-400">
          Deep-diving into this zone keeps the revenue loop tight—more calls mean more conversions, and more conversions mean higher recurring revenue.
        </p>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => {
              console.log('TODO: run focused scan for', cell.id)
            }}
            className="rounded-full border border-emerald-500/60 bg-emerald-500/10 px-4 py-3 text-center text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/20"
          >
            Run focused scan for this zone
          </button>
          <button
            type="button"
            onClick={() => {
              console.log('TODO: add recommended actions for', cell.id)
            }}
            className="rounded-full border border-white/30 px-4 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
          >
            Add recommended actions
          </button>
        </div>
      </div>
    </div>
  )
}
