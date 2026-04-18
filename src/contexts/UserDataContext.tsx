'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { Timestamp } from 'firebase/firestore'
import { useAuth } from './AuthContext'
import { getUserProfile, updateUserProfile, updateHabitData as fsUpdateHabitData } from '@/lib/firestore'
import type { HabitData, HabitId, HabitProfiles, UserProfile } from '@/habits/types'
import { normalizeProfile } from '@/habits/migration'

const GUEST_KEY = 'smoke_free_guest_profile'
const ONBOARDING_KEY = 'smoke_free_onboarding_done'

export type LocalProfileInput = {
  displayName: string | null
  email: string | null
  photoURL: string | null
  activeHabitId: HabitId
  habits: HabitProfiles
}

interface UserDataContextType {
  profile: UserProfile | null
  loading: boolean
  firestoreError: string | null
  refreshProfile: () => Promise<void>
  hasCompletedOnboarding: boolean
  saveLocalProfile: (data: LocalProfileInput) => void
  clearLocalProfile: () => void
  updateProfile: (data: Partial<UserProfile>) => Promise<void>
  updateActiveHabitData: (partial: Partial<HabitData>) => Promise<void>
  addHabit: (habitId: HabitId, data: HabitData, setActive?: boolean) => Promise<void>
  setActiveHabit: (habitId: HabitId) => Promise<void>
  archiveHabit: (habitId: HabitId) => Promise<void>
  restoreHabit: (habitId: HabitId) => Promise<void>
}

export class HabitArchiveBlockedError extends Error {
  constructor() {
    super('Minimal satu kebiasaan aktif. Tambah kebiasaan lain dulu sebelum menghentikan yang ini.')
    this.name = 'HabitArchiveBlockedError'
  }
}

const UserDataContext = createContext<UserDataContextType | null>(null)

function serializeHabits(habits: HabitProfiles): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const [id, data] of Object.entries(habits)) {
    if (!data) continue
    const d = data as any
    out[id] = {
      ...d,
      quitDate:
        d.quitDate instanceof Timestamp ? d.quitDate.toDate().toISOString() : d.quitDate,
      archivedAt:
        d.archivedAt instanceof Timestamp ? d.archivedAt.toDate().toISOString() : d.archivedAt,
    }
  }
  return out
}

function deserializeHabits(raw: any): HabitProfiles {
  const out: Record<string, any> = {}
  for (const [id, data] of Object.entries(raw ?? {})) {
    if (!data) continue
    const d = data as any
    out[id] = {
      ...d,
      quitDate:
        typeof d.quitDate === 'string' ? Timestamp.fromDate(new Date(d.quitDate)) : d.quitDate,
      archivedAt:
        typeof d.archivedAt === 'string' ? Timestamp.fromDate(new Date(d.archivedAt)) : d.archivedAt,
    }
  }
  return out as HabitProfiles
}

function loadGuestProfile(): UserProfile | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(GUEST_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)

    // Legacy shape — let normalizeProfile migrate, but first hydrate Timestamps
    if (!data.habits && data.quitDate) {
      const legacy = {
        ...data,
        quitDate: Timestamp.fromDate(new Date(data.quitDate)),
        createdAt: Timestamp.fromDate(new Date(data.createdAt)),
        updatedAt: Timestamp.fromDate(new Date(data.updatedAt)),
      }
      return normalizeProfile(legacy)
    }

    return {
      ...data,
      habits: deserializeHabits(data.habits),
      createdAt: Timestamp.fromDate(new Date(data.createdAt)),
      updatedAt: Timestamp.fromDate(new Date(data.updatedAt)),
    } as UserProfile
  } catch {
    return null
  }
}

