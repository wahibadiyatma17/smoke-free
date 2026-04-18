import type { Locale } from '@/i18n/types'
import type { CategoryMeta, Fact } from '../types'

export const smokingSourceUrls: Record<string, string> = {
  'CDC':                       'https://www.cdc.gov/tobacco/about/index.html',
  'CDC / NCI':                 'https://www.cancer.gov/about-cancer/causes-prevention/risk/tobacco',
  'American Cancer Society':   'https://www.cancer.org/cancer/risk-prevention/tobacco/health-risks-of-smoking-tobacco.html',
  'NCI':                       'https://www.cancer.gov/about-cancer/causes-prevention/risk/tobacco',
  'WHO':                       'https://www.who.int/news-room/fact-sheets/detail/tobacco',
  'WHO / NHS':                 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
  'WHO / CDC':                 'https://www.cdc.gov/tobacco/secondhand-smoke/health.html',
  'NHS':                       'https://www.nhs.uk/better-health/quit-smoking/why-quit-smoking/benefits-of-quitting-smoking/',
  'NHS / American Cancer Society': 'https://www.cancer.org/cancer/risk-prevention/tobacco/guide-quitting-smoking/benefits-of-quitting-smoking-over-time.html',
  'NHS / WHO':                 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
  'NIDA':                      'https://nida.nih.gov/publications/research-reports/tobacco-nicotine-e-cigarettes/nicotine-addictive',
  'NIDA / CDC':                'https://www.cdc.gov/tobacco/about/index.html',
  'NIDA / WHO':                'https://www.who.int/news-room/fact-sheets/detail/tobacco',
  'CDC / WHO':                 'https://www.cdc.gov/tobacco/about/index.html',
  'CDC / Surgeon General':     'https://www.cdc.gov/tobacco/about/index.html',
  'WHO Europe':                'https://www.who.int/europe/news/item/08-11-2021-the-vicious-cycle-of-tobacco-use-and-mental-illness-a-double-burden-on-health',
  'Kalkulasi Umum':            'https://www.cdc.gov/tobacco/about/index.html',
  'General Estimate':          'https://www.cdc.gov/tobacco/about/index.html',
  'CDC / American Cancer Society': 'https://www.cancer.org/cancer/risk-prevention/tobacco/health-risks-of-smoking-tobacco.html',
}

type CategoryBase = Omit<CategoryMeta, 'label' | 'description'>
type CategoryText = { label: string; description: string }

const CATEGORY_BASE: Record<string, CategoryBase> = {
  cancer:         { emoji: '🔬', color: 'var(--coral-mid)',   bg: 'var(--coral-pale)',   border: 'var(--coral-tint)'   },
  cardiovascular: { emoji: '❤️', color: '#C0392B',            bg: '#FFF0F0',             border: '#FFCDD2'              },
  respiratory:    { emoji: '🫁', color: '#1565C0',            bg: '#E8F5FF',             border: '#B3DAFF'              },
  economic:       { emoji: '💸', color: 'var(--amber-strong)', bg: 'var(--amber-pale)',   border: 'var(--amber-tint)'    },
  addiction:      { emoji: '🧠', color: '#6A1B9A',            bg: '#F3E5FF',             border: '#DEB3FF'              },
  secondhand:     { emoji: '💨', color: '#37474F',            bg: '#ECEFF1',             border: '#CFD8DC'              },
  recovery:       { emoji: '🌱', color: 'var(--green-dark)',  bg: 'var(--green-pale)',   border: 'var(--green-tint)'    },
  chemicals:      { emoji: '☠️', color: '#4E342E',            bg: '#EFEBE9',             border: '#D7CCC8'              },
  lifeExpectancy: { emoji: '⏳', color: '#E65100',            bg: '#FFF3E0',             border: '#FFD0A0'              },
  mentalHealth:   { emoji: '🧘', color: '#00695C',            bg: '#E0F2F1',             border: '#B2DFDB'              },
}

