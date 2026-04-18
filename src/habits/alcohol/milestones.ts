import type { Locale } from '@/i18n/types'
import type { AlcoholData, Milestone, MilestoneStatus } from '../types'

type MilestoneBase = { hours: number; icon: string }
type MilestoneText = { label: string; description: string }

const BASE: MilestoneBase[] = [
  { hours: 6,      icon: '💧' },
  { hours: 24,     icon: '😌' },
  { hours: 72,     icon: '💪' },
  { hours: 168,    icon: '✨' },
  { hours: 336,    icon: '🫀' },
  { hours: 720,    icon: '🌱' },
  { hours: 2160,   icon: '🌿' },
  { hours: 4380,   icon: '🧠' },
  { hours: 8760,   icon: '⭐' },
  { hours: 43800,  icon: '🏆' },
  { hours: 87600,  icon: '🎯' },
  { hours: 131400, icon: '🌟' },
]

const TEXT: Record<Locale, MilestoneText[]> = {
  id: [
    { label: '6 Jam',    description: 'Alkohol mulai keluar dari darahmu' },
    { label: '24 Jam',   description: 'Gula darah menstabil, tidur mulai membaik' },
    { label: '72 Jam',   description: 'Puncak gejala putus alkohol sudah terlewati' },
    { label: '1 Minggu', description: 'Dehidrasi teratasi, kulit lebih jernih' },
    { label: '2 Minggu', description: 'Tekanan darah mulai turun, fokus lebih tajam' },
    { label: '1 Bulan',  description: 'Lemak hati mulai berkurang, energi konsisten' },
    { label: '3 Bulan',  description: 'Sel-sel hati beregenerasi secara signifikan' },
    { label: '6 Bulan',  description: 'Memori & konsentrasi membaik nyata' },
    { label: '1 Tahun',  description: 'Risiko kanker mulut, tenggorokan & hati turun' },
    { label: '5 Tahun',  description: 'Risiko kanker mendekati bukan peminum' },
    { label: '10 Tahun', description: 'Risiko stroke setara bukan peminum' },
    { label: '15 Tahun', description: 'Tubuh hidup dalam kondisi jernih jangka panjang' },
  ],
  en: [
    { label: '6 Hours',  description: 'Alcohol starts clearing from your blood' },
    { label: '24 Hours', description: 'Blood sugar stabilizes, sleep starts improving' },
    { label: '72 Hours', description: 'Peak withdrawal symptoms have passed' },
    { label: '1 Week',   description: 'Dehydration resolved, skin clearer' },
    { label: '2 Weeks',  description: 'Blood pressure drops, focus sharpens' },
    { label: '1 Month',  description: 'Liver fat declines, energy consistent' },
    { label: '3 Months', description: 'Liver cells regenerate significantly' },
    { label: '6 Months', description: 'Memory & concentration notably better' },
    { label: '1 Year',   description: 'Mouth, throat & liver cancer risk drops' },
    { label: '5 Years',  description: 'Cancer risk approaching a non-drinker' },
    { label: '10 Years', description: 'Stroke risk equal to a non-drinker' },
    { label: '15 Years', description: 'Your body lives in long-term clarity' },
  ],
}

function getMilestones(locale: Locale): Milestone[] {
  const text = TEXT[locale] ?? TEXT.id
  return BASE.map((b, i) => ({ ...b, ...text[i] }))
}

export function getAlcoholMilestonesFactory(locale: Locale) {
  const list = getMilestones(locale)
  return function (data: AlcoholData): MilestoneStatus[] {
    const now = new Date()
    const diffHours = (now.getTime() - data.quitDate.toDate().getTime()) / (1000 * 60 * 60)
    return list.map(m => ({
      ...m,
      achieved: diffHours >= m.hours,
      progress: Math.min((diffHours / m.hours) * 100, 100),
    }))
  }
}
