import { experience } from '../data/experience'

export function Experience() {
  return (
    <section id="experience">
      <p className="eyebrow">Experience</p>
      <div className="timeline">
        {experience.map((job) => (
          <div className="timeline-item" key={job.company}>
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
          </div>
        ))}
      </div>
    </section>
  )
}
