import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getSupabaseAdminClient } from '@/lib/supabase-server'
import { verifyAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET() {
  const { data, error } = await supabase
    .from('leistungen')
    .select('*')
    .eq('active', true)
    .order('order', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const isAdmin = await verifyAdmin()
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const db = getSupabaseAdminClient()
  const { data, error } = await db
    .from('leistungen')
    .insert({
      title: body.title,
      lines: body.lines ?? [],
      cta_label: body.ctaLabel ?? '',
      cta_href: body.ctaHref ?? '/kontakt',
      badges: body.badges ?? [],
      order: body.order ?? 0,
      active: body.active ?? true,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
