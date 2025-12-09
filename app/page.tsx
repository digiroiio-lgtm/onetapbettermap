import Link from 'next/link'
import RevenueForecastPanel from '@/components/RevenueForecastPanel'

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
  { label: 'Step 1', title: 'Enter your business', body: 'Search your Google Business Profile or paste name + city.' },
  { label: 'Step 2', title: 'Get instant heatmap', body: '49-point GeoGrid shows the exact ranks nearby customers see.' },
  { label: 'Step 3', title: 'Follow AI checklist', body: 'Actionable tasks remove ranking blockers in priority order.' },
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
    body: 'A single metric showing how dominant you are across your entire service radius.',
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
    body: 'Preview how many calls, visits, and customers you’ll unlock at each rank.',
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
  {
    question: 'How is this different from Google Search Console?',
    answer:
      'Search Console shows web clicks from one location. MapsRankChecker scans 49+ coordinates across your city to reveal the real local pack rankings customers see.',
  },
]

export default function HomePage() {
  return (
    <div className="bg-[#020617] text-slate-100 font-sans">
      <main>
        <HeroSection />
        <SocialProofStrip />
        <ProblemSolution />
        <ScanFormSection />
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
              href="#scan-now"
              className="inline-flex items-center justify-center rounded-full bg-[#2563eb] text-white px-8 py-3 text-base font-semibold transition hover:bg-[#1d4ed8]"
            >
              See Your Map Visibility →
            </Link>
            <Link
              href="#demo-experience"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3 text-base font-semibold text-white transition hover:bg-white/10"
            >
              View Sample Report →
            </Link>
          </div>
          <p className="text-sm text-slate-400">
            ✓ 100 free scans/month • No credit card • Setup in 2 minutes
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
      </div>
    </section>
  )
}


function DemoExperienceSection() {
  return (
    <section id="demo-experience" className="px-4 sm:px-6 lg:px-24 py-24 border-t border-white/5">
      <div className="space-y-6 text-center max-w-3xl mx-auto">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Interactive Demo</p>
        <h2 className="text-3xl font-semibold text-white">See the entire Maps intelligence loop in one view.</h2>
        <p className="text-slate-400">
          Visibility score, GeoGrid heatmap, competitor movement, and revenue forecasting — all in one login.
        </p>
      </div>
      <div className="mt-12 grid lg:grid-cols-[1.1fr_0.9fr] gap-10">
        <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Visibility Score</p>
              <p className="text-4xl font-semibold text-white">74/100</p>
            </div>
            <span className="text-xs text-emerald-300">+5 this week</span>
          </div>
          <div>
            <p className="text-sm text-slate-400 mb-3">Heatmap Preview</p>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 49 }).map((_, idx) => (
                <span
                  key={idx}
                  className="aspect-square rounded-lg"
                  style={{
                    background:
                      idx % 6 === 0
                        ? 'rgba(74,222,128,0.85)'
                        : idx % 4 === 0
                        ? 'rgba(251,191,36,0.8)'
                        : 'rgba(248,113,113,0.7)',
                  }}
                />
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-3">
            <p className="text-sm text-slate-400">Competitor Timeline</p>
            <div className="space-y-3">
              {demoTimeline.map(item => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-white font-semibold">{item.name}</p>
                    <p className="text-slate-400 text-xs">{item.coverage}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">{item.rank}</p>
                    <p className="text-emerald-300 text-xs">{item.change}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Revenue Forecaster (preview)</p>
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
            <p className="text-sm text-slate-400 uppercase tracking-[0.3em]">What you unlock</p>
            <ul className="space-y-3 text-sm text-slate-300 text-left">
              <li>• Instant heatmap + coverage score</li>
              <li>• Competitor movement + smart alerts</li>
              <li>• Revenue projections at each rank</li>
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
          Explore the full sample report →
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

function SocialProofSpotlight() {
  return (
    <section className="px-4 sm:px-6 lg:px-24 py-24 border-t border-white/5">
      <div className="space-y-6 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Social Proof</p>
        <h2 className="text-3xl font-semibold text-white">1,200+ businesses trust MapsRankChecker.</h2>
        <p className="text-slate-400">Dentists, medspas, real estate teams, and agencies rely on our GeoGrid engine.</p>
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
            <p className="text-lg text-white leading-relaxed">“{testimonial.quote}”</p>
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

function ScanFormSection() {
  return (
    <section id="scan-now" className="px-4 sm:px-6 lg:px-24 py-24 border-t border-white/5">
      <div className="max-w-4xl mx-auto rounded-[32px] bg-white/5 border border-white/10 p-8 space-y-6">
        <div className="space-y-3 text-center">
          <p className="text-sm text-slate-400 uppercase tracking-[0.3em]">Scan Now</p>
          <h2 className="text-3xl font-semibold text-white">Check Your Real Map Ranking in 30 Seconds</h2>
          <p className="text-slate-400">Enter your business details to see what nearby customers see.</p>
        </div>
        <div className="rounded-2xl bg-rose-500/10 border border-rose-500/30 p-4 text-sm text-rose-100">
          <p className="font-semibold">⚠️ You’ve used all 100 free scans today.</p>
          <p className="text-rose-200 mt-1">
            <Link href="/signup" className="underline">Sign up</Link> for 100/month or{' '}
            <Link href="/upgrade" className="underline">upgrade</Link> for unlimited scans.
          </p>
        </div>
        <form className="space-y-4">
          <InputField label="Business Name" placeholder="e.g., SmileBright Dental" icon="🏢" />
          <InputField label="City" placeholder="Antalya" icon="📍" />
          <InputField label="Search Keyword (optional)" placeholder='e.g., "dentist near me"' icon="🔍" />
          <button className="w-full rounded-full bg-[#2563eb] text-white py-3 font-semibold hover:bg-[#1d4ed8] transition">
            Scan My Visibility →
          </button>
        </form>
        <p className="text-center text-sm text-slate-400">
          ✓ 100 free scans/month • No credit card required • Takes under 2 minutes
        </p>
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
