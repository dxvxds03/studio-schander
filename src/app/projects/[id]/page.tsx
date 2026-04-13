import { notFound } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export const revalidate = 0

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('id', parseInt(params.id))
    .single()

  if (!project) notFound()

  const images: string[] = project.images ?? []
  const tags: string[] = project.tags ?? []
  const allImages = [project.cover_image, ...images].filter(Boolean) as string[]

  return (
    <main className="min-h-screen" style={{ background: '#F4F2ED' }}>
      <div className="px-8 md:px-14 lg:px-20 pt-10">
        <Link href="/" className="label hover:text-deadpoet transition-colors" data-hover>
          ← Zurück
        </Link>
      </div>

      {project.cover_image && (
        <div className="mt-10 mx-8 md:mx-14 lg:mx-20 overflow-hidden" style={{ aspectRatio: '16/9', maxHeight: '72vh' }}>
          <img src={project.cover_image} alt={project.title} className="w-full h-full object-cover img-hover" />
        </div>
      )}

      <div className="px-8 md:px-14 lg:px-20 mt-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <h1
            className="font-display text-ink"
            style={{ fontSize: 'clamp(40px, 7vw, 100px)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.035em' }}
          >
            {project.title}
          </h1>
          {project.description && (
            <p className="mt-7" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '16px', lineHeight: 1.72, color: '#787672', maxWidth: '58ch' }}>
              {project.description}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-6 md:items-end md:text-right">
          {project.year && (
            <div>
              <p className="label label-bracket mb-1.5">Jahr</p>
              <p style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '15px', fontWeight: 500 }}>{project.year}</p>
            </div>
          )}
          {project.client && (
            <div>
              <p className="label label-bracket mb-1.5">Kunde</p>
              <p style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '15px', fontWeight: 500 }}>{project.client}</p>
            </div>
          )}
          {tags.length > 0 && (
            <div>
              <p className="label label-bracket mb-1.5">Tags</p>
              <div className="flex flex-wrap md:justify-end gap-1.5">
                {tags.map((tag) => (
                  <span key={tag} className="label px-2 py-0.5 border border-faint text-ink">{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {allImages.length > 1 && (
        <div className="px-8 md:px-14 lg:px-20 mt-16 grid grid-cols-1 md:grid-cols-2 gap-5 pb-24">
          {allImages.slice(1).map((src, i) => (
            <div key={i} className="overflow-hidden">
              <img src={src} alt={`${project.title} — ${i + 2}`} className="w-full object-cover img-hover" style={{ aspectRatio: '4/3' }} />
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
