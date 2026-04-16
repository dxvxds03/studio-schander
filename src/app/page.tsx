import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import WasIchMache from '@/components/WasIchMache'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'

export const revalidate = 0

export default async function HomePage() {
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('order', { ascending: true })
    .order('created_at', { ascending: false })

  const all = projects ?? []

  return (
    <main>
      <Navigation />
      <HeroSection projects={all} />
      <WasIchMache />

      <div style={{ marginTop: 'clamp(56px, 8vw, 112px)', position: 'relative', zIndex: 46 }}>
        <Footer />
      </div>
    </main>
  )
}
