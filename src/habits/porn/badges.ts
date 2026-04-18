import type { Locale } from '@/i18n/types'
import type { Badge } from '../types'

type BadgeBase = Omit<Badge, 'judul' | 'deskripsi'>
type BadgeText = { judul: string; deskripsi: string }

const BASE: BadgeBase[] = [
  { id: 'satu-jam',    ikon: '⏱️', syarat: s => s.diffHours >= 1,         bg: 'var(--green-pale)',    border: 'var(--green-tint)',   color: 'var(--green-mid)',    rotate: '-2deg'   },
  { id: 'satu-hari',   ikon: '🌅', syarat: s => s.diffDays >= 1,          bg: 'var(--coral-pale)',    border: 'var(--coral-tint)',   color: 'var(--coral-mid)',    rotate: '1.5deg'  },
  { id: 'tiga-hari',   ikon: '💎', syarat: s => s.diffDays >= 3,          bg: 'var(--green-pale)',    border: 'var(--green-tint)',   color: 'var(--green-dark)',   rotate: '-1.5deg' },
  { id: 'satu-minggu', ikon: '⭐', syarat: s => s.diffDays >= 7,          bg: 'var(--amber-pale)',    border: 'var(--amber-tint)',   color: 'var(--amber-strong)',        rotate: '2deg'    },
  { id: 'dua-minggu',  ikon: '🌱', syarat: s => s.diffDays >= 14,         bg: 'var(--green-pale)',    border: 'var(--green-tint)',   color: 'var(--green-dark)',   rotate: '-1deg'   },
  { id: 'satu-bulan',  ikon: '🌿', syarat: s => s.diffMonths >= 1,        bg: 'var(--green-pale)',    border: 'var(--green-tint)',   color: 'var(--green-dark)',   rotate: '1deg'    },
  { id: 'tiga-bulan',  ikon: '🏆', syarat: s => s.diffMonths >= 3,        bg: 'var(--lavender-pale)', border: 'var(--lavender-tint)',color: 'var(--lavender)',     rotate: '-2deg'   },
  { id: 'enam-bulan',  ikon: '🎯', syarat: s => s.diffMonths >= 6,        bg: 'var(--coral-pale)',    border: 'var(--coral-tint)',   color: 'var(--coral-mid)',    rotate: '1.5deg'  },
  { id: 'satu-tahun',  ikon: '🌟', syarat: s => s.diffYears >= 1,         bg: '#EEF2FF',              border: '#C7D2FE',             color: '#4338CA',             rotate: '-1.5deg' },
  { id: 'lima-tahun',  ikon: '👑', syarat: s => s.diffYears >= 5,         bg: '#FDF6EE',              border: '#F0DDB8',             color: '#B8895C',             rotate: '2deg'    },
  { id: 'waktu-50',    ikon: '🕐', syarat: s => s.timeReclaimedHours >= 50,  bg: 'var(--amber-pale)',    border: 'var(--amber-tint)',   color: 'var(--amber-strong)',        rotate: '-1deg'   },
  { id: 'waktu-500',   ikon: '⏰', syarat: s => s.timeReclaimedHours >= 500, bg: 'var(--lavender-pale)', border: 'var(--lavender-tint)',color: 'var(--lavender)',     rotate: '1deg'    },
]

const TEXT: Record<Locale, Record<string, BadgeText>> = {
  id: {
    'satu-jam':    { judul: 'Jam Pertama',      deskripsi: 'Menahan 1 jam pertama' },
    'satu-hari':   { judul: 'Hari Pertama',     deskripsi: '24 jam kontrol penuh' },
    'tiga-hari':   { judul: 'Tiga Hari',        deskripsi: 'Puncak dorongan awal terlewati' },
    'satu-minggu': { judul: 'Satu Minggu',      deskripsi: 'Tujuh hari konsisten' },
    'dua-minggu':  { judul: 'Dua Minggu',       deskripsi: 'Fokus & energi mulai terasa' },
    'satu-bulan':  { judul: 'Sebulan Penuh',    deskripsi: 'Sebulan pola baru!' },
    'tiga-bulan':  { judul: 'Tiga Bulan',       deskripsi: 'Pola lama kian kabur' },
    'enam-bulan':  { judul: 'Enam Bulan',       deskripsi: 'Kontrol diri jadi refleks' },
    'satu-tahun':  { judul: 'Setahun',          deskripsi: 'Identitas baru sudah terbentuk' },
    'lima-tahun':  { judul: 'Lima Tahun',       deskripsi: 'Kontrol jangka panjang stabil' },
    'waktu-50':    { judul: '50 Jam Dikembalikan',  deskripsi: 'Waktu untuk hal lain yang penting' },
    'waktu-500':   { judul: '500 Jam Dikembalikan', deskripsi: 'Puluhan minggu hidup kembali ke tangan kamu' },
  },
  en: {
    'satu-jam':    { judul: 'First Hour',            deskripsi: 'Held through the first hour' },
    'satu-hari':   { judul: 'First Day',             deskripsi: '24 hours in full control' },
    'tiga-hari':   { judul: 'Three Days',            deskripsi: 'Past the peak of early urges' },
    'satu-minggu': { judul: 'One Week',              deskripsi: 'Seven consistent days' },
    'dua-minggu':  { judul: 'Two Weeks',             deskripsi: 'Focus & energy start to show' },
    'satu-bulan':  { judul: 'Full Month',            deskripsi: 'A month of new patterns!' },
    'tiga-bulan':  { judul: 'Three Months',          deskripsi: 'Old patterns fading further' },
    'enam-bulan':  { judul: 'Six Months',            deskripsi: 'Self-control becomes reflex' },
    'satu-tahun':  { judul: 'One Year',              deskripsi: 'A new identity has taken shape' },
    'lima-tahun':  { judul: 'Five Years',            deskripsi: 'Long-term control is steady' },
    'waktu-50':    { judul: '50 Hours Regained',     deskripsi: 'Time for other things that matter' },
    'waktu-500':   { judul: '500 Hours Regained',    deskripsi: 'Dozens of weeks back in your hands' },
  },
}

export function getPornBadges(locale: Locale): Badge[] {
  const text = TEXT[locale] ?? TEXT.id
  return BASE.map(b => ({ ...b, ...text[b.id] }))
}
