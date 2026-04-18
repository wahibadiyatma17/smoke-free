import type { Locale } from '@/i18n/types'
import type { CategoryMeta, Fact } from '../types'

export const alcoholSourceUrls: Record<string, string> = {
  'WHO':                     'https://www.who.int/news-room/fact-sheets/detail/alcohol',
  'CDC':                     'https://www.cdc.gov/alcohol/fact-sheets/alcohol-use.htm',
  'NIAAA':                   'https://www.niaaa.nih.gov/alcohols-effects-health',
  'NHS':                     'https://www.nhs.uk/live-well/alcohol-advice/',
  'American Cancer Society': 'https://www.cancer.org/cancer/risk-prevention/diet-physical-activity/acs-guidelines-nutrition-physical-activity-cancer-prevention/alcohol-use.html',
  'Alcohol Change UK':       'https://alcoholchange.org.uk/alcohol-facts/fact-sheets',
  'Kalkulasi Umum':          'https://www.who.int/news-room/fact-sheets/detail/alcohol',
  'General Estimate':        'https://www.who.int/news-room/fact-sheets/detail/alcohol',
}

type CategoryBase = Omit<CategoryMeta, 'label' | 'description'>
type CategoryText = { label: string; description: string }

const CATEGORY_BASE: Record<string, CategoryBase> = {
  liver:          { emoji: '🫀', color: 'var(--coral-mid)',    bg: 'var(--coral-pale)',    border: 'var(--coral-tint)'    },
  cancer:         { emoji: '🔬', color: '#C0392B',             bg: '#FFF0F0',              border: '#FFCDD2'              },
  cardiovascular: { emoji: '❤️', color: '#C0392B',             bg: '#FFF0F0',              border: '#FFCDD2'              },
  brain:          { emoji: '🧠', color: '#6A1B9A',             bg: '#F3E5FF',              border: '#DEB3FF'              },
  sleep:          { emoji: '😴', color: 'var(--lavender)',      bg: 'var(--lavender-pale)',  border: 'var(--lavender-tint)' },
  addiction:      { emoji: '🌀', color: 'var(--coral-mid)',     bg: 'var(--coral-pale)',     border: 'var(--coral-tint)'    },
  economic:       { emoji: '💸', color: 'var(--amber-strong)',  bg: 'var(--amber-pale)',     border: 'var(--amber-tint)'    },
  recovery:       { emoji: '🌱', color: 'var(--green-dark)',    bg: 'var(--green-pale)',     border: 'var(--green-tint)'    },
  lifeExpectancy: { emoji: '⏳', color: '#E65100',              bg: '#FFF3E0',              border: '#FFD0A0'              },
}

