'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Timestamp } from 'firebase/firestore'
import CalendarPicker from '@/components/CalendarPicker'
import { useAuth } from '@/contexts/AuthContext'
import { useUserData } from '@/contexts/UserDataContext'
import { createUserProfile } from '@/lib/firestore'
import { formatRupiah } from '@/lib/utils'
import { getEnabledHabitConfigs, getHabitConfig } from '@/habits/registry'
import { buildSmokingConfig } from '@/habits/smoking/config'
import { generatePinSalt, hashPin, isValidPinFormat } from '@/habits/pin'
import { useI18n } from '@/i18n/I18nProvider'
import type { HabitConfig, HabitData, HabitId, OnboardingStepKind } from '@/habits/types'

const VALID_HABIT_IDS: HabitId[] = ['smoking', 'alcohol', 'porn', 'sugar']

export default function OnboardingPage() {
  return (
    <Suspense fallback={<OnboardingFallback />}>
      <OnboardingFlow />
    </Suspense>
  )
}

function OnboardingFallback() {
  return (
    <div className="flex items-center justify-center min-h-dvh" style={{ background: 'var(--cream)' }}>
      <div className="w-8 h-8 rounded-full border-[3px] border-t-transparent animate-spin"
        style={{ borderColor: 'var(--green)', borderTopColor: 'transparent' }} />
    </div>
  )
}

