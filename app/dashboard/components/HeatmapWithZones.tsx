import type { HeatmapCell } from '../types'

type Props = {
  heatmap: HeatmapCell[]
  onSelectCell: (cell: HeatmapCell) => void
  selectedCellId?: string | null
}

const getColorClass = (rank: number) => {
  if (rank <= 3) return 'bg-emerald-500/80'
  if (rank <= 10) return 'bg-emerald-400/80'
  if (rank <= 20) return 'bg-amber-400/80'
  if (rank <= 40) return 'bg-orange-500/80'
  return 'bg-rose-600/80'
}

export default function HeatmapWithZones({ heatmap, onSelectCell, selectedCellId }: Props) {
  return (
    <section className="rounded-[28px] border border-slate-800 bg-slate-900/70 px-6 py-6 shadow-xl shadow-black/40">
      <div className="flex flex-col gap-1">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-500">GeoGrid heatmap</p>
        <h2 className="text-2xl font-semibold text-white">Zone-level revenue detail</h2>
        <p className="text-sm text-slate-400">Tap any square to see calls, revenue, and trend.</p>
      </div>

      <div className="mt-6 grid grid-cols-7 gap-2">
        {heatmap.map((cell) => {
          const selected = selectedCellId === cell.id
          return (
            <button
              key={cell.id}
              type="button"
              onClick={() => onSelectCell(cell)}
              className={`aspect-square rounded-2xl border px-2 py-2 text-left text-[10px] font-semibold leading-tight transition focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                selected ? 'border-emerald-400 bg-slate-800' : 'border-slate-800 bg-slate-900/60 hover:border-white/40'
              }`}
              aria-pressed={selected}
            >
              <div className="flex flex-col gap-1">
                <span className="truncate text-xs text-slate-400">{cell.areaLabel}</span>
                <span className={`text-lg ${getColorClass(cell.rank)} rounded-full px-2 py-1 text-center text-white`}>
                  #{cell.rank}
                </span>
                <span className="text-[10px] text-slate-500">
                  {cell.estCallsPerMonth.toLocaleString()} calls
                </span>
                <span className="text-[10px] text-slate-500">
                  ${cell.estRevenuePerMonth.toLocaleString()} revenue
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                  {cell.trend === 'up' ? '↑' : cell.trend === 'down' ? '↓' : '→'} trend
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
