'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { LogOut, Zap, RotateCcw, ChevronRight } from 'lucide-react'
import { Timestamp } from 'firebase/firestore'
import { useAuth } from '@/contexts/AuthContext'
import { useUserData } from '@/contexts/UserDataContext'
import { Navigation } from '@/components/Navigation'
import { StreakRing } from '@/components/StreakRing'
import { getSmokeFreeStats, getHealthMilestones, formatRupiah, formatNumber, getSalam, motivasiQuotes } from '@/lib/utils'
import { badges } from '@/lib/badges'
import { getCravings, CravingLog } from '@/lib/firestore'

const strategiMengatasi = [
  { judul: 'Tarik napas dalam', desc: '4 hitungan masuk · 4 tahan · 4 keluar', ikon: '🌬️' },
  { judul: 'Minum air putih',   desc: 'Segelas air dingin meredam keinginan',   ikon: '💧' },
  { judul: 'Jalan kaki',        desc: 'Bahkan 5 menit mengubah suasana hati',   ikon: '🚶' },
  { judul: 'Hubungi seseorang', desc: 'Alihkan pikiran dengan percakapan',       ikon: '📞' },
  { judul: 'Permen karet',      desc: 'Buat mulutmu sibuk dengan yang sehat',    ikon: '🍬' },
  { judul: 'Meditasi 2 menit',  desc: 'Duduk tenang dan fokus pada napas',      ikon: '🧘' },
]

