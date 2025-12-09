import Link from 'next/link'
import RevenueImpactCard from '@/components/RevenueImpactCard'
import RevenueForecastPanel from '@/components/RevenueForecastPanel'
import BlurredRevenuePreview from '@/components/BlurredRevenuePreview'

const socialProofIcons = ['Dentists', 'Clinics', 'Restaurants', 'Real Estate', 'Agencies']

const problemCards = [
  {
    title: 'Your Real Position',
    body: '49-grid heatmap reveals where you win and where you disappear.',
  },
  {
    title: 'Competitor Movement',
    body: 'See rising competitors and stop losing spots without noticing.',
  },
  {
    title: 'Fixable Gaps',
    body: 'We show exactly what’s blocking your local visibility.',
  },
]

const howItWorks = [
  { label: 'Step 1', title: 'Enter your business', body: 'Search your Google Business Profile or paste your name + city.' },
  { label: 'Step 2', title: 'Run your scan', body: 'Get instant heatmap, visibility score, and keyword positions.' },
  { label: 'Step 3', title: 'Follow your plan', body: 'Use the AI-powered checklist to close your ranking gaps.' },
]

type CoreFeature = {
  title: string
  body: string
  subtext?: string
  icon?: string
}

const coreFeatures: CoreFeature[] = [
  {
    title: 'Full Visibility Score',
    body: 'A single score that summarizes your real map exposure in every direction.',
  },
  {
    title: 'Multi-Area Heatmaps',
    body: 'See how your rank shifts as customers move across neighborhoods.',
  },
  {
    title: 'AI Action Checklist',
    body: 'Personalized, prioritized steps to improve your ranking — without guesswork.',
  },
  {
    title: 'Revenue Intelligence',
    body: 'Predict how many calls, visits, and customers you gain by improving your map ranking.',
    subtext: 'Built on real CTR + conversion benchmarks.',
    icon: '💹',
  },
]

const retentionHighlights = [
  { label: 'Daily Rank Changes', body: 'See how your visibility shifts day by day.' },
  { label: 'Competitor Movements', body: 'Get alerted when competitors gain ground near you.' },
  { label: 'Opportunity Alerts', body: 'Discover low-competition keywords and nearby gaps you can own.' },
  { label: 'Health Score', body: 'Monitor profile completeness, reviews, posting, and citations in one place.' },
]

const faqItems = [
  {
    question: 'Will MapsRankChecker actually improve my Google Maps ranking?',
    answer:
      'Yes. We show your real ranking footprint, prioritize what’s blocking you, and provide clear fixes so you can act immediately.',
  },
  {
    question: 'Do I need SEO experience to use it?',
    answer:
      'No. The platform translates complex local SEO signals into a simple score and guided tasks anyone can follow.',
  },
  {
    question: 'Do I need access to my Google account?',
    answer:
      'You can start scans without connecting anything. Connect later if you want automated tracking, alerts, or reporting.',
  },
  {
    question: 'How accurate are the scans?',
    answer:
      'Each scan checks 49 geocoordinates across your service area so you see rankings the way nearby customers do.',
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      'Yes. There are no contracts. Cancel or downgrade whenever you like from the billing page.',
  },
  {
    question: 'Does the free plan expire?',
    answer:
      'No. You get 100 free scans every month forever. Upgrade only when you’re ready for unlimited scans and automation.',
  },
]

export default function HomePage() {
  return (
    <div className="bg-[#020617] text-slate-100 font-sans">
      <main>
        <HeroSection />
        <SocialProofStrip />
        <ProblemSolution />
        <HowItWorksSection />
        <SampleReportSection />
        <DashboardPreviewSection />
        <CoreFeaturesSection />
        <RetentionSection />
        <SecondaryCTA />
        <ScanFormSection />
        <LandingFAQ />
        <FinalCTA />
      </main>
    </div>
  )
}

function HeroSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-24 pt-32 pb-24">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-400">MapsRankChecker™</p>
          <h1 className="text-4xl sm:text-5xl font-semibold leading-tight">
            Your Map Intelligence Platform.
          </h1>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-3 rounded-full border border-[#3b82f6]/30 bg-[#3b82f6]/10 px-4 py-1 text-xs font-semibold text-[#3b82f6]">
              <span className="inline-flex h-5 items-center justify-center rounded-full bg-[#3b82f6] px-2 text-[10px] text-white">
                NEW
              </span>
              Revenue Forecaster
            </div>
            <p className="text-sm text-slate-300">
              See how ranking improvements translate into more calls, visits, and revenue.
            </p>
          </div>
          <p className="text-lg text-slate-300 max-w-xl">
            See your real Google Maps visibility, fix ranking gaps, and stay ahead of competitors — in one tap.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#scan-section"
              className="inline-flex items-center justify-center rounded-full bg-white text-black px-8 py-3 text-base font-semibold transition hover:bg-white/90"
            >
              Start Free Scan →
            </Link>
            <Link
              href="#sample-report"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3 text-base font-semibold text-white transition hover:bg-white/10"
            >
              See Sample Scan →
            </Link>
          </div>
          <p className="text-sm text-slate-400">
            100 free scans/month • No credit card required • 49-point accuracy
          </p>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 bg-white/5 blur-3xl rounded-full" aria-hidden />
          <div className="relative bg-white/10 border border-white/10 rounded-[28px] p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-300">Visibility Score</p>
                <p className="text-4xl font-semibold">82/100</p>
              </div>
              <div className="text-emerald-300 text-sm font-semibold">+4 this week ↑</div>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 49 }).map((_, idx) => (
                <span
                  key={idx}
                  className="aspect-square rounded-lg"
                  style={{
                    background:
                      idx % 7 === 0
                        ? 'rgba(74,222,128,0.7)'
                        : idx % 5 === 0
                        ? 'rgba(251,191,36,0.7)'
                        : 'rgba(248,113,113,0.5)',
                  }}
                />
              ))}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">Ranking Timeline</p>
                <span className="text-sm text-emerald-300">Upward trend</span>
              </div>
              <div className="h-12 rounded-2xl bg-gradient-to-r from-emerald-400 via-amber-300 to-rose-400 opacity-80" />
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
              <div>
                <p className="font-semibold text-white">BellaDent climbed +3</p>
                <p className="text-slate-400">They now outrank you in NW grid.</p>
              </div>
              <span className="text-xs text-rose-300">Action Needed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SocialProofStrip() {
  return (
    <section className="px-4 sm:px-6 lg:px-24 pb-16">
      <div className="text-center text-sm text-slate-400 mb-4">
        Trusted by dentists, clinics, restaurants, real estate teams and 1,200+ local businesses worldwide.
      </div>
      <div className="flex flex-wrap justify-center gap-4 text-xs uppercase tracking-[0.4em] text-slate-500">
        {socialProofIcons.map(label => (
          <span key={label} className="px-4 py-2 border border-white/10 rounded-full">
            {label}
          </span>
        ))}
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
            Your customers are choosing competitors you don’t even see.
          </h2>
          <p className="text-slate-400 leading-relaxed">
            Google Maps rankings shift every few blocks. Most businesses only see one version of the search results. MapsRankChecker shows you the full visibility picture so you can act fast.
          </p>
        </div>
        <div className="grid gap-6">
          {problemCards.map(card => (
            <div key={card.title} className="rounded-2xl bg-white/5 border border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white mb-2">{card.title}</h3>
              <p className="text-slate-400">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorksSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-24 py-20 border-t border-white/5">
      <div className="grid md:grid-cols-3 gap-10 text-center">
        {howItWorks.map(step => (
          <div key={step.title} className="space-y-3">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">{step.label}</p>
            <h3 className="text-2xl font-semibold text-white">{step.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{step.body}</p>
          </div>
        ))}
        <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-6 text-left md:col-start-3 md:row-start-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#3b82f6]/30 bg-[#3b82f6]/10 px-3 py-1 text-[11px] font-semibold text-[#3b82f6]">
            NEW · Step 4
          </div>
          <h3 className="text-xl font-semibold text-white">See your revenue potential</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Understand the real monetary impact of ranking improvements with the Revenue Forecaster.
          </p>
        </div>
      </div>
    </section>
  )
}

function SampleReportSection() {
  return (
    <section id="sample-report" className="px-4 sm:px-6 lg:px-24 py-24 border-t border-white/5">
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-semibold">
          See exactly how Google ranks your business across the map.
        </h2>
        <div className="relative">
          <div className="absolute inset-0 blur-3xl bg-emerald-500/10 rounded-[36px]" aria-hidden />
          <div className="relative bg-white/5 border border-white/10 rounded-[36px] p-10 space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-3xl bg-gradient-to-br from-emerald-500/20 to-blue-500/10 border border-white/10 p-6 space-y-4">
                <p className="text-sm text-slate-300">Heatmap Preview</p>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 42 }).map((_, idx) => (
                    <span
                      key={idx}
                      className="aspect-square rounded-lg"
                      style={{
                        background:
                          idx % 4 === 0
                            ? 'rgba(74,222,128,0.9)'
                            : idx % 3 === 0
                            ? 'rgba(251,191,36,0.8)'
                            : 'rgba(248,113,113,0.7)',
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
                  <p className="text-sm text-slate-300">Visibility Score</p>
                  <p className="text-4xl font-semibold">74/100</p>
                </div>
                <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
                  <p className="text-sm text-slate-300">Ranking Timeline</p>
                  <div className="h-16 rounded-2xl bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-400" />
                </div>
                <div className="rounded-3xl bg-white/5 border border-white/10 p-4 text-left text-sm">
                  <p className="text-white font-semibold">BellaDent climbed +3 this week</p>
                  <p className="text-slate-400">Watch NW visibility</p>
                </div>
                <RevenueImpactCard
                  rankImprovementTo3={3}
                  callsGained={18}
                  directionsGained={7}
                  customersGained={2}
                  monthlyRevenueImpact={1240}
                  className="bg-transparent"
                />
              </div>
            </div>
          </div>
        </div>
        <Link href="/results?businessName=Demo%20Business&city=London&keyword=dentist%20near%20me" className="text-sm text-white/70 hover:text-white underline underline-offset-4">
          View Full Sample Report →
        </Link>
      </div>
    </section>
  )
}

function DashboardPreviewSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-24 py-24 border-t border-white/5">
      <div className="grid gap-10 lg:grid-cols-2 items-start">
        <div className="space-y-6">
          <div>
            <p className="text-sm text-slate-400 uppercase tracking-[0.3em]">Dashboard Preview</p>
            <h2 className="text-3xl font-semibold text-white mt-2">See the visibility cockpit + revenue layer.</h2>
            <p className="text-slate-400 mt-3">Score, timeline, competitor alerts — now boosted with the Revenue Forecaster.</p>
          </div>
          <div className="rounded-[36px] border border-white/10 bg-white/5 p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Visibility Score</p>
                <p className="text-4xl font-semibold text-white">82<span className="text-lg text-slate-500">/100</span></p>
              </div>
              <span className="text-emerald-300 text-sm font-semibold">+4 this week ↑</span>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-400">Ranking Timeline</p>
              <div className="mt-3 h-20 rounded-2xl bg-gradient-to-r from-emerald-400/60 via-amber-300/50 to-rose-400/60" />
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 space-y-3">
              <p className="text-sm text-slate-400">Competitor Alert</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold">BellaDent +3</p>
                  <p className="text-slate-400 text-sm">They now outrank you NW.</p>
                </div>
                <button className="text-sm text-white/80 underline-offset-4 hover:underline">See movement →</button>
              </div>
            </div>
          </div>
        </div>
        <RevenueForecastPanel
          currentRank={12}
          targetRank={3}
          avgOrderValue={220}
          conversionRate={0.3}
          ctrModel={{ 1: 0.22, 2: 0.16, 3: 0.12, 5: 0.08 }}
          gbpInsights={{ calls: 42, directions: 18, clicks: 260 }}
        />
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
            {feature.icon && <div className="text-3xl" aria-hidden>{feature.icon}</div>}
            <h3 className="text-2xl font-semibold text-white">{feature.title}</h3>
            <p className="text-slate-400">{feature.body}</p>
            {'subtext' in feature && feature.subtext ? (
              <p className="text-sm text-slate-500">{feature.subtext}</p>
            ) : null}
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-wrap gap-3 text-xs text-slate-400">
        {['Competitor Intelligence', 'Keyword Position Tracking', 'Local Pack Penetration', 'Ranking Timeline', 'Auto Reports'].map(label => (
          <span key={label} className="px-4 py-2 rounded-full border border-white/10">
            {label}
          </span>
        ))}
      </div>
    </section>
  )
}

function RetentionSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-24 py-24 border-t border-white/5">
      <div className="space-y-8">
        <div className="space-y-3 text-center max-w-3xl mx-auto">
          <p className="text-sm text-slate-400 uppercase tracking-[0.3em]">Retention</p>
          <h2 className="text-3xl font-semibold text-white">Designed to keep you ahead — every day.</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {retentionHighlights.map(item => (
            <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-2">
              <p className="text-sm text-slate-400 uppercase tracking-[0.3em]">{item.label}</p>
              <p className="text-white text-lg font-semibold">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SecondaryCTA() {
  return (
    <section className="px-4 sm:px-6 lg:px-24 py-20 border-t border-white/5 text-center space-y-5">
      <h2 className="text-3xl font-semibold">Start tracking your real Google Maps performance in seconds.</h2>
      <Link
        href="#scan-section"
        className="inline-flex items-center justify-center rounded-full bg-white text-black px-8 py-3 font-semibold transition hover:bg-white/90"
      >
        Run a Free Scan →
      </Link>
      <p className="text-sm text-slate-400">No credit card • No setup • 100 scans every month</p>
    </section>
  )
}

function ScanFormSection() {
  return (
    <section id="scan-section" className="px-4 sm:px-6 lg:px-24 py-24 border-t border-white/5">
      <div className="max-w-4xl mx-auto rounded-[32px] bg-white/5 border border-white/10 p-8 space-y-6">
        <div className="space-y-3 text-center">
          <p className="text-sm text-slate-400 uppercase tracking-[0.3em]">Scan Now</p>
          <h2 className="text-3xl font-semibold text-white">Check Your Map Ranking</h2>
          <p className="text-slate-400">Enter your business details to see how you rank on Google Maps.</p>
        </div>
        <form className="space-y-4">
          <InputField label="Business Name" placeholder="e.g., SmileBright Dental" icon="🏢" />
          <InputField label="City" placeholder="Antalya" icon="📍" />
          <InputField label="Search Keyword (optional)" placeholder='e.g., "dentist near me"' icon="🔍" />
          <button className="w-full rounded-full bg-white text-black py-3 font-semibold hover:bg-white/90 transition">
            Start Free Scan →
          </button>
        </form>
        <div className="rounded-2xl bg-rose-500/10 border border-rose-500/30 p-4 text-sm text-rose-100">
          <p className="font-semibold">You’ve used all 100 free scans this month.</p>
          <p className="text-rose-200 mt-1">Create a free account or upgrade to keep scanning.</p>
          <div className="mt-3 flex flex-col sm:flex-row gap-3">
            <Link href="/signup" className="inline-flex w-full items-center justify-center rounded-full bg-white text-black px-4 py-2 font-semibold">
              Sign Up Free
            </Link>
            <Link href="/upgrade" className="inline-flex w-full items-center justify-center rounded-full border border-white/30 px-4 py-2 font-semibold text-white hover:bg-white/10">
              Upgrade to Pro
            </Link>
          </div>
        </div>
        <BlurredRevenuePreview />
      </div>
    </section>
  )
}

type InputFieldProps = {
  label: string
  placeholder: string
  icon: string
}

function InputField({ label, placeholder, icon }: InputFieldProps) {
  return (
    <div>
      <label className="block text-sm text-slate-300 mb-2">{label}</label>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-12 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
        />
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-lg">{icon}</span>
      </div>
    </div>
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
      <h2 className="text-3xl font-semibold text-white">Ready to uncover your true map visibility?</h2>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="#scan-section"
          className="inline-flex items-center justify-center rounded-full bg-white text-black px-8 py-3 font-semibold hover:bg-white/90 transition"
        >
          Start Free Scan →
        </Link>
        <Link href="/upgrade" className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3 font-semibold text-white hover:bg-white/10">
          See pricing →
        </Link>
      </div>
    </section>
  )
}
