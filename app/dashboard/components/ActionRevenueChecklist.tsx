'use client'

import { useMemo, useState } from 'react'
import type { ActionItem, RevenueMetrics } from '../types'

type Props = {
  actions: ActionItem[]
  revenueMetrics: RevenueMetrics
  onActionClick: (actionId: string) => void
}

const statusPalette: Record<ActionItem['status'], string> = {
  todo: 'bg-slate-800 text-slate-200',
  in_progress: 'bg-amber-500/10 text-amber-300',
  done: 'bg-emerald-500/10 text-emerald-200',
}

const cycleStatus = (status: ActionItem['status']): ActionItem['status'] => {
  if (status === 'todo') return 'in_progress'
  if (status === 'in_progress') return 'done'
  return 'todo'
}

export default function ActionRevenueChecklist({ actions, revenueMetrics, onActionClick }: Props) {
  const [selectedActionId, setSelectedActionId] = useState(actions[0]?.id ?? null)
  const [optimisticStatus, setOptimisticStatus] = useState<Record<string, ActionItem['status']>>(() =>
    actions.reduce<Record<string, ActionItem['status']>>((acc, action) => {
      acc[action.id] = action.status
      return acc
    }, {}),
  )

  const selectedAction = useMemo(
    () => actions.find((action) => action.id === selectedActionId) ?? actions[0] ?? null,
    [actions, selectedActionId],
  )

  const explanationRank = Math.max(
    1,
    revenueMetrics.currentRank - Math.ceil(((selectedAction?.estScoreImpact ?? 0) || 1) / 1.1),
  )
  const estimatedCallsGain = Math.max(
    10,
    Math.round((selectedAction?.estRevenueImpact ?? 0) / 32),
  )

  const handleActionSelect = (action: ActionItem) => {
    setSelectedActionId(action.id)
    onActionClick(action.id)
  }

  const toggleStatus = (actionId: string) => {
    setOptimisticStatus((prev) => ({
      ...prev,
      [actionId]: cycleStatus(prev[actionId] ?? 'todo'),
    }))
  }

  return (
    <section
      id="action-checklist"
      className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6 text-slate-100 shadow-xl shadow-black/40"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">AI-prioritized steps</p>
          <h2 className="text-2xl font-semibold text-white">All linked to revenue</h2>
        </div>
        <p className="text-xs text-slate-400">✦  Kanban future: syncs with Google Sheets</p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="space-y-3">
          {actions.map((action) => {
            const isSelected = selectedAction?.id === action.id
            const status = optimisticStatus[action.id] ?? action.status
            return (
              <button
                key={action.id}
                onClick={() => handleActionSelect(action)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    handleActionSelect(action)
                  }
                }}
                className={`w-full rounded-2xl border px-4 py-4 text-left transition focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                  isSelected
                    ? 'border-emerald-500/60 bg-emerald-500/10'
                    : 'border-slate-800 bg-slate-900/70 hover:border-white/40'
                }`}
                aria-pressed={isSelected}
                type="button"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-white">{action.label}</p>
                  <span
                    onClick={(event) => {
                      event.stopPropagation()
                      toggleStatus(action.id)
                    }}
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusPalette[status]} transition`}
                  >
                    {status === 'todo' && 'To-do'}
                    {status === 'in_progress' && 'In progress'}
                    {status === 'done' && 'Done'}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-400">
                  <span className="rounded-full border border-slate-800 px-2 py-1">
                    +{action.estScoreImpact} pts visibility
                  </span>
                  <span className="rounded-full border border-slate-800 px-2 py-1 text-emerald-300">
                    ≈ ${action.estRevenueImpact.toLocaleString()} / month
                  </span>
                  <span className="rounded-full border border-slate-800 px-2 py-1">
                    Category: {action.category}
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-5 text-sm text-slate-300">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Revenue translation</p>
          <h3 className="mt-2 text-lg font-semibold text-white">{selectedAction?.label}</h3>
          <p className="mt-3">
            Completing this step helps you climb from rank #{revenueMetrics.currentRank} → #{explanationRank}, which
            adds ~{estimatedCallsGain} calls and ≈{' '}
            <span className="text-emerald-300 font-semibold">
              ${selectedAction?.estRevenueImpact.toLocaleString()}
            </span>{' '}
            / month.
          </p>
          <ul className="mt-4 space-y-2 text-xs text-slate-400">
            <li>• Aligns with revenue forecaster for rank #{explanationRank}</li>
            <li>• Works with your current plan to keep automation lean</li>
            <li>• TODO: push insights to Slack or your ops channel</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
