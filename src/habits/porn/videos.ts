import type { Locale } from '@/i18n/types'
import type { Video } from '../types'

const LOCALIZED: Record<Locale, Video[]> = {
  id: [
    { id: 'y1CkUhfHSxQ', judul: 'Porn Addiction Is Misunderstood: How To Actually Stop',
      deskripsi: 'Dr. K (HealthyGamerGG) — Pendekatan klinis seorang psikiater untuk benar-benar berhenti' },
    { id: 'n2u8Z1HeKD8', judul: 'Dopamine Nation: Finding Balance in the Age of Indulgence',
      deskripsi: 'Dr. Anna Lembke (Stanford) — Sains dopamin & mekanisme kecanduan modern' },
    { id: 'XeN6eGO6FVQ', judul: 'Controlling Your Dopamine for Motivation, Focus & Satisfaction',
      deskripsi: 'Huberman Lab Essentials — Cara kelola dopamin untuk motivasi sehat' },
    { id: 'mpRRix8m4SQ', judul: 'How Porn Consumption Affects Your Ability to Form Relationships',
      deskripsi: 'Dr. K — Efek konsumsi jangka panjang pada kapasitas berhubungan' },
    { id: 'K-TW2Chpz4k', judul: 'Leverage Dopamine to Overcome Procrastination',
      deskripsi: 'Huberman Lab — Dopamin & tunda gratifikasi untuk disiplin harian' },
  ],
  en: [
    { id: 'y1CkUhfHSxQ', judul: 'Porn Addiction Is Misunderstood: How To Actually Stop',
      deskripsi: 'Dr. K (HealthyGamerGG) — A psychiatrist\'s clinical approach to really stopping' },
    { id: 'n2u8Z1HeKD8', judul: 'Dopamine Nation: Finding Balance in the Age of Indulgence',
      deskripsi: 'Dr. Anna Lembke (Stanford) — The science of dopamine & modern addiction' },
    { id: 'XeN6eGO6FVQ', judul: 'Controlling Your Dopamine for Motivation, Focus & Satisfaction',
      deskripsi: 'Huberman Lab Essentials — Managing dopamine for healthy motivation' },
    { id: 'mpRRix8m4SQ', judul: 'How Porn Consumption Affects Your Ability to Form Relationships',
      deskripsi: 'Dr. K — Long-term effects on relational capacity' },
    { id: 'K-TW2Chpz4k', judul: 'Leverage Dopamine to Overcome Procrastination',
      deskripsi: 'Huberman Lab — Dopamine & delayed gratification for daily discipline' },
  ],
}

export const pornVideos = (locale: Locale): Video[] => LOCALIZED[locale]
