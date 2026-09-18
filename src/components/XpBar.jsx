import { useEffect } from 'react'
import { ACHIEVEMENTS, XP_PER_LEVEL, openTerminal, unlock, useProgress, visitSection, xpOf } from '../game'

// Each section scrolled into view is worth XP; reaching Contact is an achievement.
function useSectionVisits() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          visitSection(entry.target.id)
          if (entry.target.id === 'contact') unlock('pipeline')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.3 },
    )
    document.querySelectorAll('main section[id]').forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])
}

export function XpBar() {
  const progress = useProgress()
  useSectionVisits()

  const xp = xpOf(progress)
  const level = Math.floor(xp / XP_PER_LEVEL) + 1
  const into = (xp % XP_PER_LEVEL) / XP_PER_LEVEL

  return (
    <>
      <button
        className="xp-chip mono"
        type="button"
        onClick={() => openTerminal('achievements')}
        aria-label={`Level ${level}, ${xp} XP, ${progress.unlocked.length} of ${ACHIEVEMENTS.length} achievements. Open achievements.`}
      >
        <span className="xp-level">LVL {level}</span>
        <span className="xp-points">{xp} XP</span>
        <span className="xp-trophies">
          ★ {progress.unlocked.length}/{ACHIEVEMENTS.length}
        </span>
      </button>
      <span className="xp-bar" style={{ '--xp': into }} aria-hidden="true" />
    </>
  )
}
