'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

export type ThemeMode = 'light' | 'dark' | 'system'
/** The effective, resolved mode — never 'system'. */
export type ResolvedMode = 'light' | 'dark'

const STORAGE_KEY = 'app-theme-mode'
const DEFAULT_MODE: ThemeMode = 'system'

interface ThemeContextValue {
  mode: ThemeMode
  resolved: ResolvedMode
  setMode: (next: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function systemPrefersDark(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function resolveMode(mode: ThemeMode): ResolvedMode {
  if (mode === 'system') return systemPrefersDark() ? 'dark' : 'light'
  return mode
}

function readStoredMode(): ThemeMode {
  if (typeof window === 'undefined') return DEFAULT_MODE
  try {
    const v = window.localStorage.getItem(STORAGE_KEY)
    if (v === 'light' || v === 'dark' || v === 'system') return v
  } catch {}
  return DEFAULT_MODE
}

function applyClass(resolved: ResolvedMode) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.classList.toggle('dark', resolved === 'dark')
  root.style.colorScheme = resolved
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initial state must match what the FOUC script applied so the first React
  // render doesn't flicker. We read from localStorage here too; the script
  // already set the class on html, so we just mirror its decision.
  const [mode, setModeState] = useState<ThemeMode>(DEFAULT_MODE)
  const [resolved, setResolved] = useState<ResolvedMode>('light')

  useEffect(() => {
    const initial = readStoredMode()
    setModeState(initial)
    const r = resolveMode(initial)
    setResolved(r)
    applyClass(r)
  }, [])

  // Listen to system preference changes when in 'system' mode. Using
  // addEventListener covers modern browsers; the callback only reapplies
  // when the user hasn't picked an explicit light/dark preference.
  useEffect(() => {
    if (mode !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      const r: ResolvedMode = e.matches ? 'dark' : 'light'
      setResolved(r)
      applyClass(r)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [mode])

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next)
    try { window.localStorage.setItem(STORAGE_KEY, next) } catch {}
    const r = resolveMode(next)
    setResolved(r)
    applyClass(r)
  }, [])

  const value = useMemo<ThemeContextValue>(
    () => ({ mode, resolved, setMode }),
    [mode, resolved, setMode],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}

/**
 * Pre-hydration script that sets the `dark` class and color-scheme on
 * <html> *before* React mounts. Eliminates FOUC (flash of light theme
 * on dark-preference devices). Inlined into <head> via dangerouslySet.
 */
export const THEME_FOUC_SCRIPT = `
(function(){try{
  var key='${STORAGE_KEY}';
  var stored=localStorage.getItem(key);
  var mode=(stored==='light'||stored==='dark'||stored==='system')?stored:'system';
  var dark=mode==='dark'||(mode==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);
  var r=document.documentElement;
  if(dark)r.classList.add('dark');
  r.style.colorScheme=dark?'dark':'light';
}catch(e){}})();
`
