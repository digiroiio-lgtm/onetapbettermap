// Mock data generator for the results page

export interface HeatmapCell {
  rank: number
  color: 'green' | 'yellow' | 'red'
}

export interface Competitor {
  name: string
  rating: number
  reviews: number
  rank: number
}

export function generateMockHeatmap(): HeatmapCell[][] {
  const heatmap: HeatmapCell[][] = []
  
  // Generate 7x7 grid with mock ranking data
  for (let row = 0; row < 7; row++) {
    const rowData: HeatmapCell[] = []
    for (let col = 0; col < 7; col++) {
      // Center cell (3,3) gets better ranking
      const distanceFromCenter = Math.abs(row - 3) + Math.abs(col - 3)
      
      // Generate rank based on distance from center
      let rank: number
      if (distanceFromCenter <= 1) {
        rank = Math.floor(Math.random() * 3) + 1 // 1-3
      } else if (distanceFromCenter <= 3) {
        rank = Math.floor(Math.random() * 4) + 4 // 4-7
      } else {
        rank = Math.floor(Math.random() * 12) + 8 // 8-20
      }
      
      // Determine color based on rank
      let color: 'green' | 'yellow' | 'red'
      if (rank <= 3) {
        color = 'green'
      } else if (rank <= 7) {
        color = 'yellow'
      } else {
        color = 'red'
      }
      
      rowData.push({ rank, color })
    }
    heatmap.push(rowData)
  }
  
  return heatmap
}

export function generateMockCompetitors(): Competitor[] {
  return [
    {
      name: "Premier Dental Group",
      rating: 4.8,
      reviews: 342,
      rank: 1
    },
    {
      name: "Bright Smile Dentistry",
      rating: 4.7,
      reviews: 289,
      rank: 2
    },
    {
      name: "City Dental Care",
      rating: 4.6,
      reviews: 215,
      rank: 3
    }
  ]
}

export function calculateVisibilityScore(heatmap: HeatmapCell[][]): number {
  let totalScore = 0
  let cellCount = 0
  
  for (const row of heatmap) {
    for (const cell of row) {
      // Score based on rank: better rank = higher score
      // Using same algorithm as real grid scanner
      if (cell.rank <= 3) {
        totalScore += 100
      } else if (cell.rank <= 7) {
        totalScore += 75
      } else if (cell.rank <= 12) {
        totalScore += 50
      } else if (cell.rank <= 16) {
        totalScore += 25
      } else {
        totalScore += 10
      }
      cellCount++
    }
  }
  
  return Math.round(totalScore / cellCount)
}

export const mockChecklist = [
  {
    id: 1,
    text: "Upload 12 new photos",
    impact: "High"
  },
  {
    id: 2,
    text: "Add category: 'Cosmetic Dentist'",
    impact: "Medium"
  },
  {
    id: 3,
    text: "Request 7 new Google reviews",
    impact: "High"
  },
  {
    id: 4,
    text: "Update business hours for holidays",
    impact: "Low"
  }
]
