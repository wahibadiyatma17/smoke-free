'use client'

import { motion } from 'framer-motion'
import { useI18n } from '@/i18n/I18nProvider'

interface Props {
  onOpen: () => void
}

/**
 * PMO-specific alternative to the urgent-red SOS card. The red/alarm tone
 * of an SOS reinforces panic; PMO recovery is better served by a softer,
 * contemplative affordance that says "pause, don't panic." Same underlying
 * action (opens the craving-tips sheet) but the mood is invitation, not
 * alarm.
 */
export function MindfulPausePanel({ onOpen }: Props) {
  const { t } = useI18n()
  return (
    <motion.button
      onClick={onOpen}
      whileTap={{ scale: 0.98 }}
      className="w-full flex items-center gap-4 p-5 rounded-[28px] transition-all text-left group relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--green-pale) 0%, var(--coral-pale) 60%, var(--green-pale) 100%)',
        border: '1.5px solid var(--green-tint)',
        boxShadow: '0 6px 24px color-mix(in srgb, var(--green) 12%, transparent)',
      }}
    >
      {/* Soft breathing orb */}
      <div
        className="absolute -right-6 -bottom-8 w-40 h-40 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--green-tint) 0%, transparent 70%)',
          opacity: 0.5,
        }}
      />

      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
        className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 text-2xl"
        style={{
          background: 'var(--card)',
          boxShadow: '0 4px 16px color-mix(in srgb, var(--green) 20%, transparent), 0 0 0 8px color-mix(in srgb, var(--green-tint) 50%, transparent)',
        }}
      >
        🌬️
      </motion.div>

      <div className="flex-1 relative">
        <div className="text-sm font-800"
          style={{ fontFamily: 'var(--font-fraunces)', color: 'var(--green-dark)', letterSpacing: '-0.01em' }}>
          {t('mindful.header')}
        </div>
        <div className="text-xs font-500 mt-1 leading-relaxed italic"
          style={{ color: 'var(--text-2)', fontFamily: 'var(--font-fraunces)' }}>
          {t('mindful.sub')}
        </div>
      </div>

      <span className="text-base leading-none relative" style={{ color: 'var(--green-mid)' }}>›</span>
    </motion.button>
  )
}
