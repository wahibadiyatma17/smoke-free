import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './firebase'
import type { HabitData, HabitId, UserProfile } from '@/habits/types'
import { normalizeProfile } from '@/habits/migration'

export type { UserProfile }

export interface CravingLog {
  id?: string
  uid: string
  habitId: HabitId
  timestamp: Timestamp
  intensity: number // 1-10
  trigger: string
  note: string
  copingUsed: string
  resisted: boolean
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const docRef = doc(db, 'users', uid)
  const docSnap = await getDoc(docRef)
  if (!docSnap.exists()) return null
  return normalizeProfile(docSnap.data())
}

export async function createUserProfile(uid: string, data: Partial<UserProfile>) {
  const docRef = doc(db, 'users', uid)
  await setDoc(docRef, {
    ...data,
    uid,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>) {
  const docRef = doc(db, 'users', uid)
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

/**
 * Update a single habit's data without rewriting the whole habits map.
 * Uses Firestore dotted field paths so other habits' data is untouched.
 */
export async function updateHabitData<TId extends HabitId>(
  uid: string,
  habitId: TId,
  partial: Partial<HabitData>,
) {
  const docRef = doc(db, 'users', uid)
  const payload: Record<string, unknown> = { updatedAt: serverTimestamp() }
  for (const [key, value] of Object.entries(partial)) {
    payload[`habits.${habitId}.${key}`] = value
  }
  await updateDoc(docRef, payload)
}

export async function logCraving(uid: string, data: Omit<CravingLog, 'uid' | 'timestamp'>) {
  const cravingsRef = collection(db, 'cravings')
  await addDoc(cravingsRef, {
    ...data,
    uid,
    timestamp: serverTimestamp(),
  })
}

/**
 * Get cravings for a user. When `habitId` is provided, filter to that habit.
 * Entries without a `habitId` (legacy smoking-only rows) are included when
 * filtering by 'smoking' so legacy data stays visible.
 */
export async function getCravings(uid: string, habitId?: HabitId): Promise<CravingLog[]> {
  const cravingsRef = collection(db, 'cravings')
  const q = query(cravingsRef, where('uid', '==', uid))
  const snapshot = await getDocs(q)
  let docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as CravingLog))

  if (habitId) {
    docs = docs.filter(d => d.habitId === habitId || (habitId === 'smoking' && !d.habitId))
  }

  return docs.sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds)
}
