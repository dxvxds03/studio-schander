import { NextResponse } from 'next/server'
import { getSupabaseAdminClient } from '@/lib/supabase-server'
import { verifyAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const isAdmin = await verifyAdmin()
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const orders: Array<{ id: number; order: number }> = body.orders

  if (!Array.isArray(orders)) {
    return NextResponse.json({ error: 'orders must be an array' }, { status: 400 })
  }

  const db = getSupabaseAdminClient()

  await Promise.all(
    orders.map(({ id, order }) =>
      db.from('projects').update({ order }).eq('id', id)
    )
  )

  return NextResponse.json({ success: true })
}
