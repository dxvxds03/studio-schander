'use client'

import { useEffect, useRef, useState } from 'react'

// Deterministic decoration per card index
const ROTS   = [-3.8,  2.5, -1.4,  4.0, -2.7,  1.8, -4.2,  3.1, -2.0,  3.6]
const OFFS_Y = [   0,   10,   -6,  14,   -9,    5,  -13,    8,   -3,   11]

interface ImgDims {
  src: string
  ratio: number // naturalWidth / naturalHeight
}

interface LayoutSlot extends ImgDims {
  w: number   // image display width (px)
  h: number   // image display height (px)
  rot: number
  oy: number  // vertical offset (px)
}

/**
 * Justified-layout algorithm — like Google Photos, but with organic row heights.
 *
 * For each row we:
 *   1. Greedily add images until the row hits ~80% fill or 4 images
 *   2. Scale the row height so all images together fill the row width exactly
 *   3. Cap: don't make images taller than 1.7× or shorter than 0.5× baseH
 *   4. Last sparse row keeps baseH (not stretched)
 *
 * cardSidePad: total horizontal frame px per card (left+right) — excluded from image area
 * gap: pixel gap between card frames
 */
function buildRows(
  imgs: ImgDims[],
  contentW: number,
  gap: number,
  cardSidePad: number,
): LayoutSlot[][] {
  if (!imgs.length || contentW <= 0) return []

  // Base height: scales with viewport, clamped to a comfortable range
  const baseH = Math.max(150, Math.min(390, contentW * 0.27))

  const rows: LayoutSlot[][] = []
  let cursor = 0

  while (cursor < imgs.length) {
    const rowStart = cursor
    let sumRatios = 0
    let count = 0

    // Greedily fill row
    while (cursor < imgs.length) {
      sumRatios += imgs[cursor].ratio
      count++
      cursor++

      const imagePixels  = sumRatios * baseH
      const framePixels  = count * cardSidePad
      const gapPixels    = (count - 1) * gap
      const totalFill    = (imagePixels + framePixels + gapPixels) / contentW

      if (totalFill >= 0.78 || count >= 4) break
    }

    const rowImgs    = imgs.slice(rowStart, rowStart + count)
    const sumR       = rowImgs.reduce((s, d) => s + d.ratio, 0)
    const isLastRow  = cursor >= imgs.length

    // Width available purely for image pixels in this row
    const imgAreaW   = contentW - count * cardSidePad - (count - 1) * gap
    const naturalFill = (sumR * baseH) / imgAreaW

    let h: number
    if (isLastRow && naturalFill < 0.55) {
      // Sparse orphan row — keep natural size, don't stretch
      h = baseH
    } else {
      // Scale height so images fill the row
      h = imgAreaW / sumR
      h = Math.max(baseH * 0.5, Math.min(baseH * 1.7, h))
    }

    rows.push(
      rowImgs.map((d, j) => ({
        ...d,
        w: d.ratio * h,
        h,
        rot: ROTS[(rowStart + j) % ROTS.length],
        oy: OFFS_Y[(rowStart + j) % OFFS_Y.length],
      }))
    )
  }

  return rows
}

interface Props {
  images: string[]
  title: string
}

export default function ProjectPinboard({ images, title }: Props) {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const [dims, setDims]       = useState<ImgDims[]>([])
  const [contentW, setContentW] = useState(0)
  const [ready, setReady]     = useState(false)

  // Track inner content width reactively
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setContentW(e.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Pre-load every image to get its natural aspect ratio
  useEffect(() => {
    let cancelled = false
    setReady(false)
    Promise.all(
      images.map(src =>
        new Promise<ImgDims>(resolve => {
          const img = new window.Image()
          img.onload  = () => resolve({ src, ratio: img.naturalWidth / img.naturalHeight })
          img.onerror = () => resolve({ src, ratio: 4 / 3 })
          img.src = src
        })
      )
    ).then(data => {
      if (!cancelled) { setDims(data); setReady(true) }
    })
    return () => { cancelled = true }
  }, [images])

  // Responsive sizing — derived from measured content width
  const gap         = Math.max(14, Math.min(46, contentW * 0.032))
  const framePx     = Math.max(5,  Math.min(9,  contentW * 0.007))   // card frame (one side)
  const bottomPx    = Math.max(20, Math.min(34, contentW * 0.027))   // photo-label space
  const cardSidePad = framePx * 2

  const rows = ready && contentW > 0
    ? buildRows(dims, contentW, gap, cardSidePad)
    : []

  if (!images.length) return null

  return (
    <div
      ref={wrapRef}
      className="project-pinboard-wrap"
      style={{
        marginTop: '61px',
        background: 'var(--cream)',
        // generous vertical padding so rotated cards don't clip at edges
        padding: `${Math.max(56, Math.min(110, contentW * 0.08))}px ${Math.max(24, Math.min(72, contentW * 0.05))}px ${Math.max(24, Math.min(56, contentW * 0.04))}px`,
        overflowX: 'clip',
      }}
    >
      {/* Loading placeholder */}
      {!ready && (
        <div style={{ height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: '"Source Code Pro", monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--faint)' }}>
            Lädt…
          </span>
        </div>
      )}

      {/* Rows */}
      {rows.map((row, ri) => {
        const globalBase = rows.slice(0, ri).reduce((s, r) => s + r.length, 0)
        const rowGapBottom = ri < rows.length - 1 ? gap * 1.55 : 0

        return (
          <div
            key={ri}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              gap: `${gap}px`,
              marginBottom: `${rowGapBottom}px`,
            }}
          >
            {row.map((slot, si) => (
              <div
                key={`${ri}-${si}`}
                className="pinboard-card"
                style={{
                  flexShrink: 0,
                  transform: `rotate(${slot.rot}deg) translateY(${slot.oy}px)`,
                  transformOrigin: 'center bottom',
                  background: '#FEFCF8',
                  // frame: equal on all sides except larger bottom (photo label illusion)
                  padding: `${framePx}px ${framePx}px ${bottomPx}px`,
                  boxShadow: '0 2px 8px rgba(25,25,23,0.09), 0 8px 32px rgba(25,25,23,0.11)',
                  transition: 'transform 0.38s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.38s ease',
                }}
              >
                <img
                  src={slot.src}
                  alt={`${title} — ${globalBase + si + 1}`}
                  draggable={false}
                  style={{
                    display: 'block',
                    width:  `${Math.round(slot.w)}px`,
                    height: `${Math.round(slot.h)}px`,
                    userSelect: 'none',
                  }}
                />
              </div>
            ))}
          </div>
        )
      })}

      <style>{`
        @media (hover: hover) and (pointer: fine) {
          .pinboard-card:hover {
            transform: rotate(0deg) translateY(-8px) !important;
            box-shadow: 0 8px 24px rgba(25,25,23,0.13), 0 20px 60px rgba(25,25,23,0.15) !important;
          }
        }
        @media (max-width: 1024px) {
          .project-pinboard-wrap { margin-top: 88px !important; }
        }
      `}</style>
    </div>
  )
}
