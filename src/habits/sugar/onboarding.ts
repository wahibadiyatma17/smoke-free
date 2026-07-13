import type { Locale } from '@/i18n/types'
import type { OnboardingFields } from '../types'

const LOCALIZED: Record<Locale, OnboardingFields> = {
  id: {
    steps: ['date', 'units', 'price', 'motivation'],
    date:  { icon: '📅', title: 'Kapan kamu berhenti?', sub: 'Atau kapan kamu mau mulai?' },
    units: {
      icon: '🧋', title: 'Berapa porsi manis per hari?', sub: 'Es teh manis, boba, soda, atau camilan manis',
      label: 'porsi / hari', min: 1, max: 15, default: 2, presets: [1, 2, 3, 4, 6, 8],
    },
    price: {
      icon: '💵', title: 'Harga rata-rata per porsi?', sub: 'Es teh, boba, atau kue — kami hitung penghematanmu',
      default: 15000, presets: [5000, 10000, 15000, 20000, 25000, 40000], suffix: '/ porsi',
    },
    motivation: { icon: '🌟', title: 'Apa motivasi utamamu?', sub: 'Ini yang akan menguatkanmu' },
  },
  en: {
    steps: ['date', 'units', 'price', 'motivation'],
    date:  { icon: '📅', title: 'When did you quit?', sub: 'Or when do you want to start?' },
    units: {
      icon: '🧋', title: 'How many sweet servings per day?', sub: 'Sweet tea, boba, soda, or sugary snacks',
      label: 'servings / day', min: 1, max: 15, default: 2, presets: [1, 2, 3, 4, 6, 8],
    },
    price: {
      icon: '💵', title: 'Average price per serving?', sub: 'Sweet tea, boba, or pastry — we\'ll calculate savings',
      default: 15000, presets: [5000, 10000, 15000, 20000, 25000, 40000], suffix: '/ serving',
    },
    motivation: { icon: '🌟', title: 'What\'s your main motivation?', sub: 'This is what will keep you going' },
  },
}

export const sugarOnboarding = (locale: Locale): OnboardingFields => LOCALIZED[locale]
