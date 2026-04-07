'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { useUserData } from '@/contexts/UserDataContext'

export default function LandingPage() {
  const router = useRouter()
  const { user, loading, signInWithGoogle } = useAuth()
  const { hasCompletedOnboarding, loading: profileLoading } = useUserData()
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (loading || profileLoading) return
    if (user) {
      router.push(hasCompletedOnboarding ? '/dashboard' : '/onboarding')
    } else if (hasCompletedOnboarding) {
      router.push('/dashboard')
    }
  }, [user, loading, profileLoading, hasCompletedOnboarding, router])

  const handleGoogle = async () => {
    setError(''); setBusy(true)
    try { await signInWithGoogle() }
    catch (e: any) {
      setError(
        e?.code === 'auth/operation-not-allowed' ? 'Login Google belum diaktifkan di Firebase Console.' :
        e?.code === 'auth/popup-closed-by-user'  ? 'Popup ditutup. Coba lagi.' :
        e?.message || 'Gagal masuk dengan Google.'
      )
      setBusy(false)
    }
  }

  if (loading || (user && profileLoading)) {
    return (
      <div className="flex items-center justify-center min-h-dvh" style={{ background: 'var(--cream)' }}>
        <div className="w-8 h-8 rounded-full border-[3px] border-t-transparent animate-spin"
          style={{ borderColor: 'var(--green)', borderTopColor: 'transparent' }} />
      </div>
    )
  }

  return (
    <div className="relative min-h-dvh flex flex-col overflow-hidden" style={{ background: 'var(--cream)' }}>

      {/* Organic background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="blob-green absolute -top-20 -right-20 w-72 h-72 opacity-60" />
        <div className="blob-coral absolute top-1/3 -left-16 w-56 h-56 opacity-50" />
        <div className="blob-amber absolute -bottom-10 right-0 w-48 h-48 opacity-40" />
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="flex flex-col flex-1 px-6 pt-14 pb-10 relative z-10"
      >
        {/* Logo */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
            style={{ background: 'var(--green-pale)', border: '2px solid var(--green-tint)' }}>
            <span className="text-2xl">🌿</span>
          </div>
          <div>
            <div className="font-800 text-base tracking-tight"
              style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text)' }}>
              Napas Baru
            </div>
            <div className="text-[11px] font-600" style={{ color: 'var(--text-3)' }}>
              bebas rokok, selamanya
            </div>
          </div>
        </motion.div>

        {/* Hero */}
        <div className="flex-1">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
            <h1 className="mb-4 tracking-tight leading-[1.08]"
              style={{
                fontFamily: 'var(--font-fraunces)',
                fontWeight: 900,
                fontSize: '2.75rem',
                color: 'var(--text)',
                letterSpacing: '-0.025em',
              }}>
              Setiap napas<br />
              <em style={{ color: 'var(--green-mid)', fontStyle: 'italic' }}>adalah kamu</em><br />
              yang menang.
            </h1>
            <p className="text-base leading-relaxed mb-8 font-500" style={{ color: 'var(--text-2)' }}>
              Lacak streak bebas rokokmu, lihat kesehatanmu pulih, dan hemat jutaan rupiah. Satu hari demi satu hari.
            </p>
          </motion.div>

          {/* Stats trio */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="grid grid-cols-3 gap-2 mb-10"
          >
            {[
              { nilai: '11 mnt', label: 'umur kembali tiap batang dihindari', color: 'var(--green)' },
              { nilai: 'Rp 5 jt', label: 'hemat rata-rata per tahun',         color: 'var(--amber)' },
              { nilai: '50%',    label: 'risiko jantung turun setelah 1 thn', color: 'var(--coral)' },
            ].map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, scale: 0.88, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.34 + i * 0.08, type: 'spring' }}
                className="rounded-2xl p-3 text-center"
                style={{ background: 'var(--card)', boxShadow: 'var(--shadow-card)' }}
              >
                <div className="text-lg font-900 mb-0.5 leading-none"
                  style={{ fontFamily: 'var(--font-fraunces)', color: s.color }}>
                  {s.nilai}
                </div>
                <div className="text-[10px] font-600 leading-tight" style={{ color: 'var(--text-3)' }}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.52 }}
          className="space-y-3"
        >
          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="rounded-2xl px-4 py-3 text-sm font-600 text-center"
                style={{ background: 'var(--coral-pale)', color: 'var(--coral-mid)', border: '1px solid var(--coral-tint)' }}
              >{error}</motion.div>
            )}
          </AnimatePresence>
          <BtnGreen onClick={handleGoogle} loading={busy}>
            <GoogleIcon /> Masuk dengan Google
          </BtnGreen>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            <span className="text-xs font-700" style={{ color: 'var(--text-3)' }}>atau</span>
            <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          </div>
          <button onClick={() => router.push('/onboarding')}
            className="w-full py-3.5 text-sm font-700 transition-all active:scale-[0.97]"
            style={{ color: 'var(--text-3)', fontFamily: 'var(--font-nunito)' }}>
            Lanjut tanpa akun →
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}

function BtnGreen({ children, loading, className = '', ...props }: any) {
  return (
    <button {...props} disabled={loading || props.disabled}
      className={`w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-800 text-sm transition-all active:scale-[0.97] disabled:opacity-60 ${className}`}
      style={{
        fontFamily: 'var(--font-nunito)',
        background: 'var(--green)',
        color: 'white',
        boxShadow: '0 4px 20px rgba(61,190,143,0.35), 0 1px 3px rgba(61,190,143,0.2)',
        ...props.style,
      }}
    >
      {loading
        ? <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
        : children}
    </button>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}
