'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useUserData } from '@/contexts/UserDataContext'
import { getHabitConfig, getEnabledHabitConfigs } from '@/habits/registry'
import { useUnlock } from '@/habits/UnlockContext'
import { useI18n } from '@/i18n/I18nProvider'
import type { HabitConfig, HabitData, HabitId } from '@/habits/types'

interface OnboardedHabit {
  config: HabitConfig
  data: HabitData
}

/**
 * Compact pill + bottom sheet for switching the active habit and discovering
 * new ones. The pill shows as long as there's something to offer — either
 * another active habit to switch to, or a registered habit the user hasn't
 * onboarded yet. Hidden habits never appear here unless the user unlocked
 * them from Profil this session.
 */
export function HabitSelector() {
  const router = useRouter()
  const { profile, setActiveHabit } = useUserData()
  const { isUnlocked } = useUnlock()
  const { locale, t } = useI18n()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const { onboarded, availableToAdd } = useMemo(() => {
    const emptyAvailable: HabitConfig[] = []
    if (!profile) return { onboarded: [] as OnboardedHabit[], availableToAdd: emptyAvailable }
    const enabled = getEnabledHabitConfigs(locale)
    const habitsMap = (profile.habits ?? {}) as Record<string, HabitData | undefined>
    const onboarded: OnboardedHabit[] = []
    const availableToAdd: HabitConfig[] = []
    for (const c of enabled) {
      const data = habitsMap[c.id]
      if (!data) { availableToAdd.push(c); continue }
      if (data.archived) continue
      if ('privacy' in data && (data as { privacy?: string }).privacy === 'hidden' && !isUnlocked(c.id)) continue
      onboarded.push({ config: c, data: data as HabitData })
    }
    return { onboarded, availableToAdd }
  }, [profile, isUnlocked, locale])

  if (!profile) return null

  const activeConfig = getHabitConfig(profile.activeHabitId, locale)
  if (!activeConfig) return null

  // Nothing to offer beyond the current single active habit: hide the pill.
  if (onboarded.length < 2 && availableToAdd.length === 0) return null

  const activeId = profile.activeHabitId

  const handleSelect = async (habitId: HabitId) => {
    setOpen(false)
    if (habitId !== activeId) {
      await setActiveHabit(habitId)
    }
  }

  const handleAdd = (habitId: HabitId) => {
    setOpen(false)
    router.push(`/onboarding?addHabit=${habitId}`)
  }

  const sheet = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-end"
          style={{ background: 'var(--overlay)', backdropFilter: 'blur(6px)' }}
          onClick={e => e.target === e.currentTarget && setOpen(false)}
        >
          <motion.div
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 380 }}
            className="w-full max-w-[430px] mx-auto rounded-t-[32px] px-6 pt-5 pb-10 max-h-[80dvh] overflow-y-auto"
            style={{ background: 'var(--cream)' }}
          >
            <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: 'var(--border-mid)' }} />
            <h3 className="tracking-tight mb-4"
              style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>
              {t('selector.title')}
            </h3>

            <div className="space-y-2">
              {onboarded.map(({ config }) => {
                const active = config.id === activeId
                return (
                  <button key={config.id} onClick={() => handleSelect(config.id)}
                    className="w-full flex items-center gap-3 p-4 rounded-2xl transition-all active:scale-[0.98]"
                    style={{
                      background: active ? 'var(--green-pale)' : 'var(--card)',
                      border: `1.5px solid ${active ? 'var(--green-tint)' : 'var(--border)'}`,
                      boxShadow: active ? '0 2px 8px rgba(61,190,143,0.12)' : 'var(--shadow-sm)',
                    }}>
                    <span className="text-2xl">{config.emoji}</span>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="text-sm font-800"
                        style={{ fontFamily: 'var(--font-nunito)', color: active ? 'var(--green-dark)' : 'var(--text)' }}>
                        {config.label}
                      </div>
                      <div className="text-xs font-500 truncate" style={{ color: 'var(--text-3)' }}>
                        {config.copy.heroTagline}
                      </div>
                    </div>
                    {active && <span className="text-lg flex-shrink-0">✅</span>}
                  </button>
                )
              })}
            </div>

            {availableToAdd.length > 0 && (
              <>
                <div className="flex items-center gap-3 my-5">
                  <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
                  <span className="text-[10px] font-800 uppercase tracking-wider"
                    style={{ color: 'var(--text-3)', fontFamily: 'var(--font-nunito)' }}>
                    {t('selector.addHabit')}
                  </span>
                  <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
                </div>
                <div className="space-y-2">
                  {availableToAdd.map(c => (
                    <button key={c.id} onClick={() => handleAdd(c.id)}
                      className="w-full flex items-center gap-3 p-4 rounded-2xl text-left transition-all active:scale-[0.98]"
                      style={{
                        background: 'var(--card)',
                        border: '1.5px dashed var(--border-mid)',
                      }}>
                      <span className="text-2xl">{c.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-800" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text)' }}>
                          {c.label}
                        </div>
                        <div className="text-xs font-500 truncate" style={{ color: 'var(--text-3)' }}>
                          {c.copy.heroTagline}
                        </div>
                      </div>
                      <span className="text-lg flex-shrink-0">➕</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label={t('selector.ariaPick')}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all active:scale-95"
        style={{
          background: 'var(--card)',
          border: '1.5px solid var(--border)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <span className="text-base leading-none">{activeConfig.emoji}</span>
        <span className="text-xs font-700"
          style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text)' }}>
          {activeConfig.label}
        </span>
        <span className="text-[11px] leading-none" style={{ color: 'var(--text-3)' }}>▾</span>
      </button>
      {mounted && createPortal(sheet, document.body)}
    </>
  )
}
