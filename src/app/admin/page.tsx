'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      router.push('/admin/dashboard')
    } else {
      setError('Ungültige Anmeldedaten.')
      setLoading(false)
    }
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{ background: '#F4F2ED' }}
    >
      <div className="w-full max-w-[340px] px-6">
        <div className="mb-10 text-center">
          <p
            className="text-display italic"
            style={{ fontSize: '32px', color: '#191917', letterSpacing: '-0.01em' }}
          >
            Admin
          </p>
          <p className="label mt-1">Studio Schander</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Benutzername"
            value={form.username}
            onChange={(e) => setForm((p) => ({ ...p, username: e.target.value }))}
            required
            className="w-full border border-faint bg-transparent px-4 py-3 outline-none focus:border-ink transition-colors"
            style={{
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontSize: '14px',
              color: '#191917',
            }}
          />
          <input
            type="password"
            placeholder="Passwort"
            value={form.password}
            onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
            required
            className="w-full border border-faint bg-transparent px-4 py-3 outline-none focus:border-ink transition-colors"
            style={{
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontSize: '14px',
              color: '#191917',
            }}
          />

          {error && (
            <p className="label" style={{ color: '#E8581A' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full py-3 label transition-colors"
            style={{
              background: loading ? '#787672' : '#191917',
              color: '#F4F2ED',
              letterSpacing: '0.2em',
            }}
          >
            {loading ? 'Laden…' : 'Anmelden'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <a href="/" className="label hover:text-negroni transition-colors">
            ← Zurück zur Website
          </a>
        </div>
      </div>
    </main>
  )
}
