import { createClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Simple client for public data reads (no auth needed)
export const supabase = createClient(url, anon)

// Browser client — use in 'use client' components for auth
export function getSupabaseBrowserClient() {
  return createBrowserClient(url, anon)
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
