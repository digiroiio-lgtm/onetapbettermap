import type { Metadata } from 'next'

const COMPANY_NAME = 'MVP HOUSE LTD.'
const COMPANY_ADDRESS = '71-75 Shelton Street, Covent Garden, London, United Kingdom, WC2H 9JQ'
const LAST_UPDATED = 'January 15, 2025'

export const metadata: Metadata = {
  title: 'Cookies Policy | One Tap, Better Map',
  description: 'Understand how One Tap, Better Map uses necessary, analytics, and advertising cookies plus your options for managing consent.',
}

const cookieTable = [
  {
    category: 'Strictly Necessary',
    purpose: 'Keeps you signed in, stores CSRF tokens, and routes traffic securely between our edge locations.',
    examples: 'sb:session (Supabase), vercel-fpc, __host-next-auth.csrf-token',
    lifetime: 'Session to 30 days',
  },
  {
    category: 'Analytics',
    purpose: 'Measures scan performance, feature usage, and conversion from Stripe checkout.',
    examples: 'plausible_events, stripe_mid, stripe_sid',
    lifetime: '1 day to 1 year',
  },
  {
    category: 'Preference',
    purpose: 'Stores cookie consent selections and hides onboarding banners you already closed.',
    examples: 'cookie-consent, onboarding-dismissed',
    lifetime: '6 months',
  },
]

export default function CookiesPolicyPage() {
  return (
    <main className="bg-gray-50 min-h-screen text-gray-900">
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">Legal</p>
          <h1 className="text-4xl font-bold mb-4">Cookies Policy</h1>
          <p className="text-lg text-gray-600 mb-4">
            This policy describes how {COMPANY_NAME} uses cookies, pixels, and similar technologies on One Tap, Better Map, how Stripe sets cookies during checkout, and how you can control preferences.
          </p>
          <p className="text-sm text-gray-500">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
        <section>
          <h2 className="text-2xl font-semibold mb-3">1. What are cookies?</h2>
          <p className="text-gray-700">
            Cookies are small text files that help recognize your browser, keep sessions secure, and remember preferences. We only load non-essential cookies after you grant consent through our banner. Essential cookies remain active to deliver core functionality such as authentication and payment security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">2. How Stripe uses cookies</h2>
          <p className="text-gray-700">
            When you open the embedded checkout or customer portal, Stripe may place additional cookies or local storage entries to prevent fraud, speed up checkout, and comply with PSD2/Strong Customer Authentication. These cookies are controlled by Stripe as an independent data controller. Details are available at <a href="https://stripe.com/cookies-policy/legal" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">stripe.com/cookies-policy/legal</a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">3. Cookie categories we use</h2>
          <div className="overflow-x-auto bg-white rounded-2xl shadow-sm">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Purpose</th>
                  <th className="px-4 py-3">Example cookies</th>
                  <th className="px-4 py-3">Lifetime</th>
                </tr>
              </thead>
              <tbody>
                {cookieTable.map(cookie => (
                  <tr key={cookie.category} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-gray-900">{cookie.category}</td>
                    <td className="px-4 py-3 text-gray-700">{cookie.purpose}</td>
                    <td className="px-4 py-3 text-gray-700">{cookie.examples}</td>
                    <td className="px-4 py-3 text-gray-700">{cookie.lifetime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">4. Managing preferences</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Use the cookie banner&apos;s &quot;Manage preferences&quot; link to toggle analytics cookies at any time.</li>
            <li>Control browser-level settings by clearing cookies or blocking specific domains.</li>
            <li>Opt out of analytics via <a href="https://plausible.io/data-policy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Plausible&apos;s privacy-friendly approach</a>, which we use without personal identifiers.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">5. Do-not-track signals</h2>
          <p className="text-gray-700">
            We honor browser-level Global Privacy Control (GPC) and Do Not Track (DNT) signals by disabling non-essential tracking for that session. Stripe may still set necessary cookies to comply with regulatory requirements.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">6. Updates</h2>
          <p className="text-gray-700">
            We may update this Cookies Policy when we add new tools or change vendors. Significant changes will trigger an in-app notification or banner. Continued use of the platform after changes become effective constitutes acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">7. Contact</h2>
          <div className="text-gray-700 space-y-1">
            <p>{COMPANY_NAME}</p>
            <p>{COMPANY_ADDRESS}</p>
            <p>legal@onetapbettermap.com</p>
          </div>
        </section>
      </div>
    </main>
  )
}
