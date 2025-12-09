'use client'

import React from 'react'
import Link from 'next/link'

type Props = {
  title: string
  sections: { heading: string; copy: string[] }[]
  revenue: string
  quote: string
  ctaText: string
  features?: { name: string; reason: string; href?: string }[]
  plan?: { name: string; focus: string; link: string }
}

export default function CaseStudyLayout({ title, sections, revenue, quote, ctaText }: Props) {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-10 space-y-8">
        <article className="space-y-6">
          <header className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Case Study</p>
            <h1 className="text-3xl font-semibold leading-tight">{title}</h1>
          </header>

          {features && (
            <section className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-xl font-semibold text-white">Core features used</h2>
              <ul className="space-y-2 text-slate-300">
                {features.map((feature) => (
                  <li key={feature.name}>
                    <Link
                      href={feature.href ?? '/features/google-maps-rank-tracker'}
                      className="text-emerald-300 underline-offset-4 hover:underline"
                    >
                      {feature.name}
                    </Link>{' '}
                    — {feature.reason}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {plan && (
            <section className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-xl font-semibold text-white">Plan that unlocked the growth</h2>
              <p className="text-slate-300">
                {plan.name}: {plan.focus}
              </p>
              <Link
                href={plan.link}
                className="inline-flex items-center rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                {plan.name} plan details
              </Link>
            </section>
          )}

          {sections.map((section) => (
            <section key={section.heading} className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-xl font-semibold text-white">{section.heading}</h2>
              {section.copy.map((paragraph) => (
                <p key={paragraph} className="text-slate-300">{paragraph}</p>
              ))}
            </section>
          ))}

          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-5 text-slate-100 space-y-2">
            <p className="text-sm font-semibold text-white uppercase tracking-[0.3em]">Revenue impact</p>
            <p className="text-lg font-semibold text-white">{revenue}</p>
          </div>

          <blockquote className="rounded-2xl border border-white/10 bg-white/10 p-5 text-slate-300 italic">
            “{quote}”
          </blockquote>

          <div className="text-center">
            <Link
              href="/free-scan"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              {ctaText}
            </Link>
          </div>
        </article>
      </div>
    </main>
  )
}
