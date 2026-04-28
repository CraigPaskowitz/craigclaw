/* global React */
const { useState, useEffect, useMemo } = React;

const D = window.CC_DATA;

function StatusBar() {
  const [t, setT] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const time = t.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
  const items = [
    "Ellie Agent ingested 312 candidates · 14 promoted",
    "Fermi run · 06:14 PT · 4 sources cross-referenced",
    "Memory index · 41d 6h continuity",
    "Telegram /brief · last invoked 38m ago",
    "Mac mini host · LaunchAgent stable",
    "Verification false-positive · 4.8% w/w",
  ];
  return (
    <div className="cc-status">
      <div className="cc-page">
        <span className="live"><span className="dot" />LIVE · {time} PT</span>
        <div className="cc-ticker">
          <div className="cc-ticker-track">
            {[...items, ...items].map((x, i) => (
              <span key={i}><i>·</i>{x}</span>
            ))}
          </div>
        </div>
        <span className="cc-issue">ISSUE {D.brief.issue}</span>
        <span className="cc-runtime">RUN {D.brief.runtime}</span>
      </div>
    </div>
  );
}

function Masthead() {
  return (
    <div className="cc-mast">
      <div className="cc-page">
        <a className="brand" href="#top">
          <img src="logo.jpg" alt="CraigClaw mark" />
          <div>
            <div className="wordmark">Craig<em>Claw</em></div>
            <div className="strap">Personal Intelligence · Est. 2026</div>
          </div>
        </a>
        <div />
        <nav>
          <a href="#brief">The Brief</a>
          <a href="#crew">Crew</a>
          <a href="#architecture">Architecture</a>
          <a href="#capabilities">Capabilities</a>
          <a href="#roadmap">Roadmap</a>
          <a href="#principles">Principles</a>
        </nav>
      </div>
    </div>
  );
}

