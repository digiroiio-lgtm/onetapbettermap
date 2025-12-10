import Link from 'next/link'
import FreeScanForm from '@/components/FreeScanForm'

export const revalidate = 86400 // 24 saat

const highlightStats = [
  { label: 'Instant insight', value: '30 seconds' },
  { label: 'GeoGrid coverage', value: '49 data points' },
  { label: 'Monthly allowance', value: '3 free scans' },
]

const benefits = [
  'Compare every keyword snapshot to your fiercest competitors in each direction.',
  'Spot neighborhoods where revenue leaks before customers even call.',
  'Deliver a shareable visibility map to leadership in under a minute.',
]

const pillarCards = [
  {
    title: 'Track live rankings',
    body: 'Our GeoGrid checks the same queries customers use, so you see the real Maps position — not a generic average.',
  },
  {
    title: 'Uncover revenue signals',
    body: '49 scan points reveal where visibility drops, which competitors win, and how many calls that translates into.',
  },
  {
    title: 'Plan confident fixes',
    body: 'Recommendations connect visibility gaps to concrete actions so you can improve rank and revenue everywhere.',
  },
]

export default function FreeScanPage() {
  return (
    <div className="bg-[#020617] text-slate-100 min-h-screen">
      <main className="px-4 sm:px-6 lg:px-24 py-16 space-y-12">
        <section className="space-y-6 text-center max-w-4xl mx-auto">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-400">Free Visibility Scan</p>
          <h1 className="text-4xl font-semibold text-white">
            See exactly how Google Maps customers discover your business — before you spend another marketing dollar.
          </h1>
          <p className="text-lg text-slate-400">
            MapsRankChecker delivers your free GeoGrid scan in under 30 seconds. Enter your business details once and we
            test every quadrant, competitor, and keyword that matters.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            {highlightStats.map(stat => (
              <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/5 p-5 space-y-2">
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <FreeScanForm />

        <section className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-white">Why this scan matters</h2>
            <p className="text-slate-400">
              Most visibility reports only show your top keywords. Our GeoGrid reveals where competitors outrank you across
              every neighborhood, so you can stop reactionary fixes and focus on the moves that recover real revenue.
            </p>
            <ul className="space-y-3 text-sm text-slate-300 list-disc list-inside">
              {benefits.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            {pillarCards.map(card => (
              <div key={card.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-3">
                <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                <p className="text-slate-300">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center space-y-4">
          <p className="text-sm text-slate-400 uppercase tracking-[0.3em]">What happens next</p>
          <p className="text-lg text-white">
            Once the scan completes you can explore the live results page, share them with teammates, or upgrade for
            alerts and unlimited reports.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/results?businessName=Demo%20Business&city=London"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              View a demo report
            </Link>
            <Link
              href="/upgrade"
              className="inline-flex items-center justify-center rounded-full bg-[#2563eb] text-white px-8 py-3 text-sm font-semibold hover:bg-[#1d4ed8] transition"
            >
              Talk to a specialist
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
