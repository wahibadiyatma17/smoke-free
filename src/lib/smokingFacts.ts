export interface SmokingFact {
  fact: string
  source: string
  sourceUrl: string
  category: keyof typeof categoryMeta
}

export const sourceUrls: Record<string, string> = {
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
}

export const categoryMeta = {
  cancer:        { label: 'Kanker',            emoji: '🔬', color: 'var(--coral-mid)',   bg: 'var(--coral-pale)',   border: 'var(--coral-tint)', description: 'Rokok adalah penyebab utama kanker di seluruh dunia. Zat karsinogen dalam asap rokok merusak DNA sel dan memicu pertumbuhan tumor ganas, tidak hanya di paru-paru tetapi juga di mulut, tenggorokan, esofagus, lambung, pankreas, ginjal, kandung kemih, dan serviks.' },
  cardiovascular:{ label: 'Jantung & Pembuluh',emoji: '❤️', color: '#C0392B',           bg: '#FFF0F0',             border: '#FFCDD2',           description: 'Merokok merusak dinding pembuluh darah, mempercepat penumpukan plak (aterosklerosis), dan meningkatkan tekanan darah. Ini melipatgandakan risiko serangan jantung, stroke, dan gagal jantung. Bahkan perokok pasif pun terdampak signifikan.' },
  respiratory:   { label: 'Paru-paru',         emoji: '🫁', color: '#1565C0',           bg: '#E8F5FF',             border: '#B3DAFF',           description: 'Asap rokok menghancurkan silia (rambut halus pelindung saluran napas) dan merusak jaringan paru secara permanen. Penyakit seperti PPOK, emfisema, dan bronkitis kronis hampir seluruhnya disebabkan oleh kebiasaan merokok.' },
  economic:      { label: 'Kerugian Ekonomi',  emoji: '💸', color: 'var(--amber)',       bg: 'var(--amber-pale)',   border: 'var(--amber-tint)', description: 'Selain biaya rokok harian, perokok menanggung biaya medis jauh lebih tinggi sepanjang hidup mereka. Di Indonesia, jutaan rupiah bisa terselamatkan setiap tahun hanya dengan berhenti merokok, belum lagi produktivitas yang meningkat.' },
  addiction:     { label: 'Kecanduan Nikotin', emoji: '🧠', color: '#6A1B9A',           bg: '#F3E5FF',             border: '#DEB3FF',           description: 'Nikotin bekerja dengan memicu pelepasan dopamin di otak, menciptakan rasa nyaman yang membuatmu terus kembali. Kecanduan ini bersifat fisik dan psikologis, namun dengan dukungan yang tepat, otak bisa benar-benar pulih sepenuhnya.' },
  secondhand:    { label: 'Asap Rokok Pasif',  emoji: '💨', color: '#37474F',           bg: '#ECEFF1',             border: '#CFD8DC',           description: 'Asap rokok yang dihirup orang di sekitarmu mengandung lebih dari 70 zat karsinogen. Anak-anak yang terpapar asap rokok pasif berisiko tinggi mengalami asma, infeksi saluran napas, dan gangguan perkembangan otak.' },
  recovery:      { label: 'Pemulihan Tubuh',   emoji: '🌱', color: 'var(--green-dark)', bg: 'var(--green-pale)',   border: 'var(--green-tint)', description: 'Tubuh manusia memiliki kemampuan pemulihan luar biasa. Dalam 20 menit setelah berhenti merokok, detak jantung mulai normal. Dalam setahun, risiko penyakit jantung turun setengahnya. Dalam 10 tahun, risiko kanker paru berkurang drastis.' },
  chemicals:     { label: 'Zat Berbahaya',     emoji: '☠️', color: '#4E342E',           bg: '#EFEBE9',             border: '#D7CCC8',           description: 'Satu batang rokok mengandung lebih dari 7.000 bahan kimia. Setidaknya 69 di antaranya bersifat karsinogen (pemicu kanker), termasuk arsenik, benzena, formaldehida, dan timbal. Zat-zat ini masuk langsung ke aliran darahmu setiap kali kamu merokok.' },
  lifeExpectancy:{ label: 'Harapan Hidup',     emoji: '⏳', color: '#E65100',           bg: '#FFF3E0',             border: '#FFD0A0',           description: 'Rata-rata, setiap batang rokok mencuri 11 menit dari hidupmu. Perokok berat kehilangan rata-rata 10 tahun umur panjang dibanding bukan perokok. Berhenti di usia berapa pun terbukti menambah tahun kehidupan yang berkualitas.' },
  mentalHealth:  { label: 'Kesehatan Mental',  emoji: '🧘', color: '#00695C',           bg: '#E0F2F1',             border: '#B2DFDB',           description: 'Meski rokok terasa menenangkan, itu hanyalah ilusi: nikotin sebenarnya meningkatkan kecemasan dan depresi jangka panjang. Penelitian menunjukkan bahwa orang yang berhenti merokok melaporkan tingkat stres, kecemasan, dan depresi yang lebih rendah setelah beberapa bulan.' },
}

