import type { Locale } from '@/i18n/types'
import type { HabitConfig, SmokingData } from '../types'
import { getSmokingStats } from './compute'
import { getSmokingMilestonesFactory } from './milestones'
import { getSmokingBadges } from './badges'
import { smokingTipCategories, smokingCravingTriggers, smokingCravingCopings } from './tips'
import { getSmokingMotivations, getSmokingMotivationMap } from './motivations'
import { getSmokingFacts, getSmokingCategoryMeta, smokingSourceUrls } from './facts'
import { smokingQuotes } from './quotes'
import { smokingVideos } from './videos'
import { smokingCopy } from './copy'
import { smokingTheme } from './theme'
import { smokingIconPack } from './iconPack'
import { smokingOnboarding } from './onboarding'

const CIGARETTES_PER_PACK_DEFAULT = 16

const LABELS: Record<Locale, string> = { id: 'Rokok', en: 'Smoking' }
const PACK_UNIT: Record<Locale, string> = { id: 'bungkus', en: 'packs' }

export function buildSmokingConfig(locale: Locale): HabitConfig<SmokingData> {
  return {
    id: 'smoking',
    label: LABELS[locale],
    emoji: '🚭',
    theme: smokingTheme,
    compute: getSmokingStats,
    getMilestones: getSmokingMilestonesFactory(locale),
    badges: getSmokingBadges(locale),
    tipCategories: smokingTipCategories(locale),
    cravingTriggers: smokingCravingTriggers(locale),
    cravingCopings: smokingCravingCopings(locale),
    motivations: getSmokingMotivations(locale),
    motivationMap: getSmokingMotivationMap(locale),
    facts: getSmokingFacts(locale),
    categoryMeta: getSmokingCategoryMeta(locale),
    sourceUrls: smokingSourceUrls,
    quotes: smokingQuotes(locale),
    videos: smokingVideos(locale),
    copy: smokingCopy(locale),
    iconPack: smokingIconPack,
    onboarding: smokingOnboarding(locale),
    hasMoneyTracking: true,
    constructData: ({ quitDate, unitsCount, priceValue, motivation }) => ({
      quitDate,
      cigarettesPerDay: unitsCount,
      pricePerPack: priceValue,
      cigarettesPerPack: CIGARETTES_PER_PACK_DEFAULT,
      motivation,
    }),
    extractInputs: (data) => ({
      unitsCount: data.cigarettesPerDay,
      priceValue: data.pricePerPack,
      motivation: data.motivation,
    }),
    previewYearlySavings: (cigsPerDay, pricePerPack) =>
      (cigsPerDay / CIGARETTES_PER_PACK_DEFAULT) * pricePerPack * 365,
    formatProgressUnitsSub: (stats, data) => {
      const packSize = data.cigarettesPerPack || CIGARETTES_PER_PACK_DEFAULT
      return `${(stats.unitsAvoided / packSize).toFixed(1)} ${PACK_UNIT[locale]}`
    },
  }
}
