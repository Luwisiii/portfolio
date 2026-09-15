import { useEffect, useRef, useState } from 'react'

function useDrawIn() {
  const containerRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lines = el.querySelectorAll('.diagram-line, .diagram-line-accent')

    if (reduceMotion || !('IntersectionObserver' in window)) {
      setInView(true)
      return
    }

    lines.forEach((path) => {
      const len = path.getTotalLength()
      path.style.strokeDasharray = len
      path.style.strokeDashoffset = len
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          setInView(true)
          el.querySelectorAll('.diagram-line, .diagram-line-accent').forEach((path) => {
            path.style.strokeDashoffset = '0'
          })
          observer.unobserve(el)
        })
      },
      { threshold: 0.35 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { containerRef, inView }
}

function Marker({ id, color }) {
  return (
    <marker id={id} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 Z" fill={color} />
    </marker>
  )
}

function LouisDiagram() {
  return (
    <svg viewBox="0 0 340 220" xmlns="http://www.w3.org/2000/svg">
      <text className="diagram-label" x="170" y="16" textAnchor="middle" style={{ fontSize: 9 }}>
        flutter_rust_bridge
      </text>

      <rect className="diagram-box-accent" x="20" y="26" width="130" height="52" rx="6" />
      <text className="diagram-label diagram-label-accent" x="85" y="48" textAnchor="middle">
        FLUTTER UI
      </text>
      <text className="diagram-label" x="85" y="64" textAnchor="middle">
        (Dart · Riverpod)
      </text>

      <rect className="diagram-box" x="190" y="26" width="130" height="52" rx="6" />
      <text className="diagram-label" x="255" y="48" textAnchor="middle" fill="var(--text)">
        RUST ENGINE
      </text>
      <text className="diagram-label" x="255" y="64" textAnchor="middle">
        workspace · fs · exec
      </text>

      <path className="diagram-line-accent" d="M150 52 L190 52" markerEnd="url(#m-louis-a)" />
      <path className="diagram-line" d="M190 60 L150 60" markerEnd="url(#m-louis-b)" />

      <rect className="diagram-box" x="45" y="140" width="105" height="48" rx="6" />
      <text className="diagram-label" x="97" y="160" textAnchor="middle">
        DRIFT + SQLITE
      </text>
      <text className="diagram-label" x="97" y="174" textAnchor="middle">
        local state
      </text>

      <rect className="diagram-box" x="190" y="140" width="120" height="48" rx="6" />
      <text className="diagram-label" x="250" y="160" textAnchor="middle">
        SECURE STORAGE
      </text>
      <text className="diagram-label" x="250" y="174" textAnchor="middle">
        credentials
      </text>

      <path className="diagram-line" d="M255 78 L97 140" markerEnd="url(#m-louis-b)" />
      <path className="diagram-line" d="M255 78 L250 140" markerEnd="url(#m-louis-b)" />

      <defs>
        <Marker id="m-louis-a" color="var(--accent)" />
        <Marker id="m-louis-b" color="var(--text-muted)" />
      </defs>
    </svg>
  )
}

