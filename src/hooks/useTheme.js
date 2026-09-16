import { useEffect, useState } from 'react'

function resolveIsDark(theme) {
  return (
    theme === 'dark' ||
    (theme !== 'light' && !window.matchMedia('(prefers-color-scheme: light)').matches)
  )
}

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme')
    } catch {
      return null
    }
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light' || theme === 'dark') {
      root.setAttribute('data-theme', theme)
    } else {
      root.removeAttribute('data-theme')
    }
  }, [theme])

  function toggle() {
    const next = resolveIsDark(theme) ? 'light' : 'dark'
    setTheme(next)
    try {
      localStorage.setItem('theme', next)
    } catch {
      // ignore storage errors (private browsing, etc.)
    }
  }

  return { theme, isDark: resolveIsDark(theme), toggle }
}
