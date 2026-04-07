import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'glow'
  glowColor?: 'emerald' | 'amber' | 'rose' | 'blue'
}

export function Card({ variant = 'default', glowColor = 'emerald', className, children, ...props }: CardProps) {
  const base = 'rounded-3xl p-5'

  const variants = {
    default: 'bg-slate-800/60 border border-slate-700/50 backdrop-blur-sm',
    glass: 'bg-white/5 border border-white/10 backdrop-blur-md',
    glow: cn(
      'bg-slate-800/60 border backdrop-blur-sm',
      glowColor === 'emerald' && 'border-emerald-500/30 shadow-lg shadow-emerald-500/10',
      glowColor === 'amber' && 'border-amber-500/30 shadow-lg shadow-amber-500/10',
      glowColor === 'rose' && 'border-rose-500/30 shadow-lg shadow-rose-500/10',
      glowColor === 'blue' && 'border-blue-500/30 shadow-lg shadow-blue-500/10',
    ),
  }

  return (
    <div className={cn(base, variants[variant], className)} {...props}>
      {children}
    </div>
  )
}
