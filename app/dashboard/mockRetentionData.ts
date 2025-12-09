'use client'

export type HabitHeaderData = {
  streakWeeks: number
  visibilityPoints: number
  nextMilestonePoints: number
  weeklyGainPercent: number
}

export type WeeklyWin = {
  label: string
  value: string
  subtext: string
}

export type WeeklyTimelineItem = {
  weekLabel: string
  scanDone: boolean
  weeklyChangePercent: number
}

export type NextMilestone = {
  label: string
  detail: string
}

export type RetentionSectionData = {
  habitHeader: HabitHeaderData
  weeklyWins: WeeklyWin[]
  timeline: WeeklyTimelineItem[]
  milestones: NextMilestone[]
}

export const mockRetentionData: RetentionSectionData = {
  habitHeader: {
    streakWeeks: 4,
    visibilityPoints: 1240,
    nextMilestonePoints: 1500,
    weeklyGainPercent: 12,
  },
  weeklyWins: [
    {
      label: 'Keywords Improved This Week',
      value: '8',
      subtext: 'moved up on Maps',
    },
    {
      label: 'Average Rank Change',
      value: '+1.7',
      subtext: 'average positions per keyword',
    },
    {
      label: 'Reviews Responded',
      value: '5',
      subtext: 'Google reviews replied this week',
    },
  ],
  timeline: [
    { weekLabel: 'W49', scanDone: true, weeklyChangePercent: 4 },
    { weekLabel: 'W48', scanDone: true, weeklyChangePercent: 3 },
    { weekLabel: 'W47', scanDone: true, weeklyChangePercent: -1 },
    { weekLabel: 'W46', scanDone: false, weeklyChangePercent: 0 },
    { weekLabel: 'W45', scanDone: true, weeklyChangePercent: 6 },
    { weekLabel: 'W44', scanDone: true, weeklyChangePercent: 2 },
  ],
  milestones: [
    { label: '5-week streak', detail: 'Local Pro' },
    { label: '2,000 XP', detail: 'Priority Support' },
    { label: '10 keywords in Top 3', detail: 'Visibility Badge' },
  ],
}