export default function DashboardPage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const { profile, loading, updateProfile } = useUserData()
  const [now, setNow] = useState(new Date())
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [showCraving, setShowCraving] = useState(false)
  const [berhasil, setBerhasil] = useState(false)
  const [showReset, setShowReset] = useState(false)
  const [resetDate, setResetDate] = useState(new Date().toISOString().split('T')[0])
  const [resetting, setResetting] = useState(false)

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setQuoteIndex(i => (i + 1) % motivasiQuotes.length), 8000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (!loading && !profile) router.push('/onboarding')
  }, [loading, profile, router])

  if (loading || !profile) {
    return (
      <div className="flex items-center justify-center min-h-dvh" style={{ background: 'var(--cream)' }}>
        <div className="w-8 h-8 rounded-full border-[3px] border-t-transparent animate-spin"
          style={{ borderColor: 'var(--green)', borderTopColor: 'transparent' }} />
      </div>
    )
  }

  const quitDate  = profile.quitDate.toDate()
  const stats     = getSmokeFreeStats(quitDate, profile.cigarettesPerDay, profile.pricePerPack, profile.cigarettesPerPack)
  const milestones = getHealthMilestones(quitDate)
  const next      = milestones.find(m => !m.achieved)
  const hours     = stats.diffHours % 24
  const minutes   = stats.diffMinutes % 60
  const seconds   = stats.diffSeconds % 60
  const isGuest = !user
  const firstName = user?.displayName?.split(' ')[0] || 'Pejuang'

  const handleBerhasil = () => {
    setBerhasil(true)
    setTimeout(() => { setShowCraving(false); setBerhasil(false) }, 2800)
  }

  const handleReset = async () => {
    setResetting(true)
    await updateProfile({ quitDate: Timestamp.fromDate(new Date(resetDate + 'T00:00:00')) })
    setResetting(false)
    setShowReset(false)
  }

  return (
    <div className="min-h-dvh pb-36" style={{ background: 'var(--cream)' }}>

      {/* Organic background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="blob-green absolute -top-10 right-0 w-64 h-64 opacity-70" />
        <div className="blob-coral absolute top-1/2 -left-10 w-48 h-48 opacity-30" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-12 pb-2 relative z-10">
        <div>
          <p className="text-xs font-600" style={{ color: 'var(--text-3)' }}>{getSalam()},</p>
          <h1 className="text-xl font-800" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text)' }}>
            {firstName} 👋
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {user?.photoURL && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.photoURL} alt="" referrerPolicy="no-referrer"
              className="w-9 h-9 rounded-full object-cover"
              style={{ border: '2.5px solid var(--green-tint)', boxShadow: 'var(--shadow-sm)' }} />
          )}
          {isGuest ? (
            <button onClick={() => router.push('/')}
              className="flex items-center gap-2 px-3 h-9 rounded-xl transition-all active:scale-90"
              style={{ background: 'white', border: '1.5px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
              <GoogleIcon />
              <span className="text-xs font-700" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text-2)' }}>
                Masuk
              </span>
            </button>
          ) : (
            <button onClick={() => logout().then(() => router.push('/'))}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-90"
              style={{ background: 'var(--card)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)', color: 'var(--text-3)' }}>
              <LogOut size={15} />
            </button>
          )}
        </div>
      </div>

      <div className="px-5 space-y-4 relative z-10 mt-2">

        {/* Streak ring card */}
        <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 150 }}
          className="rounded-[28px] p-6 flex flex-col items-center"
          style={{ background: 'var(--card)', boxShadow: 'var(--shadow-lg)' }}
        >
          <StreakRing days={stats.diffDays} hours={hours} minutes={minutes} seconds={seconds} />
          <div className="mt-4 px-4 h-10 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={quoteIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="text-sm font-600 text-center leading-relaxed italic"
                style={{ color: 'var(--text-2)', fontFamily: 'var(--font-fraunces)' }}>
                "{motivasiQuotes[quoteIndex]}"
              </motion.p>
            </AnimatePresence>
          </div>
          <motion.button
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
            onClick={() => { setResetDate(new Date().toISOString().split('T')[0]); setShowReset(true) }}
            className="mt-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-700 transition-all active:scale-95"
            style={{ color: 'var(--text-3)', fontFamily: 'var(--font-nunito)', background: 'var(--border)' }}>
            <RotateCcw size={11} />
            Mulai ulang
          </motion.button>
        </motion.div>

        {/* Stats — slightly asymmetric layout */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <div className="rounded-[24px] p-5 h-full" style={{ background: 'var(--amber-pale)', border: '1.5px solid var(--amber-tint)' }}>
              <div className="text-2xl mb-1">💰</div>
              <div className="font-900 text-2xl leading-none"
                style={{ fontFamily: 'var(--font-fraunces)', color: 'var(--amber)', letterSpacing: '-0.02em' }}>
                {formatRupiah(stats.moneySaved)}
              </div>
              <div className="text-xs font-700 mt-1.5" style={{ color: 'var(--text-2)' }}>Uang Tersimpan</div>
              <div className="text-[10px] font-600 mt-0.5" style={{ color: 'var(--text-3)' }}>
                {formatRupiah(stats.moneySaved / Math.max(1, stats.diffDays) * 30)} / bulan
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="rounded-[24px] p-5 h-full" style={{ background: 'var(--green-pale)', border: '1.5px solid var(--green-tint)' }}>
              <div className="text-2xl mb-1">🚭</div>
              <div className="font-900 text-2xl leading-none"
                style={{ fontFamily: 'var(--font-fraunces)', color: 'var(--green-mid)', letterSpacing: '-0.02em' }}>
                {formatNumber(stats.cigarettesAvoided)}
              </div>
              <div className="text-xs font-700 mt-1.5" style={{ color: 'var(--text-2)' }}>Rokok Dihindari</div>
              <div className="text-[10px] font-600 mt-0.5" style={{ color: 'var(--text-3)' }}>
                {stats.hoursLife} jam umur kembali
              </div>
            </div>
          </motion.div>
        </div>

        {/* Craving SOS button */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }}>
          <button onClick={() => setShowCraving(true)}
            className="w-full flex items-center gap-4 p-5 rounded-[24px] transition-all active:scale-[0.97] text-left group"
            style={{
              background: 'var(--coral-pale)',
              border: '1.5px solid var(--coral-tint)',
              boxShadow: '0 4px 16px rgba(240,107,77,0.12)',
            }}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
              style={{ background: 'white', boxShadow: '0 2px 8px rgba(240,107,77,0.2)' }}>
              <span className="text-2xl">🆘</span>
            </div>
            <div className="flex-1">
              <div className="text-sm font-800" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--coral-mid)' }}>
                Lagi ngidam rokok?
              </div>
              <div className="text-xs font-600 mt-0.5" style={{ color: 'rgba(209,90,61,0.6)' }}>
                Ketuk untuk cara mengatasi keinginan
              </div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--coral-tint)" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </motion.div>

        {/* Next milestone */}
        {next && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}>
            <div className="rounded-[24px] p-5" style={{ background: 'var(--card)', boxShadow: 'var(--shadow-card)', border: '1px solid var(--border)' }}>
              <div className="flex items-center gap-2 mb-3">
                <Zap size={13} style={{ color: 'var(--green-mid)' }} />
                <span className="text-[10px] font-800 tracking-widest uppercase"
                  style={{ fontFamily: 'var(--font-nunito)', color: 'var(--green-mid)' }}>
                  Milestone Berikutnya
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{next.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-800 text-sm" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text)' }}>
                    {next.label}
                  </div>
                  <p className="text-xs font-500 mt-0.5 truncate" style={{ color: 'var(--text-2)' }}>
                    {next.description}
                  </p>
                  <div className="mt-2.5 h-2 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
                    <motion.div className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, var(--coral), var(--amber), var(--green))' }}
                      initial={{ width: 0 }}
                      animate={{ width: `${next.progress}%` }}
                      transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
                    />
                  </div>
                  <div className="text-[10px] font-700 mt-1" style={{ color: 'var(--text-3)' }}>
                    {next.progress.toFixed(0)}% tercapai
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Achievement gamification section */}
        <AchievementSection stats={stats} />

        {/* Progress snippet */}
        <ProgressSnippet stats={stats} quitDate={quitDate} />

        {/* Cravings snippet */}
        <CravingSnippet />
      </div>

      {/* Craving modal */}
      <AnimatePresence>
        {showCraving && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-end"
            style={{ background: 'rgba(44,31,20,0.5)', backdropFilter: 'blur(6px)' }}
            onClick={e => e.target === e.currentTarget && setShowCraving(false)}
          >
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 380 }}
              className="w-full max-w-[430px] mx-auto rounded-t-[32px] px-6 pt-6 pb-10 max-h-[88dvh] overflow-y-auto"
              style={{ background: 'var(--cream)' }}
            >
              {/* Handle */}
              <div className="w-10 h-1 rounded-full mx-auto mb-6" style={{ background: 'var(--border-mid)' }} />

              <AnimatePresence mode="wait">
                {berhasil ? (
                  <motion.div key="success"
                    initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="flex flex-col items-center text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, delay: 0.1 }}
                      className="text-6xl mb-5">🏆</motion.div>
                    <h3 className="text-2xl font-900 mb-2"
                      style={{ fontFamily: 'var(--font-fraunces)', color: 'var(--green-mid)', letterSpacing: '-0.02em' }}>
                      Kamu berhasil!
                    </h3>
                    <p className="font-600" style={{ color: 'var(--text-2)' }}>
                      Keinginan itu sudah berlalu. Kamu jauh lebih kuat dari yang kamu kira.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="tips" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <h3 className="text-xl font-900" style={{ fontFamily: 'var(--font-fraunces)', color: 'var(--text)', letterSpacing: '-0.02em' }}>
                          Kamu pasti bisa! 💪
                        </h3>
                        <p className="text-sm font-500 mt-1" style={{ color: 'var(--text-2)' }}>
                          Keinginan berlangsung 3–5 menit saja. Coba ini:
                        </p>
                      </div>
                      <button onClick={() => setShowCraving(false)}
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ml-3"
                        style={{ background: 'var(--border)', color: 'var(--text-2)' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 mt-5 mb-5">
                      {strategiMengatasi.map((s, i) => (
                        <motion.div key={i}
                          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="rounded-2xl p-3.5"
                          style={{ background: 'var(--card)', boxShadow: 'var(--shadow-card)', border: '1px solid var(--border)' }}>
                          <div className="text-xl mb-1.5">{s.ikon}</div>
                          <div className="text-sm font-800 mb-0.5" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text)' }}>
                            {s.judul}
                          </div>
                          <div className="text-[11px] font-500 leading-tight" style={{ color: 'var(--text-3)' }}>{s.desc}</div>
                        </motion.div>
                      ))}
                    </div>

                    <button onClick={handleBerhasil}
                      className="w-full py-4 rounded-2xl text-sm font-800 transition-all active:scale-[0.97]"
                      style={{
                        fontFamily: 'var(--font-nunito)',
                        background: 'var(--green)',
                        color: 'white',
                        boxShadow: '0 4px 20px rgba(61,190,143,0.35)',
                      }}>
                      ✅ Saya berhasil menahan keinginan!
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reset modal */}
      <AnimatePresence>
        {showReset && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-end"
            style={{ background: 'rgba(44,31,20,0.5)', backdropFilter: 'blur(6px)' }}
            onClick={e => e.target === e.currentTarget && setShowReset(false)}
          >
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 380 }}
              className="w-full max-w-[430px] mx-auto rounded-t-[32px] px-6 pt-6 pb-10"
              style={{ background: 'var(--cream)' }}
            >
              <div className="w-10 h-1 rounded-full mx-auto mb-6" style={{ background: 'var(--border-mid)' }} />

              <div className="text-4xl text-center mb-4">🌱</div>
              <h3 className="text-xl font-900 text-center mb-1"
                style={{ fontFamily: 'var(--font-fraunces)', color: 'var(--text)', letterSpacing: '-0.02em' }}>
                Tidak apa-apa.
              </h3>
              <p className="text-sm font-500 text-center mb-6 leading-relaxed" style={{ color: 'var(--text-2)' }}>
                Setiap hari baru adalah kesempatan baru. Pilih tanggal mulaimu yang baru.
              </p>

              <div className="rounded-2xl overflow-hidden mb-4"
                style={{ background: 'var(--card)', border: '1.5px solid var(--border)' }}>
                <input type="date" value={resetDate} onChange={e => setResetDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full bg-transparent px-4 py-4 text-base font-700 focus:outline-none"
                  style={{ color: 'var(--text)', fontFamily: 'var(--font-nunito)', colorScheme: 'light' }} />
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                {[
                  { label: '✨ Hari ini', offset: 0 },
                  { label: '📅 Kemarin', offset: 1 },
                ].map(({ label, offset }) => {
                  const d = new Date(); d.setDate(d.getDate() - offset)
                  const val = d.toISOString().split('T')[0]
                  return (
                    <button key={label} onClick={() => setResetDate(val)}
                      className="py-2.5 px-3 rounded-xl text-xs font-700 text-center transition-all active:scale-95"
                      style={{
                        fontFamily: 'var(--font-nunito)',
                        background: resetDate === val ? 'var(--green-pale)' : 'var(--card)',
                        border: `1.5px solid ${resetDate === val ? 'var(--green-tint)' : 'var(--border)'}`,
                        color: resetDate === val ? 'var(--green-mid)' : 'var(--text-2)',
                      }}>
                      {label}
                    </button>
                  )
                })}
              </div>

              <button onClick={handleReset} disabled={resetting}
                className="w-full py-4 rounded-2xl text-sm font-800 flex items-center justify-center gap-2 transition-all active:scale-[0.97] disabled:opacity-60"
                style={{
                  fontFamily: 'var(--font-nunito)',
                  background: 'var(--green)',
                  color: 'white',
                  boxShadow: '0 4px 20px rgba(61,190,143,0.35)',
                }}>
                {resetting
                  ? <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  : '🚀 Mulai Lagi Sekarang!'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navigation />
    </div>
  )
}

/* ─── Progress Snippet ────────────────────────────────────── */
function ProgressSnippet({
  stats,
  quitDate,
}: {
  stats: ReturnType<typeof getSmokeFreeStats>
  quitDate: Date
}) {
  const router = useRouter()
  const milestones = getHealthMilestones(quitDate)
  const achieved = milestones.filter(m => m.achieved).length
  const preview = milestones.slice(0, 4)

  const projections = [
    { period: '1 Bln',  days: 30 },
    { period: '6 Bln',  days: 180 },
    { period: '1 Thn',  days: 365 },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }}>
      <div className="rounded-[24px] overflow-hidden" style={{ background: 'var(--card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>

        {/* Header */}
        <button onClick={() => router.push('/progress')}
          className="w-full flex items-center justify-between px-5 pt-5 pb-3 active:opacity-70 transition-opacity">
          <div className="flex items-center gap-2">
            <span className="text-base">📈</span>
            <span className="text-sm font-800" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text)' }}>Perkembangan</span>
          </div>
          <div className="flex items-center gap-1 text-xs font-700" style={{ color: 'var(--green-mid)' }}>
            Lihat detail <ChevronRight size={13} />
          </div>
        </button>

        {/* Savings projection row */}
        <div className="grid grid-cols-3 gap-2 px-5 pb-4">
          {projections.map(({ period, days }) => {
            const amount = (stats.moneySaved / Math.max(1, stats.diffDays)) * days
            return (
              <div key={period} className="text-center py-3 rounded-2xl"
                style={{ background: 'var(--amber-pale)', border: '1px solid var(--amber-tint)' }}>
                <div className="font-900 text-sm leading-tight"
                  style={{ fontFamily: 'var(--font-fraunces)', color: 'var(--amber)', letterSpacing: '-0.02em' }}>
                  {formatRupiah(amount)}
                </div>
                <div className="text-[9px] font-700 mt-0.5" style={{ color: 'var(--text-3)' }}>{period}</div>
              </div>
            )
          })}
        </div>

        {/* Health milestones mini-list */}
        <div className="px-5 pb-5 space-y-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-800" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text-2)' }}>
              🩺 Pemulihan Kesehatan
            </span>
            <span className="text-[10px] font-700 px-2 py-0.5 rounded-full"
              style={{ background: 'var(--green-pale)', color: 'var(--green-mid)' }}>
              {achieved}/{milestones.length}
            </span>
          </div>
          {preview.map((m) => (
            <div key={m.label} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl"
              style={{
                background: m.achieved ? 'var(--green-pale)' : 'var(--cream)',
                border: `1px solid ${m.achieved ? 'var(--green-tint)' : 'var(--border)'}`,
              }}>
              <span className="text-base flex-shrink-0"
                style={{ filter: m.achieved ? 'none' : 'grayscale(1)', opacity: m.achieved ? 1 : 0.35 }}>
                {m.icon}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-700 truncate"
                  style={{ fontFamily: 'var(--font-nunito)', color: m.achieved ? 'var(--green-dark)' : 'var(--text-3)' }}>
                  {m.label}
                </div>
                {!m.achieved && m.progress > 0 && (
                  <div className="mt-1 h-1 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
                    <motion.div className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, var(--coral), var(--green))' }}
                      initial={{ width: 0 }}
                      animate={{ width: `${m.progress}%` }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    />
                  </div>
                )}
              </div>
              {m.achieved ? (
                <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--green)' }}>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              ) : (
                <span className="text-[10px] font-700 flex-shrink-0" style={{ color: 'var(--text-3)' }}>
                  {m.progress > 0 ? `${m.progress.toFixed(0)}%` : '🔒'}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Cravings Snippet ────────────────────────────────────── */
const GUEST_CRAVINGS_KEY = 'smoke_free_guest_cravings'

function loadLocalCravings(): CravingLog[] {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(GUEST_CRAVINGS_KEY) : null
    if (!raw) return []
    const { Timestamp } = require('firebase/firestore')
    return (JSON.parse(raw) as any[]).map(c => ({
      ...c,
      timestamp: Timestamp.fromDate(new Date(c.timestamp)),
    }))
  } catch { return [] }
}

function CravingSnippet() {
  const router = useRouter()
  const { user } = useAuth()
  const [cravings, setCravings] = useState<CravingLog[]>([])

  useEffect(() => {
    if (user) {
      getCravings(user.uid).then(data => setCravings(data.slice(0, 3)))
    } else {
      setCravings(loadLocalCravings().slice(0, 3))
    }
  }, [user])

  const total = cravings.length
  const totalBerhasil = cravings.filter(c => c.resisted).length
  const rate = total > 0 ? Math.round((totalBerhasil / total) * 100) : null

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.46 }}>
      <div className="rounded-[24px] overflow-hidden" style={{ background: 'var(--card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-base">🌬️</span>
            <span className="text-sm font-800" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text)' }}>Keinginan</span>
          </div>
          <button onClick={() => router.push('/cravings')}
            className="flex items-center gap-1 text-xs font-700 active:opacity-70 transition-opacity"
            style={{ color: 'var(--green-mid)' }}>
            Lihat semua <ChevronRight size={13} />
          </button>
        </div>

        {/* Stats row */}
        {rate !== null ? (
          <div className="grid grid-cols-3 gap-2 px-5 pb-4">
            {[
              { label: 'Dicatat',        value: total,           color: 'var(--text)' },
              { label: 'Berhasil',       value: totalBerhasil,   color: 'var(--green-mid)' },
              { label: 'Tingkat sukses', value: `${rate}%`,      color: 'var(--green-mid)' },
            ].map(s => (
              <div key={s.label} className="rounded-2xl p-3 text-center"
                style={{ background: 'var(--cream)', border: '1px solid var(--border)' }}>
                <div className="font-900 text-lg leading-none"
                  style={{ fontFamily: 'var(--font-fraunces)', color: s.color, letterSpacing: '-0.02em' }}>
                  {s.value}
                </div>
                <div className="text-[9px] font-700 mt-1" style={{ color: 'var(--text-3)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        ) : null}

        {/* Recent entries */}
        {cravings.length > 0 ? (
          <div className="px-5 pb-4 space-y-2">
            {cravings.slice(0, 2).map(c => (
              <div key={c.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                style={{
                  background: c.resisted ? 'var(--green-pale)' : 'var(--coral-pale)',
                  border: `1px solid ${c.resisted ? 'var(--green-tint)' : 'var(--coral-tint)'}`,
                }}>
                <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: c.resisted ? 'var(--green)' : 'var(--coral)' }}>
                  {c.resisted
                    ? <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    : <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  }
                </div>
                <span className="text-xs font-700 flex-1" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text-2)' }}>
                  {c.trigger}
                </span>
                <div className="flex gap-0.5 flex-shrink-0">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <div key={j} className="w-1 h-2.5 rounded-sm"
                      style={{ background: j < Math.ceil(c.intensity / 2) ? 'var(--coral)' : 'var(--border)' }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-5 pb-5 text-center">
            <p className="text-xs font-600" style={{ color: 'var(--text-3)' }}>Belum ada keinginan dicatat</p>
          </div>
        )}

        {/* Quick log button */}
        <div className="px-5 pb-5">
          <button onClick={() => router.push('/cravings')}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-700 transition-all active:scale-[0.97]"
            style={{
              background: 'var(--coral-pale)',
              border: '1.5px solid var(--coral-tint)',
              color: 'var(--coral-mid)',
              fontFamily: 'var(--font-nunito)',
            }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
            </svg>
            Catat Keinginan Sekarang
          </button>
        </div>
      </div>
    </motion.div>
  )
}

function AchievementSection({ stats }: { stats: ReturnType<typeof getSmokeFreeStats> }) {
  const router = useRouter()
  const unlocked = badges.filter(b => b.syarat(stats))
  const locked   = badges.filter(b => !b.syarat(stats))
  const latest   = unlocked[unlocked.length - 1]
  const nextBadge = locked[0]

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}>
      <div className="rounded-[24px] overflow-hidden" style={{ background: 'var(--card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>

        {/* Header */}
        <button onClick={() => router.push('/achievements')}
          className="w-full flex items-center justify-between px-5 pt-5 pb-3 active:opacity-70 transition-opacity">
          <div className="flex items-center gap-2">
            <span className="text-base">🏅</span>
            <span className="text-sm font-800" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text)' }}>
              Pencapaian
            </span>
            <span className="text-xs font-700 px-2 py-0.5 rounded-full"
              style={{ background: 'var(--green-pale)', color: 'var(--green-mid)', fontFamily: 'var(--font-nunito)' }}>
              {unlocked.length}/{badges.length}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs font-700" style={{ color: 'var(--green-mid)' }}>
            Lihat semua <ChevronRight size={13} />
          </div>
        </button>

        {/* Overall progress bar */}
        <div className="px-5 pb-4">
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
            <motion.div className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, var(--coral), var(--amber), var(--green))' }}
              initial={{ width: 0 }}
              animate={{ width: `${(unlocked.length / badges.length) * 100}%` }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.34, 1.2, 0.64, 1] }}
            />
          </div>
        </div>

        {/* Latest unlocked badge */}
        {latest && (
          <div className="mx-5 mb-4 p-4 rounded-2xl flex items-center gap-3"
            style={{ background: latest.bg, border: `1.5px solid ${latest.border}` }}>
            <motion.div
              animate={{ rotate: [0, -8, 8, -4, 4, 0], scale: [1, 1.15, 1.15, 1.08, 1.08, 1] }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="text-3xl flex-shrink-0">
              {latest.ikon}
            </motion.div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-900 px-1.5 py-0.5 rounded-md"
                  style={{ background: latest.color, color: 'white', fontFamily: 'var(--font-nunito)', fontSize: '9px', letterSpacing: '0.05em' }}>
                  TERBARU
                </span>
              </div>
              <div className="text-sm font-800 mt-0.5" style={{ fontFamily: 'var(--font-nunito)', color: latest.color }}>
                {latest.judul}
              </div>
              <div className="text-[11px] font-500" style={{ color: 'var(--text-2)' }}>{latest.deskripsi}</div>
            </div>
            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--green)', boxShadow: '0 2px 8px rgba(61,190,143,0.4)' }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        )}

        {/* Badge strip — horizontal scroll */}
        <div className="pb-5">
          <div className="flex gap-2.5 overflow-x-auto px-5 pb-1 no-scrollbar">
            {badges.map((badge, i) => {
              const done = badge.syarat(stats)
              return (
                <motion.div key={badge.id}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.04, type: 'spring', stiffness: 260, damping: 20 }}
                  className="flex-shrink-0 flex flex-col items-center gap-1.5 w-14"
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center relative"
                    style={{
                      background: done ? badge.bg : 'var(--border)',
                      border: `1.5px solid ${done ? badge.border : 'transparent'}`,
                      boxShadow: done ? `0 4px 12px ${badge.border}80` : 'none',
                    }}>
                    <span className="text-xl" style={{ filter: done ? 'none' : 'grayscale(1)', opacity: done ? 1 : 0.3 }}>
                      {badge.ikon}
                    </span>
                    {done && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
                        style={{ background: 'var(--green)', border: '1.5px solid white' }}>
                        <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5">
                          <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] font-700 text-center leading-tight"
                    style={{ color: done ? 'var(--text-2)' : 'var(--text-3)', fontFamily: 'var(--font-nunito)' }}>
                    {badge.judul}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Next badge to unlock */}
        {nextBadge && (
          <div className="mx-5 mb-5 p-3.5 rounded-2xl flex items-center gap-3"
            style={{ background: 'var(--cream)', border: '1.5px dashed var(--border-mid)' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--border)', border: '1.5px solid var(--border-mid)' }}>
              <span className="text-xl" style={{ filter: 'grayscale(1)', opacity: 0.3 }}>{nextBadge.ikon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-800 tracking-wider uppercase mb-0.5"
                style={{ color: 'var(--text-3)', fontFamily: 'var(--font-nunito)' }}>
                Berikutnya
              </div>
              <div className="text-xs font-800" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text-2)' }}>
                {nextBadge.judul}
              </div>
              <div className="text-[10px] font-500" style={{ color: 'var(--text-3)' }}>{nextBadge.deskripsi}</div>
            </div>
            <span className="text-lg">🔒</span>
          </div>
        )}
      </div>
    </motion.div>
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
