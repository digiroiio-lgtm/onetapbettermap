import Link from 'next/link'
import AbstractProcessCard from '@/components/AbstractProcessCard'
import RevenueForecastPanel from '@/components/RevenueForecastPanel'
import IndustryHero from '@/components/IndustryHero'
import ProductHeroVisual from '@/components/ProductHeroVisual'
import DashboardDemoVisual from '@/components/DashboardDemoVisual'
import FreeScanForm from '@/components/FreeScanForm'
import { faqItems } from './faq/faqContent'

const socialProofStats = [
  { value: '1,200+', label: 'Active businesses' },
  { value: '50K+', label: 'Monthly scans' },
  { value: '4.8★', label: 'Average rating' },
]

const socialProofBadges = [
  { icon: '🦷', label: 'Dentists', count: '240+', active: true },
  { icon: '🍽️', label: 'Restaurants', count: '380+' },
  { icon: '🏥', label: 'Medical Clinics', count: '190+' },
  { icon: '🏡', label: 'Real Estate', count: '280+' },
  { icon: '⚖️', label: 'Law Firms', count: '110+' },
  { icon: '💇', label: 'Salons & Spas', count: '95+' },
  { icon: '🔧', label: 'Auto Services', count: '85+' },
  { icon: '💪', label: 'Gyms & Fitness', count: '70+' },
]

