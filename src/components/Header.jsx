import { useTheme } from '../hooks/useTheme'

export function Header() {
  const { toggle } = useTheme()

  return (
    <header>
      <div className="header-inner">
        <div className="brand">
          <span className="brand-name">Paolo Dumayas</span>
          <span className="brand-role mono">Full-Stack Web Developer</span>
        </div>
        <button
          className="theme-toggle"
          onClick={toggle}
          aria-label="Toggle color theme"
          type="button"
        >
          ◐
        </button>
      </div>
    </header>
  )
}
