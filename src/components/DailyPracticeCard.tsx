'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { getDailyPractice } from '@/habits/porn/practices'
import { useI18n } from '@/i18n/I18nProvider'

/**
 * PMO-specific: one rotating mindfulness / digital-hygiene cue per day.
 * Soft dawn gradient, minimal interaction — invites contemplation rather
 * than action. Contrasts the urgent SOS card on smoking/alcohol.
 */
export function DailyPracticeCard() {
  const { locale, t } = useI18n()
  const practice = useMemo(() => getDailyPractice(locale), [locale])
  const today = useMemo(
    () => new Date().toLocaleDateString(locale === 'en' ? 'en-US' : 'id-ID', { weekday: 'long', day: 'numeric', month: 'long' }),
    [locale],
  )

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      className="rounded-[28px] p-5 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--green-pale) 0%, var(--coral-pale) 100%)',
        border: '1.5px solid var(--green-tint)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Subtle decorative orb */}
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--coral-tint) 0%, transparent 70%)', opacity: 0.5 }} />

      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-800 uppercase tracking-wider"
            style={{ color: 'var(--green-mid)', fontFamily: 'var(--font-nunito)' }}>
            {t('practice.today')}
          </span>
          <span className="text-[10px] font-600 truncate" style={{ color: 'var(--text-3)' }}>
            · {today}
          </span>
        </div>

        <div className="flex items-start gap-3">
          <span className="text-4xl leading-none flex-shrink-0 mt-0.5">{practice.emoji}</span>
          <div className="flex-1 min-w-0">
            <p className="text-base font-800 leading-snug"
              style={{ fontFamily: 'var(--font-fraunces)', color: 'var(--text)', letterSpacing: '-0.01em' }}>
              {practice.cue}
            </p>
            <p className="text-xs font-500 mt-1.5 leading-relaxed italic"
              style={{ color: 'var(--text-2)', fontFamily: 'var(--font-fraunces)' }}>
              {practice.context}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
