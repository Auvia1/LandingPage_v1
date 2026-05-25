// import { useState } from "react";

// const comparisonRows = [
//   { feature: "Response Latency", legacy: ">2,000ms", nexov: "<200ms", detail: "10× faster end-to-end", icon: "speed" },
//   { feature: "Reasoning Model", legacy: "Static decision tree", nexov: "Real-time LLM", detail: "Adapts to any conversation", icon: "neurology" },
//   { feature: "Interface", legacy: "Text & chat only", nexov: "Voice-first + omnichannel", detail: "Phone, web, API, SMS", icon: "settings_voice" },
//   { feature: "CRM Integration", legacy: "Manual export / CSV", nexov: "Live bidirectional sync", detail: "Salesforce, HubSpot & more", icon: "sync_alt" },
//   { feature: "Personality", legacy: "Fixed, scripted tone", nexov: "Modular AI personas", detail: "Tune per brand & use-case", icon: "face" },
//   { feature: "Scale", legacy: "Limited concurrency", nexov: "10,000+ simultaneous calls", detail: "Auto-scales with demand", icon: "lan" },
// ];

// const ComparisonRow = ({ row, index }) => {
//   const [hovered, setHovered] = useState(false);
//   return (
//     <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
//       style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: "1px solid #000", background: hovered ? "#000" : index % 2 === 0 ? "#fff" : "#fafafa", transition: "background 0.2s", cursor: "default" }}>
//       <div style={{ padding: "28px 32px", borderRight: "1px solid #000", display: "flex", alignItems: "center", gap: "14px" }}>
//         <div style={{ width: 36, height: 36, background: hovered ? "rgba(128,249,200,0.12)" : "#f1f3ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.2s" }}>
//           <span className="material-symbols-outlined" style={{ fontFamily: "Material Symbols Outlined", fontSize: 18, color: hovered ? "#80f9c8" : "#141b2b", transition: "color 0.2s" }}>{row.icon}</span>
//         </div>
//         <div>
//           <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "13px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: hovered ? "#fff" : "#141b2b", transition: "color 0.2s" }}>{row.feature}</div>
//           <div style={{ fontFamily: "'Space Grotesk',monospace", fontSize: "10px", color: hovered ? "rgba(128,249,200,0.7)" : "rgba(20,27,43,0.4)", marginTop: "2px", transition: "color 0.2s" }}>{row.detail}</div>
//         </div>
//       </div>
//       <div style={{ padding: "28px 32px", borderRight: "1px solid " + (hovered ? "rgba(255,255,255,0.1)" : "#000"), display: "flex", alignItems: "center", gap: "12px", transition: "border-color 0.2s" }}>
//         <div style={{ width: 22, height: 22, border: "1.5px solid rgba(20,27,43,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//           <span className="material-symbols-outlined" style={{ fontFamily: "Material Symbols Outlined", fontSize: 14, color: "rgba(20,27,43,0.3)" }}>close</span>
//         </div>
//         <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "14px", color: hovered ? "rgba(255,255,255,0.3)" : "rgba(20,27,43,0.4)", textDecoration: "line-through", textDecorationColor: hovered ? "rgba(255,255,255,0.15)" : "rgba(20,27,43,0.2)", transition: "color 0.2s" }}>{row.legacy}</span>
//       </div>
//       <div style={{ padding: "28px 32px", display: "flex", alignItems: "center", gap: "12px" }}>
//         <div style={{ width: 22, height: 22, background: hovered ? "#80f9c8" : "#141b2b", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.2s" }}>
//           <span className="material-symbols-outlined" style={{ fontFamily: "Material Symbols Outlined", fontSize: 14, color: hovered ? "#000" : "#80f9c8", transition: "color 0.2s" }}>check</span>
//         </div>
//         <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "14px", fontWeight: 600, color: hovered ? "#80f9c8" : "#141b2b", transition: "color 0.2s" }}>{row.nexov}</span>
//       </div>
//     </div>
//   );
// };

