/**
 * Tiny haptic feedback helper. `navigator.vibrate` is Android/Chrome-only
 * (iOS Safari ignores it), so every call is guarded and silently no-ops
 * where unsupported. Patterns are kept short — micro-taps, not buzzes.
 */

function vibrate(pattern: number | number[]) {
  if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function') return
  try {
    navigator.vibrate(pattern)
  } catch {
    // Some browsers throw on vibrate without user activation — ignore.
  }
}

/** Light tick — tab switches, toggles, small selections. */
export const hapticTap = () => vibrate(10)

/** Medium bump — confirming an action (save, habit switch). */
export const hapticBump = () => vibrate(25)

/** Success pattern — resisted a craving, unlocked a badge. */
export const hapticSuccess = () => vibrate([15, 60, 25, 60, 40])
