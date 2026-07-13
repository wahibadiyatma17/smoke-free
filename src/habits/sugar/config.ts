import type { Locale } from '@/i18n/types'
import type { SugarData, HabitConfig } from '../types'
import { getSugarStats, GRAMS_SUGAR_PER_SERVING, GRAMS_PER_TEASPOON } from './compute'
import { getSugarMilestonesFactory } from './milestones'
import { getSugarBadges } from './badges'
import { sugarTipCategories, sugarCravingTriggers, sugarCravingCopings, sugarCravingScience } from './tips'
import { getSugarMotivations, getSugarMotivationMap } from './motivations'
import { getSugarFacts, getSugarCategoryMeta, sugarSourceUrls } from './facts'
import { sugarQuotes } from './quotes'
import { sugarVideos } from './videos'
import { sugarCopy } from './copy'
import { sugarTheme } from './theme'
import { sugarIconPack } from './iconPack'
import { sugarOnboarding } from './onboarding'
import { getSugarPractices } from './practices'

const LABELS: Record<Locale, string> = { id: 'Gula', en: 'Sugar' }
// Signature secondary stat: skipped servings translated into teaspoons of
// sugar avoided (1 serving ≈ 30 g, 1 tsp ≈ 4 g) — more visceral than weeks.
const TEASPOONS_SUB: Record<Locale, (n: string) => string> = {
  id: n => `≈ ${n} sendok teh gula dihindari`,
  en: n => `≈ ${n} teaspoons of sugar avoided`,
}

export function buildSugarConfig(locale: Locale): HabitConfig<SugarData> {
  return {
    id: 'sugar',
    label: LABELS[locale],
    emoji: '🍬',
    theme: sugarTheme,
    compute: getSugarStats,
    getMilestones: getSugarMilestonesFactory(locale),
    badges: getSugarBadges(locale),
    tipCategories: sugarTipCategories(locale),
    cravingTriggers: sugarCravingTriggers(locale),
    cravingCopings: sugarCravingCopings(locale),
    motivations: getSugarMotivations(locale),
    motivationMap: getSugarMotivationMap(locale),
    facts: getSugarFacts(locale),
    categoryMeta: getSugarCategoryMeta(locale),
    sourceUrls: sugarSourceUrls,
    quotes: sugarQuotes(locale),
    videos: sugarVideos(locale),
    copy: sugarCopy(locale),
    iconPack: sugarIconPack,
    onboarding: sugarOnboarding(locale),
    dailyPractices: getSugarPractices(locale),
    cravingScience: sugarCravingScience(locale),
    hasMoneyTracking: true,
    constructData: ({ quitDate, unitsCount, priceValue, motivation }) => ({
      quitDate,
      drinksPerDay: unitsCount,
      pricePerDrink: priceValue,
      motivation,
    }),
    extractInputs: (data) => ({
      unitsCount: data.drinksPerDay,
      priceValue: data.pricePerDrink,
      motivation: data.motivation,
    }),
    previewYearlySavings: (drinksPerDay, pricePerDrink) =>
      drinksPerDay * pricePerDrink * 365,
    formatProgressUnitsSub: (stats) => {
      const teaspoons = Math.round((stats.unitsAvoided * GRAMS_SUGAR_PER_SERVING) / GRAMS_PER_TEASPOON)
      return TEASPOONS_SUB[locale](teaspoons.toLocaleString(locale === 'id' ? 'id-ID' : 'en-US'))
    },
  }
}
