import type { Locale } from '@/i18n/types'
import type { TipCategory } from '../types'

const LOCALIZED: Record<Locale, TipCategory[]> = {
  id: [
    {
      label: 'Pernapasan', ikon: '🌬️',
      tips: [
        { judul: 'Napas Kotak',       desc: 'Hirup 4 detik · tahan 4 · hembuskan 4 · tahan 4. Ulangi 5x',  ikon: '⬜' },
        { judul: 'Teknik 4-7-8',      desc: 'Hirup 4 detik, tahan 7, hembuskan perlahan 8 detik',           ikon: '🔢' },
        { judul: 'Napas Diafragma',   desc: 'Kembangkan perut saat hirup, perlahan kempis saat hembuskan',  ikon: '🫁' },
        { judul: 'Napas Dalam',       desc: '4 hitungan masuk · 4 tahan · 4 keluar',                        ikon: '🌬️' },
        { judul: 'Visualisasi Ombak', desc: 'Bayangkan keinginan seperti ombak — datang lalu pergi',        ikon: '🌊' },
        { judul: 'Napas Sadar',       desc: 'Tutup mata, fokus penuh pada setiap napas selama 2 menit',     ikon: '🧘' },
      ],
    },
    {
      label: 'Aktivitas', ikon: '🏃',
      tips: [
        { judul: 'Jalan Kaki',        desc: 'Bahkan 5 menit di luar mengubah suasana hati',                 ikon: '🚶' },
        { judul: 'Naiki Tangga',      desc: 'Aerobik singkat yang langsung menurunkan keinginan',            ikon: '🪜' },
        { judul: 'Peregangan',        desc: 'Regangkan tubuh 3 menit untuk melepaskan ketegangan',           ikon: '🤸' },
        { judul: 'Jumping Jacks',     desc: '20 kali lompat untuk meningkatkan endorfin alami',              ikon: '⚡' },
        { judul: 'Cuci Muka',         desc: 'Sensasi air dingin di wajah memutus siklus keinginan',          ikon: '💦' },
        { judul: 'Yoga Singkat',      desc: 'Gerakan sederhana meningkatkan oksigen ke otak',                ikon: '🙆' },
      ],
    },
    {
      label: 'Distraksi', ikon: '🎯',
      tips: [
        { judul: 'Permen Karet',      desc: 'Buat mulutmu sibuk dengan pilihan sehat',                       ikon: '🍬' },
        { judul: 'Aktivitas Tangan',  desc: 'Menulis, menggambar, atau bermain puzzle',                      ikon: '✏️' },
        { judul: 'Benda di Tangan',   desc: 'Pegang pulpen, koin, atau benda kecil untuk tangan sibuk',      ikon: '🖊️' },
        { judul: 'Pindah Tempat',     desc: 'Ganti suasana — pergi ke ruangan lain atau keluar sebentar',    ikon: '🚪' },
        { judul: '5 Hal di Sekitar',  desc: 'Perhatikan 5 benda di sekitarmu — teknik grounding',            ikon: '👀' },
        { judul: 'Musik Favorit',     desc: 'Putar lagu kesukaan dan fokus pada melodi',                     ikon: '🎵' },
      ],
    },
    {
      label: 'Minuman', ikon: '💧',
      tips: [
        { judul: 'Air Dingin',        desc: 'Segelas air es secara perlahan meredam keinginan',              ikon: '💧' },
        { judul: 'Teh Herbal',        desc: 'Chamomile atau peppermint untuk ketenangan instan',             ikon: '🍵' },
        { judul: 'Wortel/Seledri',    desc: 'Camilan renyah untuk menyibukkan mulut',                        ikon: '🥕' },
        { judul: 'Susu Dingin',       desc: 'Penelitian: susu membuat rasa rokok tidak enak',                ikon: '🥛' },
        { judul: 'Jus Lemon',         desc: 'Rasa asam kuat memutus fokus pada keinginan',                   ikon: '🍋' },
        { judul: 'Camilan Sehat',     desc: 'Stabilkan gula darah dengan camilan bergizi kecil',             ikon: '🍎' },
      ],
    },
    {
      label: 'Mindfulness', ikon: '🧘',
      tips: [
        { judul: 'Meditasi 2 Menit',  desc: 'Duduk tenang dan fokus penuh pada napas',                       ikon: '🧘' },
        { judul: 'Urge Surfing',      desc: 'Amati keinginan tanpa menghakimi — biarkan berlalu sendiri',    ikon: '🏄' },
        { judul: 'Scan Tubuh',        desc: 'Sadari sensasi fisik dari kepala ke kaki tanpa reaksi',         ikon: '🔍' },
        { judul: 'Afirmasi',          desc: '"Keinginan ini akan berlalu. Aku lebih kuat dari ini."',        ikon: '💬' },
        { judul: 'Hadir Penuh',       desc: 'Perhatikan 5 hal dilihat, 4 disentuh, 3 didengar',              ikon: '🌟' },
        { judul: 'Terima Keinginan',  desc: 'Akui keinginan itu ada — tidak melawan justru mempercepatnya', ikon: '🤝' },
      ],
    },
    {
      label: 'Sosial', ikon: '🤝',
      tips: [
        { judul: 'Hubungi Seseorang', desc: 'Alihkan pikiran dengan percakapan',                             ikon: '📞' },
        { judul: 'Kirim Pesan',       desc: 'Beritahu temanmu bahwa kamu sedang berjuang',                   ikon: '💬' },
        { judul: 'Baca Motivasi',     desc: 'Buka catatan alasanmu berhenti merokok',                        ikon: '📖' },
        { judul: 'Tonton Video Lucu', desc: 'Tawa adalah pengalih keinginan yang efektif',                   ikon: '😂' },
        { judul: 'Ingat Alasanmu',    desc: 'Bayangkan dirimu sehat dan bebas rokok di masa depan',          ikon: '🎯' },
        { judul: 'Bantu Orang Lain',  desc: 'Mengalihkan diri ke aktivitas sosial memutus siklus craving',   ikon: '🫂' },
      ],
    },
  ],
  en: [
    {
      label: 'Breathing', ikon: '🌬️',
      tips: [
        { judul: 'Box Breathing',     desc: 'Inhale 4 · hold 4 · exhale 4 · hold 4. Repeat 5 times',            ikon: '⬜' },
        { judul: '4-7-8 Technique',   desc: 'Inhale 4, hold 7, exhale slowly for 8 seconds',                    ikon: '🔢' },
        { judul: 'Diaphragm Breath',  desc: 'Expand your belly as you inhale, soften as you exhale',            ikon: '🫁' },
        { judul: 'Deep Breath',       desc: '4 counts in · 4 hold · 4 out',                                     ikon: '🌬️' },
        { judul: 'Wave Visualization',desc: 'Picture the craving as a wave — it comes then goes',              ikon: '🌊' },
        { judul: 'Mindful Breath',    desc: 'Close your eyes, focus fully on each breath for 2 minutes',        ikon: '🧘' },
      ],
    },
    {
      label: 'Activity', ikon: '🏃',
      tips: [
        { judul: 'Walk',              desc: 'Even 5 minutes outside shifts your mood',                          ikon: '🚶' },
        { judul: 'Climb Stairs',      desc: 'Brief aerobics that knock cravings down instantly',                ikon: '🪜' },
        { judul: 'Stretch',           desc: '3 minutes of stretching to release tension',                       ikon: '🤸' },
        { judul: 'Jumping Jacks',     desc: '20 jumps to boost natural endorphins',                             ikon: '⚡' },
        { judul: 'Splash Your Face',  desc: 'Cold water on your face breaks the craving loop',                  ikon: '💦' },
        { judul: 'Quick Yoga',        desc: 'Simple poses get more oxygen to your brain',                       ikon: '🙆' },
      ],
    },
    {
      label: 'Distraction', ikon: '🎯',
      tips: [
        { judul: 'Chewing Gum',       desc: 'Keep your mouth busy with a healthy choice',                       ikon: '🍬' },
        { judul: 'Hand Activity',     desc: 'Write, draw, or solve a puzzle',                                   ikon: '✏️' },
        { judul: 'Hold Something',    desc: 'A pen, coin, or small object keeps hands busy',                    ikon: '🖊️' },
        { judul: 'Change Rooms',      desc: 'Shift scenes — step into another room or outside',                 ikon: '🚪' },
        { judul: '5 Things Around',   desc: 'Notice 5 objects near you — a grounding technique',                ikon: '👀' },
        { judul: 'Favorite Music',    desc: 'Play a song you love and focus on the melody',                     ikon: '🎵' },
      ],
    },
    {
      label: 'Drinks', ikon: '💧',
      tips: [
        { judul: 'Cold Water',        desc: 'Sip ice water slowly — cravings settle down',                      ikon: '💧' },
        { judul: 'Herbal Tea',        desc: 'Chamomile or peppermint for instant calm',                         ikon: '🍵' },
        { judul: 'Carrot/Celery',     desc: 'Crunchy snack to keep your mouth busy',                            ikon: '🥕' },
        { judul: 'Cold Milk',         desc: 'Research shows milk makes cigarettes taste bad',                   ikon: '🥛' },
        { judul: 'Lemon Juice',       desc: 'Strong tart flavor breaks the craving focus',                      ikon: '🍋' },
        { judul: 'Healthy Snack',     desc: 'Stabilize blood sugar with a small nutritious bite',               ikon: '🍎' },
      ],
    },
    {
      label: 'Mindfulness', ikon: '🧘',
      tips: [
        { judul: '2-Min Meditation',  desc: 'Sit quietly and focus fully on your breath',                       ikon: '🧘' },
        { judul: 'Urge Surfing',      desc: 'Observe the urge without judgment — let it pass',                  ikon: '🏄' },
        { judul: 'Body Scan',         desc: 'Feel sensations from head to toe without reacting',                ikon: '🔍' },
        { judul: 'Affirmation',       desc: '"This craving will pass. I am stronger than it."',                 ikon: '💬' },
        { judul: 'Full Presence',     desc: 'Notice 5 things seen, 4 touched, 3 heard',                         ikon: '🌟' },
        { judul: 'Accept the Urge',   desc: 'Acknowledge it — resisting only speeds the cycle up',              ikon: '🤝' },
      ],
    },
    {
      label: 'Social', ikon: '🤝',
      tips: [
        { judul: 'Call Someone',      desc: 'Shift your mind with a real conversation',                         ikon: '📞' },
        { judul: 'Send a Message',    desc: 'Tell a friend you\'re struggling right now',                        ikon: '💬' },
        { judul: 'Read Your Why',     desc: 'Open your notes on why you quit',                                  ikon: '📖' },
        { judul: 'Watch a Funny Clip',desc: 'Laughter is an effective craving diverter',                        ikon: '😂' },
        { judul: 'Remember Your Why', desc: 'Picture your healthy, smoke-free future self',                     ikon: '🎯' },
        { judul: 'Help Someone',      desc: 'Shifting focus to others breaks the craving loop',                 ikon: '🫂' },
      ],
    },
  ],
}

export const smokingTipCategories = (locale: Locale): TipCategory[] => LOCALIZED[locale]

const TRIGGERS: Record<Locale, string[]> = {
  id: ['Stres', 'Setelah makan', 'Kopi', 'Sosial', 'Alkohol', 'Bosan', 'Kerja', 'Berkendara', 'Pagi hari', 'Lainnya'],
  en: ['Stress', 'After a meal', 'Coffee', 'Social', 'Alcohol', 'Bored', 'Work', 'Driving', 'Morning', 'Other'],
}

const COPINGS: Record<Locale, string[]> = {
  id: ['Tarik napas dalam', 'Minum air', 'Jalan kaki', 'Alihkan perhatian', 'Hubungi seseorang', 'Meditasi', 'Permen karet', 'Tunggu berlalu'],
  en: ['Deep breathing', 'Drink water', 'Walk', 'Distract yourself', 'Call someone', 'Meditate', 'Chew gum', 'Wait it out'],
}

export const smokingCravingTriggers = (locale: Locale): string[] => TRIGGERS[locale]
export const smokingCravingCopings = (locale: Locale): string[] => COPINGS[locale]
