'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CelebrationBurst } from '@/components/CelebrationBurst'
import { useI18n } from '@/i18n/I18nProvider'

export interface LevelUpInfo {
  key: number       // bump to re-trigger
  level: number
  tierName?: string // present when the tier changed too
}

/**
 * Transient top toast for level-ups / new tiers. Spring-in, auto-dismiss,
 * with a small celebration burst. Purely presentational — parent controls
 * `info` and `onDismiss`.
 */
export function LevelUpToast({ info, onDismiss }: { info: LevelUpInfo | null; onDismiss: () => void }) {
  const { locale } = useI18n()

  useEffect(() => {
    if (!info) return
    const t = setTimeout(onDismiss, 3200)
    return () => clearTimeout(t)
  }, [info, onDismiss])

  return (
    <AnimatePresence>
      {info && (
        <motion.div
          key={info.key}
          initial={{ opacity: 0, y: -40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.9 }}
          transition={{ type: 'spring', damping: 22, stiffness: 320 }}
          className="fixed top-4 left-0 right-0 z-[80] flex justify-center px-5 pointer-events-none"
        >
          <div className="relative max-w-[380px] w-full rounded-[22px] px-5 py-4 flex items-center gap-3 pointer-events-auto"
            style={{
              background: 'var(--card)',
              border: '1.5px solid var(--green-tint)',
              boxShadow: 'var(--shadow-lg)',
            }}>
            <CelebrationBurst trigger={info.key} count={14} />
            <span className="text-2xl leading-none flex-shrink-0">{info.tierName ? '🌟' : '⬆️'}</span>
            <div className="relative">
              <div className="text-sm font-800" style={{ fontFamily: 'var(--font-fraunces)', color: 'var(--green-dark)' }}>
                {info.tierName
                  ? (locale === 'en' ? `New stage: ${info.tierName}!` : `Tahap baru: ${info.tierName}!`)
                  : (locale === 'en' ? `Level ${info.level}!` : `Level ${info.level}!`)}
              </div>
              <div className="text-xs font-600" style={{ color: 'var(--text-2)' }}>
                {locale === 'en' ? 'Keep showing up 🌱' : 'Terus hadir untuk dirimu 🌱'}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
