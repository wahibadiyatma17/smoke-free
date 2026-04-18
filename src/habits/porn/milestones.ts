import type { Locale } from '@/i18n/types'
import type { Milestone, MilestoneStatus, PornData } from '../types'

type MilestoneBase = { hours: number; icon: string }
type MilestoneText = { label: string; description: string }

const BASE: MilestoneBase[] = [
  { hours: 24,    icon: '🌅' },
  { hours: 72,    icon: '💧' },
  { hours: 168,   icon: '🌱' },
  { hours: 336,   icon: '🧭' },
  { hours: 720,   icon: '🌿' },
  { hours: 2160,  icon: '🌳' },
  { hours: 4380,  icon: '⭐' },
  { hours: 8760,  icon: '🌟' },
  { hours: 17520, icon: '🏆' },
  { hours: 43800, icon: '👑' },
]

const TEXT: Record<Locale, MilestoneText[]> = {
  id: [
    { label: '24 Jam',    description: 'Hari pertama tanpa kompulsi — awal dari kontrol' },
    { label: '72 Jam',    description: 'Dorongan biasanya memuncak lalu mereda dalam 3–5 hari' },
    { label: '1 Minggu',  description: 'Ritme harian baru mulai terbentuk' },
    { label: '2 Minggu',  description: 'Fokus & energi mental terasa lebih stabil' },
    { label: '1 Bulan',   description: 'Pola pikiran otomatis mulai bergeser' },
    { label: '3 Bulan',   description: 'Respons terhadap trigger mulai lebih sadar' },
    { label: '6 Bulan',   description: 'Kepercayaan diri terhadap kontrol meningkat nyata' },
    { label: '1 Tahun',   description: 'Pola baru menjadi identitas, bukan perjuangan' },
    { label: '2 Tahun',   description: 'Kebiasaan lama terasa asing' },
    { label: '5 Tahun',   description: 'Kontrol jangka panjang stabil' },
  ],
  en: [
    { label: '24 Hours',  description: 'First day without compulsion — control begins' },
    { label: '72 Hours',  description: 'Urges usually peak then ease within 3–5 days' },
    { label: '1 Week',    description: 'A new daily rhythm starts to form' },
    { label: '2 Weeks',   description: 'Focus & mental energy feel more stable' },
    { label: '1 Month',   description: 'Automatic thought patterns begin to shift' },
    { label: '3 Months',  description: 'Trigger responses become more conscious' },
    { label: '6 Months',  description: 'Confidence in self-control grows visibly' },
    { label: '1 Year',    description: 'New pattern becomes identity, not struggle' },
    { label: '2 Years',   description: 'The old habit starts to feel foreign' },
    { label: '5 Years',   description: 'Long-term control is steady' },
  ],
}

function getMilestones(locale: Locale): Milestone[] {
  const text = TEXT[locale] ?? TEXT.id
  return BASE.map((b, i) => ({ ...b, ...text[i] }))
}

export function getPornMilestonesFactory(locale: Locale) {
  const list = getMilestones(locale)
  return function (data: PornData): MilestoneStatus[] {
    const now = new Date()
    const diffHours = (now.getTime() - data.quitDate.toDate().getTime()) / (1000 * 60 * 60)
    return list.map(m => ({
      ...m,
      achieved: diffHours >= m.hours,
      progress: Math.min((diffHours / m.hours) * 100, 100),
    }))
  }
}
