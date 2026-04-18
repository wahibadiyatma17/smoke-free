'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useI18n } from '@/i18n/I18nProvider'
import { LOCALE_META, LOCALES, type Locale } from '@/i18n/types'

interface Props {
  className?: string
  /** Which side of the trigger the popover anchors to. */
  align?: 'left' | 'right'
}

/**
 * Simple dropdown selector. A compact trigger button shows the active
 * locale; tapping it opens a popover list with both languages. Outside
 * taps and Escape close it.
 */
export default function LanguageSelector({ className = '', align = 'right' }: Props) {
  const { locale, setLocale } = useI18n()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const active = LOCALE_META[locale]

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

  const pick = (code: Locale) => {
    setLocale(code)
    setOpen(false)
  }

  return (
    <div ref={rootRef} className={`relative inline-block ${className}`}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
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
        <span aria-hidden className="text-base leading-none">{active.flag}</span>
        <span>{active.label}</span>
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
            className={`absolute z-30 mt-1.5 min-w-[180px] rounded-2xl overflow-hidden ${align === 'right' ? 'right-0' : 'left-0'}`}
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              boxShadow: '0 12px 32px rgba(44,31,20,0.14), 0 2px 6px rgba(44,31,20,0.08)',
              transformOrigin: align === 'right' ? 'top right' : 'top left',
            }}
          >
            {LOCALES.map((code) => {
              const meta = LOCALE_META[code]
              const isActive = code === locale
              return (
                <li key={code} role="option" aria-selected={isActive}>
                  <button
                    type="button"
                    onClick={() => pick(code)}
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 text-left hover-row"
                    style={{ fontFamily: 'var(--font-nunito)' }}
                  >
                    <span aria-hidden className="text-lg leading-none">{meta.flag}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-800" style={{ color: 'var(--text)' }}>
                        {meta.native}
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
