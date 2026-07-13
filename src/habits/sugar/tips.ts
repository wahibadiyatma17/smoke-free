import type { Locale } from '@/i18n/types'
import type { TipCategory } from '../types'

const LOCALIZED: Record<Locale, TipCategory[]> = {
  id: [
    {
      label: 'Pertolongan Pertama', ikon: '🚑',
      tips: [
        { judul: 'Minum Air Dulu',    desc: 'Sering kali tubuh hanya haus — bukan ngidam. Segelas air dulu', ikon: '💧' },
        { judul: 'Tunggu 15 Menit',   desc: 'Ngidam memuncak lalu turun sendiri. Atur timer dan tunggu',     ikon: '⏲️' },
        { judul: 'Jalan 10 Menit',    desc: 'Jalan kaki singkat memutus siklus ngidam dengan cepat',         ikon: '🚶' },
        { judul: 'Sikat Gigi',        desc: 'Rasa mint segar mematikan keinginan makan manis seketika',      ikon: '🪥' },
        { judul: 'Makan Buah',        desc: 'Manis alami + serat — puaskan ngidam tanpa lonjakan gula',      ikon: '🍎' },
        { judul: 'Napas Kotak',       desc: 'Hirup 4 detik · tahan 4 · hembuskan 4 · tahan 4. Ulangi 5x',    ikon: '⬜' },
      ],
    },
    {
      label: 'Strategi Makan', ikon: '🍳',
      tips: [
        { judul: 'Sarapan Protein',   desc: 'Telur, tempe, atau yogurt tawar — ngidam siang jauh berkurang', ikon: '🥚' },
        { judul: 'Protein Tiap Makan',desc: '25–35 gram protein per makan menjaga kenyang lebih lama',       ikon: '🍗' },
        { judul: 'Protein + Serat',   desc: 'Kombinasi ini memperlambat pencernaan, gula darah stabil',      ikon: '🥗' },
        { judul: 'Jangan Skip Makan', desc: 'Melewatkan makan memicu ngidam manis hebat di sore hari',       ikon: '🍽️' },
        { judul: 'Camilan Disiapkan', desc: 'Kacang, buah, atau telur rebus siap sedia — bukan biskuit',     ikon: '🥜' },
        { judul: 'Makan Perlahan',    desc: 'Otak butuh 20 menit untuk merasa kenyang — beri waktu',         ikon: '🐢' },
      ],
    },
    {
      label: 'Baca Label', ikon: '🏷️',
      tips: [
        { judul: 'Kenali 61+ Nama',   desc: 'Sirup jagung, maltosa, dekstrosa, sari tebu — semua gula',      ikon: '🕵️' },
        { judul: 'Cek Gram per Saji', desc: 'Bagi jatah harianmu: 25–50 gram. Satu produk bisa setengahnya', ikon: '🔢' },
        { judul: 'Waspada Saus',      desc: 'Saus tomat, BBQ, salad dressing — gula tersembunyi tinggi',     ikon: '🥫' },
        { judul: 'Yogurt "Buah"',     desc: 'Bisa 29 gram gula per cup — pilih plain + buah asli',           ikon: '🫐' },
        { judul: '"Low Fat" ≠ Sehat', desc: 'Produk rendah lemak sering menambah gula sebagai gantinya',     ikon: '⚠️' },
        { judul: 'Urutan Bahan',      desc: 'Kalau gula di 3 bahan pertama, kembalikan ke rak',              ikon: '📋' },
      ],
    },
    {
      label: 'Rutinitas Harian', ikon: '😴',
      tips: [
        { judul: 'Tidur 7–8 Jam',     desc: 'Kurang tidur menaikkan hormon lapar & ngidam manis',            ikon: '🌙' },
        { judul: 'Kelola Stres',      desc: 'Kortisol memicu ngidam — napas dalam atau jalan sore',          ikon: '🧘' },
        { judul: 'Air Putih Default', desc: 'Jadikan air minuman utamamu — bawa botol ke mana-mana',         ikon: '🚰' },
        { judul: 'Jalan Setelah Makan',desc: '10 menit jalan membantu meratakan gula darah',                 ikon: '🚶' },
        { judul: 'Rapikan Dapur',     desc: 'Singkirkan stok manisan dari rumah — jauh dari mata',           ikon: '🧹' },
        { judul: 'Jadwal Teratur',    desc: 'Makan di jam yang sama melatih tubuh tidak mencari gula',       ikon: '📅' },
      ],
    },
    {
      label: 'Situasi Sosial', ikon: '☕',
      tips: [
        { judul: 'Pesan Teh Tawar',   desc: 'Di warung: "teh tawar" atau "es teh tanpa gula" — normal kok',  ikon: '🍵' },
        { judul: '"Less Sugar" Trap', desc: 'Boba 25% sugar pun masih setara sekaleng soda — pilih 0%',      ikon: '🧋' },
        { judul: 'Air Sebelum Nongkrong', desc: 'Datang sudah terhidrasi — godaan menu manis berkurang',     ikon: '💧' },
        { judul: 'Kopi Tanpa Sirup',  desc: 'Americano atau kopi susu tanpa gula aren — lidah menyesuaikan', ikon: '☕' },
        { judul: 'Bilang Terus Terang', desc: '"Aku lagi puasa gula" — teman yang baik akan mendukung',      ikon: '💬' },
        { judul: 'Pilih Tempatnya',   desc: 'Ajak ketemu di tempat yang bukan toko dessert',                 ikon: '📍' },
      ],
    },
    {
      label: 'Pola Pikir', ikon: '🧠',
      tips: [
        { judul: 'Horizon 2–3 Minggu',desc: 'Ngidam rutin hilang dalam 2–3 minggu — ini sementara',          ikon: '📉' },
        { judul: 'Bukan Larangan',    desc: 'Bukan "tidak boleh", tapi "aku memilih manis alami"',           ikon: '🔄' },
        { judul: 'HALT Check',        desc: 'Haus? Lapar? Bosan? Lelah? Kenali akar ngidammu',               ikon: '🔍' },
        { judul: 'Satu Kali ≠ Gagal', desc: 'Kebablasan sekali bukan akhir — lanjutkan di gigitan berikutnya', ikon: '🌱' },
        { judul: 'Rayakan Kemenangan',desc: 'Setiap hari bebas gula layak diakui — lihat streakmu',          ikon: '🎉' },
        { judul: 'Ingat Alasanmu',    desc: 'Buka lagi motivasimu — energi, kulit, keluarga, tabungan',      ikon: '📖' },
      ],
    },
  ],
  en: [
    {
      label: 'Craving First Aid', ikon: '🚑',
      tips: [
        { judul: 'Water First',       desc: 'Often your body is just thirsty — not craving. One glass first', ikon: '💧' },
        { judul: 'Wait 15 Minutes',   desc: 'Cravings peak then fall on their own. Set a timer and wait',     ikon: '⏲️' },
        { judul: '10-Minute Walk',    desc: 'A short walk breaks the craving cycle quickly',                  ikon: '🚶' },
        { judul: 'Brush Your Teeth',  desc: 'Fresh mint kills the urge for sweets instantly',                 ikon: '🪥' },
        { judul: 'Eat Fruit',         desc: 'Natural sweetness + fiber — satisfies without the spike',        ikon: '🍎' },
        { judul: 'Box Breathing',     desc: 'Inhale 4 · hold 4 · exhale 4 · hold 4. Repeat 5 times',          ikon: '⬜' },
      ],
    },
    {
      label: 'Food Strategy', ikon: '🍳',
      tips: [
        { judul: 'Protein Breakfast', desc: 'Eggs, tempeh, or plain yogurt — far fewer midday cravings',      ikon: '🥚' },
        { judul: 'Protein Every Meal',desc: '25–35 grams per meal keeps you full longer',                     ikon: '🍗' },
        { judul: 'Protein + Fiber',   desc: 'This combo slows digestion and steadies blood sugar',            ikon: '🥗' },
        { judul: 'Don\'t Skip Meals',  desc: 'Skipping meals triggers fierce sweet cravings later',           ikon: '🍽️' },
        { judul: 'Prep Your Snacks',  desc: 'Nuts, fruit, or boiled eggs at hand — not biscuits',             ikon: '🥜' },
        { judul: 'Eat Slowly',        desc: 'The brain needs 20 minutes to feel full — give it time',         ikon: '🐢' },
      ],
    },
    {
      label: 'Read the Label', ikon: '🏷️',
      tips: [
        { judul: 'Know the 61+ Names',desc: 'Corn syrup, maltose, dextrose, cane juice — all sugar',          ikon: '🕵️' },
        { judul: 'Check Grams/Serving',desc: 'Your daily budget: 25–50 grams. One product can be half',       ikon: '🔢' },
        { judul: 'Watch the Sauces',  desc: 'Ketchup, BBQ, salad dressing — high hidden sugar',               ikon: '🥫' },
        { judul: '"Fruit" Yogurt',    desc: 'Can hold 29 grams per cup — go plain + real fruit',              ikon: '🫐' },
        { judul: '"Low Fat" ≠ Healthy', desc: 'Low-fat products often add sugar to compensate',               ikon: '⚠️' },
        { judul: 'Ingredient Order',  desc: 'If sugar is in the first 3 ingredients, put it back',            ikon: '📋' },
      ],
    },
    {
      label: 'Daily Routine', ikon: '😴',
      tips: [
        { judul: 'Sleep 7–8 Hours',   desc: 'Sleep loss raises hunger hormones & sweet cravings',             ikon: '🌙' },
        { judul: 'Manage Stress',     desc: 'Cortisol drives cravings — deep breaths or an evening walk',     ikon: '🧘' },
        { judul: 'Water by Default',  desc: 'Make water your main drink — carry a bottle everywhere',         ikon: '🚰' },
        { judul: 'Walk After Meals',  desc: '10 minutes of walking helps flatten blood sugar',                ikon: '🚶' },
        { judul: 'Clear the Kitchen', desc: 'Remove the sweet stash from home — out of sight',                ikon: '🧹' },
        { judul: 'Regular Schedule',  desc: 'Eating at set times trains your body off sugar-seeking',         ikon: '📅' },
      ],
    },
    {
      label: 'Social Situations', ikon: '☕',
      tips: [
        { judul: 'Order Unsweetened', desc: 'At the warung: plain tea or unsweetened iced tea — it\'s fine',  ikon: '🍵' },
        { judul: '"Less Sugar" Trap', desc: 'Even 25% sugar boba equals a can of soda — pick 0%',             ikon: '🧋' },
        { judul: 'Hydrate Before Hangouts', desc: 'Arrive hydrated — sweet menu temptation drops',            ikon: '💧' },
        { judul: 'Coffee Minus Syrup',desc: 'Americano or milk coffee without palm sugar — taste adapts',     ikon: '☕' },
        { judul: 'Say It Plainly',    desc: '"I\'m off sugar right now" — good friends will support you',     ikon: '💬' },
        { judul: 'Pick the Venue',    desc: 'Suggest meeting somewhere that isn\'t a dessert shop',           ikon: '📍' },
      ],
    },
    {
      label: 'Mindset', ikon: '🧠',
      tips: [
        { judul: '2–3 Week Horizon',  desc: 'Routine cravings fade within 2–3 weeks — this is temporary',     ikon: '📉' },
        { judul: 'Not a Ban',         desc: 'Not "I can\'t," but "I choose natural sweetness"',               ikon: '🔄' },
        { judul: 'HALT Check',        desc: 'Thirsty? Hungry? Bored? Tired? Find the craving\'s root',        ikon: '🔍' },
        { judul: 'One Slip ≠ Failure',desc: 'One lapse isn\'t the end — continue at the very next bite',      ikon: '🌱' },
        { judul: 'Celebrate Wins',    desc: 'Every sugar-free day deserves credit — check your streak',       ikon: '🎉' },
        { judul: 'Recall Your Why',   desc: 'Revisit your motivation — energy, skin, family, savings',        ikon: '📖' },
      ],
    },
  ],
}

