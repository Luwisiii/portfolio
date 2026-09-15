import { capstone } from '../data/projects'

export function Capstone() {
  return (
    <section id="capstone">
      <p className="eyebrow">Where it started</p>
      <div className="support-card" style={{ maxWidth: 640 }}>
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
      </div>
    </section>
  )
}