const CATEGORY_TEXT: Record<Locale, Record<string, CategoryText>> = {
  id: {
    liver:          { label: 'Hati',               description: 'Hati adalah organ yang paling menderita akibat alkohol. Kerusakannya berjalan dalam tiga tahap — fatty liver, hepatitis alkoholik, dan sirosis. Kabar baiknya: hati mampu beregenerasi luar biasa begitu asupan alkohol berhenti.' },
    cancer:         { label: 'Kanker',             description: 'Alkohol adalah karsinogen Grup 1 menurut WHO, setara dengan rokok dan asbes. Ia meningkatkan risiko kanker mulut, tenggorokan, esofagus, hati, payudara, dan usus besar. Risiko naik linier dengan jumlah konsumsi — tidak ada "dosis aman".' },
    cardiovascular: { label: 'Jantung & Pembuluh', description: 'Alkohol meningkatkan tekanan darah, memicu aritmia, melemahkan otot jantung, dan menaikkan risiko stroke hemoragik. Mitos bahwa "segelas wine sehat untuk jantung" sudah dibantah WHO: bahkan konsumsi rendah menaikkan risiko kardiovaskular.' },
    brain:          { label: 'Otak & Mental',      description: 'Alkohol meredam aktivitas neurotransmitter, menyusutkan volume otak pada konsumsi jangka panjang, dan memperburuk kecemasan serta depresi meski terasa menenangkan di awal. Penggunaan berat dapat menyebabkan gangguan memori permanen seperti Wernicke-Korsakoff.' },
    sleep:          { label: 'Tidur & Energi',     description: 'Alkohol mempercepat tertidur tetapi menghancurkan kualitas tidur REM dan dalam — inilah sebabnya kamu bangun lelah meski tidur 8 jam. Setelah 1–2 minggu berhenti, kualitas tidur pulih nyata.' },
    addiction:      { label: 'Kecanduan',          description: 'Alkohol mengubah jalur reward otak. Putus alkohol pada peminum berat bisa memunculkan gejala yang berpotensi fatal — karena itu penting untuk konsultasi dokter bagi konsumsi harian tinggi. Tapi bagi kebanyakan orang, gejala memuncak di 72 jam dan mereda setelahnya.' },
    economic:       { label: 'Kerugian Ekonomi',   description: 'Selain biaya minuman, alkohol membebani produktivitas (hangover), biaya medis jangka panjang, hingga risiko sosial (pertengkaran, hubungan, legal). Jutaan rupiah terselamatkan setiap tahun dengan berhenti — belum termasuk "biaya" hari yang hilang karena mabuk.' },
    recovery:       { label: 'Pemulihan Tubuh',    description: 'Tubuh mulai pulih segera setelah alkohol keluar dari darah. 6 jam: kadar darah turun. 24 jam: gula darah stabil. 2 minggu: lemak hati berkurang. 1 bulan: insulin normal. 1 tahun: risiko kanker mulai turun. Sel-sel hati mampu beregenerasi sepenuhnya.' },
    lifeExpectancy: { label: 'Harapan Hidup',      description: 'Alkohol berkontribusi pada lebih dari 3 juta kematian setiap tahun di seluruh dunia — sekitar 5,3% dari semua kematian. Konsumsi berat mengurangi harapan hidup 10–12 tahun. Berhenti di usia berapa pun menambah tahun-tahun kehidupan yang berkualitas.' },
  },
  en: {
    liver:          { label: 'Liver',              description: 'The liver suffers most from alcohol. Damage progresses in three stages — fatty liver, alcoholic hepatitis, and cirrhosis. The good news: the liver regenerates remarkably once alcohol stops.' },
    cancer:         { label: 'Cancer',             description: 'Alcohol is a Group 1 carcinogen per WHO — on par with tobacco and asbestos. It raises the risk of mouth, throat, esophagus, liver, breast, and colon cancer. Risk rises linearly with consumption — there is no "safe dose."' },
    cardiovascular: { label: 'Heart & Vessels',    description: 'Alcohol raises blood pressure, triggers arrhythmias, weakens heart muscle, and increases hemorrhagic stroke risk. The myth of "a glass of wine is good for your heart" is debunked by WHO: even low consumption raises cardiovascular risk.' },
    brain:          { label: 'Brain & Mental',     description: 'Alcohol dampens neurotransmitter activity, shrinks brain volume with long-term use, and worsens anxiety and depression despite feeling calming at first. Heavy use can cause permanent memory disorders like Wernicke-Korsakoff.' },
    sleep:          { label: 'Sleep & Energy',     description: 'Alcohol speeds falling asleep but destroys REM and deep sleep quality — which is why you wake tired after 8 hours. After 1–2 weeks of quitting, sleep quality visibly recovers.' },
    addiction:      { label: 'Addiction',          description: 'Alcohol rewires the brain\'s reward pathways. Withdrawal in heavy drinkers can produce potentially fatal symptoms — so consult a doctor before quitting if daily consumption is high. For most people, symptoms peak at 72 hours and ease after.' },
    economic:       { label: 'Economic Cost',      description: 'Beyond the drink tab, alcohol burdens productivity (hangovers), long-term medical costs, and social risks (arguments, relationships, legal). Millions of rupiah can be saved every year by quitting — not counting the "cost" of days lost to being drunk.' },
    recovery:       { label: 'Body Recovery',      description: 'The body starts recovering as soon as alcohol clears. 6 hours: blood levels fall. 24 hours: blood sugar stabilizes. 2 weeks: liver fat declines. 1 month: insulin normalizes. 1 year: cancer risk starts dropping. Liver cells can regenerate fully.' },
    lifeExpectancy: { label: 'Life Expectancy',    description: 'Alcohol contributes to more than 3 million deaths worldwide each year — about 5.3% of all deaths. Heavy use cuts life expectancy by 10–12 years. Quitting at any age adds quality years of life.' },
  },
}

