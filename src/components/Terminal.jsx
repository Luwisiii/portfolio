import { useEffect, useRef, useState } from 'react'
import { ACHIEVEMENTS, isComplete, openReward, openTerminal, resetProgress, unlock, useProgress } from '../game'
import { featuredProjects } from '../data/projects'

const EMAIL = 'plddumayas@gmail.com'
const PROMPT = 'paolo@portfolio:~$'

function sections() {
  return [...document.querySelectorAll('main section[id]')]
}

function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return false
  el.scrollIntoView({ block: 'start' })
  return true
}

// vim-style page navigation: j/k step through sections, g/G jump to the ends
function vimMove(key) {
  const all = sections()
  const line = 120 // just under the sticky header
  let current = 0
  all.forEach((s, i) => {
    if (s.getBoundingClientRect().top <= line) current = i
  })
  if (key === 'j') all[Math.min(current + 1, all.length - 1)].scrollIntoView({ block: 'start' })
  if (key === 'k') all[Math.max(current - 1, 0)].scrollIntoView({ block: 'start' })
  if (key === 'g') window.scrollTo({ top: 0 })
  if (key === 'G') window.scrollTo({ top: document.documentElement.scrollHeight })
  unlock('vim')
}

// shown on the welcome screen, in plain English for people who've never used a terminal
const SUGGESTIONS = [
  ['whoami', 'a quick intro to me'],
  ['ls projects', 'list the projects I built'],
  ['ls louis', 'details on one project'],
  ['open contact', 'jump to any part of the page'],
  ['achievements', 'see what you have unlocked'],
  ['sudo hire-me', 'the fastest way to reach me'],
  ['reset', 'start over, like your first visit'],
]
const COMMANDS = ['help', 'ls', 'open', 'whoami', 'contact', 'theme', 'achievements', 'reward', 'reset', 'clear', 'exit', 'sudo', 'hire-me']

// every full command the Tab key can complete to
function completions() {
  const names = [...sections().map((s) => s.id), ...featuredProjects.map((p) => p.id)]
  return [
    ...COMMANDS.filter((c) => !['ls', 'open', 'theme', 'sudo'].includes(c)),
    'ls projects',
    ...featuredProjects.map((p) => `ls ${p.id}`),
    ...names.map((n) => `open ${n}`),
    'theme dark',
    'theme light',
    'sudo hire-me',
  ]
}

function editDistance(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i])
  for (let j = 1; j <= b.length; j++) d[0][j] = j
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
  return d[a.length][b.length]
}

// "Worship Studio/" -> "worship-studio", so names match section and project ids
function toId(arg) {
  return arg.toLowerCase().replace(/\/$/, '').replace(/\s+/g, '-')
}

