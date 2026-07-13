import type { HabitId } from './types'

/**
 * Controls which habit modules are visible to users (onboarding picker,
 * header selector, aggregate views). Habits set to `false` here are
 * fully built but gated — flip to `true` once content is reviewed and
 * the habit is ready to ship.
 */
export const HABIT_FLAGS: Record<HabitId, boolean> = {
  smoking: true,
  alcohol: true,
  porn: true,
  sugar: true,
}

export function isHabitEnabled(id: HabitId): boolean {
  return HABIT_FLAGS[id] ?? false
}
