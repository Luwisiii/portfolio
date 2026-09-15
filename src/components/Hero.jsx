import { StatusPanel } from './StatusPanel'

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Portfolio · 2026</p>
          <h2>
            I design and ship <span className="accent-word">complete systems</span>, end to end.
          </h2>
          <p className="hero-sub">
            From a mobile IDE with its own Rust engine to a live production console for weekly
            worship services — I don't just write features, I architect the thing underneath
            them. At work, that means internal tools, automations, and integrations real teams
            depend on.
          </p>

          <dl className="spec-strip">
            <div className="spec-item">
              <dt>Platforms —</dt>
              <dd>Mobile · Desktop · Web</dd>
            </div>
            <div className="spec-item">
              <dt>Core stack —</dt>
              <dd>Python · React · TypeScript · Rust</dd>
            </div>
          </dl>
        </div>

        <StatusPanel />
      </div>
    </section>
  )
}
