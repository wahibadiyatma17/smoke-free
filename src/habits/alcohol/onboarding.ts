import type { Locale } from '@/i18n/types'
import type { OnboardingFields } from '../types'

const LOCALIZED: Record<Locale, OnboardingFields> = {
  id: {
    steps: ['date', 'units', 'price', 'motivation'],
    date:  { icon: '📅', title: 'Kapan kamu berhenti?',     sub: 'Atau kapan kamu mau mulai?' },
    units: {
      icon: '🍷', title: 'Berapa minuman per minggu?', sub: 'Rata-rata sebelum kamu memutuskan berhenti',
      label: 'minuman / minggu', min: 1, max: 60, default: 7, presets: [2, 5, 7, 10, 14, 21],
    },
    price: {
      icon: '💵', title: 'Harga rata-rata per minuman?', sub: 'Bir, wine, atau cocktail — kami hitung penghematanmu',
      default: 45000, presets: [25000, 45000, 70000, 100000, 150000, 200000], suffix: '/ minuman',
    },
    motivation: { icon: '🌟', title: 'Apa motivasi utamamu?', sub: 'Ini yang akan menguatkanmu' },
  },
  en: {
    steps: ['date', 'units', 'price', 'motivation'],
    date:  { icon: '📅', title: 'When did you quit?',     sub: 'Or when do you want to start?' },
    units: {
      icon: '🍷', title: 'How many drinks per week?', sub: 'Average before you decided to quit',
      label: 'drinks / week', min: 1, max: 60, default: 7, presets: [2, 5, 7, 10, 14, 21],
    },
    price: {
      icon: '💵', title: 'Average price per drink?', sub: 'Beer, wine, or cocktail — we\'ll calculate savings',
      default: 45000, presets: [25000, 45000, 70000, 100000, 150000, 200000], suffix: '/ drink',
    },
    motivation: { icon: '🌟', title: 'What\'s your main motivation?', sub: 'This is what will keep you going' },
  },
}

export const alcoholOnboarding = (locale: Locale): OnboardingFields => LOCALIZED[locale]
