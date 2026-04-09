'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Timestamp } from 'firebase/firestore'
import CalendarPicker from '@/components/CalendarPicker'
import { useAuth } from '@/contexts/AuthContext'
import { useUserData } from '@/contexts/UserDataContext'
import { createUserProfile } from '@/lib/firestore'
import { formatRupiah } from '@/lib/utils'

const motivasi = [
  { id: 'kesehatan', label: 'Kesehatan Lebih Baik', icon: '❤️' },
  { id: 'keluarga',  label: 'Untuk Keluarga',       icon: '👨‍👩‍👧' },
  { id: 'uang',      label: 'Hemat Uang',            icon: '💰' },
  { id: 'olahraga',  label: 'Olahraga & Kebugaran',  icon: '🏃' },
  { id: 'napas',     label: 'Napas Lebih Lega',      icon: '🌬️' },
  { id: 'bebas',     label: 'Menjadi Bebas',         icon: '🦋' },
]

const steps = [
  { emoji: '📅', title: 'Kapan kamu berhenti?',      sub: 'Atau kapan kamu mau mulai?' },
  { emoji: '🚬', title: 'Berapa batang per hari?',    sub: 'Sebelum memutuskan berhenti' },
  { emoji: '💵', title: 'Harga sebungkus rokok?',     sub: 'Kami hitung penghematanmu' },
  { emoji: '🌟', title: 'Apa motivasi utamamu?',      sub: 'Ini yang akan menguatkanmu' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { refreshProfile, saveLocalProfile } = useUserData()
  const [step, setStep] = useState(0)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  const today = new Date().toISOString().split('T')[0]
  const [quitDate, setQuitDate]      = useState(today)
  const [batang, setBatang]          = useState(12)
  const [hargaBungkus, setHarga]     = useState(25000)
  const [selectedMotivasi, setMot]   = useState('kesehatan')

  const isLast = step === steps.length - 1
  const progress = ((step + 1) / steps.length) * 100

  const handleNext = async () => {
    if (!isLast) { setStep(s => s + 1); return }
    setSaving(true); setSaveError('')
    const profileData = {
      quitDate: Timestamp.fromDate(new Date(quitDate + 'T00:00:00')),
      cigarettesPerDay: batang,
      pricePerPack: hargaBungkus,
      cigarettesPerPack: 16,
      motivation: selectedMotivasi,
    }
    try {
      if (user) {
        await createUserProfile(user.uid, {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          ...profileData,
        })
        await refreshProfile()
      } else {
        saveLocalProfile({
          displayName: null,
          email: null,
          photoURL: null,
          ...profileData,
        })
      }
      router.push('/dashboard')
    } catch (e: any) {
      const offline = e?.code === 'unavailable' || e?.message?.includes('offline')
      setSaveError(offline
        ? 'Tidak dapat terhubung ke database. Buat Firestore di Firebase Console terlebih dahulu.'
        : e?.message || 'Gagal menyimpan. Coba lagi.')
      setSaving(false)
    }
  }

  const { emoji, title, sub } = steps[step]

  return (
    <div className="min-h-dvh flex flex-col px-6 pt-12 pb-10 relative overflow-hidden" style={{ background: 'var(--cream)' }}>

      {/* Blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="blob-green absolute -top-16 -right-16 w-56 h-56 opacity-60" />
        <div className="blob-amber absolute bottom-20 -left-10 w-44 h-44 opacity-40" />
      </div>

      {/* Progress */}
      <div className="relative z-10 mb-10">
        <div className="flex justify-between items-center mb-2.5">
          <span className="text-sm font-700" style={{ color: 'var(--text-3)' }}>
            Langkah {step + 1} dari {steps.length}
          </span>
          <span className="text-sm font-800" style={{ color: 'var(--green-mid)' }}>
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
          <motion.div className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, var(--coral), var(--amber), var(--green))' }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div key={step}
          initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -28 }}
          transition={{ duration: 0.22 }}
          className="flex-1 relative z-10"
        >
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07 }}
            className="mb-8"
          >
            <div className="text-4xl mb-4">{emoji}</div>
            <h2 className="mb-1 tracking-tight"
              style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>
              {title}
            </h2>
            <p className="text-base font-500" style={{ color: 'var(--text-2)' }}>{sub}</p>
          </motion.div>

          {/* Step 0 - Tanggal */}
          {step === 0 && (
            <CalendarPicker value={quitDate} onChange={setQuitDate} max={today} />
          )}

          {/* Step 1 - Jumlah batang */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-5">
                <SpinBtn onClick={() => setBatang(Math.max(1, batang - 1))}>−</SpinBtn>
                <div className="text-center min-w-[100px]">
                  <div className="leading-none tabular-nums"
                    style={{ fontFamily: 'var(--font-fraunces)', fontSize: '72px', fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.04em' }}>
                    {batang}
                  </div>
                  <div className="text-xs font-700 mt-1" style={{ color: 'var(--text-3)' }}>batang / hari</div>
                </div>
                <SpinBtn onClick={() => setBatang(Math.min(100, batang + 1))}>+</SpinBtn>
              </div>
              <input type="range" min="1" max="60" value={batang} onChange={e => setBatang(Number(e.target.value))}
                className="w-full" style={{ accentColor: 'var(--green)' }} />
              <div className="grid grid-cols-3 gap-2">
                {[6, 12, 20, 30, 40, 60].map(n => (
                  <Chip key={n} active={batang === n} onClick={() => setBatang(n)}>{n} batang</Chip>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 - Harga */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden"
                style={{ background: 'var(--card)', border: '1.5px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-800"
                  style={{ color: 'var(--text-2)', fontFamily: 'var(--font-nunito)' }}>Rp</span>
                <input type="number" value={hargaBungkus}
                  onChange={e => setHarga(Math.max(1000, Number(e.target.value)))}
                  step="1000" min="1000"
                  className="w-full bg-transparent pl-12 pr-20 py-4 text-xl font-900 text-center focus:outline-none"
                  style={{ color: 'var(--text)', fontFamily: 'var(--font-fraunces)' }} />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-600"
                  style={{ color: 'var(--text-3)' }}>/ bungkus</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[15000, 20000, 25000, 28000, 32000, 38000].map(n => (
                  <Chip key={n} active={hargaBungkus === n} onClick={() => setHarga(n)} color="amber">
                    {formatRupiah(n)}
                  </Chip>
                ))}
              </div>
              <div className="rounded-2xl px-4 py-3.5 text-sm font-700 text-center"
                style={{ background: 'var(--amber-pale)', color: 'var(--amber)', border: '1.5px solid var(--amber-tint)' }}>
                🎉 Kamu akan hemat{' '}
                <span style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 900 }}>
                  {formatRupiah(hargaBungkus * batang / 16 * 365)}
                </span>{' '}
                per tahun!
              </div>
            </div>
          )}

          {/* Step 3 - Motivasi */}
          {step === 3 && (
            <div className="grid grid-cols-2 gap-2.5">
              {motivasi.map(({ id, label, icon }) => {
                const active = selectedMotivasi === id
                return (
                  <button key={id} onClick={() => setMot(id)}
                    className="p-4 rounded-2xl text-left transition-all active:scale-[0.97]"
                    style={{
                      background: active ? 'var(--green-pale)' : 'var(--card)',
                      border: `1.5px solid ${active ? 'var(--green-tint)' : 'var(--border)'}`,
                      boxShadow: active ? '0 4px 16px rgba(61,190,143,0.15)' : 'var(--shadow-sm)',
                    }}>
                    <div className="text-2xl mb-2">{icon}</div>
                    <div className="text-sm font-800"
                      style={{ fontFamily: 'var(--font-nunito)', color: active ? 'var(--green-dark)' : 'var(--text-2)' }}>
                      {label}
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Error */}
      <AnimatePresence>
        {saveError && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mt-4 rounded-2xl px-4 py-3 text-sm font-600 relative z-10"
            style={{ background: 'var(--coral-pale)', color: 'var(--coral-mid)', border: '1.5px solid var(--coral-tint)' }}
          >{saveError}</motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center gap-3 mt-6 relative z-10">
        {step > 0 && (
          <button onClick={() => setStep(s => s - 1)}
            className="flex-1 py-4 rounded-2xl text-sm font-700 transition-all active:scale-[0.97]"
            style={{ background: 'var(--card)', border: '1.5px solid var(--border)', color: 'var(--text-2)', boxShadow: 'var(--shadow-sm)', fontFamily: 'var(--font-nunito)' }}>
            Kembali
          </button>
        )}
        <button onClick={handleNext} disabled={saving}
          className="flex-1 py-4 rounded-2xl text-sm font-800 flex items-center justify-center gap-2 transition-all active:scale-[0.97] disabled:opacity-60"
          style={{
            fontFamily: 'var(--font-nunito)',
            background: 'var(--green)',
            color: 'white',
            boxShadow: '0 4px 20px rgba(61,190,143,0.35)',
          }}>
          {saving
            ? <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            : isLast ? '🚀 Mulai Sekarang!' : <><span>Lanjut</span><span>→</span></>
          }
        </button>
      </div>
    </div>
  )
}

function SpinBtn({ children, onClick }: { children: string, onClick: () => void }) {
  return (
    <button onClick={onClick}
      className="w-14 h-14 rounded-2xl text-2xl font-300 flex items-center justify-center transition-all active:scale-90 select-none"
      style={{ background: 'var(--card)', border: '1.5px solid var(--border)', color: 'var(--text)', boxShadow: 'var(--shadow-sm)' }}>
      {children}
    </button>
  )
}

function Chip({ children, active, onClick, color = 'green' }: {
  children: React.ReactNode, active: boolean, onClick: () => void, color?: 'green' | 'amber'
}) {
  const isAmber = color === 'amber'
  return (
    <button onClick={onClick}
      className="py-2.5 px-2 rounded-xl text-xs font-700 transition-all active:scale-95 text-center"
      style={{
        fontFamily: 'var(--font-nunito)',
        background: active ? (isAmber ? 'var(--amber-pale)' : 'var(--green-pale)') : 'var(--card)',
        border: `1.5px solid ${active ? (isAmber ? 'var(--amber-tint)' : 'var(--green-tint)') : 'var(--border)'}`,
        color: active ? (isAmber ? 'var(--amber)' : 'var(--green-mid)') : 'var(--text-2)',
        boxShadow: 'var(--shadow-sm)',
      }}>
      {children}
    </button>
  )
}
