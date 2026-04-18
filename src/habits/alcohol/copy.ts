import type { Locale } from '@/i18n/types'
import type { HabitCopy } from '../types'

const LOCALIZED: Record<Locale, HabitCopy> = {
  id: {
    heroHeader: 'Alkohol',
    heroTagline: 'hidup jernih, satu hari pada satu waktu',
    unitsLabel: 'minuman',
    unitsAvoidedLabel: 'Minuman Dihindari',
    unitsPerPeriodLabel: 'Minuman per Minggu',
    pricePerUnitLabel: 'Harga per Minuman',
    quitDateLabel: 'Tanggal Berhenti',
    timeReclaimedLabel: 'jam jernih didapat',
    sosEmoji: '🛟',
    sosPrompt: 'Lagi ingin minum?',
    sosSubtext: 'Ketuk untuk cara mengatasi dorongan',
    sosBg: '#FEE2E2',
    sosBorder: '#FCA5A5',
    sosColor: '#DC2626',
    cravingHeader: 'Dorongan 🌊',
    daysFreeLabel: 'Hari Bebas Alkohol',
  },
  en: {
    heroHeader: 'Alcohol',
    heroTagline: 'clear living, one day at a time',
    unitsLabel: 'drinks',
    unitsAvoidedLabel: 'Drinks Avoided',
    unitsPerPeriodLabel: 'Drinks per Week',
    pricePerUnitLabel: 'Price per Drink',
    quitDateLabel: 'Quit Date',
    timeReclaimedLabel: 'hours of clarity gained',
    sosEmoji: '🛟',
    sosPrompt: 'Feeling the urge to drink?',
    sosSubtext: 'Tap for ways to ride it out',
    sosBg: '#FEE2E2',
    sosBorder: '#FCA5A5',
    sosColor: '#DC2626',
    cravingHeader: 'Urges 🌊',
    daysFreeLabel: 'Alcohol-Free Days',
  },
}

export const alcoholCopy = (locale: Locale): HabitCopy => LOCALIZED[locale]
