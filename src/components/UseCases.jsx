// const UseCases = () => (
//   <section style={{ borderBottom: "1px solid #000" }}>
//     <div style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gap: "24px", padding: "48px" }}>
//       <div style={{ gridColumn: "span 8", background: "#fff", border: "1px solid #000", padding: "32px", display: "flex", flexDirection: "column", justifyContent: "center", minHeight: 300 }}>
//         <h2 style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(36px,4vw,48px)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.04em" }}>Applied Intelligence</h2>
//         <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "18px", color: "rgba(20,27,43,.6)", marginTop: "16px", maxWidth: 480, lineHeight: 1.6 }}>Deploying specialized voice agents across critical industries to optimize workflow and customer experience.</p>
//       </div>
//       {[{ n: "01", t: "Healthcare", d: "Automated appointment handling and transcription for clinics and hospitals." }, { n: "02", t: "Real Estate", d: "Lead qualification calls that filter serious buyers from cold traffic." }].map((uc) => (
//         <div key={uc.n} style={{ gridColumn: "span 4", background: "#fff", border: "1px solid #000", padding: "32px" }}>
//           <div style={{ fontFamily: "'Space Grotesk',monospace", fontSize: "12px", color: "rgba(20,27,43,.3)", marginBottom: "16px" }}>{uc.n}</div>
//           <h3 style={{ fontFamily: "'Inter',sans-serif", fontSize: "22px", fontWeight: 600, textTransform: "uppercase", marginBottom: "8px" }}>{uc.t}</h3>
//           <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "16px", color: "rgba(20,27,43,.6)", lineHeight: 1.5 }}>{uc.d}</p>
//         </div>
//       ))}
//       <div style={{ gridColumn: "span 4", background: "#fff", border: "1px solid #000", padding: "32px" }}>
//         <div style={{ fontFamily: "'Space Grotesk',monospace", fontSize: "12px", color: "rgba(20,27,43,.3)", marginBottom: "16px" }}>03</div>
//         <h3 style={{ fontFamily: "'Inter',sans-serif", fontSize: "22px", fontWeight: 600, textTransform: "uppercase", marginBottom: "8px" }}>E-commerce</h3>
//         <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "16px", color: "rgba(20,27,43,.6)", lineHeight: 1.5 }}>Order support and tracking updates handled via conversational voice agents.</p>
//       </div>
//       <div style={{ gridColumn: "span 4", background: "#000", border: "1px solid #000", padding: "32px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", minHeight: 250 }}>
//         <div style={{ position: "absolute", inset: 0, opacity: 0.1 }}>
//           <svg width="100%" height="100%"><defs><pattern id="gb" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="#80f9c8" strokeWidth=".5" /></pattern></defs><rect fill="url(#gb)" width="100%" height="100%" /></svg>
//         </div>
//         <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
//           <div style={{ width: 48, height: 48, border: "1px solid #80f9c8", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
//             <div className="animate-pulse" style={{ width: 24, height: 24, background: "#80f9c8" }} />
//           </div>
//           <div style={{ fontFamily: "'Space Grotesk',monospace", fontSize: "9px", color: "#80f9c8", textTransform: "uppercase", letterSpacing: "0.2em" }}>Core_v4_Live</div>
//         </div>
//       </div>
//       <div style={{ gridColumn: "span 8", background: "#80f9c8", border: "1px solid #000", padding: "32px" }}>
//         <h4 style={{ fontFamily: "'Inter',sans-serif", fontSize: "22px", fontWeight: 600, textTransform: "uppercase", color: "#007353", marginBottom: "8px" }}>Case Study: SaaS</h4>
//         <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "16px", color: "rgba(0,115,83,.8)", lineHeight: 1.5, maxWidth: 600 }}>90% reduction in customer onboarding friction through proactive agent-led setup calls, resulting in a 15% increase in month-one retention.</p>
//       </div>
//     </div>
//   </section>
// );

// export default UseCases;


