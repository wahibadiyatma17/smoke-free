import type { Locale } from '@/i18n/types'
import type { MotivationEntry, MotivationOption } from '../types'
import { getCommonMotivations } from '../common/motivations'

const SPECIFIC: Record<Locale, Record<string, MotivationEntry>> = {
  id: {
    olahraga: { label: 'Olahraga & Kebugaran', icon: '🏃' },
    napas:    { label: 'Napas Lebih Lega',     icon: '🌬️' },
    bebas:    { label: 'Menjadi Bebas',        icon: '🦋' },
  },
  en: {
    olahraga: { label: 'Exercise & Fitness', icon: '🏃' },
    napas:    { label: 'Easier Breathing',   icon: '🌬️' },
    bebas:    { label: 'Be Free',            icon: '🦋' },
  },
}

export function getSmokingMotivationMap(locale: Locale): Record<string, MotivationEntry> {
  return { ...getCommonMotivations(locale), ...SPECIFIC[locale] }
}

export function getSmokingMotivations(locale: Locale): MotivationOption[] {
  return Object.entries(getSmokingMotivationMap(locale)).map(([id, v]) => ({ id, ...v }))
}
