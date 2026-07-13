'use client'

import { useCallback, useMemo } from 'react'
import { useUserData } from '@/contexts/UserDataContext'
import type { GamificationState } from '@/habits/types'
import {
  defaultGamification,
  computeCheckIn,
  levelForXp,
  progressWithinLevel,
  tierForLevel,
  xpToNext,
  xpForLevel,
  XP_REWARDS,
  type Tier,
} from './xp'
import { pickDailyQuests } from './quests'

/** Local 'YYYY-MM-DD'. */
function dayKey(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
function monthKey(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}
/** Whole-day difference between two 'YYYY-MM-DD' keys (b - a). */
function dayDiff(a: string, b: string): number {
  const [ay, am, ad] = a.split('-').map(Number)
  const [by, bm, bd] = b.split('-').map(Number)
  const ta = Date.UTC(ay, am - 1, ad)
  const tb = Date.UTC(by, bm - 1, bd)
  return Math.round((tb - ta) / 86400000)
}

export interface CheckInResult {
  xpGained: number
  leveledUp: boolean
  newLevel: number
  newTier: Tier | null // non-null when the tier changed
  streak: number
  streakMilestone: number | null
}

export interface GamificationApi {
  state: GamificationState
  tier: Tier
  level: number
  xpInto: number
  xpNeeded: number
  xpRatio: number
  needsCheckInToday: boolean
  checkedInToday: boolean
  todayQuestsDone: string[]
  checkIn: () => Promise<CheckInResult>
  completeQuest: (id: string) => Promise<{ xpGained: number; leveledUp: boolean; newLevel: number }>
  awardXp: (amount: number) => Promise<{ leveledUp: boolean; newLevel: number; newTier: Tier | null }>
}

export function useGamification(): GamificationApi | null {
  const { profile, updateProfile } = useUserData()

  const state = useMemo<GamificationState>(
    () => ({ ...defaultGamification(), ...(profile?.gamification ?? {}) }),
    [profile?.gamification],
  )

  const today = dayKey()
  const checkedInToday = state.lastCheckInDate === today

  // Reset today's quest tracking if the stored quest day is stale.
  const todayQuestsDone = state.questDate === today ? state.questsDone : []

  const persist = useCallback(
    (next: GamificationState) => updateProfile({ gamification: next }),
    [updateProfile],
  )

  const checkIn = useCallback(async (): Promise<CheckInResult> => {
    const now = new Date()
    const t = dayKey(now)

    if (state.lastCheckInDate === t) {
      // Already checked in — idempotent no-op result.
      const lvl = levelForXp(state.xp)
      return { xpGained: 0, leveledUp: false, newLevel: lvl, newTier: null, streak: state.checkInStreak, streakMilestone: null }
    }

    const gap = state.lastCheckInDate ? dayDiff(state.lastCheckInDate, t) : 0
    const bonus = Math.floor(Math.random() * (XP_REWARDS.checkInBonusMax + 1))
    const c = computeCheckIn(state, t, monthKey(now), gap, bonus)
    await persist(c.next)

    return {
      xpGained: c.xpGained,
      leveledUp: c.leveledUp,
      newLevel: c.newLevel,
      newTier: c.tierChanged ? tierForLevel(c.newLevel) : null,
      streak: c.streak,
      streakMilestone: c.streakMilestone,
    }
  }, [state, persist])

  const completeQuest = useCallback(
    async (id: string) => {
      const t = dayKey()
      const prevLevel = levelForXp(state.xp)
      const already = state.questDate === t && state.questsDone.includes(id)
      if (already) return { xpGained: 0, leveledUp: false, newLevel: prevLevel }

      const questsDone = state.questDate === t ? [...state.questsDone, id] : [id]
      const xpGained = XP_REWARDS.quest
      const xp = state.xp + xpGained
      const newLevel = levelForXp(xp)
      await persist({ ...state, xp, level: newLevel, questDate: t, questsDone })
      return { xpGained, leveledUp: newLevel > prevLevel, newLevel }
    },
    [state, persist],
  )

  const awardXp = useCallback(
    async (amount: number) => {
      const prevLevel = levelForXp(state.xp)
      const prevTier = tierForLevel(prevLevel)
      const xp = state.xp + Math.max(0, amount)
      const newLevel = levelForXp(xp)
      await persist({ ...state, xp, level: newLevel })
      const newTier = tierForLevel(newLevel)
      return {
        leveledUp: newLevel > prevLevel,
        newLevel,
        newTier: newTier.minLevel !== prevTier.minLevel ? newTier : null,
      }
    },
    [state, persist],
  )

  if (!profile) return null

  const prog = progressWithinLevel(state.xp)
  return {
    state,
    tier: tierForLevel(prog.level),
    level: prog.level,
    xpInto: prog.into,
    xpNeeded: prog.needed,
    xpRatio: prog.ratio,
    needsCheckInToday: !checkedInToday,
    checkedInToday,
    todayQuestsDone,
    checkIn,
    completeQuest,
    awardXp,
  }
}

// Re-export helpers used by UI components.
export { pickDailyQuests, xpToNext, xpForLevel }
