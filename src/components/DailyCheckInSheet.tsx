'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useGamification, type CheckInResult } from '@/gamification/useGamification'
import { CelebrationBurst } from '@/components/CelebrationBurst'
import { useI18n } from '@/i18n/I18nProvider'
import { hapticSuccess, hapticTap } from '@/lib/haptics'

type Mood = 'calm' | 'okay' | 'tough'

const MOODS: { id: Mood; emoji: string; id_label: string; en_label: string }[] = [
  { id: 'calm',  emoji: '😌', id_label: 'Tenang', en_label: 'Calm' },
  { id: 'okay',  emoji: '😐', id_label: 'Biasa',  en_label: 'Okay' },
  { id: 'tough', emoji: '😣', id_label: 'Berat',  en_label: 'Tough' },
]

/**
 * The on-open moment: a once-a-day springy bottom sheet. The check-in IS the
 * streak action (Finch model). Flow: welcome → one-tap urge mood → reward
 * reveal (variable XP + streak + celebration). Relapse-safe, never punishing.
 */
export function DailyCheckInSheet({ onResult }: { onResult?: (r: CheckInResult) => void }) {
  const g = useGamification()
  const { locale } = useI18n()
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [step, setStep] = useState<'mood' | 'reward'>('mood')
  const [mood, setMood] = useState<Mood | null>(null)
  const [result, setResult] = useState<CheckInResult | null>(null)
  const [burst, setBurst] = useState(0)

  useEffect(() => setMounted(true), [])

  // Auto-open once per day when a check-in is due.
  useEffect(() => {
    if (g?.needsCheckInToday && !dismissed) setOpen(true)
  }, [g?.needsCheckInToday, dismissed])

  if (!mounted || !g) return null

  const close = () => { setOpen(false); setDismissed(true) }

  const handleMood = async (m: Mood) => {
    setMood(m)
    hapticTap()
    const r = await g.checkIn()
    setResult(r)
    setStep('reward')
    setBurst(b => b + 1)
    hapticSuccess()
    onResult?.(r)
  }

  const milestoneCopy = (streak: number) =>
    locale === 'en' ? `${streak}-day streak! 🔥` : `Streak ${streak} hari! 🔥`

  const moodLine = (m: Mood | null) => {
    if (m === 'tough') return locale === 'en' ? 'Tough days count the most. You still showed up.' : 'Hari berat justru paling berarti. Kamu tetap hadir.'
    if (m === 'okay') return locale === 'en' ? 'Steady wins. One more day in the bank.' : 'Konsisten itu menang. Satu hari lagi tercatat.'
    return locale === 'en' ? 'Love that calm. Keep riding it.' : 'Ketenangan itu berharga. Pertahankan.'
  }

  const sheet = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-end"
          style={{ background: 'var(--overlay)', backdropFilter: 'blur(6px)' }}
          onClick={e => e.target === e.currentTarget && close()}
        >
          <motion.div
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 380 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => { if (info.offset.y > 110) close() }}
            className="relative w-full max-w-[430px] mx-auto rounded-t-[32px] px-6 pt-4 pb-10"
            style={{ background: 'var(--cream)' }}
          >
            {/* Drag handle */}
            <div className="w-10 h-1.5 rounded-full mx-auto mb-6" style={{ background: 'var(--border-mid)' }} />
            <CelebrationBurst trigger={burst} />

            <AnimatePresence mode="wait">
              {step === 'mood' ? (
                <motion.div key="mood" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-center">
                  <div className="text-5xl mb-3">{g.tier.emoji}</div>
                  <h2 className="text-2xl font-900 mb-1"
                    style={{ fontFamily: 'var(--font-fraunces)', color: 'var(--text)', letterSpacing: '-0.02em' }}>
                    {locale === 'en' ? 'Welcome back' : 'Selamat datang kembali'}
                  </h2>
                  <p className="text-sm font-600 mb-6" style={{ color: 'var(--text-2)' }}>
                    {g.state.checkInStreak > 0
                      ? (locale === 'en'
                          ? `You're on a ${g.state.checkInStreak}-day streak. How's the urge today?`
                          : `Streak-mu ${g.state.checkInStreak} hari. Bagaimana dorongannya hari ini?`)
                      : (locale === 'en' ? 'How\'s the urge today?' : 'Bagaimana dorongannya hari ini?')}
                  </p>

                  <div className="grid grid-cols-3 gap-3">
                    {MOODS.map(m => (
                      <motion.button key={m.id} whileTap={{ scale: 0.94 }} onClick={() => handleMood(m.id)}
                        className="flex flex-col items-center gap-2 py-4 rounded-2xl"
                        style={{ background: 'var(--card)', border: '1.5px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
                        <span className="text-3xl leading-none">{m.emoji}</span>
                        <span className="text-xs font-700" style={{ color: 'var(--text-2)' }}>
                          {locale === 'en' ? m.en_label : m.id_label}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                  <button onClick={close} className="mt-5 text-xs font-600" style={{ color: 'var(--text-3)' }}>
                    {locale === 'en' ? 'Maybe later' : 'Nanti saja'}
                  </button>
                </motion.div>
              ) : (
                <motion.div key="reward" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 280 }} className="text-center py-2">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 380, delay: 0.1 }}
                    className="text-6xl mb-4">{result?.streakMilestone ? '🏆' : '✨'}</motion.div>

                  <h2 className="text-2xl font-900 mb-1"
                    style={{ fontFamily: 'var(--font-fraunces)', color: 'var(--green-mid)', letterSpacing: '-0.02em' }}>
                    {result?.streakMilestone
                      ? milestoneCopy(result.streakMilestone)
                      : (locale === 'en' ? 'Checked in!' : 'Sudah check-in!')}
                  </h2>
                  <p className="text-sm font-600 mb-5" style={{ color: 'var(--text-2)' }}>
                    {moodLine(mood)}
                  </p>

                  <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="rounded-2xl px-4 py-3" style={{ background: 'var(--green-pale)', border: '1px solid var(--green-tint)' }}>
                      <div className="text-lg font-900" style={{ fontFamily: 'var(--font-fraunces)', color: 'var(--green-dark)' }}>
                        +{result?.xpGained ?? 0}
                      </div>
                      <div className="text-[10px] font-700 uppercase tracking-wider" style={{ color: 'var(--green-mid)' }}>XP</div>
                    </div>
                    <div className="rounded-2xl px-4 py-3" style={{ background: 'var(--amber-pale)', border: '1px solid var(--amber-tint)' }}>
                      <div className="text-lg font-900" style={{ fontFamily: 'var(--font-fraunces)', color: 'var(--amber-strong)' }}>
                        🔥 {result?.streak ?? 0}
                      </div>
                      <div className="text-[10px] font-700 uppercase tracking-wider" style={{ color: 'var(--amber-strong)' }}>
                        {locale === 'en' ? 'streak' : 'streak'}
                      </div>
                    </div>
                  </div>

                  <button onClick={close}
                    className="w-full py-4 rounded-2xl text-sm font-800 active:scale-[0.97] transition-transform"
                    style={{ background: 'var(--green)', color: 'white', boxShadow: '0 4px 20px color-mix(in srgb, var(--green) 40%, transparent)' }}>
                    {locale === 'en' ? 'Let\'s go 🌱' : 'Ayo lanjut 🌱'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return createPortal(sheet, document.body)
}
