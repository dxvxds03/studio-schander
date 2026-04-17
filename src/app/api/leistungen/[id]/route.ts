import { NextResponse } from 'next/server'
import { getSupabaseAdminClient } from '@/lib/supabase-server'
import { verifyAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const isAdmin = await verifyAdmin()
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const db = getSupabaseAdminClient()
  const { data, error } = await db
    .from('leistungen')
    .update({
      title: body.title,
      lines: body.lines ?? [],
      cta_label: body.ctaLabel ?? '',
      cta_href: body.ctaHref ?? '/kontakt',
      badges: body.badges ?? [],
      order: body.order ?? 0,
      active: body.active ?? true,
    })
    .eq('id', parseInt(params.id))
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const isAdmin = await verifyAdmin()
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const db = getSupabaseAdminClient()
  const { error } = await db
    .from('leistungen')
    .delete()
    .eq('id', parseInt(params.id))

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
