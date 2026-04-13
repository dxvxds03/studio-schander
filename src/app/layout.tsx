import type { Metadata } from 'next'
import { Syne } from 'next/font/google'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'David Schander — Portfolio',
  description: 'Ausgewählte Arbeiten von David Schander. Design, Direction & Gestaltung.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={syne.variable}>
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
