import type { Locale } from '@/i18n/types'
import type { Video } from '../types'

// All video IDs verified via YouTube oEmbed (title + channel confirmed).
const LOCALIZED: Record<Locale, Video[]> = {
  id: [
    { id: 'iWv_ZyP3peI', judul: 'Apa Jadinya Jika Berhenti Konsumsi Gula?',       deskripsi: 'Kok Bisa? – Yang terjadi pada tubuhmu saat berhenti gula' },
    { id: 'lEXBxijQREo', judul: 'How Sugar Affects the Brain',                     deskripsi: 'TED-Ed (Nicole Avena) – Kenapa gula begitu bikin ketagihan' },
    { id: 'tnCIXrwspjY', judul: 'Kenapa Gula Bisa Merusak Ginjal, Mata & Jantung', deskripsi: 'Rory Asyari – Dokter penyakit dalam menjelaskan bahaya gula' },
    { id: 'yd8eL3BPHhM', judul: 'Bahaya Kecanduan Gula pada Anak',                 deskripsi: 'Royal Progress – dr. Benedictus Yohanes, Sp.A' },
    { id: 'f_4Q9Iv7_Ao', judul: 'Kenapa Gula Sama Buruknya dengan Alkohol',        deskripsi: 'What I\'ve Learned – Fruktosa & racun bagi hati' },
    { id: 'Ba4pTnEIhhQ', judul: 'Waspada Gula! Bahaya Tersembunyi',                deskripsi: 'FKIK ULM – Edukasi bahaya gula bagi kesehatanmu' },
  ],
  en: [
    { id: 'lEXBxijQREo', judul: 'How Sugar Affects the Brain',                     deskripsi: 'TED-Ed (Nicole Avena) — Why sugar is so addictive' },
    { id: 'Dacv_OoM62s', judul: 'This Is Your Brain On Sugar',                     deskripsi: 'TEDx (Amy Reichelt) — A neuroscientist on sugar & the brain' },
    { id: 'f_4Q9Iv7_Ao', judul: 'Why Sugar is as Bad as Alcohol',                 deskripsi: 'What I\'ve Learned — Fructose, the liver toxin' },
    { id: 'iWv_ZyP3peI', judul: 'What Happens When You Quit Sugar?',               deskripsi: 'Kok Bisa? — What happens to your body (Indonesian)' },
    { id: 'tnCIXrwspjY', judul: 'How Sugar Damages Kidneys, Eyes & Heart',         deskripsi: 'Rory Asyari — An internist explains sugar\'s dangers (Indonesian)' },
    { id: 'Ba4pTnEIhhQ', judul: 'Beware of Sugar! The Hidden Danger',             deskripsi: 'FKIK ULM — The hidden health risks of sugar (Indonesian)' },
  ],
}

export const sugarVideos = (locale: Locale): Video[] => LOCALIZED[locale]
