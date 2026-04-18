import type { Locale } from '@/i18n/types'
import type { CategoryMeta, Fact } from '../types'

export const pornSourceUrls: Record<string, string> = {
  'WHO ICD-11':    'https://icd.who.int/browse11/l-m/en#/http%3A%2F%2Fid.who.int%2Ficd%2Fentity%2F1630268048',
  'Kraus et al.':  'https://pubmed.ncbi.nlm.nih.gov/27059499/',
  'Voon et al.':   'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0102419',
  'Park et al.':   'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5039517/',
  'Bandura':       'https://www.uky.edu/~eushe2/Bandura/Bandura1977PR.pdf',
  'Grubbs et al.': 'https://pubmed.ncbi.nlm.nih.gov/31916747/',
  'APA':           'https://www.apa.org/topics/behavioral-addictions',
  'Gollwitzer':    'https://www.psych.nyu.edu/gollwitzer/99Goll_ImpInt.pdf',
  'Neff':          'https://self-compassion.org/self-compassion-theory/',
  'Lembke':        'https://www.annalembke.com/',
}

type CategoryBase = Omit<CategoryMeta, 'label' | 'description'>
type CategoryText = { label: string; description: string }

const CATEGORY_BASE: Record<string, CategoryBase> = {
  compulsive:   { emoji: '🌀', color: 'var(--green-mid)',     bg: 'var(--green-pale)',    border: 'var(--green-tint)'    },
  brain:        { emoji: '🧠', color: 'var(--coral-mid)',     bg: 'var(--coral-pale)',    border: 'var(--coral-tint)'    },
  focus:        { emoji: '🎯', color: 'var(--lavender)',      bg: 'var(--lavender-pale)', border: 'var(--lavender-tint)' },
  relationship: { emoji: '💞', color: '#C0392B',              bg: '#FFF0F0',              border: '#FFCDD2'              },
  sleep:        { emoji: '😴', color: 'var(--lavender)',      bg: 'var(--lavender-pale)', border: 'var(--lavender-tint)' },
  recovery:     { emoji: '🌱', color: 'var(--green-dark)',    bg: 'var(--green-pale)',    border: 'var(--green-tint)'    },
  selfmastery:  { emoji: '🕊️', color: 'var(--amber-strong)',  bg: 'var(--amber-pale)',    border: 'var(--amber-tint)'    },
  timeeconomy:  { emoji: '⏳', color: '#E65100',              bg: '#FFF3E0',              border: '#FFD0A0'              },
}

