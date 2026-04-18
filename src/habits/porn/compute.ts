import type { HabitStats, PornData } from '../types'

/**
 * ~30 minutes per avoided session: typical session + residual distraction
 * & recovery time. Conservative figure from time-use literature; serves as
 * a friendly "time reclaimed" signal rather than a precise claim.
 */
const MINUTES_RECLAIMED_PER_SESSION = 30

export function getPornStats(data: PornData): HabitStats {
  const now = new Date()
  const quitDate = data.quitDate.toDate()
  const diffMs = now.getTime() - quitDate.getTime()
  const diffSeconds = Math.floor(diffMs / 1000)
  const diffMinutes = Math.floor(diffSeconds / 60)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)
  const diffWeeks = Math.floor(diffDays / 7)
  const diffMonths = Math.floor(diffDays / 30)
  const diffYears = Math.floor(diffDays / 365)

  const sessionsAvoided = Math.max(
    0,
    Math.floor(
      (data.sessionsPerWeek * diffDays) / 7 +
      (data.sessionsPerWeek * (diffHours % 24)) / (7 * 24),
    ),
  )
  const minutesReclaimed = sessionsAvoided * MINUTES_RECLAIMED_PER_SESSION

  return {
    diffMs,
    diffSeconds,
    diffMinutes,
    diffHours,
    diffDays,
    diffWeeks,
    diffMonths,
    diffYears,
    moneySaved: 0,
    unitsAvoided: sessionsAvoided,
    unitsAvoidedLabel: 'sesi',
    timeReclaimedMinutes: minutesReclaimed,
    timeReclaimedHours: Math.floor(minutesReclaimed / 60),
    timeReclaimedDays: Math.floor(minutesReclaimed / 60 / 24),
  }
}
