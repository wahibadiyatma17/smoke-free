export type Locale = 'id' | 'en'

export const LOCALES: readonly Locale[] = ['id', 'en'] as const

export const LOCALE_META: Record<Locale, { code: Locale; label: string; flag: string; native: string }> = {
  id: { code: 'id', label: 'ID', flag: '🇮🇩', native: 'Bahasa Indonesia' },
  en: { code: 'en', label: 'EN', flag: '🇺🇸', native: 'English' },
}

/**
 * Flat key structure — keys are strings like 'nav.home' so consumers
 * call t('nav.home') rather than navigating nested objects. Flat lookup
 * means one hashmap read per call and no runtime defensive checks.
 */
export type MessageKey =
  // common
  | 'common.loading'
  | 'common.cancel'
  | 'common.save'
  | 'common.close'
  | 'common.back'
  | 'common.next'
  | 'common.done'
  | 'common.delete'
  | 'common.confirm'
  | 'common.yes'
  | 'common.no'
  | 'common.or'
  | 'common.hari'
  | 'common.jam'
  | 'common.menit'
  | 'common.detik'
  // navigation
  | 'nav.home'
  | 'nav.progress'
  | 'nav.cravings'
  | 'nav.achievements'
  | 'nav.profile'
  // landing
  | 'landing.tagline'
  | 'landing.heroLine1'
  | 'landing.heroLine2'
  | 'landing.heroLine3'
  | 'landing.heroDesc'
  | 'landing.signInGoogle'
  | 'landing.continueWithoutAccount'
  | 'landing.errorGoogleNotEnabled'
  | 'landing.errorPopupClosed'
  | 'landing.errorGeneric'
  // dashboard
  | 'dashboard.greeting'
  | 'dashboard.daysFree'
  | 'dashboard.moneySaved'
  | 'dashboard.unitsAvoided'
  | 'dashboard.timeReclaimed'
  | 'dashboard.streakLabel'
  | 'dashboard.tapForTips'
  | 'dashboard.sosButton'
  | 'dashboard.tipsHeader'
  // profile
  | 'profile.title'
  | 'profile.editProfile'
  | 'profile.logout'
  | 'profile.yourHabits'
  | 'profile.addHabit'
  | 'profile.hiddenHabits'
  | 'profile.archivedHabits'
  | 'profile.restore'
  | 'profile.stopTracking'
  | 'profile.confirmStop'
  | 'profile.stopTrackingError'
  | 'profile.aggregateTitle'
  | 'profile.aggregateTotalDays'
  | 'profile.aggregateTotalSaved'
  | 'profile.aggregateHabits'
  | 'profile.language'
  | 'profile.guestMode'
  | 'profile.signInToSync'
  // onboarding
  | 'onboarding.step'
  | 'onboarding.of'
  | 'onboarding.continue'
  | 'onboarding.finish'
  | 'onboarding.chooseHabit'
  | 'onboarding.chooseHabitSub'
  // habit selector
  | 'selector.title'
  | 'selector.activeHabit'
  | 'selector.switchHabit'
  | 'selector.addHabit'
  | 'selector.ariaPick'
  | 'selector.hiddenLocked'
  | 'selector.enterPin'
  | 'selector.pinIncorrect'
  | 'selector.unlock'
  | 'selector.hiddenHint'
  | 'selector.hiddenHintNoPin'
  // cravings
  | 'cravings.title'
  | 'cravings.triggers'
  | 'cravings.coping'
  | 'cravings.logCraving'
  | 'cravings.logged'
  // achievements
  | 'achievements.title'
  | 'achievements.milestones'
  | 'achievements.badges'
  | 'achievements.locked'
  | 'achievements.achieved'
  // progress
  | 'progress.title'
  | 'progress.dailyFact'
  | 'progress.nextMilestone'
  | 'progress.yearlyForecast'
  | 'progress.totalSavings'
  | 'progress.unitsAvoided'
  | 'progress.bodyRecovery'
  | 'progress.reset'
  | 'progress.insightCaption'
  | 'progress.insightCta'
  | 'progress.otherCategories'
  | 'progress.source'
  | 'progress.nextMilestoneSub'
  | 'progress.yearlyForecastSub'
  // cravings page
  | 'cravings.whatTrigger'
  | 'cravings.whatToDo'
  | 'cravings.howDoYouFeel'
  | 'cravings.intensityLow'
  | 'cravings.intensityHigh'
  | 'cravings.notes'
  | 'cravings.notesPlaceholder'
  | 'cravings.saved'
  | 'cravings.history'
  | 'cravings.noHistory'
  | 'cravings.loadMore'
  | 'cravings.success'
  | 'cravings.successSub'
  // achievements page
  | 'achievements.earnedHeader'
  | 'achievements.lockedHeader'
  | 'achievements.noneYet'
  | 'achievements.bodyRecoveryHeader'
  | 'achievements.nextMilestone'
  | 'achievements.completed'
  | 'achievements.inProgress'
  // sos / modal
  | 'sos.header'
  | 'sos.sub'
  | 'sos.category.Pernapasan'
  | 'sos.holdOn'
  | 'sos.iDidIt'
  | 'sos.gaveIn'
  | 'sos.success.title'
  | 'sos.success.sub'
  | 'sos.success.close'
  | 'sos.slip.title'
  | 'sos.slip.sub'
  | 'sos.slip.restart'
  | 'sos.slip.cancel'
  // mindful pause (porn)
  | 'mindful.header'
  | 'mindful.sub'
  | 'mindful.breathe'
  // daily practice
  | 'practice.today'
  // reset / slip confirm
  | 'reset.title'
  | 'reset.sub'
  | 'reset.confirm'
  | 'reset.cancel'
  // onboarding page extras
  | 'onboarding.start'
  | 'onboarding.saving'
  | 'onboarding.privacy.visibleTitle'
  | 'onboarding.privacy.visibleSub'
  | 'onboarding.privacy.hiddenTitle'
  | 'onboarding.privacy.hiddenSub'
  | 'onboarding.privacy.pinLabel'
  | 'onboarding.privacy.pinHint'
  | 'onboarding.privacy.pinPlaceholder'
  | 'onboarding.privacy.pinConfirmPlaceholder'
  | 'onboarding.privacy.pinMismatch'
  | 'onboarding.privacy.pinInvalid'
  | 'onboarding.errorSave'
  | 'onboarding.yearlySavings'
  // profile extras
  | 'profile.editData'
  | 'profile.motivation'
  | 'profile.archiveConfirmPrefix'
  | 'profile.archiveConfirmSuffix'
  | 'profile.archivedOn'
  | 'profile.archived'
  | 'profile.archiveAction'
  | 'profile.daysFreeShort'
  | 'profile.tapToUnlockPin'
  | 'profile.tapToUnlock'
  | 'profile.cloudSync'
  | 'profile.theme'
  | 'profile.themeSub'
  // PIN sheet
  | 'pin.unlockTitle'
  | 'pin.unlockSub'
  | 'pin.placeholder'
  | 'pin.submit'
  | 'pin.wrong'
  // Video section
  | 'video.header'
  | 'video.sub'
  // insight card
  | 'insight.category'
  // common extras
  | 'common.minggu'
  | 'common.bulan'
  | 'common.tahun'

export type Messages = Record<MessageKey, string>

/**
 * Interpolation variables. The t() function accepts an optional second
 * argument to substitute {varName} placeholders inside a message string.
 */
export type TVars = Record<string, string | number>
