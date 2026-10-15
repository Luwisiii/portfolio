import { useEffect, useRef } from 'react'
import { ACHIEVEMENTS, XP_PER_LEVEL, isComplete, openProgress, unlock, useProgress, visitSection, xpOf } from '../game'

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

// pop the chip on each new unlock so the eye goes from the toast to the counter
function useBumpOnUnlock(ref, count) {
  const seen = useRef(count)
  useEffect(() => {
    if (count === seen.current) return
    seen.current = count
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ring = getComputedStyle(el).getPropertyValue('--accent').trim()
    el.animate(
      [
        { transform: 'scale(1)', boxShadow: `0 0 0 0 ${ring}` },
        { transform: 'scale(1.12)', offset: 0.3 },
        { transform: 'scale(1)', boxShadow: '0 0 0 10px transparent' },
      ],
      { duration: 700, easing: 'cubic-bezier(0.34, 1.4, 0.64, 1)' },
    )
  }, [ref, count])
}

export function XpBar() {
  const progress = useProgress()
  const chipRef = useRef(null)
  useSectionVisits()
  useBumpOnUnlock(chipRef, progress.unlocked.length)

  const xp = xpOf(progress)
  const level = Math.floor(xp / XP_PER_LEVEL) + 1
  const complete = isComplete(progress)
  // every achievement done: nothing left to level toward, so the bar maxes out
  const into = complete ? 1 : (xp % XP_PER_LEVEL) / XP_PER_LEVEL

  useEffect(() => {
    document.documentElement.toggleAttribute('data-complete', complete)
    const icon = document.querySelector('link[rel="icon"]')
    if (icon) icon.href = complete ? '/favicon-gold.svg' : '/favicon.svg'
  }, [complete])

  return (
    <>
      <button
        ref={chipRef}
        className={`xp-chip mono${complete ? ' is-complete' : ''}`}
        type="button"
        onClick={openProgress}
        aria-label={`Level ${level}, ${xp} XP, ${progress.unlocked.length} of ${ACHIEVEMENTS.length} achievements. Open achievements.`}
      >
        <span className="xp-level">LVL {level}</span>
        <span className="xp-points">{xp} XP</span>
        {complete ? (
          <span className="xp-trophies">
            ★ {ACHIEVEMENTS.length}/{ACHIEVEMENTS.length}
          </span>
        ) : (
          <span className="xp-trophies">
            <svg viewBox="0 0 16 16" width="11" height="11" aria-hidden="true">
              <path
                d="M2 6h12v3H2zM3 9h10v5H3zM8 6v8M8 6C6 2 3.5 3 4.5 5 5 6 8 6 8 6zm0 0c2-4 4.5-3 3.5-1C11 6 8 6 8 6z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
            {ACHIEVEMENTS.length - progress.unlocked.length} left
          </span>
        )}
      </button>
      <span className="xp-bar" style={{ '--xp': into }} aria-hidden="true" />
    </>
  )
}
