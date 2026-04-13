import type { Metadata } from 'next'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'

export const metadata: Metadata = {
  title: 'David Schander — Portfolio',
  description: 'Ausgewählte Arbeiten von David Schander. Design, Direction & Gestaltung.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
