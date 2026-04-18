import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Locale } from '@/i18n/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRupiah(amount: number): string {
  if (amount >= 1_000_000) {
    const juta = amount / 1_000_000
    return `Rp ${juta % 1 === 0 ? juta.toFixed(0) : juta.toFixed(1)} jt`
  }
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatCurrency(amount: number): string {
  return formatRupiah(amount)
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('id-ID').format(num)
}

const GREETINGS: Record<Locale, { pagi: string; siang: string; sore: string; malam: string }> = {
  id: { pagi: 'Selamat pagi', siang: 'Selamat siang', sore: 'Selamat sore', malam: 'Selamat malam' },
  en: { pagi: 'Good morning', siang: 'Good afternoon', sore: 'Good evening', malam: 'Good evening' },
}

export function getSalam(locale: Locale = 'id'): string {
  const h = new Date().getHours()
  const g = GREETINGS[locale]
  if (h < 11) return g.pagi
  if (h < 15) return g.siang
  if (h < 19) return g.sore
  return g.malam
}

export function getMotivationQuote(quotes: string[], dayIndex: number): string {
  if (quotes.length === 0) return ''
  return quotes[dayIndex % quotes.length]
}
