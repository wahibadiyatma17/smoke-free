import type { Locale } from '@/i18n/types'
import type { MotivationEntry, MotivationOption } from '../types'
import { getCommonMotivations } from '../common/motivations'

const SPECIFIC: Record<Locale, Record<string, MotivationEntry>> = {
  id: {
    berat:  { label: 'Berat Badan Ideal', icon: '⚖️' },
    energi: { label: 'Energi Stabil',     icon: '⚡' },
    kulit:  { label: 'Kulit Sehat',       icon: '✨' },
  },
  en: {
    berat:  { label: 'Healthy Weight', icon: '⚖️' },
    energi: { label: 'Steady Energy',  icon: '⚡' },
    kulit:  { label: 'Healthy Skin',   icon: '✨' },
  },
}

export function getSugarMotivationMap(locale: Locale): Record<string, MotivationEntry> {
  return { ...getCommonMotivations(locale), ...SPECIFIC[locale] }
}

export function getSugarMotivations(locale: Locale): MotivationOption[] {
  return Object.entries(getSugarMotivationMap(locale)).map(([id, v]) => ({ id, ...v }))
}
