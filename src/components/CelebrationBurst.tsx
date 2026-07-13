'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

interface CelebrationBurstProps {
  /** Bump this number (or toggle truthy) to fire a new burst. */
  trigger: number
  /** Particle count — keep modest for low-end phones. */
  count?: number
}

interface Particle {
  angle: number
  distance: number
  size: number
  color: string
  emoji?: string
  delay: number
  rotation: number
}

const COLORS = ['var(--green)', 'var(--coral)', 'var(--amber)', 'var(--lavender)']
const EMOJI = ['✨', '🎉', '⭐']

// Deterministic pseudo-random so particles differ per burst without
// re-rendering surprises; seeded from the trigger count.
function mulberry32(seed: number) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Lightweight confetti burst rendered from the center of its parent.
 * Pure framer-motion (no canvas / deps), auto-cleans after the animation,
 * and respects prefers-reduced-motion by not rendering at all.
 */
export function CelebrationBurst({ trigger, count = 18 }: CelebrationBurstProps) {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const particles = useMemo<Particle[]>(() => {
    const rand = mulberry32(trigger * 9973 + 1)
    return Array.from({ length: count }, (_, i) => ({
      angle: (i / count) * Math.PI * 2 + rand() * 0.6,
      distance: 70 + rand() * 90,
      size: 6 + rand() * 8,
      color: COLORS[Math.floor(rand() * COLORS.length)],
      emoji: rand() > 0.75 ? EMOJI[Math.floor(rand() * EMOJI.length)] : undefined,
      delay: rand() * 0.12,
      rotation: (rand() - 0.5) * 540,
    }))
  }, [trigger, count])

  if (!trigger || reducedMotion) return null

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible flex items-center justify-center" aria-hidden>
      {particles.map((p, i) => (
        <motion.span
          key={`${trigger}-${i}`}
          className="absolute"
          initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
          animate={{
            x: Math.cos(p.angle) * p.distance,
            y: Math.sin(p.angle) * p.distance + 30,
            scale: [0, 1.2, 1, 0.6],
            opacity: [1, 1, 1, 0],
            rotate: p.rotation,
          }}
          transition={{ duration: 1.1, delay: p.delay, ease: [0.16, 1, 0.3, 1] }}
          style={
            p.emoji
              ? { fontSize: p.size + 6, lineHeight: 1 }
              : {
                  width: p.size,
                  height: p.size,
                  borderRadius: i % 3 === 0 ? '2px' : '50%',
                  background: p.color,
                }
          }
        >
          {p.emoji}
        </motion.span>
      ))}
    </div>
  )
}
