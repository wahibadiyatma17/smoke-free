'use client'

import { useMemo, useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Timestamp } from 'firebase/firestore'
import { useAuth } from '@/contexts/AuthContext'
import { useUserData, HabitArchiveBlockedError } from '@/contexts/UserDataContext'
import { formatRupiah, formatNumber } from '@/lib/utils'
import CalendarPicker from '@/components/CalendarPicker'
import { useActiveHabit } from '@/habits/useActiveHabit'
import { getEnabledHabitConfigs } from '@/habits/registry'
import { useUnlock } from '@/habits/UnlockContext'
import { PinUnlockSheet } from '@/components/PinUnlockSheet'
import LanguageSelector from '@/components/LanguageSelector'
import ThemeToggle from '@/components/ThemeToggle'
import { useI18n } from '@/i18n/I18nProvider'
import type { HabitConfig, HabitData, HabitId } from '@/habits/types'

function isHiddenHabit(data: HabitData): boolean {
  return 'privacy' in data && (data as { privacy?: string }).privacy === 'hidden'
}

export default function ProfilPage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const { profile, loading, updateActiveHabitData, setActiveHabit, archiveHabit, restoreHabit } = useUserData()
  const { config, habitData } = useActiveHabit()
  const { isUnlocked } = useUnlock()
  const { t, locale } = useI18n()
  const [showEdit, setShowEdit] = useState(false)
  const [ready, setReady] = useState(false)
  const [unlockTarget, setUnlockTarget] = useState<{ config: HabitConfig; data: HabitData } | null>(null)
  const [confirmingArchiveId, setConfirmingArchiveId] = useState<HabitId | null>(null)
  const [inlineArchivingId, setInlineArchivingId] = useState<HabitId | null>(null)
  const [inlineArchiveError, setInlineArchiveError] = useState('')

  const handleInlineArchive = async (id: HabitId) => {
    setInlineArchivingId(id); setInlineArchiveError('')
    try {
      await archiveHabit(id)
      setConfirmingArchiveId(null)
    } catch (e: any) {
      setInlineArchiveError(e?.message || t('profile.stopTrackingError'))
    } finally {
      setInlineArchivingId(null)
    }
  }

  const { onboardedHabits, hiddenHabits, archivedHabits, availableToAdd } = useMemo(() => {
    const enabled = getEnabledHabitConfigs(locale)
    const habits = profile?.habits ?? {}
    const onboardedHabits: { config: HabitConfig; data: HabitData }[] = []
    const hiddenHabits: { config: HabitConfig; data: HabitData }[] = []
    const archivedHabits: { config: HabitConfig; data: HabitData }[] = []
    const availableToAdd: HabitConfig[] = []
    for (const c of enabled) {
      const data = (habits as Record<string, HabitData | undefined>)[c.id]
      if (!data) { availableToAdd.push(c); continue }
      if (data.archived) { archivedHabits.push({ config: c, data }); continue }
      if (isHiddenHabit(data) && !isUnlocked(c.id)) { hiddenHabits.push({ config: c, data }); continue }
      onboardedHabits.push({ config: c, data })
    }
    return { onboardedHabits, hiddenHabits, archivedHabits, availableToAdd }
  }, [profile, isUnlocked, locale])

  const aggregate = useMemo(() => {
    if (onboardedHabits.length < 2) return null
    let totalDays = 0
    let totalMoney = 0
    const nowMs = Date.now()
    for (const { config: c, data } of onboardedHabits) {
      const days = Math.floor((nowMs - data.quitDate.toDate().getTime()) / (1000 * 60 * 60 * 24))
      totalDays += Math.max(0, days)
      if (c.hasMoneyTracking) totalMoney += c.compute(data).moneySaved
    }
    return { habitCount: onboardedHabits.length, totalDays, totalMoney }
  }, [onboardedHabits])

  useEffect(() => {
    if (!loading && !habitData) router.push('/onboarding')
  }, [loading, habitData, router])

  useEffect(() => {
    if (habitData) setReady(true)
  }, [habitData])

  if (loading || !habitData || !config || !ready) {
    return (
      <div className="flex items-center justify-center min-h-dvh" style={{ background: 'var(--cream)' }}>
        <div className="w-8 h-8 rounded-full border-[3px] border-t-transparent animate-spin"
          style={{ borderColor: 'var(--green)', borderTopColor: 'transparent' }} />
      </div>
    )
  }

  const isGuest = !user
  const firstName = user?.displayName?.split(' ')[0] || (locale === 'en' ? 'Friend' : 'Pejuang')
  const inputs = config.extractInputs(habitData)
  const quitDateStr = habitData.quitDate.toDate().toLocaleDateString(locale === 'en' ? 'en-US' : 'id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  const mot = config.motivationMap[inputs.motivation] || config.motivations[0]

  return (
    <div className="min-h-dvh pb-16" style={{ background: 'var(--cream)' }}>

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="blob-green absolute -top-10 right-0 w-64 h-64 opacity-70" />
        <div className="blob-coral absolute top-1/2 -left-10 w-48 h-48 opacity-30" />
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-12 pb-4 relative z-10">
        <button onClick={() => router.back()}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-90"
          style={{ background: 'var(--card)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-2)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <h1 className="text-lg font-800" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text)' }}>
          {t('profile.title')}
        </h1>
      </div>

      <div className="px-5 space-y-4 relative z-10">

        {/* User info card */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-[24px] p-5 flex items-center gap-4"
          style={{ background: 'var(--card)', boxShadow: 'var(--shadow-card)', border: '1px solid var(--border)' }}>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden"
            style={{ background: 'var(--green-pale)', border: '2.5px solid var(--green-tint)' }}>
            {user?.photoURL ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.photoURL} alt="" referrerPolicy="no-referrer"
                className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl font-800" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--green-mid)' }}>
                {firstName[0]?.toUpperCase() || 'P'}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-base font-800 truncate" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text)' }}>
              {user?.displayName || (locale === 'en' ? 'Friend' : 'Pejuang')}
            </div>
            <div className="text-xs font-600 truncate" style={{ color: 'var(--text-3)' }}>
              {user?.email || t('profile.guestMode')}
            </div>
          </div>
        </motion.div>

        {/* Aggregate summary — only when user tracks 2+ habits */}
        {aggregate && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 }}
            className="rounded-[24px] p-5"
            style={{
              background: 'linear-gradient(135deg, var(--green-pale) 0%, var(--amber-pale) 100%)',
              border: '1.5px solid var(--green-tint)',
              boxShadow: 'var(--shadow-card)',
            }}>
            <div className="text-[10px] font-800 uppercase tracking-wider mb-2"
              style={{ color: 'var(--green-dark)', fontFamily: 'var(--font-nunito)' }}>
              {t('profile.aggregateTitle')}
            </div>
            <div className="grid grid-cols-3 gap-3">
              <AggStat value={String(aggregate.habitCount)} label={t('profile.aggregateHabits')} color="var(--green-dark)" />
              <AggStat value={formatNumber(aggregate.totalDays)} label={t('profile.aggregateTotalDays')} color="var(--coral-mid)" />
              <AggStat value={aggregate.totalMoney > 0 ? formatRupiah(aggregate.totalMoney) : '—'} label={t('profile.aggregateTotalSaved')} color="var(--amber-strong)" />
            </div>
          </motion.div>
        )}

        {/* Habit management — list onboarded + add new + hidden + archived */}
        {(onboardedHabits.length >= 2 || availableToAdd.length > 0 || hiddenHabits.length > 0 || archivedHabits.length > 0) && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
            className="rounded-[24px] overflow-hidden"
            style={{ background: 'var(--card)', boxShadow: 'var(--shadow-card)', border: '1px solid var(--border)' }}>

            {onboardedHabits.length >= 2 && (
              <div className="p-5">
                <h3 className="text-[10px] font-800 uppercase tracking-wider mb-3" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-nunito)' }}>
                  {t('profile.yourHabits')}
                </h3>
                <div className="space-y-2">
                  {onboardedHabits.map(({ config: c, data }) => {
                    const active = c.id === profile?.activeHabitId
                    const days = Math.max(0, Math.floor((Date.now() - data.quitDate.toDate().getTime()) / (1000 * 60 * 60 * 24)))
                    const confirming = confirmingArchiveId === c.id
                    const archiving = inlineArchivingId === c.id

                    if (confirming) {
                      return (
                        <div key={c.id} className="p-3 rounded-2xl space-y-2.5"
                          style={{ background: 'var(--coral-pale)', border: '1.5px solid var(--coral-tint)' }}>
                          <div className="flex items-start gap-2.5">
                            <span className="text-xl flex-shrink-0">{c.emoji}</span>
                            <div className="text-[11px] font-600 leading-relaxed"
                              style={{ color: 'var(--coral-mid)', fontFamily: 'var(--font-nunito)' }}>
                              {t('profile.archiveConfirmPrefix')} <b>{c.label}</b>{t('profile.archiveConfirmSuffix')}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <button onClick={() => setConfirmingArchiveId(null)} disabled={archiving}
                              className="py-2.5 rounded-xl text-xs font-800 transition-all active:scale-95 disabled:opacity-60"
                              style={{ fontFamily: 'var(--font-nunito)', background: 'var(--card)', border: '1.5px solid var(--border)', color: 'var(--text-2)' }}>
                              {t('common.cancel')}
                            </button>
                            <button onClick={() => handleInlineArchive(c.id)} disabled={archiving}
                              className="py-2.5 rounded-xl text-xs font-800 transition-all active:scale-95 disabled:opacity-60"
                              style={{ fontFamily: 'var(--font-nunito)', background: 'var(--coral)', color: 'white' }}>
                              {archiving
                                ? <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin mx-auto" />
                                : t('profile.archiveAction')}
                            </button>
                          </div>
                          {inlineArchiveError && (
                            <p className="text-[11px] font-600 text-center"
                              style={{ color: 'var(--coral-mid)', fontFamily: 'var(--font-nunito)' }}>
                              {inlineArchiveError}
                            </p>
                          )}
                        </div>
                      )
                    }

                    return (
                      <div key={c.id} className="flex items-center gap-1 p-3 rounded-2xl transition-all"
                        style={{
                          background: active ? 'var(--green-pale)' : 'var(--cream)',
                          border: `1.5px solid ${active ? 'var(--green-tint)' : 'var(--border)'}`,
                        }}>
                        <button onClick={() => !active && setActiveHabit(c.id)} disabled={active}
                          className="flex items-center gap-3 flex-1 min-w-0 text-left transition-all active:scale-[0.98]">
                          <span className="text-2xl">{c.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-800"
                              style={{ fontFamily: 'var(--font-nunito)', color: active ? 'var(--green-dark)' : 'var(--text)' }}>
                              {c.label}
                            </div>
                            <div className="text-[11px] font-600" style={{ color: 'var(--text-3)' }}>
                              {days} {t('profile.daysFreeShort')}
                            </div>
                          </div>
                          {active && (
                            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-800 text-white"
                              style={{ background: 'var(--green)' }}>
                              ✓
                            </div>
                          )}
                        </button>
                        <button
                          onClick={() => { setInlineArchiveError(''); setConfirmingArchiveId(c.id) }}
                          aria-label={`${t('profile.stopTracking')} ${c.label}`}
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all active:scale-90 hover-row text-lg"
                          style={{ color: 'var(--text-3)' }}>
                          ⋯
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {availableToAdd.length > 0 && (
              <div className="p-5" style={{ borderTop: onboardedHabits.length >= 2 ? '1px solid var(--border)' : undefined }}>
                <h3 className="text-[10px] font-800 uppercase tracking-wider mb-3" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-nunito)' }}>
                  {t('profile.addHabit')}
                </h3>
                <div className="space-y-2">
                  {availableToAdd.map(c => (
                    <button key={c.id}
                      onClick={() => router.push(`/onboarding?addHabit=${c.id}`)}
                      className="w-full flex items-center gap-3 p-3 rounded-2xl transition-all active:scale-[0.98]"
                      style={{
                        background: 'var(--cream)',
                        border: '1.5px dashed var(--border-mid)',
                      }}>
                      <span className="text-2xl">{c.emoji}</span>
                      <div className="flex-1 min-w-0 text-left">
                        <div className="text-sm font-800" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text)' }}>
                          {c.label}
                        </div>
                        <div className="text-[11px] font-600 truncate" style={{ color: 'var(--text-3)' }}>
                          {c.copy.heroTagline}
                        </div>
                      </div>
                      <span className="text-lg flex-shrink-0">➕</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {hiddenHabits.length > 0 && (
              <div className="p-5" style={{ borderTop: (onboardedHabits.length >= 2 || availableToAdd.length > 0) ? '1px solid var(--border)' : undefined }}>
                <h3 className="text-[10px] font-800 uppercase tracking-wider mb-3" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-nunito)' }}>
                  🙈 {t('profile.hiddenHabits')}
                </h3>
                <div className="space-y-2">
                  {hiddenHabits.map(({ config: c, data }) => {
                    const hasPin = !!(data as { pinHash?: string }).pinHash
                    return (
                      <button key={c.id}
                        onClick={() => setUnlockTarget({ config: c, data })}
                        className="w-full flex items-center gap-3 p-3 rounded-2xl transition-all active:scale-[0.98]"
                        style={{
                          background: 'var(--cream)',
                          border: '1.5px solid var(--border)',
                        }}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
                          style={{ background: 'var(--card)', border: '1.5px solid var(--border-mid)' }}>
                          {hasPin ? '🔒' : '🙈'}
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <div className="text-sm font-800" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text)' }}>
                            {c.label}
                          </div>
                          <div className="text-[11px] font-500" style={{ color: 'var(--text-3)' }}>
                            {hasPin ? t('profile.tapToUnlockPin') : t('profile.tapToUnlock')}
                          </div>
                        </div>
                        <span className="text-base leading-none" style={{ color: 'var(--text-3)' }}>›</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {archivedHabits.length > 0 && (
              <div className="p-5" style={{ borderTop: (onboardedHabits.length >= 2 || availableToAdd.length > 0 || hiddenHabits.length > 0) ? '1px solid var(--border)' : undefined }}>
                <h3 className="text-[10px] font-800 uppercase tracking-wider mb-3" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-nunito)' }}>
                  {t('profile.archivedHabits')}
                </h3>
                <div className="space-y-2">
                  {archivedHabits.map(({ config: c, data }) => {
                    const archivedOn = data.archivedAt
                      ? data.archivedAt.toDate().toLocaleDateString(locale === 'en' ? 'en-US' : 'id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
                      : null
                    return (
                      <div key={c.id} className="flex items-center gap-3 p-3 rounded-2xl"
                        style={{ background: 'var(--cream)', border: '1.5px solid var(--border)' }}>
                        <span className="text-2xl" style={{ filter: 'grayscale(1)', opacity: 0.55 }}>{c.emoji}</span>
                        <div className="flex-1 min-w-0 text-left">
                          <div className="text-sm font-700" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text-2)' }}>
                            {c.label}
                          </div>
                          <div className="text-[11px] font-500" style={{ color: 'var(--text-3)' }}>
                            {archivedOn ? `${t('profile.archivedOn')} ${archivedOn}` : t('profile.archived')}
                          </div>
                        </div>
                        <button onClick={() => restoreHabit(c.id)}
                          className="px-3 py-1.5 rounded-full text-[11px] font-800 transition-all active:scale-95"
                          style={{ background: 'var(--green-pale)', color: 'var(--green-mid)', border: '1.5px solid var(--green-tint)', fontFamily: 'var(--font-nunito)' }}>
                          {t('profile.restore')}
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Data summary card + edit button */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }}
          className="rounded-[24px] overflow-hidden"
          style={{ background: 'var(--card)', boxShadow: 'var(--shadow-card)', border: '1px solid var(--border)' }}>

          <div className="p-5 space-y-4">
            <SummaryRow emoji={config.onboarding.date.icon}  label={config.copy.quitDateLabel}       display={quitDateStr} />
            <SummaryRow emoji={config.onboarding.units.icon} label={config.copy.unitsPerPeriodLabel} display={`${inputs.unitsCount} ${config.copy.unitsLabel}`} />
            {config.hasMoneyTracking && config.onboarding.price && (
              <SummaryRow emoji={config.onboarding.price.icon} label={config.copy.pricePerUnitLabel}   display={formatRupiah(inputs.priceValue)} />
            )}
            <SummaryRow emoji={mot.icon} label={t('profile.motivation')} display={mot.label} />
          </div>

          <button onClick={() => setShowEdit(true)}
            className="w-full flex items-center justify-center gap-2 py-4 transition-all active:opacity-70"
            style={{ borderTop: '1px solid var(--border)' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--green-mid)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            <span className="text-sm font-800" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--green-mid)' }}>
              {t('profile.editData')}
            </span>
          </button>
        </motion.div>

        {/* Preferences — language + theme mode live in one card so the
            settings surface stays compact. No overflow-hidden on the
            outer card: both rows contain dropdown popovers that need
            to spill past the card's bottom edge. The z-index makes the
            popovers float above the neighboring account card below. */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.10 }}
          className="rounded-[24px] relative z-20"
          style={{ background: 'var(--card)', boxShadow: 'var(--shadow-card)', border: '1px solid var(--border)' }}>
          <div className="p-5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
              style={{ background: 'var(--amber-pale)', border: '1.5px solid var(--amber-tint)' }}>
              🌐
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-800" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text)' }}>
                {t('profile.language')}
              </div>
              <div className="text-[11px] font-500" style={{ color: 'var(--text-3)' }}>
                Bahasa Indonesia · English
              </div>
            </div>
            <LanguageSelector />
          </div>
          <div className="p-5 flex items-center gap-3" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
              style={{ background: 'var(--lavender-pale)', border: '1.5px solid var(--lavender-tint)' }}>
              🎨
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-800" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text)' }}>
                {t('profile.theme')}
              </div>
              <div className="text-[11px] font-500" style={{ color: 'var(--text-3)' }}>
                {t('profile.themeSub')}
              </div>
            </div>
            <ThemeToggle />
          </div>
        </motion.div>

        {/* Account actions */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}
          className="rounded-[24px] p-5"
          style={{ background: 'var(--card)', boxShadow: 'var(--shadow-card)', border: '1px solid var(--border)' }}>
          {isGuest ? (
            <button onClick={() => router.push('/')}
              className="w-full flex items-center gap-3 py-2 transition-all active:opacity-70">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--green-pale)' }}>
                <GoogleIcon />
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-700" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text)' }}>
                  {t('landing.signInGoogle')}
                </div>
                <div className="text-xs font-500" style={{ color: 'var(--text-3)' }}>
                  {t('profile.signInToSync')}
                </div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          ) : (
            <button onClick={() => logout().then(() => router.push('/'))}
              className="w-full flex items-center gap-3 py-2 transition-all active:opacity-70">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--coral-pale)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--coral)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-700" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--coral)' }}>
                  {t('profile.logout')}
                </div>
                <div className="text-xs font-500" style={{ color: 'var(--text-3)' }}>
                  {user?.email}
                </div>
              </div>
            </button>
          )}
        </motion.div>
      </div>

      {/* Edit bottom sheet */}
      <AnimatePresence>
        {showEdit && (
          <EditSheet
            data={habitData}
            config={config}
            canArchive={onboardedHabits.length >= 2}
            onClose={() => setShowEdit(false)}
            onSave={async (partial) => {
              await updateActiveHabitData(partial)
              setShowEdit(false)
            }}
            onArchive={async () => {
              await archiveHabit(config.id)
              setShowEdit(false)
            }}
          />
        )}
      </AnimatePresence>

      {/* PIN unlock sheet for hidden habits */}
      <PinUnlockSheet
        open={!!unlockTarget}
        habitId={unlockTarget?.config.id ?? null}
        config={unlockTarget?.config ?? null}
        data={unlockTarget?.data ?? null}
        onClose={() => setUnlockTarget(null)}
      />
    </div>
  )
}

/* ── Summary row ── */

function AggStat({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div className="text-center">
      <div className="font-900 text-lg leading-none"
        style={{ fontFamily: 'var(--font-fraunces)', color, letterSpacing: '-0.02em' }}>
        {value}
      </div>
      <div className="text-[10px] font-700 mt-1" style={{ color: 'var(--text-3)' }}>{label}</div>
    </div>
  )
}

function SummaryRow({ emoji, label, display }: { emoji: string; label: string; display: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-base"
        style={{ background: 'var(--cream)', border: '1px solid var(--border)' }}>
        {emoji}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] font-600" style={{ color: 'var(--text-3)' }}>{label}</div>
        <div className="text-sm font-800 truncate" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text)' }}>
          {display}
        </div>
      </div>
    </div>
  )
}

/* ── Edit bottom sheet ── */

function EditSheet({
  data,
  config,
  canArchive,
  onClose,
  onSave,
  onArchive,
}: {
  data: HabitData
  config: HabitConfig
  canArchive: boolean
  onClose: () => void
  onSave: (partial: Partial<HabitData>) => Promise<void>
  onArchive: () => Promise<void>
}) {
  const { t, locale } = useI18n()
  const today = new Date().toISOString().split('T')[0]
  const initial = config.extractInputs(data)
  const [quitDate, setQuitDate] = useState(data.quitDate.toDate().toISOString().split('T')[0])
  const [unitsCount, setUnitsCount] = useState(initial.unitsCount)
  const [priceValue, setPriceValue] = useState(initial.priceValue)
  const [motivation, setMotivation] = useState(initial.motivation || config.motivations[0]?.id)
  const [saving, setSaving] = useState(false)
  const [step, setStep] = useState(0)
  const [confirmingArchive, setConfirmingArchive] = useState(false)
  const [archiving, setArchiving] = useState(false)
  const [archiveError, setArchiveError] = useState('')

  const handleArchive = async () => {
    setArchiving(true); setArchiveError('')
    try {
      await onArchive()
    } catch (e: any) {
      setArchiveError(e?.message || t('profile.stopTrackingError'))
      setConfirmingArchive(false)
      setArchiving(false)
    }
  }

  const onb = config.onboarding

  const handleSave = useCallback(async () => {
    setSaving(true)
    const full = config.constructData({
      quitDate: Timestamp.fromDate(new Date(quitDate + 'T00:00:00')),
      unitsCount,
      priceValue,
      motivation,
    })
    await onSave(full)
  }, [quitDate, unitsCount, priceValue, motivation, config, onSave])

  // Skip the 'price' step if this habit has no money tracking (e.g. porn).
  // Privacy edits are out of scope for the quick edit sheet — handled via
  // a dedicated privacy flow elsewhere.
  type EditStepKind = 'date' | 'units' | 'price' | 'motivation'
  const steps: Array<{ kind: EditStepKind; icon: string; title: string }> = [
    { kind: 'date',       icon: onb.date.icon,       title: config.copy.quitDateLabel },
    { kind: 'units',      icon: onb.units.icon,      title: config.copy.unitsPerPeriodLabel },
    ...(onb.price ? [{ kind: 'price' as const, icon: onb.price.icon, title: config.copy.pricePerUnitLabel }] : []),
    { kind: 'motivation', icon: onb.motivation.icon, title: locale === 'en' ? 'Main Motivation' : 'Motivasi Utama' },
  ]

  const currentKind = steps[step]?.kind
  const isLast = step === steps.length - 1

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60]"
        style={{ background: 'var(--overlay)', backdropFilter: 'blur(6px)' }}
        onClick={onClose}
      />

      {/* Sheet */}
      <motion.div
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 380 }}
        className="fixed inset-x-0 bottom-0 z-[61] max-h-[92dvh] overflow-y-auto"
      >
        <div className="w-full max-w-[430px] mx-auto rounded-t-[32px] px-6 pt-5 pb-10"
          style={{ background: 'var(--cream)' }}>

          {/* Handle */}
          <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: 'var(--border-mid)' }} />

          {/* Header with close */}
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="text-xl leading-none">{steps[step].icon}</span>
              <AnimatePresence mode="wait">
                <motion.h3
                  key={step}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.15 }}
                  className="text-lg font-900"
                  style={{ fontFamily: 'var(--font-fraunces)', color: 'var(--text)', letterSpacing: '-0.02em' }}>
                  {steps[step].title}
                </motion.h3>
              </AnimatePresence>
            </div>
            <button onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--border)', color: 'var(--text-2)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Step indicator */}
          <div className="flex gap-1.5 my-4">
            {steps.map((_, i) => (
              <motion.div
                key={i}
                className="h-1 rounded-full flex-1"
                style={{ background: i <= step ? 'var(--green)' : 'var(--border)' }}
                animate={{ background: i <= step ? 'var(--green)' : 'var(--border)' }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>

          {/* Step content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="min-h-[280px]"
            >
              {currentKind === 'date' && (
                <CalendarPicker value={quitDate} onChange={setQuitDate} max={today} />
              )}

              {currentKind === 'units' && (
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-4">
                    <button onClick={() => setUnitsCount(Math.max(onb.units.min, unitsCount - 1))}
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-800 transition-all active:scale-90"
                      style={{ background: 'var(--border)', color: 'var(--text-2)' }}>−</button>
                    <div className="flex-1 text-center">
                      <motion.span
                        key={unitsCount}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-5xl font-900 inline-block"
                        style={{ fontFamily: 'var(--font-fraunces)', color: 'var(--text)' }}>
                        {unitsCount}
                      </motion.span>
                      <div className="text-xs font-600 mt-1" style={{ color: 'var(--text-3)' }}>{onb.units.label}</div>
                    </div>
                    <button onClick={() => setUnitsCount(Math.min(onb.units.max, unitsCount + 1))}
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-800 transition-all active:scale-90"
                      style={{ background: 'var(--green-pale)', color: 'var(--green-mid)' }}>+</button>
                  </div>
                  <input type="range" min={onb.units.min} max={onb.units.max} value={unitsCount} onChange={e => setUnitsCount(+e.target.value)}
                    className="w-full accent-green-600" />
                  <div className="flex flex-wrap gap-1.5">
                    {onb.units.presets.map(n => (
                      <button key={n} onClick={() => setUnitsCount(n)}
                        className="px-3.5 py-2 rounded-xl text-xs font-700 transition-all active:scale-95"
                        style={{
                          fontFamily: 'var(--font-nunito)',
                          background: unitsCount === n ? 'var(--green-pale)' : 'var(--card)',
                          color: unitsCount === n ? 'var(--green-mid)' : 'var(--text-3)',
                          border: `1.5px solid ${unitsCount === n ? 'var(--green-tint)' : 'var(--border)'}`,
                        }}>{n}</button>
                    ))}
                  </div>
                </div>
              )}

              {currentKind === 'price' && onb.price && (
                <div className="space-y-4 pt-2">
                  <div className="rounded-2xl overflow-hidden"
                    style={{ background: 'var(--card)', border: '1.5px solid var(--border)' }}>
                    <div className="flex items-center px-4">
                      <span className="text-base font-700" style={{ color: 'var(--text-3)' }}>Rp</span>
                      <input type="number" value={priceValue} onChange={e => setPriceValue(+e.target.value)}
                        className="flex-1 bg-transparent py-4 px-2 text-2xl font-800 focus:outline-none"
                        style={{ fontFamily: 'var(--font-fraunces)', color: 'var(--text)' }} />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {onb.price.presets.map(n => (
                      <button key={n} onClick={() => setPriceValue(n)}
                        className="px-3.5 py-2 rounded-xl text-xs font-700 transition-all active:scale-95"
                        style={{
                          fontFamily: 'var(--font-nunito)',
                          background: priceValue === n ? 'var(--amber-pale)' : 'var(--card)',
                          color: priceValue === n ? 'var(--amber)' : 'var(--text-3)',
                          border: `1.5px solid ${priceValue === n ? 'var(--amber-tint)' : 'var(--border)'}`,
                        }}>{formatRupiah(n)}</button>
                    ))}
                  </div>
                </div>
              )}

              {currentKind === 'motivation' && (
                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  {config.motivations.map(m => (
                    <motion.button key={m.id}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setMotivation(m.id)}
                      className="flex items-center gap-2.5 p-3.5 rounded-2xl text-left transition-colors"
                      style={{
                        background: motivation === m.id ? 'var(--green-pale)' : 'var(--card)',
                        border: `1.5px solid ${motivation === m.id ? 'var(--green-tint)' : 'var(--border)'}`,
                      }}>
                      <span className="text-xl">{m.icon}</span>
                      <span className="text-xs font-700" style={{
                        fontFamily: 'var(--font-nunito)',
                        color: motivation === m.id ? 'var(--green-mid)' : 'var(--text-2)',
                      }}>{m.label}</span>
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex gap-2 mt-6">
            {step > 0 && (
              <button onClick={() => setStep(s => s - 1)}
                className="px-5 py-4 rounded-2xl text-sm font-800 transition-all active:scale-[0.97]"
                style={{
                  fontFamily: 'var(--font-nunito)',
                  background: 'var(--card)',
                  color: 'var(--text-2)',
                  border: '1.5px solid var(--border)',
                }}>
                {t('common.back')}
              </button>
            )}
            <button
              onClick={isLast ? handleSave : () => setStep(s => s + 1)}
              disabled={saving}
              className="flex-1 py-4 rounded-2xl text-sm font-800 flex items-center justify-center gap-2 transition-all active:scale-[0.97] disabled:opacity-60"
              style={{
                fontFamily: 'var(--font-nunito)',
                background: 'var(--green)',
                color: 'white',
                boxShadow: '0 4px 20px rgba(61,190,143,0.35)',
              }}>
              {saving
                ? <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                : isLast
                  ? `✓ ${t('common.save')}`
                  : `${t('common.next')} →`}
            </button>
          </div>

          {/* Archive (soft-delete) — tucked under the save button so it's
              discoverable but never accidentally triggered. Two-step confirm
              prevents one-tap loss of tracking. */}
          <div className="mt-6 pt-5" style={{ borderTop: '1px solid var(--border)' }}>
            {confirmingArchive ? (
              <div className="space-y-3">
                <p className="text-xs font-600 text-center leading-relaxed"
                  style={{ color: 'var(--text-2)', fontFamily: 'var(--font-nunito)' }}>
                  {locale === 'en'
                    ? 'Stop tracking this habit? Your data stays safe and can be restored anytime.'
                    : 'Yakin hentikan pantauan kebiasaan ini? Data kamu tetap aman dan bisa dipulihkan kapan saja.'}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => setConfirmingArchive(false)} disabled={archiving}
                    className="py-3 rounded-xl text-xs font-800 transition-all active:scale-95 disabled:opacity-60"
                    style={{ background: 'var(--card)', border: '1.5px solid var(--border)', color: 'var(--text-2)', fontFamily: 'var(--font-nunito)' }}>
                    {t('common.cancel')}
                  </button>
                  <button onClick={handleArchive} disabled={archiving}
                    className="py-3 rounded-xl text-xs font-800 transition-all active:scale-95 disabled:opacity-60"
                    style={{ background: 'var(--coral)', color: 'white', fontFamily: 'var(--font-nunito)' }}>
                    {archiving
                      ? <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin mx-auto" />
                      : (locale === 'en' ? '📦 Yes, stop' : '📦 Ya, Hentikan')}
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => canArchive && setConfirmingArchive(true)}
                disabled={!canArchive}
                className="w-full py-2 text-xs font-700 transition-opacity active:opacity-50 disabled:opacity-40"
                style={{ color: canArchive ? 'var(--coral-mid)' : 'var(--text-3)', fontFamily: 'var(--font-nunito)' }}>
                {canArchive
                  ? (locale === 'en' ? 'Stop tracking this habit' : 'Hentikan Pantauan Kebiasaan Ini')
                  : (locale === 'en'
                      ? 'Add another habit first before stopping this one'
                      : 'Tambah kebiasaan lain dulu untuk bisa menghentikan yang ini')}
              </button>
            )}
            {archiveError && (
              <p className="text-xs text-center mt-3 font-600"
                style={{ color: 'var(--coral-mid)', fontFamily: 'var(--font-nunito)' }}>
                {archiveError}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </>
  )
}

/* ── Icons ── */

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}
