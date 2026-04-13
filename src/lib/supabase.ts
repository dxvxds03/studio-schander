import { createClient } from '@supabase/supabase-js'
import { createBrowserClient, createServerClient as createSSRServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Simple client for public data reads in server components (no auth needed)
export const supabase = createClient(url, anon)

// Browser client — use in 'use client' components for auth
export function getSupabaseBrowserClient() {
  return createBrowserClient(url, anon)
}

// Server client with cookie handling — use in route handlers for auth
export function getSupabaseServerClient() {
  const cookieStore = cookies()
  return createSSRServerClient(url, anon, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(toSet) {
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

export interface Project {
  id: number
  title: string
  slug: string
  description: string | null
  year: number | null
  client: string | null
  tags: string[]
  cover_image: string | null
  images: string[]
  order: number
  featured: boolean
  created_at: string
  updated_at: string
}
