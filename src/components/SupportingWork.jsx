import { supportingProjects } from '../data/projects'
import { Reveal } from './Reveal'
import { useSpotlight } from '../hooks/useSpotlight'

export function SupportingWork() {
  const spotlight = useSpotlight()

  return (
    <section id="supporting">
      <Reveal as="p" className="eyebrow">
        Supporting work
      </Reveal>
      <div className="support-grid">
        {supportingProjects.map((project, i) => (
          <Reveal
            as="div"
            className="support-card"
            key={project.name}
            delay={i * 80}
            {...spotlight}
          >
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
            {project.link && (
              <a
                className="project-link"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  )
}
