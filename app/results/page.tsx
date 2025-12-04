'use client'

import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import Link from 'next/link'
import { 
  generateMockHeatmap, 
  generateMockCompetitors, 
  calculateVisibilityScore,
  mockChecklist,
  type HeatmapCell 
} from '@/lib/mockData'

function Heatmap({ data }: { data: HeatmapCell[][] }) {
  return (
    <div className="grid grid-cols-7 gap-2 max-w-2xl mx-auto">
      {data.map((row, rowIndex) => (
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`
              aspect-square rounded-lg flex items-center justify-center font-semibold text-sm
              ${cell.color === 'green' ? 'bg-green-500 text-white' : ''}
              ${cell.color === 'yellow' ? 'bg-yellow-400 text-gray-900' : ''}
              ${cell.color === 'red' ? 'bg-red-500 text-white' : ''}
              transition-transform hover:scale-110
            `}
          >
            {cell.rank}
          </div>
        ))
      ))}
    </div>
  )
}

export default function ResultsPage() {
  const searchParams = useSearchParams()
  
  const businessName = searchParams.get('businessName') || 'Your Business'
  const city = searchParams.get('city') || 'Your City'
  const keyword = searchParams.get('keyword') || 'dentist near me'
  
  // Generate mock data (memoized to avoid regeneration on re-renders)
  const heatmapData = useMemo(() => generateMockHeatmap(), [])
  const competitors = useMemo(() => generateMockCompetitors(), [])
  const visibilityScore = useMemo(() => calculateVisibilityScore(heatmapData), [heatmapData])
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Your Map Visibility Report
          </h1>
          <p className="text-xl text-gray-600">
            <span className="font-semibold">{businessName}</span> in {city}
          </p>
          <p className="text-gray-500 mt-1">Keyword: "{keyword}"</p>
        </div>
        
        {/* Visibility Score */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Visibility Score
            </h2>
            <div className="relative inline-block">
              <svg className="transform -rotate-90 w-40 h-40">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#007AFF"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${(visibilityScore / 100) * 440} 440`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div>
                  <div className="text-5xl font-bold text-gray-900">{visibilityScore}</div>
                  <div className="text-gray-500 text-sm">/100</div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-gray-600">
              {visibilityScore >= 80 && "Excellent! Your business has strong map visibility."}
              {visibilityScore >= 60 && visibilityScore < 80 && "Good visibility, but there's room for improvement."}
              {visibilityScore < 60 && "There's significant opportunity to boost your visibility."}
            </p>
          </div>
        </div>
        
        {/* Heatmap */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
            7×7 Visibility Heatmap
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Your ranking across 49 points around your business location
          </p>
          
          <Heatmap data={heatmapData} />
          
          <div className="flex justify-center gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-gray-700">Rank 1-3</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-400 rounded"></div>
              <span className="text-gray-700">Rank 4-7</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-gray-700">Rank 8+</span>
            </div>
          </div>
        </div>
        
        {/* Competitors */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Top 3 Competitors
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Rank</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Business Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Rating</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Reviews</th>
                </tr>
              </thead>
              <tbody>
                {competitors.map((competitor) => (
                  <tr key={competitor.rank} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-primary/10 text-primary font-bold rounded-full">
                        {competitor.rank}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-900">{competitor.name}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="font-medium">{competitor.rating}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{competitor.reviews} reviews</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Action Checklist */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Recommended Actions
          </h2>
          <p className="text-gray-600 mb-6">
            Complete these tasks to improve your Google Maps ranking
          </p>
          
          <div className="space-y-3">
            {mockChecklist.map((item) => (
              <div key={item.id} className="flex items-start gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="mt-1">
                  <div className="w-5 h-5 border-2 border-gray-300 rounded"></div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">{item.text}</p>
                </div>
                <span className={`
                  px-3 py-1 rounded-full text-xs font-semibold
                  ${item.impact === 'High' ? 'bg-red-100 text-red-700' : ''}
                  ${item.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700' : ''}
                  ${item.impact === 'Low' ? 'bg-green-100 text-green-700' : ''}
                `}>
                  {item.impact} Impact
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-3">
            Want the Full Report?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Get detailed insights, competitor analysis, and personalized recommendations
          </p>
          <button
            disabled
            className="bg-white text-primary font-semibold px-8 py-4 rounded-full text-lg opacity-50 cursor-not-allowed"
          >
            Get Full Report (Coming Soon)
          </button>
        </div>
        
        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="text-primary hover:text-blue-600 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
