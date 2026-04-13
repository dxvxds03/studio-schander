import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
