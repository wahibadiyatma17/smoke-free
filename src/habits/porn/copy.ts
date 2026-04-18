import type { Locale } from '@/i18n/types'
import type { HabitCopy } from '../types'

const LOCALIZED: Record<Locale, HabitCopy> = {
  id: {
    heroHeader: 'PMO',
    heroTagline: 'fokus jernih, satu hari pada satu waktu',
    unitsLabel: 'sesi',
    unitsAvoidedLabel: 'Sesi Dihindari',
    unitsPerPeriodLabel: 'Sesi per Minggu',
    pricePerUnitLabel: '',
    quitDateLabel: 'Tanggal Mulai',
    timeReclaimedLabel: 'jam kembali ke hal penting',
    sosEmoji: '🙏',
    sosPrompt: 'Dorongan sedang muncul?',
    sosSubtext: 'Ketuk untuk cara mengatasi dorongan',
    sosBg: 'var(--coral-pale)',
    sosBorder: 'var(--coral-tint)',
    sosColor: 'var(--coral-mid)',
    cravingHeader: 'Dorongan 🌀',
    daysFreeLabel: 'Hari Bebas Kompulsi',
  },
  en: {
    heroHeader: 'PMO',
    heroTagline: 'clear focus, one day at a time',
    unitsLabel: 'sessions',
    unitsAvoidedLabel: 'Sessions Avoided',
    unitsPerPeriodLabel: 'Sessions per Week',
    pricePerUnitLabel: '',
    quitDateLabel: 'Start Date',
    timeReclaimedLabel: 'hours back for what matters',
    sosEmoji: '🙏',
    sosPrompt: 'Feeling a surge?',
    sosSubtext: 'Tap for ways to ride it out',
    sosBg: 'var(--coral-pale)',
    sosBorder: 'var(--coral-tint)',
    sosColor: 'var(--coral-mid)',
    cravingHeader: 'Urges 🌀',
    daysFreeLabel: 'Compulsion-Free Days',
  },
}

export const pornCopy = (locale: Locale): HabitCopy => LOCALIZED[locale]
