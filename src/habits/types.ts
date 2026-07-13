import type { Timestamp } from 'firebase/firestore'
import type { DailyPractice } from './common/practices'

export type HabitId = 'smoking' | 'alcohol' | 'porn' | 'sugar'

export interface HabitInputs {
  quitDate: Timestamp
  unitsCount: number
  priceValue: number
  motivation: string
  privacy?: 'visible' | 'hidden'
  pinHash?: string
  pinSalt?: string
}

export interface OnboardingStepMeta {
  icon: string
  title: string
  sub: string
}

export type OnboardingStepKind = 'date' | 'units' | 'price' | 'privacy' | 'motivation'

export interface OnboardingFields {
  /** Ordered list of steps for this habit's onboarding. Omit 'price' for habits
   *  without money tracking; include 'privacy' for habits that need a PIN gate. */
  steps: OnboardingStepKind[]
  date: OnboardingStepMeta
  units: OnboardingStepMeta & {
    label: string
    min: number
    max: number
    default: number
    presets: number[]
  }
  price?: OnboardingStepMeta & {
    default: number
    presets: number[]
    suffix?: string
  }
  privacy?: OnboardingStepMeta
  motivation: OnboardingStepMeta
}

interface BaseHabitData {
  quitDate: Timestamp
  motivation: string
  archived?: boolean
  archivedAt?: Timestamp
}

export interface SmokingData extends BaseHabitData {
  cigarettesPerDay: number
  pricePerPack: number
  cigarettesPerPack: number
}

export interface AlcoholData extends BaseHabitData {
  drinksPerWeek: number
  pricePerDrink: number
}

export interface PornData extends BaseHabitData {
  sessionsPerWeek: number
  privacy: 'visible' | 'hidden'
  pinHash?: string
  pinSalt?: string
}

export interface SugarData extends BaseHabitData {
  /** Sugary drinks/snacks per day (es teh manis, boba, soda, sweet snacks). */
  drinksPerDay: number
  pricePerDrink: number
}

export type HabitDataMap = {
  smoking: SmokingData
  alcohol: AlcoholData
  porn: PornData
  sugar: SugarData
}

export type HabitData = HabitDataMap[HabitId]
export type HabitProfiles = Partial<HabitDataMap>

/**
 * Profile-level gamification state (global "showing up", not per-habit).
 * All fields are JSON-safe (numbers + 'YYYY-MM-DD' / 'YYYY-MM' strings) so
 * they persist cleanly through both Firestore and guest localStorage.
 */
export interface GamificationState {
  xp: number
  level: number
  lastCheckInDate: string | null
  checkInStreak: number
  longestCheckInStreak: number
  totalCheckIns: number
  freezesRemaining: number
  freezeMonth: string
  questDate: string | null
  questsDone: string[]
}

