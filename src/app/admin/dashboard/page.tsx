'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabaseBrowserClient } from '@/lib/supabase'
import { compressImage } from '@/lib/compress-image'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface Project {
  id: number
  title: string
  year: number | null
  client: string | null
  cover_image: string | null
  images: string[]
  link: string | null
  featured: boolean
  order: number
  description: string | null
  tags: string[]
  show_in_carousel: boolean
  project_type: 'client' | 'schander' | 'personal' | null
}

const emptyForm = {
  title: '',
  description: '',
  year: '',
  client: '',
  tags: '',
  coverImage: '',
  link: '',
  order: '0',
  featured: false,
  showInCarousel: true,
  projectType: 'client' as 'client' | 'schander' | 'personal',
}

// ── Sortable image thumbnail ────────────────────────────────────────────────
function SortableImage({ url, index, onRemove }: { url: string; index: number; onRemove: (i: number) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: url })
  return (
    <div
      ref={setNodeRef}
      style={{
        position: 'relative',
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab',
      }}
      {...attributes}
      {...listeners}
    >
      <img src={url} alt="" style={{ width: '64px', height: '64px', objectFit: 'cover', display: 'block' }} />
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onRemove(index) }}
        onPointerDown={(e) => e.stopPropagation()}
        style={{
          position: 'absolute', top: '2px', right: '2px',
          background: '#E8331A', color: '#fff', border: 'none',
          width: '18px', height: '18px', fontSize: '10px',
          cursor: 'pointer', lineHeight: '18px', textAlign: 'center',
        }}
      >
        ✕
      </button>
    </div>
  )
}

// ── Sortable project row ────────────────────────────────────────────────────
function SortableProjectRow({
  project,
  isEditing,
  onEdit,
  onDelete,
}: {
  project: Project
  isEditing: boolean
  onEdit: (p: Project) => void
  onDelete: (id: number, title: string) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: project.id })

  const lbl: React.CSSProperties = {
    fontFamily: '"Source Code Pro", monospace', fontSize: '10px',
    letterSpacing: '0.2em', textTransform: 'uppercase', color: '#787672',
    display: 'block', marginBottom: '6px',
  }

  return (
    <div
      ref={setNodeRef}
      style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        padding: '12px 0', borderBottom: '1px solid #E8E5DF',
        background: isEditing ? 'rgba(232,88,26,0.05)' : 'transparent',
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
      }}
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        style={{ cursor: 'grab', padding: '4px 2px', flexShrink: 0, color: '#C8C5BF', lineHeight: 1 }}
        title="Ziehen zum Sortieren"
      >
        <svg width="12" height="16" viewBox="0 0 12 16" fill="currentColor">
          <circle cx="4" cy="3" r="1.5" /><circle cx="8" cy="3" r="1.5" />
          <circle cx="4" cy="8" r="1.5" /><circle cx="8" cy="8" r="1.5" />
          <circle cx="4" cy="13" r="1.5" /><circle cx="8" cy="13" r="1.5" />
        </svg>
      </div>

      {project.cover_image && (
        <img src={project.cover_image} alt="" style={{ width: '44px', height: '44px', objectFit: 'cover', flexShrink: 0 }} />
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontFamily: '"Source Code Pro", monospace', fontSize: '14px', color: '#191917', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {project.title}
        </p>
        <p style={{ ...lbl, marginBottom: 0 }}>
          {project.year}{project.year && project.client ? ' — ' : ''}{project.client}
          {(project.images?.length ?? 0) > 0 && ` · ${project.images.length + 1} Bilder`}
        </p>
      </div>
      <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
        <button
          onClick={() => onEdit(project)}
          style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', background: 'none', border: '1px solid #E8E5DF', padding: '5px 10px', cursor: 'pointer', color: '#191917', fontFamily: '"Source Code Pro", monospace' }}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(project.id, project.title)}
          style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', background: 'none', border: '1px solid transparent', padding: '5px 10px', cursor: 'pointer', color: '#E8331A', fontFamily: '"Source Code Pro", monospace' }}
        >
          ✕
        </button>
      </div>
    </div>
  )
}