function Hero() {
  const [tab, setTab] = useState("today");
  return (
    <section className="cc-hero" id="brief">
      <div className="cc-page">
        <div>
          <span className="cc-eyebrow">A personal intelligence system, always on</span>
          <h1>
            A system that<br /><em>thinks</em> for you<br />before dawn.
          </h1>
          <p className="lede">
            CraigClaw is a personal intelligence platform — a coordinated crew of agents, a local memory layer, and selective cloud judgment
            running always-on from a dedicated Mac mini. It ingests, filters, and reasons across your inputs continuously. The morning brief,
            <em> What Actually Matters</em>, is one output among many.
          </p>
          <div className="cc-pill-row">
            {["Selectivity", "Context", "Judgment", "Signal over noise", "Controlled automation", "Local-first"].map((p) => (
              <span className="cc-pill" key={p}>{p}</span>
            ))}
          </div>
        </div>

        <aside className="cc-brief" aria-label="Today's brief preview">
          <div className="cc-brief-head">
            <span><b>WHAT ACTUALLY MATTERS</b> · {D.brief.date}</span>
            <span>{D.brief.issue}</span>
          </div>

          <div className="cc-brief-tabs" role="tablist">
            {[["today","Today's Signal"],["top","Top Signals"],["changed","What's Changed"],["watch","What to Watch"]].map(([k,l]) => (
              <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)}>{l}</button>
            ))}
          </div>

          {tab === "today" && (
            <>
              <div className="cc-brief-title">{D.brief.todaysSignal.headline}</div>
              <div className="cc-brief-body">{D.brief.todaysSignal.body}</div>
              <div className="cc-brief-meta">
                <span>{D.brief.todaysSignal.sources.join(" · ")}</span>
                <span className="delta">{D.brief.todaysSignal.delta}</span>
              </div>
            </>
          )}

          {tab === "top" && (
            <div className="cc-signals">
              {D.brief.top.map((s, i) => (
                <div className="cc-signal-row" key={i} style={{ "--accent": `oklch(0.7 0.18 ${s.hue})` }}>
                  <span className="cc-signal-tag">{s.tag}</span>
                  <span className="cc-signal-text">
                    {s.text}
                    <span className="cc-signal-source">{s.source}</span>
                  </span>
                </div>
              ))}
            </div>
          )}

          {tab === "changed" && (
            <div className="cc-signals">
              {D.brief.changed.map((s, i) => (
                <div className="cc-signal-row" key={i}>
                  <span className="cc-signal-tag">DIFF · {String(i+1).padStart(2,"0")}</span>
                  <span className="cc-signal-text">{s}</span>
                </div>
              ))}
            </div>
          )}

          {tab === "watch" && (
            <div className="cc-signals">
              {D.brief.watch.map((s, i) => (
                <div className="cc-signal-row" key={i}>
                  <span className="cc-signal-tag">WATCH</span>
                  <span className="cc-signal-text">{s}</span>
                </div>
              ))}
            </div>
          )}

          <div className="cc-system">
            {D.brief.system.map((x, i) => (
              <div className="item" key={`sys-${i}`}>
                <span className="led" />
                <span>{x.label}</span>
                <span className="v">{x.value}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

function Architecture() {
  const [active, setActive] = useState(2);
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % D.flow.length), 1800);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="cc-section" id="architecture">
      <div className="cc-page">
        <header>
          <span className="cc-eyebrow">Architecture · how the system runs</span>
          <h2>A signal moves through <em>seven steps</em> before it earns your attention.</h2>
          <p className="blurb">
            Inputs are filtered deterministically, structured by local models, judged by Fermi against context and prior patterns,
            then synthesized — into a brief, a thread, an alert, or nothing at all. Cloud reasoning is opt-in per stage.
          </p>
        </header>
        <div className="cc-flow">
          {D.flow.map((s, i) => (
            <div className={`step ${i === active ? "is-active" : ""}`} key={s.id}>
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <span className="label">{s.label}</span>
              <span className="note">{s.note}</span>
            </div>
          ))}
        </div>

        <div className="cc-stack">
          <div className="cc-stack-cell">
            <h4>Core</h4>
            <div className="cc-kv">
              <div className="row"><span className="k">Framework</span><span>OpenClaw — agent orchestration & command layer</span></div>
              <div className="row"><span className="k">Host</span><span>Dedicated Mac mini, always-on</span></div>
              <div className="row"><span className="k">Schedule</span><span>cron · LaunchAgent</span></div>
            </div>
          </div>
          <div className="cc-stack-cell">
            <h4>Reasoning</h4>
            <div className="cc-kv">
              <div className="row"><span className="k">Local</span><span>Qwen 2.5 via Ollama for extraction</span></div>
              <div className="row"><span className="k">Memory</span><span>Local embeddings for continuity</span></div>
              <div className="row"><span className="k">Cloud</span><span>GPT-5.4 via Codex OAuth — judgment only</span></div>
            </div>
          </div>
          <div className="cc-stack-cell">
            <h4>Interfaces</h4>
            <div className="cc-kv">
              <div className="row"><span className="k">Control</span><span>Telegram bot</span></div>
              <div className="row"><span className="k">Delivery</span><span>Email · scheduled flight</span></div>
              <div className="row"><span className="k">Command</span><span><code>/brief</code> for on-demand output</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Crew() {
  const [sel, setSel] = useState("fermi");
  const a = useMemo(() => D.agents.find((x) => x.id === sel), [sel]);
  return (
    <section className="cc-section" id="crew">
      <div className="cc-page">
        <header>
          <span className="cc-eyebrow">Multi-agent ecosystem · meet the crew</span>
          <h2>Six specialists. <em>One system that thinks.</em></h2>
          <p className="blurb">
            CraigClaw isn't a single assistant. It's a coordinated crew with explicit role boundaries — each agent named after someone
            whose discipline defines that role.
          </p>
        </header>

        <div className="cc-crew">
          <div className="cc-crew-list">
            {D.agents.map((ag) => (
              <button
                key={ag.id}
                className={sel === ag.id ? "is-on" : ""}
                style={{ "--h": ag.hue }}
                onClick={() => setSel(ag.id)}
              >
                <span className="swatch" />
                <span>
                  <span className="name">{ag.name}</span>
                  <span className="role">{ag.role}</span>
                </span>
                <span className={`stat ${ag.status === "ACTIVE" ? "is-active" : ""}`}>{ag.status}</span>
              </button>
            ))}
          </div>

          <div className="cc-crew-detail" style={{ "--h": a.hue }}>
            <div className="top">
              <h3>{a.name}</h3>
              <span className="role-tag">{a.role} · {a.status}</span>
            </div>
            <p className="tagline">"{a.tagline}"</p>
            <ul className="duties">
              {a.duties.map((d, i) => (
                <li key={i}><span className="n">{String(i+1).padStart(2,"0")}</span><span>{d}</span></li>
              ))}
            </ul>
            <div className="named">
              <span className="k">Named after</span>
              <span className="v">{a.namedAfter}</span>
              <span className="note">{a.namedNote}</span>
            </div>
          </div>
        </div>

        <div className="cc-fold">
          <img src="CraigClawCrew_4.26.26.png" alt="CraigClaw crew roster" />
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
          <span className="cc-eyebrow">Current capabilities · in production</span>
          <h2>What it does today.</h2>
          <p className="blurb">A short, honest ledger. Nothing on this list is roadmap.</p>
        </header>
        <div className="cc-ledger">
          {D.capabilities.map((c, i) => (
            <div className="row" key={i}>
              <span className="kind">{c.kind}</span>
              <span className="text">{c.text}</span>
              <span className="check">✓ LIVE</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Roadmap() {
  return (
    <section className="cc-section" id="roadmap">
      <div className="cc-page">
        <header>
          <span className="cc-eyebrow">Roadmap · phases 5 through 8</span>
          <h2>Built in stages. <em>Validated at each.</em></h2>
        </header>
        <div className="cc-road">
          {D.roadmap.map((p) => (
            <div className={`col ${p.status === "CURRENT" ? "is-current" : ""}`} key={p.phase}>
              <div className="phase-label"><span>{p.phase}</span><span className="stat">{p.status}</span></div>
              <h4 className="title">{p.title}</h4>
              <ul>
                {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Principles() {
  return (
    <section className="cc-section" id="principles">
      <div className="cc-page">
        <header>
          <span className="cc-eyebrow">Operating principles · governance</span>
          <h2>Six rules the system <em>refuses to break</em>.</h2>
        </header>
        <div className="cc-principles">
          {D.principles.map((p) => (
            <div className="cc-principle" key={p.k}>
              <span className="num">{p.k}</span>
              <h4>{p.t}</h4>
              <p>{p.d}</p>
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
      <p className="colophon">Less. <b>But better.</b> Every morning, before coffee.</p>
      <div className="meta">
        <div><b>CraigClaw</b>Personal Intelligence Platform — built on OpenClaw.</div>
        <div><b>Operations</b>Mac mini · LaunchAgent · cron · Telegram · Email</div>
        <div><b>Issue {D.brief.issue}</b>Last run {D.brief.runtime} · © 2026 CraigClaw</div>
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
      <StatusBar />
      <Masthead />
      <Hero />
      <Crew />
      <Architecture />
      <Capabilities />
      <Roadmap />
      <Principles />
      <Footer />
      {window.CCTweaks && <window.CCTweaks tweaks={tw} setTweaks={setTw} />}
    </>
  );
}

window.CCApp = App;
