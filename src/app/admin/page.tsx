'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabaseBrowserClient } from '@/lib/supabase'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = getSupabaseBrowserClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: 'davidschander03@icloud.com',
      password,
    })

    if (error) {
      setError('Falsches Passwort.')
      setLoading(false)
    } else {
      router.push('/admin/dashboard')
      router.refresh()
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center" style={{ background: '#F4F2ED' }}>
      <div className="w-full max-w-[320px] px-6">
        <div className="mb-10">
          <p
            className="font-display text-ink"
            style={{ fontSize: '36px', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1 }}
          >
            Admin
          </p>
          <p className="label label-bracket mt-2">davidschander03@icloud.com</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
            className="w-full border border-faint bg-transparent px-4 py-3 outline-none focus:border-ink transition-colors"
            style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '14px', color: '#191917' }}
          />

          {error && <p className="label" style={{ color: '#E8331A' }}>{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 w-full py-3 label transition-colors"
            style={{ background: loading ? '#787672' : '#191917', color: '#F4F2ED', letterSpacing: '0.2em' }}
          >
            {loading ? 'Laden…' : 'Anmelden'}
          </button>
        </form>

        <div className="mt-8">
          <a href="/" className="label hover:text-deadpoet transition-colors">← Zurück zur Website</a>
        </div>
      </div>
    </main>
  )
}
