import Link from 'next/link'
import type { Metadata } from 'next'
import BlogFooterCTA from './components/BlogFooterCTA'
import { blogPosts } from './blogContent'

const canonical = 'https://mapsrankchecker.com/blog'

export const metadata: Metadata = {
  title: 'MapsRankChecker Blog',
  description:
    'Real-world guides for checking, reporting, and improving Google Maps ranking with GeoGrid scans, revenue modeling, and operational playbooks.',
  openGraph: {
    title: 'MapsRankChecker Blog',
    description:
      'Real-world guides for checking, reporting, and improving Google Maps ranking with GeoGrid scans, revenue modeling, and operational playbooks.',
    url: canonical,
    type: 'website',
  },
  alternates: {
    canonical,
  },
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-100">
      <div className="mx-auto max-w-5xl space-y-12 px-4 py-16">
        <header className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Blog</p>
          <h1 className="text-3xl font-semibold text-white">Ranking insights that actually move revenue.</h1>
          <p className="text-base text-slate-300">
            Explore updates, templates, and how-to guides so you can prove every Google Maps move in dollars.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="flex h-full flex-col justify-between space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl transition hover:border-emerald-300/70"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.4em] text-slate-500">
                  <span className="rounded-full border border-slate-700 px-3 py-1 text-[0.65rem]">{post.tag}</span>
                  <span className="text-slate-400">{post.readingTime}</span>
                </div>
                <Link href={`/blog/${post.slug}`} className="group inline-flex flex-col gap-1 focus-visible:outline focus-visible:outline-emerald-300">
                  <h2 className="text-2xl font-semibold text-white transition group-hover:text-emerald-300">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-sm text-slate-300">{post.description}</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.4em] text-emerald-200">Highlight</p>
                <p className="text-sm text-slate-200">{post.highlight}</p>
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-2 inline-flex items-center justify-between rounded-full border border-emerald-400/60 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-400/10"
              >
                Read article →
              </Link>
            </article>
          ))}
        </section>

        <BlogFooterCTA />
      </div>
    </main>
  )
}