const CATEGORY_TEXT: Record<Locale, Record<string, CategoryText>> = {
  id: {
    compulsive:   { label: 'Kebiasaan Kompulsif', description: 'WHO ICD-11 (2022) mengklasifikasikan Compulsive Sexual Behavior Disorder (CSBD) sebagai gangguan kontrol impuls. CSBD ditandai kegagalan berulang mengendalikan perilaku seksual intens meski sudah berusaha — bukan soal moral, tapi soal fungsi eksekutif yang bisa dilatih kembali.' },
    brain:        { label: 'Otak & Reward',       description: 'Penelitian fMRI (Voon et al. 2014) menunjukkan individu dengan perilaku seksual kompulsif memiliki respons sistem reward yang mirip pola pada gangguan adiktif lain. Ini menjelaskan mengapa berhenti terasa sulit — dan mengapa otak bisa beradaptasi kembali dengan waktu dan praktik.' },
    focus:        { label: 'Fokus & Energi',      description: 'Perilaku kompulsif menghabiskan bandwidth kognitif — riset self-regulation (Baumeister) menunjukkan kontrol diri adalah sumber daya terbatas yang terkuras oleh konflik internal. Mengurangi beban ini membebaskan fokus untuk hal-hal yang kamu pilih sadar.' },
    relationship: { label: 'Hubungan',            description: 'Studi kepuasan pasangan (systematic reviews) menemukan penggunaan pornografi berfrekuensi tinggi berkorelasi dengan ekspektasi tidak realistis, penurunan kepuasan seksual dengan pasangan, dan intimacy yang lebih dangkal — meski efeknya bervariasi per individu.' },
    sleep:        { label: 'Tidur & Energi',      description: 'Pola penggunaan malam hari mengganggu sleep onset dan kualitas REM. Pergeseran ke tidur yang lebih awal dan bersih konsisten dilaporkan memperbaiki mood, fokus, dan energi pagi hari.' },
    recovery:     { label: 'Pemulihan',           description: 'Self-efficacy theory (Bandura 1977) menunjukkan setiap periode abstinen membangun keyakinan bahwa perilaku bisa dikendalikan. Kepercayaan ini, yang muncul dari bukti pengalaman, adalah prediktor terkuat keberhasilan jangka panjang.' },
    selfmastery:  { label: 'Kendali Diri',        description: 'Grubbs et al. (2020) menekankan pentingnya kerangka "moral incongruence" — konflik antara nilai dan perilaku lebih memprediksi distres daripada frekuensi itu sendiri. Menyelaraskan tindakan dengan nilai mengurangi ketegangan internal.' },
    timeeconomy:  { label: 'Waktu & Energi',      description: 'Setiap sesi + waktu pemulihan & distraksi biasanya menghabiskan 20–45 menit. Dalam skala bulanan, ini menjadi puluhan jam yang bisa dialokasikan untuk hubungan, keterampilan, atau istirahat yang benar-benar mengisi energi.' },
  },
  en: {
    compulsive:   { label: 'Compulsive Habit',    description: 'WHO ICD-11 (2022) classifies Compulsive Sexual Behavior Disorder (CSBD) as an impulse-control disorder. CSBD is marked by repeated failure to control intense sexual behavior despite effort — not a moral issue, but an executive-function one that can be retrained.' },
    brain:        { label: 'Brain & Reward',      description: 'fMRI research (Voon et al. 2014) shows individuals with compulsive sexual behavior have reward-system responses similar to patterns in other addictive disorders. This explains why stopping feels hard — and why the brain can re-adapt with time and practice.' },
    focus:        { label: 'Focus & Energy',      description: 'Compulsive behavior consumes cognitive bandwidth — self-regulation research (Baumeister) shows self-control is a limited resource drained by internal conflict. Reducing that load frees focus for things you consciously choose.' },
    relationship: { label: 'Relationships',       description: 'Partner-satisfaction studies (systematic reviews) find that high-frequency porn use correlates with unrealistic expectations, reduced sexual satisfaction with a partner, and shallower intimacy — though effects vary by individual.' },
    sleep:        { label: 'Sleep & Energy',      description: 'Nighttime use disrupts sleep onset and REM quality. Shifting to earlier, cleaner sleep consistently reports better mood, focus, and morning energy.' },
    recovery:     { label: 'Recovery',            description: 'Self-efficacy theory (Bandura 1977) shows each abstinent period builds belief that behavior can be controlled. This belief, grounded in experiential evidence, is the strongest predictor of long-term success.' },
    selfmastery:  { label: 'Self-Mastery',        description: 'Grubbs et al. (2020) emphasize the "moral incongruence" frame — conflict between values and behavior predicts distress more than frequency itself. Aligning action with values reduces internal tension.' },
    timeeconomy:  { label: 'Time & Energy',       description: 'Each session plus recovery and distraction time typically takes 20–45 minutes. On a monthly scale that becomes dozens of hours that could go to relationships, skills, or rest that actually restores energy.' },
  },
}

const CATEGORIES = Object.keys(CATEGORY_BASE)

export function getPornCategoryMeta(locale: Locale): Record<string, CategoryMeta> {
  const out: Record<string, CategoryMeta> = {}
  const text = CATEGORY_TEXT[locale] ?? CATEGORY_TEXT.id
  for (const key of CATEGORIES) out[key] = { ...CATEGORY_BASE[key], ...text[key] }
  return out
}

type FactBase = { source: string; category: string }

