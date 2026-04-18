'use client'

import { useEffect } from 'react'
import { useActiveHabit } from './useActiveHabit'
import { useTheme } from '@/theme/ThemeProvider'
import type { ThemeTokens } from './types'

/**
 * Maps ThemeTokens field names to the CSS custom property names used
 * throughout the app (globals.css :root). When the active habit OR the
 * theme mode changes, we write the right token set to
 * document.documentElement so every var(--name) consumer picks it up.
 *
 * @property declarations in globals.css make the transitions animate
 * smoothly. Mode swap and habit swap both reuse the same animation.
 */
const THEME_VAR_MAP: Record<keyof ThemeTokens, string> = {
  cream:        '--cream',
  card:         '--card',
  cardTinted:   '--card-tinted',
  green:        '--green',
  greenMid:     '--green-mid',
  greenDark:    '--green-dark',
  greenPale:    '--green-pale',
  greenTint:    '--green-tint',
  coral:        '--coral',
  coralMid:     '--coral-mid',
  coralPale:    '--coral-pale',
  coralTint:    '--coral-tint',
  amber:        '--amber',
  amberPale:    '--amber-pale',
  amberTint:    '--amber-tint',
  lavender:     '--lavender',
  lavenderPale: '--lavender-pale',
  lavenderTint: '--lavender-tint',
}

export function HabitProvider({ children }: { children: React.ReactNode }) {
  const { config } = useActiveHabit()
  const { resolved } = useTheme()

  useEffect(() => {
    if (!config) return
    const root = document.documentElement
    const tokens = resolved === 'dark' ? config.theme.dark : config.theme.light
    for (const key of Object.keys(THEME_VAR_MAP) as (keyof ThemeTokens)[]) {
      const value = tokens[key]
      if (value) root.style.setProperty(THEME_VAR_MAP[key], value)
    }
  }, [config, resolved])

  return <>{children}</>
}
