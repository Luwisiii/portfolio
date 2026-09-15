import { useEffect, useState } from 'react'

const rows = [
  { name: 'L.O.U.I.S.', state: 'Active dev', kind: 'dev' },
  { name: 'Worship Studio', state: 'Production', kind: 'live' },
  { name: 'AI Resume Analyzer', state: 'Open source', kind: 'dev' },
]

function pad(n) {
  return String(n).padStart(2, '0')
}

export function StatusPanel() {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - start) / 1000))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const h = Math.floor(elapsed / 3600)
  const m = Math.floor((elapsed % 3600) / 60)
  const s = elapsed % 60

  return (
    <div
      className="status-panel"
      role="img"
      aria-label="Live status panel showing project states: L.O.U.I.S. in active development, Worship Studio in production, AI Resume Analyzer open source"
    >
      <div className="status-panel-head">
        <span>System status</span>
        <span>{`${pad(h)}:${pad(m)}:${pad(s)}`}</span>
      </div>
      {rows.map((row) => (
        <div className="status-row" key={row.name}>
          <span className={row.kind === 'live' ? 'dot-live' : 'dot-dev'}></span>
          <span className="status-row-name">{row.name}</span>
          <span className="status-row-state">{row.state}</span>
        </div>
      ))}
      <div className="status-panel-foot">Open to new roles</div>
    </div>
  )
}
