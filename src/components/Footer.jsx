// import { CONTACT_ITEMS, SOCIAL_LINKS } from "./CTA";

// const Footer = () => (
//   <footer style={{ background: "#fff", borderTop: "1px solid #000" }}>
//     <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr 1fr", gap: "32px", padding: "64px 48px", maxWidth: 1440, margin: "0 auto", alignItems: "flex-start" }}>
//       <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
//         <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "20px", fontWeight: 900, textTransform: "uppercase" }}>NexovAI</div>
//         <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(0,0,0,.4)" }}>© 2026 NEXOVAI — SECURE, SCALABLE, REAL-TIME VOICE AI AGENTS</div>
//       </div>
//       <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
//         <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.16em", color: "#000" }}>Contact information</div>
//         <div style={{ display: "grid", gap: "10px" }}>
//           {CONTACT_ITEMS.map((item) => (
//             <div key={item.label} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
//               <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#000", opacity: 0.65 }}>{item.icon}</span>
//               <div>
//                 <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.16em", color: "rgba(0,0,0,.35)", marginBottom: "3px" }}>{item.label}</div>
//                 <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "13px", fontWeight: 600, color: "#000" }}>{item.val}</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
//         <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.16em", color: "#000" }}>Follow us</div>
//         <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
//           {SOCIAL_LINKS.map((social) => (
//             <a key={social.label} href={social.link} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 14px", border: "1px solid rgba(0,0,0,.12)", borderRadius: "999px", fontFamily: "'Inter',sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.16em", color: "rgba(0,0,0,.65)", textDecoration: "none" }}>
//               <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{social.icon}</span>
//               {social.label}
//             </a>
//           ))}
//         </div>
//         <div style={{ display: "flex", gap: "28px", flexWrap: "wrap", paddingTop: "14px" }}>
//           {["Documentation", "Privacy Policy", "System Status", "Twitter/X"].map((link) => (
//             <a key={link} href="#" style={{ fontFamily: "'Inter',sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(0,0,0,.4)", textDecoration: "none" }}>{link}</a>
//           ))}
//         </div>
//       </div>
//     </div>
//   </footer>
// );

// export default Footer;



import { CONTACT_ITEMS, SOCIAL_LINKS } from "./CTA";

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const PRODUCTS = [
  { label: "Appointment Booking Agent" },
  { label: "Call Handling Agent" },
  
  { label: "Customer Support Agent" },
  { label: "Lead Qualification Agent" },
  { label: "Doctor Transcription Tool" },
];

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');

/* ── Root ── */
.ft-root {
  background: #ffffff;
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow: hidden;
}

/* ── Top accent bar ── */
.ft-accent-bar {
  height: 3px;
  background: linear-gradient(90deg, #0F6E56 0%, #5DCAA5 50%, #0F6E56 100%);
  background-size: 200% 100%;
  animation: ftShimmer 4s linear infinite;
}

@keyframes ftShimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* ── Background decoration ── */
.ft-bg-glow {
  position: absolute;
  bottom: -120px;
  left: -120px;
  width: 480px;
  height: 480px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(15,110,86,0.06) 0%, transparent 68%);
  pointer-events: none;
}

.ft-bg-dots {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(93,202,165,0.08) 1.5px, transparent 1.5px);
  background-size: 28px 28px;
  pointer-events: none;
}

/* ── Inner ── */
.ft-inner {
  position: relative;
  z-index: 1;
  max-width: 1440px;
  margin: 0 auto;
  padding: 64px 52px 0;
}

/* ── Top grid ── */
.ft-top-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;
  gap: 48px;
  padding-bottom: 52px;
  border-bottom: 1px solid rgba(20,27,43,0.08);
}

/* ── Brand column ── */
.ft-brand {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.ft-logo {
  font-family: 'Inter', sans-serif;
  font-size: 22px;
  font-weight: 900;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  color: #141b2b;
  display: flex;
  align-items: center;
  gap: 10px;
}

.ft-logo-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #0F6E56;
  animation: ftPulse 2.4s ease-in-out infinite;
}

@keyframes ftPulse {
  0%,100% { opacity:1; transform:scale(1); }
  50%      { opacity:0.4; transform:scale(0.7); }
}

.ft-tagline {
  font-size: 13px;
  line-height: 1.75;
  color: rgba(20,27,43,0.55);
  max-width: 240px;
}

.ft-live-chip {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: rgba(15,110,86,0.08);
  border: 1px solid rgba(15,110,86,0.14);
  border-radius: 99px;
  padding: 7px 14px;
  width: fit-content;
}

.ft-live-pulse {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #0F6E56;
  animation: ftPulse 2s ease-in-out infinite;
  flex-shrink: 0;
}

.ft-live-text {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #0F6E56;
}

/* ── Section columns ── */
.ft-col {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.ft-col-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(20,27,43,0.45);
  padding-bottom: 4px;
  position: relative;
}

.ft-col-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 20px;
  height: 1.5px;
  background: #0F6E56;
  border-radius: 2px;
}

/* ── Contact items ── */
.ft-contact-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.ft-contact-item {
  display: flex;
  align-items: flex-start;
  gap: 11px;
}

