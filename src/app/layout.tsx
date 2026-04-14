import type { Metadata } from 'next'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'
import LoadingScreen from '@/components/LoadingScreen'

export const metadata: Metadata = {
  title: 'David Schander — Portfolio',
  description: 'Ausgewählte Arbeiten von David Schander. Design, Direction & Gestaltung.',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <LoadingScreen />
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
