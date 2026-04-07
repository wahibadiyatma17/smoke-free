'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { useUserData } from '@/contexts/UserDataContext'
import { Navigation } from '@/components/Navigation'
import { getSmokeFreeStats, getHealthMilestones, formatRupiah, formatNumber } from '@/lib/utils'

export default function ProgressPage() {
  const router = useRouter()
  const { loading: authLoading } = useAuth()
  const { profile, loading: profileLoading } = useUserData()

  useEffect(() => {
    if (!authLoading && !profileLoading && !profile) router.push('/onboarding')
  }, [authLoading, profileLoading, profile, router])

  if (authLoading || profileLoading || !profile) {
    return (
      <div className="flex items-center justify-center min-h-dvh" style={{ background: 'var(--cream)' }}>
        <div className="w-8 h-8 rounded-full border-[3px] border-t-transparent animate-spin"
          style={{ borderColor: 'var(--green)', borderTopColor: 'transparent' }} />
      </div>
    )
  }

  const quitDate = profile.quitDate.toDate()
  const stats = getSmokeFreeStats(quitDate, profile.cigarettesPerDay, profile.pricePerPack, profile.cigarettesPerPack)
  const milestones = getHealthMilestones(quitDate)
  const achieved = milestones.filter(m => m.achieved).length

  const ringkasan = [
    { emoji: '💰', nilai: formatRupiah(stats.moneySaved),           label: 'Uang Tersimpan',       sub: `${formatRupiah(stats.moneySaved / Math.max(1, stats.diffDays) * 30)} / bln`, bg: 'var(--amber-pale)',    border: 'var(--amber-tint)',   color: 'var(--amber)' },
    { emoji: '🚭', nilai: formatNumber(stats.cigarettesAvoided),    label: 'Tidak Dihisap',        sub: `${(stats.cigarettesAvoided / (profile.cigarettesPerPack || 16)).toFixed(1)} bungkus`, bg: 'var(--green-pale)',    border: 'var(--green-tint)',   color: 'var(--green-mid)' },
    { emoji: '⏱️', nilai: `${stats.hoursLife}j`,                    label: 'Waktu Kembali',        sub: `≈ ${stats.daysLife} hari umur`,          bg: 'var(--lavender-pale)', border: '#D8D2FF',             color: 'var(--lavender)' },
    { emoji: '📅', nilai: String(stats.diffDays),                   label: 'Hari Bebas Rokok',     sub: `${stats.diffWeeks} mgg ${stats.diffDays % 7} hari`, bg: 'var(--coral-pale)',    border: 'var(--coral-tint)',   color: 'var(--coral)' },
  ]

  return (
    <div className="min-h-dvh pb-36" style={{ background: 'var(--cream)' }}>
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="blob-amber absolute top-0 right-0 w-56 h-56 opacity-50" />
        <div className="blob-green absolute bottom-32 -left-8 w-48 h-48 opacity-40" />
      </div>

      {/* Header */}
      <div className="px-5 pt-12 pb-2 relative z-10">
        <h1 className="tracking-tight mb-1"
          style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.9rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>
          Perkembanganmu 📈
        </h1>
        <p className="text-sm font-600" style={{ color: 'var(--text-2)' }}>Setiap angka di sini adalah kemenanganmu</p>
      </div>

      <div className="px-5 space-y-4 mt-4 relative z-10">

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          {ringkasan.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="rounded-[24px] p-5"
              style={{ background: s.bg, border: `1.5px solid ${s.border}` }}>
              <div className="text-2xl mb-2">{s.emoji}</div>
              <div className="font-900 text-2xl leading-none"
                style={{ fontFamily: 'var(--font-fraunces)', color: s.color, letterSpacing: '-0.02em' }}>
                {s.nilai}
              </div>
              <div className="text-xs font-700 mt-1.5" style={{ color: 'var(--text-2)' }}>{s.label}</div>
              <div className="text-[10px] font-600 mt-0.5" style={{ color: 'var(--text-3)' }}>{s.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Savings projection */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}>
          <div className="rounded-[24px] p-5" style={{ background: 'var(--card)', boxShadow: 'var(--shadow-card)', border: '1px solid var(--border)' }}>
            <h3 className="text-sm font-800 mb-4" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text)' }}>
              💸 Proyeksi Penghematan
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { period: '1 Bulan',  days: 30 },
                { period: '6 Bulan', days: 180 },
                { period: '1 Tahun', days: 365 },
              ].map(({ period, days }) => {
                const amount = (stats.moneySaved / Math.max(1, stats.diffDays)) * days
                return (
                  <div key={period} className="text-center py-3 rounded-2xl"
                    style={{ background: 'var(--amber-pale)' }}>
                    <div className="font-900 text-base" style={{ fontFamily: 'var(--font-fraunces)', color: 'var(--amber)', letterSpacing: '-0.02em' }}>
                      {formatRupiah(amount)}
                    </div>
                    <div className="text-[10px] font-700 mt-1" style={{ color: 'var(--text-3)' }}>{period}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Health timeline */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-800" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text)' }}>
              🩺 Pemulihan Kesehatan
            </h2>
            <span className="text-xs font-800 px-2.5 py-1 rounded-full"
              style={{ background: 'var(--green-pale)', color: 'var(--green-mid)', border: '1px solid var(--green-tint)' }}>
              {achieved}/{milestones.length}
            </span>
          </div>

          <div className="space-y-2">
            {milestones.map((m, i) => (
              <motion.div key={m.label}
                initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.03 }}
                className="flex items-center gap-3 p-4 rounded-2xl transition-all"
                style={{
                  background: m.achieved ? 'var(--green-pale)' : 'var(--card)',
                  border: `1.5px solid ${m.achieved ? 'var(--green-tint)' : 'var(--border)'}`,
                  boxShadow: m.achieved ? '0 2px 8px rgba(61,190,143,0.1)' : 'var(--shadow-sm)',
                }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: m.achieved ? 'white' : 'var(--cream)', boxShadow: m.achieved ? 'var(--shadow-sm)' : 'none' }}>
                  <span style={{ fontSize: '1.2rem', filter: m.achieved ? 'none' : 'grayscale(1)', opacity: m.achieved ? 1 : 0.35 }}>
                    {m.icon}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-800"
                      style={{ fontFamily: 'var(--font-nunito)', color: m.achieved ? 'var(--green-dark)' : 'var(--text-3)' }}>
                      {m.label}
                    </span>
                    {m.achieved && (
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: 'var(--green)' }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="text-xs font-500 mt-0.5 truncate"
                    style={{ color: m.achieved ? 'var(--text-2)' : 'var(--text-3)' }}>
                    {m.description}
                  </p>
                  {!m.achieved && m.progress > 0 && (
                    <div className="mt-1.5 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
                      <motion.div className="h-full rounded-full"
                        style={{ background: 'linear-gradient(90deg, var(--coral), var(--amber), var(--green))' }}
                        initial={{ width: 0 }}
                        animate={{ width: `${m.progress}%` }}
                        transition={{ duration: 0.8, delay: 0.5 + i * 0.025 }}
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <Navigation />
    </div>
  )
}
