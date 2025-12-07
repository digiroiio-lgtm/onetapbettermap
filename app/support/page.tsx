export default function SupportPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-2">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">Support & Community</p>
          <h1 className="text-4xl font-bold text-gray-900">Need help? We’re here.</h1>
          <p className="text-gray-600">
            Explore onboarding resources, reach our team, and connect with other local SEO operators.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.35em] text-gray-400 mb-2">Onboarding</p>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Guided checklist</h2>
            <p className="text-sm text-gray-600 mb-4">
              Follow the getting-started steps directly from your dashboard or schedule a kickoff call.
            </p>
            <a href="/dashboard" className="text-primary font-semibold hover:text-blue-600 text-sm flex items-center gap-1">
              View Checklist →
            </a>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.35em] text-gray-400 mb-2">Help Desk</p>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Email & live chat</h2>
            <p className="text-sm text-gray-600 mb-4">
              Email <a href="mailto:support@onetapbettermap.com" className="text-primary font-medium">support@onetapbettermap.com</a> or open the in-app chat for priority customers.
            </p>
            <a href="mailto:support@onetapbettermap.com" className="text-primary font-semibold hover:text-blue-600 text-sm flex items-center gap-1">
              Contact Support →
            </a>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.35em] text-gray-400 mb-2">Community</p>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Strategy hub</h2>
            <p className="text-sm text-gray-600 mb-4">
              Join our private Discord to swap playbooks, download templates, and attend office hours.
            </p>
            <a href="https://discord.gg/" target="_blank" className="text-primary font-semibold hover:text-blue-600 text-sm flex items-center gap-1">
              Join Discord →
            </a>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Self-serve resources</h2>
          <ul className="space-y-3 text-sm text-gray-700">
            <li>• <a href="/guide" className="text-primary font-medium hover:text-blue-600">Guides & playbooks</a></li>
            <li>• <a href="/faq" className="text-primary font-medium hover:text-blue-600">FAQ</a></li>
            <li>• <a href="/terms-of-use" className="text-primary font-medium hover:text-blue-600">Legal & privacy</a></li>
          </ul>
        </section>
      </div>
    </main>
  )
}
