import type { Locale } from '@/i18n/types'
import type { TipCategory } from '../types'

const LOCALIZED: Record<Locale, TipCategory[]> = {
  id: [
    {
      label: 'Pernapasan', ikon: '🌬️',
      tips: [
        { judul: 'Napas Kotak',       desc: 'Hirup 4 detik · tahan 4 · hembuskan 4 · tahan 4. Ulangi 5x',  ikon: '⬜' },
        { judul: 'Teknik 4-7-8',      desc: 'Hirup 4, tahan 7, hembuskan 8. Sistem saraf menenang.',       ikon: '🔢' },
        { judul: 'Napas Dingin',      desc: 'Hirup lewat hidung pelan, rasakan kesejukannya',              ikon: '❄️' },
        { judul: 'Napas Sadar',       desc: 'Tutup mata, fokus penuh pada setiap napas 2 menit',           ikon: '🧘' },
        { judul: 'Visualisasi Ombak', desc: 'Bayangkan dorongan sebagai ombak — datang lalu pergi',         ikon: '🌊' },
        { judul: 'Napas Diafragma',   desc: 'Kembangkan perut saat hirup, kempis saat hembuskan',          ikon: '🫁' },
      ],
    },
    {
      label: 'Aktivitas Fisik', ikon: '🏃',
      tips: [
        { judul: 'Push-up 20x',      desc: 'Tubuh bergerak memutus loop otomatis',                         ikon: '💪' },
        { judul: 'Mandi Air Dingin', desc: 'Shock response alami yang langsung memutus siklus',            ikon: '🚿' },
        { judul: 'Cuci Muka',        desc: 'Air dingin di wajah — trik sederhana yang efektif',            ikon: '💦' },
        { judul: 'Jalan Kaki',       desc: '5 menit keluar ruangan mengubah suasana',                      ikon: '🚶' },
        { judul: 'Jumping Jacks',    desc: '30 detik lompat memompa energi baik',                          ikon: '⚡' },
        { judul: 'Peregangan',       desc: 'Regangkan 3 menit untuk melepas ketegangan',                   ikon: '🤸' },
      ],
    },
    {
      label: 'Digital Discipline', ikon: '📵',
      tips: [
        { judul: 'Jauhkan Perangkat',desc: 'Letakkan HP di ruangan lain, matikan laptop',                  ikon: '🔌' },
        { judul: 'Mode Grayscale',   desc: 'Aktifkan mode abu-abu — otak jadi kurang tertarik layar',      ikon: '⚫' },
        { judul: 'Aplikasi Blocker', desc: 'Pakai app seperti Cold Turkey, BlockSite, atau Freedom',       ikon: '🛡️' },
        { judul: 'Screen Timeout',   desc: 'Set batas waktu layar di iOS Screen Time / Digital Wellbeing', ikon: '⏱️' },
        { judul: 'Keluar dari Kamar',desc: 'Lingkungan memicu kebiasaan. Ubah lingkungan.',                ikon: '🚪' },
        { judul: 'Tidur Lebih Cepat',desc: 'Malam hari zona risiko — tidur dulu sebelum pikiran jalan',    ikon: '😴' },
      ],
    },
    {
      label: 'Mindfulness', ikon: '🧘',
      tips: [
        { judul: 'Urge Surfing',     desc: 'Amati dorongan tanpa melawan — biarkan berlalu',              ikon: '🏄' },
        { judul: 'HALT Check',       desc: 'Hungry? Angry? Lonely? Tired? Identifikasi akar',             ikon: '🔍' },
        { judul: 'Scan Tubuh',       desc: 'Sadari sensasi dari kepala ke kaki tanpa reaksi',             ikon: '👁️' },
        { judul: 'Meditasi 2 Menit', desc: 'Duduk tenang, fokus pada napas',                              ikon: '🧘' },
        { judul: 'Afirmasi',         desc: '"Dorongan ini bukan aku. Akan berlalu."',                      ikon: '💬' },
        { judul: 'Jurnal Cepat',     desc: 'Tulis 3 kalimat tentang perasaanmu saat ini',                 ikon: '📝' },
      ],
    },
    {
      label: 'Kreativitas', ikon: '🎨',
      tips: [
        { judul: 'Gambar / Sketsa',  desc: 'Aktivitas tangan memindahkan energi ke karya',                ikon: '✏️' },
        { judul: 'Tulis Jurnal',     desc: 'Eksplorasi perasaan di kertas memprosesnya',                  ikon: '📖' },
        { judul: 'Musik',            desc: 'Mainkan atau dengarkan lagu yang membangkitkan',              ikon: '🎵' },
        { judul: 'Baca Buku',        desc: '10 halaman mengalihkan pikiran efektif',                      ikon: '📚' },
        { judul: 'Masak',            desc: 'Fokus motorik + rasa pencapaian',                             ikon: '🍳' },
        { judul: 'Hobi Tangan',      desc: 'Menyulam, puzzle, model — apa pun yang menyibukkan tangan',   ikon: '🪡' },
      ],
    },
    {
      label: 'Sosial', ikon: '🤝',
      tips: [
        { judul: 'Hubungi Teman',    desc: 'Satu pesan memutus kesendirian seketika',                     ikon: '📞' },
        { judul: 'Accountability',   desc: 'Ceritakan ke partner akuntabilitas tepercaya',                ikon: '🫂' },
        { judul: 'Keluar Rumah',     desc: 'Cari konteks sosial — cafe, taman, tempat publik',            ikon: '🚶' },
        { judul: 'Bantu Orang Lain', desc: 'Fokus ke orang lain memutus fokus ke diri',                   ikon: '🤲' },
        { judul: 'Komunitas Online', desc: 'Gabung komunitas recovery yang mendukung',                    ikon: '💬' },
        { judul: 'Ibadah/Refleksi',  desc: 'Praktik spiritual yang bermakna bagi kamu',                   ikon: '🌿' },
      ],
    },
  ],
  en: [
    {
      label: 'Breathing', ikon: '🌬️',
      tips: [
        { judul: 'Box Breathing',     desc: 'Inhale 4 · hold 4 · exhale 4 · hold 4. Repeat 5 times',       ikon: '⬜' },
        { judul: '4-7-8 Technique',   desc: 'Inhale 4, hold 7, exhale 8. Calms the nervous system.',      ikon: '🔢' },
        { judul: 'Cool Breath',       desc: 'Inhale slowly through the nose and feel the coolness',       ikon: '❄️' },
        { judul: 'Mindful Breath',    desc: 'Close your eyes, focus fully on each breath for 2 minutes',  ikon: '🧘' },
        { judul: 'Wave Visualization',desc: 'Picture the urge as a wave — it rises then passes',         ikon: '🌊' },
        { judul: 'Diaphragm Breath',  desc: 'Expand your belly on the inhale, soften on the exhale',      ikon: '🫁' },
      ],
    },
    {
      label: 'Physical Activity', ikon: '🏃',
      tips: [
        { judul: '20 Push-ups',      desc: 'Moving the body breaks the automatic loop',                   ikon: '💪' },
        { judul: 'Cold Shower',      desc: 'Natural shock response — cuts the cycle instantly',           ikon: '🚿' },
        { judul: 'Splash Your Face', desc: 'Cold water on the face — a simple, effective trick',          ikon: '💦' },
        { judul: 'Walk',             desc: '5 minutes outside shifts the mood',                           ikon: '🚶' },
        { judul: 'Jumping Jacks',    desc: '30 seconds of jumping for good energy',                       ikon: '⚡' },
        { judul: 'Stretch',          desc: '3 minutes of stretching releases tension',                    ikon: '🤸' },
      ],
    },
    {
      label: 'Digital Discipline', ikon: '📵',
      tips: [
        { judul: 'Distance Devices',desc: 'Put your phone in another room, shut the laptop',             ikon: '🔌' },
        { judul: 'Grayscale Mode',   desc: 'Enable gray mode — the brain loses screen interest',          ikon: '⚫' },
        { judul: 'Blocker App',      desc: 'Use Cold Turkey, BlockSite, or Freedom',                      ikon: '🛡️' },
        { judul: 'Screen Timeout',   desc: 'Set limits via iOS Screen Time / Digital Wellbeing',          ikon: '⏱️' },
        { judul: 'Leave the Room',   desc: 'Environment triggers habit. Change the environment.',         ikon: '🚪' },
        { judul: 'Sleep Earlier',    desc: 'Nighttime is risk zone — sleep before thoughts wander',       ikon: '😴' },
      ],
    },
    {
      label: 'Mindfulness', ikon: '🧘',
      tips: [
        { judul: 'Urge Surfing',     desc: 'Observe the urge without fighting — let it pass',             ikon: '🏄' },
        { judul: 'HALT Check',       desc: 'Hungry? Angry? Lonely? Tired? Find the root',                 ikon: '🔍' },
        { judul: 'Body Scan',        desc: 'Feel sensations head to toe without reacting',                ikon: '👁️' },
        { judul: '2-Min Meditation', desc: 'Sit quietly, focus on your breath',                           ikon: '🧘' },
        { judul: 'Affirmation',      desc: '"This urge isn\'t me. It will pass."',                         ikon: '💬' },
        { judul: 'Quick Journal',    desc: 'Write 3 sentences about how you feel now',                    ikon: '📝' },
      ],
    },
    {
      label: 'Creativity', ikon: '🎨',
      tips: [
        { judul: 'Draw / Sketch',    desc: 'Hand activity moves energy into work',                        ikon: '✏️' },
        { judul: 'Write a Journal',  desc: 'Exploring feelings on paper processes them',                  ikon: '📖' },
        { judul: 'Music',            desc: 'Play or listen to a song that lifts you',                     ikon: '🎵' },
        { judul: 'Read a Book',      desc: '10 pages effectively shift the mind',                         ikon: '📚' },
        { judul: 'Cook',             desc: 'Motor focus + a sense of accomplishment',                     ikon: '🍳' },
        { judul: 'Hand Hobby',       desc: 'Embroidery, puzzles, models — anything that keeps hands busy',ikon: '🪡' },
      ],
    },
    {
      label: 'Social', ikon: '🤝',
      tips: [
        { judul: 'Call a Friend',    desc: 'One message breaks loneliness instantly',                     ikon: '📞' },
        { judul: 'Accountability',   desc: 'Tell a trusted accountability partner',                       ikon: '🫂' },
        { judul: 'Leave the House',  desc: 'Find a social context — cafe, park, public space',            ikon: '🚶' },
        { judul: 'Help Someone',     desc: 'Focus on others breaks self-focus',                           ikon: '🤲' },
        { judul: 'Online Community', desc: 'Join a supportive recovery community',                        ikon: '💬' },
        { judul: 'Worship/Reflect',  desc: 'Spiritual practice that has meaning for you',                 ikon: '🌿' },
      ],
    },
  ],
}

export const pornTipCategories = (locale: Locale): TipCategory[] => LOCALIZED[locale]

const TRIGGERS: Record<Locale, string[]> = {
  id: ['Malam hari', 'Sendirian', 'Laptop/HP', 'Stres', 'Bosan', 'Setelah scrolling', 'Bangun tidur', 'Emosi berat', 'Lainnya'],
  en: ['Nighttime', 'Alone', 'Laptop/Phone', 'Stress', 'Bored', 'After scrolling', 'Just woke up', 'Heavy emotion', 'Other'],
}

const COPINGS: Record<Locale, string[]> = {
  id: ['Tarik napas dalam', 'Cuci muka', 'Push-up', 'Jalan kaki', 'Tutup perangkat', 'Tunggu 10 menit', 'Hubungi teman', 'Jurnal'],
  en: ['Deep breathing', 'Splash face', 'Push-ups', 'Walk', 'Close device', 'Wait 10 min', 'Call a friend', 'Journal'],
}

export const pornCravingTriggers = (locale: Locale): string[] => TRIGGERS[locale]
export const pornCravingCopings = (locale: Locale): string[] => COPINGS[locale]
