import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import ProjectsGrid from '@/components/ProjectsGrid'
import { supabase } from '@/lib/supabase'

export const revalidate = 0

export default async function HomePage() {
  const { data: projects } = await supabase
    .from('projects')
    .select('id, title, year, client, cover_image, featured, order')
    .order('order', { ascending: true })
    .order('created_at', { ascending: false })

  return (
    <main>
      <Navigation />
      <HeroSection />
      <ProjectsGrid projects={projects ?? []} />

      <footer className="px-8 md:px-14 lg:px-20 py-16 border-t border-faint">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <p
              className="text-display italic"
              style={{ fontSize: 'clamp(24px, 3vw, 40px)', color: '#191917', letterSpacing: '-0.01em' }}
            >
              Studio Schander
            </p>
            <p className="label mt-1">Design & Direction</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <p className="label">© {new Date().getFullYear()} David Schander</p>
            <a href="/admin" className="label hover:text-negroni transition-colors" data-hover>
              Admin
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
