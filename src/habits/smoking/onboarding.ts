import type { Locale } from '@/i18n/types'
import type { OnboardingFields } from '../types'

const LOCALIZED: Record<Locale, OnboardingFields> = {
  id: {
    steps: ['date', 'units', 'price', 'motivation'],
    date:  { icon: '📅', title: 'Kapan kamu berhenti?',     sub: 'Atau kapan kamu mau mulai?' },
    units: {
      icon: '🚬', title: 'Berapa batang per hari?', sub: 'Sebelum memutuskan berhenti',
      label: 'batang / hari', min: 1, max: 100, default: 12, presets: [6, 12, 20, 30, 40, 60],
    },
    price: {
      icon: '💵', title: 'Harga sebungkus rokok?', sub: 'Kami hitung penghematanmu',
      default: 25000, presets: [15000, 20000, 25000, 28000, 32000, 38000], suffix: '/ bungkus',
    },
    motivation: { icon: '🌟', title: 'Apa motivasi utamamu?', sub: 'Ini yang akan menguatkanmu' },
  },
  en: {
    steps: ['date', 'units', 'price', 'motivation'],
    date:  { icon: '📅', title: 'When did you quit?',       sub: 'Or when do you want to start?' },
    units: {
      icon: '🚬', title: 'How many cigarettes per day?', sub: 'Before you decided to quit',
      label: 'cigarettes / day', min: 1, max: 100, default: 12, presets: [6, 12, 20, 30, 40, 60],
    },
    price: {
      icon: '💵', title: 'Price per pack?', sub: 'We\'ll calculate your savings',
      default: 25000, presets: [15000, 20000, 25000, 28000, 32000, 38000], suffix: '/ pack',
    },
    motivation: { icon: '🌟', title: 'What\'s your main motivation?', sub: 'This is what will keep you going' },
  },
}

export const smokingOnboarding = (locale: Locale): OnboardingFields => LOCALIZED[locale]
