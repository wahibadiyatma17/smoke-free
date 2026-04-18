'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme, type ThemeMode } from '@/theme/ThemeProvider'
import { useI18n } from '@/i18n/I18nProvider'

interface Props {
  className?: string
  align?: 'left' | 'right'
}

interface Option {
  value: ThemeMode
  icon: string
  labelId: string
  labelEn: string
}

const OPTIONS: Option[] = [
  { value: 'light',  icon: '☀️',  labelId: 'Terang', labelEn: 'Light' },
  { value: 'system', icon: '🖥️', labelId: 'Sistem', labelEn: 'System' },
  { value: 'dark',   icon: '🌙',  labelId: 'Gelap',  labelEn: 'Dark' },
]

/**
 * Compact theme-mode selector. Same pattern as LanguageSelector — a pill
 * trigger showing the active option's icon, tap opens a popover with the
 * full list. Supports light / system / dark and animates the trigger icon
 * swap on change so the button feedback feels tactile.
 */
export default function ThemeToggle({ className = '', align = 'right' }: Props) {
  const { mode, setMode } = useTheme()
  const { locale } = useI18n()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const active = OPTIONS.find(o => o.value === mode) ?? OPTIONS[1]
  const label = (o: Option) => (locale === 'en' ? o.labelEn : o.labelId)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (!rootRef.current) return
      if (!rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('touchstart', onDown, { passive: true })
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('touchstart', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const pick = (next: ThemeMode) => {
    setMode(next)
    setOpen(false)
  }

  return (
    <div ref={rootRef} className={`relative inline-block ${className}`}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={locale === 'en' ? 'Theme mode' : 'Mode tema'}
        onClick={() => setOpen(o => !o)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-700 tracking-wide transition-all active:scale-95"
        style={{
          fontFamily: 'var(--font-nunito)',
          background: 'var(--card)',
          color: 'var(--text-2)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={active.value}
            initial={{ opacity: 0, rotate: -60, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 60, scale: 0.7 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            aria-hidden
            className="text-base leading-none"
          >
            {active.icon}
          </motion.span>
        </AnimatePresence>
        <motion.span
          aria-hidden
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.18 }}
          className="text-[10px] leading-none opacity-70"
        >
          ▾
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.14, ease: 'easeOut' }}
            className={`absolute z-30 mt-1.5 min-w-[160px] rounded-2xl overflow-hidden ${align === 'right' ? 'right-0' : 'left-0'}`}
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              boxShadow: '0 12px 32px color-mix(in srgb, var(--text) 18%, transparent), 0 2px 6px color-mix(in srgb, var(--text) 10%, transparent)',
              transformOrigin: align === 'right' ? 'top right' : 'top left',
            }}
          >
            {OPTIONS.map((opt) => {
              const isActive = opt.value === mode
              return (
                <li key={opt.value} role="option" aria-selected={isActive}>
                  <button
                    type="button"
                    onClick={() => pick(opt.value)}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 text-left hover-row"
                    style={{ fontFamily: 'var(--font-nunito)' }}
                  >
                    <span aria-hidden className="text-lg leading-none">{opt.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-800" style={{ color: 'var(--text)' }}>
                        {label(opt)}
                      </div>
                    </div>
                    {isActive && (
                      <span
                        aria-hidden
                        className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-800 text-white"
                        style={{ background: 'var(--coral, #F06B4D)' }}
                      >
                        ✓
                      </span>
                    )}
                  </button>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