// export const WhyDifferent = () => (
//   <section style={{ border: "1px solid #000", borderTop: "none", background: "#fff", overflow: "hidden" }}>
//     <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid #000" }}>
//       <div style={{ padding: "64px 48px", borderRight: "1px solid #000" }}>
//         <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(20,27,43,0.4)", marginBottom: "20px" }}>Competitive Analysis</div>
//         <h2 style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(52px,6vw,96px)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.04em", lineHeight: 0.92, marginBottom: "28px" }}>Why Our<br />Agents Are<br />Different</h2>
//         <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "16px", lineHeight: 1.7, color: "rgba(20,27,43,0.55)", maxWidth: "380px" }}>Legacy chatbots were built for text. Nexov was built for the full complexity of live human voice — a fundamentally harder problem, solved.</p>
//       </div>
//       <div style={{ background: "#000", padding: "64px 48px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
//         <div style={{ position: "absolute", inset: 0, opacity: 0.06 }}>
//           <svg width="100%" height="100%"><defs><pattern id="wd-grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M 32 0 L 0 0 0 32" fill="none" stroke="#80f9c8" strokeWidth="0.8" /></pattern></defs><rect fill="url(#wd-grid)" width="100%" height="100%" /></svg>
//         </div>
//         <div style={{ position: "relative", zIndex: 1 }}>
//           <div style={{ fontFamily: "'Space Grotesk',monospace", fontSize: "10px", color: "rgba(128,249,200,0.6)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "16px" }}>Performance delta</div>
//           <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(72px,9vw,120px)", fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1, color: "#80f9c8" }}>10×</div>
//           <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "18px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "-0.01em", color: "#fff", marginTop: "8px" }}>Faster than legacy</div>
//           <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.4)", marginTop: "8px" }}>Sub-200ms vs. industry avg. 2,000ms+</div>
//         </div>
//         <div style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "32px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0" }}>
//           {[{ v: "99.9%", l: "Uptime SLA" }, { v: "SOC2", l: "Compliant" }, { v: "<48h", l: "Deployment" }].map((s, i) => (
//             <div key={s.l} style={{ borderRight: i < 2 ? "1px solid rgba(255,255,255,0.1)" : "none", paddingRight: i < 2 ? "16px" : 0, paddingLeft: i > 0 ? "16px" : 0 }}>
//               <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(18px,2vw,24px)", fontWeight: 900, letterSpacing: "-0.03em", color: "#fff" }}>{s.v}</div>
//               <div style={{ fontFamily: "'Space Grotesk',monospace", fontSize: "9px", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "4px" }}>{s.l}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//     <div style={{ display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid #000", padding: "64px 48px", background: "#fff" }}>
//       <div style={{ textAlign: "center", maxWidth: 800 }}>
//         <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(20,27,43,.5)", marginBottom: "16px" }}>Feature Matrix</div>
//         <h3 style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(32px,4vw,48px)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.1, letterSpacing: "-0.04em" }}>Head-to-Head Comparison</h3>
//       </div>
//     </div>
//     <div>
//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: "1px solid #000", borderTop: "1px solid #000", background: "#f9f9ff" }}>
//         <div style={{ padding: "16px 32px", borderRight: "1px solid #000", fontFamily: "'Space Grotesk',monospace", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(20,27,43,0.35)" }}>Capability</div>
//         <div style={{ padding: "16px 32px", borderRight: "1px solid #000", display: "flex", alignItems: "center", gap: "8px", fontFamily: "'Space Grotesk',monospace", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(20,27,43,0.35)" }}>
//           <span className="material-symbols-outlined" style={{ fontFamily: "Material Symbols Outlined", fontSize: 13 }}>history</span>Legacy Chatbots
//         </div>
//         <div style={{ padding: "16px 32px", display: "flex", alignItems: "center", gap: "8px", fontFamily: "'Space Grotesk',monospace", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#006c4e", fontWeight: 700 }}>
//           <span className="material-symbols-outlined" style={{ fontFamily: "Material Symbols Outlined", fontSize: 13, color: "#006c4e" }}>bolt</span>Nexov Voice Agents
//         </div>
//       </div>
//       {comparisonRows.map((row, i) => <ComparisonRow key={row.feature} row={row} index={i} />)}
//       <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 32px", background: "#141b2b", fontFamily: "'Space Grotesk',monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(255,255,255,0.3)" }}>
//         {["Architecture: Neural-Flash", "//", "Security: SOC2 Type II", "//", "Regions: 14 Global PoPs", "//", "Latency: <200ms p99"].map((t, i) => (
//           <span key={i} style={{ color: t === "//" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.3)" }}>{t}</span>
//         ))}
//       </div>
//     </div>
//   </section>
// );