const problemCards = [
  {
    title: 'Your Real Position',
    body: 'See exactly where revenue is strongest — and where it disappears.',
    icon: (
      <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#eff6ff" />
        <path d="M12 6v6l4 2" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Competitor Movement',
    body: 'Spot rising competitors before they take your calls and customers.',
    icon: (
      <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="3" y="12" width="6" height="8" fill="#d1fae5" />
        <rect x="9" y="8" width="6" height="12" fill="#34d399" />
        <rect x="15" y="4" width="6" height="16" fill="#10b981" />
      </svg>
    ),
  },
  {
    title: 'Fixable Gaps',
    body: 'Know which visibility gaps are blocking revenue — and how to remove them.',
    icon: (
      <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="4" y="4" width="16" height="16" rx="4" fill="#fef3c7" />
        <path d="M8 12l2 2 4-4" stroke="#f59e42" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

const howItWorks = [
  {
    label: 'Step 1',
    title: 'Enter your business',
    body: 'Find your Google Business Profile and service area.',
    icon: (
      <svg className="w-10 h-10 mx-auto text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="4" width="16" height="16" rx="4" fill="#e0e7ff" />
        <path d="M8 12h8M12 8v8" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Step 2',
    title: 'Detect revenue leaks',
    body: 'GeoGrid reveals where customers see competitors instead of you.',
    icon: (
      <svg className="w-10 h-10 mx-auto text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" fill="#fef3c7" />
        <path d="M8 12l2 2 4-4" stroke="#f59e42" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Step 3',
    title: 'Fix only what moves revenue',
    body: 'AI prioritizes actions tied directly to ranking and income impact.',
    icon: (
      <svg className="w-10 h-10 mx-auto text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="4" width="16" height="16" rx="4" fill="#d1fae5" />
        <path d="M8 12h8" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
]

type CoreFeature = {
  title: string
  body: string
  subtext?: string
  icon?: string
}

const coreFeatures: CoreFeature[] = [
  {
    title: 'Visibility Score',
    body: 'A single number that reflects how dominant — or invisible — you are across your entire market.',
  },
  {
    title: 'Multi-Area Heatmaps',
    body: 'Drag-and-drop grids that reveal hot spots, weak zones, and where to expand next.',
  },
  {
    title: 'Keyword Position Tracking',
    body: 'Monitor the exact keywords customers search and how you rank for each one.',
  },
  {
    title: 'AI Action Checklist',
    body: 'Guided fixes prioritized by impact so teams always know what to do next.',
  },
  {
    title: 'Revenue Forecaster',
    body: 'See how many calls, visits, and customers you unlock before you climb.',
    subtext: 'Powered by CTR + conversion benchmarks.',
  },
  {
    title: 'Competitor Alerts & Auto Reports',
    body: 'Get notified when rivals overtake you and ship branded reports in one click.',
  },
]

const retentionHighlights = [
  { label: 'Daily Monitoring', body: 'Auto-tracking for rank changes, coverage gaps, and health score in every location.' },
  { label: 'Smart Alerts', body: 'Instant alerts for competitor jumps, opportunity keywords, and zones trending down.' },
]

const demoTimeline = [
  { name: 'BellaDent Clinic', rank: '#3', change: '+3 this week', coverage: '41/49 zones' },
  { name: 'WhiteSmile Antalya', rank: '#11', change: '-1 this week', coverage: '32/49 zones' },
  { name: 'Elite Dental Center', rank: '#16', change: '+1 this week', coverage: '24/49 zones' },
]

const socialProofLogos = ['SmileWorks', 'Radiant Dental', 'Urban Realty', 'ClinicOne', 'Coastal MedSpa']

const testimonials = [
  {
    quote:
      'We replaced six spreadsheets with one dashboard. Ops team sees every rank change and fixes issues the same day.',
    author: 'Dr. Alina Perez, SmileWorks',
  },
  {
    quote:
      'Revenue Forecaster convinced finance to fund SEO. We know exactly what moving from #8 to #3 is worth.',
    author: 'Marcus Li, Urban Realty Group',
  },
]

export default function HomePage() {
  return (
    <div className="bg-[#020617] text-slate-100 font-sans">
      <main>
        <IndustryHero />
        <section className="px-4 sm:px-6 lg:px-24 pb-16">
          <ProductHeroVisual />
        </section>
        <SocialProofStrip />
        <ProblemSolution />
        <FreeScanForm />
        <DemoExperienceSection />
        <HowItWorksSection />
        <CoreFeaturesSection />
        <RetentionSection />
        <SocialProofSpotlight />
        <LandingFAQ />
        <FinalCTA />
      </main>
    </div>
  )
}


function SocialProofStrip() {
  return (
    <section className="px-4 sm:px-6 lg:px-24 pb-20">
      <div className="max-w-6xl mx-auto space-y-10 text-center">
        <div className="grid sm:grid-cols-3 gap-6">
          {socialProofStats.map(stat => (
            <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 py-6 px-4 space-y-2">
              <p className="text-4xl font-semibold text-white">{stat.value}</p>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="space-y-6">
          <p className="text-sm text-slate-400 uppercase tracking-[0.3em]">
            1,200+ businesses actively recovering lost revenue with MapsRankChecker
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {socialProofBadges.map(badge => (
              <div
                key={badge.label}
                className={`rounded-2xl border px-4 py-5 flex flex-col items-center gap-2 text-sm transition ${
                  badge.active ? 'border-[#3b82f6] bg-[#1d4ed8]/10' : 'border-white/10 bg-white/5 hover:border-white/30'
                }`}
              >
                <span className="text-3xl" aria-hidden>{badge.icon}</span>
                <p className="text-white font-semibold">{badge.label}</p>
                <span className="text-xs text-slate-400">{badge.count}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500">
            Phase 2 adds the interactive testimonial carousel tied to each industry.
          </p>
        </div>
      </div>
    </section>
  )
}

function ProblemSolution() {
  return (
    <section id="features" className="px-4 sm:px-6 lg:px-24 py-20 border-t border-white/5">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <p className="text-sm text-slate-400 uppercase tracking-[0.3em]">Problem → Solution</p>
          <h2 className="text-3xl font-semibold">
            Your customers are choosing competitors —
            <br />
            and you’re losing revenue without realizing it.
          </h2>
          <p className="text-slate-400 leading-relaxed">
            Google Maps rankings change every few blocks.
            Most businesses only see one version of the results — and miss where customers are actually finding competitors instead.
            MapsRankChecker reveals the full picture so you can stop revenue leaks early.
          </p>
        </div>
        <div className="grid gap-6">
          {problemCards.map(card => (
            <div key={card.title} className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition">
              <div className="mb-4">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
              <p className="text-slate-300">{card.body}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-start">
          <Link
            href="#scan-now"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
          >
            Scan Now
          </Link>
        </div>
      </div>
    </section>
  )
}

import React, { useState, useEffect } from 'react';

function HowItWorksSection() {
  const [active, setActive] = useState(0);
  // Otomatik ilerleyen adım vurgusu
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % howItWorks.length);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="px-4 sm:px-6 lg:px-24 py-20 border-t border-white/5">
      <div className="grid md:grid-cols-3 gap-10 text-center">
        {howItWorks.map((step, i) => (
          <div
            key={step.title}
            className={`relative space-y-3 transition-all duration-500 cursor-pointer group ${
              active === i
                ? 'scale-105 shadow-2xl z-10 bg-slate-900/80 border border-blue-500/30'
                : 'opacity-70 hover:scale-102 hover:z-10 hover:bg-slate-900/60 hover:border hover:border-blue-500/10'
            } rounded-2xl p-8`}
            onMouseEnter={() => setActive(i)}
          >
            <div className="flex justify-center mb-2">{step.icon}</div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">{step.label}</p>
            <h3 className="text-2xl font-semibold text-white">{step.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{step.body}</p>
            {active === i && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-2 bg-gradient-to-r from-blue-400/60 via-emerald-400/60 to-amber-400/60 rounded-full blur-sm animate-pulse" />
            )}
          </div>
        ))}
      </div>
    </section>
    <div className="flex justify-center py-12">
      <AbstractProcessCard />
    </div>
  );
}


function DemoExperienceSection() {
  return (
    <section id="demo-experience" className="px-4 sm:px-6 lg:px-24 py-24 border-t border-white/5">
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Interactive Demo</p>
          <h2 className="text-3xl font-semibold text-white">See the entire revenue recovery loop in one dashboard</h2>
          <p className="text-slate-400">
            Visibility scores, GeoGrid coverage, competitor movement, and revenue forecasting — all working together.
          </p>
        </div>
      <div className="mt-12 grid lg:grid-cols-[1.1fr_0.9fr] gap-10">
        <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-4">
          <DashboardDemoVisual />
        </div>
        <div className="space-y-6">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Revenue Forecast preview</p>
            <h3 className="text-xl font-semibold text-white">See what every rank position is worth</h3>
            <p className="text-sm text-slate-400">This is why rankings matter — because each position has a dollar value.</p>
            <RevenueForecastPanel
              currentRank={12}
              targetRank={3}
              avgOrderValue={260}
              conversionRate={0.26}
              ctrModel={{ 1: 0.25, 2: 0.17, 3: 0.12, 5: 0.08, 10: 0.03 }}
              gbpInsights={{ calls: 62, directions: 25, clicks: 340 }}
            />
          </div>
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 space-y-4">
            <p className="text-sm text-slate-400 uppercase tracking-[0.3em]">How you recover lost revenue</p>
            <ul className="space-y-3 text-sm text-slate-300 text-left">
              <li>
                <span className="font-semibold">Instant heatmap & coverage score</span>
                <br />
                <span className="text-xs text-slate-400">Know which zones generate calls — and which don’t.</span>
              </li>
              <li>
                <span className="font-semibold">Competitor movement & smart alerts</span>
                <br />
                <span className="text-xs text-slate-400">Catch revenue threats the moment rankings shift.</span>
              </li>
              <li>
                <span className="font-semibold">Revenue projections at every rank</span>
                <br />
                <span className="text-xs text-slate-400">Decide actions based on money, not vanity metrics.</span>
              </li>
            </ul>
            <Link
              href="#scan-now"
              className="inline-flex items-center justify-center rounded-full bg-[#2563eb] text-white px-6 py-3 text-sm font-semibold transition hover:bg-[#1d4ed8]"
            >
              Run Your Own Scan →
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-10 text-center">
        <Link href="/results?businessName=Demo%20Business&city=London&keyword=dentist%20near%20me" className="text-sm text-white/70 hover:text-white underline underline-offset-4">
          See full forecast →
        </Link>
      </div>
    </section>
  )
}

function CoreFeaturesSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-24 py-24 border-t border-white/5">
      <div className="grid md:grid-cols-3 gap-8">
        {coreFeatures.map(feature => (
          <div key={feature.title} className="rounded-3xl bg-white/5 border border-white/10 p-8 space-y-4">
            <h3 className="text-2xl font-semibold text-white">{feature.title}</h3>
            <p className="text-slate-400">{feature.body}</p>
            {feature.subtext ? <p className="text-sm text-slate-500">{feature.subtext}</p> : null}
          </div>
        ))}
      </div>
    </section>
  )
}

function RetentionSection() {
  return (
    <section className="max-w-3xl mx-auto my-16 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl p-10 text-center border border-white/10">
      <div className="space-y-8">
        <div className="space-y-3">
          <p className="text-sm text-slate-400 uppercase tracking-[0.3em]">Retention</p>
          <h2 className="text-3xl font-semibold text-white">Designed to stop revenue leaks — every day</h2>
          <p className="text-slate-300 text-base">
            Automatic monitoring, alerts, and benchmarks ensure ranking drops never turn into silent revenue loss.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          {retentionHighlights.map(item => (
            <div key={item.label} className="flex-1 min-w-[220px] rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900/80 shadow-lg p-7 border border-emerald-500/10 flex flex-col items-center justify-center">
              <span className="mb-2 inline-block rounded-full bg-emerald-500/10 px-4 py-1 text-xs font-semibold text-emerald-300 tracking-wider uppercase">
                {item.label}
              </span>
              <span className="text-white text-lg font-semibold leading-snug">
                {item.body}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SocialProofSpotlight() {
  return (
    <section className="px-4 sm:px-6 lg:px-24 py-24 border-t border-white/5">
      <div className="space-y-6 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Social Proof</p>
        <h2 className="text-3xl font-semibold text-white">1,200+ businesses trust MapsRankChecker.</h2>
        <p className="text-slate-400">Dentists, medspas, real estate teams, and agencies rely on our GeoGrid engine.</p>
        <p className="text-xs text-slate-500">Real businesses. Real visibility. Real recovered revenue.</p>
      </div>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-xs uppercase tracking-[0.3em] text-slate-500">
        {socialProofLogos.map(logo => (
          <span key={logo} className="px-4 py-2 rounded-full border border-white/10">
            {logo}
          </span>
        ))}
      </div>
      <div className="mt-10 grid md:grid-cols-2 gap-6">
        {testimonials.map(testimonial => (
          <div key={testimonial.author} className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-3">
            <p className="text-lg text-white leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
            <p className="text-sm text-slate-400">{testimonial.author}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link href="/upgrade" className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">
          Join them →
        </Link>
      </div>
    </section>
  )
}

function LandingFAQ() {
  return (
    <section className="px-4 sm:px-6 lg:px-24 py-24 border-t border-white/5">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-3">
          <p className="text-sm text-slate-400 uppercase tracking-[0.3em]">FAQ</p>
          <h2 className="text-3xl font-semibold text-white">Questions? We’ve got answers.</h2>
        </div>
        <div className="space-y-4">
          {faqItems.map(item => (
            <details key={item.question} className="group rounded-2xl border border-white/10 bg-white/5 p-6">
              <summary className="flex cursor-pointer items-center justify-between text-lg font-semibold text-white">
                {item.question}
                <span className="text-sm text-slate-400 group-open:rotate-45 transition">+</span>
              </summary>
              <p className="mt-3 text-slate-400">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="px-4 sm:px-6 lg:px-24 py-24 border-t border-white/5 text-center space-y-5">
      <h2 className="text-3xl font-semibold text-white">Ready to see how much money your rankings are costing you?</h2>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="#scan-now"
          className="inline-flex items-center justify-center rounded-full bg-[#2563eb] text-white px-8 py-3 font-semibold hover:bg-[#1d4ed8] transition"
        >
          Start Free Scan →
        </Link>
        <Link href="/upgrade" className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3 font-semibold text-white hover:bg-white/10">
          See pricing →
        </Link>
      </div>
      <p className="text-sm text-slate-400">✓ 100 free scans/month • No credit card • Cancel anytime</p>
    </section>
  )
}
