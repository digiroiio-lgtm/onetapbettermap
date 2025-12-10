import type { Metadata } from 'next'

const COMPANY_NAME = 'MVP HOUSE LTD.'
const COMPANY_ADDRESS = '71-75 Shelton Street, Covent Garden, London, United Kingdom, WC2H 9JQ'
const LAST_UPDATED = 'January 15, 2025'

export const metadata: Metadata = {
  title: 'Privacy Policy | One Tap, Better Map',
  description: 'Learn how One Tap, Better Map collects, processes, and protects your personal data when you scan listings or upgrade through Stripe.',
}

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-gray-50 min-h-screen text-gray-900">
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">Legal</p>
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600 mb-4">
            This Privacy Policy explains how One Tap, Better Map operated by {COMPANY_NAME} collects, uses, and protects information when you scan, benchmark competitors, or upgrade to paid subscriptions via Stripe.
          </p>
          <p className="text-sm text-gray-500">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
        <section>
          <h2 className="text-2xl font-semibold mb-3">1. Who we are</h2>
          <p className="text-gray-700">
            One Tap, Better Map is a SaaS product owned and operated by {COMPANY_NAME}, registered at {COMPANY_ADDRESS}. We enable local businesses to analyze Google Maps visibility and complete secure upgrades through our payment partner Stripe, Inc.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">2. Data we collect</h2>
          <p className="text-gray-700 mb-3">We collect the following categories of information:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Account data such as name, business email, password hash, team name, and subscription tier.</li>
            <li>Business inputs you provide when running scans (keywords, city, competitor names, public URLs).</li>
            <li>Usage data including scan frequency, device/browser details, and log data captured by our analytics tooling.</li>
            <li>Support information when you contact us via chat, email, or onboarding calls.</li>
            <li>Payment identifiers provided to Stripe (cardholder name, payment method IDs, billing zip) — card numbers never pass through our servers.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">3. Payment processing with Stripe</h2>
          <p className="text-gray-700">
            We partner with Stripe for all paid plans. When you choose to upgrade, your payment details are transmitted directly to Stripe using payment elements embedded on our site. Stripe acts as our data processor and is certified to PCI-DSS Level 1. We store a reference token and subscription status so we can recognize successful payments, issue invoices, and manage cancellations. Stripe&apos;s privacy documentation is available at <a className="text-primary hover:underline" href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">stripe.com/privacy</a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">4. How we use your data</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Provide scan results, dashboards, and automated reports you request.</li>
            <li>Process payments, manage subscriptions, and prevent fraudulent transactions.</li>
            <li>Improve the accuracy of rankings, competitor benchmarks, and product features.</li>
            <li>Send transactional emails, billing updates, and service notifications.</li>
            <li>Comply with legal, tax, and audit obligations applicable to our operations in the UK and EU.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">5. Legal bases for processing</h2>
          <p className="text-gray-700">
            For EU/UK visitors we rely on the following lawful bases under GDPR: contract necessity (providing the service you request), legitimate interests (product analytics, fraud prevention, platform security), legal obligation (tax documentation), and consent (optional marketing and non-essential cookies).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">6. Sharing with service providers</h2>
          <p className="text-gray-700 mb-3">
            We only share information with vendors that help us deliver the product. These include Stripe (payments), Supabase (authentication/database), Vercel (hosting), and support/analytics platforms. Each provider is bound by a data processing agreement and may only process information according to our instructions.
          </p>
          <p className="text-gray-700">
            We never sell personal data or allow third parties to use it for unrelated advertising.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">7. International transfers</h2>
          <p className="text-gray-700">
            Data may be stored on servers located in the European Union or the United States. When we transfer information outside the UK/EU we rely on Standard Contractual Clauses or other lawful safeguards to ensure equivalent protection.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">8. Data retention & security</h2>
          <p className="text-gray-700">
            We retain account, billing, and scan history for as long as you maintain an account plus a reasonable period to meet regulatory requirements (typically 6 years in the UK). You may request deletion of scans, exported reports, or entire accounts at any time. We implement encryption in transit (TLS 1.2+), apply the principle of least privilege, and monitor access to production systems.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">9. Your rights</h2>
          <p className="text-gray-700 mb-3">
            Depending on your jurisdiction, you may have the right to access, correct, delete, or export your personal data as well as object to or restrict processing. Submit requests by emailing <a href="mailto:legal@mapsrankchecker.com" className="text-primary hover:underline">legal@mapsrankchecker.com</a> and we will respond within 30 days.
          </p>
          <p className="text-gray-700">
            If you are an EU/UK data subject, you also have the right to lodge a complaint with your local supervisory authority. California residents may designate an authorized agent to submit requests under the CCPA.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">10. Cookies and tracking</h2>
          <p className="text-gray-700">
            We use necessary cookies for authentication plus optional analytics cookies to improve product performance. Details about our cookie categories, lifetimes, and preferences are provided in our <a href="/cookies-policy" className="text-primary hover:underline">Cookies Policy</a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">11. Contact</h2>
          <div className="text-gray-700 space-y-1">
            <p>{COMPANY_NAME}</p>
            <p>{COMPANY_ADDRESS}</p>
            <p>legal@mapsrankchecker.com</p>
          </div>
        </section>
      </div>
    </main>
  )
}
