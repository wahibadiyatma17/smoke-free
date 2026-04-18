import type { Locale } from '@/i18n/types'
import type { MotivationEntry, MotivationOption } from '../types'
import { getCommonMotivations } from '../common/motivations'

const SPECIFIC: Record<Locale, Record<string, MotivationEntry>> = {
  id: {
    klaritas: { label: 'Pikiran Jernih',        icon: '🧠' },
    tidur:    { label: 'Tidur Lebih Nyenyak',   icon: '😴' },
    kontrol:  { label: 'Kembali Mengendalikan', icon: '🎯' },
  },
  en: {
    klaritas: { label: 'Clear Mind',      icon: '🧠' },
    tidur:    { label: 'Better Sleep',    icon: '😴' },
    kontrol:  { label: 'Back in Control', icon: '🎯' },
  },
}

export function getAlcoholMotivationMap(locale: Locale): Record<string, MotivationEntry> {
  return { ...getCommonMotivations(locale), ...SPECIFIC[locale] }
}

export function getAlcoholMotivations(locale: Locale): MotivationOption[] {
  return Object.entries(getAlcoholMotivationMap(locale)).map(([id, v]) => ({ id, ...v }))
}
