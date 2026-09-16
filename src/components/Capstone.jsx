import { capstone } from '../data/projects'
import { Reveal } from './Reveal'
import { useSpotlight } from '../hooks/useSpotlight'

export function Capstone() {
  const spotlight = useSpotlight()

  return (
    <section id="capstone">
      <Reveal as="p" className="eyebrow">
        Where it started
      </Reveal>
      <Reveal as="div" className="support-card" style={{ maxWidth: 640 }} {...spotlight}>
        <div className="support-top">
          <h4>{capstone.name}</h4>
          <span className="tag-mini">{capstone.tag}</span>
        </div>
        <p>{capstone.description}</p>
        <div className="tech-row">
          {capstone.tech.map((t) => (
            <span className="tech-chip" key={t}>
              {t}
            </span>
          ))}
        </div>
        <a className="project-link" href={capstone.link} target="_blank" rel="noopener noreferrer">
          View on GitHub
        </a>
      </Reveal>
    </section>
  )
}
