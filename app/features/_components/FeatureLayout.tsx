import IndustrySelector from './IndustrySelector'
import Link from 'next/link'
import React from 'react'
import { IndustryVariant } from '../types'
import PlanLockStrip from './PlanLockStrip'

type InlineCta = {
  text: string
  href: string
}

type MiniKPI = {
  label: string
  value: string
  detail: string
}

type Section = {
  title: string
  paragraphs: React.ReactNode[]
  subheadings?: { title: string; paragraphs: React.ReactNode[] }[]
  inlineCta?: InlineCta
}

type PlanLock = {
  currentPlan: string
  unlockPlan: string
  bullets: string[]
}

type Props = {
  h1: string
  intro?: string
  sections: Section[]
  heroKpi: string
  miniKpis: MiniKPI[]
  revenueHook: string
  finalCta: InlineCta
  planLock: PlanLock
  industryVariants?: IndustryVariant[]
  featureName: string
}

export default function FeatureLayout({
  h1,
  intro,
  sections,
  heroKpi,
  miniKpis,
  revenueHook,
  finalCta,
}: Props) {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-100">
      <div className="mx-auto max-w-5xl px-4 py-10 space-y-8">
        <article className="space-y-8">
          <header className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Feature</p>
            <h1 className="text-3xl font-semibold leading-tight">{h1}</h1>
            {intro && <p className="text-slate-400">{intro}</p>}
          </header>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-slate-400">Hero KPI</p>
            <p className="text-lg font-semibold text-white">{heroKpi}</p>
          </div>

          <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:grid-cols-3">
            {miniKpis.map((mini) => (
              <div key={mini.label} className="space-y-1 rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
                <p className="text-slate-400">{mini.label}</p>
                <p className="text-xl font-semibold text-white">{mini.value}</p>
                <p className="text-xs text-slate-300">{mini.detail}</p>
              </div>
            ))}
          </div>

          {industryVariants && industryVariants.length > 0 && (
            <IndustrySelector featureName={featureName} variants={industryVariants} />
          )}

          {sections.map((section) => (
            <section key={section.title} className="space-y-4">
              <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              {section.paragraphs.map((paragraph, idx) => (
                <p key={`${section.title}-${idx}`} className="text-slate-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}
              {section.subheadings?.map((subheading) => (
                <div key={subheading.title} className="space-y-3 pl-3">
                  <h3 className="text-lg font-semibold text-white">{subheading.title}</h3>
                  {subheading.paragraphs.map((paragraph, idx) => (
                    <p key={`${subheading.title}-${idx}`} className="text-slate-300 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
              {section.inlineCta && (
                <Link
                  href={section.inlineCta.href}
                  className="inline-flex items-center rounded-full border border-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-300 hover:bg-emerald-500/10"
                >
                  {section.inlineCta.text}
                </Link>
              )}
            </section>
          ))}

          <PlanLockStrip {...planLock} />
          <p className="text-sm text-slate-300">{revenueHook}</p>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center space-y-2">
            <p className="text-base font-semibold text-white">{finalCta.text}</p>
            <Link
              href={finalCta.href}
              className="mt-3 inline-flex items-center justify-center rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              {finalCta.text}
            </Link>
          </div>
        </article>
      </div>
    </main>
  )
}
