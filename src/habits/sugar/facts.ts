import type { Locale } from '@/i18n/types'
import type { CategoryMeta, Fact } from '../types'

export const sugarSourceUrls: Record<string, string> = {
  'WHO':             'https://www.who.int/news/item/04-03-2015-who-calls-on-countries-to-reduce-sugars-intake-among-adults-and-children',
  'AHA':             'https://www.heart.org/en/healthy-living/healthy-eating/eat-smart/sugar/how-much-sugar-is-too-much',
  'Kemenkes RI':     'https://ayosehat.kemkes.go.id/cara-mengurangi-asupan-gula-setiap-hari',
  'Harvard':         'https://hsph.harvard.edu/news/sugary-drinks-increase-risk-of-cardiovascular-disease-regardless-of-how-much-you-exercise/',
  'Johns Hopkins':   'https://www.hopkinsmedicine.org/health/wellness-and-prevention/finding-the-hidden-sugar-in-the-foods-you-eat',
  'UCSF':            'https://www.ucsf.edu/news/2017/08/408151/switching-sugar-starch-leads-less-fatty-liver-kids',
  'CDC':             'https://www.cdc.gov/diabetes/healthy-eating/spotting-hidden-sugars-in-everyday-foods.html',
  'Healthline':      'https://www.healthline.com/nutrition/how-sugar-destroys-teeth',
  'TED-Ed':          'https://ed.ted.com/lessons/how-sugar-affects-the-brain-nicole-avena',
  'Scientific Reports': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5532289/',
  'Riset SSB':       'https://www.sciencedirect.com/science/article/abs/pii/S2405457723011981',
  'SKI 2023':        'https://www.isotekindo.co.id/article/details/479',
  'Kajian UI':       'https://scholarhub.ui.ac.id/kesmas/vol17/iss1/1/',
  'General Estimate': 'https://www.who.int/news/item/04-03-2015-who-calls-on-countries-to-reduce-sugars-intake-among-adults-and-children',
  // New sources (round 2)
  'Frontiers Nutrition': 'https://www.frontiersin.org/journals/nutrition/articles/10.3389/fnut.2024.1491999/full',
  'PubMed':          'https://pubmed.ncbi.nlm.nih.gov/35185434/',
  'Frontiers Immunology': 'https://www.frontiersin.org/journals/immunology/articles/10.3389/fimmu.2022.988481/full',
  'J Hepatology':    'https://www.sciencedirect.com/science/article/pii/S0168827821001616',
  'J Endocrinology': 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10083579/',
  'Cell':            'https://www.cell.com/cell/fulltext/S0092-8674(22)00919-9',
  'Oxford':          'https://www.ox.ac.uk/research/research-impact/making-case-sugar-taxes-uk-ireland-and-mexico',
  'WCRF':            'https://www.wcrf.org/about-us/news-and-blogs/looking-back-at-5-years-of-the-uk-soft-drinks-industry-levy/',
  'Kompas':          'https://money.kompas.com/read/2025/08/23/111046826/cukai-minuman-berpemanis-berlaku-mulai-2026-tarif-masih-digodok',
  'MyNetDiary':      'https://www.mynetdiary.com/food/calories-in-kecap-manis-sweet-soy-sauce-by-bango-tablespoon-13711340-0.html',
  'Nilai Gizi':      'https://nilaigizi.com/gizi/detailproduk/2215/nilai-kandungan-gizi-martabak-manis',
  'Indonesia Baik':  'https://indonesiabaik.id/infografis/kandungan-dalam-es-kopi-susu-kekinian',
  'PMC':             'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10180990/',
  'Frontiers Endocrinology': 'https://www.frontiersin.org/journals/endocrinology/articles/10.3389/fendo.2025.1693123/full',
  'BMC Public Health': 'https://link.springer.com/article/10.1186/s12889-024-20210-8',
  'Harvard Nutrition': 'https://nutritionsource.hsph.harvard.edu/2016/08/23/aha-added-sugar-limits-children/',
  'Studi Kebugaran':  'https://www.ijcrt.org/papers/IJCRT2412580.pdf',
  'WHO IARC':         'https://www.who.int/news/item/14-07-2023-aspartame-hazard-and-risk-assessment-results-released',
  'Studi GI':         'https://pmc.ncbi.nlm.nih.gov/articles/PMC5817209/',
  'Studi Intervensi': 'https://pubmed.ncbi.nlm.nih.gov/28003201/',
}

