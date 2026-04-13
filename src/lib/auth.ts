import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'

export async function verifyAdmin(): Promise<boolean> {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('admin_token')?.value
    if (!token) return false
    jwt.verify(token, JWT_SECRET)
    return true
  } catch {
    return false
  }
}

export function signToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}
