import { StatusPanel } from './StatusPanel'

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Portfolio · 2026</p>
          <h2>
            I build <span className="accent-word">the whole system</span>, not just the
            feature on top.<span className="caret" aria-hidden="true"></span>
          </h2>
          <p className="hero-sub">
            I've built a mobile IDE with its own Rust engine, and a live production console
            for weekly worship services that has to not fail on a Sunday morning. At my day
            job, the same instinct goes into internal tools, automations, and integrations
            that recruiters and admins actually rely on.
          </p>

          <dl className="spec-strip">
            <div className="spec-item">
              <dt>Platforms:</dt>
              <dd>Mobile · Desktop · Web</dd>
            </div>
            <div className="spec-item">
              <dt>Core stack:</dt>
              <dd>Python · React · TypeScript · Rust</dd>
            </div>
          </dl>
        </div>

        <StatusPanel />
      </div>
    </section>
  )
}
