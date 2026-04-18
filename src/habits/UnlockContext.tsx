'use client'

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { HabitId } from './types'

/**
 * Session-scoped unlock state for hidden habits. Intentionally not persisted —
 * on every fresh page load the user must re-unlock. Keeping state in memory
 * avoids any accidental leak to localStorage/cookies.
 */
interface UnlockContextValue {
  isUnlocked: (habitId: HabitId) => boolean
  unlock: (habitId: HabitId) => void
  lock: (habitId: HabitId) => void
  lockAll: () => void
}

const UnlockContext = createContext<UnlockContextValue | null>(null)

export function UnlockProvider({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState<Set<HabitId>>(new Set())

  const isUnlocked = useCallback((id: HabitId) => unlocked.has(id), [unlocked])

  const unlock = useCallback((id: HabitId) => {
    setUnlocked(prev => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }, [])

  const lock = useCallback((id: HabitId) => {
    setUnlocked(prev => {
      if (!prev.has(id)) return prev
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }, [])

  const lockAll = useCallback(() => setUnlocked(new Set()), [])

  const value = useMemo(
    () => ({ isUnlocked, unlock, lock, lockAll }),
    [isUnlocked, unlock, lock, lockAll],
  )

  return <UnlockContext.Provider value={value}>{children}</UnlockContext.Provider>
}

export function useUnlock() {
  const ctx = useContext(UnlockContext)
  if (!ctx) throw new Error('useUnlock must be used within UnlockProvider')
  return ctx
}
