import { useEffect, useRef, useState } from 'react';

const timelineSteps = [
  {
    num: "01", label: "UNDERSTANDS", title: "Real-time Audio Processing",
    desc: "Captures the nuances of human speech and emotional intent with sub-100ms processing cycles, preserving every intonation shift across the entire call stream.",
    icon: "settings_voice",
    stat: { val: "<87ms", label: "Capture Latency" },
    tags: ["VAD", "Speaker ID", "Noise Cancellation"],
    accent: "#1a1a1a",
    accentLight: "#f0fdf8",
    accentMid: "#10b981",
  },
  {
    num: "02", label: "PROCESSES", title: "Proprietary LLM Analysis",
    desc: "Multi-layer analysis modules determine context, intent, and the optimal response strategy in parallel — adapting to conversation drift in real time.",
    icon: "neurology",
    stat: { val: "4-Layer", label: "Analysis Pipeline" },
    tags: ["Intent", "Sentiment", "Context"],
    accent: "#1a1a1a",
    accentLight: "#eff6ff",
    accentMid: "#3b82f6",
  },
  {
    num: "03", label: "EXECUTES", title: "Instant Response Action",
    desc: "Perform complex operations — booking, routing, or transcribing — within the live call stream seamlessly, with no perceptible delay to the caller.",
    icon: "bolt",
    stat: { val: "<200ms", label: "End-to-End" },
    tags: ["Booking", "Routing", "Transcription"],
    accent: "#1a1a1a",
    accentLight: "#fffbeb",
    accentMid: "#f59e0b",
  },
  {
    num: "04", label: "INTEGRATES", title: "Deep System Sync",
    desc: "Direct synchronisation with CRMs, databases, and enterprise toolchains via high-security bidirectional API endpoints. Zero manual export. Always live.",
    icon: "api",
    stat: { val: "50+", label: "Native Integrations" },
    tags: ["Salesforce", "HubSpot", "Webhooks"],
    accent: "#1a1a1a",
    accentLight: "#fdf4ff",
    accentMid: "#a855f7",
  },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=Space+Grotesk:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .lf-root {
    background: #ffffff;
    color: #111;
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
  }

  /* ── HEADER ── */
  .lf-header {
    width: 100%;
    max-width: 680px;
    text-align: center;
    padding: 96px 24px 72px;
    margin-bottom: 75px;
  }

  .lf-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #999;
    font-weight: 500;
    margin-bottom: 24px;
  }

  .lf-eyebrow-line {
    width: 24px;
    height: 1px;
    background: #ccc;
  }

  .lf-title {
    font-family: 'Inter', sans-serif;
    font-size: clamp(40px, 6vw, 68px);
    font-weight: 700;
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: #0a0a0a;
    margin-bottom: 20px;
  }

  .lf-title em {
    font-style: normal;
    color: #555;
  }

  .lf-subtitle {
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    line-height: 1.75;
    color: #888;
    font-weight: 400;
    max-width: 420px;
    margin: 0 auto;
  }

  /* ── SCENE ── */
  .lf-scene {
    width: 100%;
    max-width: 780px;
    margin: 0 auto;
    padding: 0 24px 100px;
    display: flex;
    align-items: flex-start;
    gap: 40px;
    position: relative;
  }

  /* Left dot nav */
  .lf-sidenav {
    position: sticky;
    top: 50vh;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    padding-top: 0;
    flex-shrink: 0;
  }

  .lf-sidenav-track {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
  }

  .lf-sidenav-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    border: 1.5px solid #ccc;
    background: #fff;
    cursor: pointer;
    transition: all 0.35s ease;
    position: relative;
    z-index: 1;
  }

  .lf-sidenav-dot.active {
    border-color: #111;
    background: #111;
    transform: scale(1.25);
  }

  .lf-sidenav-line {
    width: 1px;
    height: 28px;
    background: #e5e5e5;
    margin: 4px 0;
  }

  /* ── CARDS COLUMN ── */
  .lf-cards {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0;
    perspective: 1000px;
    perspective-origin: 50% 40%;
  }

  /* Each card wrapper — scroll observation target */
  .lf-card-wrap {
    padding: 24px 0;
    will-change: transform, opacity;
    transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.7s ease;
  }

  /* Card states */
  .lf-card-wrap.state-before {
    transform: translateY(32px) translateZ(-60px) rotateX(6deg) scale(0.96);
    opacity: 0.15;
  }

  .lf-card-wrap.state-active {
    transform: translateY(0) translateZ(0) rotateX(0deg) scale(1);
    opacity: 1;
  }

  .lf-card-wrap.state-after {
    transform: translateY(-24px) translateZ(-80px) rotateX(-5deg) scale(0.95);
    opacity: 0.12;
  }

  .lf-card {
    background: #ffffff;
    border: 1px solid #e8e8e8;
    border-radius: 20px;
    padding: 40px 44px 36px;
    position: relative;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 4px 24px rgba(0,0,0,0.04);
    transition: box-shadow 0.4s ease, border-color 0.4s ease;
  }

  .lf-card-wrap.state-active .lf-card {
    border-color: #d4d4d4;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06), 0 16px 48px rgba(0,0,0,0.07);
  }

  /* Step label row */
  .lf-step-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 28px;
  }

  .lf-step-label {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .lf-step-num {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 11px;
    letter-spacing: 0.15em;
    color: #bbb;
    font-weight: 500;
  }

  .lf-step-slash {
    width: 1px;
    height: 14px;
    background: #e0e0e0;
    transform: rotate(20deg);
  }

  .lf-step-name {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #aaa;
    font-weight: 500;
  }

  .lf-icon-wrap {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Card title */
  .lf-card-title {
    font-family: 'Inter', sans-serif;
    font-size: clamp(22px, 2.8vw, 30px);
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -0.02em;
    color: #0a0a0a;
    margin-bottom: 14px;
  }

  .lf-card-desc {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    line-height: 1.8;
    color: #888;
    font-weight: 400;
    margin-bottom: 28px;
  }

  /* Divider */
  .lf-card-divider {
    width: 100%;
    height: 1px;
    background: #f0f0f0;
    margin-bottom: 24px;
  }

  /* Stat + tags row */
  .lf-card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .lf-stat {
    display: flex;
    align-items: baseline;
    gap: 8px;
  }

  .lf-stat-val {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 22px;
    font-weight: 500;
    color: #111;
    letter-spacing: -0.03em;
  }

  .lf-stat-label {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #bbb;
    font-weight: 500;
  }

  .lf-tags {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .lf-tag {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #aaa;
    background: #f7f7f7;
    border-radius: 2px;
    padding: 3px 9px;
    font-weight: 500;
  }

  /* ── FOOTER ── */
  .lf-footer {
    width: 100%;
    max-width: 780px;
    border-top: 1px solid #f0f0f0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin: 0 auto 0;
    padding: 0 24px;
  }

  .lf-footer-cell {
    padding: 36px 16px;
    text-align: center;
  }

  .lf-footer-val {
    font-family: 'Inter', sans-serif;
    font-size: clamp(24px, 3vw, 36px);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: #111;
    line-height: 1;
    margin-bottom: 8px;
  }

  .lf-footer-label {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #bbb;
    font-weight: 500;
  }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .lf-footer { grid-template-columns: 1fr 1fr; }
    .lf-footer-cell:nth-child(2) { border-right: none !important; }
  }
  @media (max-width: 600px) {
    .lf-header { padding: 48px 16px 32px; margin-bottom: 32px; }
    .lf-scene { padding: 0 16px 48px; gap: 16px; flex-direction: column; }
    .lf-sidenav { display: none; }
    .lf-card { padding: 24px; }
    .lf-card-wrap { padding: 12px 0; }
    .lf-card-wrap.state-before, .lf-card-wrap.state-after { transform: translateY(0) translateZ(0) rotateX(0) scale(1); opacity: 0.5; }
    .lf-footer { grid-template-columns: 1fr; padding: 0 16px; }
    .lf-footer-cell { border-right: none !important; border-bottom: 1px solid #f0f0f0; padding: 24px 16px; }
    .lf-footer-cell:last-child { border-bottom: none; }
    .lf-card-footer { flex-direction: column; align-items: flex-start; }
    .lf-tags { justify-content: flex-start; }
  }
`;

export const LogicFlow = () => {
  const [active, setActive] = useState(0);
  const cardRefs = useRef([]);
  const observerRef = useRef(null);

  // IntersectionObserver: mark which card is in center of viewport
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-35% 0px -35% 0px',
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = Number(entry.target.dataset.index);
          setActive(idx);
        }
      });
    }, options);

    cardRefs.current.forEach((el) => {
      if (el) observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const getState = (i) => {
    if (i < active) return 'state-after';
    if (i === active) return 'state-active';
    return 'state-before';
  };

  const scrollToCard = (i) => {
    cardRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <>
      <style>{styles}</style>
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0"
        rel="stylesheet"
      />

      <section className="lf-root">

        {/* Header */}
        <header className="lf-header">
          <div className="lf-eyebrow">
            <span className="lf-eyebrow-line" />
            Architecture
            <span className="lf-eyebrow-line" />
          </div>
          <h2 className="lf-title">The <em>Logic</em> Flow</h2>
          <p className="lf-subtitle">
            Four precision-engineered stages that transform raw voice into autonomous enterprise action.
          </p>
        </header>

        {/* Scene */}
        <div className="lf-scene">

          {/* Side dot navigation */}
          <div className="lf-sidenav">
            <div className="lf-sidenav-track">
              {timelineSteps.map((_, i) => (
                <div key={i}>
                  <div
                    className={`lf-sidenav-dot${i === active ? ' active' : ''}`}
                    onClick={() => scrollToCard(i)}
                    title={timelineSteps[i].title}
                  />
                  {i < timelineSteps.length - 1 && (
                    <div className="lf-sidenav-line" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div className="lf-cards">
            {timelineSteps.map((step, i) => (
              <div
                key={step.num}
                ref={(el) => (cardRefs.current[i] = el)}
                data-index={i}
                className={`lf-card-wrap ${getState(i)}`}
              >
                <div className="lf-card">
                  {/* Top row */}
                  <div className="lf-step-row">
                    <div className="lf-step-label">
                      <span className="lf-step-num">{step.num}</span>
                      <span className="lf-step-slash" />
                      <span className="lf-step-name">{step.label}</span>
                    </div>
                    <div
                      className="lf-icon-wrap"
                      style={{ background: step.accentLight }}
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{
                          fontSize: 18,
                          color: step.accentMid,
                          fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24",
                        }}
                      >
                        {step.icon}
                      </span>
                    </div>
                  </div>

                  <h4 className="lf-card-title">{step.title}</h4>
                  <p className="lf-card-desc">{step.desc}</p>

                  <div className="lf-card-divider" />

                  <div className="lf-card-footer">
                    <div className="lf-stat">
                      <span className="lf-stat-val" style={{ color: step.accentMid }}>
                        {step.stat.val}
                      </span>
                      <span className="lf-stat-label">{step.stat.label}</span>
                    </div>
                    <div className="lf-tags">
                      {step.tags.map((tag) => (
                        <span key={tag} className="lf-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer stats */}
        <div className="lf-footer">
          {[
            { val: "<87ms", label: "Audio Capture" },
            { val: "4-Layer", label: "LLM Pipeline" },
            { val: "<200ms", label: "End-to-End" },
            { val: "14 PoPs", label: "Global Regions" },
          ].map((s, i) => (
            <div
              key={s.label}
              className="lf-footer-cell"
              style={{ borderRight: i < 3 ? '1px solid #f0f0f0' : 'none' }}
            >
              <div className="lf-footer-val">{s.val}</div>
              <div className="lf-footer-label">{s.label}</div>
            </div>
          ))}
        </div>

      </section>
    </>
  );
};

export default LogicFlow;