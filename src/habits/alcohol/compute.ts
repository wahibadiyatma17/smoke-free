import type { AlcoholData, HabitStats } from '../types'

const MINUTES_RECLAIMED_PER_DRINK = 45

export function getAlcoholStats(data: AlcoholData): HabitStats {
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

  const drinksAvoided = Math.max(
    0,
    Math.floor((data.drinksPerWeek * diffDays) / 7 + (data.drinksPerWeek * (diffHours % 24)) / (7 * 24)),
  )
  const moneySaved = drinksAvoided * data.pricePerDrink
  const minutesReclaimed = drinksAvoided * MINUTES_RECLAIMED_PER_DRINK

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
    unitsAvoided: drinksAvoided,
    unitsAvoidedLabel: 'minuman',
    timeReclaimedMinutes: minutesReclaimed,
    timeReclaimedHours: Math.floor(minutesReclaimed / 60),
    timeReclaimedDays: Math.floor(minutesReclaimed / 60 / 24),
  }
}
