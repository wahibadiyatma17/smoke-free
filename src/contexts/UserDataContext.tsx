'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { Timestamp } from 'firebase/firestore'
import { useAuth } from './AuthContext'
import { getUserProfile, updateUserProfile, UserProfile } from '@/lib/firestore'

const GUEST_KEY = 'smoke_free_guest_profile'

interface UserDataContextType {
  profile: UserProfile | null
  loading: boolean
  firestoreError: string | null
  refreshProfile: () => Promise<void>
  hasCompletedOnboarding: boolean
  saveLocalProfile: (data: Omit<UserProfile, 'uid' | 'createdAt' | 'updatedAt'>) => void
  clearLocalProfile: () => void
  updateProfile: (data: Partial<UserProfile>) => Promise<void>
}

const UserDataContext = createContext<UserDataContextType | null>(null)

function loadGuestProfile(): UserProfile | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(GUEST_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    return {
      ...data,
      quitDate:  Timestamp.fromDate(new Date(data.quitDate)),
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
          : err?.message || 'Failed to load profile'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchProfile()
  }, [user])

  const saveLocalProfile = (data: Omit<UserProfile, 'uid' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString()
    const serialized = {
      ...data,
      uid: 'guest',
      quitDate:  data.quitDate instanceof Timestamp ? data.quitDate.toDate().toISOString() : data.quitDate,
      createdAt: now,
      updatedAt: now,
    }
    localStorage.setItem(GUEST_KEY, JSON.stringify(serialized))
    setProfile(loadGuestProfile())
  }

  const clearLocalProfile = () => {
    localStorage.removeItem(GUEST_KEY)
    setProfile(null)
  }

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (user) {
      await updateUserProfile(user.uid, data)
      await fetchProfile()
    } else {
      if (!profile) return
      const updated = { ...profile, ...data }
      saveLocalProfile({
        displayName: updated.displayName,
        email: updated.email,
        photoURL: updated.photoURL,
        quitDate: updated.quitDate,
        cigarettesPerDay: updated.cigarettesPerDay,
        pricePerPack: updated.pricePerPack,
        cigarettesPerPack: updated.cigarettesPerPack,
        motivation: updated.motivation,
      })
    }
  }

  const hasCompletedOnboarding = !!(
    profile?.quitDate &&
    profile?.cigarettesPerDay &&
    profile?.pricePerPack
  )

  return (
    <UserDataContext.Provider value={{
      profile, loading, firestoreError,
      refreshProfile: fetchProfile,
      hasCompletedOnboarding,
      saveLocalProfile,
      clearLocalProfile,
      updateProfile,
    }}>
      {children}
    </UserDataContext.Provider>
  )
}

export function useUserData() {
  const context = useContext(UserDataContext)
  if (!context) throw new Error('useUserData must be used within UserDataProvider')
  return context
}
