'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { id } from './messages/id'
import { en } from './messages/en'
import type { Locale, MessageKey, Messages, TVars } from './types'

const STORAGE_KEY = 'app-locale'
const DEFAULT_LOCALE: Locale = 'id'

const MESSAGES: Record<Locale, Messages> = { id, en }

interface I18nContextValue {
  locale: Locale
  setLocale: (next: Locale) => void
  t: (key: MessageKey, vars?: TVars) => string
  /** True once the locale has been reconciled with localStorage / navigator on
   *  the client. Before hydration, components render the SSR default ('id')
   *  to avoid a visible flash on first paint. */
  hydrated: boolean
}

const I18nContext = createContext<I18nContextValue | null>(null)

function detectInitialLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'id' || stored === 'en') return stored
  } catch {}
  const nav = typeof navigator !== 'undefined' ? navigator.language : ''
  if (nav && nav.toLowerCase().startsWith('en')) return 'en'
  return DEFAULT_LOCALE
}

function interpolate(template: string, vars?: TVars): string {
  if (!vars) return template
  return template.replace(/\{(\w+)\}/g, (_, k: string) => {
    const v = vars[k]
    return v === undefined || v === null ? `{${k}}` : String(v)
  })
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setLocaleState(detectInitialLocale())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale
    }
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    try { window.localStorage.setItem(STORAGE_KEY, next) } catch {}
  }, [])

  const t = useCallback(
    (key: MessageKey, vars?: TVars): string => {
      const table = MESSAGES[locale]
      const raw = table[key] ?? MESSAGES[DEFAULT_LOCALE][key] ?? key
      return interpolate(raw, vars)
    },
    [locale],
  )

  const value = useMemo<I18nContextValue>(
    () => ({ locale, setLocale, t, hydrated }),
    [locale, setLocale, t, hydrated],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within an I18nProvider')
  return ctx
}