type CategoryBase = Omit<CategoryMeta, 'label' | 'description'>
type CategoryText = { label: string; description: string }

const CATEGORY_BASE: Record<string, CategoryBase> = {
  limits:    { emoji: '🥄', color: 'var(--amber-strong)', bg: 'var(--amber-pale)',    border: 'var(--amber-tint)'    },
  hidden:    { emoji: '🕵️', color: '#6A1B9A',             bg: '#F3E5FF',              border: '#DEB3FF'              },
  drinks:    { emoji: '🧋', color: 'var(--coral-mid)',    bg: 'var(--coral-pale)',    border: 'var(--coral-tint)'    },
  disease:   { emoji: '🫀', color: '#C0392B',             bg: '#FFF0F0',              border: '#FFCDD2'              },
  brain:     { emoji: '🧠', color: '#6A1B9A',             bg: '#F3E5FF',              border: '#DEB3FF'              },
  body:      { emoji: '✨', color: 'var(--lavender)',     bg: 'var(--lavender-pale)', border: 'var(--lavender-tint)' },
  indonesia: { emoji: '🇮🇩', color: 'var(--coral-mid)',    bg: 'var(--coral-pale)',    border: 'var(--coral-tint)'    },
  recovery:  { emoji: '🌱', color: 'var(--green-dark)',   bg: 'var(--green-pale)',    border: 'var(--green-tint)'    },
  sleep:     { emoji: '😴', color: 'var(--lavender)',     bg: 'var(--lavender-pale)', border: 'var(--lavender-tint)' },
  immune:    { emoji: '🛡️', color: 'var(--green-dark)',   bg: 'var(--green-pale)',    border: 'var(--green-tint)'    },
  fitness:   { emoji: '🏃', color: 'var(--coral-mid)',    bg: 'var(--coral-pale)',    border: 'var(--coral-tint)'    },
  family:    { emoji: '👨‍👩‍👧', color: 'var(--amber-strong)', bg: 'var(--amber-pale)',    border: 'var(--amber-tint)'    },
}