const CATEGORIES = Object.keys(CATEGORY_BASE)

export function getAlcoholCategoryMeta(locale: Locale): Record<string, CategoryMeta> {
  const out: Record<string, CategoryMeta> = {}
  const text = CATEGORY_TEXT[locale] ?? CATEGORY_TEXT.id
  for (const key of CATEGORIES) out[key] = { ...CATEGORY_BASE[key], ...text[key] }
  return out
}

type FactBase = { source: string; category: string }

const FACT_BASE: FactBase[] = [
  // liver
  { source: 'NIAAA',                   category: 'liver' },
  { source: 'NHS',                     category: 'liver' },
  { source: 'WHO',                     category: 'liver' },
  { source: 'NIAAA',                   category: 'liver' },
  { source: 'NHS',                     category: 'liver' },
  // cancer
  { source: 'WHO',                     category: 'cancer' },
  { source: 'WHO',                     category: 'cancer' },
  { source: 'American Cancer Society', category: 'cancer' },
  { source: 'American Cancer Society', category: 'cancer' },
  { source: 'WHO',                     category: 'cancer' },
  { source: 'NIAAA',                   category: 'cancer' },
  // cardiovascular
  { source: 'CDC',                     category: 'cardiovascular' },
  { source: 'NIAAA',                   category: 'cardiovascular' },
  { source: 'WHO',                     category: 'cardiovascular' },
  { source: 'NHS',                     category: 'cardiovascular' },
  { source: 'NIAAA',                   category: 'cardiovascular' },
  // brain
  { source: 'NIAAA',                   category: 'brain' },
  { source: 'NHS',                     category: 'brain' },
  { source: 'NIAAA',                   category: 'brain' },
  { source: 'NHS',                     category: 'brain' },
  { source: 'NIAAA',                   category: 'brain' },
  // sleep
  { source: 'Alcohol Change UK',       category: 'sleep' },
  { source: 'NIAAA',                   category: 'sleep' },
  { source: 'NHS',                     category: 'sleep' },
  { source: 'NIAAA',                   category: 'sleep' },
  // addiction
  { source: 'WHO',                     category: 'addiction' },
  { source: 'NIAAA',                   category: 'addiction' },
  { source: 'NHS',                     category: 'addiction' },
  { source: 'NIAAA',                   category: 'addiction' },
  // economic
  { source: 'WHO',                     category: 'economic' },
  { source: 'General Estimate',        category: 'economic' },
  { source: 'NIAAA',                   category: 'economic' },
  // recovery
  { source: 'NHS',                     category: 'recovery' },
  { source: 'NIAAA',                   category: 'recovery' },
  { source: 'NHS',                     category: 'recovery' },
  { source: 'NHS',                     category: 'recovery' },
  { source: 'American Cancer Society', category: 'recovery' },
  // lifeExpectancy
  { source: 'WHO',                     category: 'lifeExpectancy' },
  { source: 'WHO',                     category: 'lifeExpectancy' },
  { source: 'NIAAA',                   category: 'lifeExpectancy' },
]

