import { useEffect, useState } from 'react'
import { ACHIEVEMENTS, onUnlock, useProgress } from '../game'

const TOAST_MS = 6000

export function Achievements() {
  const [toasts, setToasts] = useState([])
  const progress = useProgress()

  useEffect(
    () =>
      onUnlock((achievement) => {
        const key = `${achievement.id}-${Date.now()}`
        setToasts((t) => [...t, { ...achievement, key }])
        setTimeout(() => setToasts((t) => t.filter((x) => x.key !== key)), TOAST_MS)
      }),
    [],
  )

  return (
    <div className="toasts" aria-live="polite">
      {toasts.map((t) => (
        <div className="toast" key={t.key} style={{ animationDuration: `${TOAST_MS}ms` }}>
          <div className="toast-head mono">
            <span>★ Achievement unlocked</span>
            <span>
              {progress.unlocked.length}/{ACHIEVEMENTS.length}
            </span>
          </div>
          <p className="toast-title">{t.title}</p>
          <p className="toast-desc">{t.desc}</p>
        </div>
      ))}
    </div>
  )
}