function run(input, progress) {
  const [cmd, ...args] = input.trim().split(/\s+/)
  const arg = args.join(' ')

  switch (cmd) {
    case '':
      return []
    case 'help':
      return [
        'how it works: type a command, press Enter. Tab finishes a command for you.',
        '',
        'commands:',
        '  ls [projects]      list sections or projects',
        '  ls <project>       project summary',
        '  open <name>        jump to a section or project',
        '  whoami             who built this',
        '  contact            how to reach me',
        '  theme [dark|light] switch theme',
        '  achievements       your progress',
        '  reward             ??? (unlock every achievement)',
        '  reset              start over: clears level, XP and achievements',
        '  clear · exit',
        '',
        'keys: ` or ctrl+k terminal · j/k sections · g/G top/bottom · ? help',
      ]
    case 'ls': {
      if (!arg) return [sections().map((s) => `${s.id}/`).join('  ')]
      if (toId(arg) === 'projects') return [featuredProjects.map((p) => `${p.id}/`).join('  ')]
      const project = featuredProjects.find((p) => p.id === toId(arg))
      if (project)
        return [
          `${project.name} · ${project.tagline} · ${project.status.label}`,
          project.problem,
          `stack: ${project.tech.join(', ')}`,
          '',
          `open ${project.id} to jump there`,
        ]
      return [`ls: cannot access '${arg}': no such section or project (try: ls projects)`]
    }
    case 'cd':
    case 'open': {
      const target = toId(arg)
      if (!target) return [`usage: ${cmd} <name>   (try: ls)`]
      return scrollToId(target) ? [`→ ${target}`] : [`${cmd}: no such section or project: ${target}`]
    }
    case 'whoami':
      return [
        'Paolo Dumayas · full-stack developer',
        'Builds the whole system: mobile IDEs with Rust engines, live production',
        'consoles, internal tools. Python · React · TypeScript · Rust.',
      ]
    case 'contact':
      return [`email     ${EMAIL}`, 'github    github.com/Luwisiii', 'linkedin  linkedin.com/in/paolodumayas', '', 'or: sudo hire-me']
    case 'theme': {
      const toggle = document.querySelector('.theme-toggle')
      const isDark = toggle?.getAttribute('aria-pressed') === 'true'
      if (arg && arg !== 'dark' && arg !== 'light') return ['usage: theme [dark|light]']
      if (!arg || (arg === 'dark') !== isDark) toggle?.click()
      return [`theme set to ${arg || (isDark ? 'light' : 'dark')}`]
    }
    case 'achievements':
      return [
        ...ACHIEVEMENTS.map(
          (a) => `${progress.unlocked.includes(a.id) ? '[x]' : '[ ]'} ${a.title.padEnd(15)} ${progress.unlocked.includes(a.id) ? a.desc : '???'}`,
        ),
        '',
        `${progress.unlocked.length}/${ACHIEVEMENTS.length} unlocked`,
        isComplete(progress)
          ? 'all done. type reward to see your loot again.'
          : `unlock all ${ACHIEVEMENTS.length} for a legendary reward.`,
      ]
    case 'reward':
      if (!isComplete(progress))
        return [`reward locked: ${progress.unlocked.length}/${ACHIEVEMENTS.length} achievements. type achievements for hints.`]
      openReward()
      return ['opening your legendary drop…']
    case 'reset':
    case 'restart':
      setTimeout(resetProgress, 700)
      return ['clearing level, XP and achievements…', 'restarting from the top.']
    case 'hire-me':
      return ['hire-me: permission denied (try sudo)']
    case 'sudo':
      if (arg !== 'hire-me') return [`nice try. ${arg || 'sudo'} is not in the sudoers file.`]
      unlock('sudo')
      return [
        '[sudo] access granted. here is how to reach me:',
        '',
        `email     ${EMAIL}`,
        'github    github.com/Luwisiii',
        'linkedin  linkedin.com/in/paolodumayas',
      ]
    default: {
      const guess = COMMANDS.find((c) => editDistance(cmd.toLowerCase(), c) <= 2)
      return guess
        ? [`command not found: ${cmd}`, `did you mean ${guess}? type it and press Enter.`]
        : [`command not found: ${cmd}`, 'type help and press Enter to see everything you can do.']
    }
  }
}

