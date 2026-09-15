import { supportingProjects } from '../data/projects'

export function SupportingWork() {
  return (
    <section id="supporting">
      <p className="eyebrow">Supporting work</p>
      <div className="support-grid">
        {supportingProjects.map((project) => (
          <div className="support-card" key={project.name}>
            <div className="support-top">
              <h4>{project.name}</h4>
              <span className="tag-mini">{project.tag}</span>
            </div>
            <p>{project.description}</p>
            <div className="tech-row">
              {project.tech.map((t) => (
                <span className="tech-chip" key={t}>
                  {t}
                </span>
              ))}
            </div>
            {project.link ? (
              <a
                className="project-link"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            ) : (
              <span className="project-link is-unlinked">Source available on request</span>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