import { useState } from "react";
import { motion } from "framer-motion";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=Space+Grotesk:wght@400;500;700&display=swap');

  .wd-root {
    font-family: 'Inter', sans-serif;
    background: transparent;
    padding: 32px;
    box-sizing: border-box;
  }

  /* ── Header card ── */
  .wd-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px;
    background: #fff;
    border: 1px solid rgba(20,27,43,0.08);
    border-radius: 20px;
    padding: 40px 44px;
    margin-bottom: 16px;
  }

  .wd-eyebrow {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(20,27,43,0.35);
    margin-bottom: 12px;
  }

  .wd-title {
    font-family: 'Inter', sans-serif;
    font-size: clamp(30px, 4vw, 48px);
    font-weight: 900;
    line-height: 1.06;
    letter-spacing: -0.04em;
    color: #141b2b;
    margin: 0;
  }

  .wd-subtitle {
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-weight: 400;
    color: rgba(20,27,43,0.55);
    line-height: 1.65;
    max-width: 320px;
    margin: 0;
  }

  /* ── Stats dark card ── */
  .wd-stats-dark {
    background: #141b2b;
    border-radius: 20px;
    padding: 40px 44px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 32px;
    position: relative;
    overflow: hidden;
  }

  .wd-dot-pattern {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0.08;
  }

  .wd-delta {
    position: relative;
    z-index: 1;
  }

  .wd-delta-label {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(128,249,200,0.6);
    margin-bottom: 8px;
  }

  .wd-delta-num {
    font-family: 'Inter', sans-serif;
    font-size: clamp(56px, 8vw, 80px);
    font-weight: 900;
    letter-spacing: -0.05em;
    line-height: 1;
    color: #80f9c8;
  }

  .wd-delta-sub {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    margin-top: 6px;
    text-transform: uppercase;
    letter-spacing: -0.01em;
  }

  .wd-delta-detail {
    font-size: 13px;
    color: rgba(255,255,255,0.4);
    margin-top: 4px;
  }

  .wd-sla-grid {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-left: 1px solid rgba(255,255,255,0.1);
    padding-left: 32px;
  }

  .wd-sla-item {
    padding: 0 24px;
    border-right: 1px solid rgba(255,255,255,0.08);
  }
  .wd-sla-item:last-child { border-right: none; }

  .wd-sla-val {
    font-family: 'Inter', sans-serif;
    font-size: clamp(18px, 2.5vw, 26px);
    font-weight: 900;
    color: #fff;
    letter-spacing: -0.03em;
  }

  .wd-sla-lbl {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 10px;
    color: rgba(255,255,255,0.35);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-top: 4px;
  }

  /* ── Table section ── */
  .wd-table-header-card {
    background: #fff;
    border: 1px solid rgba(20,27,43,0.08);
    border-radius: 20px 20px 0 0;
    padding: 28px 32px 20px;
    text-align: center;
  }

  .wd-table-eyebrow {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(20,27,43,0.4);
    margin-bottom: 8px;
  }

  .wd-table-heading {
    font-family: 'Inter', sans-serif;
    font-size: clamp(22px, 3vw, 32px);
    font-weight: 900;
    letter-spacing: -0.04em;
    color: #141b2b;
    margin: 0;
  }

  .wd-table-wrap {
    background: #fff;
    border: 1px solid rgba(20,27,43,0.08);
    border-top: none;
    border-radius: 0 0 20px 20px;
    overflow: hidden;
    margin-bottom: 16px;
  }

  .wd-col-header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    background: #fafaf9;
    border-bottom: 1px solid rgba(20,27,43,0.06);
    border-top: 1px solid rgba(20,27,43,0.06);
  }

  .wd-col-lbl {
    padding: 12px 24px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(20,27,43,0.35);
    display: flex;
    align-items: center;
    gap: 7px;
    border-right: 1px solid rgba(20,27,43,0.06);
  }
  .wd-col-lbl:last-child { border-right: none; }
  .wd-col-lbl.nexov { color: #0F6E56; font-weight: 700; }

  /* ── Comparison rows ── */
  .wd-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border-bottom: 1px solid rgba(20,27,43,0.05);
    transition: background 0.2s;
    cursor: default;
  }
  .wd-row:last-child { border-bottom: none; }
  .wd-row:hover { background: #141b2b; }

  .wd-cell {
    padding: 22px 24px;
    display: flex;
    align-items: center;
    gap: 12px;
    border-right: 1px solid rgba(20,27,43,0.05);
    transition: border-color 0.2s;
  }
  .wd-cell:last-child { border-right: none; }
  .wd-row:hover .wd-cell { border-color: rgba(255,255,255,0.04); }

  .wd-icon-box {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: #f1f3ff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background 0.2s;
  }
  .wd-row:hover .wd-icon-box { background: rgba(128,249,200,0.1); }

  .wd-feature-name {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #141b2b;
    transition: color 0.2s;
  }
  .wd-row:hover .wd-feature-name { color: #fff; }

  .wd-feature-detail {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 10px;
    color: rgba(20,27,43,0.4);
    margin-top: 2px;
    transition: color 0.2s;
  }
  .wd-row:hover .wd-feature-detail { color: rgba(128,249,200,0.6); }

  .wd-x-box {
    width: 20px;
    height: 20px;
    border-radius: 6px;
    border: 1px solid rgba(20,27,43,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .wd-legacy-val {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    color: rgba(20,27,43,0.35);
    text-decoration: line-through;
    text-decoration-color: rgba(20,27,43,0.2);
    transition: color 0.2s, text-decoration-color 0.2s;
  }
  .wd-row:hover .wd-legacy-val {
    color: rgba(255,255,255,0.25);
    text-decoration-color: rgba(255,255,255,0.1);
  }

  .wd-check-box {
    width: 20px;
    height: 20px;
    border-radius: 6px;
    background: #141b2b;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background 0.2s;
  }
  .wd-row:hover .wd-check-box { background: #80f9c8; }

  .wd-check-icon {
    font-family: 'Material Symbols Outlined';
    font-size: 13px;
    color: #80f9c8;
    transition: color 0.2s;
  }
  .wd-row:hover .wd-check-icon { color: #000; }

  .wd-x-icon {
    font-family: 'Material Symbols Outlined';
    font-size: 13px;
    color: rgba(20,27,43,0.25);
  }

  .wd-nexov-val {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: #141b2b;
    transition: color 0.2s;
  }
  .wd-row:hover .wd-nexov-val { color: #80f9c8; }

  /* ── Footer bar ── */
  .wd-footer-bar {
    background: #141b2b;
    border-radius: 0 0 20px 20px;
    padding: 14px 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
  }

  .wd-footer-tag {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: rgba(255,255,255,0.3);
  }

  .wd-footer-sep { color: rgba(255,255,255,0.1); }

  /* ── Material Symbols ── */
  .material-symbols-outlined {
    font-family: 'Material Symbols Outlined';
    font-weight: normal;
    font-style: normal;
    font-size: inherit;
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
  }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .wd-header { flex-direction: column; align-items: flex-start; }
    .wd-subtitle { max-width: 100%; margin-top: 16px; }
    .wd-stats-dark { flex-direction: column; align-items: flex-start; }
    .wd-sla-grid { grid-template-columns: 1fr 1fr; gap: 16px; border-left: none; padding-left: 0; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1); width: 100%; }
    .wd-sla-item { padding: 0; border-right: none; }
  }
  @media (max-width: 600px) {
    .wd-root { padding: 16px; }
    .wd-header { padding: 24px; }
    .wd-stats-dark { padding: 24px; }
    .wd-table-header-card { padding: 20px; }
    .wd-footer-bar { flex-direction: column; align-items: flex-start; padding: 20px; }
    .wd-delta-num { font-size: 48px; }
    
    /* Enable horizontal scrolling for the table */
    .wd-table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
    .wd-col-header, .wd-row { min-width: 600px; }
  }
`;

const comparisonRows = [
  {
    feature: "Response Latency",
    legacy: ">2,000ms",
    nexov: "<200ms",
    detail: "10× faster end-to-end",
    icon: "speed",
  },
  {
    feature: "Reasoning Model",
    legacy: "Static decision tree",
    nexov: "Real-time LLM",
    detail: "Adapts to any conversation",
    icon: "neurology",
  },
  {
    feature: "Interface",
    legacy: "Text & chat only",
    nexov: "Voice-first + omnichannel",
    detail: "Phone, web, API, SMS",
    icon: "settings_voice",
  },
  {
    feature: "CRM Integration",
    legacy: "Manual export / CSV",
    nexov: "Live bidirectional sync",
    detail: "Salesforce, HubSpot & more",
    icon: "sync_alt",
  },
  {
    feature: "Personality",
    legacy: "Fixed, scripted tone",
    nexov: "Modular AI personas",
    detail: "Tune per brand & use-case",
    icon: "face",
  },
  {
    feature: "Scale",
    legacy: "Limited concurrency",
    nexov: "10,000+ simultaneous calls",
    detail: "Auto-scales with demand",
    icon: "lan",
  },
];

const DotPattern = () => (
  <svg
    className="wd-dot-pattern"
    viewBox="0 0 800 260"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <defs>
      <pattern id="wd-dots" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="1.5" cy="1.5" r="1.5" fill="#9FE1CB" />
      </pattern>
    </defs>
    <rect width="800" height="260" fill="url(#wd-dots)" />
  </svg>
);

const ComparisonRow = ({ row }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="wd-row"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Feature cell */}
      <div className="wd-cell">
        <div className="wd-icon-box">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 17, color: hovered ? "#80f9c8" : "#141b2b", transition: "color 0.2s" }}
          >
            {row.icon}
          </span>
        </div>
        <div>
          <div className="wd-feature-name">{row.feature}</div>
          <div className="wd-feature-detail">{row.detail}</div>
        </div>
      </div>

      {/* Legacy cell */}
      <div className="wd-cell">
        <div className="wd-x-box">
          <span className="wd-x-icon">close</span>
        </div>
        <span className="wd-legacy-val">{row.legacy}</span>
      </div>

      {/* Nexov cell */}
      <div className="wd-cell">
        <div className="wd-check-box">
          <span className="wd-check-icon">check</span>
        </div>
        <span className="wd-nexov-val">{row.nexov}</span>
      </div>
    </div>
  );
};

export const WhyDifferent = () => (
  <>
    <style>{styles}</style>
    <link
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
      rel="stylesheet"
    />

    <section className="wd-root">

      {/* ── Header ── */}
      <motion.div
        className="wd-header"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
      >
        <div>
          <div className="wd-eyebrow">Competitive analysis</div>
          <p className="wd-title">
            Why our<br />
            agents are<br />
            different
          </p>
        </div>
        <p className="wd-subtitle">
          Legacy chatbots were built for text. NexovAI was built for the full
          complexity of live human voice — a fundamentally harder problem, solved.
        </p>
      </motion.div>

      {/* ── Dark stats card ── */}
      <motion.div
        className="wd-stats-dark"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          duration: 0.7,
          delay: 0.12,
          ease: [0.25, 0.1, 0.25, 1.0]
        }}
      >
        <DotPattern />
        <div className="wd-delta">
          <div className="wd-delta-label">Performance delta</div>
          <div className="wd-delta-num">10×</div>
          <div className="wd-delta-sub">Faster than legacy</div>
          <div className="wd-delta-detail">Sub-200ms vs. industry avg. 2,000ms+</div>
        </div>
        <div className="wd-sla-grid">
          {[
            { v: "99.9%", l: "Uptime SLA" },
            { v: "SOC2", l: "Compliant" },
            { v: "<48h", l: "Deployment" },
          ].map((s) => (
            <div key={s.l} className="wd-sla-item">
              <div className="wd-sla-val">{s.v}</div>
              <div className="wd-sla-lbl">{s.l}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Comparison table ── */}
      <motion.div
        className="wd-table-header-card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          duration: 0.7,
          delay: 0.24,
          ease: [0.25, 0.1, 0.25, 1.0]
        }}
      >
        <div className="wd-table-eyebrow">Feature matrix</div>
        <h3 className="wd-table-heading">Head-to-head comparison</h3>
      </motion.div>

      <motion.div
        className="wd-table-wrap"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          duration: 0.7,
          delay: 0.36,
          ease: [0.25, 0.1, 0.25, 1.0]
        }}
      >
        {/* Column headers */}
        <div className="wd-col-header">
          <div className="wd-col-lbl">Capability</div>
          <div className="wd-col-lbl">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 13 }}
            >
              history
            </span>
            Legacy chatbots
          </div>
          <div className="wd-col-lbl nexov">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 13 }}
            >
              bolt
            </span>
            NexovAI voice agents
          </div>
        </div>

        {/* Rows */}
        {comparisonRows.map((row, idx) => (
          <motion.div
            key={row.feature}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.5,
              delay: 0.36 + idx * 0.08,
              ease: [0.25, 0.1, 0.25, 1.0]
            }}
          >
            <ComparisonRow row={row} />
          </motion.div>
        ))}

        {/* Footer bar */}
        <div className="wd-footer-bar">
          {[
            "Architecture: Neural-Flash",
            "//",
            "Security: SOC2 Type II",
            "//",
            "Regions: 14 Global PoPs",
            "//",
            "Latency: <200ms p99",
          ].map((t, i) => (
            <span
              key={i}
              className={t === "//" ? "wd-footer-sep" : "wd-footer-tag"}
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>

    </section>
  </>
);

export default WhyDifferent;