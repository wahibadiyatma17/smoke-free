'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { smokingFacts, categoryMeta, sourceUrls } from '@/lib/smokingFacts'

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function InsightCard() {
  const [fact] = useState(() => pickRandom(smokingFacts))
  const [showDetail, setShowDetail] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const meta = categoryMeta[fact.category]
  const factSourceUrl = sourceUrls[fact.source] ?? fact.sourceUrl

  // Related facts: same category, excluding current, up to 3
  const related = smokingFacts
    .filter(f => f.category === fact.category && f.fact !== fact.fact)
    .slice(0, 3)

  const modal = (
    <AnimatePresence>
      {showDetail && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-end"
          style={{ background: 'rgba(44,31,20,0.45)', backdropFilter: 'blur(6px)' }}
          onClick={e => e.target === e.currentTarget && setShowDetail(false)}
        >
          <motion.div
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 380 }}
            className="w-full max-w-[430px] mx-auto rounded-t-[32px] px-6 pt-5 pb-10 max-h-[90dvh] overflow-y-auto"
            style={{ background: 'var(--cream)' }}
          >
            <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: 'var(--border-mid)' }} />

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{ background: meta.bg, border: `1.5px solid ${meta.border}` }}>
                <span className="text-sm leading-none">{meta.emoji}</span>
                <span className="text-xs font-800 tracking-wide uppercase"
                  style={{ fontFamily: 'var(--font-nunito)', color: meta.color }}>
                  {meta.label}
                </span>
              </div>
              <button onClick={() => setShowDetail(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'var(--border)', color: 'var(--text-2)' }}>
                <span className="text-base leading-none">✕</span>
              </button>
            </div>

            {/* Main fact highlight */}
            <div className="rounded-2xl p-4 mb-4"
              style={{ background: meta.bg, border: `1.5px solid ${meta.border}` }}>
              <div className="flex gap-3">
                <div className="w-1 rounded-full flex-shrink-0"
                  style={{ background: meta.color, opacity: 0.8 }} />
                <p className="text-sm font-800 leading-relaxed"
                  style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text)', flex: 1 }}>
                  {fact.fact}
                </p>
              </div>
            </div>

            {/* Category description */}
            <div className="mb-5">
              <p className="text-[10px] font-700 uppercase tracking-widest mb-2"
                style={{ color: 'var(--text-3)', fontFamily: 'var(--font-nunito)' }}>
                Tentang {meta.label}
              </p>
              <p className="text-sm font-600 leading-relaxed"
                style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text-2)' }}>
                {meta.description}
              </p>
            </div>

            {/* Related facts */}
            {related.length > 0 && (
              <div className="mb-5">
                <p className="text-[10px] font-700 uppercase tracking-widest mb-3"
                  style={{ color: 'var(--text-3)', fontFamily: 'var(--font-nunito)' }}>
                  Fakta lain dalam kategori ini
                </p>
                <div className="space-y-2">
                  {related.map((r, i) => (
                    <div key={i} className="flex gap-2.5 rounded-xl p-3"
                      style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
                      <div className="w-0.5 rounded-full flex-shrink-0 mt-0.5"
                        style={{ background: meta.color, opacity: 0.5 }} />
                      <p className="text-xs font-600 leading-relaxed"
                        style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text)', flex: 1 }}>
                        {r.fact}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Source */}
            <div className="rounded-2xl p-4" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
              <p className="text-[10px] font-700 uppercase tracking-widest mb-2"
                style={{ color: 'var(--text-3)', fontFamily: 'var(--font-nunito)' }}>
                Sumber
              </p>
              <a href={factSourceUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5">
                <span className="text-sm font-800 underline underline-offset-2"
                  style={{ fontFamily: 'var(--font-nunito)', color: meta.color }}>
                  {fact.source}
                </span>
                <span className="text-xs" style={{ color: meta.color }}>↗</span>
              </a>
              <p className="text-[10px] mt-1 break-all"
                style={{ color: 'var(--text-3)', fontFamily: 'var(--font-nunito)' }}>
                {factSourceUrl}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      <div className="rounded-[24px] overflow-hidden"
        style={{ background: 'var(--card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm">💡</span>
            <span className="text-xs font-800" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text)' }}>
              Tahukah Kamu?
            </span>
          </div>
        </div>

        {/* Fact */}
        <div className="px-4 pb-4">
          {/* Category badge */}
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full mb-2"
            style={{ background: meta.bg, border: `1px solid ${meta.border}` }}>
            <span className="text-[10px] leading-none">{meta.emoji}</span>
            <span className="text-[9px] font-800 tracking-wide uppercase"
              style={{ fontFamily: 'var(--font-nunito)', color: meta.color }}>
              {meta.label}
            </span>
          </div>

          {/* Accent bar + fact */}
          <div className="flex gap-2.5 mb-4">
            <div className="w-0.5 rounded-full flex-shrink-0 mt-0.5"
              style={{ background: meta.color, opacity: 0.7, minHeight: '100%' }} />
            <p className="text-xs font-700 leading-relaxed"
              style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text)', flex: 1 }}>
              {fact.fact}
            </p>
          </div>

          {/* Detail link */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowDetail(true)}
              className="text-[11px] font-800 transition-opacity active:opacity-50"
              style={{
                color: meta.color,
                fontFamily: 'var(--font-nunito)',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
              }}>
              Lihat detail
            </button>
          </div>
        </div>
      </div>

      {mounted && createPortal(modal, document.body)}
    </>
  )
}
