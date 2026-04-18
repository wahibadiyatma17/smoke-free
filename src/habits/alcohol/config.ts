import type { Locale } from '@/i18n/types'
import type { AlcoholData, HabitConfig } from '../types'
import { getAlcoholStats } from './compute'
import { getAlcoholMilestonesFactory } from './milestones'
import { getAlcoholBadges } from './badges'
import { alcoholTipCategories, alcoholCravingTriggers, alcoholCravingCopings } from './tips'
import { getAlcoholMotivations, getAlcoholMotivationMap } from './motivations'
import { getAlcoholFacts, getAlcoholCategoryMeta, alcoholSourceUrls } from './facts'
import { alcoholQuotes } from './quotes'
import { alcoholVideos } from './videos'
import { alcoholCopy } from './copy'
import { alcoholTheme } from './theme'
import { alcoholIconPack } from './iconPack'
import { alcoholOnboarding } from './onboarding'

const LABELS: Record<Locale, string> = { id: 'Alkohol', en: 'Alcohol' }
const WEEKS_SUB: Record<Locale, (n: string) => string> = {
  id: n => `≈ ${n} minggu konsumsi`,
  en: n => `≈ ${n} weeks of use`,
}

export function buildAlcoholConfig(locale: Locale): HabitConfig<AlcoholData> {
  return {
    id: 'alcohol',
    label: LABELS[locale],
    emoji: '🍷',
    theme: alcoholTheme,
    compute: getAlcoholStats,
    getMilestones: getAlcoholMilestonesFactory(locale),
    badges: getAlcoholBadges(locale),
    tipCategories: alcoholTipCategories(locale),
    cravingTriggers: alcoholCravingTriggers(locale),
    cravingCopings: alcoholCravingCopings(locale),
    motivations: getAlcoholMotivations(locale),
    motivationMap: getAlcoholMotivationMap(locale),
    facts: getAlcoholFacts(locale),
    categoryMeta: getAlcoholCategoryMeta(locale),
    sourceUrls: alcoholSourceUrls,
    quotes: alcoholQuotes(locale),
    videos: alcoholVideos(locale),
    copy: alcoholCopy(locale),
    iconPack: alcoholIconPack,
    onboarding: alcoholOnboarding(locale),
    hasMoneyTracking: true,
    constructData: ({ quitDate, unitsCount, priceValue, motivation }) => ({
      quitDate,
      drinksPerWeek: unitsCount,
      pricePerDrink: priceValue,
      motivation,
    }),
    extractInputs: (data) => ({
      unitsCount: data.drinksPerWeek,
      priceValue: data.pricePerDrink,
      motivation: data.motivation,
    }),
    previewYearlySavings: (drinksPerWeek, pricePerDrink) =>
      drinksPerWeek * pricePerDrink * 52,
    formatProgressUnitsSub: (stats, data) => {
      const weeks = data.drinksPerWeek > 0 ? stats.unitsAvoided / data.drinksPerWeek : 0
      return WEEKS_SUB[locale](weeks.toFixed(1))
    },
  }
}
