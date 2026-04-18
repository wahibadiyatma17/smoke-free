import type { Locale } from '@/i18n/types'
import type { HabitCopy } from '../types'

const LOCALIZED: Record<Locale, HabitCopy> = {
  id: {
    heroHeader: 'Rokok',
    heroTagline: 'bebas rokok, selamanya',
    unitsLabel: 'batang',
    unitsAvoidedLabel: 'Rokok Dihindari',
    unitsPerPeriodLabel: 'Batang per Hari',
    pricePerUnitLabel: 'Harga Sebungkus',
    quitDateLabel: 'Tanggal Berhenti',
    timeReclaimedLabel: 'jam umur kembali',
    sosEmoji: '🆘',
    sosPrompt: 'Lagi ngidam rokok?',
    sosSubtext: 'Ketuk untuk cara mengatasi keinginan',
    sosBg: 'var(--coral-pale)',
    sosBorder: 'var(--coral-tint)',
    sosColor: 'var(--coral-mid)',
    cravingHeader: 'Keinginan 🌬️',
    daysFreeLabel: 'Hari Bebas Rokok',
  },
  en: {
    heroHeader: 'Smoking',
    heroTagline: 'smoke-free, for good',
    unitsLabel: 'cigarettes',
    unitsAvoidedLabel: 'Cigarettes Avoided',
    unitsPerPeriodLabel: 'Cigarettes per Day',
    pricePerUnitLabel: 'Price per Pack',
    quitDateLabel: 'Quit Date',
    timeReclaimedLabel: 'hours of life regained',
    sosEmoji: '🆘',
    sosPrompt: 'Craving a smoke?',
    sosSubtext: 'Tap for ways to handle the urge',
    sosBg: 'var(--coral-pale)',
    sosBorder: 'var(--coral-tint)',
    sosColor: 'var(--coral-mid)',
    cravingHeader: 'Cravings 🌬️',
    daysFreeLabel: 'Smoke-Free Days',
  },
}

export const smokingCopy = (locale: Locale): HabitCopy => LOCALIZED[locale]