function OnboardingFlow() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const { profile, refreshProfile, saveLocalProfile, addHabit } = useUserData()
  const { locale, t } = useI18n()

  // Add-mode: triggered from Profil "Tambah Kebiasaan". Habit is pre-chosen,
  // picker step is skipped, and the existing profile is updated rather than
  // replaced. Invalid ids fall back to first-run onboarding.
  const addHabitParam = searchParams.get('addHabit')
  const addHabitId = (addHabitParam && VALID_HABIT_IDS.includes(addHabitParam as HabitId))
    ? (addHabitParam as HabitId)
    : null
  const isAddMode = !!addHabitId

  const enabledHabits = useMemo(() => getEnabledHabitConfigs(locale), [locale])
  const showHabitPicker = !isAddMode && enabledHabits.length > 1
  const [pickedHabitId, setPickedHabitId] = useState<HabitId>(
    addHabitId ?? (enabledHabits[0]?.id ?? 'smoking'),
  )
  const pickedConfig: HabitConfig = getHabitConfig(pickedHabitId, locale) ?? (buildSmokingConfig(locale) as HabitConfig)
  const onb = pickedConfig.onboarding
  const habitSteps = onb.steps
  const habitStepsStart = showHabitPicker ? 1 : 0
  const totalSteps = (showHabitPicker ? 1 : 0) + habitSteps.length

  const [step, setStep] = useState(0)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  const today = new Date().toISOString().split('T')[0]
  const [quitDate, setQuitDate]     = useState(today)
  const [unitsCount, setUnitsCount] = useState(onb.units.default)
  const [priceValue, setPriceValue] = useState(onb.price?.default ?? 0)
  const [motivation, setMotivation] = useState(pickedConfig.motivations[0]?.id ?? 'kesehatan')

  // Privacy step state (only used when habit opts in via steps array).
  const [privacy, setPrivacy]       = useState<'visible' | 'hidden'>('hidden')
  const [usePin, setUsePin]         = useState(false)
  const [pin, setPin]               = useState('')
  const [pinConfirm, setPinConfirm] = useState('')
  const [pinError, setPinError]     = useState('')

  // Reset inputs to the picked habit's defaults when the picker changes choice.
  useEffect(() => {
    setUnitsCount(pickedConfig.onboarding.units.default)
    if (pickedConfig.onboarding.price) setPriceValue(pickedConfig.onboarding.price.default)
    if (!pickedConfig.motivationMap[motivation]) {
      setMotivation(pickedConfig.motivations[0]?.id ?? 'kesehatan')
    }
    setPrivacy('hidden')
    setUsePin(false)
    setPin('')
    setPinConfirm('')
    setPinError('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickedHabitId])

  const isLast = step === totalSteps - 1
  const progress = ((step + 1) / totalSteps) * 100
  const isHabitStep = showHabitPicker && step === 0
  const habitStepIndex = step - habitStepsStart
  const currentStepKind: OnboardingStepKind | null = isHabitStep ? null : habitSteps[habitStepIndex] ?? null

  const stepMeta = isHabitStep
    ? { icon: '🎯', title: t('onboarding.chooseHabit'), sub: t('onboarding.chooseHabitSub') }
    : currentStepKind === 'date'       ? onb.date
    : currentStepKind === 'units'      ? onb.units
    : currentStepKind === 'price'      ? (onb.price ?? onb.date)
    : currentStepKind === 'privacy'    ? (onb.privacy ?? onb.date)
    : onb.motivation

  const handleNext = async () => {
    if (!isLast) { setStep(s => s + 1); return }

    if (habitSteps.includes('privacy') && privacy === 'hidden' && usePin) {
      if (!isValidPinFormat(pin)) {
        setPinError(t('onboarding.privacy.pinInvalid'))
        return
      }
      if (pin !== pinConfirm) {
        setPinError(t('onboarding.privacy.pinMismatch'))
        return
      }
    }

    setSaving(true); setSaveError(''); setPinError('')

    let pinHash: string | undefined
    let pinSalt: string | undefined
    if (habitSteps.includes('privacy') && privacy === 'hidden' && usePin) {
      pinSalt = generatePinSalt()
      pinHash = await hashPin(pin, pinSalt)
    }

    const habitData: HabitData = pickedConfig.constructData({
      quitDate: Timestamp.fromDate(new Date(quitDate + 'T00:00:00')),
      unitsCount,
      priceValue,
      motivation,
      ...(habitSteps.includes('privacy') ? { privacy } : {}),
      ...(pinHash ? { pinHash } : {}),
      ...(pinSalt ? { pinSalt } : {}),
    })

    try {
      if (isAddMode) {
        if (!profile) {
          router.push('/onboarding')
          return
        }
        // Hidden habits don't auto-promote to active — that would surface them
        // in the selector, defeating the point. User activates via Profil.
        const setActive = !(habitSteps.includes('privacy') && privacy === 'hidden')
        await addHabit(pickedHabitId, habitData, setActive)
        router.push(setActive ? '/dashboard' : '/profil')
      } else if (user) {
        await createUserProfile(user.uid, {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          activeHabitId: pickedHabitId,
          habits: { [pickedHabitId]: habitData },
        })
        await refreshProfile()
        localStorage.setItem('smoke_free_onboarding_done', '1')
        router.push('/dashboard')
      } else {
        saveLocalProfile({
          displayName: null,
          email: null,
          photoURL: null,
          activeHabitId: pickedHabitId,
          habits: { [pickedHabitId]: habitData },
        })
        router.push('/dashboard')
      }
    } catch (e: any) {
      const offline = e?.code === 'unavailable' || e?.message?.includes('offline')
      setSaveError(offline
        ? (locale === 'en'
            ? 'Can\'t connect to the database. Create Firestore in Firebase Console first.'
            : 'Tidak dapat terhubung ke database. Buat Firestore di Firebase Console terlebih dahulu.')
        : e?.message || t('onboarding.errorSave'))
      setSaving(false)
    }
  }

  return (
    <div className="min-h-dvh flex flex-col px-6 pt-12 pb-10 relative overflow-hidden" style={{ background: 'var(--cream)' }}>

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="blob-green absolute -top-16 -right-16 w-56 h-56 opacity-60" />
        <div className="blob-amber absolute bottom-20 -left-10 w-44 h-44 opacity-40" />
      </div>

      <div className="relative z-10 mb-10">
        <div className="flex justify-between items-center mb-2.5">
          <span className="text-sm font-700" style={{ color: 'var(--text-3)' }}>
            {t('onboarding.step')} {step + 1} {t('onboarding.of')} {totalSteps}
          </span>
          <span className="text-sm font-800" style={{ color: 'var(--green-mid)' }}>
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
          <motion.div className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, var(--coral), var(--amber), var(--green))' }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={step}
          initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -28 }}
          transition={{ duration: 0.22 }}
          className="flex-1 relative z-10"
        >
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07 }}
            className="mb-8"
          >
            <div className="mb-4 text-5xl leading-none">{stepMeta.icon}</div>
            <h2 className="mb-1 tracking-tight"
              style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>
              {stepMeta.title}
            </h2>
            <p className="text-base font-500" style={{ color: 'var(--text-2)' }}>{stepMeta.sub}</p>
          </motion.div>

          {isHabitStep && (
            <div className="grid grid-cols-2 gap-2.5">
              {enabledHabits.map(h => {
                const active = pickedHabitId === h.id
                return (
                  <button key={h.id} onClick={() => setPickedHabitId(h.id)}
                    className="p-4 rounded-2xl text-left transition-all active:scale-[0.97]"
                    style={{
                      background: active ? 'var(--green-pale)' : 'var(--card)',
                      border: `1.5px solid ${active ? 'var(--green-tint)' : 'var(--border)'}`,
                      boxShadow: active ? '0 4px 16px rgba(61,190,143,0.15)' : 'var(--shadow-sm)',
                    }}>
                    <div className="text-2xl mb-2">{h.emoji}</div>
                    <div className="text-sm font-800"
                      style={{ fontFamily: 'var(--font-nunito)', color: active ? 'var(--green-dark)' : 'var(--text-2)' }}>
                      {h.label}
                    </div>
                  </button>
                )
              })}
            </div>
          )}

          {currentStepKind === 'date' && (
            <CalendarPicker value={quitDate} onChange={setQuitDate} max={today} />
          )}

          {currentStepKind === 'units' && (
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-5">
                <SpinBtn onClick={() => setUnitsCount(Math.max(onb.units.min, unitsCount - 1))}>−</SpinBtn>
                <div className="text-center min-w-[100px]">
                  <div className="leading-none tabular-nums"
                    style={{ fontFamily: 'var(--font-fraunces)', fontSize: '72px', fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.04em' }}>
                    {unitsCount}
                  </div>
                  <div className="text-xs font-700 mt-1" style={{ color: 'var(--text-3)' }}>{onb.units.label}</div>
                </div>
                <SpinBtn onClick={() => setUnitsCount(Math.min(onb.units.max, unitsCount + 1))}>+</SpinBtn>
              </div>
              <input type="range"
                min={onb.units.min}
                max={Math.min(onb.units.max, 60)}
                value={unitsCount}
                onChange={e => setUnitsCount(Number(e.target.value))}
                className="w-full" style={{ accentColor: 'var(--green)' }} />
              <div className="grid grid-cols-3 gap-2">
                {onb.units.presets.map(n => (
                  <Chip key={n} active={unitsCount === n} onClick={() => setUnitsCount(n)}>{n} {pickedConfig.copy.unitsLabel}</Chip>
                ))}
              </div>
            </div>
          )}

          {currentStepKind === 'price' && onb.price && (
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden"
                style={{ background: 'var(--card)', border: '1.5px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-800"
                  style={{ color: 'var(--text-2)', fontFamily: 'var(--font-nunito)' }}>Rp</span>
                <input type="number" value={priceValue}
                  onChange={e => setPriceValue(Math.max(1000, Number(e.target.value)))}
                  step="1000" min="1000"
                  className="w-full bg-transparent pl-12 pr-20 py-4 text-xl font-900 text-center focus:outline-none"
                  style={{ color: 'var(--text)', fontFamily: 'var(--font-fraunces)' }} />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-600"
                  style={{ color: 'var(--text-3)' }}>{onb.price.suffix ?? ''}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {onb.price.presets.map(n => (
                  <Chip key={n} active={priceValue === n} onClick={() => setPriceValue(n)} color="amber">
                    {formatRupiah(n)}
                  </Chip>
                ))}
              </div>
              <div className="rounded-2xl px-4 py-3.5 text-sm font-700 text-center"
                style={{ background: 'var(--amber-pale)', color: 'var(--amber-strong)', border: '1.5px solid var(--amber-tint)' }}>
                🎉 {locale === 'en' ? 'You\'ll save ' : 'Kamu akan hemat '}
                <span style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 900 }}>
                  {formatRupiah(pickedConfig.previewYearlySavings(unitsCount, priceValue))}
                </span>{' '}
                {locale === 'en' ? 'per year!' : 'per tahun!'}
              </div>
            </div>
          )}

          {currentStepKind === 'privacy' && (
            <PrivacyStep
              privacy={privacy} setPrivacy={setPrivacy}
              usePin={usePin} setUsePin={setUsePin}
              pin={pin} setPin={setPin}
              pinConfirm={pinConfirm} setPinConfirm={setPinConfirm}
              pinError={pinError}
              locale={locale}
              t={t}
            />
          )}

          {currentStepKind === 'motivation' && (
            <div className="grid grid-cols-2 gap-2.5">
              {pickedConfig.motivations.map(({ id, label, icon: motIcon }) => {
                const active = motivation === id
                return (
                  <button key={id} onClick={() => setMotivation(id)}
                    className="p-4 rounded-2xl text-left transition-all active:scale-[0.97]"
                    style={{
                      background: active ? 'var(--green-pale)' : 'var(--card)',
                      border: `1.5px solid ${active ? 'var(--green-tint)' : 'var(--border)'}`,
                      boxShadow: active ? '0 4px 16px rgba(61,190,143,0.15)' : 'var(--shadow-sm)',
                    }}>
                    <div className="text-2xl mb-2">{motIcon}</div>
                    <div className="text-sm font-800"
                      style={{ fontFamily: 'var(--font-nunito)', color: active ? 'var(--green-dark)' : 'var(--text-2)' }}>
                      {label}
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {saveError && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mt-4 rounded-2xl px-4 py-3 text-sm font-600 relative z-10"
            style={{ background: 'var(--coral-pale)', color: 'var(--coral-mid)', border: '1.5px solid var(--coral-tint)' }}
          >{saveError}</motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3 mt-6 relative z-10">
        {step > 0 && (
          <button onClick={() => setStep(s => s - 1)}
            className="flex-1 py-4 rounded-2xl text-sm font-700 transition-all active:scale-[0.97]"
            style={{ background: 'var(--card)', border: '1.5px solid var(--border)', color: 'var(--text-2)', boxShadow: 'var(--shadow-sm)', fontFamily: 'var(--font-nunito)' }}>
            {t('common.back')}
          </button>
        )}
        <button onClick={handleNext} disabled={saving}
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
              ? (isAddMode
                  ? <span>✅ {t('profile.addHabit')}</span>
                  : `🚀 ${t('onboarding.finish')}`)
              : <span>{t('onboarding.continue')} →</span>
          }
        </button>
      </div>
    </div>
  )
}

function PrivacyStep({
  privacy, setPrivacy, usePin, setUsePin, pin, setPin, pinConfirm, setPinConfirm, pinError, locale, t,
}: {
  privacy: 'visible' | 'hidden'
  setPrivacy: (p: 'visible' | 'hidden') => void
  usePin: boolean
  setUsePin: (v: boolean) => void
  pin: string
  setPin: (v: string) => void
  pinConfirm: string
  setPinConfirm: (v: string) => void
  pinError: string
  locale: 'id' | 'en'
  t: (k: any) => string
}) {
  const options: Array<{ val: 'hidden' | 'visible'; title: string; desc: string; icon: string }> = [
    { val: 'hidden',  title: t('onboarding.privacy.hiddenTitle'),  desc: t('onboarding.privacy.hiddenSub'),  icon: '🙈' },
    { val: 'visible', title: t('onboarding.privacy.visibleTitle'), desc: t('onboarding.privacy.visibleSub'), icon: '👁️' },
  ]

  const onlyDigits = (v: string) => v.replace(/\D/g, '').slice(0, 6)

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {options.map(o => {
          const active = privacy === o.val
          return (
            <button key={o.val} onClick={() => setPrivacy(o.val)}
              className="w-full flex items-start gap-3 p-4 rounded-2xl text-left transition-all active:scale-[0.98]"
              style={{
                background: active ? 'var(--green-pale)' : 'var(--card)',
                border: `1.5px solid ${active ? 'var(--green-tint)' : 'var(--border)'}`,
                boxShadow: active ? '0 4px 12px rgba(61,190,143,0.12)' : 'var(--shadow-sm)',
              }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
                style={{ background: active ? 'var(--card)' : 'var(--cream)' }}>
                {o.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-800"
                  style={{ fontFamily: 'var(--font-nunito)', color: active ? 'var(--green-dark)' : 'var(--text)' }}>
                  {o.title}
                </div>
                <div className="text-[11px] font-500 leading-relaxed mt-0.5" style={{ color: 'var(--text-2)' }}>
                  {o.desc}
                </div>
              </div>
              {active && (
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-800 text-white"
                  style={{ background: 'var(--green)' }}>
                  ✓
                </div>
              )}
            </button>
          )
        })}
      </div>

      {privacy === 'hidden' && (
        <div className="rounded-2xl p-4 space-y-3"
          style={{ background: 'var(--card)', border: '1.5px solid var(--border)' }}>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={usePin} onChange={e => setUsePin(e.target.checked)}
              className="w-4 h-4 accent-green-600" />
            <div className="flex-1">
              <div className="text-sm font-700" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text)' }}>
                {t('onboarding.privacy.pinLabel')}
              </div>
              <div className="text-[11px] font-500 mt-0.5" style={{ color: 'var(--text-3)' }}>
                {t('onboarding.privacy.pinHint')}
              </div>
            </div>
          </label>

          {usePin && (
            <div className="space-y-2 pt-2" style={{ borderTop: '1px solid var(--border)' }}>
              <input
                type="password"
                inputMode="numeric"
                autoComplete="new-password"
                value={pin}
                onChange={e => setPin(onlyDigits(e.target.value))}
                placeholder={t('onboarding.privacy.pinPlaceholder')}
                className="input-warm px-4 py-3 text-base tracking-[0.3em] text-center"
              />
              <input
                type="password"
                inputMode="numeric"
                autoComplete="new-password"
                value={pinConfirm}
                onChange={e => setPinConfirm(onlyDigits(e.target.value))}
                placeholder={t('onboarding.privacy.pinConfirmPlaceholder')}
                className="input-warm px-4 py-3 text-base tracking-[0.3em] text-center"
              />
              {pinError && (
                <p className="text-xs font-600 text-center"
                  style={{ color: 'var(--coral-mid)', fontFamily: 'var(--font-nunito)' }}>
                  {pinError}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function SpinBtn({ children, onClick }: { children: string, onClick: () => void }) {
  return (
    <button onClick={onClick}
      className="w-14 h-14 rounded-2xl text-2xl font-300 flex items-center justify-center transition-all active:scale-90 select-none"
      style={{ background: 'var(--card)', border: '1.5px solid var(--border)', color: 'var(--text)', boxShadow: 'var(--shadow-sm)' }}>
      {children}
    </button>
  )
}

function Chip({ children, active, onClick, color = 'green' }: {
  children: React.ReactNode, active: boolean, onClick: () => void, color?: 'green' | 'amber'
}) {
  const isAmber = color === 'amber'
  return (
    <button onClick={onClick}
      className="py-2.5 px-2 rounded-xl text-xs font-700 transition-all active:scale-95 text-center"
      style={{
        fontFamily: 'var(--font-nunito)',
        background: active ? (isAmber ? 'var(--amber-pale)' : 'var(--green-pale)') : 'var(--card)',
        border: `1.5px solid ${active ? (isAmber ? 'var(--amber-tint)' : 'var(--green-tint)') : 'var(--border)'}`,
        color: active ? (isAmber ? 'var(--amber-strong)' : 'var(--green-mid)') : 'var(--text-2)',
        boxShadow: 'var(--shadow-sm)',
      }}>
      {children}
    </button>
  )
}
