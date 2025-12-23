'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import AppGuard from '@/components/AppGuard'

export default function ProjectDetailPage() {
  const params = useParams()
  const projectId = typeof params?.id === 'string' ? params.id : 'project'

  return (
    <AppGuard>
      <main className="min-h-screen bg-[#020617] text-slate-100 px-4 py-16">
        <div className="mx-auto max-w-3xl space-y-6">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Project</p>
          <h1 className="text-3xl font-semibold text-white">Project {projectId}</h1>
          <p className="text-slate-400">
            Detailed project views (GeoGrid heatmap, competitor overlay, and exports) are wiring up next.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/app/new" className="btn w-fit">
              <span>Run another scan</span>
            </Link>
            <Link href="/app/projects" className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">
              Back to projects
            </Link>
          </div>
        </div>
      </main>
    </AppGuard>
  )
}
