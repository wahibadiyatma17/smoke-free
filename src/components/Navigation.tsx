'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z"/>
      <path d="M9 21V12h6v9"/>
    </svg>
  )
}

function TrendingUpIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 1.8} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
      <polyline points="17 6 23 6 23 12"/>
    </svg>
  )
}

function WindIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2"/>
    </svg>
  )
}

function TrophyIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 010-5H6"/>
      <path d="M18 9h1.5a2.5 2.5 0 000-5H18"/>
      <path d="M4 22h16"/>
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
      <path d="M18 2H6v7a6 6 0 0012 0V2z"/>
    </svg>
  )
}

const navItems = [
  { href: '/dashboard',    Icon: HomeIcon,       label: 'Beranda' },
  { href: '/progress',     Icon: TrendingUpIcon, label: 'Progres' },
  { href: '/cravings',     Icon: WindIcon,       label: 'Keinginan' },
  { href: '/achievements', Icon: TrophyIcon,     label: 'Pencapaian' },
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
          {navItems.map(({ href, Icon, label }) => {
            const active = pathname === href
            return (
              <Link key={href} href={href}
                className="flex flex-col items-center gap-0.5 px-4 py-2 rounded-[20px] transition-all duration-200 relative"
                style={active ? { background: 'var(--green-pale)' } : {}}
              >
                <span style={{ color: active ? 'var(--green-mid)' : 'var(--text-3)' }}>
                  <Icon active={active} />
                </span>
                <span
                  className="text-xs font-700 tracking-wide"
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