const CATEGORY_TEXT: Record<Locale, Record<string, CategoryText>> = {
  id: {
    limits:    { label: 'Batas Aman',        description: 'WHO merekomendasikan gula tambahan maksimal 50 gram (12 sendok teh) per hari — idealnya di bawah 25 gram (6 sendok teh). Kemenkes RI memakai rumus mudah "G4 G1 L5": maksimal Gula 4 sendok makan per hari. Masalahnya: satu gelas boba saja bisa melebihi seluruh jatah harian itu.' },
    hidden:    { label: 'Gula Tersembunyi',  description: 'Sekitar 74% makanan kemasan di supermarket mengandung gula tambahan, bersembunyi di balik 61+ nama berbeda — sirup jagung, maltosa, dekstrosa, "sari tebu". Saus tomat, roti tawar, hingga yogurt rasa buah semuanya menyumbang diam-diam. Membaca label adalah senjata utamamu.' },
    drinks:    { label: 'Minuman Manis',     description: 'Minuman adalah sumber gula terbesar dan paling mudah dihindari. Satu kaleng soda ≈ 35–39 gram gula; boba full sugar bisa 50 gram lebih; bahkan es teh manis warung mengandung 15–25 gram. Gula cair diserap lebih cepat — lonjakannya lebih tajam daripada makanan padat.' },
    disease:   { label: 'Risiko Penyakit',   description: 'Konsumsi minuman berpemanis tertinggi dikaitkan dengan risiko diabetes tipe 2 +29%, obesitas +18%, dan hipertensi +12%. Satu minuman manis per hari menaikkan risiko penyakit kardiovaskular 18% — berapa pun olahragamu. Gula juga makanan utama bakteri perusak gigi.' },
    brain:     { label: 'Otak & Mood',       description: 'Gula memicu pelepasan dopamin di jalur reward otak — jalur yang sama dengan zat adiktif. Itulah kenapa ngidam terasa begitu kuat. Studi 22 tahun (Whitehall II) menemukan asupan gula tinggi menaikkan peluang gangguan mental umum 23% dalam 5 tahun.' },
    body:      { label: 'Kulit & Tubuh',     description: 'Kelebihan glukosa menempel pada protein tubuh membentuk AGEs (Advanced Glycation End-products) yang merusak kolagen dan elastin — mempercepat kerutan dan kulit kusam. Gula berlebih juga menumpuk sebagai lemak hati dan mengacaukan energi harianmu.' },
    indonesia: { label: 'Fakta Indonesia',   description: 'Prevalensi diabetes di Indonesia mencapai 11,7% (SKI 2023) — naik dua kali lipat dari 5,7% pada 2007. Indonesia peringkat ke-7 dunia dengan ~10,7 juta penderita. Budaya es teh manis, boba, dan jajanan manis membuat 6 dari 10 orang dewasa mengonsumsi minuman berpemanis rutin.' },
    recovery:  { label: 'Pemulihan Tubuh',   description: 'Tubuh pulih cepat begitu gula tambahan berhenti. 24–48 jam pertama terasa berat (sakit kepala, ngidam) — itu tanda penyesuaian. Hari 3–5 puncaknya, lalu mereda. 2 minggu: indera perasa beregenerasi. 1 bulan: sensitivitas insulin membaik dan lemak hati berkurang.' },
    sleep:     { label: 'Tidur',             description: 'Gula dan kualitas tidur saling memengaruhi. Asupan gula tinggi dikaitkan dengan tidur yang lebih buruk, dan kurang tidur justru menaikkan ngidam manis keesokan harinya — sebuah lingkaran yang bisa diputus dengan mengurangi gula, terutama di sore & malam hari.' },
    immune:    { label: 'Kekebalan Tubuh',   description: 'Lonjakan gula darah sementara menekan kemampuan sel darah putih melawan bakteri. Konsumsi gula berlebih yang terus-menerus membuat sistem imun bekerja kurang optimal dan memicu peradangan ringan yang menetap di tubuh.' },
    fitness:   { label: 'Kebugaran',         description: 'Untuk olahraga, gula bukan musuh mutlak — saat latihan endurance panjang, karbohidrat cepat bisa membantu. Tapi asupan gula rafinasi yang kronis menurunkan daya tahan, kelincahan, dan massa otot, serta menaikkan penanda peradangan pada atlet.' },
    family:    { label: 'Anak & Keluarga',   description: 'Kebiasaan manis terbentuk sejak dini. Anak di bawah 2 tahun idealnya tanpa gula tambahan sama sekali, dan setiap tambahan minuman manis harian menaikkan risiko obesitas anak. Mengurangi gula di rumah melindungi seluruh keluarga sekaligus.' },
  },
  en: {
    limits:    { label: 'Safe Limits',       description: 'WHO recommends at most 50 grams (12 teaspoons) of added sugar per day — ideally under 25 grams (6 teaspoons). Indonesia\'s Health Ministry uses the easy "G4 G1 L5" rule: max 4 tablespoons of sugar daily. The problem: a single boba can exceed that entire daily budget.' },
    hidden:    { label: 'Hidden Sugar',      description: 'About 74% of packaged supermarket foods contain added sugar, hiding behind 61+ different names — corn syrup, maltose, dextrose, "cane juice." Ketchup, white bread, and fruit yogurt all contribute silently. Reading labels is your main weapon.' },
    drinks:    { label: 'Sweet Drinks',      description: 'Drinks are the biggest and most avoidable sugar source. One can of soda ≈ 35–39 grams of sugar; full-sugar boba can top 50 grams; even a glass of sweet iced tea carries 15–25 grams. Liquid sugar absorbs faster — its spike is sharper than solid food.' },
    disease:   { label: 'Disease Risk',      description: 'The highest sugary-drink intake is linked to +29% type 2 diabetes, +18% obesity, and +12% hypertension risk. One sweet drink a day raises cardiovascular disease risk 18% — no matter how much you exercise. Sugar is also the main food for cavity-causing bacteria.' },
    brain:     { label: 'Brain & Mood',      description: 'Sugar triggers dopamine release in the brain\'s reward pathway — the same circuit as addictive substances. That\'s why cravings feel so strong. A 22-year study (Whitehall II) found high sugar intake raised the odds of common mental disorders by 23% within 5 years.' },
    body:      { label: 'Skin & Body',       description: 'Excess glucose binds to your body\'s proteins forming AGEs (Advanced Glycation End-products) that damage collagen and elastin — accelerating wrinkles and dull skin. Extra sugar also builds up as liver fat and wrecks your daily energy.' },
    indonesia: { label: 'Indonesia Facts',   description: 'Diabetes prevalence in Indonesia reached 11.7% (SKI 2023) — doubling from 5.7% in 2007. Indonesia ranks 7th worldwide with ~10.7 million people affected. Sweet tea, boba, and sugary snack culture mean 6 in 10 adults consume sweetened drinks routinely.' },
    recovery:  { label: 'Body Recovery',     description: 'The body recovers fast once added sugar stops. The first 24–48 hours feel rough (headaches, cravings) — that\'s adjustment. Days 3–5 are the peak, then it eases. 2 weeks: taste buds regenerate. 1 month: insulin sensitivity improves and liver fat drops.' },
    sleep:     { label: 'Sleep',             description: 'Sugar and sleep quality feed into each other. High sugar intake is linked to worse sleep, and poor sleep raises next-day sugar cravings — a loop you can break by cutting sugar, especially in the afternoon and evening.' },
    immune:    { label: 'Immune System',     description: 'A blood-sugar spike temporarily suppresses white blood cells\' ability to fight bacteria. Chronically high sugar leaves the immune system working below par and drives a low-grade inflammation that lingers in the body.' },
    fitness:   { label: 'Fitness',           description: 'For exercise, sugar isn\'t an absolute enemy — during long endurance efforts, fast carbs can help. But chronic refined-sugar intake lowers endurance, agility, and lean muscle, and raises inflammation markers in athletes.' },
    family:    { label: 'Kids & Family',     description: 'Sweet habits form early. Children under 2 should ideally have zero added sugar, and each extra daily sugary drink raises childhood obesity risk. Cutting sugar at home protects the whole family at once.' },
  },
}

