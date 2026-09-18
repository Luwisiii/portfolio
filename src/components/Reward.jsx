import { useEffect, useRef, useState } from 'react'
import { ACHIEVEMENTS, isComplete, onUnlock, progressSnapshot } from '../game'

const EMAIL = 'plddumayas@gmail.com'
const SUBJECT = encodeURIComponent('I 100%-ed your portfolio. Reward claimed.')
// mailto alone needs a desktop mail app (Windows just shows an app picker without one),
// so claiming copies the address and offers webmail compose links too
const COMPOSE = [
  ['Gmail', `https://mail.google.com/mail/?view=cm&to=${EMAIL}&su=${SUBJECT}`],
  ['Outlook', `https://outlook.live.com/mail/0/deeplink/compose?to=${EMAIL}&subject=${SUBJECT}`],
  ['Mail app', `mailto:${EMAIL}?subject=${SUBJECT}`],
]
const CONFETTI = 28

// The loot drop for unlocking every achievement. Opens on its own after the
// last toast lands, or any time later via the terminal's `reward` command.
export function Reward() {
  const [open, setOpen] = useState(false)
  const [claimed, setClaimed] = useState(null) // null | 'copied' | 'shown'
  const closeRef = useRef(null)

  useEffect(() => {
    const offUnlock = onUnlock(() => {
      if (isComplete(progressSnapshot())) setTimeout(() => setOpen(true), 1400)
    })
    const onOpen = () => setOpen(true)
    window.addEventListener('reward:open', onOpen)
    return () => {
      offUnlock()
      window.removeEventListener('reward:open', onOpen)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      previous?.focus?.()
    }
  }, [open])

  if (!open) return null

  async function claim() {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setClaimed('copied')
    } catch {
      setClaimed('shown') // clipboard blocked: the address is still shown to copy by hand
    }
  }

  return (
    <div className="reward-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}>
      <div className="confetti" aria-hidden="true">
        {Array.from({ length: CONFETTI }, (_, i) => (
          <i key={i} style={{ '--i': i, '--x': `${((i * 37) % 100) - 50}vw`, '--r': `${(i * 83) % 360}deg` }} />
        ))}
      </div>

      <div className="reward" role="dialog" aria-modal="true" aria-labelledby="reward-title">
        <button ref={closeRef} type="button" className="reward-close" onClick={() => setOpen(false)} aria-label="Close">
          ×
        </button>
        <p className="reward-eyebrow mono">★ 100% complete · {ACHIEVEMENTS.length}/{ACHIEVEMENTS.length} achievements</p>
        <p className="reward-drop mono">Legendary drop</p>

        <div className="reward-item">
          <div className="reward-icon" aria-hidden="true">
            &gt;_
          </div>
          <div>
            <h2 id="reward-title">Hire Paolo</h2>
            <p className="reward-rarity mono">Legendary · Full-stack · Qty 1</p>
          </div>
        </div>

        <ul className="reward-stats mono">
          <li>
            <span>+100</span> ships the whole system, not just the feature
          </li>
          <li>
            <span>+100</span> stays up on a Sunday morning
          </li>
          <li>
            <span>+100</span> Python · React · TypeScript · Rust
          </li>
          <li>
            <span>passive</span> open to new roles, remote or on-site
          </li>
        </ul>

        <p className="reward-flavor">
          You explored every corner of this portfolio. That&apos;s exactly the kind of thoroughness
          I bring to a team. Let&apos;s talk.
        </p>

        {claimed ? (
          <div className="reward-claimed" role="status">
            <p className="reward-claimed-title">✓ Reward claimed</p>
            <p>
              {claimed === 'copied' ? 'My email is copied to your clipboard:' : 'Here is my email:'}{' '}
              <strong className="mono">{EMAIL}</strong>
            </p>
            <div className="reward-actions">
              {COMPOSE.map(([label, href]) => (
                <a key={label} href={href} target={label === 'Mail app' ? undefined : '_blank'} rel="noopener noreferrer">
                  Write in {label}
                </a>
              ))}
            </div>
          </div>
        ) : (
          <div className="reward-actions">
            <button type="button" className="reward-claim" onClick={claim}>
              Claim reward
            </button>
            <a href="https://linkedin.com/in/paolodumayas" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://github.com/Luwisiii" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