// ── Main dashboard ──────────────────────────────────────────────────────────
export default function Dashboard() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [form, setForm] = useState(emptyForm)
  const [extraImages, setExtraImages] = useState<string[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)
  const multiFileRef = useRef<HTMLInputElement>(null)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

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
      const compressed = await compressImage(file)
      const fd = new FormData()
      fd.append('file', compressed)
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

  const handleMultiFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    setUploading(true)
    try {
      const urls: string[] = []
      for (const file of files) {
        const compressed = await compressImage(file)
        const fd = new FormData()
        fd.append('file', compressed)
        const res = await fetch('/api/upload', { method: 'POST', body: fd })
        if (!res.ok) throw new Error()
        const { url } = await res.json()
        urls.push(url)
      }
      setExtraImages((prev) => [...prev, ...urls])
    } catch {
      setMsg('Bild-Upload fehlgeschlagen.')
    } finally {
      setUploading(false)
      if (multiFileRef.current) multiFileRef.current.value = ''
    }
  }

  const removeExtraImage = (idx: number) => {
    setExtraImages((prev) => prev.filter((_, i) => i !== idx))
  }

  const handleImageDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    setExtraImages((prev) => {
      const oldIndex = prev.indexOf(active.id as string)
      const newIndex = prev.indexOf(over.id as string)
      return arrayMove(prev, oldIndex, newIndex)
    })
  }

  const handleProjectDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = projects.findIndex((p) => p.id === active.id)
    const newIndex = projects.findIndex((p) => p.id === over.id)
    const reordered = arrayMove(projects, oldIndex, newIndex)

    setProjects(reordered)

    const orders = reordered.map((p, i) => ({ id: p.id, order: i }))
    await fetch('/api/projects/reorder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orders }),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMsg('')

    const payload = {
      title: form.title,
      description: form.description || null,
      year: form.year ? parseInt(form.year) : null,
      client: form.projectType === 'client' ? (form.client || null) : null,
      projectType: form.projectType,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      coverImage: form.coverImage || null,
      images: extraImages,
      link: form.link || null,
      order: parseInt(form.order) || 0,
      featured: form.featured,
      showInCarousel: form.showInCarousel,
    }

    const url = editingId ? `/api/projects/${editingId}` : '/api/projects'
    const method = editingId ? 'PUT' : 'POST'
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })

    if (res.ok) {
      setMsg(editingId ? 'Aktualisiert.' : 'Erstellt.')
      setForm(emptyForm)
      setExtraImages([])
      setEditingId(null)
      fetchProjects()
    } else if (res.status === 401) {
      router.push('/admin')
    } else {
      try {
        const err = await res.json()
        setMsg(`Fehler: ${err.error ?? res.statusText}`)
      } catch {
        setMsg(`Fehler beim Speichern (${res.status}).`)
      }
    }
    setSaving(false)
  }

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`"${title}" wirklich löschen?`)) return
    const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' })
    if (res.ok) {
      fetchProjects()
      if (editingId === id) { setEditingId(null); setForm(emptyForm); setExtraImages([]) }
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
      link: p.link || '',
      order: String(p.order),
      featured: p.featured,
      showInCarousel: p.show_in_carousel !== false,
      projectType: (p.project_type ?? 'client') as 'client' | 'schander' | 'personal',
    })
    setExtraImages(p.images ?? [])
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLogout = async () => {
    const supabase = getSupabaseBrowserClient()
    await supabase.auth.signOut()
    router.push('/admin')
    router.refresh()
  }

  const inp: React.CSSProperties = {
    fontFamily: '"Source Code Pro", monospace',
    fontSize: '14px', color: '#191917', background: 'transparent',
    border: '1px solid #E8E5DF', padding: '10px 14px', width: '100%', outline: 'none',
  }
  const lbl: React.CSSProperties = {
    fontFamily: '"Source Code Pro", monospace', fontSize: '10px',
    letterSpacing: '0.2em', textTransform: 'uppercase', color: '#787672',
    display: 'block', marginBottom: '6px',
  }

  return (
    <main style={{ background: '#F4F2ED', minHeight: '100vh', cursor: 'default' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid #E8E5DF', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{ fontFamily: '"Cabinet Grotesk", "Helvetica Neue", sans-serif', fontSize: '15px', fontWeight: 800, letterSpacing: '-0.02em', color: '#191917' }}>
          Studio Schander
        </p>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="/" target="_blank" style={{ ...lbl, marginBottom: 0, textDecoration: 'none' }}>Website ↗</a>
          <button onClick={handleLogout} style={{ ...lbl, marginBottom: 0, background: 'none', border: 'none', cursor: 'pointer' }}>Abmelden</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'calc(100vh - 65px)' }}>
        {/* Form */}
        <div style={{ padding: '40px 32px', borderRight: '1px solid #E8E5DF' }}>
          <p style={{ fontFamily: '"Cabinet Grotesk", "Helvetica Neue", sans-serif', fontWeight: 800, fontSize: '26px', color: '#191917', letterSpacing: '-0.03em', marginBottom: '28px' }}>
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
                <label style={lbl}>Projekttyp</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '4px' }}>
                  {([['client', 'Externer Kunde'], ['schander', 'Schander Marke'], ['personal', 'Persönliches Projekt']] as const).map(([val, label]) => (
                    <label key={val} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="projectType"
                        value={val}
                        checked={form.projectType === val}
                        onChange={() => setForm((p) => ({ ...p, projectType: val }))}
                        style={{ accentColor: '#E8331A', cursor: 'pointer' }}
                      />
                      <span style={{ fontFamily: '"Source Code Pro", monospace', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#787672' }}>{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {form.projectType === 'client' && (
              <div>
                <label style={lbl}>Kundenname</label>
                <input style={inp} value={form.client} onChange={(e) => setForm((p) => ({ ...p, client: e.target.value }))} placeholder="z.B. Sparkasse Herford" />
              </div>
            )}

            <div>
              <label style={lbl}>Tags (kommagetrennt)</label>
              <input style={inp} value={form.tags} onChange={(e) => setForm((p) => ({ ...p, tags: e.target.value }))} placeholder="Branding, Print, Web" />
            </div>

            <div>
              <label style={lbl}>Externer Link (optional)</label>
              <input style={inp} type="url" value={form.link} onChange={(e) => setForm((p) => ({ ...p, link: e.target.value }))} placeholder="https://example.com" />
              <p style={{ fontFamily: '"Source Code Pro", monospace', fontSize: '10px', color: '#787672', marginTop: '4px' }}>
                Wenn gesetzt, öffnet der Klick im Carousel diesen Link (↗ neuer Tab).
              </p>
            </div>

            {/* Cover image */}
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
                  style={{ marginLeft: '8px', background: 'none', border: 'none', color: '#E8331A', fontSize: '12px', cursor: 'pointer' }}>
                  Entfernen
                </button>
              )}
            </div>

            {/* Additional images — sortable */}
            <div>
              <label style={lbl}>Weitere Bilder (Hover-Galerie)</label>
              {extraImages.length > 0 && (
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleImageDragEnd}>
                  <SortableContext items={extraImages} strategy={rectSortingStrategy}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                      {extraImages.map((url, idx) => (
                        <SortableImage key={url} url={url} index={idx} onRemove={removeExtraImage} />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
              {extraImages.length > 0 && (
                <p style={{ fontFamily: '"Source Code Pro", monospace', fontSize: '10px', color: '#C8C5BF', marginBottom: '8px', letterSpacing: '0.05em' }}>
                  Ziehen zum Sortieren
                </p>
              )}
              <input ref={multiFileRef} type="file" accept="image/*" multiple onChange={handleMultiFileChange} style={{ display: 'none' }} />
              <button type="button" onClick={() => multiFileRef.current?.click()} disabled={uploading}
                style={{ ...inp, width: 'auto', padding: '8px 16px', background: 'none', cursor: 'pointer', color: '#787672' }}>
                {uploading ? 'Lädt hoch…' : 'Bilder hinzufügen'}
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', alignItems: 'end' }}>
              <div>
                <label style={lbl}>Reihenfolge</label>
                <input style={inp} type="number" value={form.order} onChange={(e) => setForm((p) => ({ ...p, order: e.target.value }))} min="0" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))} style={{ width: '14px', height: '14px', cursor: 'pointer' }} />
                  <label htmlFor="featured" style={{ ...lbl, marginBottom: 0, cursor: 'pointer' }}>Hervorgehoben</label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="checkbox" id="showInCarousel" checked={form.showInCarousel} onChange={(e) => setForm((p) => ({ ...p, showInCarousel: e.target.checked }))} style={{ width: '14px', height: '14px', cursor: 'pointer' }} />
                  <label htmlFor="showInCarousel" style={{ ...lbl, marginBottom: 0, cursor: 'pointer' }}>Im Carousel anzeigen</label>
                </div>
              </div>
            </div>

            {msg && (
              <p style={{ fontFamily: '"Source Code Pro", monospace', fontSize: '12px', letterSpacing: '0.05em', color: msg.includes('fehler') || msg.includes('Fehler') ? '#E8331A' : '#191917' }}>
                {msg}
              </p>
            )}

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" disabled={saving}
                style={{ padding: '12px 24px', background: saving ? '#787672' : '#191917', color: '#F4F2ED', border: 'none', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: saving ? 'not-allowed' : 'pointer', fontFamily: '"Source Code Pro", monospace' }}>
                {saving ? 'Speichert…' : editingId ? 'Aktualisieren' : 'Erstellen'}
              </button>
              {editingId && (
                <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); setExtraImages([]); setMsg('') }}
                  style={{ padding: '12px 24px', background: 'none', border: '1px solid #E8E5DF', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: '"Source Code Pro", monospace', color: '#787672' }}>
                  Abbrechen
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Projects list — sortable */}
        <div style={{ padding: '40px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '28px' }}>
            <p style={{ fontFamily: '"Cabinet Grotesk", "Helvetica Neue", sans-serif', fontWeight: 800, fontSize: '26px', color: '#191917', letterSpacing: '-0.03em' }}>
              Projekte
            </p>
            <span style={{ ...lbl, marginBottom: 0 }}>({projects.length})</span>
          </div>

          {projects.length === 0 ? (
            <p style={{ fontFamily: '"Source Code Pro", monospace', fontSize: '14px', color: '#787672' }}>
              Noch keine Projekte vorhanden.
            </p>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleProjectDragEnd}>
              <SortableContext items={projects.map((p) => p.id)} strategy={verticalListSortingStrategy}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                  {projects.map((p) => (
                    <SortableProjectRow
                      key={p.id}
                      project={p}
                      isEditing={editingId === p.id}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>
    </main>
  )
}
