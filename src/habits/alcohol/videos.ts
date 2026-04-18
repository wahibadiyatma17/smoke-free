import type { Locale } from '@/i18n/types'
import type { Video } from '../types'

const LOCALIZED: Record<Locale, Video[]> = {
  id: [
    { id: 'vkpz7xFTWJo', judul: 'Your Brain on Alcohol',                          deskripsi: 'AsapSCIENCE – Bagaimana alkohol mempengaruhi otakmu' },
    { id: 'gCrmFbgT37I', judul: 'How Does Alcohol Make You Drunk?',               deskripsi: 'TED-Ed (Judy Grisel) – Perjalanan etanol di dalam tubuh' },
    { id: 'DkS1pkKpILY', judul: 'What Alcohol Does to Your Body, Brain & Health', deskripsi: 'Huberman Lab – Kajian lengkap tentang alkohol dan tubuh' },
  ],
  en: [
    { id: 'vkpz7xFTWJo', judul: 'Your Brain on Alcohol',                          deskripsi: 'AsapSCIENCE — How alcohol affects your brain' },
    { id: 'gCrmFbgT37I', judul: 'How Does Alcohol Make You Drunk?',               deskripsi: 'TED-Ed (Judy Grisel) — The journey of ethanol in your body' },
    { id: 'DkS1pkKpILY', judul: 'What Alcohol Does to Your Body, Brain & Health', deskripsi: 'Huberman Lab — A full breakdown of alcohol and the body' },
  ],
}

export const alcoholVideos = (locale: Locale): Video[] => LOCALIZED[locale]
