import { initializeApp, getApps } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics, isSupported } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: "AIzaSyBa0aj-3auoxit8TXfXM8cLJlNbXdUbNMc",
  authDomain: "smoke-free-a2bf2.firebaseapp.com",
  projectId: "smoke-free-a2bf2",
  storageBucket: "smoke-free-a2bf2.firebasestorage.app",
  messagingSenderId: "926036232674",
  appId: "1:926036232674:web:8e7ed2eb9acbda567151bb",
  measurementId: "G-LFKMEB0296"
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()

export const getAnalyticsInstance = async () => {
  if (await isSupported()) {
    return getAnalytics(app)
  }
  return null
}

export default app