const CATEGORIES = Object.keys(CATEGORY_BASE)

export function getSugarCategoryMeta(locale: Locale): Record<string, CategoryMeta> {
  const out: Record<string, CategoryMeta> = {}
  const text = CATEGORY_TEXT[locale] ?? CATEGORY_TEXT.id
  for (const key of CATEGORIES) out[key] = { ...CATEGORY_BASE[key], ...text[key] }
  return out
}

type FactBase = { source: string; category: string }

const FACT_BASE: FactBase[] = [
  // limits
  { source: 'WHO',             category: 'limits' },
  { source: 'WHO',             category: 'limits' },
  { source: 'AHA',             category: 'limits' },
  { source: 'Kemenkes RI',     category: 'limits' },
  { source: 'AHA',             category: 'limits' },
  // hidden
  { source: 'Johns Hopkins',   category: 'hidden' },
  { source: 'Johns Hopkins',   category: 'hidden' },
  { source: 'CDC',             category: 'hidden' },
  { source: 'CDC',             category: 'hidden' },
  // drinks
  { source: 'General Estimate', category: 'drinks' },
  { source: 'General Estimate', category: 'drinks' },
  { source: 'General Estimate', category: 'drinks' },
  { source: 'Harvard',          category: 'drinks' },
  // disease
  { source: 'Riset SSB',       category: 'disease' },
  { source: 'Harvard',         category: 'disease' },
  { source: 'Harvard',         category: 'disease' },
  { source: 'Healthline',      category: 'disease' },
  { source: 'Riset SSB',       category: 'disease' },
  // brain
  { source: 'TED-Ed',          category: 'brain' },
  { source: 'Scientific Reports', category: 'brain' },
  { source: 'TED-Ed',          category: 'brain' },
  { source: 'TED-Ed',          category: 'brain' },
  // body
  { source: 'Healthline',      category: 'body' },
  { source: 'UCSF',            category: 'body' },
  { source: 'Healthline',      category: 'body' },
  // indonesia
  { source: 'SKI 2023',        category: 'indonesia' },
  { source: 'SKI 2023',        category: 'indonesia' },
  { source: 'Kajian UI',       category: 'indonesia' },
  // recovery
  { source: 'General Estimate', category: 'recovery' },
  { source: 'General Estimate', category: 'recovery' },
  { source: 'UCSF',             category: 'recovery' },
  { source: 'General Estimate', category: 'recovery' },
  // sleep
  { source: 'PubMed',              category: 'sleep' },
  { source: 'Frontiers Nutrition', category: 'sleep' },
  // immune
  { source: 'Frontiers Immunology', category: 'immune' },
  { source: 'Frontiers Immunology', category: 'immune' },
  // fitness
  { source: 'Studi Kebugaran',      category: 'fitness' },
  // family
  { source: 'Harvard Nutrition',    category: 'family' },
  { source: 'WHO',                  category: 'family' },
  { source: 'BMC Public Health',    category: 'family' },
  // body (fructose + gut + lean NAFLD)
  { source: 'J Endocrinology',      category: 'body' },
  { source: 'J Hepatology',         category: 'body' },
  { source: 'Frontiers Endocrinology', category: 'body' },
  { source: 'PMC',                  category: 'body' },
  // brain (sweeteners)
  { source: 'WHO IARC',             category: 'brain' },
  { source: 'Cell',                 category: 'brain' },
  // limits (natural sugars)
  { source: 'Studi GI',             category: 'limits' },
  // hidden (savory)
  { source: 'MyNetDiary',           category: 'hidden' },
  // indonesia
  { source: 'Nilai Gizi',           category: 'indonesia' },
  { source: 'Indonesia Baik',       category: 'indonesia' },
  { source: 'Kompas',               category: 'indonesia' },
  // disease (intervention benefit)
  { source: 'Studi Intervensi',     category: 'disease' },
]