export const sugarTipCategories = (locale: Locale): TipCategory[] => LOCALIZED[locale]

const TRIGGERS: Record<Locale, string[]> = {
  id: ['Stres', 'Setelah makan', 'Sore hari', 'Bosan', 'Sedih / cemas', 'Kurang tidur', 'Haus / lapar', 'Nongkrong', 'Lihat promo', 'Lainnya'],
  en: ['Stress', 'After meals', 'Afternoon slump', 'Bored', 'Sad / anxious', 'Sleep-deprived', 'Thirsty / hungry', 'Hanging out', 'Saw a promo', 'Other'],
}

const COPINGS: Record<Locale, string[]> = {
  id: ['Minum air putih', 'Makan buah', 'Jalan kaki', 'Sikat gigi', 'Tarik napas dalam', 'Alihkan perhatian', 'Tunggu 15 menit', 'Hubungi teman'],
  en: ['Drink water', 'Eat fruit', 'Walk', 'Brush teeth', 'Deep breathing', 'Distract yourself', 'Wait 15 min', 'Call a friend'],
}

export const sugarCravingTriggers = (locale: Locale): string[] => TRIGGERS[locale]
export const sugarCravingCopings = (locale: Locale): string[] => COPINGS[locale]

// Evidence-informed reassurance lines shown during an SOS craving moment.
const SCIENCE: Record<Locale, string[]> = {
  id: [
    'Ngidam itu terbatas waktu — biasanya memuncak lalu reda dalam 15–30 menit.',
    'Setiap kali kamu melewati dorongan tanpa menurutinya, ia jadi lebih lemah.',
    'Puzzle visual 3 menit terbukti menurunkan ngidam — otak "penginginan" jadi sibuk.',
    'Dopamin melonjak saat kamu membayangkan manisnya, bukan saat memakannya.',
    'Segelas air dulu: dehidrasi sering tersamar sebagai ngidam gula.',
    'Jalan singkat menggandakan efek — mengalihkan pikiran sekaligus membakar gula darah.',
    'Camilan manis memicu "crash" 2–4 jam kemudian, dan crash itulah pemicu ngidam berikutnya.',
    '"Urge surfing" — mengamati dorongan tanpa melawan — terbukti memangkas keinginan.',
    'Permen karet bebas gula menurunkan rasa lapar dan keinginan camilan manis.',
    'Ngidam adalah pola pemicu→respons. Kenali pemicumu, dan kamu bisa mendahuluinya.',
  ],
  en: [
    'Cravings are time-limited — they usually peak and fade within 15–30 minutes.',
    'Every time you ride out an urge without acting, it gets weaker.',
    'A 3-minute visual puzzle is shown to cut cravings — it keeps the "wanting" brain busy.',
    'Dopamine spikes when you anticipate the sweetness, not when you eat it.',
    'Water first: dehydration is often misread as a sugar craving.',
    'A short walk does double duty — it distracts and clears blood sugar.',
    'A sweet snack triggers a crash 2–4 hours later, and that crash fuels the next craving.',
    '"Urge surfing" — watching the urge without fighting it — is proven to reduce it.',
    'Sugar-free gum lowers hunger and the urge for a sweet snack.',
    'A craving is a trigger→response loop. Name your trigger and you can pre-empt it.',
  ],
}

export const sugarCravingScience = (locale: Locale): string[] => SCIENCE[locale]
