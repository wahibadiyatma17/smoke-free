import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Nunito } from 'next/font/google'
import { AuthProvider } from '@/contexts/AuthContext'
import { UserDataProvider } from '@/contexts/UserDataContext'

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Napas Baru: Bebas dari Rokok',
  description: 'Lacak perjalanan bebas rokokmu, hemat uang, dan dapatkan kembali kesehatanmu satu hari demi satu hari.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Napas Baru',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#FAF7F0',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={nunito.variable}>
        <AuthProvider>
          <UserDataProvider>
            <div className="mx-auto max-w-[430px] min-h-dvh relative">
              {children}
            </div>
          </UserDataProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
