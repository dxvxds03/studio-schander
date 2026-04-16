import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import KontaktForm from './KontaktForm'

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Projekt, Idee, Frage — schreib mir. Studio Schander, Bielefeld.',
  openGraph: {
    title: 'Kontakt — Studio Schander',
    description: 'Projekt, Idee, Frage — schreib mir.',
    url: 'https://studio-schander.de/kontakt',
  },
}

export default function KontaktPage() {
  return (
    <main style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <Navigation />
      <KontaktForm />
      <Footer />
    </main>
  )
}