const FACT_TEXT: Record<Locale, string[]> = {
  id: [
    // liver
    'Lebih dari 90% peminum berat mengalami fatty liver — penumpukan lemak di hati yang bisa reversibel.',
    'Dalam 2 minggu berhenti minum, lemak di hati mulai berkurang secara signifikan.',
    'Sirosis hati — jaringan parut permanen — berkembang pada 10–20% peminum berat jangka panjang.',
    'Hati adalah satu-satunya organ manusia yang bisa beregenerasi. Sel-sel hati baru terbentuk setelah konsumsi alkohol berhenti.',
    'Alkohol memproses melalui hati dengan laju sekitar 1 unit standar per jam. Lebih dari itu = akumulasi toksin.',
    // cancer
    'Alkohol diklasifikasikan Grup 1 karsinogen oleh WHO — setara tembakau dan asbes.',
    'Alkohol menyebabkan sekitar 4% kasus kanker di seluruh dunia setiap tahun.',
    'Wanita yang mengonsumsi 1 gelas anggur/hari memiliki risiko 7–10% lebih tinggi terkena kanker payudara.',
    'Risiko kanker mulut dan tenggorokan naik 5 kali lipat pada peminum berat.',
    'Tidak ada "level aman" konsumsi alkohol — risiko kanker naik linier mulai dari teguk pertama.',
    'Alkohol berkontribusi pada kanker hati, esofagus, usus besar, payudara, mulut, dan tenggorokan.',
    // cardiovascular
    'Konsumsi alkohol berlebihan meningkatkan risiko tekanan darah tinggi dan stroke.',
    'Aritmia yang dikenal sebagai "holiday heart syndrome" sering terjadi setelah sesi binge drinking.',
    'Mitos "segelas wine baik untuk jantung" telah dibantah WHO — risiko kardiovaskular naik mulai dari dosis rendah.',
    'Setelah 1 minggu berhenti, tekanan darah mulai turun secara signifikan.',
    'Peminum berat jangka panjang bisa mengalami kardiomiopati alkoholik — otot jantung yang melemah.',
    // brain
    'Alkohol menyusutkan volume otak — terlihat pada MRI peminum berat bertahun-tahun.',
    'Meski alkohol terasa meredakan kecemasan, ia memperburuk kecemasan dan depresi dalam jangka panjang.',
    'Peminum berat 2x lebih berisiko mengalami depresi klinis dibanding non-peminum.',
    'Memori dan konsentrasi meningkat nyata setelah 2–4 minggu abstinen.',
    'Ketergantungan nikotin dan alkohol sering muncul bersamaan — keduanya saling memperkuat.',
    // sleep
    'Meski alkohol mempercepat tertidur, ia mengganggu fase REM — fase tidur paling restoratif.',
    'Peminum mengalami rata-rata 30% lebih sedikit tidur REM dibanding non-peminum.',
    'Setelah 1 minggu berhenti, kualitas tidur dan energi pagi hari meningkat nyata.',
    'Minum di malam hari 2x lebih mungkin memicu sleep apnea dan dengkuran.',
    // addiction
    'Sekitar 1 dari 8 orang dewasa di dunia memiliki gangguan penggunaan alkohol (alcohol use disorder).',
    'Gejala putus alkohol biasanya memuncak pada 24–72 jam dan mereda setelahnya.',
    'Bagi peminum berat harian, putus alkohol bisa berbahaya — konsultasi dokter sebelum berhenti total.',
    'Alkohol mengaktifkan jalur dopamin yang sama seperti opioid dan kokain.',
    // economic
    'Alkohol menguras ekonomi global sekitar US$1 triliun per tahun dalam biaya kesehatan dan produktivitas.',
    'Rata-rata peminum sosial menghabiskan jutaan rupiah per tahun untuk alkohol — belum termasuk biaya ikutan (Uber, makanan, hangover).',
    'Hangover menurunkan produktivitas kerja hingga 10% untuk hari berikutnya.',
    // recovery
    'Dalam 6 jam: kadar alkohol darah turun ke nol untuk konsumsi sedang.',
    'Dalam 24 jam: gula darah menstabil, rasa lapar dan mood lebih seimbang.',
    'Dalam 2 minggu: lemak hati mulai berkurang, kualitas tidur membaik nyata.',
    'Dalam 1 bulan: tekanan darah, kulit, dan energi meningkat signifikan.',
    'Dalam 1 tahun: risiko kanker mulut, tenggorokan, dan hati mulai turun nyata.',
    // lifeExpectancy
    'Alkohol berkontribusi pada lebih dari 3 juta kematian setiap tahun di seluruh dunia — 5,3% dari semua kematian.',
    'Peminum berat hidup rata-rata 10–12 tahun lebih pendek dibanding non-peminum.',
    'Berhenti sebelum usia 40 tahun mengurangi hampir seluruh risiko kematian terkait alkohol.',
  ],
  en: [
    // liver
    'More than 90% of heavy drinkers develop fatty liver — a reversible buildup of fat in the liver.',
    'Within 2 weeks of quitting, liver fat begins to decrease significantly.',
    'Cirrhosis — permanent scar tissue — develops in 10–20% of long-term heavy drinkers.',
    'The liver is the only human organ that can regenerate. New liver cells form after alcohol intake stops.',
    'The liver processes alcohol at about 1 standard unit per hour. Anything above that accumulates as toxin.',
    // cancer
    'Alcohol is classified as a Group 1 carcinogen by WHO — on par with tobacco and asbestos.',
    'Alcohol causes around 4% of cancer cases worldwide each year.',
    'Women who drink 1 glass of wine/day have a 7–10% higher risk of breast cancer.',
    'Mouth and throat cancer risk rises 5× in heavy drinkers.',
    'There is no "safe level" of alcohol — cancer risk rises linearly from the first sip.',
    'Alcohol contributes to liver, esophageal, colon, breast, mouth, and throat cancers.',
    // cardiovascular
    'Excessive alcohol use raises the risk of high blood pressure and stroke.',
    'The arrhythmia known as "holiday heart syndrome" often follows binge drinking sessions.',
    'The "a glass of wine is good for the heart" myth has been debunked by WHO — cardiovascular risk rises from low doses.',
    'After 1 week of quitting, blood pressure begins to drop significantly.',
    'Long-term heavy drinkers can develop alcoholic cardiomyopathy — a weakened heart muscle.',
    // brain
    'Alcohol shrinks brain volume — visible on MRI scans of long-term heavy drinkers.',
    'While alcohol seems to ease anxiety, it worsens anxiety and depression long-term.',
    'Heavy drinkers have 2× the risk of clinical depression compared to non-drinkers.',
    'Memory and concentration noticeably improve after 2–4 weeks of abstinence.',
    'Nicotine and alcohol dependence often appear together — each reinforces the other.',
    // sleep
    'While alcohol speeds falling asleep, it disrupts REM — the most restorative sleep phase.',
    'Drinkers get on average 30% less REM sleep than non-drinkers.',
    'After 1 week of quitting, sleep quality and morning energy improve noticeably.',
    'Drinking at night is 2× more likely to trigger sleep apnea and snoring.',
    // addiction
    'About 1 in 8 adults worldwide has an alcohol use disorder.',
    'Alcohol withdrawal symptoms usually peak at 24–72 hours and ease afterward.',
    'For daily heavy drinkers, withdrawal can be dangerous — consult a doctor before stopping entirely.',
    'Alcohol activates the same dopamine pathways as opioids and cocaine.',
    // economic
    'Alcohol drains the global economy by about US$1 trillion per year in health and productivity costs.',
    'The average social drinker spends millions of rupiah a year on alcohol — not including knock-on costs (rides, food, hangovers).',
    'Hangovers reduce next-day work productivity by up to 10%.',
    // recovery
    'Within 6 hours: blood alcohol levels fall to zero for moderate consumption.',
    'Within 24 hours: blood sugar stabilizes; appetite and mood are more balanced.',
    'Within 2 weeks: liver fat begins to decrease; sleep quality improves noticeably.',
    'Within 1 month: blood pressure, skin, and energy improve significantly.',
    'Within 1 year: mouth, throat, and liver cancer risk starts to drop noticeably.',
    // lifeExpectancy
    'Alcohol contributes to more than 3 million deaths worldwide each year — 5.3% of all deaths.',
    'Heavy drinkers live on average 10–12 years less than non-drinkers.',
    'Quitting before age 40 eliminates nearly all alcohol-related death risk.',
  ],
}

function resolveUrl(source: string): string {
  return alcoholSourceUrls[source] ?? alcoholSourceUrls['WHO']
}

export function getAlcoholFacts(locale: Locale): Fact[] {
  const texts = FACT_TEXT[locale] ?? FACT_TEXT.id
  return FACT_BASE.map((b, i) => ({
    fact: texts[i],
    source: b.source,
    sourceUrl: resolveUrl(b.source),
    category: b.category,
  }))
}
