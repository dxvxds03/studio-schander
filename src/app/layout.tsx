import type { Metadata } from 'next'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'
import LoadingScreen from '@/components/LoadingScreen'
import Sidebar from '@/components/Sidebar'

const SITE_URL = 'https://studio-schander.de'

export const metadata: Metadata = {
  title: {
    default: 'Studio Schander — Design & Direction',
    template: '%s — Studio Schander',
  },
  description: 'Ausgewählte Arbeiten von David Schander. Branding, Webentwicklung, Editorial Design & Konzeption aus Bielefeld.',
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: SITE_URL,
    siteName: 'Studio Schander',
    title: 'Studio Schander — Design & Direction',
    description: 'Ausgewählte Arbeiten von David Schander. Branding, Webentwicklung, Editorial Design & Konzeption aus Bielefeld.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Studio Schander',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Studio Schander — Design & Direction',
    description: 'Ausgewählte Arbeiten von David Schander. Branding, Webentwicklung, Editorial Design & Konzeption aus Bielefeld.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <LoadingScreen />
        <CustomCursor />
        <Sidebar />
        {children}
      </body>
    </html>
  )
}
