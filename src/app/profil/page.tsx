'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Timestamp } from 'firebase/firestore'
import { useAuth } from '@/contexts/AuthContext'
import { useUserData } from '@/contexts/UserDataContext'
import { formatRupiah } from '@/lib/utils'
import CalendarPicker from '@/components/CalendarPicker'

const MOTIVASI_MAP: Record<string, { label: string; icon: string }> = {
  kesehatan: { label: 'Kesehatan Lebih Baik', icon: '❤️' },
  keluarga:  { label: 'Untuk Keluarga',       icon: '👨‍👩‍👧' },
  uang:      { label: 'Hemat Uang',            icon: '💰' },
  olahraga:  { label: 'Olahraga & Kebugaran',  icon: '🏃' },
  napas:     { label: 'Napas Lebih Lega',      icon: '🌬️' },
  bebas:     { label: 'Menjadi Bebas',         icon: '🦋' },
}

const MOTIVASI_LIST = Object.entries(MOTIVASI_MAP).map(([id, v]) => ({ id, ...v }))

export default function ProfilPage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const { profile, loading, updateProfile } = useUserData()
  const [showEdit, setShowEdit] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!loading && !profile) router.push('/onboarding')
  }, [loading, profile, router])

  useEffect(() => {
    if (profile) setReady(true)
  }, [profile])

  if (loading || !profile || !ready) {
    return (
      <div className="flex items-center justify-center min-h-dvh" style={{ background: 'var(--cream)' }}>
        <div className="w-8 h-8 rounded-full border-[3px] border-t-transparent animate-spin"
          style={{ borderColor: 'var(--green)', borderTopColor: 'transparent' }} />
      </div>
    )
  }

  const isGuest = !user
  const firstName = user?.displayName?.split(' ')[0] || 'Pejuang'
  const quitDateStr = profile.quitDate.toDate().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  const mot = MOTIVASI_MAP[profile.motivation || 'kesehatan'] || MOTIVASI_MAP.kesehatan

  return (
    <div className="min-h-dvh pb-16" style={{ background: 'var(--cream)' }}>

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="blob-green absolute -top-10 right-0 w-64 h-64 opacity-70" />
        <div className="blob-coral absolute top-1/2 -left-10 w-48 h-48 opacity-30" />
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-12 pb-4 relative z-10">
        <button onClick={() => router.back()}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-90"
          style={{ background: 'var(--card)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-2)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <h1 className="text-lg font-800" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text)' }}>
          Profil
        </h1>
      </div>

      <div className="px-5 space-y-4 relative z-10">

        {/* User info card */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-[24px] p-5 flex items-center gap-4"
          style={{ background: 'var(--card)', boxShadow: 'var(--shadow-card)', border: '1px solid var(--border)' }}>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden"
            style={{ background: 'var(--green-pale)', border: '2.5px solid var(--green-tint)' }}>
            {user?.photoURL ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.photoURL} alt="" referrerPolicy="no-referrer"
                className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl font-800" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--green-mid)' }}>
                {firstName[0]?.toUpperCase() || 'P'}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-base font-800 truncate" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text)' }}>
              {user?.displayName || 'Pejuang Bebas Rokok'}
            </div>
            <div className="text-xs font-600 truncate" style={{ color: 'var(--text-3)' }}>
              {user?.email || 'Mode tamu'}
            </div>
          </div>
        </motion.div>

        {/* Data summary card + edit button */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }}
          className="rounded-[24px] overflow-hidden"
          style={{ background: 'var(--card)', boxShadow: 'var(--shadow-card)', border: '1px solid var(--border)' }}>

          <div className="p-5 space-y-4">
            <SummaryRow emoji="📅" label="Tanggal Berhenti" value={quitDateStr} />
            <SummaryRow emoji="🚬" label="Batang per Hari" value={`${profile.cigarettesPerDay} batang`} />
            <SummaryRow emoji="💵" label="Harga Sebungkus" value={formatRupiah(profile.pricePerPack)} />
            <SummaryRow emoji={mot.icon} label="Motivasi" value={mot.label} />
          </div>

          <button onClick={() => setShowEdit(true)}
            className="w-full flex items-center justify-center gap-2 py-4 transition-all active:opacity-70"
            style={{ borderTop: '1px solid var(--border)' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--green-mid)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            <span className="text-sm font-800" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--green-mid)' }}>
              Ubah Data
            </span>
          </button>
        </motion.div>

        {/* Account actions */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
          className="rounded-[24px] p-5"
          style={{ background: 'var(--card)', boxShadow: 'var(--shadow-card)', border: '1px solid var(--border)' }}>
          {isGuest ? (
            <button onClick={() => router.push('/')}
              className="w-full flex items-center gap-3 py-2 transition-all active:opacity-70">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--green-pale)' }}>
                <GoogleIcon />
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-700" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text)' }}>
                  Masuk dengan Google
                </div>
                <div className="text-xs font-500" style={{ color: 'var(--text-3)' }}>
                  Sinkronkan data ke cloud
                </div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          ) : (
            <button onClick={() => logout().then(() => router.push('/'))}
              className="w-full flex items-center gap-3 py-2 transition-all active:opacity-70">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--coral-pale)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--coral)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-700" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--coral)' }}>
                  Keluar
                </div>
                <div className="text-xs font-500" style={{ color: 'var(--text-3)' }}>
                  {user?.email}
                </div>
              </div>
            </button>
          )}
        </motion.div>
      </div>

      {/* Edit bottom sheet */}
      <AnimatePresence>
        {showEdit && (
          <EditSheet
            profile={profile}
            onClose={() => setShowEdit(false)}
            onSave={async (data) => {
              await updateProfile(data)
              setShowEdit(false)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Summary row ── */

function SummaryRow({ emoji, label, value }: { emoji: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: 'var(--cream)', border: '1px solid var(--border)' }}>
        <span className="text-sm">{emoji}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] font-600" style={{ color: 'var(--text-3)' }}>{label}</div>
        <div className="text-sm font-800 truncate" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text)' }}>
          {value}
        </div>
      </div>
    </div>
  )
}

