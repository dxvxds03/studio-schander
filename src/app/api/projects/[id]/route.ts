import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getSupabaseAdminClient } from '@/lib/supabase-server'
import { verifyAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', parseInt(params.id))
    .single()

  if (error || !data) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(data)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const isAdmin = await verifyAdmin()
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()

  const db = getSupabaseAdminClient()
  const { data, error } = await db
    .from('projects')
    .update({
      title: body.title,
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
    })
    .eq('id', parseInt(params.id))
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const isAdmin = await verifyAdmin()
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const db = getSupabaseAdminClient()
  const { error } = await db
    .from('projects')
    .delete()
    .eq('id', parseInt(params.id))

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