export interface UserProfile {
  uid: string
  displayName: string | null
  email: string | null
  photoURL: string | null
  activeHabitId: HabitId
  habits: HabitProfiles
  gamification?: GamificationState
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface HabitStats {
  diffMs: number
  diffSeconds: number
  diffMinutes: number
  diffHours: number
  diffDays: number
  diffWeeks: number
  diffMonths: number
  diffYears: number
  moneySaved: number
  unitsAvoided: number
  unitsAvoidedLabel: string
  timeReclaimedMinutes: number
  timeReclaimedHours: number
  timeReclaimedDays: number
}

export interface Milestone {
  hours: number
  label: string
  description: string
  icon: string
}

export interface MilestoneStatus extends Milestone {
  achieved: boolean
  progress: number
}

export interface Badge {
  id: string
  ikon: string
  judul: string
  deskripsi: string
  syarat: (s: HabitStats) => boolean
  bg: string
  border: string
  color: string
  rotate: string
}

export interface TipItem {
  judul: string
  desc: string
  ikon: string
}

export interface TipCategory {
  label: string
  ikon: string
  tips: TipItem[]
}

export interface MotivationOption {
  id: string
  label: string
  icon: string
}

export interface Fact {
  fact: string
  source: string
  sourceUrl: string
  category: string
}

export interface Video {
  /** 11-character YouTube video ID (the part after watch?v= or youtu.be/). */
  id: string
  judul: string
  deskripsi: string
}

export interface CategoryMeta {
  label: string
  emoji: string
  color: string
  bg: string
  border: string
  description: string
}

/**
 * Mascot emoji pack per habit. Slots are semantic (greeting, success,
 * restart, etc.) so each habit can choose emoji that reinforce its own
 * mood — outdoor/adventure for smoking, ocean/clarity for alcohol,
 * calm/mindful for pornography. Makes switching habits feel like
 * entering a different app rather than a re-skinned one.
 */
export interface HabitIconPack {
  /** Trailing emoji after the user's first name on the dashboard. */
  greeting: string
  /** Companion emoji on "Kamu pasti bisa" encouragement in the craving modal. */
  encouragement: string
  /** Large hero emoji shown when a craving is successfully resisted. */
  success: string
  /** Emoji prefix on the "start over" CTA in the reset modal. */
  restart: string
  /** Hero emoji at the top of the reset modal. */
  resetHero: string
  /** Small emoji next to "Pencapaian" achievement section header. */
  achievements: string
}

export interface HabitCopy {
  heroHeader: string
  heroTagline: string
  unitsLabel: string
  unitsAvoidedLabel: string
  unitsPerPeriodLabel: string
  pricePerUnitLabel: string
  quitDateLabel: string
  timeReclaimedLabel: string
  sosEmoji: string
  sosPrompt: string
  sosSubtext: string
  /** CSS var reference (e.g. 'var(--coral-pale)') for the SOS card background.
   *  Each habit picks a palette family where the "urgent / reach out" tone
   *  actually reads as urgent against its own theme — coral feels urgent
   *  against green, but teal reads as calming, so alcohol uses amber instead. */
  sosBg: string
  sosBorder: string
  sosColor: string
  cravingHeader: string
  daysFreeLabel: string
}

// Small helper so consumers passing the generic HabitConfig can still call
// extractInputs with any HabitData (the implementation reads habit-specific
// fields via type narrowing inside each config).
export type MotivationEntry = { label: string; icon: string }

export interface ThemeTokens {
  cream:        string
  card:         string
  cardTinted:   string

  green:        string
  greenMid:     string
  greenDark:    string
  greenPale:    string
  greenTint:    string

  coral:        string
  coralMid:     string
  coralPale:    string
  coralTint:    string

  amber:        string
  amberPale:    string
  amberTint:    string

  lavender:     string
  lavenderPale: string
  lavenderTint: string
}

/** A habit's full palette for both color modes. HabitProvider picks the
 *  right set based on the user's active theme mode and writes it to the
 *  document root as CSS custom properties. */
export interface HabitTheme {
  light: ThemeTokens
  dark: ThemeTokens
}

export interface HabitConfig<D extends HabitData = HabitData> {
  id: HabitId
  label: string
  emoji: string
  theme: HabitTheme
  compute: (data: D) => HabitStats
  getMilestones: (data: D) => MilestoneStatus[]
  badges: Badge[]
  tipCategories: TipCategory[]
  cravingTriggers: string[]
  cravingCopings: string[]
  motivations: MotivationOption[]
  motivationMap: Record<string, MotivationEntry>
  facts: Fact[]
  categoryMeta: Record<string, CategoryMeta>
  sourceUrls: Record<string, string>
  quotes: string[]
  videos: Video[]
  copy: HabitCopy
  iconPack: HabitIconPack
  onboarding: OnboardingFields
  /** When false, money-related stat cards & savings previews are omitted for
   *  this habit (e.g. pornography — no purchase, track time instead). */
  hasMoneyTracking: boolean
  constructData: (inputs: HabitInputs) => D
  extractInputs: (data: D) => { unitsCount: number; priceValue: number; motivation: string }
  previewYearlySavings: (unitsCount: number, priceValue: number) => number
  /** Secondary line under the "units avoided" stat card on the progress page. */
  formatProgressUnitsSub: (stats: HabitStats, data: D) => string
  /** Optional per-day rotating micro-actions. When present, the dashboard
   *  shows a DailyPracticeCard for this habit. */
  dailyPractices?: DailyPractice[]
  /** Optional evidence-based one-liners shown during the craving (SOS)
   *  moment to reassure the user that the urge is temporary & beatable. */
  cravingScience?: string[]
}
