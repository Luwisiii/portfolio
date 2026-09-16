import { experience } from '../data/experience'
import { Reveal } from './Reveal'

export function Experience() {
  return (
    <section id="experience">
      <Reveal as="p" className="eyebrow">
        Experience
      </Reveal>
      <Reveal as="div" className="timeline">
        {experience.map((job, i) => (
          <Reveal as="div" className="timeline-item" key={job.company} delay={i * 100}>
            <span className="timeline-dot"></span>
            <div className="timeline-head">
              <h4>{job.role}</h4>
              <span className="timeline-date mono">{job.dates}</span>
            </div>
            <p className="timeline-company">{job.company}</p>
            <ul className="timeline-list">
              {job.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </Reveal>
    </section>
  )
}
