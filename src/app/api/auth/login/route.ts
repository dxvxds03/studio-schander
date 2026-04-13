import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// Auth is now handled via Supabase Auth client SDK — this route is unused
export async function POST() {
  return NextResponse.json({ error: 'Use Supabase Auth' }, { status: 410 })
}
