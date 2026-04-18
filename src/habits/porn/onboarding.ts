import type { Locale } from '@/i18n/types'
import type { OnboardingFields } from '../types'

const LOCALIZED: Record<Locale, OnboardingFields> = {
  id: {
    steps: ['date', 'units', 'privacy', 'motivation'],
    date:  { icon: '📅', title: 'Kapan kamu memulai?',     sub: 'Tanggal mulai perjalananmu' },
    units: {
      icon: '📈', title: 'Berapa sesi per minggu?', sub: 'Rata-rata sebelum kamu memutuskan berhenti',
      label: 'sesi / minggu', min: 1, max: 50, default: 5, presets: [2, 5, 7, 10, 14, 21],
    },
    privacy: {
      icon: '🔒', title: 'Privasi',
      sub: 'Kebiasaan ini disembunyikan dari tampilan utama. Kamu bisa ubah nanti di Profil.',
    },
    motivation: { icon: '🌟', title: 'Apa motivasi utamamu?', sub: 'Ini yang akan menguatkanmu' },
  },
  en: {
    steps: ['date', 'units', 'privacy', 'motivation'],
    date:  { icon: '📅', title: 'When did you start?',     sub: 'The starting date of your journey' },
    units: {
      icon: '📈', title: 'How many sessions per week?', sub: 'Average before you decided to stop',
      label: 'sessions / week', min: 1, max: 50, default: 5, presets: [2, 5, 7, 10, 14, 21],
    },
    privacy: {
      icon: '🔒', title: 'Privacy',
      sub: 'This habit is hidden from the main view. You can change this later in Profile.',
    },
    motivation: { icon: '🌟', title: 'What\'s your main motivation?', sub: 'This is what will keep you going' },
  },
}

export const pornOnboarding = (locale: Locale): OnboardingFields => LOCALIZED[locale]
