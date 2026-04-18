import type { Locale } from '@/i18n/types'
import type { TipCategory } from '../types'

const LOCALIZED: Record<Locale, TipCategory[]> = {
  id: [
    {
      label: 'Pernapasan', ikon: '🌬️',
      tips: [
        { judul: 'Napas Kotak',       desc: 'Hirup 4 detik · tahan 4 · hembuskan 4 · tahan 4. Ulangi 5x', ikon: '⬜' },
        { judul: 'Teknik 4-7-8',      desc: 'Hirup 4, tahan 7, hembuskan 8. Dorongan akan mereda.',        ikon: '🔢' },
        { judul: 'Napas Diafragma',   desc: 'Kembangkan perut saat menarik napas, kempis saat hembuskan',  ikon: '🫁' },
        { judul: 'Napas Sadar',       desc: 'Tutup mata, fokus penuh pada setiap napas selama 2 menit',    ikon: '🧘' },
        { judul: 'Visualisasi Ombak', desc: 'Bayangkan dorongan sebagai ombak — datang lalu pergi',         ikon: '🌊' },
        { judul: 'Napas Dingin',      desc: 'Hirup lewat hidung pelan, rasakan kesejukannya',              ikon: '❄️' },
      ],
    },
    {
      label: 'Aktivitas', ikon: '🏃',
      tips: [
        { judul: 'Jalan Kaki',       desc: '5 menit di luar mengubah suasana dan meredam keinginan',       ikon: '🚶' },
        { judul: 'Peregangan',       desc: 'Regangkan tubuh 3 menit untuk melepaskan ketegangan',          ikon: '🤸' },
        { judul: 'Mandi Air Dingin', desc: 'Shock response alami yang langsung memutus siklus',            ikon: '🚿' },
        { judul: 'Cuci Muka',        desc: 'Air dingin di wajah — trik sederhana yang efektif',            ikon: '💦' },
        { judul: 'Jumping Jacks',    desc: '20 kali lompat untuk memompa endorfin alami',                  ikon: '⚡' },
        { judul: 'Bersih-bersih',    desc: 'Rapikan meja atau ruangan — aktivitas produktif instant',      ikon: '🧹' },
      ],
    },
    {
      label: 'Minuman Alternatif', ikon: '🥤',
      tips: [
        { judul: 'Air Dingin',        desc: 'Segelas air es pelan-pelan meredam dorongan',                 ikon: '💧' },
        { judul: 'Teh Herbal',        desc: 'Chamomile atau peppermint untuk ketenangan instan',           ikon: '🍵' },
        { judul: 'Kombucha',          desc: 'Rasa asam-fermentasi mirip minuman beralkohol',               ikon: '🫗' },
        { judul: 'Sparkling Water',   desc: 'Sensasi gelembung memuaskan ritual memegang gelas',           ikon: '🥤' },
        { judul: 'Mocktail',          desc: 'Jus jeruk + tonic + mint — rasanya memanjakan',                ikon: '🍹' },
        { judul: 'Air Lemon Hangat',  desc: 'Detoksifikasi ringan, menenangkan perut',                     ikon: '🍋' },
      ],
    },
    {
      label: 'Mindfulness', ikon: '🧘',
      tips: [
        { judul: 'Urge Surfing',      desc: 'Amati dorongan tanpa melawan — biarkan berlalu',              ikon: '🏄' },
        { judul: 'HALT Check',        desc: 'Hungry? Angry? Lonely? Tired? Identifikasi akar dorongan',    ikon: '🔍' },
        { judul: 'Scan Tubuh',        desc: 'Sadari sensasi dari kepala ke kaki tanpa reaksi',             ikon: '👁️' },
        { judul: 'Meditasi 2 Menit',  desc: 'Duduk tenang, fokus pada napas',                              ikon: '🧘' },
        { judul: 'Afirmasi',          desc: '"Dorongan ini akan berlalu. Aku lebih kuat dari ini."',       ikon: '💬' },
        { judul: 'Jurnal Cepat',      desc: 'Tulis 3 kalimat tentang perasaanmu saat ini',                 ikon: '📝' },
      ],
    },
    {
      label: 'Sosial', ikon: '🤝',
      tips: [
        { judul: 'Hubungi Teman',    desc: 'Alihkan pikiran dengan percakapan tulus',                      ikon: '📞' },
        { judul: 'Kirim Pesan',      desc: 'Beritahu seseorang bahwa kamu sedang berjuang',                ikon: '💬' },
        { judul: 'Group Support',    desc: 'Ikuti komunitas online yang mendukung',                        ikon: '🫂' },
        { judul: 'Pergi dari Tempat',desc: 'Kalau di bar/pesta — keluar dulu sebentar',                    ikon: '🚪' },
        { judul: 'Bantu Orang Lain', desc: 'Fokus pada orang lain memutus fokus dari diri',                ikon: '🤲' },
        { judul: 'Tonton Konten',    desc: 'Video lucu atau bermakna mengubah mood',                       ikon: '📺' },
      ],
    },
    {
      label: 'Distraksi', ikon: '🎯',
      tips: [
        { judul: 'Baca Alasanmu',    desc: 'Buka catatan alasanmu berhenti',                               ikon: '📖' },
        { judul: 'Makan Ringan',     desc: 'Camilan sehat mengisi kekosongan mulut',                       ikon: '🍎' },
        { judul: 'Permen Karet',     desc: 'Buat mulut sibuk dengan pilihan sehat',                        ikon: '🍬' },
        { judul: 'Musik Favorit',    desc: 'Dengarkan lagu yang menenangkan atau membangkitkan',           ikon: '🎵' },
        { judul: 'Hobi Tangan',      desc: 'Menggambar, puzzle, atau bermain game ringan',                 ikon: '✏️' },
        { judul: 'Rencanakan Besok', desc: 'Tulis 3 hal yang ingin kamu lakukan besok pagi',               ikon: '📅' },
      ],
    },
  ],
  en: [
    {
      label: 'Breathing', ikon: '🌬️',
      tips: [
        { judul: 'Box Breathing',     desc: 'Inhale 4 · hold 4 · exhale 4 · hold 4. Repeat 5 times',        ikon: '⬜' },
        { judul: '4-7-8 Technique',   desc: 'Inhale 4, hold 7, exhale 8. The urge will ease.',             ikon: '🔢' },
        { judul: 'Diaphragm Breath',  desc: 'Expand your belly on the inhale, soften on the exhale',       ikon: '🫁' },
        { judul: 'Mindful Breath',    desc: 'Close your eyes, focus fully on each breath for 2 minutes',   ikon: '🧘' },
        { judul: 'Wave Visualization',desc: 'Picture the urge as a wave — it rises then passes',          ikon: '🌊' },
        { judul: 'Cool Breath',       desc: 'Inhale slowly through your nose and feel the coolness',       ikon: '❄️' },
      ],
    },
    {
      label: 'Activity', ikon: '🏃',
      tips: [
        { judul: 'Walk',             desc: '5 minutes outside changes the mood and dulls the urge',        ikon: '🚶' },
        { judul: 'Stretch',          desc: '3 minutes of stretching releases tension',                     ikon: '🤸' },
        { judul: 'Cold Shower',      desc: 'Natural shock response — breaks the cycle instantly',          ikon: '🚿' },
        { judul: 'Splash Your Face', desc: 'Cold water on the face — a simple, effective trick',           ikon: '💦' },
        { judul: 'Jumping Jacks',    desc: '20 jumps to pump natural endorphins',                          ikon: '⚡' },
        { judul: 'Tidy Up',          desc: 'Organize your desk or room — instant productive win',          ikon: '🧹' },
      ],
    },
    {
      label: 'Alternative Drinks', ikon: '🥤',
      tips: [
        { judul: 'Cold Water',        desc: 'Ice water sipped slowly settles the urge',                    ikon: '💧' },
        { judul: 'Herbal Tea',        desc: 'Chamomile or peppermint for instant calm',                    ikon: '🍵' },
        { judul: 'Kombucha',          desc: 'Tangy, fermented — echoes an alcoholic feel',                 ikon: '🫗' },
        { judul: 'Sparkling Water',   desc: 'Bubbles satisfy the glass-holding ritual',                    ikon: '🥤' },
        { judul: 'Mocktail',          desc: 'Orange + tonic + mint — feels like a treat',                  ikon: '🍹' },
        { judul: 'Warm Lemon Water',  desc: 'Gentle detox, soothes the stomach',                           ikon: '🍋' },
      ],
    },
    {
      label: 'Mindfulness', ikon: '🧘',
      tips: [
        { judul: 'Urge Surfing',      desc: 'Observe the urge without fighting — let it pass',             ikon: '🏄' },
        { judul: 'HALT Check',        desc: 'Hungry? Angry? Lonely? Tired? Identify the root',             ikon: '🔍' },
        { judul: 'Body Scan',         desc: 'Feel sensations head to toe without reacting',                ikon: '👁️' },
        { judul: '2-Min Meditation',  desc: 'Sit quietly, focus on your breath',                           ikon: '🧘' },
        { judul: 'Affirmation',       desc: '"This urge will pass. I am stronger than it."',               ikon: '💬' },
        { judul: 'Quick Journal',     desc: 'Write 3 sentences about how you feel right now',              ikon: '📝' },
      ],
    },
    {
      label: 'Social', ikon: '🤝',
      tips: [
        { judul: 'Call a Friend',    desc: 'Shift your mind with a real conversation',                     ikon: '📞' },
        { judul: 'Send a Message',   desc: 'Tell someone you\'re struggling right now',                     ikon: '💬' },
        { judul: 'Group Support',    desc: 'Join a supportive online community',                           ikon: '🫂' },
        { judul: 'Leave the Place',  desc: 'At a bar/party? Step outside for a while',                     ikon: '🚪' },
        { judul: 'Help Someone',     desc: 'Focusing on others breaks the self-focus',                     ikon: '🤲' },
        { judul: 'Watch Content',    desc: 'A funny or meaningful video shifts the mood',                  ikon: '📺' },
      ],
    },
    {
      label: 'Distraction', ikon: '🎯',
      tips: [
        { judul: 'Read Your Why',    desc: 'Open your notes on why you quit',                              ikon: '📖' },
        { judul: 'Light Snack',      desc: 'A healthy bite fills the oral emptiness',                      ikon: '🍎' },
        { judul: 'Chewing Gum',      desc: 'Keep your mouth busy with a healthy choice',                   ikon: '🍬' },
        { judul: 'Favorite Music',   desc: 'Listen to a song that calms or lifts you',                     ikon: '🎵' },
        { judul: 'Hand Hobby',       desc: 'Drawing, puzzles, or a light game',                            ikon: '✏️' },
        { judul: 'Plan Tomorrow',    desc: 'Write 3 things you want to do in the morning',                 ikon: '📅' },
      ],
    },
  ],
}

export const alcoholTipCategories = (locale: Locale): TipCategory[] => LOCALIZED[locale]

const TRIGGERS: Record<Locale, string[]> = {
  id: ['Stres', 'Setelah kerja', 'Sosial', 'Makan malam', 'Akhir pekan', 'Kesepian', 'Perayaan', 'Bosan', 'Emosi berat', 'Lainnya'],
  en: ['Stress', 'After work', 'Social', 'Dinner', 'Weekend', 'Loneliness', 'Celebration', 'Bored', 'Heavy emotion', 'Other'],
}

const COPINGS: Record<Locale, string[]> = {
  id: ['Tarik napas dalam', 'Minum air/teh', 'Jalan kaki', 'Hubungi teman', 'Alihkan perhatian', 'Mandi', 'Tunggu 15 menit', 'Tulis perasaan'],
  en: ['Deep breathing', 'Drink water/tea', 'Walk', 'Call a friend', 'Distract yourself', 'Shower', 'Wait 15 min', 'Write feelings'],
}

export const alcoholCravingTriggers = (locale: Locale): string[] => TRIGGERS[locale]
export const alcoholCravingCopings = (locale: Locale): string[] => COPINGS[locale]
