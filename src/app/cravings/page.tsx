'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, Check } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { id } from 'date-fns/locale'
import { Timestamp } from 'firebase/firestore'
import { useAuth } from '@/contexts/AuthContext'
import { Navigation } from '@/components/Navigation'
import { logCraving, getCravings, CravingLog } from '@/lib/firestore'

const GUEST_CRAVINGS_KEY = 'smoke_free_guest_cravings'

const pemicu = ['Stres', 'Setelah makan', 'Kopi', 'Sosial', 'Alkohol', 'Bosan', 'Kerja', 'Berkendara', 'Pagi hari', 'Lainnya']
const caraAtasi = ['Tarik napas dalam', 'Minum air', 'Jalan kaki', 'Alihkan perhatian', 'Hubungi seseorang', 'Meditasi', 'Permen karet', 'Tunggu berlalu']
const intensityEmoji = ['', '😌', '😐', '😐', '😕', '😟', '😰', '😰', '😱', '😱', '🔥']

function loadGuestCravings(): CravingLog[] {
  try {
    const raw = localStorage.getItem(GUEST_CRAVINGS_KEY)
    if (!raw) return []
    return (JSON.parse(raw) as any[]).map(c => ({
      ...c,
      timestamp: Timestamp.fromDate(new Date(c.timestamp)),
    }))
  } catch { return [] }
}

function saveGuestCraving(entry: Omit<CravingLog, 'uid' | 'timestamp' | 'id'>) {
  const existing = loadGuestCravings()
  const newEntry: CravingLog = {
    ...entry,
    id: Date.now().toString(),
    uid: 'guest',
    timestamp: Timestamp.fromDate(new Date()),
  }
  const serialized = [newEntry, ...existing].map(c => ({
    ...c,
    timestamp: c.timestamp.toDate().toISOString(),
  }))
  localStorage.setItem(GUEST_CRAVINGS_KEY, JSON.stringify(serialized))
  return loadGuestCravings()
}

