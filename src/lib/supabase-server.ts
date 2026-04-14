import { createServerClient as createSSRServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

const url      = process.env.NEXT_PUBLIC_SUPABASE_URL!
const anon     = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export function getSupabaseServerClient() {
  const cookieStore = cookies()
  return createSSRServerClient(url, anon, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(toSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
        try {
          toSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // Called from Server Component — cookie mutation ignored (middleware handles refresh)
        }
      },
    },
  })
}

// Admin client bypasses RLS — only use in server-side Route Handlers after verifyAdmin()
export function getSupabaseAdminClient() {
  if (!serviceKey) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set')
  return createClient(url, serviceKey, { auth: { persistSession: false } })
}
