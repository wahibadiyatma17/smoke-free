'use client'

import { motion } from 'framer-motion'

interface StreakRingProps {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function StreakRing({ days, hours, minutes, seconds }: StreakRingProps) {
  const size = 220
  const strokeWidth = 13
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const dayProgress = (hours * 3600 + minutes * 60 + seconds) / 86400
  const offset = circumference - dayProgress * circumference

  return (
    <div className="flex flex-col items-center select-none">
      <div className="relative float" style={{ width: size, height: size }}>

        {/* Glow halo behind ring */}
        <div className="absolute inset-3 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(61,190,143,0.12) 30%, transparent 70%)' }} />

        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {/* Background track */}
          <circle cx={size/2} cy={size/2} r={radius}
            fill="none" stroke="var(--border)" strokeWidth={strokeWidth} />

          {/* Progress arc — coral→green gradient */}
          <motion.circle
            cx={size/2} cy={size/2} r={radius}
            fill="none"
            stroke="url(#udaraGrad)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.8, ease: [0.34, 1.2, 0.64, 1], delay: 0.4 }}
          />

          {/* Animated dot at tip */}
          {dayProgress > 0.01 && (
            <motion.circle
              cx={size/2 + radius * Math.cos(-Math.PI/2 + dayProgress * 2 * Math.PI)}
              cy={size/2 + radius * Math.sin(-Math.PI/2 + dayProgress * 2 * Math.PI)}
              r={6} fill="white"
              stroke="var(--green)" strokeWidth={3}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8, type: 'spring' }}
            />
          )}

          <defs>
            <linearGradient id="udaraGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--coral)" />
              <stop offset="50%" stopColor="var(--amber)" />
              <stop offset="100%" stopColor="var(--green)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center card */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6, type: 'spring', stiffness: 250 }}
            className="text-center"
          >
            <div
              className="leading-none tabular-nums"
              style={{
                fontFamily: 'var(--font-fraunces)',
                fontSize: days >= 100 ? '52px' : '64px',
                fontWeight: 900,
                color: 'var(--text)',
                letterSpacing: '-0.03em',
              }}
            >
              {days}
            </div>
            <div
              className="text-xs font-700 tracking-widest uppercase mt-1"
              style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text-2)' }}
            >
              {days === 1 ? 'Hari' : 'Hari'}
            </div>
          </motion.div>
        </div>
      </div>

      {/* HH · MM · SS */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="flex items-center gap-3 mt-2"
      >
        {[
          { value: hours, label: 'jam' },
          { value: minutes, label: 'menit' },
          { value: seconds, label: 'detik' },
        ].map(({ value, label }, i) => (
          <div key={label} className="flex items-center gap-3">
            {i > 0 && (
              <span className="font-300 text-base" style={{ color: 'var(--border-mid)' }}>·</span>
            )}
            <div className="text-center">
              <div
                className="text-xl tabular-nums leading-none"
                style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 700, color: 'var(--text-2)' }}
              >
                {String(value).padStart(2, '0')}
              </div>
              <div className="text-[9px] font-700 uppercase tracking-wider mt-0.5" style={{ color: 'var(--text-3)' }}>
                {label}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
