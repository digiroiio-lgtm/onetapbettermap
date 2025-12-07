import type { Metadata } from 'next'

const COMPANY_NAME = 'MVP HOUSE LTD.'
const COMPANY_ADDRESS = '71-75 Shelton Street, Covent Garden, London, United Kingdom, WC2H 9JQ'
const LAST_UPDATED = 'January 15, 2025'

export const metadata: Metadata = {
  title: 'Data Processing Agreement | One Tap, Better Map',
  description: 'Read the controller-processor commitments that apply when One Tap, Better Map handles personal data for customers located in the UK, EU, or other regulated regions.',
}

const subprocessors = [
  { name: 'Stripe, Inc.', purpose: 'Subscription billing, invoicing, payment method storage, SCA compliance', location: 'USA / EU', safeguards: 'EU Standard Contractual Clauses, UK Addendum, PCI-DSS Level 1' },
  { name: 'Vercel Inc.', purpose: 'Application hosting and edge caching', location: 'USA / EU', safeguards: 'Standard Contractual Clauses, SOC 2 Type II' },
  { name: 'Supabase, Inc.', purpose: 'Authentication, managed Postgres database, file storage', location: 'EU (Frankfurt) + USA backup', safeguards: 'Standard Contractual Clauses, encryption at rest' },
  { name: 'Plausible Insights OÜ', purpose: 'Privacy-friendly analytics', location: 'EU (Germany)', safeguards: 'EU-based processing, no personal data' },
]

export default function DataProcessingAgreementPage() {
  return (
    <main className="bg-gray-50 min-h-screen text-gray-900">
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">Legal</p>
          <h1 className="text-4xl font-bold mb-4">Data Processing Agreement</h1>
          <p className="text-lg text-gray-600 mb-4">
            This Data Processing Agreement (&quot;DPA&quot;) supplements our Terms of Use and applies to customers who transmit personal data to One Tap, Better Map for processing. It reflects the requirements of GDPR, the UK Data Protection Act 2018, and other global privacy regimes.
          </p>
          <p className="text-sm text-gray-500">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
        <section>
          <h2 className="text-2xl font-semibold mb-3">1. Definitions</h2>
          <p className="text-gray-700">
            Terms such as &quot;personal data,&quot; &quot;processing,&quot; &quot;controller,&quot; and &quot;processor&quot; have the meanings given in GDPR. &quot;Customer&quot; refers to the business entity entering into the Terms of Use. {COMPANY_NAME} acts as the processor, and Customer acts as the controller for all business or lead information uploaded to the platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">2. Scope of processing</h2>
          <p className="text-gray-700 mb-3">
            We process personal data solely to provide the services described in the Terms, including:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Running visibility scans and generating reports from Customer-supplied inputs.</li>
            <li>Storing contact details for authorized users.</li>
            <li>Sending transactional notifications and alerts.</li>
            <li>Facilitating payments through Stripe and maintaining subscription records.</li>
          </ul>
          <p className="text-gray-700 mt-3">
            No other processing will be performed unless documented in writing by the Customer.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">3. Customer responsibilities</h2>
          <p className="text-gray-700">
            Customer is responsible for ensuring it has a lawful basis to collect and share personal data with us, for configuring retention settings, and for providing accurate instructions through the dashboard or written requests. Customer must promptly notify us if data uploaded to the service is subject to industry-specific rules (HIPAA, PCI, etc.) and agrees not to submit sensitive categories beyond what is necessary.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">4. Processor obligations</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Process personal data only on documented instructions from Customer.</li>
            <li>Ensure confidentiality by binding employees and contractors to appropriate obligations.</li>
            <li>Implement technical & organizational measures such as encryption, access controls, logging, and regular penetration tests.</li>
            <li>Notify Customer without undue delay after becoming aware of a personal data breach.</li>
            <li>Assist Customer with data subject requests, DPIAs, and regulatory inquiries where feasible.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">5. Sub-processors</h2>
          <p className="text-gray-700 mb-4">
            Customer authorizes the use of the following sub-processors. We will provide 30 days&apos; notice before adding or replacing any vendor so that you may object.
          </p>
          <div className="overflow-x-auto bg-white rounded-2xl shadow-sm">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Sub-processor</th>
                  <th className="px-4 py-3">Purpose</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Safeguards</th>
                </tr>
              </thead>
              <tbody>
                {subprocessors.map(sp => (
                  <tr key={sp.name} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-gray-900">{sp.name}</td>
                    <td className="px-4 py-3 text-gray-700">{sp.purpose}</td>
                    <td className="px-4 py-3 text-gray-700">{sp.location}</td>
                    <td className="px-4 py-3 text-gray-700">{sp.safeguards}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">6. International transfers</h2>
          <p className="text-gray-700">
            Where processing involves a transfer outside the UK or EEA, we rely on Standard Contractual Clauses approved by the European Commission, together with the UK International Data Transfer Addendum. Additional safeguards include encryption in transit, data minimization, and strict access controls.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">7. Security measures</h2>
          <p className="text-gray-700">
            We maintain an information security program proportionate to the risks of processing. Measures include TLS 1.2+, encryption at rest, role-based access, regular vulnerability scanning, background checks for key personnel, and incident response procedures coordinated with Stripe for payment-related events.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">8. Data subject requests</h2>
          <p className="text-gray-700">
            If we receive a request directly from a data subject, we will notify Customer without undue delay (unless legally prohibited). Customer authorizes us to respond by informing the requester to direct the inquiry to the controller. We will provide reasonable assistance so you can fulfil access, rectification, deletion, or portability obligations within statutory timelines.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">9. Audit rights</h2>
          <p className="text-gray-700">
            Upon reasonable notice, Customer may request information necessary to demonstrate compliance with this DPA. We may satisfy this requirement through third-party reports (SOC 2, penetration tests) or virtual assessments. On-site audits are available once per year and subject to confidentiality and reimbursement of our reasonable costs.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">10. Deletion or return</h2>
          <p className="text-gray-700">
            Within 30 days after account termination, Customer may export scan data via the dashboard or request secure deletion. We will delete remaining personal data (excluding legally required archives) within 90 days, unless lawfully required to retain it for tax, fraud-prevention, or dispute purposes.
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
