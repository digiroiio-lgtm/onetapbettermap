import type { Metadata } from 'next'
import Link from 'next/link'

const stories = [
  {
    company: 'LuxeLawn & Patio',
    industry: 'Outdoor living installer – Phoenix, AZ',
    challenge: 'Ranked #9-#12 for “patio builder phoenix” despite 1,200+ reviews.',
    solution:
      'Mapped every competitor photo cadence, category, and review velocity. Within 7 days they launched new before/after galleries and triggered weekly scan alerts.',
    results: [
      '+3 map pack positions in 21 days',
      '62 inbound quote requests in one month',
      'Agency upgraded to Pro Unlimited to replicate the playbook in 4 additional cities',
    ],
  },
  {
    company: 'SwiftCare Urgent Clinic',
    industry: 'Healthcare – Nashville metro',
    challenge: 'Seasonal slump plus new VC-backed competitor with aggressive ad spend.',
    solution:
      'Used Success Scorecards inside One Tap to surface 6 neighborhoods with weak “open now” coverage, redeployed staff, and sent weekly ranking screenshots to the executive team.',
    results: [
      'Average wait time showcased in GBP posts = +18% clicks',
      'Stripe-powered Pro plan approved within 24 hours because finance got clean invoices',
      'Clinics hit record patient volume without extra ad budget',
    ],
  },
  {
    company: 'Torque Autohaus',
    industry: 'Performance mechanic – Berlin, DE',
    challenge: 'Needed multilingual reporting to convince franchise partners to invest in SEO.',
    solution:
      'Created German and English scans, exported PDFs, and embedded them in their sales deck. Shared Stripe billing history to prove consistent campaign investment.',
    results: [
      'Closed 5 new franchise locations in Q1',
      'YoY organic service revenue up 54%',
      'Reporting time cut from 6 hours to 35 minutes a week',
    ],
  },
]

export const metadata: Metadata = {
  title: 'Success Stories | One Tap, Better Map',
  description: 'See how agencies and in-house teams use One Tap, Better Map to win map pack rankings, unlock revenue, and keep leadership aligned.',
}

export default function SuccessStoriesPage() {
  return (
    <main className="bg-gray-50 min-h-screen text-gray-900">
      <section className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10">
          <div>
            <p className="text-emerald-300 uppercase tracking-[0.3em] text-xs mb-3">Proof of ROI</p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">When the map pack moves, revenue follows.</h1>
            <p className="text-gray-300 mb-6">
              These teams replaced scattered screenshots with a single tap workflow. They track every competitor move, turn insights into playbooks, and pull Stripe invoices to justify budget renewals. You can copy the same blueprint today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/scanning" className="bg-white text-gray-900 font-semibold px-8 py-4 rounded-full text-center hover:bg-gray-100 transition">Run a live scan</Link>
              <Link href="/upgrade" className="border border-white/40 text-white font-semibold px-8 py-4 rounded-full text-center hover:bg-white/10 transition">See pricing</Link>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
            <h2 className="text-2xl font-semibold">Playbook snapshot</h2>
            <ul className="space-y-4 text-gray-200">
              <li className="flex items-start gap-3"><span className="text-emerald-300">→</span> Weekly automated competitor scans with alerts at +2/-2 position swings.</li>
              <li className="flex items-start gap-3"><span className="text-emerald-300">→</span> Revenue alignment deck that merges success metrics with Stripe receipts.</li>
              <li className="flex items-start gap-3"><span className="text-emerald-300">→</span> Downloadable PDFs to insert directly into board or franchise updates.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16 space-y-12">
        {stories.map(story => (
          <article key={story.company} className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <p className="text-primary font-semibold uppercase tracking-[0.2em] text-xs">{story.industry}</p>
                <h2 className="text-3xl font-bold text-gray-900">{story.company}</h2>
              </div>
              <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">Live on One Tap</div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Challenge</h3>
                <p className="text-gray-700">{story.challenge}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Solution</h3>
                <p className="text-gray-700">{story.solution}</p>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Results</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                {story.results.map(result => (
                  <li key={result}>{result}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16 text-center space-y-6">
          <p className="uppercase tracking-[0.4em] text-xs text-white/70">Next step</p>
          <h2 className="text-4xl font-bold">Turn your map ranking story into the easiest sales slide.</h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Launch a scan, invite stakeholders, and upgrade via Stripe when you are ready to scale—all within one login. The faster you show leadership a win, the faster budgets open up.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="px-10 py-4 rounded-full bg-white text-blue-700 font-semibold hover:bg-blue-50 transition">Create free account</Link>
            <Link href="/demo" className="px-10 py-4 rounded-full border border-white/50 font-semibold hover:bg-white/10 transition">View sample report</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
