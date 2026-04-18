'use client'

import { useMemo } from 'react'
import { useUserData } from '@/contexts/UserDataContext'
import { useI18n } from '@/i18n/I18nProvider'
import { getHabitConfig } from './registry'
import type { HabitConfig, HabitData, HabitId, HabitStats, MilestoneStatus, UserProfile } from './types'

export interface ActiveHabitContext {
  profile: UserProfile | null
  habitId: HabitId | null
  habitData: HabitData | null
  config: HabitConfig | null
  stats: HabitStats | null
  milestones: MilestoneStatus[]
  isArchived: boolean
}

export function useActiveHabit(): ActiveHabitContext {
  const { profile } = useUserData()
  const { locale } = useI18n()

  // Memoize on [profile, locale]: when either changes, re-resolve the config
  // and active habit. Stats/milestones stay outside the memo so the
  // per-second ticker on dashboard can re-render fresh clock values.
  const base = useMemo(() => {
    if (!profile || !profile.habits) {
      return { habitId: null, habitData: null, config: null, isArchived: false }
    }
    const habitId = profile.activeHabitId
    const habitData = (profile.habits as Record<string, HabitData | undefined>)[habitId] ?? null
    const config = getHabitConfig(habitId, locale) ?? null
    return {
      habitId,
      habitData: habitData && config ? habitData : null,
      config,
      isArchived: !!habitData?.archived,
    }
  }, [profile, locale])

  const stats = base.config && base.habitData ? base.config.compute(base.habitData) : null
  const milestones = base.config && base.habitData ? base.config.getMilestones(base.habitData) : []

  return {
    profile,
    habitId: base.habitId,
    habitData: base.habitData,
    config: base.config,
    stats,
    milestones,
    isArchived: base.isArchived,
  }
}