/* ── Edit bottom sheet ── */

function EditSheet({
  profile,
  onClose,
  onSave,
}: {
  profile: { quitDate: Timestamp; cigarettesPerDay: number; pricePerPack: number; motivation?: string }
  onClose: () => void
  onSave: (data: Partial<{ quitDate: Timestamp; cigarettesPerDay: number; pricePerPack: number; motivation: string }>) => Promise<void>
}) {
  const today = new Date().toISOString().split('T')[0]
  const [quitDate, setQuitDate] = useState(profile.quitDate.toDate().toISOString().split('T')[0])
  const [batang, setBatang] = useState(profile.cigarettesPerDay)
  const [hargaBungkus, setHarga] = useState(profile.pricePerPack)
  const [selectedMotivasi, setMot] = useState(profile.motivation || 'kesehatan')
  const [saving, setSaving] = useState(false)
  const [step, setStep] = useState(0) // 0-3 for each section

  const handleSave = useCallback(async () => {
    setSaving(true)
    await onSave({
      quitDate: Timestamp.fromDate(new Date(quitDate + 'T00:00:00')),
      cigarettesPerDay: batang,
      pricePerPack: hargaBungkus,
      motivation: selectedMotivasi,
    })
  }, [quitDate, batang, hargaBungkus, selectedMotivasi, onSave])

  const steps = [
    { emoji: '📅', title: 'Tanggal Berhenti' },
    { emoji: '🚬', title: 'Batang per Hari' },
    { emoji: '💵', title: 'Harga Sebungkus' },
    { emoji: '🌟', title: 'Motivasi Utama' },
  ]

  const isLast = step === steps.length - 1
  const progress = ((step + 1) / steps.length) * 100

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60]"
        style={{ background: 'rgba(44,31,20,0.5)', backdropFilter: 'blur(6px)' }}
        onClick={onClose}
      />

      {/* Sheet */}
      <motion.div
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 380 }}
        className="fixed inset-x-0 bottom-0 z-[61] max-h-[92dvh] overflow-y-auto"
      >
        <div className="w-full max-w-[430px] mx-auto rounded-t-[32px] px-6 pt-5 pb-10"
          style={{ background: 'var(--cream)' }}>

          {/* Handle */}
          <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: 'var(--border-mid)' }} />

          {/* Header with close */}
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="text-lg">{steps[step].emoji}</span>
              <AnimatePresence mode="wait">
                <motion.h3
                  key={step}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.15 }}
                  className="text-lg font-900"
                  style={{ fontFamily: 'var(--font-fraunces)', color: 'var(--text)', letterSpacing: '-0.02em' }}>
                  {steps[step].title}
                </motion.h3>
              </AnimatePresence>
            </div>
            <button onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--border)', color: 'var(--text-2)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Step indicator */}
          <div className="flex gap-1.5 my-4">
            {steps.map((_, i) => (
              <motion.div
                key={i}
                className="h-1 rounded-full flex-1"
                style={{ background: i <= step ? 'var(--green)' : 'var(--border)' }}
                animate={{ background: i <= step ? 'var(--green)' : 'var(--border)' }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>

          {/* Step content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="min-h-[280px]"
            >
              {step === 0 && (
                <CalendarPicker value={quitDate} onChange={setQuitDate} max={today} />
              )}

              {step === 1 && (
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-4">
                    <button onClick={() => setBatang(Math.max(1, batang - 1))}
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-800 transition-all active:scale-90"
                      style={{ background: 'var(--border)', color: 'var(--text-2)' }}>−</button>
                    <div className="flex-1 text-center">
                      <motion.span
                        key={batang}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-5xl font-900 inline-block"
                        style={{ fontFamily: 'var(--font-fraunces)', color: 'var(--text)' }}>
                        {batang}
                      </motion.span>
                      <div className="text-xs font-600 mt-1" style={{ color: 'var(--text-3)' }}>batang / hari</div>
                    </div>
                    <button onClick={() => setBatang(Math.min(100, batang + 1))}
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-800 transition-all active:scale-90"
                      style={{ background: 'var(--green-pale)', color: 'var(--green-mid)' }}>+</button>
                  </div>
                  <input type="range" min={1} max={100} value={batang} onChange={e => setBatang(+e.target.value)}
                    className="w-full accent-green-600" />
                  <div className="flex flex-wrap gap-1.5">
                    {[6, 12, 20, 30, 40, 60].map(n => (
                      <button key={n} onClick={() => setBatang(n)}
                        className="px-3.5 py-2 rounded-xl text-xs font-700 transition-all active:scale-95"
                        style={{
                          fontFamily: 'var(--font-nunito)',
                          background: batang === n ? 'var(--green-pale)' : 'var(--card)',
                          color: batang === n ? 'var(--green-mid)' : 'var(--text-3)',
                          border: `1.5px solid ${batang === n ? 'var(--green-tint)' : 'var(--border)'}`,
                        }}>{n}</button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 pt-2">
                  <div className="rounded-2xl overflow-hidden"
                    style={{ background: 'var(--card)', border: '1.5px solid var(--border)' }}>
                    <div className="flex items-center px-4">
                      <span className="text-base font-700" style={{ color: 'var(--text-3)' }}>Rp</span>
                      <input type="number" value={hargaBungkus} onChange={e => setHarga(+e.target.value)}
                        className="flex-1 bg-transparent py-4 px-2 text-2xl font-800 focus:outline-none"
                        style={{ fontFamily: 'var(--font-fraunces)', color: 'var(--text)' }} />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[15000, 20000, 25000, 28000, 32000, 38000].map(n => (
                      <button key={n} onClick={() => setHarga(n)}
                        className="px-3.5 py-2 rounded-xl text-xs font-700 transition-all active:scale-95"
                        style={{
                          fontFamily: 'var(--font-nunito)',
                          background: hargaBungkus === n ? 'var(--amber-pale)' : 'var(--card)',
                          color: hargaBungkus === n ? 'var(--amber)' : 'var(--text-3)',
                          border: `1.5px solid ${hargaBungkus === n ? 'var(--amber-tint)' : 'var(--border)'}`,
                        }}>{formatRupiah(n)}</button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  {MOTIVASI_LIST.map(m => (
                    <motion.button key={m.id}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setMot(m.id)}
                      className="flex items-center gap-2.5 p-3.5 rounded-2xl text-left transition-colors"
                      style={{
                        background: selectedMotivasi === m.id ? 'var(--green-pale)' : 'var(--card)',
                        border: `1.5px solid ${selectedMotivasi === m.id ? 'var(--green-tint)' : 'var(--border)'}`,
                      }}>
                      <span className="text-xl">{m.icon}</span>
                      <span className="text-xs font-700" style={{
                        fontFamily: 'var(--font-nunito)',
                        color: selectedMotivasi === m.id ? 'var(--green-mid)' : 'var(--text-2)',
                      }}>{m.label}</span>
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex gap-2 mt-6">
            {step > 0 && (
              <button onClick={() => setStep(s => s - 1)}
                className="px-5 py-4 rounded-2xl text-sm font-800 transition-all active:scale-[0.97]"
                style={{
                  fontFamily: 'var(--font-nunito)',
                  background: 'var(--card)',
                  color: 'var(--text-2)',
                  border: '1.5px solid var(--border)',
                }}>
                Kembali
              </button>
            )}
            <button
              onClick={isLast ? handleSave : () => setStep(s => s + 1)}
              disabled={saving}
              className="flex-1 py-4 rounded-2xl text-sm font-800 flex items-center justify-center gap-2 transition-all active:scale-[0.97] disabled:opacity-60"
              style={{
                fontFamily: 'var(--font-nunito)',
                background: 'var(--green)',
                color: 'white',
                boxShadow: '0 4px 20px rgba(61,190,143,0.35)',
              }}>
              {saving
                ? <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                : isLast ? '✓ Simpan' : 'Lanjut →'}
            </button>
          </div>
        </div>
      </motion.div>
    </>
  )
}

/* ── Icons ── */

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
