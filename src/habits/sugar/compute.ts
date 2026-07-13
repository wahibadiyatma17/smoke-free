import type { SugarData, HabitStats } from '../types'

// A typical sweet drink/snack skipped frees up the ritual around getting it
// (the boba run, the minimarket stop) — a modest estimate vs smoking's
// per-cigarette time.
const MINUTES_RECLAIMED_PER_SERVING = 10

/** Average added sugar per sweet serving (soda ~35g, boba 38–50g,
 *  es teh manis ~20g) — used for the "grams avoided" secondary stat. */
export const GRAMS_SUGAR_PER_SERVING = 30
/** 1 teaspoon of sugar ≈ 4 grams (standard conversion). */
export const GRAMS_PER_TEASPOON = 4

export function getSugarStats(data: SugarData): HabitStats {
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

  const servingsAvoided = Math.max(
    0,
    Math.floor(diffDays * data.drinksPerDay + ((diffHours % 24) * data.drinksPerDay) / 24),
  )
  const moneySaved = servingsAvoided * data.pricePerDrink
  const minutesReclaimed = servingsAvoided * MINUTES_RECLAIMED_PER_SERVING

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
    unitsAvoided: servingsAvoided,
    unitsAvoidedLabel: 'porsi manis',
    timeReclaimedMinutes: minutesReclaimed,
    timeReclaimedHours: Math.floor(minutesReclaimed / 60),
    timeReclaimedDays: Math.floor(minutesReclaimed / 60 / 24),
  }
}
