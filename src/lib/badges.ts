import { getSmokeFreeStats } from './utils'

export interface Badge {
  id: string
  ikon: string
  judul: string
  deskripsi: string
  syarat: (s: ReturnType<typeof getSmokeFreeStats>) => boolean
  bg: string
  border: string
  color: string
  rotate: string
}

export const badges: Badge[] = [
  { id: 'satu-jam',    ikon: '⏱️', judul: 'Jam Pertama',      deskripsi: 'Bertahan 1 jam pertama',                  syarat: s => s.diffHours >= 1,       bg: '#FFF3E0',             border: '#FFD0A0',             color: '#E65100',              rotate: '-2deg'   },
  { id: 'satu-hari',   ikon: '🌅', judul: 'Hari Pertama',     deskripsi: '24 jam tanpa sebatang pun',               syarat: s => s.diffDays >= 1,        bg: '#FFFDE7',             border: '#FFE9A0',             color: '#E65100',              rotate: '1.5deg'  },
  { id: 'tiga-hari',   ikon: '💪', judul: 'Tiga Hari Kuat',   deskripsi: 'Gejala fisik terparah sudah lewat',       syarat: s => s.diffDays >= 3,        bg: 'var(--coral-pale)',   border: 'var(--coral-tint)',   color: 'var(--coral-mid)',     rotate: '-1.5deg' },
  { id: 'satu-minggu', ikon: '⭐', judul: 'Satu Minggu',      deskripsi: 'Tujuh hari kebebasan penuh',              syarat: s => s.diffDays >= 7,        bg: '#FFFDE7',             border: 'var(--amber-tint)',   color: 'var(--amber)',         rotate: '2deg'    },
  { id: 'dua-minggu',  ikon: '🌱', judul: 'Dua Minggu',       deskripsi: 'Paru-parumu mulai sembuh',                syarat: s => s.diffDays >= 14,       bg: 'var(--green-pale)',   border: 'var(--green-tint)',   color: 'var(--green-dark)',    rotate: '-1deg'   },
  { id: 'satu-bulan',  ikon: '🌿', judul: 'Sebulan Penuh',    deskripsi: 'Satu bulan bebas rokok!',                 syarat: s => s.diffMonths >= 1,      bg: 'var(--green-pale)',   border: 'var(--green-tint)',   color: 'var(--green-dark)',    rotate: '1deg'    },
  { id: 'tiga-bulan',  ikon: '🏆', judul: 'Tiga Bulan',       deskripsi: 'Sirkulasi darah pulih sepenuhnya',        syarat: s => s.diffMonths >= 3,      bg: 'var(--lavender-pale)',border: '#D8D2FF',             color: 'var(--lavender)',      rotate: '-2deg'   },
  { id: 'enam-bulan',  ikon: '🎯', judul: 'Enam Bulan',       deskripsi: 'Napas jauh lebih lega',                   syarat: s => s.diffMonths >= 6,      bg: '#E8F5FF',             border: '#B3DAFF',             color: '#1565C0',              rotate: '1.5deg'  },
  { id: 'satu-tahun',  ikon: '🌟', judul: 'Setahun Penuh!',   deskripsi: 'Risiko jantung berkurang 50%',            syarat: s => s.diffYears >= 1,       bg: '#F3E5FF',             border: '#DEB3FF',             color: '#6A1B9A',              rotate: '-1.5deg' },
  { id: 'lima-tahun',  ikon: '👑', judul: 'Lima Tahun Raja',  deskripsi: 'Risiko stroke = bukan perokok',           syarat: s => s.diffYears >= 5,       bg: '#FFF8E1',             border: 'var(--amber-tint)',   color: '#BF8600',              rotate: '2deg'    },
  { id: 'hemat-100',   ikon: '💰', judul: 'Penabung Hebat',   deskripsi: 'Hemat lebih dari Rp 100.000',             syarat: s => s.moneySaved >= 100000, bg: 'var(--amber-pale)',   border: 'var(--amber-tint)',   color: 'var(--amber)',         rotate: '-1deg'   },
  { id: 'hemat-1jt',   ikon: '🤑', judul: 'Jutawan Sehat',    deskripsi: 'Hemat lebih dari Rp 1.000.000',           syarat: s => s.moneySaved >= 1000000,bg: '#FFFDE7',             border: '#FFE082',             color: '#E65100',              rotate: '1deg'    },
]
