import type { Locale } from '@/i18n/types'

export interface DailyPractice {
  cue: string
  context: string
  emoji: string
}

const LOCALIZED: Record<Locale, DailyPractice[]> = {
  id: [
    { emoji: '🌅', cue: 'Hirup napas pertama sebelum buka HP.',              context: 'Pagi menentukan pola seharian.' },
    { emoji: '⏱️', cue: 'Pasang batas waktu layar di Digital Wellbeing.',   context: 'Lingkungan lebih kuat dari niat.' },
    { emoji: '💧', cue: 'Minum segelas air tanpa distraksi apa pun.',        context: 'Kesadaran kecil membangun otot besar.' },
    { emoji: '🚶', cue: 'Jalan keluar 5 menit setelah sesi kerja lama.',     context: 'Tubuh yang bergerak memutus pola otomatis.' },
    { emoji: '📝', cue: 'Tulis 3 hal yang kamu syukuri hari ini.',           context: 'Fokus ke yang ada meredam keinginan ke yang hilang.' },
    { emoji: '🧘', cue: 'Tutup mata 2 menit — cukup rasakan napasmu.',       context: 'Latihan singkat tetap berbekas.' },
    { emoji: '❄️', cue: 'Cuci muka dengan air dingin sebelum tidur.',       context: 'Shock response memutus malam-hari otomatis.' },
    { emoji: '📵', cue: 'Letakkan HP di ruangan lain saat bekerja.',         context: 'Jarak fisik = jarak psikologis.' },
    { emoji: '🙏', cue: 'Sebelum mengecek HP, tanya: "Apa yang aku cari?"', context: 'Dorongan sering menyamar jadi kebosanan.' },
    { emoji: '🤝', cue: 'Kirim satu pesan ke teman yang bermakna.',          context: 'Koneksi nyata mengisi kekosongan palsu.' },
    { emoji: '📚', cue: 'Baca 5 halaman buku sebelum bangun dari kursi.',    context: 'Pikiran yang terisi tidak mudah tergoda.' },
    { emoji: '🕯️', cue: 'Tidur 30 menit lebih awal malam ini.',             context: 'Lelah adalah pemicu terbesar.' },
    { emoji: '🔍', cue: 'HALT check: Hungry? Angry? Lonely? Tired?',          context: 'Temui akar dorongan, bukan cabangnya.' },
    { emoji: '🌿', cue: 'Luangkan 10 menit di alam terbuka.',                context: 'Matahari & udara menenangkan sistem saraf.' },
    { emoji: '✍️', cue: 'Tulis satu kalimat: "Aku memilih ___ karena ___."', context: 'Bahasa membentuk identitas, identitas membentuk tindakan.' },
  ],
  en: [
    { emoji: '🌅', cue: 'Take your first breath before opening your phone.',        context: 'The morning sets the pattern for the day.' },
    { emoji: '⏱️', cue: 'Set screen time limits in Digital Wellbeing.',             context: 'Environment is stronger than intention.' },
    { emoji: '💧', cue: 'Drink a glass of water with zero distractions.',           context: 'Small awareness builds big muscle.' },
    { emoji: '🚶', cue: 'Step outside for 5 minutes after a long work session.',    context: 'A moving body breaks the automatic pattern.' },
    { emoji: '📝', cue: 'Write 3 things you\'re grateful for today.',                context: 'Focus on what you have dulls desire for what\'s missing.' },
    { emoji: '🧘', cue: 'Close your eyes for 2 minutes — just feel your breath.',   context: 'Short practice still leaves its mark.' },
    { emoji: '❄️', cue: 'Splash your face with cold water before bed.',             context: 'Shock response breaks the automatic nighttime loop.' },
    { emoji: '📵', cue: 'Put your phone in another room while you work.',           context: 'Physical distance = psychological distance.' },
    { emoji: '🙏', cue: 'Before checking your phone, ask: "What am I looking for?"',context: 'The urge often disguises itself as boredom.' },
    { emoji: '🤝', cue: 'Send one meaningful message to a friend.',                 context: 'Real connection fills the false void.' },
    { emoji: '📚', cue: 'Read 5 pages of a book before getting up.',                context: 'A filled mind is harder to tempt.' },
    { emoji: '🕯️', cue: 'Go to sleep 30 minutes earlier tonight.',                  context: 'Tiredness is the biggest trigger.' },
    { emoji: '🔍', cue: 'HALT check: Hungry? Angry? Lonely? Tired?',                context: 'Meet the root of the urge, not the branch.' },
    { emoji: '🌿', cue: 'Spend 10 minutes outdoors.',                               context: 'Sun and air calm the nervous system.' },
    { emoji: '✍️', cue: 'Write one sentence: "I choose ___ because ___."',          context: 'Language shapes identity; identity shapes action.' },
  ],
}

export function getPornPractices(locale: Locale): DailyPractice[] {
  return LOCALIZED[locale]
}

/** Deterministic daily pick — same practice on the same calendar day each year. */
export function getDailyPractice(locale: Locale, date = new Date()): DailyPractice {
  const list = LOCALIZED[locale]
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date.getTime() - start.getTime()
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24))
  return list[dayOfYear % list.length]
}
