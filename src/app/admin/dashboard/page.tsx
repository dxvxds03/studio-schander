'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface Project {
  id: number
  title: string
  year: number | null
  client: string | null
  cover_image: string | null
  featured: boolean
  order: number
  description: string | null
  tags: string[]
}

const emptyForm = {
  title: '',
  description: '',
  year: '',
  client: '',
  tags: '',
  coverImage: '',
  order: '0',
  featured: false,
}

export default function Dashboard() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => { fetchProjects() }, [])

  const fetchProjects = async () => {
    const res = await fetch('/api/projects')
    if (res.ok) setProjects(await res.json())
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      if (!res.ok) throw new Error()
      const { url } = await res.json()
      setForm((p) => ({ ...p, coverImage: url }))
    } catch {
      setMsg('Bild-Upload fehlgeschlagen.')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMsg('')

    const payload = {
      title: form.title,
      description: form.description || null,
      year: form.year ? parseInt(form.year) : null,
      client: form.client || null,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      coverImage: form.coverImage || null,
      order: parseInt(form.order) || 0,
      featured: form.featured,
    }

    const url = editingId ? `/api/projects/${editingId}` : '/api/projects'
    const method = editingId ? 'PUT' : 'POST'
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })

    if (res.ok) {
      setMsg(editingId ? 'Aktualisiert.' : 'Erstellt.')
      setForm(emptyForm)
      setEditingId(null)
      fetchProjects()
    } else if (res.status === 401) {
      router.push('/admin')
    } else {
      setMsg('Fehler beim Speichern.')
    }
    setSaving(false)
  }

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`"${title}" wirklich löschen?`)) return
    const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' })
    if (res.ok) {
      fetchProjects()
      if (editingId === id) { setEditingId(null); setForm(emptyForm) }
    } else if (res.status === 401) {
      router.push('/admin')
    }
  }

  const handleEdit = (p: Project) => {
    setEditingId(p.id)
    setForm({
      title: p.title,
      description: p.description || '',
      year: p.year ? String(p.year) : '',
      client: p.client || '',
      tags: (p.tags ?? []).join(', '),
      coverImage: p.cover_image || '',
      order: String(p.order),
      featured: p.featured,
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin')
  }

  const inp: React.CSSProperties = {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    fontSize: '14px', color: '#191917', background: 'transparent',
    border: '1px solid #E8E5DF', padding: '10px 14px', width: '100%', outline: 'none',
  }
  const lbl: React.CSSProperties = {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '10px',
    letterSpacing: '0.2em', textTransform: 'uppercase', color: '#787672',
    display: 'block', marginBottom: '6px',
  }

  return (
    <main style={{ background: '#F4F2ED', minHeight: '100vh', cursor: 'default' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid #E8E5DF', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '13px', fontWeight: 600, color: '#191917' }}>
          Studio Schander — Admin
        </p>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="/" target="_blank" style={{ ...lbl, marginBottom: 0, textDecoration: 'none' }}>Website ↗</a>
          <button onClick={handleLogout} style={{ ...lbl, marginBottom: 0, background: 'none', border: 'none', cursor: 'pointer' }}>Abmelden</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'calc(100vh - 65px)' }}>
        {/* Form */}
        <div style={{ padding: '40px 32px', borderRight: '1px solid #E8E5DF' }}>
          <p style={{ fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif', fontStyle: 'italic', fontSize: '26px', color: '#191917', letterSpacing: '-0.01em', marginBottom: '28px' }}>
            {editingId ? 'Projekt bearbeiten' : 'Neues Projekt'}
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={lbl}>Titel *</label>
              <input style={inp} value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} required placeholder="Projektname" />
            </div>

            <div>
              <label style={lbl}>Beschreibung</label>
              <textarea style={{ ...inp, minHeight: '80px', resize: 'vertical' }} value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} placeholder="Kurze Projektbeschreibung…" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={lbl}>Jahr</label>
                <input style={inp} type="number" value={form.year} onChange={(e) => setForm((p) => ({ ...p, year: e.target.value }))} placeholder="2024" min="1990" max="2099" />
              </div>
              <div>
                <label style={lbl}>Kunde</label>
                <input style={inp} value={form.client} onChange={(e) => setForm((p) => ({ ...p, client: e.target.value }))} placeholder="Kundenname" />
              </div>
            </div>

            <div>
              <label style={lbl}>Tags (kommagetrennt)</label>
              <input style={inp} value={form.tags} onChange={(e) => setForm((p) => ({ ...p, tags: e.target.value }))} placeholder="Branding, Print, Web" />
            </div>

            <div>
              <label style={lbl}>Cover-Bild</label>
              {form.coverImage && (
                <img src={form.coverImage} alt="Preview" style={{ height: '80px', width: '100%', objectFit: 'cover', marginBottom: '8px' }} />
              )}
              <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
              <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
                style={{ ...inp, width: 'auto', padding: '8px 16px', background: 'none', cursor: 'pointer', color: '#787672' }}>
                {uploading ? 'Lädt hoch…' : form.coverImage ? 'Bild ersetzen' : 'Bild hochladen'}
              </button>
              {form.coverImage && (
                <button type="button" onClick={() => setForm((p) => ({ ...p, coverImage: '' }))}
                  style={{ marginLeft: '8px', background: 'none', border: 'none', color: '#E8581A', fontSize: '12px', cursor: 'pointer' }}>
                  Entfernen
                </button>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', alignItems: 'end' }}>
              <div>
                <label style={lbl}>Reihenfolge</label>
                <input style={inp} type="number" value={form.order} onChange={(e) => setForm((p) => ({ ...p, order: e.target.value }))} min="0" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingBottom: '2px' }}>
                <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))} style={{ width: '14px', height: '14px', cursor: 'pointer' }} />
                <label htmlFor="featured" style={{ ...lbl, marginBottom: 0, cursor: 'pointer' }}>Hervorgehoben</label>
              </div>
            </div>

            {msg && (
              <p style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '12px', letterSpacing: '0.05em', color: msg.includes(' fehler') || msg.includes('Fehler') ? '#E8581A' : '#191917' }}>
                {msg}
              </p>
            )}

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" disabled={saving}
                style={{ padding: '12px 24px', background: saving ? '#787672' : '#191917', color: '#F4F2ED', border: 'none', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: saving ? 'not-allowed' : 'pointer', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
                {saving ? 'Speichert…' : editingId ? 'Aktualisieren' : 'Erstellen'}
              </button>
              {editingId && (
                <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); setMsg('') }}
                  style={{ padding: '12px 24px', background: 'none', border: '1px solid #E8E5DF', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', color: '#787672' }}>
                  Abbrechen
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Projects list */}
        <div style={{ padding: '40px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '28px' }}>
            <p style={{ fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif', fontStyle: 'italic', fontSize: '26px', color: '#191917', letterSpacing: '-0.01em' }}>
              Projekte
            </p>
            <span style={{ ...lbl, marginBottom: 0 }}>({projects.length})</span>
          </div>

          {projects.length === 0 ? (
            <p style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '14px', color: '#787672' }}>
              Noch keine Projekte vorhanden.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
              {projects.map((p) => (
                <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: '1px solid #E8E5DF', background: editingId === p.id ? 'rgba(232,88,26,0.05)' : 'transparent' }}>
                  {p.cover_image && (
                    <img src={p.cover_image} alt="" style={{ width: '44px', height: '44px', objectFit: 'cover', flexShrink: 0 }} />
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '14px', color: '#191917', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {p.title}
                    </p>
                    <p style={{ ...lbl, marginBottom: 0 }}>
                      {p.year}{p.year && p.client ? ' — ' : ''}{p.client}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                    <button onClick={() => handleEdit(p)}
                      style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', background: 'none', border: '1px solid #E8E5DF', padding: '5px 10px', cursor: 'pointer', color: '#191917', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(p.id, p.title)}
                      style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', background: 'none', border: '1px solid transparent', padding: '5px 10px', cursor: 'pointer', color: '#E8581A', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
