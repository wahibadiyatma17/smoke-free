import type { Locale } from '@/i18n/types'
import type { HabitConfig, HabitId } from './types'
import { buildSmokingConfig } from './smoking/config'
import { buildAlcoholConfig } from './alcohol/config'
import { buildPornConfig } from './porn/config'
import { isHabitEnabled } from './flags'

type Builder = (locale: Locale) => HabitConfig

const BUILDERS: Partial<Record<HabitId, Builder>> = {
  smoking: (l) => buildSmokingConfig(l) as HabitConfig,
  alcohol: (l) => buildAlcoholConfig(l) as HabitConfig,
  porn:    (l) => buildPornConfig(l) as HabitConfig,
}

// Cache built configs per (habitId, locale). Each locale swap rebuilds on
// first access then reuses. This avoids reconstructing tip arrays & fact
// lists on every dashboard render.
const CACHE: Map<string, HabitConfig> = new Map()

function cacheKey(id: HabitId, locale: Locale) {
  return `${id}::${locale}`
}

// Accept a loosely-typed locale so stale HMR bundles that call this before
// the i18n provider is mounted (undefined locale) still produce a valid
// config instead of crashing the habit builder.
function normalize(locale: Locale | undefined | null): Locale {
  return locale === 'en' ? 'en' : 'id'
}

export function getHabitConfig(id: HabitId, locale: Locale | undefined): HabitConfig | undefined {
  const builder = BUILDERS[id]
  if (!builder) return undefined
  const loc = normalize(locale)
  const key = cacheKey(id, loc)
  let cfg = CACHE.get(key)
  if (!cfg) {
    cfg = builder(loc)
    CACHE.set(key, cfg)
  }
  return cfg
}

/**
 * All configs that are BOTH registered AND feature-flag enabled for the
 * given locale. Used for user-visible lists (onboarding picker, selector).
 */
export function getEnabledHabitConfigs(locale: Locale | undefined): HabitConfig[] {
  const loc = normalize(locale)
  const out: HabitConfig[] = []
  for (const id of Object.keys(BUILDERS) as HabitId[]) {
    if (!isHabitEnabled(id)) continue
    const cfg = getHabitConfig(id, loc)
    if (cfg) out.push(cfg)
  }
  return out
}
