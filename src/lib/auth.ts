import { getSupabaseServerClient } from './supabase'

const ADMIN_EMAIL = 'davidschander03@icloud.com'

export async function verifyAdmin(): Promise<boolean> {
  try {
    const supabase = getSupabaseServerClient()
    const { data: { session } } = await supabase.auth.getSession()
    return session?.user?.email === ADMIN_EMAIL
  } catch {
    return false
  }
}
