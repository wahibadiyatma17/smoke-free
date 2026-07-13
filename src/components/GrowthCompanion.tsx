'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useGamification } from '@/gamification/useGamification'
import { useI18n } from '@/i18n/I18nProvider'
import { hapticTap } from '@/lib/haptics'

/**
 * The emotional anchor of the gamification loop: a nature companion (seed →
 * ancient tree) that grows with the user's level, with a gentle breathing
 * idle animation and an animated XP bar. Tapping replays a grow-bounce.
 */
export function GrowthCompanion() {
  const g = useGamification()
  const { locale } = useI18n()
  const [bounce, setBounce] = useState(0)

  if (!g) return null

  const { tier, level, xpInto, xpNeeded, xpRatio, state } = g
  const tierName = tier.name[locale] ?? tier.name.id

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      className="rounded-[28px] p-5 relative overflow-hidden"
      style={{
        background: 'linear-gradient(140deg, var(--green-pale) 0%, var(--card-tinted) 100%)',
        border: '1.5px solid var(--green-tint)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Decorative orb */}
      <div className="absolute -bottom-10 -right-8 w-36 h-36 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--green-tint) 0%, transparent 70%)', opacity: 0.5 }} />

      <div className="relative flex items-center gap-4">
        {/* Plant with breathing idle */}
        <button
          onClick={() => { setBounce(b => b + 1); hapticTap() }}
          className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ background: 'var(--card)', boxShadow: 'var(--shadow-card)' }}
          aria-label={tierName}
        >
          <motion.span
            key={bounce}
            className="text-4xl leading-none"
            animate={{ scale: [1, 1.08, 1], y: [0, -2, 0] }}
            transition={
              bounce === 0
                ? { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }
            }
          >
            {tier.emoji}
          </motion.span>
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-800 truncate"
              style={{ fontFamily: 'var(--font-fraunces)', color: 'var(--green-dark)', letterSpacing: '-0.01em' }}>
              {tierName}
            </span>
            <span className="text-[11px] font-700 flex-shrink-0" style={{ color: 'var(--text-3)' }}>
              {locale === 'en' ? 'Lvl' : 'Lv'} {level}
            </span>
          </div>

          {/* XP bar */}
          <div className="mt-2 h-2.5 rounded-full overflow-hidden" style={{ background: 'var(--green-tint)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, var(--green) 0%, var(--green-mid) 100%)' }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.round(xpRatio * 100)}%` }}
              transition={{ duration: 0.9, ease: [0.34, 1.2, 0.64, 1] }}
            />
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-[10px] font-700" style={{ color: 'var(--text-3)' }}>
              {xpInto} / {xpNeeded} XP
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-700" style={{ color: 'var(--green-mid)' }}>
                🔥 {state.checkInStreak} {locale === 'en' ? 'day' : 'hari'}
              </span>
              {state.longestCheckInStreak > state.checkInStreak && (
                <span className="text-[10px] font-600" style={{ color: 'var(--text-3)' }}>
                  · {locale === 'en' ? 'best' : 'terbaik'} {state.longestCheckInStreak}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
