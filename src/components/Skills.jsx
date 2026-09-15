import { skillGroups } from '../data/skills'

export function Skills() {
  return (
    <section id="skills">
      <p className="eyebrow">Toolbox</p>
      <div className="skills-grid">
        {skillGroups.map((group) => (
          <div className="skill-group" key={group.name}>
            <h5>{group.name}</h5>
            <div className="tech-row">
              {group.items.map((item) => (
                <span className="tech-chip" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
