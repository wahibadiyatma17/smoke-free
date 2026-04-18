'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useActiveHabit } from '@/habits/useActiveHabit'

export function VideoSection() {
  const { config, habitId } = useActiveHabit()
  const [activeIndex, setActiveIndex] = useState(0)

  // Reset to first video when the active habit switches so we never render
  // an out-of-range index against the new habit's video list.
  useEffect(() => { setActiveIndex(0) }, [habitId])

  const videos = config?.videos ?? []
  if (videos.length === 0) return null
  const current = videos[Math.min(activeIndex, videos.length - 1)]

  return (
    <div className="rounded-[24px] overflow-hidden"
      style={{ background: 'var(--card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>

      {/* Active video embed */}
      <div className="px-4 pt-4">
        <motion.div
          key={`${habitId}-${activeIndex}`}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative rounded-2xl overflow-hidden"
          style={{ aspectRatio: '16/9', background: 'var(--border)' }}
        >
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${current.id}`}
            title={current.judul}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            style={{ border: 'none' }}
          />
        </motion.div>

        {/* Title & description */}
        <motion.div
          key={`text-${habitId}-${activeIndex}`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mt-3"
        >
          <p className="text-xs font-800 leading-snug"
            style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text)' }}>
            {current.judul}
          </p>
          <p className="text-[11px] font-600 mt-0.5"
            style={{ color: 'var(--text-3)' }}>
            {current.deskripsi}
          </p>
        </motion.div>
      </div>

      {/* Thumbnail selector — only when more than one video */}
      {videos.length > 1 && (
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
      )}
    </div>
  )
}