export default function CravingsPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [cravings, setCravings] = useState<CravingLog[]>([])
  const [showForm, setShowForm] = useState(false)
  const [loadingData, setLoadingData] = useState(true)
  const [saving, setSaving] = useState(false)

  const [intensitas, setIntensitas] = useState(5)
  const [pemicuDipilih, setPemicu] = useState('Stres')
  const [caraDipilih, setCara] = useState('Tarik napas dalam')
  const [berhasil, setBerhasil] = useState(true)
  const [catatan, setCatatan] = useState('')

  useEffect(() => {
    if (authLoading) return
    if (user) {
      getCravings(user.uid).then(setCravings).finally(() => setLoadingData(false))
    } else {
      setCravings(loadGuestCravings())
      setLoadingData(false)
    }
  }, [user, authLoading])

  const handleSimpan = async () => {
    setSaving(true)
    try {
      if (user) {
        await logCraving(user.uid, { intensity: intensitas, trigger: pemicuDipilih, copingUsed: caraDipilih, resisted: berhasil, note: catatan })
        setCravings(await getCravings(user.uid))
      } else {
        setCravings(saveGuestCraving({ intensity: intensitas, trigger: pemicuDipilih, copingUsed: caraDipilih, resisted: berhasil, note: catatan }))
      }
      setShowForm(false); setCatatan(''); setIntensitas(5)
    } finally { setSaving(false) }
  }

  const totalBerhasil = cravings.filter(c => c.resisted).length
  const total = cravings.length
  const rate = total > 0 ? Math.round((totalBerhasil / total) * 100) : 100

  return (
    <div className="min-h-dvh pb-36" style={{ background: 'var(--cream)' }}>
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="blob-coral absolute -top-10 right-0 w-48 h-48 opacity-50" />
      </div>

      {/* Header */}
      <div className="px-5 pt-12 pb-2 relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="tracking-tight"
              style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.9rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>
              Keinginan 🌬️
            </h1>
            <p className="text-sm font-600 mt-0.5" style={{ color: 'var(--text-2)' }}>Lacak & pahami polamu</p>
          </div>
          <button onClick={() => setShowForm(true)}
            className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all active:scale-90 font-800 text-xl"
            style={{ background: 'var(--green)', color: 'white', boxShadow: '0 4px 16px rgba(61,190,143,0.3)' }}>
            <Plus size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div className="px-5 space-y-4 mt-4 relative z-10">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { label: 'Dicatat',        value: total,          color: 'var(--text)' },
            { label: 'Berhasil',       value: totalBerhasil,  color: 'var(--green-mid)' },
            { label: 'Tingkat sukses', value: `${rate}%`,     color: 'var(--green-mid)' },
          ].map(s => (
            <div key={s.label} className="rounded-2xl p-3.5 text-center"
              style={{ background: 'var(--card)', boxShadow: 'var(--shadow-card)', border: '1px solid var(--border)' }}>
              <div className="font-900 text-xl"
                style={{ fontFamily: 'var(--font-fraunces)', color: s.color, letterSpacing: '-0.02em' }}>
                {s.value}
              </div>
              <div className="text-[10px] font-700 mt-1" style={{ color: 'var(--text-3)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {!loadingData && cravings.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center py-16 text-center">
            <div className="text-5xl mb-4">🌬️</div>
            <p className="font-800 text-base" style={{ color: 'var(--text-2)' }}>Belum ada keinginan dicatat</p>
            <p className="text-sm font-500 mt-1" style={{ color: 'var(--text-3)' }}>
              Ketuk + saat keinginan muncul dan catat
            </p>
          </motion.div>
        )}

        {/* Craving list */}
        <div className="space-y-2.5">
          <AnimatePresence>
            {cravings.map((c, i) => (
              <motion.div key={c.id}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="flex items-start gap-3 p-4 rounded-2xl"
                style={{
                  background: 'var(--card)',
                  boxShadow: 'var(--shadow-card)',
                  border: `1.5px solid ${c.resisted ? 'var(--green-tint)' : 'var(--coral-tint)'}`,
                }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: c.resisted ? 'var(--green-pale)' : 'var(--coral-pale)' }}>
                  {c.resisted
                    ? <Check size={16} strokeWidth={2.5} style={{ color: 'var(--green-mid)' }} />
                    : <X size={16} strokeWidth={2.5} style={{ color: 'var(--coral)' }} />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-800" style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text)' }}>
                      {c.trigger}
                    </span>
                    <span className="text-[10px] font-600 flex-shrink-0" style={{ color: 'var(--text-3)' }}>
                      {formatDistanceToNow(c.timestamp.toDate(), { addSuffix: true, locale: id })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-sm">{intensityEmoji[c.intensity]}</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 10 }).map((_, j) => (
                        <div key={j} className="w-1.5 h-2 rounded-sm"
                          style={{ background: j < c.intensity ? 'var(--coral)' : 'var(--border)' }} />
                      ))}
                    </div>
                    <span className="text-[10px] font-600" style={{ color: 'var(--text-3)' }}>{c.intensity}/10</span>
                  </div>
                  <div className="text-[11px] font-600 mt-1" style={{ color: 'var(--text-3)' }}>💡 {c.copingUsed}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Form modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-end"
            style={{ background: 'rgba(44,31,20,0.45)', backdropFilter: 'blur(6px)' }}
            onClick={e => e.target === e.currentTarget && setShowForm(false)}
          >
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 380 }}
              className="w-full max-w-[430px] mx-auto rounded-t-[32px] px-6 pt-5 pb-10 max-h-[90dvh] overflow-y-auto"
              style={{ background: 'var(--cream)' }}
            >
              <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: 'var(--border-mid)' }} />
              <div className="flex items-center justify-between mb-5">
                <h3 className="tracking-tight"
                  style={{ fontFamily: 'var(--font-fraunces)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>
                  Catat Keinginan 📝
                </h3>
                <button onClick={() => setShowForm(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: 'var(--border)', color: 'var(--text-2)' }}>
                  <X size={14} strokeWidth={2.5} />
                </button>
              </div>

              <div className="space-y-5">
                {/* Berhasil? */}
                <div>
                  <FormLabel>Kamu berhasil menahan?</FormLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { val: true,  label: '✅ Ya, berhasil!' },
                      { val: false, label: '😔 Tidak kali ini' },
                    ].map(({ val, label }) => (
                      <button key={String(val)} onClick={() => setBerhasil(val)}
                        className="py-3 px-4 rounded-xl text-sm font-700 transition-all active:scale-95"
                        style={{
                          fontFamily: 'var(--font-nunito)',
                          background: berhasil === val ? (val ? 'var(--green-pale)' : 'var(--coral-pale)') : 'var(--card)',
                          border: `1.5px solid ${berhasil === val ? (val ? 'var(--green-tint)' : 'var(--coral-tint)') : 'var(--border)'}`,
                          color: berhasil === val ? (val ? 'var(--green-dark)' : 'var(--coral-mid)') : 'var(--text-2)',
                          boxShadow: 'var(--shadow-sm)',
                        }}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Intensitas */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <FormLabel>Intensitas keinginan</FormLabel>
                    <span className="text-xl font-900"
                      style={{ fontFamily: 'var(--font-fraunces)', color: 'var(--coral)' }}>
                      {intensityEmoji[intensitas]} {intensitas}/10
                    </span>
                  </div>
                  <input type="range" min="1" max="10" value={intensitas}
                    onChange={e => setIntensitas(Number(e.target.value))}
                    className="w-full" style={{ accentColor: 'var(--coral)' }} />
                  <div className="flex justify-between text-[10px] font-700 mt-1" style={{ color: 'var(--text-3)' }}>
                    <span>Ringan</span><span>Ekstrem</span>
                  </div>
                </div>

                {/* Pemicu */}
                <div>
                  <FormLabel>Apa pemicunya?</FormLabel>
                  <div className="flex flex-wrap gap-2">
                    {pemicu.map(p => (
                      <TagBtn key={p} active={pemicuDipilih === p} onClick={() => setPemicu(p)} color="coral">{p}</TagBtn>
                    ))}
                  </div>
                </div>

                {/* Cara */}
                <div>
                  <FormLabel>Cara mengatasinya</FormLabel>
                  <div className="flex flex-wrap gap-2">
                    {caraAtasi.map(c => (
                      <TagBtn key={c} active={caraDipilih === c} onClick={() => setCara(c)} color="green">{c}</TagBtn>
                    ))}
                  </div>
                </div>

                {/* Catatan */}
                <div>
                  <FormLabel>Catatan (opsional)</FormLabel>
                  <textarea value={catatan} onChange={e => setCatatan(e.target.value)}
                    placeholder="Bagaimana perasaanmu saat itu?" rows={2}
                    className="input-warm px-4 py-3 text-sm resize-none"
                  />
                </div>

                <button onClick={handleSimpan} disabled={saving}
                  className="w-full py-4 rounded-2xl text-sm font-800 flex items-center justify-center gap-2 transition-all active:scale-[0.97] disabled:opacity-60"
                  style={{ fontFamily: 'var(--font-nunito)', background: 'var(--green)', color: 'white', boxShadow: '0 4px 20px rgba(61,190,143,0.3)' }}>
                  {saving
                    ? <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    : '💾 Simpan Catatan'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Navigation />
    </div>
  )
}

function FormLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-sm font-700 mb-2.5"
      style={{ fontFamily: 'var(--font-nunito)', color: 'var(--text-2)' }}>
      {children}
    </label>
  )
}

function TagBtn({ children, active, onClick, color }: { children: React.ReactNode, active: boolean, onClick: () => void, color: 'green' | 'coral' }) {
  const g = color === 'green'
  return (
    <button onClick={onClick}
      className="px-3 py-1.5 rounded-xl text-xs font-700 transition-all active:scale-95"
      style={{
        fontFamily: 'var(--font-nunito)',
        background: active ? (g ? 'var(--green-pale)' : 'var(--coral-pale)') : 'var(--card)',
        border: `1.5px solid ${active ? (g ? 'var(--green-tint)' : 'var(--coral-tint)') : 'var(--border)'}`,
        color: active ? (g ? 'var(--green-dark)' : 'var(--coral-mid)') : 'var(--text-2)',
        boxShadow: 'var(--shadow-sm)',
      }}>
      {children}
    </button>
  )
}
