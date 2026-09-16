import { skillGroups } from '../data/skills'
import { Reveal } from './Reveal'

export function Skills() {
  return (
    <section id="skills">
      <Reveal as="p" className="eyebrow">
        Toolbox
      </Reveal>
      <div className="skills-grid">
        {skillGroups.map((group, i) => (
          <Reveal as="div" className="skill-group" key={group.name} delay={(i % 2) * 80}>
            <h5>{group.name}</h5>
            <div className="tech-row">
              {group.items.map((item) => (
                <span className="tech-chip" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
