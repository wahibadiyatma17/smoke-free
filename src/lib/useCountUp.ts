'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Animate a number from its previous value up to `target` with requestAnimationFrame.
 * Honors prefers-reduced-motion (snaps instantly). Returns the current value.
 */
export function useCountUp(target: number, durationMs = 900): number {
  const [value, setValue] = useState(target)
  const fromRef = useRef(target)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const reduce = typeof window !== 'undefined'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const from = fromRef.current
    const to = target
    if (reduce || from === to) {
      fromRef.current = to
      setValue(to)
      return
    }

    const start = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / durationMs)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(from + (to - from) * eased))
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        fromRef.current = to
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      fromRef.current = to
    }
  }, [target, durationMs])

  return value
}
