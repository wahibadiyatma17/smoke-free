import type { Locale } from '@/i18n/types'
import type { Badge } from '../types'

type BadgeBase = Omit<Badge, 'judul' | 'deskripsi'>
type BadgeText = { judul: string; deskripsi: string }

const BASE: BadgeBase[] = [
  { id: 'satu-jam',    ikon: '⏱️', syarat: s => s.diffHours >= 1,        bg: '#FFF3E0',             border: '#FFD0A0',             color: '#E65100',           rotate: '-2deg'   },
  { id: 'satu-hari',   ikon: '🌅', syarat: s => s.diffDays >= 1,         bg: '#FFFDE7',             border: '#FFE9A0',             color: '#E65100',           rotate: '1.5deg'  },
  { id: 'tiga-hari',   ikon: '🌊', syarat: s => s.diffDays >= 3,         bg: 'var(--coral-pale)',   border: 'var(--coral-tint)',   color: 'var(--coral-mid)',  rotate: '-1.5deg' },
  { id: 'satu-minggu', ikon: '⭐', syarat: s => s.diffDays >= 7,         bg: '#FFFDE7',             border: 'var(--amber-tint)',   color: 'var(--amber-strong)', rotate: '2deg'  },
  { id: 'dua-minggu',  ikon: '🍓', syarat: s => s.diffDays >= 14,        bg: 'var(--green-pale)',   border: 'var(--green-tint)',   color: 'var(--green-dark)', rotate: '-1deg'   },
  { id: 'satu-bulan',  ikon: '🌱', syarat: s => s.diffMonths >= 1,       bg: 'var(--green-pale)',   border: 'var(--green-tint)',   color: 'var(--green-dark)', rotate: '1deg'    },
  { id: 'tiga-bulan',  ikon: '🏆', syarat: s => s.diffMonths >= 3,       bg: 'var(--lavender-pale)',border: 'var(--lavender-tint)',color: 'var(--lavender)',   rotate: '-2deg'   },
  { id: 'enam-bulan',  ikon: '🛡️', syarat: s => s.diffMonths >= 6,       bg: 'var(--coral-pale)',   border: 'var(--coral-tint)',   color: 'var(--coral-mid)',  rotate: '1.5deg'  },
  { id: 'satu-tahun',  ikon: '🌟', syarat: s => s.diffYears >= 1,        bg: '#F3E5FF',             border: '#DEB3FF',             color: '#6A1B9A',           rotate: '-1.5deg' },
  { id: 'seratus-porsi', ikon: '🧋', syarat: s => s.unitsAvoided >= 100, bg: 'var(--green-pale)',   border: 'var(--green-tint)',   color: 'var(--green-dark)', rotate: '2deg'    },
  { id: 'hemat-100',   ikon: '💰', syarat: s => s.moneySaved >= 100000,  bg: 'var(--amber-pale)',   border: 'var(--amber-tint)',   color: 'var(--amber-strong)', rotate: '-1deg' },
  { id: 'hemat-1jt',   ikon: '🤑', syarat: s => s.moneySaved >= 1000000, bg: '#FFFDE7',             border: '#FFE082',             color: '#E65100',           rotate: '1deg'    },
]

const TEXT: Record<Locale, Record<string, BadgeText>> = {
  id: {
    'satu-jam':      { judul: 'Jam Pertama',       deskripsi: 'Menahan 1 jam pertama' },
    'satu-hari':     { judul: 'Hari Pertama',      deskripsi: '24 jam tanpa gula tambahan' },
    'tiga-hari':     { judul: 'Lewati Puncak',     deskripsi: 'Puncak ngidam sudah terlewati' },
    'satu-minggu':   { judul: 'Satu Minggu',       deskripsi: 'Tujuh hari manis alami' },
    'dua-minggu':    { judul: 'Lidah Baru',        deskripsi: 'Indera perasamu sudah beregenerasi' },
    'satu-bulan':    { judul: 'Sebulan Segar',     deskripsi: 'Satu bulan tanpa gula tambahan!' },
    'tiga-bulan':    { judul: 'Tiga Bulan',        deskripsi: 'Energi stabil jadi normal barumu' },
    'enam-bulan':    { judul: 'Enam Bulan',        deskripsi: 'Risiko diabetes menurun nyata' },
    'satu-tahun':    { judul: 'Setahun Bebas',     deskripsi: 'Metabolisme sehat sepanjang tahun' },
    'seratus-porsi': { judul: 'Bebas Boba',        deskripsi: '100 porsi manis dihindari' },
    'hemat-100':     { judul: 'Penabung Hebat',    deskripsi: 'Hemat lebih dari Rp 100.000' },
    'hemat-1jt':     { judul: 'Jutawan Segar',     deskripsi: 'Hemat lebih dari Rp 1.000.000' },
  },
  en: {
    'satu-jam':      { judul: 'First Hour',        deskripsi: 'Held through the first hour' },
    'satu-hari':     { judul: 'First Day',         deskripsi: '24 hours without added sugar' },
    'tiga-hari':     { judul: 'Past the Peak',     deskripsi: 'The craving peak is behind you' },
    'satu-minggu':   { judul: 'One Week',          deskripsi: 'Seven naturally sweet days' },
    'dua-minggu':    { judul: 'New Taste Buds',    deskripsi: 'Your taste buds have regenerated' },
    'satu-bulan':    { judul: 'Fresh Month',       deskripsi: 'One full month without added sugar!' },
    'tiga-bulan':    { judul: 'Three Months',      deskripsi: 'Steady energy is your new normal' },
    'enam-bulan':    { judul: 'Six Months',        deskripsi: 'Diabetes risk visibly lower' },
    'satu-tahun':    { judul: 'One Year Free',     deskripsi: 'A healthy metabolism all year' },
    'seratus-porsi': { judul: 'Boba Free',         deskripsi: '100 sweet servings avoided' },
    'hemat-100':     { judul: 'Great Saver',       deskripsi: 'Saved more than Rp 100,000' },
    'hemat-1jt':     { judul: 'Fresh Millionaire', deskripsi: 'Saved more than Rp 1,000,000' },
  },
}

export function getSugarBadges(locale: Locale): Badge[] {
  const text = TEXT[locale] ?? TEXT.id
  return BASE.map(b => ({ ...b, ...text[b.id] }))
}