export function UserDataProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [firestoreError, setFirestoreError] = useState<string | null>(null)

  const fetchProfile = async () => {
    if (!user) {
      setProfile(loadGuestProfile())
      setLoading(false)
      return
    }
    try {
      setFirestoreError(null)
      const data = await getUserProfile(user.uid)
      setProfile(data)
    } catch (err: any) {
      const isOffline = err?.code === 'unavailable' || err?.message?.includes('offline')
      setFirestoreError(
        isOffline
          ? 'Cannot reach database. Please create your Firestore database in Firebase Console.'
          : err?.message || 'Failed to load profile',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchProfile()
  }, [user])

  const saveLocalProfile = (data: LocalProfileInput) => {
    const now = new Date().toISOString()
    const serialized = {
      ...data,
      uid: 'guest',
      habits: serializeHabits(data.habits),
      createdAt: now,
      updatedAt: now,
    }
    localStorage.setItem(GUEST_KEY, JSON.stringify(serialized))
    localStorage.setItem(ONBOARDING_KEY, '1')
    setProfile(loadGuestProfile())
  }

  const clearLocalProfile = () => {
    localStorage.removeItem(GUEST_KEY)
    localStorage.removeItem(ONBOARDING_KEY)
    setProfile(null)
  }

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (user) {
      await updateUserProfile(user.uid, data)
      await fetchProfile()
    } else {
      if (!profile) return
      const merged: UserProfile = {
        ...profile,
        ...data,
        habits: { ...profile.habits, ...(data.habits ?? {}) },
      }
      saveLocalProfile({
        displayName: merged.displayName,
        email: merged.email,
        photoURL: merged.photoURL,
        activeHabitId: merged.activeHabitId,
        habits: merged.habits,
      })
    }
  }

  const updateActiveHabitData = async (partial: Partial<HabitData>) => {
    if (!profile) return
    const habitId = profile.activeHabitId
    if (user) {
      await fsUpdateHabitData(user.uid, habitId, partial)
      await fetchProfile()
    } else {
      const current = (profile.habits as Record<string, HabitData | undefined>)[habitId]
      if (!current) return
      const merged = { ...current, ...partial } as HabitData
      saveLocalProfile({
        displayName: profile.displayName,
        email: profile.email,
        photoURL: profile.photoURL,
        activeHabitId: habitId,
        habits: { ...profile.habits, [habitId]: merged } as HabitProfiles,
      })
    }
  }

  const addHabit = async (habitId: HabitId, data: HabitData, setActive = false) => {
    if (!profile) return
    const nextHabits: HabitProfiles = { ...profile.habits, [habitId]: data }
    const patch: Partial<UserProfile> = { habits: nextHabits }
    if (setActive) patch.activeHabitId = habitId
    await updateProfile(patch)
  }

  const setActiveHabit = async (habitId: HabitId) => {
    if (!profile) return
    const habitData = (profile.habits as Record<string, HabitData | undefined>)[habitId]
    if (!habitData || habitData.archived) return
    if (profile.activeHabitId === habitId) return
    await updateProfile({ activeHabitId: habitId })
  }

  const archiveHabit = async (habitId: HabitId) => {
    if (!profile) return
    const habits = profile.habits as Record<string, HabitData | undefined>
    const current = habits[habitId]
    if (!current || current.archived) return

    // Refuse to archive the last active habit — the app needs at least one.
    const otherActive = (Object.entries(habits) as [HabitId, HabitData | undefined][])
      .find(([id, d]) => id !== habitId && d && !d.archived)?.[0]
    if (!otherActive) throw new HabitArchiveBlockedError()

    const nextHabits: HabitProfiles = {
      ...profile.habits,
      [habitId]: { ...current, archived: true, archivedAt: Timestamp.now() },
    }
    const patch: Partial<UserProfile> = { habits: nextHabits }
    if (profile.activeHabitId === habitId) patch.activeHabitId = otherActive
    await updateProfile(patch)
  }

  const restoreHabit = async (habitId: HabitId) => {
    if (!profile) return
    const habits = profile.habits as Record<string, HabitData | undefined>
    const current = habits[habitId]
    if (!current || !current.archived) return

    const nextHabits: HabitProfiles = {
      ...profile.habits,
      [habitId]: { ...current, archived: false },
    }
    await updateProfile({ habits: nextHabits })
  }

  const hasCompletedOnboarding = !!(
    (profile?.habits && Object.keys(profile.habits).length > 0) ||
    (typeof window !== 'undefined' && localStorage.getItem(ONBOARDING_KEY))
  )

  return (
    <UserDataContext.Provider
      value={{
        profile,
        loading,
        firestoreError,
        refreshProfile: fetchProfile,
        hasCompletedOnboarding,
        saveLocalProfile,
        clearLocalProfile,
        updateProfile,
        updateActiveHabitData,
        addHabit,
        setActiveHabit,
        archiveHabit,
        restoreHabit,
      }}
    >
      {children}
    </UserDataContext.Provider>
  )
}

export function useUserData() {
  const context = useContext(UserDataContext)
  if (!context) throw new Error('useUserData must be used within UserDataProvider')
  return context
}
