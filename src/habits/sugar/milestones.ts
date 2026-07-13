import type { Locale } from '@/i18n/types'
import type { SugarData, Milestone, MilestoneStatus } from '../types'

type MilestoneBase = { hours: number; icon: string }
type MilestoneText = { label: string; description: string }

// Timeline grounded in commonly reported quit-sugar recovery stages:
// withdrawal peaks days 3–5, taste buds regenerate ~every 10–14 days,
// liver fat measurably drops within weeks (UCSF), long-term stages map to
// reduced metabolic disease risk (SSB meta-analyses).
const BASE: MilestoneBase[] = [
  { hours: 6,      icon: '🩸' },
  { hours: 24,     icon: '😮‍💨' },
  { hours: 72,     icon: '💪' },
  { hours: 120,    icon: '🧠' },
  { hours: 168,    icon: '⚡' },
  { hours: 336,    icon: '👅' },
  { hours: 720,    icon: '🫀' },
  { hours: 1008,   icon: '🌱' },
  { hours: 2160,   icon: '✨' },
  { hours: 4380,   icon: '🛡️' },
  { hours: 8760,   icon: '🏆' },
  { hours: 26280,  icon: '🌟' },
]

const TEXT: Record<Locale, MilestoneText[]> = {
  id: [
    { label: '6 Jam',    description: 'Gula darah mulai menstabil tanpa lonjakan baru' },
    { label: '24 Jam',   description: 'Gejala "sugar withdrawal" mulai — tanda tubuh menyesuaikan' },
    { label: '3 Hari',   description: 'Puncak ngidam & mood swing — setelah ini semakin ringan' },
    { label: '5 Hari',   description: 'Kabut otak menipis, fokus mulai kembali' },
    { label: '1 Minggu', description: 'Energi lebih stabil, ngidam mulai mereda' },
    { label: '2 Minggu', description: 'Indera perasa beregenerasi — buah terasa lebih manis' },
    { label: '1 Bulan',  description: 'Sensitivitas insulin membaik, lemak hati mulai berkurang' },
    { label: '6 Minggu', description: 'Respons otak terhadap gula menurun — ngidam rutin hilang' },
    { label: '3 Bulan',  description: 'Energi konsisten, kulit lebih cerah (glikasi berkurang)' },
    { label: '6 Bulan',  description: 'Risiko diabetes tipe 2 & penyakit jantung menurun nyata' },
    { label: '1 Tahun',  description: 'Metabolisme lebih sehat, berat badan lebih terkendali' },
    { label: '3 Tahun',  description: 'Tubuhmu hidup dengan manis alami sepenuhnya' },
  ],
  en: [
    { label: '6 Hours',  description: 'Blood sugar starts stabilizing without new spikes' },
    { label: '24 Hours', description: 'Sugar withdrawal begins — a sign your body is adjusting' },
    { label: '3 Days',   description: 'Cravings & mood swings peak — it gets easier from here' },
    { label: '5 Days',   description: 'Brain fog thins out, focus starts returning' },
    { label: '1 Week',   description: 'Energy steadier, cravings begin to ease' },
    { label: '2 Weeks',  description: 'Taste buds regenerate — fruit tastes sweeter' },
    { label: '1 Month',  description: 'Insulin sensitivity improves, liver fat starts dropping' },
    { label: '6 Weeks',  description: 'Brain\'s reward response to sugar fades — routine cravings gone' },
    { label: '3 Months', description: 'Consistent energy, brighter skin (less glycation)' },
    { label: '6 Months', description: 'Type 2 diabetes & heart disease risk visibly lower' },
    { label: '1 Year',   description: 'Healthier metabolism, weight easier to manage' },
    { label: '3 Years',  description: 'Your body lives fully on natural sweetness' },
  ],
}

function getMilestones(locale: Locale): Milestone[] {
  const text = TEXT[locale] ?? TEXT.id
  return BASE.map((b, i) => ({ ...b, ...text[i] }))
}

export function getSugarMilestonesFactory(locale: Locale) {
  const list = getMilestones(locale)
  return function (data: SugarData): MilestoneStatus[] {
    const now = new Date()
    const diffHours = (now.getTime() - data.quitDate.toDate().getTime()) / (1000 * 60 * 60)
    return list.map(m => ({
      ...m,
      achieved: diffHours >= m.hours,
      progress: Math.min((diffHours / m.hours) * 100, 100),
    }))
  }
}
