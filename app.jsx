/* global React */
const { useState, useEffect } = React;

const D = window.CC_DATA;

function Masthead() {
  return (
    <div className="cc-mast">
      <div className="cc-page">
        <a className="brand" href="#top">
          <img src="logo.jpg" alt="CraigClaw mark" />
          <div>
            <div className="wordmark">Craig<em>Claw</em></div>
            <div className="strap">Personal Intelligence Platform</div>
          </div>
        </a>
        <div />
        <nav>
          <a href="#what">What It Is</a>
          <a href="#why">Why It Exists</a>
          <a href="#how">How It Works</a>
          <a href="#capabilities">Capabilities</a>
          <a href="#modules">Modules</a>
          <a href="#crew">Crew</a>
          <a href="#direction">Direction</a>
        </nav>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="cc-hero" id="what">
      <div className="cc-page">
        <div>
          <span className="cc-eyebrow">What CraigClaw is</span>
          <h1>{D.positioning.title}</h1>
          <p className="lede">{D.positioning.body}</p>
          <div className="cc-pill-row">
            {D.principles.map((p) => (
              <span className="cc-pill" key={p}>{p}</span>
            ))}
          </div>
        </div>

        <aside className="cc-brief" aria-label="Representative outputs">
          <div className="cc-brief-head">
            <span><b>REPRESENTATIVE OUTPUTS</b></span>
            <span>Illustrative</span>
          </div>
          <div className="cc-signals">
            {D.representativeOutputs.map((item, i) => (
              <div className="cc-signal-row" key={i}>
                <span className="cc-signal-tag">{item.label}</span>
                <span className="cc-signal-text">{item.text}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section className="cc-section" id="why">
      <div className="cc-page">
        <header>
          <span className="cc-eyebrow">Why it exists</span>
          <h2>Built for continuity when inputs are fragmented.</h2>
          <p className="blurb">{D.why.intro}</p>
        </header>
        <div className="cc-ledger">
          {D.why.points.map((p, i) => (
            <div className="row" key={i}>
              <span className="kind">QUESTION</span>
              <span className="text">{p}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="cc-section" id="how">
      <div className="cc-page">
        <header>
          <span className="cc-eyebrow">How it works</span>
          <h2>Inputs → intelligence workflows → judgment → memory → action.</h2>
          <p className="blurb">{D.howItWorks.blurb}</p>
        </header>
        <div className="cc-flow">
          {D.howItWorks.flow.map((s, i) => (
            <div className="step" key={i}>
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <span className="label">{s.label}</span>
              <span className="note">{s.note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section className="cc-section" id="capabilities">
      <div className="cc-page">
        <header>
          <span className="cc-eyebrow">Core capabilities</span>
          <h2>What the platform is designed to support.</h2>
        </header>
        <div className="cc-ledger">
          {D.capabilities.map((c, i) => (
            <div className="row" key={i}>
              <span className="kind">{c.kind}</span>
              <span className="text">{c.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Modules() {
  return (
    <section className="cc-section" id="modules">
      <div className="cc-page">
        <header>
          <span className="cc-eyebrow">Agent / module ecosystem</span>
          <h2>Named modules, role-first architecture.</h2>
        </header>
        <div className="cc-ledger">
          {D.modules.map((m, i) => (
            <div className="row" key={i}>
              <span className="kind">{m.name}</span>
              <span className="text"><b>{m.role}</b> — {m.description}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function Crew() {
  return (
    <section className="cc-section" id="crew">
      <div className="cc-page">
        <header>
          <span className="cc-eyebrow">Crew snapshot</span>
          <h2>{D.crew.title}</h2>
          <p className="blurb">{D.crew.blurb}</p>
        </header>
        <figure className="cc-fold">
          <img src={D.crew.image.src} alt={D.crew.image.alt} />
          <figcaption>{D.crew.image.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}

function Direction() {
  return (
    <section className="cc-section" id="direction">
      <div className="cc-page">
        <header>
          <span className="cc-eyebrow">Direction of travel</span>
          <h2>Capability development over time.</h2>
        </header>
        <div className="cc-road">
          {D.direction.map((bucket) => (
            <div className="col" key={bucket.horizon}>
              <div className="phase-label"><span>{bucket.horizon}</span></div>
              <ul>
                {bucket.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="cc-page cc-footer">
      <p className="colophon">{D.closing}</p>
      <div className="meta">
        <div><b>CraigClaw</b>Personal intelligence platform and operating layer.</div>
        <div><b>Surfaces</b>Web · Chat · Telegram · Email · Future mobile/voice</div>
        <div><b>Architecture</b>Local-first with selective cloud reasoning · © 2026 CraigClaw</div>
      </div>
    </footer>
  );
}

function App() {
  const defaults = window.__TWEAKS_DEFAULTS__ || { theme: "ops", density: "standard" };
  const [tw, setTw] = useState(defaults);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", tw.theme === "paper" ? "paper" : "ops");
    root.setAttribute("data-density", tw.density);
  }, [tw]);

  return (
    <>
      <Masthead />
      <Hero />
      <Why />
      <HowItWorks />
      <Capabilities />
      <Modules />
      <Crew />
      <Direction />
      <Footer />
      {window.CCTweaks && <window.CCTweaks tweaks={tw} setTweaks={setTw} />}
    </>
  );
}

window.CCApp = App;
