import type { Locale } from '@/i18n/types'
import type { GamificationState } from '@/habits/types'

/**
 * XP curve — hybrid ramp. Each level costs a bit more than the last:
 *   xpToNext(L) = round(80 * L^1.4)
 * Gentle early (L1→2 = 80), demanding later, without an unreachable wall.
 */
export function xpToNext(level: number): number {
  return Math.round(80 * Math.pow(Math.max(1, level), 1.4))
}

/** Cumulative XP required to *reach* a given level (level 1 = 0). */
export function xpForLevel(level: number): number {
  let total = 0
  for (let l = 1; l < level; l++) total += xpToNext(l)
  return total
}

/** Resolve level from total XP (level 1 at 0 XP). */
export function levelForXp(xp: number): number {
  let level = 1
  let remaining = xp
  while (remaining >= xpToNext(level)) {
    remaining -= xpToNext(level)
    level++
    if (level > 999) break // safety
  }
  return level
}

/** Progress within the current level: { into, needed, ratio 0..1 }. */
export function progressWithinLevel(xp: number): { into: number; needed: number; ratio: number; level: number } {
  const level = levelForXp(xp)
  const into = xp - xpForLevel(level)
  const needed = xpToNext(level)
  return { into, needed, ratio: needed > 0 ? Math.min(1, into / needed) : 0, level }
}

export interface Tier {
  emoji: string
  name: Record<Locale, string>
  minLevel: number
}

/**
 * Nature growth ladder — the plant/tree companion. Adapted from recovery
 * "sobriety garden" precedents. The tier is derived from level, so it grows
 * as the user earns XP by showing up.
 */
export const TIERS: Tier[] = [
  { minLevel: 1,  emoji: '🌰', name: { id: 'Benih',          en: 'Seed' } },
  { minLevel: 2,  emoji: '🌱', name: { id: 'Tunas',          en: 'Sprout' } },
  { minLevel: 4,  emoji: '🌿', name: { id: 'Semai',          en: 'Seedling' } },
  { minLevel: 6,  emoji: '☘️', name: { id: 'Bibit',          en: 'Young Shoot' } },
  { minLevel: 9,  emoji: '🪴', name: { id: 'Pohon Muda',     en: 'Young Plant' } },
  { minLevel: 13, emoji: '🌳', name: { id: 'Pohon',          en: 'Tree' } },
  { minLevel: 18, emoji: '🌸', name: { id: 'Pohon Berbunga', en: 'Flowering Tree' } },
  { minLevel: 25, emoji: '🌳', name: { id: 'Pohon Rindang',  en: 'Lush Tree' } },
  { minLevel: 35, emoji: '🌲', name: { id: 'Pohon Purba',    en: 'Ancient Tree' } },
]

export function tierForLevel(level: number): Tier {
  let tier = TIERS[0]
  for (const t of TIERS) if (level >= t.minLevel) tier = t
  return tier
}

/** XP award amounts per meaningful action. */
export const XP_REWARDS = {
  checkIn: 15,
  checkInBonusMax: 5, // variable 0..5 on top of checkIn
  quest: 10,
  cravingResisted: 20,
  milestone: 50,
} as const

/** Streak milestones that earn extra celebration (not extra punishment). */
export const STREAK_MILESTONES = [7, 30, 90, 180, 365]

/** Grace freezes refilled at the start of each month. */
export const MONTHLY_FREEZES = 2

export interface CheckInComputation {
  next: GamificationState
  xpGained: number
  leveledUp: boolean
  newLevel: number
  tierChanged: boolean
  streak: number
  streakMilestone: number | null
}

/**
 * Pure check-in state transition — the core of the gamification loop, kept
 * side-effect-free so it can be unit-tested exhaustively.
 *
 * Relapse-safe by construction: XP, level, and longest-streak never decrease.
 * A gap of one missed day is bridged by a grace freeze if available; larger
 * gaps reset the *active* streak to 1 but preserve all history.
 *
 * @param today    'YYYY-MM-DD' local key for now
 * @param month    'YYYY-MM' local key for now
 * @param gapDays  whole days since lastCheckInDate (ignored if none)
 * @param bonus    variable XP bonus (0..checkInBonusMax), injected for determinism
 */
export function computeCheckIn(
  state: GamificationState,
  today: string,
  month: string,
  gapDays: number,
  bonus: number,
): CheckInComputation {
  const prevLevel = levelForXp(state.xp)
  const prevTier = tierForLevel(prevLevel)

  // Refill freezes on month rollover.
  let freezes = state.freezesRemaining
  let freezeMonth = state.freezeMonth
  if (freezeMonth !== month) {
    freezes = MONTHLY_FREEZES
    freezeMonth = month
  }

  let streak: number
  if (!state.lastCheckInDate) {
    streak = 1
  } else {
    const missed = gapDays - 1
    if (missed <= 0) {
      streak = state.checkInStreak + 1
    } else if (missed <= freezes) {
      freezes -= missed
      streak = state.checkInStreak + 1
    } else {
      streak = 1
    }
  }

  const xpGained = XP_REWARDS.checkIn + Math.max(0, bonus)
  const xp = state.xp + xpGained
  const newLevel = levelForXp(xp)
  const longest = Math.max(state.longestCheckInStreak, streak)
  const questsDone = state.questDate === today
    ? Array.from(new Set([...state.questsDone, 'checkin']))
    : ['checkin']

  const next: GamificationState = {
    ...state,
    xp,
    level: newLevel,
    lastCheckInDate: today,
    checkInStreak: streak,
    longestCheckInStreak: longest,
    totalCheckIns: state.totalCheckIns + 1,
    freezesRemaining: freezes,
    freezeMonth,
    questDate: today,
    questsDone,
  }

  return {
    next,
    xpGained,
    leveledUp: newLevel > prevLevel,
    newLevel,
    tierChanged: tierForLevel(newLevel).minLevel !== prevTier.minLevel,
    streak,
    streakMilestone: STREAK_MILESTONES.includes(streak) ? streak : null,
  }
}

export function defaultGamification(): GamificationState {
  return {
    xp: 0,
    level: 1,
    lastCheckInDate: null,
    checkInStreak: 0,
    longestCheckInStreak: 0,
    totalCheckIns: 0,
    freezesRemaining: MONTHLY_FREEZES,
    freezeMonth: '',
    questDate: null,
    questsDone: [],
  }
}
