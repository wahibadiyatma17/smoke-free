import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Nunito } from 'next/font/google'
import { AuthProvider } from '@/contexts/AuthContext'
import { UserDataProvider } from '@/contexts/UserDataContext'
import { HabitProvider } from '@/habits/HabitProvider'
import { UnlockProvider } from '@/habits/UnlockContext'
import { I18nProvider } from '@/i18n/I18nProvider'
import { ThemeProvider, THEME_FOUC_SCRIPT } from '@/theme/ThemeProvider'
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration'

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

// Display serif for headings & hero numbers — referenced across the app as
// var(--font-fraunces). Variable font, so all weights (incl. 800/900) ship
// in one file.
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Breaking the Habit',
  description: 'Lacak kebiasaan yang ingin kamu tinggalkan. Satu hari pada satu waktu.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Breaking the Habit',
    startupImage: '/icons/icon.svg',
  },
  icons: {
    icon: [
      { url: '/icons/icon.svg', type: 'image/svg+xml' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF7F0' },
    { media: '(prefers-color-scheme: dark)',  color: '#14110C' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* Runs before React hydrates — sets the `dark` class on <html>
            based on saved preference or system setting so the first paint
            already matches the user's choice (no light-flash on reload). */}
        <script dangerouslySetInnerHTML={{ __html: THEME_FOUC_SCRIPT }} />
      </head>
      <body className={`${nunito.variable} ${fraunces.variable}`}>
        <ThemeProvider>
          <I18nProvider>
            <AuthProvider>
              <UserDataProvider>
                <UnlockProvider>
                  <HabitProvider>
                    <ServiceWorkerRegistration />
                    <div className="mx-auto max-w-[430px] min-h-dvh relative">
                      {children}
                    </div>
                  </HabitProvider>
                </UnlockProvider>
              </UserDataProvider>
            </AuthProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