const FACT_BASE: FactBase[] = [
  // compulsive (7)
  { source: 'WHO ICD-11',    category: 'compulsive' },
  { source: 'WHO ICD-11',    category: 'compulsive' },
  { source: 'Kraus et al.',  category: 'compulsive' },
  { source: 'WHO ICD-11',    category: 'compulsive' },
  { source: 'WHO ICD-11',    category: 'compulsive' },
  { source: 'Kraus et al.',  category: 'compulsive' },
  { source: 'Grubbs et al.', category: 'compulsive' },
  // brain (8)
  { source: 'Voon et al.',   category: 'brain' },
  { source: 'APA',           category: 'brain' },
  { source: 'Kraus et al.',  category: 'brain' },
  { source: 'Park et al.',   category: 'brain' },
  { source: 'Lembke',        category: 'brain' },
  { source: 'APA',           category: 'brain' },
  { source: 'Lembke',        category: 'brain' },
  { source: 'Voon et al.',   category: 'brain' },
  // focus (6)
  { source: 'APA',           category: 'focus' },
  { source: 'Kraus et al.',  category: 'focus' },
  { source: 'APA',           category: 'focus' },
  { source: 'APA',           category: 'focus' },
  { source: 'Kraus et al.',  category: 'focus' },
  { source: 'Lembke',        category: 'focus' },
  // relationship (6)
  { source: 'Park et al.',   category: 'relationship' },
  { source: 'Grubbs et al.', category: 'relationship' },
  { source: 'Grubbs et al.', category: 'relationship' },
  { source: 'Grubbs et al.', category: 'relationship' },
  { source: 'APA',           category: 'relationship' },
  { source: 'Kraus et al.',  category: 'relationship' },
  // sleep (5)
  { source: 'APA',           category: 'sleep' },
  { source: 'Kraus et al.',  category: 'sleep' },
  { source: 'Park et al.',   category: 'sleep' },
  { source: 'APA',           category: 'sleep' },
  { source: 'APA',           category: 'sleep' },
  // recovery (7)
  { source: 'Bandura',       category: 'recovery' },
  { source: 'APA',           category: 'recovery' },
  { source: 'Kraus et al.',  category: 'recovery' },
  { source: 'Kraus et al.',  category: 'recovery' },
  { source: 'Neff',          category: 'recovery' },
  { source: 'APA',           category: 'recovery' },
  { source: 'Lembke',        category: 'recovery' },
  // selfmastery (6)
  { source: 'Grubbs et al.', category: 'selfmastery' },
  { source: 'Bandura',       category: 'selfmastery' },
  { source: 'APA',           category: 'selfmastery' },
  { source: 'Gollwitzer',    category: 'selfmastery' },
  { source: 'APA',           category: 'selfmastery' },
  { source: 'Kraus et al.',  category: 'selfmastery' },
  // timeeconomy (5)
  { source: 'Park et al.',   category: 'timeeconomy' },
  { source: 'APA',           category: 'timeeconomy' },
  { source: 'Kraus et al.',  category: 'timeeconomy' },
  { source: 'APA',           category: 'timeeconomy' },
  { source: 'Grubbs et al.', category: 'timeeconomy' },
]

