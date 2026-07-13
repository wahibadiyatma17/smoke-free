'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGamification, pickDailyQuests } from '@/gamification/useGamification'
import { useI18n } from '@/i18n/I18nProvider'
import { hapticBump } from '@/lib/haptics'

/**
 * Three low-friction daily quests. Completing one animates a fill + XP float
 * and feeds the growth companion. Deterministic per day (no re-rolling).
 */
export function DailyQuestsCard() {
  const g = useGamification()
  const { locale } = useI18n()
  const quests = useMemo(() => pickDailyQuests(), [])
  const [floats, setFloats] = useState<{ key: number; id: string }[]>([])

  if (!g) return null

  const done = g.todayQuestsDone
  const allDone = quests.every(q => done.includes(q.id))

  const onComplete = async (id: string) => {
    if (done.includes(id)) return
    hapticBump()
    setFloats(f => [...f, { key: Date.now(), id }])
    await g.completeQuest(id)
    setTimeout(() => setFloats(f => f.filter(x => x.id !== id)), 1000)
  }

  return (
    <div className="rounded-[28px] p-5"
      style={{ background: 'var(--card)', border: '1.5px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-800"
          style={{ fontFamily: 'var(--font-fraunces)', color: 'var(--text)', letterSpacing: '-0.01em' }}>
          {locale === 'en' ? 'Daily quests' : 'Misi harian'}
        </h3>
        <span className="text-[11px] font-700" style={{ color: allDone ? 'var(--green-mid)' : 'var(--text-3)' }}>
          {done.filter(id => quests.some(q => q.id === id)).length}/{quests.length}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {quests.map((q, i) => {
          const isDone = done.includes(q.id)
          return (
            <motion.button
              key={q.id}
              onClick={() => onComplete(q.id)}
              disabled={isDone}
              initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              whileTap={isDone ? {} : { scale: 0.98 }}
              className="relative flex items-center gap-3 p-3 rounded-2xl text-left"
              style={{
                background: isDone ? 'var(--green-pale)' : 'var(--card-tinted)',
                border: `1px solid ${isDone ? 'var(--green-tint)' : 'var(--border)'}`,
              }}
            >
              <span className="text-xl leading-none flex-shrink-0">{q.emoji}</span>
              <span className="flex-1 text-sm font-700"
                style={{ color: isDone ? 'var(--green-dark)' : 'var(--text)', textDecoration: isDone ? 'line-through' : 'none' }}>
                {q.label[locale] ?? q.label.id}
              </span>

              {/* Check circle */}
              <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: isDone ? 'var(--green)' : 'transparent',
                  border: `2px solid ${isDone ? 'var(--green)' : 'var(--border-mid)'}`,
                }}>
                {isDone && (
                  <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400 }}
                    width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </motion.svg>
                )}
              </span>

              {/* XP float */}
              <AnimatePresence>
                {floats.filter(f => f.id === q.id).map(f => (
                  <motion.span key={f.key}
                    className="absolute right-3 text-xs font-800"
                    style={{ color: 'var(--green-mid)' }}
                    initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: -18 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.9 }}>
                    +10 XP
                  </motion.span>
                ))}
              </AnimatePresence>
            </motion.button>
          )
        })}
      </div>

      {allDone && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-xs font-700 text-center mt-3" style={{ color: 'var(--green-mid)' }}>
          {locale === 'en' ? '🎉 All quests done — see you tomorrow!' : '🎉 Semua misi selesai — sampai besok!'}
        </motion.p>
      )}
    </div>
  )
}
