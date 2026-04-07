import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRupiah(amount: number): string {
  if (amount >= 1_000_000) {
    const juta = amount / 1_000_000
    return `Rp ${juta % 1 === 0 ? juta.toFixed(0) : juta.toFixed(1)} jt`
  }
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Keep generic formatCurrency for backwards compat
export function formatCurrency(amount: number): string {
  return formatRupiah(amount)
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('id-ID').format(num)
}

export function getSmokeFreeStats(
  quitDate: Date,
  cigarettesPerDay: number,
  pricePerPack: number,
  cigarettesPerPack = 16 // Indonesian standard (Sampoerna, Gudang Garam, etc.)
) {
  const now = new Date()
  const diffMs = now.getTime() - quitDate.getTime()
  const diffSeconds = Math.floor(diffMs / 1000)
  const diffMinutes = Math.floor(diffSeconds / 60)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)
  const diffWeeks = Math.floor(diffDays / 7)
  const diffMonths = Math.floor(diffDays / 30)
  const diffYears = Math.floor(diffDays / 365)

  const cigarettesAvoided = Math.max(0, Math.floor(
    diffDays * cigarettesPerDay + ((diffHours % 24) * cigarettesPerDay) / 24
  ))
  const packsAvoided = cigarettesAvoided / cigarettesPerPack
  const moneySaved = packsAvoided * pricePerPack
  const minutesLife = cigarettesAvoided * 11 // ~11 min life per cig

  return {
    diffMs,
    diffSeconds,
    diffMinutes,
    diffHours,
    diffDays,
    diffWeeks,
    diffMonths,
    diffYears,
    cigarettesAvoided,
    moneySaved,
    minutesLife,
    hoursLife: Math.floor(minutesLife / 60),
    daysLife: Math.floor(minutesLife / 60 / 24),
  }
}

export function getHealthMilestones(quitDate: Date) {
  const now = new Date()
  const diffHours = (now.getTime() - quitDate.getTime()) / (1000 * 60 * 60)

  const milestones = [
    { hours: 0.33, label: '20 Menit',    description: 'Detak jantung & tekanan darah mulai normal', icon: '❤️' },
    { hours: 8,    label: '8 Jam',       description: 'Kadar karbon monoksida kembali normal',       icon: '🫁' },
    { hours: 24,   label: '24 Jam',      description: 'Risiko serangan jantung mulai berkurang',     icon: '💪' },
    { hours: 48,   label: '48 Jam',      description: 'Saraf memulih — penciuman & rasa membaik',    icon: '👃' },
    { hours: 72,   label: '72 Jam',      description: 'Napas lebih mudah, kapasitas paru meningkat', icon: '🌬️' },
    { hours: 168,  label: '1 Minggu',    description: 'Sirkulasi darah signifikan membaik',          icon: '🩸' },
    { hours: 336,  label: '2 Minggu',    description: 'Fungsi paru meningkat 30%',                   icon: '🫀' },
    { hours: 720,  label: '1 Bulan',     description: 'Silia paru-paru mulai beregenerasi',          icon: '🌱' },
    { hours: 2160, label: '3 Bulan',     description: 'Fungsi paru terus meningkat pesat',           icon: '🌿' },
    { hours: 4380, label: '6 Bulan',     description: 'Batuk & sesak napas berkurang drastis',       icon: '🌲' },
    { hours: 8760, label: '1 Tahun',     description: 'Risiko penyakit jantung koroner berkurang 50%', icon: '⭐' },
    { hours: 43800, label: '5 Tahun',   description: 'Risiko stroke sama dengan bukan perokok',     icon: '🏆' },
    { hours: 87600, label: '10 Tahun',  description: 'Risiko kanker paru berkurang 50%',            icon: '🎯' },
    { hours: 131400, label: '15 Tahun', description: 'Risiko penyakit jantung sama dengan non-perokok', icon: '🌟' },
  ]

  return milestones.map(m => ({
    ...m,
    achieved: diffHours >= m.hours,
    progress: Math.min((diffHours / m.hours) * 100, 100),
  }))
}

export function getSalam(): string {
  const h = new Date().getHours()
  if (h < 11) return 'Selamat pagi'
  if (h < 15) return 'Selamat siang'
  if (h < 19) return 'Selamat sore'
  return 'Selamat malam'
}

export const motivasiQuotes = [
  // Health reminders
  'Paru-parumu sedang menyembuhkan diri sekarang — setiap detik.',
  'Setelah 20 menit berhenti, detak jantungmu sudah mulai normal.',
  'Karbon monoksida di darahmu turun drastis dalam 12 jam pertama.',
  'Setelah 2 minggu, peredaran darahmu membaik secara signifikan.',
  'Sel-sel rambut getar di paru-parumu sudah mulai berfungsi kembali.',
  'Risiko serangan jantungmu turun setiap hari yang berlalu.',
  'Indera penciumanmu perlahan kembali — dunia terasa lebih hidup.',
  // Urge management
  'Keinginan merokok hanya berlangsung 3 sampai 5 menit. Kamu bisa.',
  'Tarik napas dalam 4 hitungan. Tahan 4 detik. Buang pelan-pelan.',
  'Minum segelas air dingin sekarang — keinginan itu akan berlalu.',
  'Tubuhmu tidak butuh rokok. Yang kamu rasakan hanya kebiasaan lama.',
  'Keinginan itu bukan kamu — itu hanya sinyal otak yang bisa diabaikan.',
  'Jalan kaki 5 menit bisa memutus siklus keinginan itu.',
  // Motivational
  'Kamu lebih kuat dari yang kamu kira.',
  'Setiap hari tanpa rokok adalah hadiah untuk dirimu di masa depan.',
  'Kamu tidak merokok hari ini — itu adalah prestasi nyata.',
  'Orang-orang yang peduli padamu bangga dengan pilihanmu.',
  'Uang yang kamu hemat hari ini nyata dan terus bertambah.',
  'Kamu sedang menulis ulang cerita hidupmu, satu hari dalam satu waktu.',
  'Tidak ada kata terlambat untuk memilih kesehatan.',
  // Mindset
  'Bukan "aku tidak boleh merokok" — tapi "aku memilih untuk tidak."',
  'Kamu bukan perokok yang sedang mencoba berhenti. Kamu bebas.',
  'Setiap godaan yang berhasil kamu lewati membuatmu semakin kuat.',
  'Napas berikutnya adalah milikmu sepenuhnya.',
  'Kamu sudah membuktikannya. Kamu bisa melakukan ini.',
]

export function getMotivasi(days: number): string {
  return motivasiQuotes[days % motivasiQuotes.length]
}
