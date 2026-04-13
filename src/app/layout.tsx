import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'David Schander — Portfolio',
  description: 'Ausgewählte Arbeiten von David Schander. Design, Direction & Gestaltung.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={playfair.variable}>
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
