import type { Locale } from '@/i18n/types'
import type { Video } from '../types'

const LOCALIZED: Record<Locale, Video[]> = {
  id: [
    { id: '_rBPwu2uS-w', judul: 'Smoking is Awesome',                  deskripsi: 'Kurzgesagt – Apa yang terjadi di tubuhmu saat merokok' },
    { id: 'Y18Vz51Nkos', judul: 'How Do Cigarettes Affect The Body?',  deskripsi: 'TED-Ed – Bagaimana rokok merusak setiap organ tubuh' },
    { id: 'o3I0mJ2RfU0', judul: 'What Happens When You Stop Smoking?', deskripsi: 'AsapSCIENCE – Timeline pemulihan tubuh setelah berhenti' },
    { id: 'gnSEbLX94Tk', judul: 'How to Grow to a Happy Non-Smoker',   deskripsi: 'TEDx – Cara berhenti merokok tanpa tersiksa' },
    { id: 'HUngLgGRJpo', judul: 'Nuggets',                              deskripsi: 'Animasi singkat tentang siklus kecanduan yang kuat' },
    { id: 'BtL42sxQQNU', judul: 'Quitting Reduces Heart Attack Risk',   deskripsi: 'CDC – Berhenti merokok kurangi risiko serangan jantung' },
    { id: 'LwJhiBSQr48', judul: 'Nicotine Addiction and Withdrawal',    deskripsi: 'CDC – Memahami kecanduan nikotin dan mengatasinya' },
    { id: '5elKAhdcqtw', judul: 'Quit Smoking Timeline Explained',      deskripsi: 'Unseen BioLab – Perubahan tubuh hari demi hari' },
    { id: 'IGgpCj463Yo', judul: 'What Happens When You Quit Smoking?',  deskripsi: 'Dr. Chris – Penjelasan farmasis tentang efek berhenti' },
    { id: 'MHsUpq11OQg', judul: 'Your Body After Quitting Smoking',     deskripsi: 'Human Limits – Batas kemampuan pemulihan tubuh manusia' },
    { id: 'ZhTOC0T3P3c', judul: 'Quit Smoking: Body Recovery',          deskripsi: 'Respiratory Therapy Zone – Pemulihan paru-paru' },
    { id: 'vE6-HLIF0wE', judul: 'What Happens When You Quit Smoking?',  deskripsi: 'Think – Fakta ilmiah di balik berhenti merokok' },
  ],
  en: [
    { id: '_rBPwu2uS-w', judul: 'Smoking is Awesome',                  deskripsi: 'Kurzgesagt — What happens in your body when you smoke' },
    { id: 'Y18Vz51Nkos', judul: 'How Do Cigarettes Affect The Body?',  deskripsi: 'TED-Ed — How cigarettes damage every organ' },
    { id: 'o3I0mJ2RfU0', judul: 'What Happens When You Stop Smoking?', deskripsi: 'AsapSCIENCE — Your body\'s recovery timeline' },
    { id: 'gnSEbLX94Tk', judul: 'How to Grow to a Happy Non-Smoker',   deskripsi: 'TEDx — How to quit without suffering' },
    { id: 'HUngLgGRJpo', judul: 'Nuggets',                              deskripsi: 'A short animation on the powerful cycle of addiction' },
    { id: 'BtL42sxQQNU', judul: 'Quitting Reduces Heart Attack Risk',   deskripsi: 'CDC — Quitting cuts your heart attack risk' },
    { id: 'LwJhiBSQr48', judul: 'Nicotine Addiction and Withdrawal',    deskripsi: 'CDC — Understanding nicotine addiction and handling withdrawal' },
    { id: '5elKAhdcqtw', judul: 'Quit Smoking Timeline Explained',      deskripsi: 'Unseen BioLab — Day-by-day changes in your body' },
    { id: 'IGgpCj463Yo', judul: 'What Happens When You Quit Smoking?',  deskripsi: 'Dr. Chris — A pharmacist explains quitting effects' },
    { id: 'MHsUpq11OQg', judul: 'Your Body After Quitting Smoking',     deskripsi: 'Human Limits — The limits of human body recovery' },
    { id: 'ZhTOC0T3P3c', judul: 'Quit Smoking: Body Recovery',          deskripsi: 'Respiratory Therapy Zone — Lung recovery' },
    { id: 'vE6-HLIF0wE', judul: 'What Happens When You Quit Smoking?',  deskripsi: 'Think — The science behind quitting smoking' },
  ],
}

export const smokingVideos = (locale: Locale): Video[] => LOCALIZED[locale]
