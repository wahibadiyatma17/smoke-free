import { Timestamp } from 'firebase/firestore'
import type { UserProfile } from './types'

export function normalizeProfile(raw: any): UserProfile | null {
  if (!raw) return null

  if (raw.habits && raw.activeHabitId) {
    return raw as UserProfile
  }

  if (raw.quitDate) {
    const now = Timestamp.now()
    return {
      uid: raw.uid,
      displayName: raw.displayName ?? null,
      email: raw.email ?? null,
      photoURL: raw.photoURL ?? null,
      activeHabitId: 'smoking',
      habits: {
        smoking: {
          quitDate: raw.quitDate,
          cigarettesPerDay: raw.cigarettesPerDay,
          pricePerPack: raw.pricePerPack,
          cigarettesPerPack: raw.cigarettesPerPack ?? 16,
          motivation: raw.motivation ?? 'kesehatan',
        },
      },
      createdAt: raw.createdAt ?? now,
      updatedAt: raw.updatedAt ?? now,
    }
  }

  return null
}
