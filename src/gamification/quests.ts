import type { Locale } from '@/i18n/types'

export interface Quest {
  id: string
  emoji: string
  label: Record<Locale, string>
}

/**
 * Low-friction daily quests — each completable on a user's worst day.
 * A deterministic set of 3 is chosen per calendar day (see pickDailyQuests),
 * so everyone with the same date sees the same rotation and it can't be
 * re-rolled by reopening the app.
 */
export const QUEST_POOL: Quest[] = [
  { id: 'checkin',   emoji: '🌅', label: { id: 'Check-in harian',            en: 'Daily check-in' } },
  { id: 'water',     emoji: '💧', label: { id: 'Minum segelas air sekarang', en: 'Drink a glass of water now' } },
  { id: 'breathe',   emoji: '🫁', label: { id: 'Napas dalam 60 detik',       en: '60 seconds of deep breathing' } },
  { id: 'read',      emoji: '📖', label: { id: 'Baca satu kartu motivasi',   en: 'Read one motivation card' } },
  { id: 'walk',      emoji: '🚶', label: { id: 'Jalan kaki 5 menit',         en: 'Take a 5-minute walk' } },
  { id: 'fact',      emoji: '💡', label: { id: 'Pelajari satu fakta baru',   en: 'Learn one new fact' } },
  { id: 'gratitude', emoji: '🙏', label: { id: 'Tulis 1 hal yang disyukuri', en: 'Note 1 thing you\'re grateful for' } },
  { id: 'plan',      emoji: '📝', label: { id: 'Siapkan 1 pengganti sehat',  en: 'Prep 1 healthy swap' } },
]

function dayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0)
  return Math.floor((date.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
}

/**
 * Deterministic daily pick of 3 quests. The check-in quest is always first
 * (it's the streak anchor); the other two rotate by day-of-year.
 */
export function pickDailyQuests(date = new Date()): Quest[] {
  const checkin = QUEST_POOL[0]
  const rest = QUEST_POOL.slice(1)
  const d = dayOfYear(date)
  const a = rest[d % rest.length]
  const b = rest[(d * 3 + 1) % rest.length]
  const picks = [checkin, a]
  if (b.id !== a.id) picks.push(b)
  else picks.push(rest[(d * 3 + 2) % rest.length])
  return picks
}
