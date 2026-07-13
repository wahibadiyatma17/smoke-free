import type { Locale } from '@/i18n/types'
import type { HabitCopy } from '../types'

const LOCALIZED: Record<Locale, HabitCopy> = {
  id: {
    heroHeader: 'Gula',
    heroTagline: 'manis alami, satu hari pada satu waktu',
    unitsLabel: 'porsi manis',
    unitsAvoidedLabel: 'Porsi Manis Dihindari',
    unitsPerPeriodLabel: 'Porsi Manis per Hari',
    pricePerUnitLabel: 'Harga per Porsi',
    quitDateLabel: 'Tanggal Berhenti',
    timeReclaimedLabel: 'jam segar didapat',
    sosEmoji: '🧁',
    sosPrompt: 'Lagi ngidam manis?',
    sosSubtext: 'Ketuk untuk cara meredakan ngidam',
    sosBg: '#FEE2E2',
    sosBorder: '#FCA5A5',
    sosColor: '#DC2626',
    cravingHeader: 'Ngidam 🍭',
    daysFreeLabel: 'Hari Bebas Gula',
  },
  en: {
    heroHeader: 'Sugar',
    heroTagline: 'naturally sweet, one day at a time',
    unitsLabel: 'sweet servings',
    unitsAvoidedLabel: 'Sweet Servings Avoided',
    unitsPerPeriodLabel: 'Sweet Servings per Day',
    pricePerUnitLabel: 'Price per Serving',
    quitDateLabel: 'Quit Date',
    timeReclaimedLabel: 'fresh hours gained',
    sosEmoji: '🧁',
    sosPrompt: 'Craving something sweet?',
    sosSubtext: 'Tap for ways to ride it out',
    sosBg: '#FEE2E2',
    sosBorder: '#FCA5A5',
    sosColor: '#DC2626',
    cravingHeader: 'Cravings 🍭',
    daysFreeLabel: 'Sugar-Free Days',
  },
}

export const sugarCopy = (locale: Locale): HabitCopy => LOCALIZED[locale]