.ft-contact-icon {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: rgba(15,110,86,0.08);
  border: 1px solid rgba(15,110,86,0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.ft-contact-icon .material-symbols-outlined {
  font-size: 14px !important;
  color: #0F6E56;
}

.ft-contact-label {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(20,27,43,0.38);
  margin-bottom: 2px;
}

.ft-contact-val {
  font-size: 12px;
  font-weight: 500;
  color: #141b2b;
  line-height: 1.4;
  word-break: break-all;
}

/* ── Social links ── */
.ft-social-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ft-social-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 13px;
  background: rgba(15,110,86,0.04);
  border: 1px solid rgba(15,110,86,0.12);
  border-radius: 11px;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.18s, border-color 0.18s, transform 0.18s;
}

.ft-social-link:hover {
  background: rgba(15,110,86,0.1);
  border-color: rgba(15,110,86,0.2);
  transform: translateX(4px);
}

.ft-social-link .material-symbols-outlined {
  font-size: 15px !important;
  color: #0F6E56;
}

.ft-social-label {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.07em;
  color: rgba(20,27,43,0.65);
  transition: color 0.18s;
}

.ft-social-link:hover .ft-social-label { color: #0F6E56; }

.ft-social-arrow {
  margin-left: auto;
  font-size: 13px !important;
  color: rgba(20,27,43,0.2);
  transition: color 0.18s, transform 0.18s;
}

.ft-social-link:hover .ft-social-arrow {
  color: #0F6E56;
  transform: translateX(2px);
}

/* ── Nav links column ── */
.ft-nav-list {
  display: flex;
  flex-direction: column;
  gap: 11px;
}

.ft-nav-link {
  font-size: 12px;
  font-weight: 500;
  color: rgba(20,27,43,0.55);
  text-decoration: none;
  transition: color 0.18s, padding-left 0.18s;
  display: flex;
  align-items: center;
  gap: 7px;
}

.ft-nav-link::before {
  content: '';
  display: inline-block;
  width: 0;
  height: 1px;
  background: #0F6E56;
  border-radius: 2px;
  transition: width 0.2s ease;
  flex-shrink: 0;
}

.ft-nav-link:hover {
  color: #0F6E56;
}

.ft-nav-link:hover::before { width: 12px; }

/* ── Bottom bar ── */
.ft-bottom-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 22px 0 28px;
  flex-wrap: wrap;
}

.ft-copyright {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(20,27,43,0.35);
}

.ft-badges {
  display: flex;
  align-items: center;
  gap: 8px;
}

.ft-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 11px;
  border-radius: 99px;
  border: 1px solid rgba(20,27,43,0.1);
  font-family: 'Space Grotesk', sans-serif;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(20,27,43,0.45);
}

.ft-badge .material-symbols-outlined { font-size: 11px !important; }

/* ── Responsive ── */
@media (max-width: 1024px) {
  .ft-top-grid { grid-template-columns: 1fr 1fr; gap: 36px; }
}

@media (max-width: 640px) {
  .ft-inner { padding: 48px 24px 0; }
  .ft-top-grid { grid-template-columns: 1fr; gap: 32px; }
  .ft-bottom-bar { flex-direction: column; align-items: flex-start; gap: 14px; }
}
`;

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const Footer = () => (
  <>
    <style>{CSS}</style>
    <footer className="ft-root">
      <div className="ft-accent-bar" />
      <div className="ft-bg-dots" />
      <div className="ft-bg-glow" />

      <div className="ft-inner">
        <div className="ft-top-grid">

          {/* ── Brand ── */}
          <div className="ft-brand">
            <div className="ft-logo">
              <div className="ft-logo-dot" />
              NexovAI
            </div>
            <p className="ft-tagline">
              Secure, scalable, real-time voice AI agents built for businesses that never sleep.
            </p>
            <div className="ft-live-chip">
              <div className="ft-live-pulse" />
              <span className="ft-live-text">All systems operational</span>
            </div>
          </div>

          {/* ── Contact ── */}
          <div className="ft-col">
            <div className="ft-col-title">Contact</div>
            <div className="ft-contact-list">
              {CONTACT_ITEMS.map((item) => (
                <div key={item.label} className="ft-contact-item">
                  <div className="ft-contact-icon">
                    <span className="material-symbols-outlined">{item.icon}</span>
                  </div>
                  <div>
                    <div className="ft-contact-label">{item.label}</div>
                    <div className="ft-contact-val">{item.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Social ── */}
          <div className="ft-col">
            <div className="ft-col-title">Follow us</div>
            <div className="ft-social-list">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  className="ft-social-link"
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="material-symbols-outlined">{s.icon}</span>
                  <span className="ft-social-label">{s.label}</span>
                  <span className="material-symbols-outlined ft-social-arrow">arrow_forward</span>
                </a>
              ))}
            </div>
          </div>

          {/* ── Links ── */}
          <div className="ft-col">
            <div className="ft-col-title">Products</div>
            <nav className="ft-nav-list">
              {PRODUCTS.map((p) => {
                if (p.label === "Appointment Booking Agent") {
                  return (
                    <a key={p.label} href="/auvia" className="ft-nav-link" style={{ textDecoration: "none" }}>
                      {p.label}
                    </a>
                  );
                }
                return (
                  <div key={p.label} className="ft-nav-link">
                    {p.label}
                  </div>
                );
              })}
            </nav>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="ft-bottom-bar">
          <div className="ft-copyright">
            © 2026 NexovAI — All rights reserved
          </div>
        </div>
      </div>
    </footer>
  </>
);

export default Footer;