// Always-visible hint pill, bottom-left, like an editor status bar
export function TerminalHint() {
  return (
    <div className="dev-hint mono">
      <button type="button" className="dev-hint-btn" onClick={() => openTerminal()}>
        <span aria-hidden="true">&gt;_</span> Terminal <kbd>`</kbd>
      </button>
      <span className="dev-hint-keys">
        <kbd>j</kbd>
        <kbd>k</kbd> sections · <kbd>?</kbd> shortcuts
      </span>
    </div>
  )
}

export function Terminal() {
  const [open, setOpen] = useState(false)
  const [lines, setLines] = useState([])
  const [value, setValue] = useState('')
  const [history, setHistory] = useState([])
  const [cursor, setCursor] = useState(-1)
  // faded completion after what's typed; Tab or → accepts it
  const ghost = value.trim() ? (completions().find((c) => c.startsWith(value) && c !== value) ?? '') : ''
  const progress = useProgress()
  const inputRef = useRef(null)
  const bodyRef = useRef(null)
  const returnFocus = useRef(null)

  function exec(input) {
    const cmd = input.trim()
    if (cmd === 'clear') return setLines([])
    if (cmd === 'exit') return setOpen(false)
    setLines((l) => [...l, { cmd: true, text: input }, ...run(input, progress).map((text) => ({ text }))])
    if (cmd) setHistory((h) => [cmd, ...h])
    inputRef.current?.focus()
  }

  // global hotkeys
  useEffect(() => {
    function onKey(e) {
      const typing = e.target.closest?.('input, textarea, [contenteditable="true"]')
      if ((e.key === 'k' && (e.ctrlKey || e.metaKey)) || (e.key === '`' && !typing)) {
        e.preventDefault()
        setOpen((o) => !o)
        return
      }
      if (typing || e.ctrlKey || e.metaKey || e.altKey) return
      if (e.key === '?') {
        setOpen(true)
        setLines((l) => [...l, { cmd: true, text: 'help' }, ...run('help').map((text) => ({ text }))])
      } else if (['j', 'k', 'g', 'G'].includes(e.key)) {
        vimMove(e.key)
      }
    }
    function onOpen(e) {
      setOpen(true)
      if (e.detail) exec(e.detail)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('terminal:open', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('terminal:open', onOpen)
    }
  })

  useEffect(() => {
    if (open) {
      returnFocus.current = document.activeElement
      inputRef.current?.focus()
      unlock('shell')
    } else {
      returnFocus.current?.focus?.()
    }
  }, [open])

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight })
  }, [lines])

  if (!open) return null

  function onInputKey(e) {
    if (e.key === 'Escape') setOpen(false)
    else if ((e.key === 'Tab' || (e.key === 'ArrowRight' && e.target.selectionStart === value.length)) && ghost) {
      e.preventDefault()
      setValue(ghost)
    } else if (e.key === 'Tab') {
      e.preventDefault()
    } else if (e.key === 'Enter') {
      exec(value)
      setValue('')
      setCursor(-1)
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(-1, Math.min(history.length - 1, cursor + (e.key === 'ArrowUp' ? 1 : -1)))
      setCursor(next)
      setValue(next === -1 ? '' : history[next])
    }
  }

  return (
    <div className="terminal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}>
      <div className="terminal" role="dialog" aria-modal="true" aria-label="Terminal">
        <div className="terminal-bar">
          <span className="terminal-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>paolo@portfolio — zsh</span>
          <button type="button" className="terminal-close" onClick={() => setOpen(false)} aria-label="Close terminal">
            esc
          </button>
        </div>
        <div className="terminal-body" ref={bodyRef} onClick={() => inputRef.current?.focus()} aria-live="polite">
          {lines.length === 0 && (
            <div className="terminal-welcome">
              <p>
                Welcome! This is a terminal: instead of clicking around, you type a short command
                and press <kbd>Enter</kbd>. It&apos;s another way to explore this portfolio.
              </p>
              <p>New to this? Click any command below to run it:</p>
              <ul className="terminal-suggestions">
                {SUGGESTIONS.map(([cmd, desc]) => (
                  <li key={cmd}>
                    <button type="button" onClick={() => exec(cmd)}>
                      {cmd}
                    </button>
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>
              <p>Type help any time to see every command.</p>
            </div>
          )}
          {lines.map((line, i) =>
            line.cmd ? (
              <p key={i}>
                <span className="terminal-prompt">{PROMPT}</span> {line.text}
              </p>
            ) : (
              <p key={i} className="terminal-out">
                {line.text || ' '}
              </p>
            ),
          )}
          <label className="terminal-input-row">
            <span className="terminal-prompt">{PROMPT}</span>
            <span className="terminal-field">
              <span className="terminal-ghost" aria-hidden="true">
                <span>{value}</span>
                {ghost.slice(value.length)}
              </span>
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onInputKey}
                placeholder={lines.length === 0 ? 'type a command, e.g. whoami' : ''}
                spellCheck="false"
                autoComplete="off"
                aria-label="Terminal command"
              />
            </span>
          </label>
        </div>
        <div className="terminal-legend">
          <span>
            <kbd>Enter</kbd> run
          </span>
          <span>
            <kbd>Tab</kbd> complete
          </span>
          <span>
            <kbd>↑</kbd> previous
          </span>
          <span>
            <kbd>Esc</kbd> close
          </span>
          <button type="button" onClick={() => exec('help')}>
            help
          </button>
        </div>
      </div>
    </div>
  )
}
