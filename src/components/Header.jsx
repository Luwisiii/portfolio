import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../hooks/useTheme'
import { Magnet } from './Magnet'
import { XpBar } from './XpBar'

const NAV_LINKS = [
  { id: 'featured', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]
const NAV_IDS = NAV_LINKS.map((l) => l.id)

function useScrollSpy(ids) {
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    function update() {
      const line = window.innerHeight * 0.25
      const atBottom =
        Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 2

      if (atBottom) {
        setActiveId(ids[ids.length - 1])
        return
      }

      let current = null
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      setActiveId(current)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [ids])

  return activeId
}

// publish the header's real height so scroll-padding-top clears it at every width
function useHeaderHeight(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el || !('ResizeObserver' in window)) return
    const observer = new ResizeObserver(() =>
      document.documentElement.style.setProperty('--header-h', `${el.offsetHeight}px`),
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])
}

// scroll to the section without writing #id into the URL
function jump(e) {
  const a = e.target.closest('a[href^="#"]')
  const el = a && document.getElementById(a.getAttribute('href').slice(1))
  if (!el) return
  e.preventDefault()
  el.scrollIntoView({ block: 'start' })
}

export function Header() {
  const { isDark, toggle } = useTheme()
  const activeId = useScrollSpy(NAV_IDS)
  const headerRef = useRef(null)
  useHeaderHeight(headerRef)

  return (
    <header ref={headerRef} onClick={jump}>
      <div className="header-inner">
        <a className="brand" href="#top">
          <span className="brand-name">Paolo Dumayas</span>
          <span className="brand-role mono">
            <span className="role-title">
              <span className="dot-live" aria-hidden="true" />
              Software Engineer
            </span>
            <span className="role-sep"> · </span>
            <span className="role-focus">Full-Stack Web</span>
          </span>
        </a>

        <nav className="site-nav" aria-label="Section navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={activeId === link.id ? 'is-active' : ''}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-tools">
        <XpBar />
        <Magnet padding={45} strength={3}>
          <button
            className="theme-toggle"
            onClick={toggle}
            aria-label="Toggle color theme"
            aria-pressed={isDark}
            type="button"
          >
            <svg className="icon-sun" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <circle cx="12" cy="12" r="4.2" fill="currentColor" />
              <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M12 2.5v2.4M12 19.1v2.4M21.5 12h-2.4M4.9 12H2.5" />
                <path d="M18.4 5.6l-1.7 1.7M7.3 16.7l-1.7 1.7M18.4 18.4l-1.7-1.7M7.3 7.3 5.6 5.6" />
              </g>
            </svg>
            <svg className="icon-moon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path
                d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </Magnet>
        </div>
      </div>
    </header>
  )
}
