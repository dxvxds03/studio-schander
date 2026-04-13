import { NextResponse } from 'next/server'
import { signToken } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const { username, password } = await request.json()

  const validUser = process.env.ADMIN_USERNAME || 'admin'
  const validPass = process.env.ADMIN_PASSWORD || 'admin'

  if (username !== validUser || password !== validPass) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const token = signToken({ username })

  const response = NextResponse.json({ success: true })
  response.cookies.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })

  return response
}
