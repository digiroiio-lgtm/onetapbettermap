'use client'

export type ActivityRecord = {
  timestamp: number
  type: 'scan' | 'action'
}

/**
 * Computes the number of consecutive weekly intervals with at least one activity.
 * TODO: Replace mock logic with backend activity aggregation once available.
 */
export function computeWeeklyStreak(records: ActivityRecord[], now = Date.now()) {
  const weeks = 6
  const msPerWeek = 7 * 24 * 60 * 60 * 1000
  let streak = 0

  for (let weekIndex = 0; weekIndex < weeks; weekIndex += 1) {
    const weekStart = now - msPerWeek * (weekIndex + 1)
    const weekEnd = now - msPerWeek * weekIndex
    const hasActivity = records.some(
      (record) => record.timestamp >= weekStart && record.timestamp < weekEnd,
    )

    if (hasActivity) {
      streak += 1
    } else {
      break
    }
  }

  return streak
}

/**
 * Determines whether the streak should reset (no scans/actions for 7+ full days).
 */
export function shouldResetStreak(lastActivityTimestamp: number | null, now = Date.now()) {
  if (!lastActivityTimestamp) {
    return true
  }

  const msPerDay = 24 * 60 * 60 * 1000
  const daysSince = (now - lastActivityTimestamp) / msPerDay
  return daysSince >= 7
}

/**
 * TODO: Add grace messaging that surfaces when shouldResetStreak returns true but the user still can act.
 */
