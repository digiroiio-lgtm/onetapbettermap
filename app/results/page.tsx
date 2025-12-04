'use client'

import { useSearchParams } from 'next/navigation'
import { useMemo, Suspense } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { 
  generateMockHeatmap, 
  generateMockCompetitors, 
  calculateVisibilityScore,
  mockChecklist,
  type HeatmapCell 
} from '@/lib/mockData'

// Dynamic import to avoid SSR issues with Google Maps
const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <p className="text-gray-600">Loading map...</p>
      </div>
    </div>
  )
})

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

function ResultsContent() {
  const searchParams = useSearchParams()
  
  const businessName = searchParams.get('businessName') || 'Your Business'
  const city = searchParams.get('city') || 'Your City'
  const keyword = searchParams.get('keyword') || 'dentist near me'
  
  // Debug log
  console.log('Results page params:', { businessName, city, keyword })
  
  // Generate mock data (memoized to avoid regeneration on re-renders)
  const heatmapData = useMemo(() => generateMockHeatmap(), [])
  const competitors = useMemo(() => generateMockCompetitors(), [])
  const visibilityScore = useMemo(() => calculateVisibilityScore(heatmapData), [heatmapData])
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Your Map Visibility Report
          </h1>
          <p className="text-xl text-gray-600">
            <span className="font-semibold">{businessName}</span> in {city}
          </p>
          <p className="text-gray-500 mt-1">Keyword: "{keyword}"</p>
        </div>
        
        {/* Live Map Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Business Location
            </h2>
          </div>
          <MapComponent 
            businessName={businessName} 
            city={city}
          />
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
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">
              7×7 Visibility Heatmap
            </h2>
          </div>
          <p className="text-gray-600 mb-6 text-center">
            Your ranking across 49 points around your business location
          </p>
          
          <Heatmap data={heatmapData} />
          
          <div className="flex justify-center gap-8 mt-8 text-sm">
            <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
              <div className="w-6 h-6 bg-green-500 rounded-md shadow-sm flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                </svg>
              </div>
              <span className="text-gray-700 font-medium">Rank 1-3</span>
            </div>
            <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg border border-yellow-200">
              <div className="w-6 h-6 bg-yellow-400 rounded-md shadow-sm flex items-center justify-center">
                <span className="text-white text-xs font-bold">!</span>
              </div>
              <span className="text-gray-700 font-medium">Rank 4-7</span>
            </div>
            <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-lg border border-red-200">
              <div className="w-6 h-6 bg-red-500 rounded-md shadow-sm flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </div>
              <span className="text-gray-700 font-medium">Rank 8+</span>
            </div>
          </div>
        </div>
        
        {/* Competitors */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Top 3 Competitors
            </h2>
          </div>
          
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
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z"/>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Recommended Actions
            </h2>
          </div>
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
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-xl p-8 text-center text-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-4 left-4 w-16 h-16 bg-white rounded-full"></div>
            <div className="absolute bottom-4 right-4 w-20 h-20 bg-white rounded-full"></div>
            <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-white rounded-full"></div>
          </div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-3">
              Want the Full Report?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Get detailed insights, competitor analysis, and personalized recommendations
            </p>
            <button
              disabled
              className="bg-white text-primary font-semibold px-8 py-4 rounded-full text-lg opacity-50 cursor-not-allowed inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              Get Full Report (Coming Soon)
            </button>
          </div>
        </div>        {/* Back to Home */}
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

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    }>
      <ResultsContent />
    </Suspense>
  )
}
