'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useUnlock } from '@/habits/UnlockContext'
import { verifyPin } from '@/habits/pin'
import { useI18n } from '@/i18n/I18nProvider'
import type { HabitConfig, HabitData, HabitId } from '@/habits/types'

interface Props {
  open: boolean
  habitId: HabitId | null
  config: HabitConfig | null
  data: HabitData | null
  onClose: () => void
  onUnlocked?: (habitId: HabitId) => void
}

/**
 * Bottom-sheet PIN prompt for unlocking a hidden habit. If the habit has
 * no pinHash, unlock is granted on "Buka" without needing a PIN. If it has
 * a pinHash, the user's input is hashed with the stored salt and compared
 * in constant-ish time.
 */
export function PinUnlockSheet({ open, habitId, config, data, onClose, onUnlocked }: Props) {
  const { unlock } = useUnlock()
  const { t, locale } = useI18n()
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [mounted, setMounted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (open) {
      setPin(''); setError(''); setVerifying(false)
      // Give the sheet a moment to animate in before focusing.
      const t = setTimeout(() => inputRef.current?.focus(), 250)
      return () => clearTimeout(t)
    }
  }, [open])

  const needsPin = !!(data as any)?.pinHash && !!(data as any)?.pinSalt

  const handleUnlock = async () => {
    if (!habitId || !data) return
    if (needsPin) {
      if (!pin) { setError(t('selector.enterPin')); return }
      setVerifying(true); setError('')
      const ok = await verifyPin(pin, (data as any).pinSalt, (data as any).pinHash)
      setVerifying(false)
      if (!ok) { setError(t('pin.wrong')); return }
    }
    unlock(habitId)
    onUnlocked?.(habitId)
    onClose()
  }

  const body = (
    <AnimatePresence>
      {open && habitId && config && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-end"
          style={{ background: 'var(--overlay)', backdropFilter: 'blur(8px)' }}
          onClick={e => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 380 }}
            className="w-full max-w-[430px] mx-auto rounded-t-[32px] px-6 pt-5 pb-10"
            style={{ background: 'var(--cream)' }}
          >
            <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: 'var(--border-mid)' }} />

            <div className="flex flex-col items-center text-center mb-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 text-3xl"
                style={{ background: 'var(--green-pale)', border: '1.5px solid var(--green-tint)' }}>
                {needsPin ? '🔒' : '🙈'}
              </div>
              <h3 className="tracking-tight"
                style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>
                {config.label}
              </h3>
              <p className="text-xs font-600 mt-1" style={{ color: 'var(--text-2)' }}>
                {needsPin
                  ? (locale === 'en' ? 'Enter PIN to unlock' : 'Masukkan PIN untuk membuka')
                  : (locale === 'en' ? 'Unlock to view this habit' : 'Buka untuk melihat kebiasaan ini')}
              </p>
            </div>

            {needsPin && (
              <div className="space-y-2 mb-4">
                <input
                  ref={inputRef}
                  type="password"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  value={pin}
                  onChange={e => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  onKeyDown={e => { if (e.key === 'Enter') handleUnlock() }}
                  placeholder="••••"
                  className="input-warm px-4 py-4 text-2xl tracking-[0.5em] text-center font-700"
                />
                {error && (
                  <p className="text-xs font-600 text-center"
                    style={{ color: 'var(--coral-mid)', fontFamily: 'var(--font-nunito)' }}>
                    {error}
                  </p>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <button onClick={onClose} disabled={verifying}
                className="py-4 rounded-2xl text-sm font-800 transition-all active:scale-[0.97] disabled:opacity-60"
                style={{ fontFamily: 'var(--font-nunito)', background: 'var(--card)', color: 'var(--text-2)', border: '1.5px solid var(--border)' }}>
                {t('common.cancel')}
              </button>
              <button onClick={handleUnlock} disabled={verifying}
                className="py-4 rounded-2xl text-sm font-800 flex items-center justify-center gap-1.5 transition-all active:scale-[0.97] disabled:opacity-60"
                style={{ fontFamily: 'var(--font-nunito)', background: 'var(--green)', color: 'white', boxShadow: '0 4px 20px rgba(61,190,143,0.35)' }}>
                {verifying
                  ? <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  : <>🔓 {t('selector.unlock')}</>}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  if (!mounted) return null
  return createPortal(body, document.body)
}
