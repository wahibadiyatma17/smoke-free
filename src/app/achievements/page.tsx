'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import { useUserData } from '@/contexts/UserDataContext'
import { Navigation } from '@/components/Navigation'
import { getSmokeFreeStats } from '@/lib/utils'
import { badges } from '@/lib/badges'

export default function AchievementsPage() {
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
  const terbuka = badges.filter(b => b.syarat(stats))
  const terkunci = badges.filter(b => !b.syarat(stats))

  return (
    <div className="min-h-dvh pb-36" style={{ background: 'var(--cream)' }}>
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="blob-amber absolute -top-12 right-0 w-56 h-56 opacity-50" />
        <div className="blob-green absolute bottom-24 -left-10 w-48 h-48 opacity-35" />
      </div>

      {/* Header */}
      <div className="px-5 pt-12 pb-2 relative z-10">
        <h1 className="tracking-tight mb-1"
          style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.9rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>
          Pencapaian 🏅
        </h1>
        <p className="text-sm font-600" style={{ color: 'var(--text-2)' }}>
          {terbuka.length} dari {badges.length} berhasil diraih
        </p>
      </div>

      <div className="px-5 space-y-5 mt-4 relative z-10">

        {/* Overall progress */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="rounded-[24px] p-5" style={{ background: 'var(--card)', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-700" style={{ color: 'var(--text-2)' }}>Total progres</span>
              <span className="font-900 text-lg"
                style={{ fontFamily: 'var(--font-fraunces)', color: 'var(--amber)', letterSpacing: '-0.02em' }}>
                {Math.round((terbuka.length / badges.length) * 100)}%
              </span>
            </div>
            <div className="h-3 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
              <motion.div className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, var(--coral), var(--amber), var(--green))' }}
                initial={{ width: 0 }}
                animate={{ width: `${(terbuka.length / badges.length) * 100}%` }}
                transition={{ duration: 1.2, ease: [0.34, 1.2, 0.64, 1] }}
              />
            </div>
            <div className="flex justify-between text-[11px] font-700 mt-2" style={{ color: 'var(--text-3)' }}>
              <span>{terbuka.length} terbuka 🎉</span>
              <span>{terkunci.length} tersisa 🔒</span>
            </div>
          </div>
        </motion.div>

        {/* Unlocked badges - with rotation! */}
        {terbuka.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full" style={{ background: 'var(--green)' }} />
              <span className="text-sm font-800" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text-2)' }}>
                Sudah Diraih ✨
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {terbuka.map((badge, i) => (
                <motion.div key={badge.id}
                  initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                  animate={{ opacity: 1, scale: 1, rotate: badge.rotate }}
                  transition={{ delay: i * 0.07, type: 'spring', stiffness: 220 }}
                  className="p-4 rounded-2xl relative"
                  style={{
                    background: badge.bg,
                    border: `2px solid ${badge.border}`,
                    boxShadow: '0 4px 16px rgba(44,31,20,0.08)',
                    transformOrigin: 'center center',
                  }}>
                  {/* Checkmark */}
                  <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: 'var(--green)', boxShadow: '0 2px 6px rgba(61,190,143,0.4)' }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="text-3xl mb-2.5">{badge.ikon}</div>
                  <div className="text-sm font-800 mb-0.5" style={{ fontFamily: 'var(--font-nunito)', color: badge.color }}>
                    {badge.judul}
                  </div>
                  <div className="text-[11px] font-500 leading-tight" style={{ color: 'var(--text-2)' }}>
                    {badge.deskripsi}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Locked badges - flat & muted */}
        {terkunci.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full" style={{ background: 'var(--border-mid)' }} />
              <span className="text-sm font-800" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text-3)' }}>
                Belum Terbuka 🔒
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {terkunci.map((badge, i) => (
                <motion.div key={badge.id}
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  className="p-4 rounded-2xl"
                  style={{ background: 'var(--card)', border: '1.5px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                  <div className="text-3xl mb-2.5" style={{ filter: 'grayscale(1)', opacity: 0.25 }}>{badge.ikon}</div>
                  <div className="text-sm font-800 mb-0.5" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text-3)' }}>
                    {badge.judul}
                  </div>
                  <div className="text-[11px] font-500 leading-tight" style={{ color: 'var(--border-mid)' }}>
                    {badge.deskripsi}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Navigation />
    </div>
  )
}
