'use client'

import { motion } from 'framer-motion'
import { useI18n } from '@/i18n/I18nProvider'
import { useCountUp } from '@/lib/useCountUp'

interface StreakRingProps {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function StreakRing({ days, hours, minutes, seconds }: StreakRingProps) {
  const { t } = useI18n()
  const displayDays = useCountUp(days, 1100)
  const size = 220
  const strokeWidth = 13
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const dayProgress = (hours * 3600 + minutes * 60 + seconds) / 86400
  const offset = circumference - dayProgress * circumference

  return (
    <div className="flex flex-col items-center select-none">
      <div className="relative float" style={{ width: size, height: size }}>

        {/* Glow halo behind ring — follows the active habit's accent, breathes softly */}
        <motion.div className="absolute inset-3 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--green) 16%, transparent) 30%, transparent 70%)' }}
          animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />

        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {/* Background track */}
          <circle cx={size/2} cy={size/2} r={radius}
            fill="none" stroke="var(--border)" strokeWidth={strokeWidth} />

          {/* Progress arc - coral to green gradient, soft accent glow */}
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
            style={{ filter: 'drop-shadow(0 0 6px color-mix(in srgb, var(--green) 35%, transparent))' }}
          />

          {/* Animated dot at tip */}
          {dayProgress > 0.01 && (
            <motion.circle
              cx={size/2 + radius * Math.cos(dayProgress * 2 * Math.PI)}
              cy={size/2 + radius * Math.sin(dayProgress * 2 * Math.PI)}
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
              {displayDays}
            </div>
            <div
              className="text-xs font-700 tracking-widest uppercase mt-1"
              style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text-2)' }}
            >
              {t('common.hari')}
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
          { value: hours, label: t('common.jam') },
          { value: minutes, label: t('common.menit') },
          { value: seconds, label: t('common.detik') },
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