const CATEGORY_TEXT: Record<Locale, Record<string, CategoryText>> = {
  id: {
    cancer:         { label: 'Kanker',             description: 'Rokok adalah penyebab utama kanker di seluruh dunia. Zat karsinogen dalam asap rokok merusak DNA sel dan memicu pertumbuhan tumor ganas, tidak hanya di paru-paru tetapi juga di mulut, tenggorokan, esofagus, lambung, pankreas, ginjal, kandung kemih, dan serviks.' },
    cardiovascular: { label: 'Jantung & Pembuluh', description: 'Merokok merusak dinding pembuluh darah, mempercepat penumpukan plak (aterosklerosis), dan meningkatkan tekanan darah. Ini melipatgandakan risiko serangan jantung, stroke, dan gagal jantung. Bahkan perokok pasif pun terdampak signifikan.' },
    respiratory:    { label: 'Paru-paru',          description: 'Asap rokok menghancurkan silia (rambut halus pelindung saluran napas) dan merusak jaringan paru secara permanen. Penyakit seperti PPOK, emfisema, dan bronkitis kronis hampir seluruhnya disebabkan oleh kebiasaan merokok.' },
    economic:       { label: 'Kerugian Ekonomi',   description: 'Selain biaya rokok harian, perokok menanggung biaya medis jauh lebih tinggi sepanjang hidup mereka. Di Indonesia, jutaan rupiah bisa terselamatkan setiap tahun hanya dengan berhenti merokok, belum lagi produktivitas yang meningkat.' },
    addiction:      { label: 'Kecanduan Nikotin',  description: 'Nikotin bekerja dengan memicu pelepasan dopamin di otak, menciptakan rasa nyaman yang membuatmu terus kembali. Kecanduan ini bersifat fisik dan psikologis, namun dengan dukungan yang tepat, otak bisa benar-benar pulih sepenuhnya.' },
    secondhand:     { label: 'Asap Rokok Pasif',   description: 'Asap rokok yang dihirup orang di sekitarmu mengandung lebih dari 70 zat karsinogen. Anak-anak yang terpapar asap rokok pasif berisiko tinggi mengalami asma, infeksi saluran napas, dan gangguan perkembangan otak.' },
    recovery:       { label: 'Pemulihan Tubuh',    description: 'Tubuh manusia memiliki kemampuan pemulihan luar biasa. Dalam 20 menit setelah berhenti merokok, detak jantung mulai normal. Dalam setahun, risiko penyakit jantung turun setengahnya. Dalam 10 tahun, risiko kanker paru berkurang drastis.' },
    chemicals:      { label: 'Zat Berbahaya',      description: 'Satu batang rokok mengandung lebih dari 7.000 bahan kimia. Setidaknya 69 di antaranya bersifat karsinogen (pemicu kanker), termasuk arsenik, benzena, formaldehida, dan timbal. Zat-zat ini masuk langsung ke aliran darahmu setiap kali kamu merokok.' },
    lifeExpectancy: { label: 'Harapan Hidup',      description: 'Rata-rata, setiap batang rokok mencuri 11 menit dari hidupmu. Perokok berat kehilangan rata-rata 10 tahun umur panjang dibanding bukan perokok. Berhenti di usia berapa pun terbukti menambah tahun kehidupan yang berkualitas.' },
    mentalHealth:   { label: 'Kesehatan Mental',   description: 'Meski rokok terasa menenangkan, itu hanyalah ilusi: nikotin sebenarnya meningkatkan kecemasan dan depresi jangka panjang. Penelitian menunjukkan bahwa orang yang berhenti merokok melaporkan tingkat stres, kecemasan, dan depresi yang lebih rendah setelah beberapa bulan.' },
  },
  en: {
    cancer:         { label: 'Cancer',             description: 'Smoking is a leading cause of cancer worldwide. Carcinogens in smoke damage cell DNA and drive malignant tumor growth — not only in the lungs but also in the mouth, throat, esophagus, stomach, pancreas, kidneys, bladder, and cervix.' },
    cardiovascular: { label: 'Heart & Vessels',    description: 'Smoking damages blood vessel walls, accelerates plaque buildup (atherosclerosis), and raises blood pressure. This multiplies the risk of heart attack, stroke, and heart failure. Even passive smokers are significantly affected.' },
    respiratory:    { label: 'Lungs',              description: 'Smoke destroys the cilia (tiny hairs that protect airways) and permanently damages lung tissue. COPD, emphysema, and chronic bronchitis are almost entirely caused by smoking.' },
    economic:       { label: 'Economic Cost',      description: 'Beyond daily cigarette cost, smokers bear far higher lifetime medical bills. In Indonesia, millions of rupiah can be saved every year just by quitting — not to mention productivity gains.' },
    addiction:      { label: 'Nicotine Addiction', description: 'Nicotine triggers dopamine release in the brain, creating a comfort that keeps pulling you back. The addiction is both physical and psychological — but with the right support, the brain can recover fully.' },
    secondhand:     { label: 'Secondhand Smoke',   description: 'Smoke inhaled by those around you contains over 70 carcinogens. Children exposed to secondhand smoke are at high risk of asthma, respiratory infections, and brain development issues.' },
    recovery:       { label: 'Body Recovery',      description: 'The human body has remarkable recovery capacity. Within 20 minutes of quitting, heart rate starts to normalize. In one year, heart disease risk drops by half. In 10 years, lung cancer risk is cut dramatically.' },
    chemicals:      { label: 'Harmful Chemicals',  description: 'A single cigarette contains over 7,000 chemicals. At least 69 are carcinogens — including arsenic, benzene, formaldehyde, and lead. These substances enter your bloodstream every time you smoke.' },
    lifeExpectancy: { label: 'Life Expectancy',    description: 'On average, each cigarette steals 11 minutes from your life. Heavy smokers lose 10 years of longevity compared with non-smokers. Quitting at any age has been proven to add years of quality life.' },
    mentalHealth:   { label: 'Mental Health',      description: 'While cigarettes feel calming, that\'s an illusion: nicotine actually increases long-term anxiety and depression. Research shows that people who quit report lower stress, anxiety, and depression levels after a few months.' },
  },
}

