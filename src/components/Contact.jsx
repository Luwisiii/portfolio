import { ACHIEVEMENTS, isComplete, openProgress, useProgress } from '../game'
import { Reveal } from './Reveal'

export function Contact() {
  const progress = useProgress()
  const complete = isComplete(progress)

  return (
    <section id="contact">
      <Reveal as="div" className="contact-block">
        <div>
          <Reveal as="p" className="eyebrow">
            Get in touch
          </Reveal>
          <h3>Have something that actually needs to work?</h3>
          <p>Open to full-stack roles, remote or on-site.</p>
          <button type="button" className={`reward-teaser mono${complete ? ' is-complete' : ''}`} onClick={openProgress}>
            <span className="reward-teaser-pips" aria-hidden="true">
              {ACHIEVEMENTS.map((a, i) => (
                <i key={a.id} className={i < progress.unlocked.length ? 'is-on' : ''} />
              ))}
            </span>
            {complete
              ? 'Legendary drop unlocked · open it'
              : `Legendary drop locked · ${progress.unlocked.length}/${ACHIEVEMENTS.length} achievements`}
          </button>
        </div>
        <div className="contact-links">
          <a href="mailto:plddumayas@gmail.com">plddumayas@gmail.com</a>
          <a href="https://github.com/Luwisiii" target="_blank" rel="noopener noreferrer">
            github.com/Luwisiii
          </a>
          <a
            href="https://linkedin.com/in/paolodumayas"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin.com/in/paolodumayas
          </a>
        </div>
      </Reveal>
    </section>
  )
}
