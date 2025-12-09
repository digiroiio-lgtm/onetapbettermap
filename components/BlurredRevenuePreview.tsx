import Link from 'next/link'

type BlurredRevenuePreviewProps = {
  title?: string
  message?: string
  ctaHref?: string
}

export default function BlurredRevenuePreview({
  title = 'Unlock Revenue Predictions',
  message = 'Upgrade to Growth to view your revenue impact from ranking improvements.',
  ctaHref = '/upgrade',
}: BlurredRevenuePreviewProps) {
  return (
    <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6">
      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0f172a]/70 p-8 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/60 backdrop-blur-[6px]" aria-hidden />
        <div className="relative space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#3b82f6]/30 bg-[#3b82f6]/10 px-4 py-1 text-xs font-semibold text-[#3b82f6]">
            <span className="inline-flex h-5 items-center justify-center rounded-full bg-[#3b82f6] px-2 text-[10px] text-white">
              NEW
            </span>
            Revenue Forecaster
          </div>
          <h3 className="text-2xl font-semibold text-white">{title}</h3>
          <p className="text-sm text-slate-300">{message}</p>
          <div className="mx-auto mt-6 h-24 max-w-md rounded-2xl border border-white/10 bg-white/5 blur-sm" />
          <Link
            href={ctaHref}
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white/90"
          >
            Upgrade to Growth →
          </Link>
        </div>
      </div>
    </div>
  )
}
