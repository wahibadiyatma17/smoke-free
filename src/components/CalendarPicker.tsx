'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

const MONTHS_ID = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]

interface CalendarPickerProps {
  value: string       // ISO date string yyyy-mm-dd
  onChange: (date: string) => void
  max: string         // ISO date string, dates after this are disabled
}

function toLocal(isoStr: string) {
  const [y, m, d] = isoStr.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function toISO(date: Date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function diffDays(a: Date, b: Date) {
  const msPerDay = 1000 * 60 * 60 * 24
  return Math.round((b.getTime() - a.getTime()) / msPerDay)
}

const MILESTONES: Record<number, { emoji: string; label: string }> = {
  0:  { emoji: '✨', label: 'Hari ini' },
  1:  { emoji: '📅', label: 'Kemarin' },
  7:  { emoji: '📆', label: '1 minggu' },
  30: { emoji: '🗓️', label: '1 bulan' },
}

export default function CalendarPicker({ value, onChange, max }: CalendarPickerProps) {
  const today = toLocal(max)
  const selected = toLocal(value)

  const [viewYear, setViewYear] = useState(selected.getFullYear())
  const [viewMonth, setViewMonth] = useState(selected.getMonth())
  const [direction, setDirection] = useState(0) // -1 prev, 1 next

  const days = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay()
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
    const prevDays = new Date(viewYear, viewMonth, 0).getDate()

    const cells: Array<{ date: Date; inMonth: boolean }> = []

    for (let i = firstDay - 1; i >= 0; i--) {
      cells.push({ date: new Date(viewYear, viewMonth - 1, prevDays - i), inMonth: false })
    }
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ date: new Date(viewYear, viewMonth, d), inMonth: true })
    }
    const remaining = 42 - cells.length
    for (let d = 1; d <= remaining; d++) {
      cells.push({ date: new Date(viewYear, viewMonth + 1, d), inMonth: false })
    }
    return cells
  }, [viewYear, viewMonth])

  const navigate = (dir: number) => {
    setDirection(dir)
    let m = viewMonth + dir
    let y = viewYear
    if (m > 11) { m = 0; y++ }
    if (m < 0)  { m = 11; y-- }
    setViewMonth(m)
    setViewYear(y)
  }

  const daysSinceSel = diffDays(selected, today)
  const isFuture = daysSinceSel < 0
  const isToday = daysSinceSel === 0

  const statusText = isFuture
    ? '🚀 Mulai perjalananmu!'
    : isToday
    ? '✨ Mulai hari ini. Langkah pertama terbesar!'
    : `🏆 ${daysSinceSel} hari bebas rokok. Luar biasa!`

  const quickSelects = [
    { label: 'Hari ini',      emoji: '✨', offset: 0 },
    { label: 'Kemarin',       emoji: '📅', offset: 1 },
    { label: '1 minggu lalu', emoji: '📆', offset: 7 },
    { label: '1 bulan lalu',  emoji: '🗓️', offset: 30 },
  ]

  const canGoPrev = viewYear > 2020 || (viewYear === 2020 && viewMonth > 0)
  const canGoNext = viewYear < today.getFullYear() || (viewYear === today.getFullYear() && viewMonth < today.getMonth())

  return (
    <div className="space-y-3">
      {/* Calendar card */}
      <div className="rounded-3xl overflow-hidden"
        style={{
          background: 'var(--card)',
          border: '1.5px solid var(--border)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
        }}>

        {/* Month header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <button
            onClick={() => canGoPrev && navigate(-1)}
            disabled={!canGoPrev}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-90"
            style={{
              background: canGoPrev ? 'var(--green-pale)' : 'transparent',
              color: canGoPrev ? 'var(--green-mid)' : 'var(--text-3)',
              border: '1.5px solid',
              borderColor: canGoPrev ? 'var(--green-tint)' : 'var(--border)',
            }}>
            <span className="text-lg font-600">‹</span>
          </button>

          <AnimatePresence mode="wait">
            <motion.span
              key={`${viewYear}-${viewMonth}`}
              initial={{ opacity: 0, y: direction * 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: direction * -8 }}
              transition={{ duration: 0.18 }}
              style={{
                fontFamily: 'var(--font-fraunces)',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'var(--text)',
                letterSpacing: '-0.02em',
              }}>
              {MONTHS_ID[viewMonth]} {viewYear}
            </motion.span>
          </AnimatePresence>

          <button
            onClick={() => canGoNext && navigate(1)}
            disabled={!canGoNext}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-90"
            style={{
              background: canGoNext ? 'var(--green-pale)' : 'transparent',
              color: canGoNext ? 'var(--green-mid)' : 'var(--text-3)',
              border: '1.5px solid',
              borderColor: canGoNext ? 'var(--green-tint)' : 'var(--border)',
            }}>
            <span className="text-lg font-600">›</span>
          </button>
        </div>

        {/* Day-of-week labels */}
        <div className="grid grid-cols-7 px-3 pb-1">
          {DAYS.map(d => (
            <div key={d} className="text-center py-1"
              style={{ fontSize: '0.65rem', fontFamily: 'var(--font-nunito)', fontWeight: 800, color: 'var(--text-3)', letterSpacing: '0.05em' }}>
              {d}
            </div>
          ))}
        </div>

        {/* Day grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${viewYear}-${viewMonth}`}
            initial={{ opacity: 0, x: direction * 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -30 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="grid grid-cols-7 px-3 pb-4 gap-y-1"
          >
            {days.map(({ date, inMonth }, i) => {
              const iso = toISO(date)
              const isSelected = iso === value
              const isDisabled = date > today
              const isThisMonth = inMonth
              const isCurrentDay = iso === max

              const daysAgo = diffDays(date, today)
              const milestone = MILESTONES[daysAgo]
              const hasMilestone = isThisMonth && !isDisabled && milestone

              return (
                <button
                  key={i}
                  onClick={() => !isDisabled && isThisMonth && onChange(iso)}
                  disabled={isDisabled || !isThisMonth}
                  className="relative flex flex-col items-center justify-center py-1 rounded-xl transition-all active:scale-90 group"
                  style={{ minHeight: hasMilestone ? '52px' : '40px' }}
                >
                  {/* Selected glow ring */}
                  {isSelected && (
                    <motion.div
                      layoutId="selected-ring"
                      className="absolute inset-0.5 rounded-xl"
                      style={{
                        background: 'var(--green)',
                        boxShadow: '0 0 16px rgba(61,190,143,0.5)',
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}

                  {/* Today dot */}
                  {isCurrentDay && !isSelected && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: 'var(--green)' }} />
                  )}

                  <span className="relative z-10 text-sm leading-none"
                    style={{
                      fontFamily: 'var(--font-fraunces)',
                      fontWeight: isSelected ? 900 : isCurrentDay ? 800 : 600,
                      color: isSelected
                        ? 'white'
                        : isDisabled || !isThisMonth
                        ? 'var(--text-3)'
                        : isCurrentDay
                        ? 'var(--green-mid)'
                        : 'var(--text)',
                    }}>
                    {date.getDate()}
                  </span>

                  {/* Milestone badge */}
                  {hasMilestone && (
                    <span className="relative z-10 mt-0.5 text-[9px] leading-none"
                      style={{ fontFamily: 'var(--font-nunito)', color: isSelected ? 'rgba(255,255,255,0.85)' : 'var(--text-3)', fontWeight: 700 }}>
                      {milestone.emoji}
                    </span>
                  )}
                </button>
              )
            })}
          </motion.div>
        </AnimatePresence>

        {/* Status banner */}
        <AnimatePresence mode="wait">
          <motion.div
            key={value}
            initial={{ opacity: 0, scale: 0.95, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="mx-4 mb-4 px-4 py-3 rounded-2xl text-center text-xs font-800"
            style={{
              background: 'var(--green-pale)',
              border: '1.5px solid var(--green-tint)',
              color: 'var(--green-mid)',
              fontFamily: 'var(--font-nunito)',
            }}>
            {statusText}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Quick-select chips */}
      <div className="grid grid-cols-2 gap-2">
        {quickSelects.map(({ label, emoji, offset }) => {
          const d = new Date()
          d.setDate(d.getDate() - offset)
          const val = toISO(d)
          const active = value === val
          return (
            <motion.button
              key={label}
              whileTap={{ scale: 0.94 }}
              onClick={() => {
                onChange(val)
                setViewYear(d.getFullYear())
                setViewMonth(d.getMonth())
              }}
              className="flex items-center gap-2.5 px-3 py-3 rounded-2xl text-left transition-colors"
              style={{
                background: active ? 'var(--green-pale)' : 'var(--card)',
                border: `1.5px solid ${active ? 'var(--green-tint)' : 'var(--border)'}`,
                boxShadow: active ? '0 4px 16px rgba(61,190,143,0.15)' : 'var(--shadow-sm)',
              }}>
              <span className="text-xl leading-none">{emoji}</span>
              <span className="text-xs font-800 leading-tight"
                style={{
                  fontFamily: 'var(--font-nunito)',
                  color: active ? 'var(--green-mid)' : 'var(--text-2)',
                }}>
                {label}
              </span>
              {active && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto text-[10px] font-900 px-1.5 py-0.5 rounded-full"
                  style={{ background: 'var(--green)', color: 'white', fontFamily: 'var(--font-nunito)' }}>
                  ✓
                </motion.span>
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
