export default function SupportPage() {
  const supportChannels = [
    {
      title: 'Onboarding Success',
      label: 'Program',
      copy:
        'Start with a 1:1 kickoff, guided checklist, and tailored playbook so every location knows which zones to prioritize.',
      cta: { text: 'Review onboarding checklist', href: '/dashboard' },
    },
    {
      title: 'Help Desk & Live Chat',
      label: 'Priority',
      copy:
        'Email, chat, or tap “Get help” inside the app—our engineers jump in to debug crawls, CSV exports, or billing questions within minutes.',
      cta: { text: 'Email support@onetapbettermap.com', href: 'mailto:support@onetapbettermap.com' },
    },
    {
      title: 'Strategy Community',
      label: 'Community',
      copy:
        'Join the invite-only Discord, share what’s working, grab templates, and attend weekly office hours with our product team.',
      cta: { text: 'Join the community →', href: 'https://discord.gg/' },
    },
  ]

  const resourceGrid = [
    { title: 'Guides & playbooks', href: '/guides', copy: 'Google Maps ranking, visibility, and revenue playbooks for each role.' },
    { title: 'FAQ & best practices', href: '/faq', copy: 'Answers for billing, data accuracy, and upgrade questions.' },
    { title: 'Release notes', href: '/results', copy: 'See what’s shipped in MapsRankChecker every sprint.' },
    { title: 'Security & compliance', href: '/security', copy: 'GDPR-ready hosting, data policies, and SOC references.' },
  ]

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16">
        <header className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Support & Community</p>
          <h1 className="text-4xl font-semibold tracking-tight">
            Support tailored for high-growth local businesses
          </h1>
          <p className="text-lg text-slate-300">
            Resume onboarding, ask the engineers in live chat, or join peers who use MapsRankChecker to recover revenue every week.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          {supportChannels.map((channel) => (
            <article
              key={channel.title}
              className="flex h-full flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl"
            >
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-500">{channel.label}</p>
                <h2 className="text-2xl font-semibold text-white">{channel.title}</h2>
                <p className="text-sm text-slate-300">{channel.copy}</p>
              </div>
              <a
                href={channel.cta.href}
                className="mt-6 inline-flex items-center rounded-full border border-emerald-400/40 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:border-emerald-300 hover:bg-emerald-400/10"
              >
                {channel.cta.text}
              </a>
            </article>
          ))}
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Knowledge base</p>
              <h3 className="text-2xl font-semibold text-white">Self-serve resources built for operators</h3>
            </div>
            <a
              href="/support"
              className="inline-flex items-center rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white/10"
            >
              Browse all resources
            </a>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {resourceGrid.map((resource) => (
              <a
                key={resource.title}
                href={resource.href}
                className="rounded-2xl border border-slate-800 bg-white/5 p-5 text-sm text-slate-200 transition hover:border-white/30 hover:bg-white/10"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{resource.title}</p>
                <p className="mt-2 text-slate-300">{resource.copy}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-center shadow-xl">
          <p className="text-xs uppercase tracking-[0.4em] text-emerald-100">Need immediate help?</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">
            Chat with our team, schedule an escalation call, or get a custom training session.
          </h3>
          <p className="mt-2 text-sm text-emerald-100">We respond to live chat requests within minutes and email tickets within 2 business hours.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a
              href="mailto:support@onetapbettermap.com"
              className="inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Email support@onetapbettermap.com
            </a>
            <a
              href="/dashboard"
              className="inline-flex items-center rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Open in-app chat
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}
