'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Timestamp } from 'firebase/firestore'
import { useAuth } from '@/contexts/AuthContext'
import { useUserData } from '@/contexts/UserDataContext'
import { Navigation } from '@/components/Navigation'
import { StreakRing } from '@/components/StreakRing'
import { formatRupiah, formatNumber, getSalam } from '@/lib/utils'
import { useActiveHabit } from '@/habits/useActiveHabit'
import type { Badge, HabitStats, TipItem } from '@/habits/types'
import { InsightCard } from '@/components/InsightCard'
import { VideoSection } from '@/components/VideoSection'
import { HabitSelector } from '@/components/HabitSelector'
import { PinUnlockSheet } from '@/components/PinUnlockSheet'
import { MindfulPausePanel } from '@/components/MindfulPausePanel'
import { DailyPracticeCard } from '@/components/DailyPracticeCard'
import { useUnlock } from '@/habits/UnlockContext'
import { useI18n } from '@/i18n/I18nProvider'

export default function DashboardPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { loading, updateActiveHabitData } = useUserData()
  const { config, stats, milestones, habitData, habitId } = useActiveHabit()
  const { isUnlocked } = useUnlock()
  const { t, locale } = useI18n()

  const [, setNow] = useState(new Date())
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [showCraving, setShowCraving] = useState(false)
  const [berhasil, setBerhasil] = useState(false)
  const [randomTips, setRandomTips] = useState<TipItem[]>([])
  const [showReset, setShowReset] = useState(false)
  const [resetDate, setResetDate] = useState(new Date().toISOString().split('T')[0])
  const [resetting, setResetting] = useState(false)
  const [unlockOpen, setUnlockOpen] = useState(false)

  const isHiddenLocked =
    !!habitData && habitId !== null &&
    'privacy' in habitData && (habitData as { privacy?: string }).privacy === 'hidden' &&
    !isUnlocked(habitId)

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (!config) return
    const t = setInterval(() => setQuoteIndex(i => (i + 1) % config.quotes.length), 8000)
    return () => clearInterval(t)
  }, [config])

  useEffect(() => {
    if (!loading && !habitData) router.push('/onboarding')
  }, [loading, habitData, router])

  if (loading || !config || !stats || !habitData || !habitId) {
    return (
      <div className="flex items-center justify-center min-h-dvh" style={{ background: 'var(--cream)' }}>
        <div className="w-8 h-8 rounded-full border-[3px] border-t-transparent animate-spin"
          style={{ borderColor: 'var(--green)', borderTopColor: 'transparent' }} />
      </div>
    )
  }

  // Privacy guard: if the active habit is hidden and not unlocked this
  // session, block the dashboard content and offer an unlock prompt.
  // Prevents a hidden habit's data from flashing on page load.
  if (isHiddenLocked) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center px-6" style={{ background: 'var(--cream)' }}>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 text-3xl"
          style={{ background: 'var(--green-pale)', border: '1.5px solid var(--green-tint)' }}>
          🔒
        </div>
        <h2 className="tracking-tight text-center mb-1"
          style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>
          {config.label}
        </h2>
        <p className="text-sm font-500 text-center mb-6 max-w-[280px]" style={{ color: 'var(--text-2)' }}>
          {locale === 'en' ? 'This habit is hidden. Unlock to see your progress.' : 'Kebiasaan ini disembunyikan. Buka untuk melihat progresnya.'}
        </p>
        <div className="flex gap-2 w-full max-w-[280px]">
          <button onClick={() => router.push('/profil')}
            className="flex-1 py-4 rounded-2xl text-sm font-700 transition-all active:scale-[0.97]"
            style={{ fontFamily: 'var(--font-nunito)', background: 'var(--card)', border: '1.5px solid var(--border)', color: 'var(--text-2)' }}>
            {t('profile.title')}
          </button>
          <button onClick={() => setUnlockOpen(true)}
            className="flex-1 py-4 rounded-2xl text-sm font-800 transition-all active:scale-[0.97]"
            style={{ fontFamily: 'var(--font-nunito)', background: 'var(--green)', color: 'white', boxShadow: '0 4px 20px rgba(61,190,143,0.35)' }}>
            🔓 {t('selector.unlock')}
          </button>
        </div>
        <PinUnlockSheet
          open={unlockOpen}
          habitId={habitId}
          config={config}
          data={habitData}
          onClose={() => setUnlockOpen(false)}
        />
      </div>
    )
  }

  const next    = milestones.find(m => !m.achieved)
  const hours   = stats.diffHours % 24
  const minutes = stats.diffMinutes % 60
  const seconds = stats.diffSeconds % 60
  const firstName = user?.displayName?.split(' ')[0] || (locale === 'en' ? 'Friend' : 'Pejuang')

  const handleBerhasil = () => {
    setBerhasil(true)
    setTimeout(() => { setShowCraving(false); setBerhasil(false) }, 2800)
  }

  const handleReset = async () => {
    setResetting(true)
    await updateActiveHabitData({ quitDate: Timestamp.fromDate(new Date(resetDate + 'T00:00:00')) })
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
      <div className="flex items-center justify-between gap-3 px-5 pt-12 pb-2 relative z-10">
        <div className="min-w-0">
          <p className="text-sm font-600" style={{ color: 'var(--text-3)' }}>{getSalam(locale)},</p>
          <h1 className="text-2xl font-800 truncate" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text)' }}>
            {firstName} {config.iconPack.greeting}
          </h1>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <HabitSelector />
          <button onClick={() => router.push('/profil')}
            className="flex items-center gap-2 transition-all active:scale-95">
            {user?.photoURL ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.photoURL} alt="" referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover"
                style={{ border: '2.5px solid var(--green-tint)', boxShadow: 'var(--shadow-sm)' }} />
            ) : (
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-800"
                style={{ background: 'var(--green-pale)', border: '2.5px solid var(--green-tint)', color: 'var(--green-mid)', fontFamily: 'var(--font-nunito)' }}>
                {firstName[0]?.toUpperCase() || 'P'}
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Key on habitId so switching habit cross-fades content; inner motion
          elements replay their own entrance animations for a "new habit"
          greeting effect alongside the theme transition. */}
      <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={habitId}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="px-5 space-y-4 relative z-10 mt-2">

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
                "{config.quotes[quoteIndex]}"
              </motion.p>
            </AnimatePresence>
          </div>
          <motion.button
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
            onClick={() => { setResetDate(new Date().toISOString().split('T')[0]); setShowReset(true) }}
            className="mt-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-700 transition-all active:scale-95"
            style={{ color: 'var(--text-3)', fontFamily: 'var(--font-nunito)', background: 'var(--border)' }}>
            <span className="text-sm leading-none">↺</span>
            {t('progress.reset')}
          </motion.button>
        </motion.div>

        {/* Stats - money card is skipped for habits without money tracking */}
        <div className={`grid gap-3 ${config.hasMoneyTracking ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {config.hasMoneyTracking && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <div className="rounded-[24px] p-5 h-full" style={{ background: 'var(--amber-pale)', border: '1.5px solid var(--amber-tint)' }}>
                <div className="text-2xl mb-1 leading-none">💰</div>
                <div className="font-900 text-2xl leading-none"
                  style={{ fontFamily: 'var(--font-fraunces)', color: 'var(--amber-strong)', letterSpacing: '-0.02em' }}>
                  {formatRupiah(stats.moneySaved)}
                </div>
                <div className="text-xs font-700 mt-1.5" style={{ color: 'var(--text-2)' }}>{t('progress.totalSavings')}</div>
                <div className="text-xs font-600 mt-0.5" style={{ color: 'var(--text-3)' }}>
                  {formatRupiah(stats.moneySaved / Math.max(1, stats.diffDays) * 30)} {locale === 'en' ? '/ month' : '/ bulan'}
                </div>
              </div>
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="rounded-[24px] p-5 h-full" style={{ background: 'var(--green-pale)', border: '1.5px solid var(--green-tint)' }}>
              <div className="text-2xl mb-1 leading-none">{config.emoji}</div>
              <div className="font-900 text-2xl leading-none"
                style={{ fontFamily: 'var(--font-fraunces)', color: 'var(--green-mid)', letterSpacing: '-0.02em' }}>
                {formatNumber(stats.unitsAvoided)}
              </div>
              <div className="text-xs font-700 mt-1.5" style={{ color: 'var(--text-2)' }}>{config.copy.unitsAvoidedLabel}</div>
              <div className="text-xs font-600 mt-0.5" style={{ color: 'var(--text-3)' }}>
                {stats.timeReclaimedHours} {config.copy.timeReclaimedLabel}
              </div>
            </div>
          </motion.div>
        </div>

        {/* PMO-specific: daily mindfulness cue above the information sections */}
        {habitId === 'porn' && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <DailyPracticeCard />
          </motion.div>
        )}

        {/* Video motivasi — auto-hides for PMO (no videos configured) */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}>
          <VideoSection />
        </motion.div>

        {/* Insight card */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }}>
          <InsightCard />
        </motion.div>

        {/* Craving affordance — SOS for smoking/alcohol, Napas Sadar for PMO.
            PMO recovery is better served by a calm, invitational tone; the
            red-alarm SOS reinforces panic and can retrigger the cycle. */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }}>
          {habitId === 'porn' ? (
            <MindfulPausePanel
              onOpen={() => {
                const allTips = config.tipCategories.flatMap(c => c.tips)
                const shuffled = allTips.sort(() => Math.random() - 0.5).slice(0, 6)
                setRandomTips(shuffled)
                setBerhasil(false)
                setShowCraving(true)
              }}
            />
          ) : (
            <button onClick={() => {
                const allTips = config.tipCategories.flatMap(c => c.tips)
                const shuffled = allTips.sort(() => Math.random() - 0.5).slice(0, 6)
                setRandomTips(shuffled)
                setBerhasil(false)
                setShowCraving(true)
              }}
              className="w-full flex items-center gap-4 p-5 rounded-[24px] transition-all active:scale-[0.97] text-left group"
              style={{
                background: config.copy.sosBg,
                border: `1.5px solid ${config.copy.sosBorder}`,
                boxShadow: `0 4px 16px color-mix(in srgb, ${config.copy.sosColor} 18%, transparent)`,
              }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 text-2xl"
                style={{ background: 'var(--card)', boxShadow: `0 2px 8px color-mix(in srgb, ${config.copy.sosColor} 25%, transparent)` }}>
                {config.copy.sosEmoji}
              </div>
              <div className="flex-1">
                <div className="text-sm font-800" style={{ fontFamily: 'var(--font-nunito)', color: config.copy.sosColor }}>
                  {config.copy.sosPrompt}
                </div>
                <div className="text-xs font-600 mt-0.5"
                  style={{ color: `color-mix(in srgb, ${config.copy.sosColor} 65%, transparent)` }}>
                  {config.copy.sosSubtext}
                </div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={config.copy.sosBorder} strokeWidth="2.5">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          )}
        </motion.div>

        {/* Next milestone */}
        {next && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}>
            <div className="rounded-[24px] p-5" style={{ background: 'var(--card)', boxShadow: 'var(--shadow-card)', border: '1px solid var(--border)' }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-800 tracking-widest uppercase"
                  style={{ fontFamily: 'var(--font-nunito)', color: 'var(--green-mid)' }}>
                  {t('progress.nextMilestone')}
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
                    {next.progress.toFixed(0)}% {locale === 'en' ? 'complete' : 'tercapai'}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Achievement gamification section */}
        <AchievementSection stats={stats} badges={config.badges} iconPack={config.iconPack} />

      </motion.div>
      </AnimatePresence>

      {/* Craving modal */}
      <AnimatePresence>
        {showCraving && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-end"
            style={{ background: 'var(--overlay)', backdropFilter: 'blur(6px)' }}
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
                      className="text-6xl mb-5">{config.iconPack.success}</motion.div>
                    <h3 className="text-2xl font-900 mb-2"
                      style={{ fontFamily: 'var(--font-fraunces)', color: 'var(--green-mid)', letterSpacing: '-0.02em' }}>
                      {t('cravings.success')}
                    </h3>
                    <p className="font-600" style={{ color: 'var(--text-2)' }}>
                      {t('cravings.successSub')}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="tips" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <h3 className="text-xl font-900" style={{ fontFamily: 'var(--font-fraunces)', color: 'var(--text)', letterSpacing: '-0.02em' }}>
                          {t('sos.holdOn')} {config.iconPack.encouragement}
                        </h3>
                        <p className="text-sm font-500 mt-1" style={{ color: 'var(--text-2)' }}>
                          {t('sos.sub')}
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
                      {randomTips.map((s, i) => (
                        <motion.div key={s.judul}
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
                      ✅ {t('sos.iDidIt')}
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
            style={{ background: 'var(--overlay)', backdropFilter: 'blur(6px)' }}
            onClick={e => e.target === e.currentTarget && setShowReset(false)}
          >
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 380 }}
              className="w-full max-w-[430px] mx-auto rounded-t-[32px] px-6 pt-6 pb-10"
              style={{ background: 'var(--cream)' }}
            >
              <div className="w-10 h-1 rounded-full mx-auto mb-6" style={{ background: 'var(--border-mid)' }} />

              <div className="text-4xl text-center mb-4">{config.iconPack.resetHero}</div>
              <h3 className="text-xl font-900 text-center mb-1"
                style={{ fontFamily: 'var(--font-fraunces)', color: 'var(--text)', letterSpacing: '-0.02em' }}>
                {t('sos.slip.title')}
              </h3>
              <p className="text-sm font-500 text-center mb-6 leading-relaxed" style={{ color: 'var(--text-2)' }}>
                {t('reset.sub')}
              </p>

              <div className="rounded-2xl overflow-hidden mb-4"
                style={{ background: 'var(--card)', border: '1.5px solid var(--border)' }}>
                <input type="date" value={resetDate} onChange={e => setResetDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full bg-transparent px-4 py-4 text-base font-700 focus:outline-none"
                  style={{ color: 'var(--text)', fontFamily: 'var(--font-nunito)' }} />
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                {[
                  { label: locale === 'en' ? '✨ Today' : '✨ Hari ini', offset: 0 },
                  { label: locale === 'en' ? '📅 Yesterday' : '📅 Kemarin', offset: 1 },
                ].map(({ label, offset }) => {
                  const d = new Date(); d.setDate(d.getDate() - offset)
                  const val = d.toISOString().split('T')[0]
                  const active = resetDate === val
                  return (
                    <button key={label} onClick={() => setResetDate(val)}
                      className="py-2.5 px-3 rounded-xl text-xs font-700 text-center transition-all active:scale-95"
                      style={{
                        fontFamily: 'var(--font-nunito)',
                        background: active ? 'var(--green-pale)' : 'var(--card)',
                        border: `1.5px solid ${active ? 'var(--green-tint)' : 'var(--border)'}`,
                        color: active ? 'var(--green-mid)' : 'var(--text-2)',
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
                  : `${config.iconPack.restart} ${locale === 'en' ? 'Start Over Now!' : 'Mulai Lagi Sekarang!'}`}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navigation />
    </div>
  )
}

function AchievementSection({ stats, badges, iconPack }: { stats: HabitStats; badges: Badge[]; iconPack: { achievements: string } }) {
  const router = useRouter()
  const { t, locale } = useI18n()
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
            <span className="text-base">{iconPack.achievements}</span>
            <span className="text-sm font-800" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text)' }}>
              {t('achievements.title')}
            </span>
            <span className="text-xs font-700 px-2 py-0.5 rounded-full"
              style={{ background: 'var(--green-pale)', color: 'var(--green-mid)', fontFamily: 'var(--font-nunito)' }}>
              {unlocked.length}/{badges.length}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs font-700" style={{ color: 'var(--green-mid)' }}>
            {locale === 'en' ? 'See all' : 'Lihat semua'} <span>→</span>
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
                  {locale === 'en' ? 'LATEST' : 'TERBARU'}
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

        {/* Badge strip - horizontal scroll */}
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
                {locale === 'en' ? 'Next' : 'Berikutnya'}
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
