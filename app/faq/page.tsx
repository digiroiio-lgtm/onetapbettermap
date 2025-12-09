import Link from 'next/link'
import { faqSections } from './faqContent'

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-100">
      <div className="mx-auto max-w-5xl space-y-12 px-4 py-16">
        <header className="space-y-3 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">FAQ</p>
          <h1 className="text-3xl font-semibold text-white">
            We took a deep dive into your questions so you can move faster.
          </h1>
          <p className="text-base text-slate-300">
            Browse answers about scans, plans, integrations, and how we prove the money your rankings are costing you.
          </p>
        </header>

        {faqSections.map((section) => (
          <section
            key={section.title}
            className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl"
          >
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Section</p>
              <div className="flex flex-wrap items-end gap-2">
                <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
                <span className="text-sm text-slate-400">{section.subtitle}</span>
              </div>
            </div>
            <div className="space-y-3">
              {section.items.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-2xl border border-white/10 bg-slate-900/80 p-4"
                >
                  <summary className="flex cursor-pointer items-center justify-between text-lg font-semibold text-white">
                    {item.question}
                    <span className="text-sm text-slate-400 transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-slate-300 leading-relaxed">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        ))}

        <section className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-center shadow-xl">
          <p className="text-xs uppercase tracking-[0.35em] text-emerald-100">Need to chat?</p>
          <h3 className="mt-3 text-2xl font-semibold text-white">We answer every message within 2 business hours.</h3>
          <p className="mt-2 text-sm text-emerald-100">
            Tap an expert for onboarding, integrations, or partnership ideas.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/support"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Browse support resources
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100"
            >
              Contact MapsRankChecker
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
