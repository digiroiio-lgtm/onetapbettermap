import React from "react";

export default function DashboardDemoVisual() {
  return (
    <div
      className="relative w-full aspect-[16/9] bg-gradient-to-br from-[#181f2a] to-[#232a36] rounded-2xl shadow-xl p-8 flex flex-col gap-6"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Grid-based layout */}
      <div className="grid grid-cols-12 gap-6 h-full">
        {/* Visibility Score (Top Left) */}
        <div className="col-span-3 flex flex-col items-start justify-start bg-[#232a36e6] rounded-xl shadow p-6 h-[220px]">
          <div className="text-gray-300 text-lg font-medium mb-2">Visibility Score</div>
          <div className="flex items-center gap-4">
            <span className="text-5xl font-bold text-green-400">74</span>
            <span className="text-xl text-gray-400">/ 100</span>
          </div>
          <div className="flex items-center mt-2">
            <span className="text-green-400 text-sm font-semibold">+5 this week</span>
          </div>
          {/* Progress ring */}
          <div className="mt-4">
            <svg width="54" height="54">
              <circle cx="27" cy="27" r="22" fill="none" stroke="#334155" strokeWidth="6" />
              <circle
                cx="27"
                cy="27"
                r="22"
                fill="none"
                stroke="#22c55e"
                strokeWidth="6"
                strokeDasharray={2 * Math.PI * 22}
                strokeDashoffset={2 * Math.PI * 22 * (1 - 0.74)}
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
        {/* GeoGrid Heatmap (Center) */}
        <div className="col-span-5 flex flex-col items-center justify-center">
          <div className="text-gray-300 text-lg font-medium mb-2">GeoGrid Coverage</div>
          <div
            className="grid grid-cols-7 grid-rows-7 gap-1"
            style={{
              transform: "perspective(900px) rotateX(10deg) rotateY(-6deg)",
              opacity: 0.98,
            }}
          >
            {[...Array(49)].map((_, i) => {
              const row = Math.floor(i / 7);
              const col = i % 7;
              let color = "#232a36";
              if (row === 3 && col === 3) color = "#22c55e";
              else if ((row === 2 && col === 3) || (row === 3 && col === 2)) color = "#fde047";
              else if (row === 4 && col === 4) color = "#f87171";
              else if (row === 5 || col === 5 || row === 1 || col === 1) color = "#6b7280";
              else color = "#334155";
              return (
                <div
                  key={i}
                  className="rounded-lg"
                  style={{
                    background: color,
                    minWidth: 22,
                    minHeight: 22,
                    boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
                    opacity: 0.92,
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  {/* Highlighted zones */}
                  {row === 2 && col === 3 && (
                    <div className="absolute left-0 top-0 ml-1 mt-1 bg-[#232a36cc] rounded px-1 py-0.5 text-[10px] text-gray-300 shadow">
                      You — #12
                    </div>
                  )}
                  {row === 3 && col === 2 && (
                    <div className="absolute right-0 bottom-0 mr-1 mb-1 bg-[#232a36cc] rounded px-1 py-0.5 text-[10px] text-emerald-300 font-semibold shadow">
                      Competitor — #3
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {/* Competitor Movement Panel (Right Side) */}
        <div className="col-span-4 flex flex-col items-start justify-start bg-[#232a36e6] rounded-xl shadow p-6 h-[320px]">
          <div className="text-gray-300 text-lg font-medium mb-3">Competitor Movement</div>
          <table className="w-full text-sm text-gray-300">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left font-normal pb-1">Competitor</th>
                <th className="text-left font-normal pb-1">Zones</th>
                <th className="text-left font-normal pb-1">Rank</th>
                <th className="text-left font-normal pb-1">Trend</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>BellaDent</td>
                <td>41/49</td>
                <td>#3</td>
                <td className="text-green-400 font-bold">↑</td>
              </tr>
              <tr>
                <td>UrbanSmile</td>
                <td>32/49</td>
                <td>#11</td>
                <td className="text-red-400 font-bold">↓</td>
              </tr>
              <tr>
                <td>PrimeClinic</td>
                <td>24/49</td>
                <td>#16</td>
                <td className="text-green-400 font-bold">↑</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Revenue Forecaster Card (Bottom Right) */}
        <div className="absolute bottom-8 right-8 bg-[#232a36e6] rounded-xl px-6 py-5 shadow-lg text-sm text-gray-200 border border-white/5" style={{ minWidth: 240 }}>
          <div className="font-medium text-gray-300 mb-1" style={{ fontSize: 15 }}>
            Revenue Impact Preview
          </div>
          <div className="flex gap-4 mb-2">
            <div className="text-gray-400">Current Rank: <span className="font-semibold text-white">#12</span></div>
            <div className="text-gray-400">Target: <span className="font-semibold text-green-400">#3</span></div>
          </div>
          <div className="text-green-400 font-semibold" style={{ fontSize: 17 }}>
            +22 calls / month
          </div>
          <div className="text-amber-300 font-semibold" style={{ fontSize: 17 }}>
            ≈ 14 customers
          </div>
          <div className="text-emerald-300 font-semibold" style={{ fontSize: 17 }}>
            +$3,640 monthly revenue
          </div>
          <div className="text-xs text-gray-400 mt-2">
            Forecast based on CTR & conversion benchmarks
          </div>
        </div>
      </div>
    </div>
  );
}
