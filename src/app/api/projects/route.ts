import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getSupabaseAdminClient } from '@/lib/supabase-server'
import { verifyAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('order', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const isAdmin = await verifyAdmin()
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const slug = `${body.title
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')}-${Date.now()}`

  const db = getSupabaseAdminClient()
  const { data, error } = await db
    .from('projects')
    .insert({
      title: body.title,
      slug,
      description: body.description ?? null,
      year: body.year ?? null,
      client: body.client ?? null,
      tags: body.tags ?? [],
      cover_image: body.coverImage ?? null,
      images: body.images ?? [],
      link: body.link ?? null,
      order: body.order ?? 0,
      featured: body.featured ?? false,
      show_in_carousel: body.showInCarousel ?? true,
      project_type: body.projectType ?? 'client',
      quote: body.quote ?? null,
      show_quote_on_list: body.showQuoteOnList ?? false,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
