import type { Locale } from '@/i18n/types'
import type { MotivationEntry, MotivationOption } from '../types'
import { getCommonMotivations } from '../common/motivations'

const SPECIFIC: Record<Locale, Record<string, MotivationEntry>> = {
  id: {
    fokus:     { label: 'Fokus & Produktivitas', icon: '🧠' },
    kebebasan: { label: 'Kebebasan & Kontrol',   icon: '🕊️' },
    hubungan:  { label: 'Hubungan Lebih Dalam',  icon: '💞' },
    spiritual: { label: 'Spiritualitas',          icon: '🌿' },
  },
  en: {
    fokus:     { label: 'Focus & Productivity', icon: '🧠' },
    kebebasan: { label: 'Freedom & Control',    icon: '🕊️' },
    hubungan:  { label: 'Deeper Relationships', icon: '💞' },
    spiritual: { label: 'Spirituality',          icon: '🌿' },
  },
}

export function getPornMotivationMap(locale: Locale): Record<string, MotivationEntry> {
  // Money motivation is intentionally omitted for this habit.
  const { uang: _omit, ...base } = getCommonMotivations(locale)
  return { ...base, ...SPECIFIC[locale] }
}

export function getPornMotivations(locale: Locale): MotivationOption[] {
  return Object.entries(getPornMotivationMap(locale)).map(([id, v]) => ({ id, ...v }))
}