export const smokingFacts: SmokingFact[] = [
  // ── Kanker ──────────────────────────────────────────────────────
  {
    fact: '80–90% kematian akibat kanker paru-paru disebabkan oleh rokok.',
    source: 'CDC',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'cancer',
  },
  {
    fact: 'Perokok 15–30 kali lebih berisiko terkena atau meninggal karena kanker paru dibanding bukan perokok.',
    source: 'CDC',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'cancer',
  },
  {
    fact: 'Rokok menyebabkan 30% dari seluruh kematian akibat kanker setiap tahunnya.',
    source: 'American Cancer Society',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'cancer',
  },
  {
    fact: 'Rokok memicu 12 jenis kanker: paru, mulut, tenggorokan, kerongkongan, lambung, ginjal, kandung kemih, serviks, pankreas, usus besar, hati, dan leukemia.',
    source: 'CDC',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'cancer',
  },
  {
    fact: '50% kanker kandung kemih disebabkan oleh rokok. faktor risiko tunggal terbesar.',
    source: 'CDC / NCI',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'cancer',
  },
  {
    fact: 'Perokok punya risiko 2–4 kali lebih tinggi terkena kanker pankreas dibanding bukan perokok.',
    source: 'NCI',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'cancer',
  },
  {
    fact: '10–15 tahun setelah berhenti merokok, risiko kanker paru turun menjadi setengahnya dibanding yang terus merokok.',
    source: 'American Cancer Society',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'cancer',
  },
  {
    fact: '5–10 tahun setelah berhenti, risiko kanker mulut, tenggorokan, dan laring berkurang hingga 50%.',
    source: 'American Cancer Society',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'cancer',
  },

  // ── Jantung & Pembuluh ──────────────────────────────────────────
  {
    fact: 'Merokok meningkatkan risiko penyakit jantung koroner sebesar 2–4 kali lipat.',
    source: 'CDC',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'cardiovascular',
  },
  {
    fact: 'Rokok meningkatkan risiko stroke sebesar 2–4 kali lipat dibanding bukan perokok.',
    source: 'CDC',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'cardiovascular',
  },
  {
    fact: 'Rokok menyebabkan 1 dari setiap 4 kematian akibat penyakit kardiovaskular.',
    source: 'CDC',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'cardiovascular',
  },
  {
    fact: 'Bahkan merokok kurang dari 5 batang sehari sudah menghasilkan tanda awal penyakit kardiovaskular.',
    source: 'CDC',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'cardiovascular',
  },
  {
    fact: 'Tembakau menyebabkan sekitar 1,9 juta kematian akibat penyakit jantung koroner setiap tahun di seluruh dunia.',
    source: 'WHO',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'cardiovascular',
  },
  {
    fact: 'Bukan perokok yang terpapar asap rokok di rumah atau tempat kerja memiliki risiko penyakit jantung 25–30% lebih tinggi.',
    source: 'CDC',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'cardiovascular',
  },
  {
    fact: 'Hanya 1 tahun setelah berhenti, risiko tambahan penyakit jantung koroner turun menjadi setengahnya.',
    source: 'WHO / NHS',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'cardiovascular',
  },
  {
    fact: '15 tahun setelah berhenti merokok, risiko jantung koroner sama dengan orang yang tidak pernah merokok.',
    source: 'NHS',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'cardiovascular',
  },

  // ── Paru-paru ───────────────────────────────────────────────────
  {
    fact: 'Rokok menyebabkan hingga 80% kematian akibat PPOK (Penyakit Paru Obstruktif Kronik).',
    source: 'CDC',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'respiratory',
  },
  {
    fact: '75% kasus PPOK terjadi pada orang dengan riwayat merokok.',
    source: 'CDC',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'respiratory',
  },
  {
    fact: 'Asap rokok menyempitkan saluran napas, menyebabkan pembengkakan, dan merusak kantung udara. kerusakan yang sebagian besar bersifat permanen.',
    source: 'CDC',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'respiratory',
  },
  {
    fact: 'Merokok di masa kanak-kanak dan remaja dapat menghambat pertumbuhan paru-paru dan meningkatkan risiko PPOK saat dewasa.',
    source: 'CDC',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'respiratory',
  },
  {
    fact: 'WHO memperkirakan tembakau menyebabkan lebih dari 1 juta kematian akibat penyakit pernapasan kronik setiap tahunnya.',
    source: 'WHO',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'respiratory',
  },

  // ── Kerugian Ekonomi ────────────────────────────────────────────
  {
    fact: 'Tembakau menguras ekonomi global sebesar US$1,4 triliun setiap tahun dalam biaya kesehatan dan hilangnya produktivitas.',
    source: 'WHO',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'economic',
  },
  {
    fact: 'Biaya nyata sosial dari sebungkus rokok diperkirakan jauh melebihi harga jualnya saat dikaitkan dengan biaya kesehatan jangka panjang.',
    source: 'CDC',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'economic',
  },
  {
    fact: 'Uang yang kamu hemat dengan berhenti merokok bisa mencapai jutaan rupiah per tahun. cukup untuk liburan atau dana darurat.',
    source: 'Kalkulasi Umum',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'economic',
  },
  {
    fact: 'Selain rokok, perokok juga menanggung biaya kesehatan lebih tinggi. premi asuransi, biaya dokter, dan obat-obatan.',
    source: 'CDC',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'economic',
  },

  // ── Kecanduan Nikotin ───────────────────────────────────────────
  {
    fact: 'Nikotin mencapai otak dalam 10 detik setelah dihirup, memicu siklus hadiah yang cepat dan mendorong penggunaan berulang.',
    source: 'NIDA',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'addiction',
  },
  {
    fact: 'Kecanduan nikotin dianggap sama kuatnya dengan kecanduan kokain atau alkohol. dan bagi banyak orang, lebih sulit diatasi.',
    source: 'NIDA',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'addiction',
  },
  {
    fact: 'Hanya sekitar 6% perokok berhasil berhenti secara mandiri tanpa bantuan dalam satu tahun.',
    source: 'NIDA / CDC',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'addiction',
  },
  {
    fact: 'Sekitar 50% perokok mencoba berhenti setiap tahun, tetapi kurang dari 1 dari 10 berhasil secara permanen.',
    source: 'CDC',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'addiction',
  },
  {
    fact: 'Gejala putus nikotin. mudah marah, cemas, depresi, insomnia, dan nafsu makan meningkat. bisa muncul hanya dalam beberapa jam setelah rokok terakhir.',
    source: 'NIDA',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'addiction',
  },
  {
    fact: '1 dari 5 orang dewasa di seluruh dunia masih kecanduan tembakau menurut laporan tren tembakau WHO 2025.',
    source: 'WHO',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'addiction',
  },
  {
    fact: '80% dari 1,3 miliar pengguna tembakau di dunia tinggal di negara berpenghasilan rendah dan menengah.',
    source: 'WHO',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'addiction',
  },

  // ── Asap Rokok Pasif ────────────────────────────────────────────
  {
    fact: 'Asap rokok pasif menyebabkan lebih dari 41.000 kematian di AS setiap tahun, termasuk ribuan bukan perokok.',
    source: 'CDC',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'secondhand',
  },
  {
    fact: 'Sekitar 430 bayi meninggal karena SIDS setiap tahun di AS akibat paparan asap rokok pasif.',
    source: 'CDC',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'secondhand',
  },
  {
    fact: 'Asap rokok pasif menyebabkan 202.300 episode asma dan 790.000 kunjungan dokter untuk infeksi telinga anak di AS setiap tahunnya.',
    source: 'CDC',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'secondhand',
  },
  {
    fact: 'Bukan perokok yang terpapar asap rokok pasif memiliki risiko 20–30% lebih tinggi terkena kanker paru.',
    source: 'CDC',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'secondhand',
  },
  {
    fact: 'Setidaknya 500 juta anak di seluruh dunia terpapar asap rokok pasif di dalam rumah mereka sendiri.',
    source: 'WHO',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'secondhand',
  },
  {
    fact: 'Tidak ada level aman dari paparan asap rokok pasif. bahkan paparan singkat pun dapat merusak sistem kardiovaskular.',
    source: 'WHO / CDC',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'secondhand',
  },

  // ── Pemulihan Tubuh ─────────────────────────────────────────────
  {
    fact: 'Dalam 20 menit setelah berhenti: detak jantung dan tekanan darah mulai turun ke level normal.',
    source: 'CDC',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'recovery',
  },
  {
    fact: 'Dalam 12 jam setelah berhenti: kadar karbon monoksida dalam darah kembali normal.',
    source: 'CDC',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'recovery',
  },
  {
    fact: 'Dalam 2 minggu hingga 3 bulan: risiko serangan jantung mulai turun dan fungsi paru-paru meningkat.',
    source: 'American Cancer Society',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'recovery',
  },
  {
    fact: 'Dalam 1–9 bulan: batuk dan sesak napas berkurang seiring rambut getar paru-paru mulai tumbuh kembali.',
    source: 'American Cancer Society',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'recovery',
  },
  {
    fact: 'Setelah 1 tahun: risiko tambahan penyakit jantung koroner turun menjadi setengah risiko perokok aktif.',
    source: 'NHS / American Cancer Society',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'recovery',
  },
  {
    fact: 'Setelah 5–10 tahun: risiko stroke turun ke level bukan perokok. Risiko kanker mulut, tenggorokan, dan laring berkurang 50%.',
    source: 'American Cancer Society',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'recovery',
  },
  {
    fact: 'Setelah 10 tahun: angka kematian akibat kanker paru turun menjadi sekitar setengah perokok aktif.',
    source: 'NHS / American Cancer Society',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'recovery',
  },
  {
    fact: 'Setelah 15 tahun: risiko jantung koroner sama dengan orang yang tidak pernah merokok seumur hidup.',
    source: 'NHS / WHO',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'recovery',
  },
  {
    fact: 'Berhenti merokok sebelum usia 40 tahun mengurangi risiko kematian akibat penyakit terkait rokok hingga 90%.',
    source: 'CDC',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'recovery',
  },

  // ── Zat Berbahaya ───────────────────────────────────────────────
  {
    fact: 'Asap rokok mengandung lebih dari 7.000 bahan kimia. Setidaknya 69 di antaranya terbukti menyebabkan kanker.',
    source: 'CDC / American Cancer Society',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'chemicals',
  },
  {
    fact: 'Rokok mengandung formaldehida (cairan pengawet mayat), arsenik (racun tikus), benzena (bahan bakar minyak), dan kadmium (bahan baterai).',
    source: 'American Cancer Society',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'chemicals',
  },
  {
    fact: 'Rokok mengandung unsur radioaktif. termasuk polonium-210 dan uranium-235. yang terserap dari pupuk pertanian tembakau.',
    source: 'American Cancer Society',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'chemicals',
  },
  {
    fact: 'Rokok mengandung vinil klorida (bahan plastik PVC), timbal, nikel, dan hidrazin. semua terbukti bersifat karsinogen.',
    source: 'American Cancer Society',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'chemicals',
  },
  {
    fact: 'Setiap kali kamu menghirup asap rokok, bahan kimia tersebut memasuki aliran darah dan dikirim ke setiap organ tubuh dalam hitungan detik.',
    source: 'CDC',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'chemicals',
  },
  {
    fact: 'Nitrosamin spesifik tembakau (TSNA) dalam rokok disebut sebagai "beberapa senyawa penyebab kanker paling kuat yang pernah diketahui."',
    source: 'American Cancer Society',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'chemicals',
  },

  // ── Harapan Hidup ───────────────────────────────────────────────
  {
    fact: 'Perokok rata-rata hidup setidaknya 10 tahun lebih pendek dibandingkan bukan perokok.',
    source: 'CDC / WHO',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'lifeExpectancy',
  },
  {
    fact: 'Merokok membunuh lebih dari 480.000 orang di AS setiap tahun. lebih banyak dari AIDS, alkohol, kecelakaan, narkoba, pembunuhan, dan bunuh diri digabungkan.',
    source: 'CDC',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'lifeExpectancy',
  },
  {
    fact: 'Tembakau membunuh lebih dari 8 juta orang di seluruh dunia setiap tahun. Lebih dari 1,3 juta di antaranya adalah bukan perokok yang terpapar asap rokok.',
    source: 'WHO',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'lifeExpectancy',
  },
  {
    fact: 'Tembakau membunuh hingga separuh dari seluruh penggunanya.',
    source: 'WHO',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'lifeExpectancy',
  },
  {
    fact: 'Berhenti merokok di usia 30 tahun menambah hampir 10 tahun harapan hidup. Berhenti di usia 40 menambah sekitar 9 tahun.',
    source: 'CDC / WHO',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'lifeExpectancy',
  },

  // ── Kesehatan Mental ────────────────────────────────────────────
  {
    fact: '27,2% orang dewasa dengan gangguan kesehatan mental merokok. dibandingkan 15,8% orang dewasa tanpa gangguan mental.',
    source: 'CDC',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'mentalHealth',
  },
  {
    fact: '2 dari 3 orang dengan gangguan kesehatan mental berat adalah perokok aktif.',
    source: 'WHO Europe',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'mentalHealth',
  },
  {
    fact: 'Berhenti merokok meningkatkan kesehatan mental: penelitian menunjukkan penurunan depresi, kecemasan, dan stres. dengan efek setara mengonsumsi antidepresan.',
    source: 'NHS',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'mentalHealth',
  },
  {
    fact: 'Meski nikotin sementara meredakan stres, ia justru memperburuk kecemasan dan depresi jangka panjang dengan menciptakan siklus ketergantungan kimiawi.',
    source: 'NIDA / WHO',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'mentalHealth',
  },
  {
    fact: 'Orang dengan gangguan mental berat rata-rata meninggal 15–20 tahun lebih awal, dengan tembakau sebagai penyebab utamanya.',
    source: 'WHO Europe',
    sourceUrl: 'https://www.who.int/news-room/fact-sheets/detail/tobacco',
    category: 'mentalHealth',
  },
]
