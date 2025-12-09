'use client'

import Link from 'next/link'
import type { GuideSeoConfig } from '@/lib/seo/guidesSeo'

type Props = {
  cfg: GuideSeoConfig
}

export function GuideInternalLinks({ cfg }: Props) {
  return (
    <section className="mt-12 border-t border-white/10 pt-8 space-y-6">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-white">Next steps</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href={cfg.primaryCta.href}
            className="inline-flex items-center rounded-full border border-white/30 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            {cfg.primaryCta.anchorText}
          </Link>
          {cfg.secondaryCta && (
            <Link
              href={cfg.secondaryCta.href}
              className="inline-flex items-center rounded-full border border-white/30 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            >
              {cfg.secondaryCta.anchorText}
            </Link>
          )}
        </div>
      </div>

      {cfg.relatedGuides.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
            Related guides
          </h3>
          <ul className="mt-2 space-y-1 text-sm text-slate-200">
            {cfg.relatedGuides.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-emerald-300 underline-offset-4 hover:underline">
                  {link.anchorText}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {cfg.relatedFeatures.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
            Product features mentioned in this guide
          </h3>
          <ul className="mt-2 space-y-1 text-sm text-slate-200">
            {cfg.relatedFeatures.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-emerald-300 underline-offset-4 hover:underline">
                  {link.anchorText}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {cfg.relatedBlogPosts && cfg.relatedBlogPosts.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
            Deep dives & examples
          </h3>
          <ul className="mt-2 space-y-1 text-sm text-slate-200">
            {cfg.relatedBlogPosts.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-emerald-300 underline-offset-4 hover:underline">
                  {link.anchorText}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {cfg.relatedUseCases && cfg.relatedUseCases.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
            Real-world use cases
          </h3>
          <ul className="mt-2 space-y-1 text-sm text-slate-200">
            {cfg.relatedUseCases.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-emerald-300 underline-offset-4 hover:underline">
                  {link.anchorText}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
