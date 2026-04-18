import type { Locale } from '@/i18n/types'
import type { Badge } from '../types'

type BadgeBase = Omit<Badge, 'judul' | 'deskripsi'>
type BadgeText = { judul: string; deskripsi: string }

const BASE: BadgeBase[] = [
  { id: 'satu-jam',    ikon: '⏱️', syarat: s => s.diffHours >= 1,        bg: '#FFF3E0',             border: '#FFD0A0',             color: '#E65100',              rotate: '-2deg'   },
  { id: 'satu-hari',   ikon: '🌅', syarat: s => s.diffDays >= 1,         bg: '#FFFDE7',             border: '#FFE9A0',             color: '#E65100',              rotate: '1.5deg'  },
  { id: 'tiga-hari',   ikon: '💎', syarat: s => s.diffDays >= 3,         bg: 'var(--coral-pale)',   border: 'var(--coral-tint)',   color: 'var(--coral-mid)',     rotate: '-1.5deg' },
  { id: 'satu-minggu', ikon: '⭐', syarat: s => s.diffDays >= 7,         bg: '#FFFDE7',             border: 'var(--amber-tint)',   color: 'var(--amber-strong)',         rotate: '2deg'    },
  { id: 'dua-minggu',  ikon: '🌱', syarat: s => s.diffDays >= 14,        bg: 'var(--green-pale)',   border: 'var(--green-tint)',   color: 'var(--green-dark)',    rotate: '-1deg'   },
  { id: 'satu-bulan',  ikon: '🌿', syarat: s => s.diffMonths >= 1,       bg: 'var(--green-pale)',   border: 'var(--green-tint)',   color: 'var(--green-dark)',    rotate: '1deg'    },
  { id: 'tiga-bulan',  ikon: '🏆', syarat: s => s.diffMonths >= 3,       bg: 'var(--lavender-pale)',border: 'var(--lavender-tint)',color: 'var(--lavender)',      rotate: '-2deg'   },
  { id: 'enam-bulan',  ikon: '🎯', syarat: s => s.diffMonths >= 6,       bg: 'var(--coral-pale)',   border: 'var(--coral-tint)',   color: 'var(--coral-mid)',     rotate: '1.5deg'  },
  { id: 'satu-tahun',  ikon: '🌟', syarat: s => s.diffYears >= 1,        bg: '#F3E5FF',             border: '#DEB3FF',             color: '#6A1B9A',              rotate: '-1.5deg' },
  { id: 'lima-tahun',  ikon: '👑', syarat: s => s.diffYears >= 5,        bg: '#FFF8E1',             border: 'var(--amber-tint)',   color: '#BF8600',              rotate: '2deg'    },
  { id: 'hemat-100',   ikon: '💰', syarat: s => s.moneySaved >= 100000,  bg: 'var(--amber-pale)',   border: 'var(--amber-tint)',   color: 'var(--amber-strong)',         rotate: '-1deg'   },
  { id: 'hemat-1jt',   ikon: '🤑', syarat: s => s.moneySaved >= 1000000, bg: '#FFFDE7',             border: '#FFE082',             color: '#E65100',              rotate: '1deg'    },
]

const TEXT: Record<Locale, Record<string, BadgeText>> = {
  id: {
    'satu-jam':    { judul: 'Jam Pertama',      deskripsi: 'Menahan 1 jam pertama' },
    'satu-hari':   { judul: 'Hari Pertama',     deskripsi: '24 jam tanpa satu tegukan pun' },
    'tiga-hari':   { judul: 'Tiga Hari Jernih', deskripsi: 'Gejala terberat sudah lewat' },
    'satu-minggu': { judul: 'Satu Minggu',      deskripsi: 'Tujuh hari kebebasan penuh' },
    'dua-minggu':  { judul: 'Dua Minggu',       deskripsi: 'Hatimu mulai beregenerasi' },
    'satu-bulan':  { judul: 'Sebulan Sadar',    deskripsi: 'Satu bulan hidup jernih!' },
    'tiga-bulan':  { judul: 'Tiga Bulan',       deskripsi: 'Hati & otak pulih signifikan' },
    'enam-bulan':  { judul: 'Enam Bulan',       deskripsi: 'Memori & fokus jauh lebih tajam' },
    'satu-tahun':  { judul: 'Setahun Bebas',    deskripsi: 'Risiko kanker mulai turun nyata' },
    'lima-tahun':  { judul: 'Lima Tahun Jernih',deskripsi: 'Risiko kanker ≈ bukan peminum' },
    'hemat-100':   { judul: 'Penabung Hebat',   deskripsi: 'Hemat lebih dari Rp 100.000' },
    'hemat-1jt':   { judul: 'Jutawan Sadar',    deskripsi: 'Hemat lebih dari Rp 1.000.000' },
  },
  en: {
    'satu-jam':    { judul: 'First Hour',         deskripsi: 'Held through the first hour' },
    'satu-hari':   { judul: 'First Day',          deskripsi: '24 hours without a single sip' },
    'tiga-hari':   { judul: 'Three Clear Days',   deskripsi: 'The worst symptoms are past' },
    'satu-minggu': { judul: 'One Week',           deskripsi: 'Seven full days of freedom' },
    'dua-minggu':  { judul: 'Two Weeks',          deskripsi: 'Your liver is beginning to heal' },
    'satu-bulan':  { judul: 'Sober Month',        deskripsi: 'One full month of clear living!' },
    'tiga-bulan':  { judul: 'Three Months',       deskripsi: 'Liver & brain notably recovered' },
    'enam-bulan':  { judul: 'Six Months',         deskripsi: 'Memory & focus much sharper' },
    'satu-tahun':  { judul: 'One Year Free',      deskripsi: 'Cancer risk starts to fall clearly' },
    'lima-tahun':  { judul: 'Five Clear Years',   deskripsi: 'Cancer risk ≈ non-drinker' },
    'hemat-100':   { judul: 'Great Saver',        deskripsi: 'Saved more than Rp 100,000' },
    'hemat-1jt':   { judul: 'Sober Millionaire',  deskripsi: 'Saved more than Rp 1,000,000' },
  },
}

export function getAlcoholBadges(locale: Locale): Badge[] {
  const text = TEXT[locale] ?? TEXT.id
  return BASE.map(b => ({ ...b, ...text[b.id] }))
}
