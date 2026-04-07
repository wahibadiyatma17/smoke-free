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

export interface UserProfile {
  uid: string
  displayName: string | null
  email: string | null
  photoURL: string | null
  quitDate: Timestamp
  cigarettesPerDay: number
  pricePerPack: number
  cigarettesPerPack: number
  motivation: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface CravingLog {
  id?: string
  uid: string
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
  return docSnap.exists() ? (docSnap.data() as UserProfile) : null
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

export async function logCraving(uid: string, data: Omit<CravingLog, 'uid' | 'timestamp'>) {
  const cravingsRef = collection(db, 'cravings')
  await addDoc(cravingsRef, {
    ...data,
    uid,
    timestamp: serverTimestamp(),
  })
}

export async function getCravings(uid: string): Promise<CravingLog[]> {
  const cravingsRef = collection(db, 'cravings')
  // Simple single-field query — no composite index needed
  const q = query(cravingsRef, where('uid', '==', uid))
  const snapshot = await getDocs(q)
  const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as CravingLog))
  // Sort client-side: newest first
  return docs.sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds)
}
