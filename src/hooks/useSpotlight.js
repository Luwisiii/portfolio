const MAX_TILT = 7

export function useSpotlight() {
  function onMouseMove(e) {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    el.style.setProperty('--mx', `${x}px`)
    el.style.setProperty('--my', `${y}px`)
    el.style.setProperty('--ry', `${(x / rect.width - 0.5) * 2 * MAX_TILT}deg`)
    el.style.setProperty('--rx', `${(0.5 - y / rect.height) * 2 * MAX_TILT}deg`)
  }

  function onMouseLeave(e) {
    const el = e.currentTarget
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return { onMouseMove, onMouseLeave }
}