import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=Space+Grotesk:wght@400;500&family=Material+Symbols+Outlined&display=swap');

  .uc-root {
    font-family: 'Inter', sans-serif;
    background: #f5f5f7;
    padding: 32px;
  }

  /* ── Header card ── */
  .uc-header {
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

  .uc-eyebrow {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(20,27,43,0.35);
    margin-bottom: 12px;
  }

  .uc-title {
    font-family: 'Inter', sans-serif;
    font-size: clamp(30px, 4vw, 48px);
    font-weight: 900;
    line-height: 1.06;
    letter-spacing: -0.04em;
    color: #141b2b;
    margin: 0;
  }

  .uc-subtitle {
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-weight: 400;
    color: rgba(20,27,43,0.55);
    line-height: 1.65;
    max-width: 320px;
    margin: 0;
  }

  /* ── Top row: 3 industry cards ── */
  .uc-top-row {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
    margin-bottom: 16px;
  }

  .uc-card {
    background: #fff;
    border: 1px solid rgba(20,27,43,0.08);
    border-radius: 20px;
    padding: 32px 32px 28px;
    position: relative;
    transition: box-shadow 0.2s, transform 0.2s;
    cursor: default;
  }

  .uc-card:hover {
    box-shadow: 0 8px 32px rgba(20,27,43,0.07);
    transform: translateY(-2px);
  }

  .uc-card-num {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.15em;
    color: rgba(20,27,43,0.3);
    margin-bottom: 24px;
    display: block;
    text-transform: uppercase;
  }

  .uc-card-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    font-size: 22px;
  }

  .uc-card-icon .material-symbols-outlined {
    font-size: 22px;
  }

  .uc-card-title {
    font-family: 'Inter', sans-serif;
    font-size: 17px;
    font-weight: 700;
    color: #141b2b;
    letter-spacing: -0.02em;
    margin: 0 0 8px;
  }

  .uc-card-desc {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: rgba(20,27,43,0.55);
    line-height: 1.65;
    margin: 0;
  }

  .uc-card-tag {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    margin-top: 20px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.05em;
    padding: 4px 10px;
    border-radius: 99px;
    border: 1px solid rgba(20,27,43,0.1);
    color: rgba(20,27,43,0.4);
  }

  .uc-card-tag .material-symbols-outlined {
    font-size: 13px;
  }

  /* ── Bottom row: case study + live ── */
  .uc-bottom-row {
    display: grid;
    grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
    gap: 16px;
  }

  /* Case study card */
  .uc-case-study {
    background: #0F6E56;
    border: none;
    border-radius: 20px;
    padding: 40px 44px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-height: 220px;
    position: relative;
    overflow: hidden;
    cursor: default;
    transition: box-shadow 0.2s, transform 0.2s;
  }

  .uc-case-study:hover {
    box-shadow: 0 8px 32px rgba(15,110,86,0.25);
    transform: translateY(-2px);
  }

  .uc-case-study-content {
    position: relative;
    z-index: 1;
  }

  .uc-case-study-label {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #5DCAA5;
    margin-bottom: 10px;
    display: block;
  }

  .uc-case-study-stat {
    font-family: 'Inter', sans-serif;
    font-size: clamp(28px, 3vw, 42px);
    font-weight: 900;
    letter-spacing: -0.04em;
    color: #E1F5EE;
    line-height: 1;
    margin-bottom: 10px;
  }

  .uc-case-study-body {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: #9FE1CB;
    line-height: 1.6;
    max-width: 480px;
    margin: 0;
  }

  /* Live card */
  .uc-live {
    background: #141b2b;
    border: none;
    border-radius: 20px;
    padding: 36px 36px 32px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    min-height: 200px;
    cursor: default;
    transition: box-shadow 0.2s, transform 0.2s;
  }

  .uc-live:hover {
    box-shadow: 0 8px 32px rgba(20,27,43,0.18);
    transform: translateY(-2px);
  }

  .uc-live-pulse {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .uc-pulse-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #1D9E75;
    animation: ucPulse 2s ease-in-out infinite;
  }

  @keyframes ucPulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.35; transform: scale(0.75); }
  }

  .uc-live-label {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);
  }

  .uc-live-metric {
    font-family: 'Inter', sans-serif;
    font-size: 52px;
    font-weight: 900;
    letter-spacing: -0.05em;
    color: #fff;
    line-height: 1;
  }

  .uc-live-sub {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 400;
    color: rgba(255,255,255,0.4);
    margin-top: 6px;
  }

  /* Icon bg colours */
  .icon-bg-health     { background: #EEEDFE; color: #534AB7; }
  .icon-bg-realestate { background: #FAECE7; color: #993C1D; }
  .icon-bg-ecommerce  { background: #E6F1FB; color: #185FA5; }

  @media (max-width: 900px) {
    .uc-header { flex-direction: column; align-items: flex-start; gap: 14px; padding: 32px 24px; }
    .uc-subtitle { max-width: 100%; }
    .uc-top-row { grid-template-columns: 1fr; }
    .uc-bottom-row { grid-template-columns: 1fr; }
  }
  @media (max-width: 600px) {
    .uc-root { padding: 16px; }
    .uc-card { padding: 24px 24px 20px; }
    .uc-case-study { padding: 32px 24px; }
    .uc-live { padding: 32px 24px; }
  }
`;

const CASES = [
  {
    num: "01 — Our Mission",
    iconClass: "icon-bg-health",
    icon: "target",
    title: "Intelligent conversations",
    desc: "We build AI-powered voice agents that understand and speak in Indian languages, delivering human-like conversations at scale.",
  },
  {
    num: "02 — Our Strength",
    iconClass: "icon-bg-realestate",
    icon: "verified",
    title: "Purpose-built for India",
    desc: "Our platform is designed for Indian businesses with deep understanding of local languages, cultural nuances, and market dynamics.",
  },
  {
    num: "03 — Our Impact",
    iconClass: "icon-bg-ecommerce",
    icon: "trending_up",
    title: "Business transformation",
    desc: "We help Indian companies reduce operational costs by 60%, improve customer satisfaction, and scale customer interactions effortlessly.",
  },
];

const DotPattern = () => (
  <svg
    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.08 }}
    viewBox="0 0 600 240"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <defs>
      <pattern id="uc-dots" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="1.5" cy="1.5" r="1.5" fill="#9FE1CB" />
      </pattern>
    </defs>
    <rect width="600" height="240" fill="url(#uc-dots)" />
  </svg>
);

const UseCases = () => {
  return (
    <>
      <style>{styles}</style>
      <section className="uc-root">

        {/* ── Header ── */}
        <motion.div
          className="uc-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
        >
          <div>
            <div className="uc-eyebrow">About us</div>
            <p className="uc-title">Who we are<br />& what we do</p>
          </div>
          <p className="uc-subtitle">
            Auvia provides enterprise-grade voice agents built specifically for Indian
            businesses and markets. Our AI-powered conversational agents handle customer
            interactions, support, and sales at scale.
          </p>
        </motion.div>

        {/* ── Industry cards row ── */}
        <div className="uc-top-row">
          {CASES.map((c, idx) => (
            <motion.div
              key={c.num}
              className="uc-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: idx * 0.12,
                ease: [0.25, 0.1, 0.25, 1.0]
              }}
            >
              <span className="uc-card-num">{c.num}</span>
              <div className={`uc-card-icon ${c.iconClass}`}>
                <span className="material-symbols-outlined">{c.icon}</span>
              </div>
              <h3 className="uc-card-title">{c.title}</h3>
              <p className="uc-card-desc">{c.desc}</p>
              <span className="uc-card-tag">
                <span className="material-symbols-outlined">radio_button_checked</span>
                Active deployment
              </span>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom row ── */}
        <div className="uc-bottom-row">

          {/* Case study */}
          <motion.div
            className="uc-case-study"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.7,
              delay: 0.36,
              ease: [0.25, 0.1, 0.25, 1.0]
            }}
          >
            <DotPattern />
            <div className="uc-case-study-content">
              <span className="uc-case-study-label">Case study — Indian D2C Brand</span>
              <div className="uc-case-study-stat">3x faster support</div>
              <p className="uc-case-study-body">
                Voice agents handling customer inquiries in Hindi & English reduced response time
                from 24 hours to 4 hours, increasing customer satisfaction by 40%.
              </p>
            </div>
          </motion.div>

          {/* Live */}
          <motion.div
            className="uc-live"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.7,
              delay: 0.48,
              ease: [0.25, 0.1, 0.25, 1.0]
            }}
          >
            <div className="uc-live-pulse">
              <div className="uc-pulse-dot" />
              <span className="uc-live-label">India-focused AI agents</span>
            </div>
            <div>
              <div className="uc-live-metric">2.4M</div>
              <div className="uc-live-sub">conversations this month</div>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
};

export default UseCases;