import React from "react";

export default function ProductHeroVisual() {
  return (
    <div
      className="relative w-full aspect-[16/9] bg-gradient-to-br from-[#181f2a] to-[#232a36] rounded-2xl shadow-xl flex items-center justify-center overflow-hidden"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* GeoGrid Map */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="grid grid-cols-7 grid-rows-7 gap-1"
          style={{
            transform: "perspective(900px) rotateX(12deg) rotateY(-8deg)",
            opacity: 0.98,
          }}
        >
          {[...Array(49)].map((_, i) => {
            // Color logic: center = green, edges = red/grey, some yellow
            const row = Math.floor(i / 7);
            const col = i % 7;
            let color = "#232a36";
            if (row === 3 && col === 3) color = "#22c55e"; // center, strong
            else if ((row === 2 && col === 3) || (row === 3 && col === 2)) color = "#fde047"; // yellow
            else if (row === 4 && col === 4) color = "#f87171"; // red
            else if (row === 5 || col === 5 || row === 1 || col === 1) color = "#6b7280"; // grey
            else color = "#334155";
            return (
              <div
                key={i}
                className="rounded-lg"
                style={{
                  background: color,
                  minWidth: 28,
                  minHeight: 28,
                  boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
                  opacity: 0.92,
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {/* Highlighted zones */}
                {row === 2 && col === 3 && (
                  <div className="absolute left-0 top-0 ml-2 mt-2 bg-[#232a36cc] rounded px-2 py-1 text-xs text-gray-300 shadow">
                    You — Rank #12
                  </div>
                )}
                {row === 3 && col === 2 && (
                  <div className="absolute right-0 bottom-0 mr-2 mb-2 bg-[#232a36cc] rounded px-2 py-1 text-xs text-emerald-300 font-semibold shadow">
                    Competitor — Rank #3
                  </div>
                )}
                {/* Competitor movement arrow */}
                {row === 3 && col === 2 && (
                  <div className="absolute right-2 bottom-8 flex items-center">
                    <svg width="18" height="18" viewBox="0 0 18 18">
                      <path
                        d="M9 14V6M9 6l-3 3M9 6l3 3"
                        stroke="#22c55e"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ opacity: 0.7 }}
                      />
                    </svg>
                    <span className="ml-1 text-xs text-emerald-400 opacity-80">
                      Competitor rising ↑
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Gridlines */}
      <div className="absolute inset-0 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 700 400">
          {[...Array(8)].map((_, i) => (
            <line
              key={"h" + i}
              x1={0}
              y1={(400 / 7) * i}
              x2={700}
              y2={(400 / 7) * i}
              stroke="white"
              strokeOpacity="0.08"
              strokeWidth="1"
            />
          ))}
          {[...Array(8)].map((_, i) => (
            <line
              key={"v" + i}
              x1={(700 / 7) * i}
              y1={0}
              x2={(700 / 7) * i}
              y2={400}
              stroke="white"
              strokeOpacity="0.08"
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>
      {/* Revenue Context Card */}
      <div className="absolute top-6 right-8 bg-[#232a36e6] rounded-xl px-4 py-3 shadow-lg text-sm text-gray-200 border border-white/5" style={{ minWidth: 180 }}>
        <div className="font-medium text-gray-300 mb-1" style={{ fontSize: 13 }}>
          Potential impact:
        </div>
        <div className="text-green-400 font-semibold" style={{ fontSize: 15 }}>
          +22 calls / month
        </div>
        <div className="text-amber-300 font-semibold" style={{ fontSize: 15 }}>
          +$3,640 in missed revenue
        </div>
      </div>
    </div>
  );
}
