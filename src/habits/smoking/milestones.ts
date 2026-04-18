import type { Locale } from '@/i18n/types'
import type { Milestone, MilestoneStatus, SmokingData } from '../types'

type MilestoneBase = { hours: number; icon: string }
type MilestoneText = { label: string; description: string }

const BASE: MilestoneBase[] = [
  { hours: 0.33,   icon: '❤️' },
  { hours: 8,      icon: '🫁' },
  { hours: 24,     icon: '💪' },
  { hours: 48,     icon: '👃' },
  { hours: 72,     icon: '🌬️' },
  { hours: 168,    icon: '🩸' },
  { hours: 336,    icon: '🫀' },
  { hours: 720,    icon: '🌱' },
  { hours: 2160,   icon: '🌿' },
  { hours: 4380,   icon: '🌲' },
  { hours: 8760,   icon: '⭐' },
  { hours: 43800,  icon: '🏆' },
  { hours: 87600,  icon: '🎯' },
  { hours: 131400, icon: '🌟' },
]

const TEXT: Record<Locale, MilestoneText[]> = {
  id: [
    { label: '20 Menit',  description: 'Detak jantung & tekanan darah mulai normal' },
    { label: '8 Jam',     description: 'Kadar karbon monoksida kembali normal' },
    { label: '24 Jam',    description: 'Risiko serangan jantung mulai berkurang' },
    { label: '48 Jam',    description: 'Saraf memulih, penciuman & rasa membaik' },
    { label: '72 Jam',    description: 'Napas lebih mudah, kapasitas paru meningkat' },
    { label: '1 Minggu',  description: 'Sirkulasi darah signifikan membaik' },
    { label: '2 Minggu',  description: 'Fungsi paru meningkat 30%' },
    { label: '1 Bulan',   description: 'Silia paru-paru mulai beregenerasi' },
    { label: '3 Bulan',   description: 'Fungsi paru terus meningkat pesat' },
    { label: '6 Bulan',   description: 'Batuk & sesak napas berkurang drastis' },
    { label: '1 Tahun',   description: 'Risiko penyakit jantung koroner berkurang 50%' },
    { label: '5 Tahun',   description: 'Risiko stroke sama dengan bukan perokok' },
    { label: '10 Tahun',  description: 'Risiko kanker paru berkurang 50%' },
    { label: '15 Tahun',  description: 'Risiko penyakit jantung sama dengan non-perokok' },
  ],
  en: [
    { label: '20 Minutes',description: 'Heart rate & blood pressure start to normalize' },
    { label: '8 Hours',   description: 'Carbon monoxide levels return to normal' },
    { label: '24 Hours',  description: 'Heart attack risk begins to drop' },
    { label: '48 Hours',  description: 'Nerves recover, smell & taste return' },
    { label: '72 Hours',  description: 'Breathing gets easier, lung capacity rises' },
    { label: '1 Week',    description: 'Blood circulation significantly improved' },
    { label: '2 Weeks',   description: 'Lung function up by 30%' },
    { label: '1 Month',   description: 'Lung cilia start to regenerate' },
    { label: '3 Months',  description: 'Lung function keeps climbing' },
    { label: '6 Months',  description: 'Coughing & shortness of breath drop sharply' },
    { label: '1 Year',    description: 'Coronary heart disease risk cut by 50%' },
    { label: '5 Years',   description: 'Stroke risk equal to a non-smoker' },
    { label: '10 Years',  description: 'Lung cancer risk reduced by 50%' },
    { label: '15 Years',  description: 'Heart disease risk equal to a non-smoker' },
  ],
}

function getMilestones(locale: Locale): Milestone[] {
  const text = TEXT[locale] ?? TEXT.id
  return BASE.map((b, i) => ({ ...b, ...text[i] }))
}

export function getSmokingMilestonesFactory(locale: Locale) {
  const list = getMilestones(locale)
  return function (data: SmokingData): MilestoneStatus[] {
    const now = new Date()
    const diffHours = (now.getTime() - data.quitDate.toDate().getTime()) / (1000 * 60 * 60)
    return list.map(m => ({
      ...m,
      achieved: diffHours >= m.hours,
      progress: Math.min((diffHours / m.hours) * 100, 100),
    }))
  }
}