const FACT_TEXT: Record<Locale, string[]> = {
  id: [
    // compulsive
    'WHO ICD-11 (2022) mengakui Compulsive Sexual Behavior Disorder sebagai gangguan kontrol impuls — bukan diagnosis moral.',
    'CSBD didefinisikan sebagai kegagalan berulang mengendalikan perilaku seksual intens yang menyebabkan distres — bukan sekadar frekuensi tinggi.',
    'Karakteristik utama: perilaku terus berlanjut meski ada konsekuensi negatif dan keinginan sadar untuk berhenti.',
    'CSBD diklasifikasikan bersama kleptomania dan pyromania — gangguan kontrol impuls, bukan gangguan adiktif formal.',
    'Diagnosis klinis membutuhkan pola minimal 6 bulan, distres yang signifikan, dan gangguan fungsi sosial/pekerjaan.',
    'Studi epidemiologi memperkirakan prevalensi CSBD 3–5% pada populasi dewasa, dengan rasio laki-laki sekitar 3:1 lebih tinggi.',
    '"Frekuensi tinggi" bukan sama dengan CSBD — yang menentukan adalah distres dan ketidakmampuan mengontrol meski sudah berusaha.',
    // brain
    'Voon et al. (2014) menemukan aktivasi sistem reward pada individu CSBD saat melihat stimulus, mirip pola pada gangguan adiktif.',
    'Otak adalah organ plastis — sirkuit kebiasaan bisa melemah jika tidak diaktifkan secara rutin (neuroplasticity principle).',
    'Dorongan otomatis biasanya memuncak dalam 3–5 menit dan mereda — bukan krisis yang harus diselesaikan, tapi gelombang untuk dilewati.',
    'Reviewer sistematis (Park et al. 2016) menemukan laporan klinis konsisten tentang efek negatif penggunaan berat pada fungsi eksekutif dan regulasi mood.',
    '"Pleasure-pain balance" (Lembke): setiap lonjakan dopamin tinggi diikuti defisit yang setara. Abstinensi membiarkan baseline pulih sehingga aktivitas sehari-hari terasa memuaskan lagi.',
    'Prefrontal cortex (area kontrol diri) menguat seperti otot — setiap kali kamu memilih berhenti sebelum slip, jalur syarafnya menguat.',
    'Reward prediction error menjelaskan mengapa eskalasi terasa "perlu" — otak membandingkan dengan stimulus tertinggi sebelumnya lalu menuntut lebih untuk respons yang sama.',
    'Coolidge effect (pencarian kebaruan) adalah mekanisme biologis yang dapat dilatih ulang melalui abstinensi dan diversifikasi aktivitas non-stimulus.',
    // focus
    'Self-regulation research (Baumeister) menunjukkan konflik internal menguras "willpower" — menyelaraskan tindakan dengan nilai membebaskan energi mental.',
    'Individu yang melaporkan penggunaan kompulsif juga sering melaporkan penurunan konsentrasi dan rumination — yang biasanya membaik dengan abstinensi.',
    'Waktu layar malam hari berkorelasi dengan penurunan kualitas tidur, yang langsung mempengaruhi fokus keesokan harinya.',
    'Context-switching dari konten kompulsif kembali ke pekerjaan memakan biaya produktivitas 20+ menit menurut riset biaya interupsi.',
    'Self-report pasien CSBD secara konsisten melaporkan peningkatan konsentrasi & energi mental dalam 2–4 minggu pertama abstinensi.',
    'Paparan stimulus tinggi kronis menurunkan dopamine baseline sementara — tugas "biasa" terasa kurang menarik sampai baseline pulih.',
    // relationship
    'Review sistematik terhadap studi kepuasan pasangan menemukan konsumsi pornografi frekuensi tinggi berkorelasi dengan penurunan kepuasan hubungan pada sebagian individu.',
    'Efek pada hubungan bervariasi: konteks konsumsi (bersama pasangan vs sendiri) dan komunikasi terbuka adalah faktor moderator penting.',
    'Menyelaraskan perilaku dengan nilai bersama pasangan mengurangi "moral incongruence" yang menjadi sumber utama distres.',
    'Disclosure yang aman dan dialog terbuka dengan pasangan mengurangi distres relational lebih efektif daripada abstinensi diam-diam.',
    'Riset keintiman: kerentanan (vulnerability) — bukan performa — memprediksi kepuasan relational jangka panjang.',
    'Rekoneksi dengan pasangan memerlukan waktu — banyak klinik melaporkan 3–6 bulan sebelum baseline keintiman baru terbentuk.',
    // sleep
    'Penggunaan di malam hari menunda sleep onset dan mengurangi fase REM — bukan hanya karena layar, tapi juga karena arousal mental pasca-sesi.',
    'Mood dan energi pagi hari secara konsisten meningkat setelah 1–2 minggu abstinen, menurut laporan self-report dalam klinik CSBD.',
    'Penggunaan malam rata-rata menunda sleep onset 30–45 menit dalam studi pengguna — waktu yang langsung terpotong dari tidur restoratif.',
    'REM sleep adalah "emotional reset" tubuh — mengganggu fase ini memperkuat dorongan dan emosi negatif keesokan harinya.',
    'Device-free bedroom adalah intervensi lingkungan dengan dampak tertinggi pada kualitas tidur pengguna kompulsif.',
    // recovery
    'Self-efficacy theory (Bandura 1977): setiap periode abstinen membangun bukti pengalaman bahwa kontrol itu mungkin — memperkuat kontrol berikutnya.',
    'Pola pikir "abstinence violation effect" — satu slip jadi alasan menyerah total — adalah jebakan terbesar. Setiap slip hanya bagian dari kurva belajar.',
    'Accountability partner atau terapi CBT meningkatkan probabilitas sustained abstinence secara signifikan dibanding berhenti sendiri.',
    'Kumulatif abstinensi (total hari bebas sepanjang perjalanan) memprediksi outcome jangka panjang lebih baik daripada streak tanpa slip.',
    'Self-compassion saat slip memprediksi recovery lebih cepat daripada self-criticism (riset Kristin Neff) — kebaikan pada diri bukan kompromi.',
    'CBT (Cognitive Behavioral Therapy) dan ACT (Acceptance Commitment Therapy) memiliki bukti efektivitas untuk CSBD dalam penelitian klinis.',
    '90 hari adalah milestone klinis umum, tapi otak & tubuh terus beradaptasi jauh setelahnya — recovery adalah proses berkelanjutan, bukan tujuan tetap.',
    // selfmastery
    'Grubbs et al. (2020): "moral incongruence" — konflik antara nilai dan perilaku — lebih memprediksi distres daripada frekuensi perilaku itu sendiri.',
    'Menentukan "mengapa" yang personal (kesehatan, hubungan, fokus, spiritual) lebih kuat daripada aturan eksternal "jangan".',
    'Reframe dari "aku harus menahan diri" menjadi "aku memilih hal lain yang aku hargai" mengubah perjuangan jadi afirmasi nilai.',
    'Implementation intentions Gollwitzer ("Jika X terjadi, aku akan Y") menggandakan keberhasilan mengikuti rencana perilaku.',
    'Values-based commitment (ACT) lebih kuat daripada willpower resistance — kamu melawan dengan identitas, bukan dengan penolakan.',
    'Accountability partner meningkatkan sustained abstinence 2–3 kali lipat menurut outcome studies klinis CSBD.',
    // timeeconomy
    'Setiap sesi rata-rata memakan 20–45 menit termasuk pemulihan dan distraksi mental — puluhan jam sebulan untuk pengguna rutin.',
    'Waktu yang reclaimed bisa direalokasikan ke hubungan, olahraga, hobi, atau istirahat — aktivitas yang benar-benar mengisi energi alih-alih menguras.',
    'Survey klinis: pengguna dengan kriteria CSBD rata-rata menghabiskan 11–20 jam per minggu pada aktivitas terkait (termasuk pencarian & pemulihan).',
    'Reinvestasi waktu ke koneksi sosial nyata menghasilkan peningkatan mood lebih besar daripada aktivitas solo — kunci recovery berkelanjutan.',
    'Waktu berkualitas dengan pasangan atau keluarga mengisi kebutuhan emosional yang sering disalurkan ke perilaku kompulsif.',
  ],
  en: [
    // compulsive
    'WHO ICD-11 (2022) recognizes Compulsive Sexual Behavior Disorder as an impulse-control disorder — not a moral diagnosis.',
    'CSBD is defined as repeated failure to control intense sexual behavior that causes distress — not merely high frequency.',
    'Key feature: behavior continues despite negative consequences and a conscious desire to stop.',
    'CSBD sits alongside kleptomania and pyromania — impulse-control disorders, not formal addictive disorders.',
    'Clinical diagnosis requires a pattern of at least 6 months, significant distress, and impaired social/work function.',
    'Epidemiological studies estimate CSBD prevalence at 3–5% in adults, with men at roughly 3:1 higher rate.',
    '"High frequency" doesn\'t equal CSBD — what matters is distress and inability to control despite trying.',
    // brain
    'Voon et al. (2014) found reward-system activation in CSBD individuals viewing stimuli, similar to patterns in addictive disorders.',
    'The brain is plastic — habit circuits can weaken when not regularly activated (neuroplasticity principle).',
    'Automatic urges usually peak in 3–5 minutes and ease — not a crisis to solve, but a wave to ride out.',
    'Systematic reviewers (Park et al. 2016) found consistent clinical reports of negative effects from heavy use on executive function and mood regulation.',
    '"Pleasure-pain balance" (Lembke): every high dopamine spike is followed by an equivalent deficit. Abstinence lets the baseline recover so ordinary activities feel satisfying again.',
    'The prefrontal cortex (self-control area) strengthens like a muscle — each time you choose to stop before a slip, the neural pathway strengthens.',
    'Reward prediction error explains why escalation feels "needed" — the brain compares to the highest prior stimulus then demands more for the same response.',
    'The Coolidge effect (novelty-seeking) is a biological mechanism that can be retrained through abstinence and diversifying non-stimulus activities.',
    // focus
    'Self-regulation research (Baumeister) shows internal conflict drains "willpower" — aligning action with values frees mental energy.',
    'People reporting compulsive use often also report reduced concentration and rumination — which usually improves with abstinence.',
    'Nighttime screen time correlates with reduced sleep quality, which directly affects next-day focus.',
    'Context-switching from compulsive content back to work costs 20+ minutes in productivity per interruption research.',
    'Self-reports from CSBD patients consistently show improved concentration and mental energy within the first 2–4 weeks of abstinence.',
    'Chronic exposure to high stimulus temporarily lowers dopamine baseline — ordinary tasks feel less engaging until baseline recovers.',
    // relationship
    'A systematic review of partner satisfaction studies found high-frequency porn use correlates with reduced relationship satisfaction in some individuals.',
    'Relationship effects vary: consumption context (with a partner vs. alone) and open communication are important moderating factors.',
    'Aligning behavior with shared values reduces the "moral incongruence" that is a major source of distress.',
    'Safe disclosure and open dialogue with a partner reduce relational distress more effectively than silent abstinence.',
    'Intimacy research: vulnerability — not performance — predicts long-term relational satisfaction.',
    'Reconnection with a partner takes time — many clinics report 3–6 months before a new intimacy baseline forms.',
    // sleep
    'Nighttime use delays sleep onset and reduces REM — not only due to screen time but also due to post-session mental arousal.',
    'Morning mood and energy consistently improve after 1–2 weeks of abstinence, per self-report in CSBD clinics.',
    'Nighttime use delays sleep onset by 30–45 minutes on average in user studies — time cut directly from restorative sleep.',
    'REM sleep is the body\'s "emotional reset" — disrupting it reinforces urges and negative emotions the next day.',
    'A device-free bedroom is the environmental intervention with the highest impact on sleep quality in compulsive users.',
    // recovery
    'Self-efficacy theory (Bandura 1977): each abstinent period builds experiential evidence that control is possible — strengthening the next.',
    'The "abstinence violation effect" mindset — one slip becoming a reason to give up entirely — is the biggest trap. Every slip is just part of the learning curve.',
    'An accountability partner or CBT therapy significantly raises the probability of sustained abstinence vs. quitting alone.',
    'Cumulative abstinence (total free days across the journey) predicts long-term outcome better than streak without a slip.',
    'Self-compassion during slips predicts faster recovery than self-criticism (Kristin Neff) — kindness to yourself isn\'t a compromise.',
    'CBT (Cognitive Behavioral Therapy) and ACT (Acceptance Commitment Therapy) have clinical evidence of effectiveness for CSBD.',
    '90 days is a common clinical milestone, but brain & body keep adapting well beyond — recovery is an ongoing process, not a fixed destination.',
    // selfmastery
    'Grubbs et al. (2020): "moral incongruence" — conflict between values and behavior — predicts distress more than the behavior frequency itself.',
    'Defining a personal "why" (health, relationships, focus, spiritual) is stronger than external "don\'t" rules.',
    'Reframing from "I must resist" to "I choose something else I value" turns struggle into a values affirmation.',
    'Gollwitzer\'s implementation intentions ("If X happens, I\'ll Y") double the success rate of following a behavior plan.',
    'Values-based commitment (ACT) is stronger than willpower resistance — you counter with identity, not refusal.',
    'An accountability partner raises sustained abstinence by 2–3× per CSBD clinical outcome studies.',
    // timeeconomy
    'Each session averages 20–45 minutes including recovery and mental distraction — dozens of hours a month for regular users.',
    'Reclaimed time can be redirected to relationships, exercise, hobbies, or rest — activities that actually restore energy instead of draining it.',
    'Clinical survey: users meeting CSBD criteria spend on average 11–20 hours per week on related activity (including searching and recovery).',
    'Reinvesting time into real social connection produces a bigger mood improvement than solo activities — key to sustained recovery.',
    'Quality time with a partner or family fills the emotional needs often routed into compulsive behavior.',
  ],
}

function resolveUrl(source: string): string {
  return pornSourceUrls[source] ?? pornSourceUrls['APA']
}

export function getPornFacts(locale: Locale): Fact[] {
  const texts = FACT_TEXT[locale] ?? FACT_TEXT.id
  return FACT_BASE.map((b, i) => ({
    fact: texts[i],
    source: b.source,
    sourceUrl: resolveUrl(b.source),
    category: b.category,
  }))
}