const CATEGORIES = Object.keys(CATEGORY_BASE)

export function getSmokingCategoryMeta(locale: Locale): Record<string, CategoryMeta> {
  const out: Record<string, CategoryMeta> = {}
  const text = CATEGORY_TEXT[locale] ?? CATEGORY_TEXT.id
  for (const key of CATEGORIES) out[key] = { ...CATEGORY_BASE[key], ...text[key] }
  return out
}

type FactBase = { source: string; category: string }

const FACT_BASE: FactBase[] = [
  // cancer
  { source: 'CDC',                       category: 'cancer' },
  { source: 'CDC',                       category: 'cancer' },
  { source: 'American Cancer Society',   category: 'cancer' },
  { source: 'CDC',                       category: 'cancer' },
  { source: 'CDC / NCI',                 category: 'cancer' },
  { source: 'NCI',                       category: 'cancer' },
  { source: 'American Cancer Society',   category: 'cancer' },
  { source: 'American Cancer Society',   category: 'cancer' },
  // cardiovascular
  { source: 'CDC',                       category: 'cardiovascular' },
  { source: 'CDC',                       category: 'cardiovascular' },
  { source: 'CDC',                       category: 'cardiovascular' },
  { source: 'CDC',                       category: 'cardiovascular' },
  { source: 'WHO',                       category: 'cardiovascular' },
  { source: 'CDC',                       category: 'cardiovascular' },
  { source: 'WHO / NHS',                 category: 'cardiovascular' },
  { source: 'NHS',                       category: 'cardiovascular' },
  // respiratory
  { source: 'CDC',                       category: 'respiratory' },
  { source: 'CDC',                       category: 'respiratory' },
  { source: 'CDC',                       category: 'respiratory' },
  { source: 'CDC',                       category: 'respiratory' },
  { source: 'WHO',                       category: 'respiratory' },
  // economic
  { source: 'WHO',                       category: 'economic' },
  { source: 'CDC',                       category: 'economic' },
  { source: 'General Estimate',          category: 'economic' },
  { source: 'CDC',                       category: 'economic' },
  // addiction
  { source: 'NIDA',                      category: 'addiction' },
  { source: 'NIDA',                      category: 'addiction' },
  { source: 'NIDA / CDC',                category: 'addiction' },
  { source: 'CDC',                       category: 'addiction' },
  { source: 'NIDA',                      category: 'addiction' },
  { source: 'WHO',                       category: 'addiction' },
  { source: 'WHO',                       category: 'addiction' },
  // secondhand
  { source: 'CDC',                       category: 'secondhand' },
  { source: 'CDC',                       category: 'secondhand' },
  { source: 'CDC',                       category: 'secondhand' },
  { source: 'CDC',                       category: 'secondhand' },
  { source: 'WHO',                       category: 'secondhand' },
  { source: 'WHO / CDC',                 category: 'secondhand' },
  // recovery
  { source: 'CDC',                       category: 'recovery' },
  { source: 'CDC',                       category: 'recovery' },
  { source: 'American Cancer Society',   category: 'recovery' },
  { source: 'American Cancer Society',   category: 'recovery' },
  { source: 'NHS / American Cancer Society', category: 'recovery' },
  { source: 'American Cancer Society',   category: 'recovery' },
  { source: 'NHS / American Cancer Society', category: 'recovery' },
  { source: 'NHS / WHO',                 category: 'recovery' },
  { source: 'CDC',                       category: 'recovery' },
  // chemicals
  { source: 'CDC / American Cancer Society', category: 'chemicals' },
  { source: 'American Cancer Society',   category: 'chemicals' },
  { source: 'American Cancer Society',   category: 'chemicals' },
  { source: 'American Cancer Society',   category: 'chemicals' },
  { source: 'CDC',                       category: 'chemicals' },
  { source: 'American Cancer Society',   category: 'chemicals' },
  // lifeExpectancy
  { source: 'CDC / WHO',                 category: 'lifeExpectancy' },
  { source: 'CDC',                       category: 'lifeExpectancy' },
  { source: 'WHO',                       category: 'lifeExpectancy' },
  { source: 'WHO',                       category: 'lifeExpectancy' },
  { source: 'CDC / WHO',                 category: 'lifeExpectancy' },
  // mentalHealth
  { source: 'CDC',                       category: 'mentalHealth' },
  { source: 'WHO Europe',                category: 'mentalHealth' },
  { source: 'NHS',                       category: 'mentalHealth' },
  { source: 'NIDA / WHO',                category: 'mentalHealth' },
  { source: 'WHO Europe',                category: 'mentalHealth' },
]

