import React from "react";

export default function AbstractProcessCard() {
  return (
    <div className="w-full max-w-xl mx-auto p-8 rounded-3xl bg-gradient-to-br from-[#181f2a] to-[#232a36] shadow-2xl flex flex-col items-center justify-center relative" style={{ minHeight: 320 }}>
      {/* Curved vertical flow */}
      <svg width="220" height="260" viewBox="0 0 220 260" className="absolute left-1/2 -translate-x-1/2 top-8 pointer-events-none">
        {/* Dotted flow line */}
        <path
          d="M110 20 Q130 80 110 140 Q90 200 110 240"
          stroke="#22c55e"
          strokeWidth="3"
          strokeDasharray="6,8"
          fill="none"
          opacity="0.25"
        />
        {/* Nodes */}
        {[20, 80, 140, 200, 240].map((y, i) => (
          <rect
            key={i}
            x={80}
            y={y - 18}
            rx={18}
            ry={18}
            width={60}
            height={36}
            fill={i === 0 ? "#22c55e" : "#334155"}
            opacity={i === 0 ? 0.9 : 0.7}
            style={{
              filter: i === 0 ? "drop-shadow(0 0 12px #22c55e88)" : "drop-shadow(0 2px 8px #0004)",
            }}
          />
        ))}
      </svg>
      {/* Card foreground for depth */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full pt-2">
        {/* Empty space for illustration */}
      </div>
    </div>
  );
}
