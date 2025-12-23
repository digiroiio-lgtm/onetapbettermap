import React from 'react'

export default function ProductHeroVisual() {
  return (
    <div className="relative w-full overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-900 via-slate-900/80 to-slate-950 shadow-[0_30px_80px_rgba(2,6,23,0.7)]">
      <div className="absolute inset-0 bg-grid-animate opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_60%)]" />
      <div className="relative grid gap-6 p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Interactive demo</p>
            <h3 className="text-2xl font-semibold text-white">Visibility control center</h3>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
            <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
            Live scan
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">GeoGrid coverage</p>
            <div className="mt-4 grid grid-cols-7 gap-1">
              {Array.from({ length: 49 }).map((_, index) => {
                const row = Math.floor(index / 7)
                const col = index % 7
                let color = 'bg-slate-800'
                if (row === 3 && col === 3) color = 'bg-emerald-500'
                else if ((row === 2 && col === 3) || (row === 3 && col === 2)) color = 'bg-amber-400'
                else if (row === 4 && col === 4) color = 'bg-rose-500'
                else if (row === 5 || col === 5 || row === 1 || col === 1) color = 'bg-slate-600'
                return (
                  <div
                    key={`${row}-${col}`}
                    className={`h-6 w-6 rounded-md ${color} shadow-[0_4px_10px_rgba(0,0,0,0.25)]`}
                  />
                )
              })}
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-400">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-emerald-200">Strong</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-amber-200">Moderate</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-rose-400/40 bg-rose-400/10 px-3 py-1 text-rose-200">Weak</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Ranking velocity</p>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-300">Current rank</p>
                  <p className="text-3xl font-semibold text-white">#12</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-300">Target rank</p>
                  <p className="text-3xl font-semibold text-emerald-300">#3</p>
                </div>
              </div>
              <div className="mt-4 h-2 w-full rounded-full bg-slate-800">
                <div className="h-2 w-2/3 rounded-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400" />
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Revenue impact</p>
              <p className="mt-2 text-2xl font-semibold text-white">+$3,640</p>
              <p className="text-sm text-slate-400">Projected monthly upside</p>
              <div className="mt-3 flex items-center gap-2 text-xs text-emerald-200">
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                22 calls and 14 customers
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Competitor watchlist</span>
            <span className="text-emerald-300">Updated 2m ago</span>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {['BellaDent', 'UrbanSmile', 'PrimeClinic'].map((name, index) => (
              <div key={name} className="rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-xs text-slate-200">
                <p className="font-semibold text-white">{name}</p>
                <p className="text-slate-400">Rank #{index + 3}</p>
                <p className="text-emerald-300">Trend +{index + 1}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
