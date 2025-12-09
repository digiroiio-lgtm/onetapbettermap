'use client'

import Link from 'next/link'

type Props = {
  currentPlan: string
  unlockPlan: string
  bullets: string[]
}

export default function PlanLockStrip({ currentPlan, unlockPlan, bullets }: Props) {
  return (
    <div className="space-y-3 rounded-2xl border border-amber-300/40 bg-amber-500/10 p-6 text-sm text-amber-100">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.4em] text-amber-200">
        <span>🔒 Locked on your current plan</span>
      </div>
      <p>
        You’re on <span className="font-semibold text-white">{currentPlan}</span>. Upgrade to{' '}
        <span className="font-semibold text-white">{unlockPlan}</span> to unlock:
      </p>
      <ul className="space-y-1 pl-4 text-sm">
        {bullets.map((bullet) => (
          <li key={bullet} className="list-disc text-amber-100">
            {bullet}
          </li>
        ))}
      </ul>
      <Link
        href={`/pricing?highlight=${unlockPlan.toLowerCase()}`}
        className="inline-flex items-center rounded-full border border-amber-300/70 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-amber-200 hover:bg-amber-300/10"
      >
        Upgrade to {unlockPlan}
      </Link>
    </div>
  )
}
