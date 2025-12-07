import type { Metadata } from 'next'

const COMPANY_NAME = 'MVP HOUSE LTD.'
const COMPANY_ADDRESS = '71-75 Shelton Street, Covent Garden, London, United Kingdom, WC2H 9JQ'
const LAST_UPDATED = 'January 15, 2025'

export const metadata: Metadata = {
  title: 'Terms of Use | One Tap, Better Map',
  description: 'Review the legal terms that govern access to One Tap, Better Map, including subscription rules, Stripe billing, and acceptable use.',
}

export default function TermsOfUsePage() {
  return (
    <main className="bg-gray-50 min-h-screen text-gray-900">
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">Legal</p>
          <h1 className="text-4xl font-bold mb-4">Terms of Use</h1>
          <p className="text-lg text-gray-600 mb-4">
            These Terms of Use form a legally binding agreement between you and {COMPANY_NAME}, the operator of One Tap, Better Map. By creating an account, running scans, or authorizing payments processed by Stripe, you accept these terms.
          </p>
          <p className="text-sm text-gray-500">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
        <section>
          <h2 className="text-2xl font-semibold mb-3">1. Eligibility & account registration</h2>
          <p className="text-gray-700">
            You must be at least 18 years old and authorized to act on behalf of the business you represent. You agree to provide accurate information, keep credentials confidential, and promptly update any changes. You are responsible for all activity under your login, including scans triggered by team members you invite.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">2. Service description</h2>
          <p className="text-gray-700">
            One Tap, Better Map is a subscription SaaS product that analyzes public Google Maps listings, reveals ranking gaps, and offers optional upgrades for expanded reports. We may update or discontinue features at any time while ensuring materially similar functionality for paid plans during the current billing cycle.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">3. Subscriptions, billing, and Stripe payments</h2>
          <p className="text-gray-700 mb-3">
            Paid plans are billed in advance via Stripe and automatically renew until cancelled. When you enter card details inside the upgrade flow, you authorize Stripe to store payment methods and charge recurring fees. All prices are displayed in USD unless otherwise noted. Taxes, VAT, or GST will be added where required.
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Invoices and receipts are emailed immediately after a successful payment.</li>
            <li>You may cancel at any time inside the dashboard; access continues until the end of the paid period.</li>
            <li>Failed payments may lead to paused scans or downgraded accounts until a valid method is supplied.</li>
            <li>Refunds are evaluated on a case-by-case basis and follow UK consumer law and Stripe&apos;s dispute processes.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">4. Acceptable use</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>No scraping, reverse engineering, or unauthorized automation that burdens our infrastructure.</li>
            <li>No uploading of unlawful, false, or misleading business data.</li>
            <li>No reselling of scan outputs without written permission.</li>
            <li>No attempts to bypass payment obligations, security controls, or rate limits.</li>
          </ul>
          <p className="text-gray-700 mt-3">
            We reserve the right to suspend accounts that violate these standards or applicable regulations (GDPR, CCPA, FCA and ICO guidance, or Stripe&apos;s service rules).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">5. Intellectual property & license</h2>
          <p className="text-gray-700">
            We retain all rights in the software, dashboards, visual assets, and documentation. You receive a limited, non-transferable license to use the platform for your internal business operations. Feedback or improvement suggestions may be used by us without obligation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">6. Data protection</h2>
          <p className="text-gray-700 mb-3">
            Use of the service is also governed by our <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a> and <a href="/data-processing-agreement" className="text-primary hover:underline">Data Processing Agreement</a>. By accepting these Terms you confirm you have reviewed both documents, including how Stripe processes payment data on our behalf.
          </p>
          <p className="text-gray-700">
            If you process EU/UK personal data through scans, you are the data controller and must ensure lawful grounds to ingest that information into our tools.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">7. Disclaimers</h2>
          <p className="text-gray-700">
            The platform is provided &quot;as is&quot; without warranties of uninterrupted availability or guaranteed ranking results. Insights, competitor scores, and recommendations are informational only. We do not provide legal, financial, or compliance advice relating to your marketing activities.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">8. Limitation of liability</h2>
          <p className="text-gray-700">
            To the fullest extent permitted by law, {COMPANY_NAME} will not be liable for indirect, consequential, punitive, or incidental damages, lost profits, or loss of data arising from your use of the platform. Our aggregate liability for any claim is limited to the fees you paid during the 12 months preceding the event giving rise to the claim.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">9. Termination</h2>
          <p className="text-gray-700">
            You may end the agreement at any time by deleting your account. We may terminate or suspend access if you breach the Terms, fail to pay Stripe invoices, or engage in abusive behavior. Upon termination you should download any reports you need; we may delete data consistent with our retention schedule.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">10. Governing law</h2>
          <p className="text-gray-700">
            These Terms are governed by the laws of England and Wales, and any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales, unless a different jurisdiction is mandated by consumer protection law.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">11. Contact</h2>
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
