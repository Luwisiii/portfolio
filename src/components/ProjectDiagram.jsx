import { useEffect, useRef, useState } from 'react'
import { useSpotlight } from '../hooks/useSpotlight'
import { unlock } from '../game'

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

// A box in the pipeline. `step` is its place in the data flow: nodes come up in
// that order (CSS reads --step).
function Node({ x, y, w, h, title, sub, step, accent = false, crashed = false, className = '', ...props }) {
  const cx = x + w / 2
  return (
    <g
      className={`diagram-node${crashed ? ' is-crashed' : ''} ${className}`}
      style={{ '--step': step }}
      {...props}
    >
      <rect className={accent ? 'diagram-box-accent' : 'diagram-box'} x={x} y={y} width={w} height={h} rx="6" />
      <text
        className={`diagram-label${accent ? ' diagram-label-accent' : ''}`}
        x={cx}
        y={y + h / 2 - 3}
        textAnchor="middle"
        fill="var(--text)"
      >
        {title}
      </text>
      <text className="diagram-label diagram-label-sm" x={cx} y={y + h / 2 + 11} textAnchor="middle">
        {crashed ? 'crashed' : sub}
      </text>
    </g>
  )
}

// A connector plus a pulse that travels along it. pathLength="100" normalizes every
// wire to the same dash scale, so one CSS animation fits paths of any real length.
// `step` is the node it feeds: the wire draws in the beat before that node comes up.
function Wire({ d, marker, step, accent = false, delay = 0, cut = false }) {
  return (
    <g className={cut ? 'diagram-wire is-cut' : 'diagram-wire'} style={{ '--step': step }}>
      <path
        className={accent ? 'diagram-line-accent' : 'diagram-line'}
        d={d}
        markerEnd={`url(#${marker})`}
      />
      <path
        className="diagram-flow"
        d={d}
        pathLength="100"
        style={{ animationDelay: `${delay}s` }}
      />
    </g>
  )
}

function LouisDiagram() {
  return (
    <svg viewBox="0 0 340 220" xmlns="http://www.w3.org/2000/svg">
      <text className="diagram-label diagram-label-sm" x="170" y="16" textAnchor="middle">
        flutter_rust_bridge
      </text>

      <Wire d="M150 52 L190 52" marker="m-louis-a" step={1} accent />
      <Wire d="M190 60 L150 60" marker="m-louis-b" step={1} delay={1.1} />
      <Wire d="M255 78 L97 140" marker="m-louis-b" step={2} delay={0.5} />
      <Wire d="M255 78 L250 140" marker="m-louis-b" step={2} delay={0.8} />

      <Node x={20} y={26} w={130} h={52} title="FLUTTER UI" sub="(Dart · Riverpod)" step={0} accent />
      <Node x={190} y={26} w={130} h={52} title="RUST ENGINE" sub="workspace · fs · exec" step={1} />
      <Node x={45} y={140} w={105} h={48} title="DRIFT + SQLITE" sub="local state" step={2} />
      <Node x={190} y={140} w={120} h={48} title="SECURE STORAGE" sub="credentials" step={2.2} />

      <defs>
        <Marker id="m-louis-a" color="var(--accent)" />
        <Marker id="m-louis-b" color="var(--text-muted)" />
      </defs>
    </svg>
  )
}

const OUTPUTS = [
  { id: 'preview', x: 10, title: 'PREVIEW', sub: 'staged', from: 140 },
  { id: 'program', x: 92, title: 'PROGRAM', sub: 'live', from: 162, accent: true },
  { id: 'audience', x: 174, title: 'AUDIENCE', sub: 'room view', from: 178 },
  { id: 'stage', x: 256, title: 'STAGE', sub: 'confidence', from: 200 },
]

// Hover (or tap) an output to crash it. Its wire gets cut, the other three keep
// pulsing — the isolation claim from the copy, shown instead of stated.
function WorshipDiagram() {
  const [crashed, setCrashed] = useState(null)
  const down = OUTPUTS.find((o) => o.id === crashed)

  function crash(id) {
    setCrashed(id)
    unlock('chaos')
  }

  return (
    <svg viewBox="0 0 340 220" xmlns="http://www.w3.org/2000/svg">
      {OUTPUTS.map((o, i) => (
        <Wire
          key={o.id}
          d={`M${o.from} 60 L${o.x + 37} 108`}
          marker={o.accent ? 'm-ws-a' : 'm-ws-b'}
          step={1 + i * 0.15}
          accent={o.accent}
          delay={i * 0.15}
          cut={crashed === o.id}
        />
      ))}

      <Node x={105} y={18} w={130} h={42} title="LIVE COMMANDS" sub="typed · one per cue" step={0} accent />

      {OUTPUTS.map((o, i) => (
        <Node
          key={o.id}
          x={o.x}
          y={108}
          w={75}
          h={52}
          title={o.title}
          sub={o.sub}
          step={1 + i * 0.15}
          accent={o.accent}
          crashed={crashed === o.id}
          className="is-crashable"
          onMouseEnter={() => crash(o.id)}
          onMouseLeave={() => setCrashed(null)}
          onClick={() => (crashed === o.id ? setCrashed(null) : crash(o.id))}
        />
      ))}

      <text
        className={`diagram-label diagram-label-sm${down ? ' diagram-label-danger' : ''}`}
        x="170"
        y="188"
        textAnchor="middle"
      >
        {down
          ? `${down.title} down · 3 outputs still live`
          : '4 isolated outputs · hover one to crash it'}
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
      <Wire d="M124 49 L160 49" marker="m-ai-a" step={1} accent />
      <Wire d="M243 72 L243 100" marker="m-ai-b" step={2} delay={0.7} />
      <Wire d="M243 146 L243 174" marker="m-ai-b" step={3} delay={1.4} />

      <Node x={14} y={26} w={110} h={46} title="RESUME.PDF" sub="upload" step={0} />
      <Node x={160} y={26} w={166} h={46} title="PARSE + EMBED" sub="PyMuPDF · embeddings" step={1} accent />
      <Node x={160} y={100} w={166} h={46} title="MATCH" sub="pgvector · cosine similarity" step={2} />
      <Node x={160} y={174} w={166} h={40} title="ASYNC FEEDBACK" sub="Celery + Redis + Ollama" step={3} />

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
  const spotlight = useSpotlight()
  const Diagram = DIAGRAMS[variant]
  if (!Diagram) return null

  return (
    <div
      className={`project-diagram${inView ? ' in-view' : ''}`}
      ref={containerRef}
      {...spotlight}
      aria-hidden="true"
    >
      <Diagram />
    </div>
  )
}
