import type { Metadata } from 'next'
import Link from 'next/link'

const reviews = [
  {
    name: 'Emily Chen',
    title: 'Owner, SmileBright Dental (Austin, TX)',
    result: '+37% calls from Maps in 30 days',
    quote:
      'One Tap, Better Map replaced a 5-spreadsheet workflow with a single scan. I can show my team exactly which neighborhoods we dominate, which ones we are invisible in, and what to fix before the weekend.',
  },
  {
    name: 'Marcus Rivera',
    title: 'Head of Growth, CleanRide Mobile Detail',
    result: '4X more leads vs. last quarter',
    quote:
      'We used to guess why the phone was quiet. Now every Monday we scan top competitors, export the PDF, and give ops a checklist. Stripe billing made it painless to get budget approved.',
  },
  {
    name: 'Laura McKinley',
    title: 'Marketing Director, Peak Performance PT',
    result: 'Booked-out schedule in 6 weeks',
    quote:
      'Maps rankings lag when reviews dip. The platform flags that before Google does. We switched to the Pro plan for unlimited scans and it already paid for itself in new patients.',
  },
]

const stats = [
  { label: 'Avg. increase in discovery calls', value: '+28%' },
  { label: 'Time saved per weekly audit', value: '3.4 hours' },
  { label: 'Agencies using us to win pitches', value: '420+' },
]

export const metadata: Metadata = {
  title: 'Customer Reviews | One Tap, Better Map',
  description: 'See why local businesses and agencies choose One Tap, Better Map to boost Google Maps rankings, generate leads, and close clients faster.',
}

export default function ReviewsPage() {
  return (
    <main className="bg-gray-50 min-h-screen text-gray-900">
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <p className="text-primary font-semibold uppercase tracking-[0.3em] mb-4">Customer Proof</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Sales teams close faster with social proof baked in.</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We asked power users why they moved their Google Maps visibility tracking to One Tap, Better Map. The answer was simple: scans they can trust, reports they can email to clients, and Stripe-powered upgrades that keep procurement happy.
          </p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map(stat => (
              <div key={stat.label} className="bg-white rounded-2xl shadow-sm border border-gray-100 py-6 px-4">
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup" className="px-8 py-4 rounded-full bg-primary text-white font-semibold shadow-lg hover:bg-blue-600 transition">Start free scan</Link>
            <Link href="/upgrade" className="px-8 py-4 rounded-full border border-primary text-primary font-semibold hover:bg-blue-50 transition">See pricing</Link>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16 space-y-12">
        {reviews.map(review => (
          <article key={review.name} className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">{review.name}</h2>
                <p className="text-gray-500">{review.title}</p>
              </div>
              <div className="text-primary font-semibold text-xl">{review.result}</div>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">“{review.quote}”</p>
          </article>
        ))}
      </section>

      <section className="bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-emerald-300 uppercase tracking-[0.3em] text-xs mb-3">Guarantee</p>
            <h2 className="text-3xl font-bold mb-4">If you do not see traction in 45 days, we pay your next month.</h2>
            <p className="text-gray-300 mb-6">
              Run unlimited scans, export white-labeled PDFs, and loop your Stripe receipts directly to finance. If you do not feel confident pitching your rankings after 45 days, email us and we will comp the next month. Zero risk, all upside.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-emerald-300 text-xl">✓</span>
              <p>Premium support chat with former agency strategists.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-emerald-300 text-xl">✓</span>
              <p>Stripe receipts + invoices for every upgrade for easy expensing.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-emerald-300 text-xl">✓</span>
              <p>Competitive battle cards ready to share with clients within minutes.</p>
            </div>
            <Link href="/signup" className="inline-flex items-center justify-center w-full bg-white text-gray-900 font-semibold py-3 rounded-full hover:bg-gray-100 transition">Book your free scan</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
