import type { SmokingData, HabitStats } from '../types'

export function getSmokingStats(data: SmokingData): HabitStats {
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

  const cigarettesAvoided = Math.max(
    0,
    Math.floor(diffDays * data.cigarettesPerDay + ((diffHours % 24) * data.cigarettesPerDay) / 24),
  )
  const packsAvoided = cigarettesAvoided / data.cigarettesPerPack
  const moneySaved = packsAvoided * data.pricePerPack
  const minutesLife = cigarettesAvoided * 11

  return {
    diffMs,
    diffSeconds,
    diffMinutes,
    diffHours,
    diffDays,
    diffWeeks,
    diffMonths,
    diffYears,
    moneySaved,
    unitsAvoided: cigarettesAvoided,
    unitsAvoidedLabel: 'batang',
    timeReclaimedMinutes: minutesLife,
    timeReclaimedHours: Math.floor(minutesLife / 60),
    timeReclaimedDays: Math.floor(minutesLife / 60 / 24),
  }
}
