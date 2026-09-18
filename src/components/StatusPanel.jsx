import { useEffect, useState } from 'react'
import { unlock } from '../game'

const rows = [
  { name: 'L.O.U.I.S.', state: 'Active dev', kind: 'dev', build: 'cargo build --release' },
  { name: 'Worship Studio', state: 'Production', kind: 'live', build: 'tauri build' },
  { name: 'AI Resume Analyzer', state: 'Open source', kind: 'dev', build: 'docker compose up' },
]

const STEP_MS = 900

function pad(n) {
  return String(n).padStart(2, '0')
}

// The panel boots like a real deploy: each project builds in turn, then goes up.
// step = how many rows have finished building.
export function StatusPanel() {
  const [step, setStep] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? rows.length : 0,
  )
  const [elapsed, setElapsed] = useState(0)
  const booted = step >= rows.length
  // first step waits out the panel's entrance animation
  const stepMs = step === 0 ? STEP_MS + 500 : STEP_MS

  useEffect(() => {
    if (booted) return
    const id = setTimeout(() => setStep((s) => s + 1), stepMs)
    return () => clearTimeout(id)
  }, [step, booted, stepMs])

  useEffect(() => {
    if (!booted) return
    unlock('boot')
    const start = Date.now()
    const id = setInterval(() => setElapsed(Math.floor((Date.now() - start) / 1000)), 1000)
    return () => clearInterval(id)
  }, [booted])

  const h = Math.floor(elapsed / 3600)
  const m = Math.floor((elapsed % 3600) / 60)
  const s = elapsed % 60

  return (
    <div
      className={`status-panel${booted ? ' is-booted' : ''}`}
      role="img"
      aria-label="Live status panel showing project states: L.O.U.I.S. in active development, Worship Studio in production, AI Resume Analyzer open source"
    >
      <div className="status-panel-head">
        <span>{booted ? 'All systems up' : 'Booting…'}</span>
        <span>{`${pad(h)}:${pad(m)}:${pad(s)}`}</span>
      </div>
      <div className="status-log">
        <span className="status-log-prompt">$</span>{' '}
        <span key={step} className="status-log-cmd">
          {booted ? 'watch --uptime' : rows[step].build}
        </span>
      </div>
      {rows.map((row, i) => {
        const phase = i < step ? 'up' : i === step ? 'building' : 'queued'
        return (
          <div className={`status-row is-${phase}`} key={row.name}>
            <span className={phase === 'up' ? `dot-${row.kind}` : 'dot-idle'}></span>
            <span className="status-row-name">{row.name}</span>
            <span className="status-row-state">
              {phase === 'up' ? row.state : phase === 'building' ? 'Building' : 'Queued'}
            </span>
            {phase === 'building' && (
              <span className="status-row-bar" style={{ animationDuration: `${stepMs}ms` }} />
            )}
          </div>
        )
      })}
      <div className="status-panel-foot">Open to new roles</div>
    </div>
  )
}
