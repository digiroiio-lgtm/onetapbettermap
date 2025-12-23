'use client'

import Link from 'next/link'
import AppGuard from '@/components/AppGuard'

export default function ProjectsPage() {
  return (
    <AppGuard>
      <main className="min-h-screen bg-[#020617] text-slate-100 px-4 py-16">
        <div className="mx-auto max-w-3xl space-y-6">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Projects</p>
          <h1 className="text-3xl font-semibold text-white">Your scans live here</h1>
          <p className="text-slate-400">
            We&apos;re rolling out project folders and scan history next. Start a new scan to generate your first project.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/app/new" className="btn w-fit">
              <span>New Map Scan</span>
            </Link>
            <Link href="/free-scan" className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">
              Use free scan
            </Link>
          </div>
        </div>
      </main>
    </AppGuard>
  )
}