const FACT_TEXT: Record<Locale, string[]> = {
  id: [
    // cancer
    '80–90% kematian akibat kanker paru-paru disebabkan oleh rokok.',
    'Perokok 15–30 kali lebih berisiko terkena atau meninggal karena kanker paru dibanding bukan perokok.',
    'Rokok menyebabkan 30% dari seluruh kematian akibat kanker setiap tahunnya.',
    'Rokok memicu 12 jenis kanker: paru, mulut, tenggorokan, kerongkongan, lambung, ginjal, kandung kemih, serviks, pankreas, usus besar, hati, dan leukemia.',
    '50% kanker kandung kemih disebabkan oleh rokok. faktor risiko tunggal terbesar.',
    'Perokok punya risiko 2–4 kali lebih tinggi terkena kanker pankreas dibanding bukan perokok.',
    '10–15 tahun setelah berhenti merokok, risiko kanker paru turun menjadi setengahnya dibanding yang terus merokok.',
    '5–10 tahun setelah berhenti, risiko kanker mulut, tenggorokan, dan laring berkurang hingga 50%.',
    // cardiovascular
    'Merokok meningkatkan risiko penyakit jantung koroner sebesar 2–4 kali lipat.',
    'Rokok meningkatkan risiko stroke sebesar 2–4 kali lipat dibanding bukan perokok.',
    'Rokok menyebabkan 1 dari setiap 4 kematian akibat penyakit kardiovaskular.',
    'Bahkan merokok kurang dari 5 batang sehari sudah menghasilkan tanda awal penyakit kardiovaskular.',
    'Tembakau menyebabkan sekitar 1,9 juta kematian akibat penyakit jantung koroner setiap tahun di seluruh dunia.',
    'Bukan perokok yang terpapar asap rokok di rumah atau tempat kerja memiliki risiko penyakit jantung 25–30% lebih tinggi.',
    'Hanya 1 tahun setelah berhenti, risiko tambahan penyakit jantung koroner turun menjadi setengahnya.',
    '15 tahun setelah berhenti merokok, risiko jantung koroner sama dengan orang yang tidak pernah merokok.',
    // respiratory
    'Rokok menyebabkan hingga 80% kematian akibat PPOK (Penyakit Paru Obstruktif Kronik).',
    '75% kasus PPOK terjadi pada orang dengan riwayat merokok.',
    'Asap rokok menyempitkan saluran napas, menyebabkan pembengkakan, dan merusak kantung udara. kerusakan yang sebagian besar bersifat permanen.',
    'Merokok di masa kanak-kanak dan remaja dapat menghambat pertumbuhan paru-paru dan meningkatkan risiko PPOK saat dewasa.',
    'WHO memperkirakan tembakau menyebabkan lebih dari 1 juta kematian akibat penyakit pernapasan kronik setiap tahunnya.',
    // economic
    'Tembakau menguras ekonomi global sebesar US$1,4 triliun setiap tahun dalam biaya kesehatan dan hilangnya produktivitas.',
    'Biaya nyata sosial dari sebungkus rokok diperkirakan jauh melebihi harga jualnya saat dikaitkan dengan biaya kesehatan jangka panjang.',
    'Uang yang kamu hemat dengan berhenti merokok bisa mencapai jutaan rupiah per tahun. cukup untuk liburan atau dana darurat.',
    'Selain rokok, perokok juga menanggung biaya kesehatan lebih tinggi. premi asuransi, biaya dokter, dan obat-obatan.',
    // addiction
    'Nikotin mencapai otak dalam 10 detik setelah dihirup, memicu siklus hadiah yang cepat dan mendorong penggunaan berulang.',
    'Kecanduan nikotin dianggap sama kuatnya dengan kecanduan kokain atau alkohol. dan bagi banyak orang, lebih sulit diatasi.',
    'Hanya sekitar 6% perokok berhasil berhenti secara mandiri tanpa bantuan dalam satu tahun.',
    'Sekitar 50% perokok mencoba berhenti setiap tahun, tetapi kurang dari 1 dari 10 berhasil secara permanen.',
    'Gejala putus nikotin. mudah marah, cemas, depresi, insomnia, dan nafsu makan meningkat. bisa muncul hanya dalam beberapa jam setelah rokok terakhir.',
    '1 dari 5 orang dewasa di seluruh dunia masih kecanduan tembakau menurut laporan tren tembakau WHO 2025.',
    '80% dari 1,3 miliar pengguna tembakau di dunia tinggal di negara berpenghasilan rendah dan menengah.',
    // secondhand
    'Asap rokok pasif menyebabkan lebih dari 41.000 kematian di AS setiap tahun, termasuk ribuan bukan perokok.',
    'Sekitar 430 bayi meninggal karena SIDS setiap tahun di AS akibat paparan asap rokok pasif.',
    'Asap rokok pasif menyebabkan 202.300 episode asma dan 790.000 kunjungan dokter untuk infeksi telinga anak di AS setiap tahunnya.',
    'Bukan perokok yang terpapar asap rokok pasif memiliki risiko 20–30% lebih tinggi terkena kanker paru.',
    'Setidaknya 500 juta anak di seluruh dunia terpapar asap rokok pasif di dalam rumah mereka sendiri.',
    'Tidak ada level aman dari paparan asap rokok pasif. bahkan paparan singkat pun dapat merusak sistem kardiovaskular.',
    // recovery
    'Dalam 20 menit setelah berhenti: detak jantung dan tekanan darah mulai turun ke level normal.',
    'Dalam 12 jam setelah berhenti: kadar karbon monoksida dalam darah kembali normal.',
    'Dalam 2 minggu hingga 3 bulan: risiko serangan jantung mulai turun dan fungsi paru-paru meningkat.',
    'Dalam 1–9 bulan: batuk dan sesak napas berkurang seiring rambut getar paru-paru mulai tumbuh kembali.',
    'Setelah 1 tahun: risiko tambahan penyakit jantung koroner turun menjadi setengah risiko perokok aktif.',
    'Setelah 5–10 tahun: risiko stroke turun ke level bukan perokok. Risiko kanker mulut, tenggorokan, dan laring berkurang 50%.',
    'Setelah 10 tahun: angka kematian akibat kanker paru turun menjadi sekitar setengah perokok aktif.',
    'Setelah 15 tahun: risiko jantung koroner sama dengan orang yang tidak pernah merokok seumur hidup.',
    'Berhenti merokok sebelum usia 40 tahun mengurangi risiko kematian akibat penyakit terkait rokok hingga 90%.',
    // chemicals
    'Asap rokok mengandung lebih dari 7.000 bahan kimia. Setidaknya 69 di antaranya terbukti menyebabkan kanker.',
    'Rokok mengandung formaldehida (cairan pengawet mayat), arsenik (racun tikus), benzena (bahan bakar minyak), dan kadmium (bahan baterai).',
    'Rokok mengandung unsur radioaktif. termasuk polonium-210 dan uranium-235. yang terserap dari pupuk pertanian tembakau.',
    'Rokok mengandung vinil klorida (bahan plastik PVC), timbal, nikel, dan hidrazin. semua terbukti bersifat karsinogen.',
    'Setiap kali kamu menghirup asap rokok, bahan kimia tersebut memasuki aliran darah dan dikirim ke setiap organ tubuh dalam hitungan detik.',
    'Nitrosamin spesifik tembakau (TSNA) dalam rokok disebut sebagai "beberapa senyawa penyebab kanker paling kuat yang pernah diketahui."',
    // lifeExpectancy
    'Perokok rata-rata hidup setidaknya 10 tahun lebih pendek dibandingkan bukan perokok.',
    'Merokok membunuh lebih dari 480.000 orang di AS setiap tahun. lebih banyak dari AIDS, alkohol, kecelakaan, narkoba, pembunuhan, dan bunuh diri digabungkan.',
    'Tembakau membunuh lebih dari 8 juta orang di seluruh dunia setiap tahun. Lebih dari 1,3 juta di antaranya adalah bukan perokok yang terpapar asap rokok.',
    'Tembakau membunuh hingga separuh dari seluruh penggunanya.',
    'Berhenti merokok di usia 30 tahun menambah hampir 10 tahun harapan hidup. Berhenti di usia 40 menambah sekitar 9 tahun.',
    // mentalHealth
    '27,2% orang dewasa dengan gangguan kesehatan mental merokok. dibandingkan 15,8% orang dewasa tanpa gangguan mental.',
    '2 dari 3 orang dengan gangguan kesehatan mental berat adalah perokok aktif.',
    'Berhenti merokok meningkatkan kesehatan mental: penelitian menunjukkan penurunan depresi, kecemasan, dan stres. dengan efek setara mengonsumsi antidepresan.',
    'Meski nikotin sementara meredakan stres, ia justru memperburuk kecemasan dan depresi jangka panjang dengan menciptakan siklus ketergantungan kimiawi.',
    'Orang dengan gangguan mental berat rata-rata meninggal 15–20 tahun lebih awal, dengan tembakau sebagai penyebab utamanya.',
  ],
  en: [
    // cancer
    '80–90% of lung cancer deaths are caused by smoking.',
    'Smokers are 15–30 times more likely to develop or die from lung cancer than non-smokers.',
    'Smoking causes 30% of all cancer deaths each year.',
    'Smoking drives 12 cancer types: lung, mouth, throat, esophagus, stomach, kidney, bladder, cervix, pancreas, colon, liver, and leukemia.',
    '50% of bladder cancers are caused by smoking — the single largest risk factor.',
    'Smokers are 2–4× more likely to develop pancreatic cancer than non-smokers.',
    '10–15 years after quitting, lung cancer risk drops to half that of continuing smokers.',
    '5–10 years after quitting, mouth, throat, and larynx cancer risk drops by up to 50%.',
    // cardiovascular
    'Smoking raises coronary heart disease risk by 2–4 times.',
    'Smoking raises stroke risk by 2–4 times compared to non-smokers.',
    'Smoking causes 1 in every 4 cardiovascular deaths.',
    'Even smoking fewer than 5 cigarettes a day already produces early signs of cardiovascular disease.',
    'Tobacco causes around 1.9 million coronary heart disease deaths globally each year.',
    'Non-smokers exposed to secondhand smoke at home or work have a 25–30% higher heart disease risk.',
    'Just 1 year after quitting, the added coronary heart disease risk is cut in half.',
    '15 years after quitting, coronary heart disease risk equals that of someone who never smoked.',
    // respiratory
    'Smoking causes up to 80% of COPD (Chronic Obstructive Pulmonary Disease) deaths.',
    '75% of COPD cases occur in people with a smoking history.',
    'Smoke narrows airways, causes swelling, and damages air sacs — much of it permanently.',
    'Smoking in childhood and adolescence can stunt lung growth and raise adult COPD risk.',
    'WHO estimates tobacco causes more than 1 million chronic respiratory deaths each year.',
    // economic
    'Tobacco drains the global economy by US$1.4 trillion per year in health costs and lost productivity.',
    'The true social cost of a pack of cigarettes is estimated far above its price once long-term health costs are counted.',
    'The money you save by quitting can reach millions of rupiah per year — enough for a holiday or emergency fund.',
    'Beyond cigarettes, smokers also bear higher health costs: insurance premiums, doctor visits, and medication.',
    // addiction
    'Nicotine reaches the brain within 10 seconds of inhalation, triggering a fast reward cycle that drives repeated use.',
    'Nicotine addiction is considered as strong as cocaine or alcohol — and for many people, harder to overcome.',
    'Only about 6% of smokers successfully quit on their own without help within a year.',
    'About 50% of smokers try to quit every year, but fewer than 1 in 10 succeed long-term.',
    'Nicotine withdrawal symptoms — irritability, anxiety, depression, insomnia, and increased appetite — can appear within hours of the last cigarette.',
    '1 in 5 adults worldwide is still addicted to tobacco, per the WHO 2025 tobacco trend report.',
    '80% of the world\'s 1.3 billion tobacco users live in low- and middle-income countries.',
    // secondhand
    'Secondhand smoke causes more than 41,000 deaths in the US each year, including thousands of non-smokers.',
    'About 430 infants die of SIDS each year in the US due to secondhand smoke exposure.',
    'Secondhand smoke causes 202,300 asthma episodes and 790,000 doctor visits for childhood ear infections in the US annually.',
    'Non-smokers exposed to secondhand smoke have a 20–30% higher lung cancer risk.',
    'At least 500 million children worldwide are exposed to secondhand smoke inside their own homes.',
    'There is no safe level of secondhand smoke — even brief exposure can damage the cardiovascular system.',
    // recovery
    'Within 20 minutes of quitting: heart rate and blood pressure start dropping toward normal.',
    'Within 12 hours of quitting: carbon monoxide levels in the blood return to normal.',
    'Within 2 weeks to 3 months: heart attack risk starts to fall and lung function improves.',
    'Within 1–9 months: coughing and shortness of breath decrease as lung cilia begin regrowing.',
    'After 1 year: the added coronary heart disease risk is half that of an active smoker.',
    'After 5–10 years: stroke risk falls to non-smoker levels. Mouth, throat, and larynx cancer risk drops by 50%.',
    'After 10 years: lung cancer mortality falls to about half that of active smokers.',
    'After 15 years: coronary heart disease risk equals that of someone who never smoked.',
    'Quitting before age 40 reduces the risk of death from smoking-related disease by 90%.',
    // chemicals
    'Cigarette smoke contains more than 7,000 chemicals. At least 69 are proven to cause cancer.',
    'Cigarettes contain formaldehyde (embalming fluid), arsenic (rat poison), benzene (fuel), and cadmium (battery material).',
    'Cigarettes contain radioactive elements — including polonium-210 and uranium-235 — absorbed from tobacco fertilizers.',
    'Cigarettes contain vinyl chloride (PVC plastic), lead, nickel, and hydrazine — all proven carcinogens.',
    'Every time you inhale smoke, those chemicals enter your bloodstream and reach every organ within seconds.',
    'Tobacco-specific nitrosamines (TSNAs) in cigarettes are described as "some of the most potent known cancer-causing compounds."',
    // lifeExpectancy
    'Smokers live on average at least 10 years less than non-smokers.',
    'Smoking kills more than 480,000 people in the US each year — more than AIDS, alcohol, accidents, drugs, murder, and suicide combined.',
    'Tobacco kills more than 8 million people worldwide every year. More than 1.3 million of them are non-smokers exposed to smoke.',
    'Tobacco kills up to half of all its users.',
    'Quitting at age 30 adds nearly 10 years of life expectancy. Quitting at age 40 adds about 9 years.',
    // mentalHealth
    '27.2% of adults with mental health conditions smoke, compared to 15.8% without.',
    '2 out of 3 people with severe mental illness are active smokers.',
    'Quitting improves mental health: research shows drops in depression, anxiety, and stress — effects comparable to taking antidepressants.',
    'While nicotine briefly relieves stress, it actually worsens long-term anxiety and depression by creating chemical dependency loops.',
    'People with severe mental illness die on average 15–20 years earlier, with tobacco as the leading cause.',
  ],
}

function resolveUrl(source: string): string {
  return smokingSourceUrls[source] ?? smokingSourceUrls['WHO']
}

export function getSmokingFacts(locale: Locale): Fact[] {
  const texts = FACT_TEXT[locale] ?? FACT_TEXT.id
  return FACT_BASE.map((b, i) => ({
    fact: texts[i],
    source: b.source,
    sourceUrl: resolveUrl(b.source),
    category: b.category,
  }))
}
