'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, TrendingUp, Wind, Trophy } from 'lucide-react'

const navItems = [
  { href: '/dashboard',    icon: Home,       label: 'Beranda' },
  { href: '/progress',     icon: TrendingUp, label: 'Progres' },
  { href: '/cravings',     icon: Wind,       label: 'Keinginan' },
  { href: '/achievements', icon: Trophy,     label: 'Pencapaian' },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
      <div className="mx-auto max-w-[430px] px-5 pb-5 pb-safe pointer-events-auto">
        <div
          className="flex items-center justify-around rounded-[28px] px-3 py-2"
          style={{
            background: 'white',
            boxShadow: '0 8px 40px rgba(44,31,20,0.14), 0 2px 8px rgba(44,31,20,0.08), 0 0 0 1px rgba(44,31,20,0.05)',
          }}
        >
          {navItems.map(({ href, icon: Icon, label }) => {
            const active = pathname === href
            return (
              <Link key={href} href={href}
                className="flex flex-col items-center gap-0.5 px-4 py-2 rounded-[20px] transition-all duration-200 relative"
                style={active ? { background: 'var(--green-pale)' } : {}}
              >
                <Icon
                  size={22}
                  strokeWidth={active ? 2.5 : 1.8}
                  style={{ color: active ? 'var(--green-mid)' : 'var(--text-3)' }}
                />
                <span
                  className="text-[10px] font-700 tracking-wide"
                  style={{
                    fontFamily: 'var(--font-nunito)',
                    color: active ? 'var(--green-mid)' : 'var(--text-3)',
                  }}
                >
                  {label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
