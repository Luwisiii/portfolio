import { featuredProjects } from '../data/projects'
import { ProjectDiagram } from './ProjectDiagram'
import { Reveal } from './Reveal'

export function FeaturedProjects() {
  return (
    <section id="featured">
      <Reveal as="p" className="eyebrow">
        Featured builds
      </Reveal>

      {featuredProjects.map((project, i) => (
        <Reveal
          as="article"
          id={project.id}
          className={`project-block${i % 2 ? ' flip' : ''}`}
          key={project.id}
        >
          <div className="project-copy">
            <span className={`status is-${project.status.kind}`}>
              <span className="status-dot"></span>
              {project.status.label}
            </span>
            <p className="project-tagline">{project.tagline}</p>
            <h3>{project.name}</h3>
            <p className="project-desc">{project.description}</p>
            <dl className="brief">
              <div className="brief-item">
                <dt>Problem</dt>
                <dd>{project.problem}</dd>
              </div>
              <div className="brief-item">
                <dt>Approach</dt>
                <dd>{project.approach}</dd>
              </div>
            </dl>
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
          <ProjectDiagram variant={project.id} />
        </Reveal>
      ))}
    </section>
  )
}
