'use client'

import Link from 'next/link'

export default function BlogFooterCTA() {
  return (
    <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
      <p className="text-base text-white font-semibold">Run a free Google Maps visibility scan</p>
      <p className="text-sm text-slate-400">See your real ranking, calls, and revenue gaps in minutes.</p>
      <Link
        href="/free-scan"
        className="mt-4 inline-flex items-center justify-center rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
      >
        Run a free Google Maps visibility scan
      </Link>
    </div>
  )
}