const FACT_TEXT: Record<Locale, string[]> = {
  id: [
    // limits
    'WHO merekomendasikan gula tambahan di bawah 10% asupan energi — sekitar 50 gram (12 sendok teh) per hari.',
    'Untuk manfaat kesehatan ekstra, WHO menyarankan gula di bawah 5% energi — hanya 25 gram (6 sendok teh) per hari.',
    'American Heart Association: maksimal 25 gram gula tambahan per hari untuk wanita, 36 gram untuk pria.',
    'Kemenkes RI punya rumus mudah "G4 G1 L5": maksimal Gula 4 sendok makan (50 gram) per hari.',
    'Rata-rata orang mengonsumsi 2–3 kali lipat batas gula harian yang direkomendasikan — tanpa menyadarinya.',
    // hidden
    'Sekitar 74% makanan kemasan di supermarket mengandung gula tambahan.',
    'Gula bersembunyi di balik 61+ nama di label: sirup jagung, maltosa, dekstrosa, "sari tebu", dan lainnya.',
    'Satu sendok makan saus tomat mengandung sekitar 1 sendok teh gula.',
    'Yogurt rasa buah bisa mengandung hingga 29 gram gula per porsi — lebih dari sekaleng soda.',
    // drinks
    'Satu kaleng soda 330 ml mengandung sekitar 35 gram gula — hampir 9 sendok teh.',
    'Boba milk tea full sugar mengandung 38–50 gram gula; dengan topping bisa lebih dari 100 gram.',
    'Segelas es teh manis mengandung 15–25 gram gula — pilihan "50% sugar" pun masih setara sekaleng soda.',
    'Gula cair diserap lebih cepat daripada makanan padat — lonjakan gula darahnya lebih tajam.',
    // disease
    'Konsumsi minuman berpemanis tertinggi terkait risiko diabetes tipe 2 naik 29%.',
    'Satu minuman manis per hari menaikkan risiko penyakit kardiovaskular 18% — berapa pun olahragamu.',
    'Setiap 5% kalori dari gula bebas menaikkan risiko penyakit jantung 6% dan stroke 10%.',
    'Bakteri mulut mengubah gula menjadi asam yang mengikis email gigi — penyebab utama gigi berlubang.',
    'Minuman berpemanis juga terkait obesitas (+18%) dan hipertensi (+12%).',
    // brain
    'Gula memicu pelepasan dopamin di jalur reward otak — jalur yang sama dengan zat adiktif.',
    'Studi 22 tahun: asupan gula tinggi menaikkan peluang gangguan mental umum 23% dalam 5 tahun.',
    'Pada penelitian hewan, isyarat gula memicu respons otak yang mirip dengan isyarat zat adiktif.',
    'Semakin sering gula dikonsumsi, semakin tumpul respons dopamin — kamu butuh lebih banyak untuk rasa yang sama.',
    // body
    'Kelebihan glukosa membentuk AGEs yang merusak kolagen — mempercepat kerutan dan kulit kusam.',
    'Mengurangi gula menurunkan lemak hati lebih dari 20% hanya dalam 9 hari (penelitian UCSF).',
    'Gula menyebabkan energi melonjak lalu anjlok ("sugar crash") — sumber rasa lelah sore hari.',
    // indonesia
    'Prevalensi diabetes di Indonesia mencapai 11,7% (SKI 2023) — naik dua kali lipat dari 5,7% pada 2007.',
    'Indonesia peringkat ke-7 dunia untuk jumlah penderita diabetes — sekitar 10,7 juta orang.',
    'Lebih dari 60% orang dewasa Indonesia rutin mengonsumsi minuman berpemanis.',
    // recovery
    'Ngidam gula memuncak di hari ke-3 sampai ke-5 setelah berhenti — setelah itu semakin ringan.',
    'Dalam 2 minggu, indera perasamu beregenerasi — buah mulai terasa lebih manis.',
    'Dalam 1 bulan tanpa gula tambahan: sensitivitas insulin membaik dan lemak hati berkurang.',
    'Setelah sekitar 6 minggu, ngidam manis rutin biasanya hilang sepenuhnya.',
    // sleep
    'Studi menemukan pola makan tinggi gula (~30% energi) berkaitan dengan kualitas tidur yang jauh lebih buruk.',
    'Minuman manis memperpanjang waktu yang dibutuhkan untuk tertidur dan memperbanyak gangguan tidur malam.',
    // immune
    'Satu asupan 100g gula bisa menurunkan kemampuan sel darah putih melawan bakteri hingga ~50% selama 1–5 jam.',
    'Gula darah tinggi melemahkan sel imun (neutrofil) dalam menjangkau, menjebak, dan membunuh kuman.',
    // fitness
    'Asupan gula rafinasi kronis menurunkan daya tahan, kelincahan, dan massa otot, serta menaikkan lemak tubuh.',
    // family
    'Anak di bawah 2 tahun idealnya TANPA gula tambahan sama sekali (Pedoman Gizi & WHO).',
    'Setiap tambahan satu porsi minuman manis harian menaikkan risiko obesitas pada anak.',
    'Paparan iklan minuman manis pada remaja meningkat dan terbukti menaikkan konsumsi serta preferensi merek.',
    // body
    'Lebih dari 90% fruktosa diproses hati, dan fruktosa jauh lebih kuat memicu pembentukan lemak hati daripada glukosa.',
    'Uji acak: minuman berfruktosa & sukrosa menaikkan sintesis lemak hati — minuman berglukosa tidak.',
    'Orang kurus yang sering minum soda/jus bisa memiliki risiko perlemakan hati hingga ~4 kali lipat.',
    'Diet tinggi gula & lemak menghabiskan bakteri usus pelindung dan melemahkan dinding usus.',
    // brain (sweeteners)
    'WHO/IARC (2023) menggolongkan aspartam "mungkin karsinogenik" tapi batas aman tetap tinggi — perlu >9 kaleng diet soda/hari untuk melampauinya.',
    '"Bebas gula" belum tentu netral: uji acak menemukan sakarin & sukralosa mengganggu toleransi glukosa dan mengubah mikrobioma.',
    // limits (natural sugars)
    'Gula aren (IG ~35–45) & madu (~55) lebih rendah dari gula pasir, tapi tetap gula bebas yang harus dihitung.',
    // hidden (savory)
    'Kecap manis mengandung ~10–14 gram gula per sendok makan — masakan "gurih" pun menyimpan gula.',
    // indonesia
    'Satu potong martabak manis mengandung ~20 gram gula — sekitar 40% batas harian Kemenkes dalam satu potong.',
    'Satu gelas kopi susu gula aren kekinian bisa menghabiskan sebagian besar jatah gula harianmu (50 gram).',
    'Cukai minuman berpemanis (MBDK) masuk UU APBN 2026, namun penerapannya ditunda dan tarifnya belum ditetapkan.',
    // disease (intervention)
    'Meta-analisis uji terkontrol: mengurangi gula bebas memperbaiki tekanan darah dan kadar asam urat.',
  ],
  en: [
    // limits
    'WHO recommends added sugar below 10% of energy intake — about 50 grams (12 teaspoons) per day.',
    'For extra health benefits, WHO suggests sugar under 5% of energy — just 25 grams (6 teaspoons) per day.',
    'American Heart Association: max 25 grams of added sugar per day for women, 36 grams for men.',
    'Indonesia\'s Health Ministry has an easy rule, "G4 G1 L5": max 4 tablespoons (50 grams) of sugar per day.',
    'The average person consumes 2–3 times the recommended daily sugar limit — without realizing it.',
    // hidden
    'About 74% of packaged supermarket foods contain added sugar.',
    'Sugar hides behind 61+ names on labels: corn syrup, maltose, dextrose, "cane juice," and more.',
    'One tablespoon of ketchup contains about 1 teaspoon of sugar.',
    'Fruit yogurt can contain up to 29 grams of sugar per serving — more than a can of soda.',
    // drinks
    'One 330 ml can of soda contains about 35 grams of sugar — nearly 9 teaspoons.',
    'Full-sugar boba milk tea carries 38–50 grams of sugar; with toppings it can exceed 100 grams.',
    'A glass of sweet iced tea holds 15–25 grams of sugar — even "50% sugar" still equals a can of soda.',
    'Liquid sugar absorbs faster than solid food — its blood sugar spike is sharper.',
    // disease
    'The highest sugary-drink intake is linked to a 29% higher type 2 diabetes risk.',
    'One sweet drink per day raises cardiovascular disease risk by 18% — no matter how much you exercise.',
    'Every 5% of calories from free sugar raises heart disease risk 6% and stroke risk 10%.',
    'Mouth bacteria turn sugar into acid that erodes tooth enamel — the main cause of cavities.',
    'Sugary drinks are also linked to obesity (+18%) and hypertension (+12%).',
    // brain
    'Sugar triggers dopamine release in the brain\'s reward pathway — the same circuit as addictive substances.',
    'A 22-year study: high sugar intake raised the odds of common mental disorders by 23% within 5 years.',
    'In animal studies, sugar cues trigger brain responses similar to addictive-substance cues.',
    'The more often you eat sugar, the duller the dopamine response — you need more for the same feeling.',
    // body
    'Excess glucose forms AGEs that damage collagen — accelerating wrinkles and dull skin.',
    'Cutting sugar lowered liver fat by more than 20% in just 9 days (UCSF study).',
    'Sugar makes energy spike then crash — the source of that afternoon slump.',
    // indonesia
    'Diabetes prevalence in Indonesia reached 11.7% (SKI 2023) — double the 5.7% of 2007.',
    'Indonesia ranks 7th worldwide for diabetes — about 10.7 million people.',
    'More than 60% of Indonesian adults routinely consume sweetened drinks.',
    // recovery
    'Sugar cravings peak on days 3–5 after quitting — after that they keep getting lighter.',
    'Within 2 weeks, your taste buds regenerate — fruit starts tasting sweeter.',
    'Within 1 month without added sugar: insulin sensitivity improves and liver fat drops.',
    'After about 6 weeks, routine sweet cravings usually disappear entirely.',
    // sleep
    'A study found a high-sugar diet (~30% of energy) was linked to markedly worse sleep quality.',
    'Sugary drinks lengthen the time it takes to fall asleep and increase night-time sleep disturbances.',
    // immune
    'A single 100g sugar load can cut white blood cells\' ability to fight bacteria by ~50% for 1–5 hours.',
    'High blood sugar impairs immune cells (neutrophils) at reaching, trapping, and killing pathogens.',
    // fitness
    'Chronic refined-sugar intake lowers endurance, agility, and lean muscle mass, and raises body fat.',
    // family
    'Children under 2 should ideally have ZERO added sugar (Dietary Guidelines & WHO).',
    'Each extra daily serving of sugary drinks raises the risk of childhood obesity.',
    'Youth exposure to sugary-drink ads has risen and is shown to raise both intake and brand preference.',
    // body
    'Over 90% of fructose is processed by the liver, and fructose triggers liver fat far more potently than glucose.',
    'A randomized trial: fructose- and sucrose-sweetened drinks raised liver fat synthesis — glucose drinks did not.',
    'Lean people who often drink soda/juice can have up to ~4× higher risk of fatty liver.',
    'A high-sugar, high-fat diet depletes protective gut bacteria and weakens the intestinal barrier.',
    // brain (sweeteners)
    'WHO/IARC (2023) labeled aspartame "possibly carcinogenic," but the safe limit stays high — you\'d need >9 cans of diet soda/day to exceed it.',
    '"Sugar-free" isn\'t automatically neutral: a trial found saccharin & sucralose impaired glucose tolerance and altered the microbiome.',
    // limits (natural sugars)
    'Palm sugar (GI ~35–45) & honey (~55) are lower than white sugar, but still free sugar you must count.',
    // hidden (savory)
    'Sweet soy sauce (kecap manis) holds ~10–14 grams of sugar per tablespoon — even "savory" dishes hide sugar.',
    // indonesia
    'One slice of martabak manis contains ~20 grams of sugar — about 40% of the daily limit in a single slice.',
    'A single trendy palm-sugar milk coffee can use up much of your daily sugar allowance (50 grams).',
    'Indonesia\'s sweetened-drink excise (MBDK) entered the 2026 budget law, but enforcement is postponed and the rate is undecided.',
    // disease (intervention)
    'A meta-analysis of controlled trials: reducing free sugars improves blood pressure and uric acid levels.',
  ],
}

function resolveUrl(source: string): string {
  return sugarSourceUrls[source] ?? sugarSourceUrls['WHO']
}

export function getSugarFacts(locale: Locale): Fact[] {
  const texts = FACT_TEXT[locale] ?? FACT_TEXT.id
  return FACT_BASE.map((b, i) => ({
    fact: texts[i],
    source: b.source,
    sourceUrl: resolveUrl(b.source),
    category: b.category,
  }))
}
