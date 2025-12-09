'use client'

import Link from 'next/link'
import { useState } from 'react'

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Start learning your visibility',
    bullets: ['100 scans / month', '1 business profile', '1 keyword zone', 'Basic grid depth'],
    cta: 'Run Free Scan',
    badge: null,
    highlight: false,
  },
  {
    name: 'Starter',
    price: '$29 / mo',
    description: 'Essential tracking for single locations',
    bullets: ['50 scans / month', '1 business profile', '5 keywords', '5 competitors', 'Basic grid depth'],
    cta: 'Start Tracking',
    badge: null,
    highlight: false,
  },
  {
    name: 'Growth',
    price: '$79 / mo',
    description: 'Best for growing teams & agencies',
    bullets: [
      '500 scans / month',
      '5 business profiles',
      'Unlimited keywords',
      '10 competitors',
      'Advanced grid depth',
      'Visibility score & timeline',
      'Team access',
    ],
    cta: 'GROW MY VISIBILITY',
    badge: '⭐ MOST POPULAR',
    highlight: true,
  },
  {
    name: 'Scale',
    price: '$199 / mo',
    description: 'Built for agencies & multi-location brands',
    bullets: [
      '20k+ scans / month',
      '50 business profiles',
      'Unlimited keywords',
      '20+ competitors',
      'Pro grid depth',
      'White-label reporting',
      'Multi-location dashboard',
      'Priority support',
    ],
    cta: 'Step Up to Scale',
    badge: null,
    highlight: false,
  },
]

const mobileAccordions = [
  {
    title: 'Starter',
    price: '$29 / mo',
    description: ['50 scans / month', '1 business profile', '5 keywords', '5 competitors'],
    cta: 'Start Tracking',
  },
  {
    title: 'Scale',
    price: '$199 / mo',
    description: ['20k+ scans', 'Multi-location dashboard', 'White-label reporting', 'Priority support'],
    cta: 'Step Up to Scale',
  },
  {
    title: 'Free',
    price: '$0',
    description: ['100 scans', '1 profile'],
    cta: 'Run Free Scan',
  },
]

export default function PricingPage() {
  const [openAccordion, setOpenAccordion] = useState<string | null>('Growth')

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-16">
        <header className="text-center space-y-4">
          <p className="text-sm tracking-[0.4em] text-slate-500">PRICING</p>
          <h1 className="text-4xl font-semibold text-white">Simple plans. Real visibility growth.</h1>
          <p className="text-slate-400">
            Choose the plan that fits your business today — upgrade anytime as you grow.
          </p>
        </header>

        <section className="hidden lg:grid grid-cols-4 gap-6">
          {plans.map(plan => (
            <div
              key={plan.name}
              className={`rounded-[28px] border p-8 space-y-6 ${
                plan.highlight
                  ? 'bg-white/10 border-white/30 shadow-2xl scale-[1.03]'
                  : 'bg-white/5 border-white/10'
              }`}
            >
              {plan.badge && (
                <div className="text-xs uppercase tracking-[0.3em] text-amber-300 text-center">{plan.badge}</div>
              )}
              <div>
                <p className="text-2xl font-semibold text-white">{plan.name}</p>
                <p className="text-xl text-slate-300">{plan.price}</p>
              </div>
              <p className="text-sm text-slate-400">{plan.description}</p>
              <ul className="space-y-2 text-sm text-slate-200">
                {plan.bullets.map(item => (
                  <li key={item} className="flex items-center gap-2">
                    <span>•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.name === 'Free' ? '/#scan-section' : '/signup'}
                className={`block w-full text-center rounded-full px-4 py-2 font-semibold ${
                  plan.highlight
                    ? 'bg-white text-black hover:bg-white/90'
                    : 'border border-white/20 hover:bg-white/10'
                }`}
              >
                {plan.cta}
              </Link>
              {plan.highlight ? (
                <p className="text-xs text-white text-center">Most teams upgrade here after week 1</p>
              ) : (
                <p className="text-xs text-slate-500">
                  {plan.name === 'Scale'
                    ? 'Built for agencies & multi-location brands'
                    : plan.name === 'Starter'
                    ? 'Best for solopreneurs starting out'
                    : plan.name === 'Free'
                    ? 'Perfect for trying MapsRankChecker'
                    : ''}
                </p>
              )}
            </div>
          ))}
        </section>

        <section className="lg:hidden space-y-4">
          <div className="rounded-[28px] border border-white/30 bg-white/10 p-8 space-y-4">
            <div className="text-xs uppercase tracking-[0.3em] text-amber-300">⭐ Most Popular</div>
            <p className="text-3xl font-semibold text-white">Growth</p>
            <p className="text-xl text-slate-300">$79 / mo</p>
            <ul className="space-y-2 text-sm text-slate-200">
              {plans[2].bullets.map(item => (
                <li key={item} className="flex items-center gap-2">
                  <span>•</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/signup"
              className="block text-center rounded-full bg-white text-black font-semibold py-3"
            >
              GROW
            </Link>
            <p className="text-xs text-white text-center">Most teams upgrade here</p>
          </div>
          {mobileAccordions.map(accordion => (
            <div key={accordion.title} className="border border-white/10 rounded-2xl bg-white/5">
              <button
                className="w-full flex items-center justify-between px-4 py-3 text-left text-white"
                onClick={() => setOpenAccordion(prev => (prev === accordion.title ? null : accordion.title))}
              >
                <span className="font-semibold">{accordion.title}</span>
                <span>{openAccordion === accordion.title ? '−' : '+'}</span>
              </button>
              {openAccordion === accordion.title && (
                <div className="px-4 pb-4 space-y-2 text-sm text-slate-300">
                  <p className="text-lg text-white">{accordion.price}</p>
                  <ul className="space-y-1">
                    {accordion.description.map(detail => (
                      <li key={detail} className="flex items-center gap-2">
                        <span>•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={accordion.title === 'Free' ? '/#scan-section' : '/signup'}
                    className="block text-center rounded-full border border-white/20 px-4 py-2 font-semibold text-white hover:bg-white/10"
                  >
                    {accordion.cta}
                  </Link>
                </div>
              )}
            </div>
          ))}
        </section>

        <section className="rounded-[28px] border border-white/10 bg-white/5 p-6 overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-200">
            <thead>
              <tr className="text-slate-400">
                <th className="px-4 py-3 font-semibold">Feature</th>
                <th className="px-4 py-3 font-semibold">Starter</th>
                <th className="px-4 py-3 font-semibold">Growth</th>
                <th className="px-4 py-3 font-semibold">Scale</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-white/10">
                <td className="px-4 py-4 font-semibold text-white">Revenue Forecasting</td>
                <td className="px-4 py-4 text-emerald-300 font-semibold">Full</td>
                <td className="px-4 py-4 text-emerald-300 font-semibold">Full</td>
                <td className="px-4 py-4 text-emerald-300 font-semibold">Full</td>
              </tr>
            </tbody>
          </table>
        </section>

        <p className="text-center text-sm text-slate-400">
          <span className="font-semibold text-[#3b82f6]">NEW · Revenue Forecaster</span> — Included in every plan
        </p>

        <section className="rounded-[28px] border border-white/10 bg-white/5 p-8 space-y-4 text-center">
          <p className="text-sm text-slate-400">Need more power?</p>
          <h3 className="text-2xl font-semibold text-white">DOMINANCE — Enterprise Grade</h3>
          <p className="text-slate-400">
            30k+ scans • Unlimited locations • API access & SLA • Custom exports & reporting
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            Talk to Sales
          </Link>
        </section>
      </div>
    </main>
  )
}
