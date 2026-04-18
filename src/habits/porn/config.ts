import type { Locale } from '@/i18n/types'
import type { HabitConfig, PornData } from '../types'
import { getPornStats } from './compute'
import { getPornMilestonesFactory } from './milestones'
import { getPornBadges } from './badges'
import { pornTipCategories, pornCravingTriggers, pornCravingCopings } from './tips'
import { getPornMotivations, getPornMotivationMap } from './motivations'
import { getPornFacts, getPornCategoryMeta, pornSourceUrls } from './facts'
import { pornQuotes } from './quotes'
import { pornVideos } from './videos'
import { pornCopy } from './copy'
import { pornTheme } from './theme'
import { pornIconPack } from './iconPack'
import { pornOnboarding } from './onboarding'

// Internal habit id stays 'porn' so Firestore data and localStorage shapes don't
// need migration. User-facing label is the more discreet "PMO" (Porn,
// Masturbation, Orgasm) — identical across locales.
const WEEKS_SUB: Record<Locale, (n: string) => string> = {
  id: n => `≈ ${n} minggu pola lama`,
  en: n => `≈ ${n} weeks of old pattern`,
}

export function buildPornConfig(locale: Locale): HabitConfig<PornData> {
  return {
    id: 'porn',
    label: 'PMO',
    emoji: '🕊️',
    theme: pornTheme,
    compute: getPornStats,
    getMilestones: getPornMilestonesFactory(locale),
    badges: getPornBadges(locale),
    tipCategories: pornTipCategories(locale),
    cravingTriggers: pornCravingTriggers(locale),
    cravingCopings: pornCravingCopings(locale),
    motivations: getPornMotivations(locale),
    motivationMap: getPornMotivationMap(locale),
    facts: getPornFacts(locale),
    categoryMeta: getPornCategoryMeta(locale),
    sourceUrls: pornSourceUrls,
    quotes: pornQuotes(locale),
    videos: pornVideos(locale),
    copy: pornCopy(locale),
    iconPack: pornIconPack,
    onboarding: pornOnboarding(locale),
    hasMoneyTracking: false,
    constructData: ({ quitDate, unitsCount, motivation, privacy, pinHash, pinSalt }) => ({
      quitDate,
      sessionsPerWeek: unitsCount,
      motivation,
      privacy: privacy ?? 'hidden',
      ...(pinHash ? { pinHash } : {}),
      ...(pinSalt ? { pinSalt } : {}),
    }),
    extractInputs: (data) => ({
      unitsCount: data.sessionsPerWeek,
      priceValue: 0,
      motivation: data.motivation,
    }),
    previewYearlySavings: () => 0,
    formatProgressUnitsSub: (stats, data) => {
      const weeks = data.sessionsPerWeek > 0 ? stats.unitsAvoided / data.sessionsPerWeek : 0
      return WEEKS_SUB[locale](weeks.toFixed(1))
    },
  }
}
