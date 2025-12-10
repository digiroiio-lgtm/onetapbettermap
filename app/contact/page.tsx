const contactChannels = [
  {
    title: 'Talk to Sales',
    copy:
      'Share how many locations you run and where you want visibility to jump so our Solutions Engineers can prepare a tailored plan.',
    cta: {
      text: 'Email hello@mapsrankchecker.com',
      href: 'mailto:hello@mapsrankchecker.com?subject=MapsRankChecker%20Sales%20Inquiry',
    },
  },
  {
    title: 'Request a Demo',
    copy:
      'See MapsRankChecker on your own data, explore GeoGrid coverage, and map a revenue forecast before you buy.',
    cta: {
      text: 'Ask for a demo',
      href: 'mailto:hello@mapsrankchecker.com?subject=MapsRankChecker%20Demo%20Request',
    },
  },
  {
    title: 'Support & Implementation',
    copy:
      'For live chat, project help, or billing support, email the help desk and we will reply within a business day.',
    cta: {
      text: 'Email support@mapsrankchecker.com',
      href: 'mailto:support@mapsrankchecker.com',
    },
  },
  {
    title: 'Press & Partnerships',
    copy:
      'Working on a guide, software bundle, or channel partner playbook? Let’s explore how MapsRankChecker can add value.',
    cta: {
      text: 'Email partners@mapsrankchecker.com',
      href: 'mailto:partners@mapsrankchecker.com',
    },
  },
]

const responseTimes = [
  { label: 'Live chat', detail: 'Within minutes during U.S. office hours' },
  { label: 'Email & tickets', detail: 'Replied within 2 business hours' },
  { label: 'Strategy or partnership calls', detail: 'Schedule within 3 business days' },
]

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-16">
        <header className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">MapsRankChecker</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white">Get in touch</h1>
          <p className="text-lg text-slate-300">
            We respond in real time, whether you have a new account to set up, a data question, or
            a partnership idea. Pick the channel that matches your goal and we will take it from there.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          {contactChannels.map((channel) => (
            <article
              key={channel.title}
              className="flex h-full flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl"
            >
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-500">{channel.title}</p>
                <p className="text-sm text-slate-200">{channel.copy}</p>
              </div>
              <a
                href={channel.cta.href}
                className="mt-6 inline-flex items-center rounded-full border border-emerald-400/50 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:border-emerald-300 hover:bg-emerald-400/10"
              >
                {channel.cta.text}
              </a>
            </article>
          ))}
        </section>

        <section className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-center shadow-xl">
          <p className="text-xs uppercase tracking-[0.4em] text-emerald-100">Response times</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">We stay available for ambitious teams</h2>
          <p className="mt-2 text-sm text-emerald-100">
            From activation to long-term strategy, a MapsRankChecker specialist is assigned to every conversation.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {responseTimes.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/20 bg-white/5 p-4 text-left text-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-100">{item.label}</p>
                <p className="mt-2 text-slate-100">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Company info</p>
              <h3 className="text-2xl font-semibold text-white">Remote-first, ready to meet you wherever you are</h3>
            </div>
            <div className="text-sm text-slate-300">
              <p>Serving North American and international local businesses</p>
              <p>Billing + contracts handled in Austin, TX</p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4 text-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">General email</p>
              <p className="mt-1 text-emerald-200">hello@mapsrankchecker.com</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4 text-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Support</p>
              <p className="mt-1 text-emerald-200">support@mapsrankchecker.com</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4 text-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Social</p>
              <p className="mt-1 text-slate-300">Instagram & Twitter @MapsRankChecker</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
