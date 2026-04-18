import type { Locale } from '@/i18n/types'
import type { MotivationEntry } from '../types'

const LOCALIZED: Record<Locale, Record<string, MotivationEntry>> = {
  id: {
    kesehatan: { label: 'Kesehatan Lebih Baik', icon: '❤️' },
    keluarga:  { label: 'Untuk Keluarga',       icon: '👨‍👩‍👧' },
    uang:      { label: 'Hemat Uang',            icon: '💰' },
  },
  en: {
    kesehatan: { label: 'Better Health',  icon: '❤️' },
    keluarga:  { label: 'For Family',     icon: '👨‍👩‍👧' },
    uang:      { label: 'Save Money',     icon: '💰' },
  },
}

export const getCommonMotivations = (locale: Locale): Record<string, MotivationEntry> => LOCALIZED[locale]
