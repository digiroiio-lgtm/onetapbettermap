import React from 'react'

import Link from 'next/link'

type Section = {
  title: string
  paragraphs: React.ReactNode[]
  list?: string[]
  subheadings?: { title: string; paragraphs: React.ReactNode[] }[]
}

type Props = {
  h1: string
  canonical: string
  intro?: string
  sections: Section[]
}

export default function UseCaseLayout({ h1, canonical, intro, sections }: Props) {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <article className="space-y-8">
          <header className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Use Case</p>
            <h1 className="text-3xl font-semibold leading-tight">{h1}</h1>
            {intro && <p className="text-slate-400">{intro}</p>}
          </header>

          {sections.map((section) => (
            <section key={section.title} className="space-y-4">
              <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              {section.paragraphs.map((paragraph, idx) => (
                <p key={`${section.title}-para-${idx}`} className="text-slate-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}
              {section.list && (
                <ul className="list-disc space-y-2 pl-5 text-slate-300">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {section.subheadings &&
                section.subheadings.map((subheading) => (
                  <div key={subheading.title} className="space-y-2">
                    <h3 className="text-lg font-semibold text-white">{subheading.title}</h3>
                    {subheading.paragraphs.map((para, idx) => (
                      <p key={`${subheading.title}-para-${idx}`} className="text-slate-300 leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                ))}
            </section>
          ))}

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 text-center space-y-2">
            <p className="text-base font-semibold text-white">Run a free Google Maps visibility scan</p>
            <p className="text-sm text-slate-400">See the zones, competitors, and revenue you may be missing.</p>
            <Link
              href="/free-scan"
              className="mt-3 inline-flex items-center justify-center rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Run a free Google Maps visibility scan
            </Link>
          </div>
        </article>
      </div>
    </main>
  )
}
