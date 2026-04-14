'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

type Video = {
  id: string
  judul: string
  deskripsi: string
}

const videos: Video[] = [
  {
    id: '_rBPwu2uS-w',
    judul: 'Smoking is Awesome',
    deskripsi: 'Kurzgesagt – Apa yang terjadi di tubuhmu saat merokok',
  },
  {
    id: 'Y18Vz51Nkos',
    judul: 'How Do Cigarettes Affect The Body?',
    deskripsi: 'TED-Ed – Bagaimana rokok merusak setiap organ tubuh',
  },
  {
    id: 'o3I0mJ2RfU0',
    judul: 'What Happens When You Stop Smoking?',
    deskripsi: 'AsapSCIENCE – Timeline pemulihan tubuh setelah berhenti',
  },
  {
    id: 'gnSEbLX94Tk',
    judul: 'How to Grow to a Happy Non-Smoker',
    deskripsi: 'TEDx – Cara berhenti merokok tanpa tersiksa',
  },
  {
    id: 'HUngLgGRJpo',
    judul: 'Nuggets',
    deskripsi: 'Animasi singkat tentang siklus kecanduan yang kuat',
  },
  {
    id: 'BtL42sxQQNU',
    judul: 'Quitting Reduces Heart Attack Risk',
    deskripsi: 'CDC – Berhenti merokok kurangi risiko serangan jantung',
  },
  {
    id: 'LwJhiBSQr48',
    judul: 'Nicotine Addiction and Withdrawal',
    deskripsi: 'CDC – Memahami kecanduan nikotin dan mengatasinya',
  },
  {
    id: '5elKAhdcqtw',
    judul: 'Quit Smoking Timeline Explained',
    deskripsi: 'Unseen BioLab – Perubahan tubuh hari demi hari',
  },
  {
    id: 'IGgpCj463Yo',
    judul: 'What Happens When You Quit Smoking?',
    deskripsi: 'Dr. Chris – Penjelasan farmasis tentang efek berhenti',
  },
  {
    id: 'MHsUpq11OQg',
    judul: 'Your Body After Quitting Smoking',
    deskripsi: 'Human Limits – Batas kemampuan pemulihan tubuh manusia',
  },
  {
    id: 'ZhTOC0T3P3c',
    judul: 'Quit Smoking: Body Recovery',
    deskripsi: 'Respiratory Therapy Zone – Pemulihan paru-paru',
  },
  {
    id: 'vE6-HLIF0wE',
    judul: 'What Happens When You Quit Smoking?',
    deskripsi: 'Think – Fakta ilmiah di balik berhenti merokok',
  },
]

export function VideoSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="rounded-[24px] overflow-hidden"
      style={{ background: 'var(--card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>

      {/* Active video embed */}
      <div className="px-4 pt-4">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative rounded-2xl overflow-hidden"
          style={{ aspectRatio: '16/9', background: 'var(--border)' }}
        >
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videos[activeIndex].id}`}
            title={videos[activeIndex].judul}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            style={{ border: 'none' }}
          />
        </motion.div>

        {/* Title & description */}
        <motion.div
          key={`text-${activeIndex}`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mt-3"
        >
          <p className="text-xs font-800 leading-snug"
            style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text)' }}>
            {videos[activeIndex].judul}
          </p>
          <p className="text-[11px] font-600 mt-0.5"
            style={{ color: 'var(--text-3)' }}>
            {videos[activeIndex].deskripsi}
          </p>
        </motion.div>
      </div>

      {/* Thumbnail selector */}
      <div className="flex gap-2 px-4 pt-3 pb-4 overflow-x-auto no-scrollbar">
        {videos.map((video, i) => (
          <button
            key={video.id}
            onClick={() => setActiveIndex(i)}
            className="flex-shrink-0 rounded-xl overflow-hidden transition-all active:scale-95"
            style={{
              width: 80,
              aspectRatio: '16/9',
              border: i === activeIndex
                ? '2.5px solid var(--green)'
                : '2px solid var(--border)',
              opacity: i === activeIndex ? 1 : 0.6,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
              alt={video.judul}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
