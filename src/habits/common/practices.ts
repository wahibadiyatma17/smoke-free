import type { Locale } from '@/i18n/types'

export interface DailyPractice {
  cue: string
  context: string
  emoji: string
}

/** Deterministic daily pick — same practice on the same calendar day. */
export function pickDailyPractice(list: DailyPractice[], date = new Date()): DailyPractice {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date.getTime() - start.getTime()
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24))
  return list[dayOfYear % list.length]
}

/** Resolve today's practice from a per-locale practice map. */
export function getDailyPracticeFrom(
  map: Record<Locale, DailyPractice[]>,
  locale: Locale,
  date = new Date(),
): DailyPractice {
  return pickDailyPractice(map[locale] ?? map.id, date)
}
