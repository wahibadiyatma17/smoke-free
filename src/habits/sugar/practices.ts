import type { Locale } from '@/i18n/types'
import type { DailyPractice } from '../common/practices'

/**
 * Sugar — one rotating micro-action per day. Small, evidence-linked steps
 * (protein breakfast, post-meal walk, label reading, hydration) that make
 * cutting sugar a series of tiny wins rather than one big sacrifice.
 */
const LOCALIZED: Record<Locale, DailyPractice[]> = {
  id: [
    { emoji: '🥚', cue: 'Makan 25–30g protein dalam 1 jam setelah bangun.',        context: 'Sarapan protein meredam ngidam sepanjang hari.' },
    { emoji: '🚶', cue: 'Jalan 10–15 menit sesaat setelah makan terbesarmu.',      context: 'Bisa memangkas lonjakan gula darah hingga separuh.' },
    { emoji: '💧', cue: 'Tukar satu minuman manis hari ini dengan air atau teh tawar.', context: 'Satu langkah menghapus 15–50g gula sekaligus.' },
    { emoji: '🥤', cue: 'Begitu ngidam datang, minum segelas air penuh dulu.',      context: 'Haus sering tersamar sebagai ngidam manis.' },
    { emoji: '🏷️', cue: 'Baca satu label makanan hari ini, cari nama gula tersembunyi.', context: 'Dekstrosa, maltosa, sirup jagung — semua gula.' },
    { emoji: '🍎', cue: 'Siapkan camilan buah untuk ngidam besok malam ini.',       context: 'Yang paling mudah diraih menentukan pilihanmu.' },
    { emoji: '🍳', cue: 'Jangan makan karbo "telanjang" — tambahkan protein & serat.', context: 'Meredam siklus lonjak-lalu-anjlok gula darah.' },
    { emoji: '🚰', cue: 'Targetkan 1,5–2 liter air hari ini, jangan minum kalori.',  context: 'Hidrasi cukup menekan sinyal ngidam palsu.' },
    { emoji: '🧋', cue: 'Pesan minuman kekinian "tanpa gula" atau "less sugar".',   context: 'Satu perubahan default, berlaku tiap pembelian.' },
    { emoji: '🍬', cue: 'Sedia permen karet bebas gula untuk slump sore.',          context: 'Mengunyah menurunkan keinginan camilan manis.' },
    { emoji: '⏲️', cue: 'Ngidam datang? Pasang timer 10 menit sebelum memutuskan.',  context: 'Sebagian besar dorongan memuncak lalu reda.' },
    { emoji: '🧩', cue: 'Main puzzle visual 3 menit saat ngidam menyerang.',        context: 'Mengisi "bagian penginginan" di otakmu.' },
    { emoji: '😴', cue: 'Jaga tidur 7–9 jam malam ini.',                            context: 'Kurang tidur memperbesar ngidam esok hari.' },
    { emoji: '🍓', cue: 'Saat ingin manis, ambil buah utuh dulu.',                  context: 'Serat memperlambat gula & menambah kenyang.' },
    { emoji: '🧹', cue: 'Bersihkan satu "zona pemicu" dari manisan hari ini.',      context: 'Laci meja, pintu kulkas, tas — jauh dari mata.' },
    { emoji: '🥄', cue: 'Ukur saus pakai sendok, jangan dituang langsung.',         context: 'Kecap manis 10–14g gula per sendok makan.' },
    { emoji: '🍗', cue: 'Makan camilan berprotein sebelum ke warung/acara.',        context: 'Datang tak lapar = tak mudah tergoda.' },
    { emoji: '📊', cue: 'Hitung gula hari ini vs batas Kemenkes (50g / 4 sdm).',    context: 'Sadar angka membuat pilihan lebih mudah.' },
    { emoji: '🚶', cue: 'Setelah makan siang: jalan 10 menit + segelas air.',       context: 'Kontrol gula darah + pertahanan ngidam sekaligus.' },
    { emoji: '🍵', cue: 'Pertahankan ritual "penutup", ganti isinya.',             context: 'Tukar manis jadi teh tawar atau buah — loop tetap tertutup.' },
  ],
  en: [
    { emoji: '🥚', cue: 'Eat 25–30g of protein within 1 hour of waking.',           context: 'A protein breakfast dulls cravings all day.' },
    { emoji: '🚶', cue: 'Walk 10–15 min right after your biggest meal.',            context: 'Can cut the glucose spike by up to half.' },
    { emoji: '💧', cue: 'Swap one sweet drink today for water or plain tea.',       context: 'One move erases 15–50g of sugar.' },
    { emoji: '🥤', cue: 'The moment a craving hits, drink a full glass of water.',  context: 'Thirst is often misread as a sugar craving.' },
    { emoji: '🏷️', cue: 'Read one food label today and spot a hidden sugar name.', context: 'Dextrose, maltose, corn syrup — all sugar.' },
    { emoji: '🍎', cue: 'Prep tomorrow\'s craving snack (fruit) tonight.',           context: 'The easiest grab decides your choice.' },
    { emoji: '🍳', cue: 'Never eat a carb "naked" — add protein & fiber.',          context: 'Blunts the sugar spike-then-crash cycle.' },
    { emoji: '🚰', cue: 'Aim for 1.5–2 L of water today; don\'t drink calories.',    context: 'Good hydration quiets false craving signals.' },
    { emoji: '🧋', cue: 'Order trendy drinks "no sugar" or "less sugar."',          context: 'One default change, applied every purchase.' },
    { emoji: '🍬', cue: 'Keep sugar-free gum for the afternoon slump.',             context: 'Chewing lowers the urge for a sweet snack.' },
    { emoji: '⏲️', cue: 'Craving? Set a 10-minute timer before deciding.',          context: 'Most urges peak and then fade.' },
    { emoji: '🧩', cue: 'Do a 3-minute visual puzzle when a craving strikes.',      context: 'Occupies the "wanting" part of your brain.' },
    { emoji: '😴', cue: 'Protect 7–9 hours of sleep tonight.',                      context: 'Short sleep amplifies next-day cravings.' },
    { emoji: '🍓', cue: 'When you want sweet, reach for whole fruit first.',        context: 'Fiber slows the sugar and adds fullness.' },
    { emoji: '🧹', cue: 'Clear one "trigger zone" of sweets today.',               context: 'Desk drawer, fridge door, bag — out of sight.' },
    { emoji: '🥄', cue: 'Measure sauces with a spoon, don\'t pour.',                 context: 'Sweet soy sauce is 10–14g sugar per tbsp.' },
    { emoji: '🍗', cue: 'Eat a protein snack before a food run or gathering.',      context: 'Arrive un-hungry = un-tempted.' },
    { emoji: '📊', cue: 'Tally today\'s sugar vs the limit (50g / 4 tbsp).',         context: 'Knowing the number makes choices easier.' },
    { emoji: '🚶', cue: 'After lunch: a 10-min walk + a glass of water.',           context: 'Glucose control + craving defense in one.' },
    { emoji: '🍵', cue: 'Keep the dessert ritual, change what\'s in it.',            context: 'Swap sweet for plain tea or fruit — loop still closes.' },
  ],
}

export const getSugarPractices = (locale: Locale): DailyPractice[] => LOCALIZED[locale]
