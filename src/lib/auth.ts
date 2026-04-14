import { getSupabaseServerClient } from './supabase-server'

const ADMIN_EMAIL = 'davidschander03@icloud.com'

export async function verifyAdmin(): Promise<boolean> {
  try {
    const supabase = getSupabaseServerClient()
    // getUser() validates the JWT against Supabase — getSession() only reads
    // the cookie without server-side validation and returns null in Route Handlers
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) return false
    return user?.email === ADMIN_EMAIL
  } catch {
    return false
  }
}