function WorshipDiagram() {
  return (
    <svg viewBox="0 0 340 220" xmlns="http://www.w3.org/2000/svg">
      <rect className="diagram-box-accent" x="105" y="18" width="130" height="42" rx="6" />
      <text className="diagram-label diagram-label-accent" x="170" y="36" textAnchor="middle">
        LIVE COMMANDS
      </text>
      <text className="diagram-label" x="170" y="50" textAnchor="middle">
        typed · one per cue
      </text>

      <path className="diagram-line" d="M140 60 L47 108" markerEnd="url(#m-ws-b)" />
      <path className="diagram-line-accent" d="M162 60 L129 108" markerEnd="url(#m-ws-a)" />
      <path className="diagram-line" d="M178 60 L211 108" markerEnd="url(#m-ws-b)" />
      <path className="diagram-line" d="M200 60 L293 108" markerEnd="url(#m-ws-b)" />

      <rect className="diagram-box" x="10" y="108" width="75" height="52" rx="6" />
      <text className="diagram-label" x="47" y="130" textAnchor="middle">
        PREVIEW
      </text>
      <text className="diagram-label" x="47" y="144" textAnchor="middle">
        staged
      </text>

      <rect className="diagram-box-accent" x="92" y="108" width="75" height="52" rx="6" />
      <text className="diagram-label diagram-label-accent" x="129" y="130" textAnchor="middle">
        PROGRAM
      </text>
      <text className="diagram-label" x="129" y="144" textAnchor="middle">
        live
      </text>

      <rect className="diagram-box" x="174" y="108" width="75" height="52" rx="6" />
      <text className="diagram-label" x="211" y="130" textAnchor="middle">
        AUDIENCE
      </text>
      <text className="diagram-label" x="211" y="144" textAnchor="middle">
        room view
      </text>

      <rect className="diagram-box" x="256" y="108" width="75" height="52" rx="6" />
      <text className="diagram-label" x="293" y="130" textAnchor="middle">
        STAGE
      </text>
      <text className="diagram-label" x="293" y="144" textAnchor="middle">
        confidence
      </text>

      <text className="diagram-label" x="170" y="188" textAnchor="middle">
        4 independent outputs · isolated failure
      </text>

      <defs>
        <Marker id="m-ws-a" color="var(--accent)" />
        <Marker id="m-ws-b" color="var(--text-muted)" />
      </defs>
    </svg>
  )
}

function ResumeDiagram() {
  return (
    <svg viewBox="0 0 340 220" xmlns="http://www.w3.org/2000/svg">
      <rect className="diagram-box" x="14" y="26" width="110" height="46" rx="6" />
      <text className="diagram-label" x="69" y="46" textAnchor="middle" fill="var(--text)">
        RESUME.PDF
      </text>
      <text className="diagram-label" x="69" y="60" textAnchor="middle">
        upload
      </text>

      <path className="diagram-line-accent" d="M124 49 L160 49" markerEnd="url(#m-ai-a)" />

      <rect className="diagram-box-accent" x="160" y="26" width="166" height="46" rx="6" />
      <text className="diagram-label diagram-label-accent" x="243" y="46" textAnchor="middle">
        PARSE + EMBED
      </text>
      <text className="diagram-label" x="243" y="60" textAnchor="middle">
        PyMuPDF · sentence-transformers
      </text>

      <path className="diagram-line" d="M243 72 L243 100" markerEnd="url(#m-ai-b)" />

      <rect className="diagram-box" x="160" y="100" width="166" height="46" rx="6" />
      <text className="diagram-label" x="243" y="120" textAnchor="middle" fill="var(--text)">
        MATCH
      </text>
      <text className="diagram-label" x="243" y="134" textAnchor="middle">
        pgvector · cosine similarity
      </text>

      <path className="diagram-line" d="M243 146 L243 174" markerEnd="url(#m-ai-b)" />

      <rect className="diagram-box" x="160" y="174" width="166" height="40" rx="6" />
      <text className="diagram-label" x="243" y="192" textAnchor="middle" fill="var(--text)">
        ASYNC FEEDBACK
      </text>
      <text className="diagram-label" x="243" y="205" textAnchor="middle">
        Celery + Redis + Ollama
      </text>

      <defs>
        <Marker id="m-ai-a" color="var(--accent)" />
        <Marker id="m-ai-b" color="var(--text-muted)" />
      </defs>
    </svg>
  )
}

const DIAGRAMS = {
  louis: LouisDiagram,
  'worship-studio': WorshipDiagram,
  'ai-resume-analyzer': ResumeDiagram,
}

export function ProjectDiagram({ variant }) {
  const { containerRef, inView } = useDrawIn()
  const Diagram = DIAGRAMS[variant]
  if (!Diagram) return null

  return (
    <div
      className={`project-diagram${inView ? ' in-view' : ''}`}
      ref={containerRef}
      aria-hidden="true"
    >
      <Diagram />
    </div>
  )
}
