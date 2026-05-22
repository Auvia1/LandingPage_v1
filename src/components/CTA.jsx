// const CTA = () => (
//   <section style={{ borderBottom: "1px solid #000", background: "#6EE7B7" }}>
//     <div style={{ padding: "96px 48px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
//       <h2 style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(40px,7vw,80px)", fontWeight: 900, textTransform: "uppercase", lineHeight: 0.9, letterSpacing: "-0.04em", marginBottom: "48px", maxWidth: "900px" }}>Start Automating Conversations Today</h2>
//       <div style={{ display: "flex", border: "2px solid #000", boxShadow: "8px 8px 0 rgba(0,0,0,0.15)", borderRadius: "8px", overflow: "hidden" }}>
//         <button style={{ background: "#000", color: "#fff", padding: "20px 40px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", borderRight: "1px solid #000", cursor: "pointer", transition: "all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)", transform: "none" }} onMouseEnter={(e) => { e.target.style.background = "rgba(0,0,0,0.85)"; e.target.style.transform = "translateY(-2px)"; }} onMouseLeave={(e) => { e.target.style.background = "#000"; e.target.style.transform = "translateY(0)"; }}>Deploy Now</button>
//         <button style={{ background: "transparent", color: "#000", padding: "20px 40px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: "pointer", transition: "all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)" }} onMouseEnter={(e) => { e.target.style.background = "rgba(0,0,0,0.1)"; }} onMouseLeave={(e) => { e.target.style.background = "transparent"; }}>Talk to an Engineer</button>
//       </div>
//     </div>
//   </section>
// );

// export default CTA;


import { useState } from "react";
import { motion } from "framer-motion";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=Space+Grotesk:wght@400;500&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');

  .ct-root {
    font-family: 'Inter', sans-serif;
    background: #f5f5f7;
    padding: 32px;
  }

  /* ── Top heading card ── */
  .ct-heading-card {
    background: #0F6E56;
    border-radius: 20px;
    padding: 56px 52px;
    margin-bottom: 16px;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 32px;
    min-height: 220px;
  }

  .ct-heading-bg {
    position: absolute;
    inset: 0;
    opacity: 0.06;
    pointer-events: none;
  }

  .ct-eyebrow {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #5DCAA5;
    margin-bottom: 16px;
    position: relative;
    z-index: 1;
  }

  .ct-main-title {
    font-family: 'Inter', sans-serif;
    font-size: clamp(36px, 5vw, 64px);
    font-weight: 900;
    letter-spacing: -0.04em;
    line-height: 0.95;
    color: #E1F5EE;
    text-transform: uppercase;
    margin: 0;
    position: relative;
    z-index: 1;
  }

  .ct-heading-right {
    position: relative;
    z-index: 1;
    flex-shrink: 0;
    max-width: 300px;
  }

  .ct-heading-body {
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-weight: 400;
    line-height: 1.7;
    color: rgba(225,245,238,0.6);
    margin: 0 0 28px;
  }

  .ct-response-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 99px;
    padding: 7px 14px;
  }

  .ct-pulse-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #80f9c8;
    animation: ctPulse 2s ease-in-out infinite;
  }

  @keyframes ctPulse {
    0%,100% { opacity:1; transform:scale(1); }
    50%      { opacity:0.35; transform:scale(0.75); }
  }

  .ct-badge-text {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
  }

  /* ── Two-column main row ── */
  .ct-main-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;
  }

  /* ── Form card ── */
  .ct-form-card {
    background: #fff;
    border: 1px solid rgba(20,27,43,0.08);
    border-radius: 20px;
    padding: 40px 40px 36px;
  }

  .ct-form-title {
    font-family: 'Inter', sans-serif;
    font-size: 18px;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: #141b2b;
    margin: 0 0 28px;
  }

  .ct-field {
    margin-bottom: 16px;
  }

  .ct-label {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(20,27,43,0.4);
    display: block;
    margin-bottom: 7px;
  }

  .ct-input {
    width: 100%;
    box-sizing: border-box;
    border: 1.5px solid rgba(20,27,43,0.1);
    border-radius: 12px;
    padding: 13px 16px;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: #141b2b;
    background: #fafafa;
    outline: none;
    transition: border-color 0.18s, background 0.18s;
    resize: none;
  }

  .ct-input::placeholder {
    color: rgba(20,27,43,0.25);
  }

  .ct-input:focus {
    border-color: #0F6E56;
    background: #fff;
  }

  .ct-select-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .ct-submit-btn {
    width: 100%;
    margin-top: 8px;
    background: #141b2b;
    color: #fff;
    border: none;
    border-radius: 12px;
    padding: 16px 24px;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background 0.18s, transform 0.18s;
  }

  .ct-submit-btn:hover {
    background: #0F6E56;
    transform: translateY(-1px);
  }

  .ct-submit-btn .material-symbols-outlined {
    font-size: 18px;
  }

  /* ── Info card ── */
  .ct-info-card {
    background: #141b2b;
    border-radius: 20px;
    padding: 40px 40px 36px;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .ct-info-title {
    font-family: 'Inter', sans-serif;
    font-size: 18px;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: #fff;
    margin: 0 0 28px;
  }

  .ct-info-items {
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
  }

  .ct-info-item {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 16px 18px;
    border-radius: 12px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.06);
    transition: background 0.18s;
    cursor: default;
  }

  .ct-info-item:hover {
    background: rgba(128,249,200,0.07);
    border-color: rgba(128,249,200,0.15);
  }

  .ct-info-icon-wrap {
    width: 36px;
    height: 36px;
    background: rgba(255,255,255,0.06);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .ct-info-icon {
    font-size: 18px;
    color: #80f9c8;
  }

  .ct-info-item-label {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    margin-bottom: 3px;
  }

  .ct-info-item-val {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #fff;
  }

  .ct-divider {
    height: 1px;
    background: rgba(255,255,255,0.06);
    margin: 24px 0;
  }

  .ct-socials {
    display: flex;
    gap: 8px;
  }

  .ct-social-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 9px 14px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.04);
    font-family: 'Space Grotesk', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.06em;
    color: rgba(255,255,255,0.4);
    cursor: pointer;
    transition: background 0.18s, color 0.18s, border-color 0.18s;
    text-transform: uppercase;
  }

  .ct-social-btn:hover {
    background: rgba(128,249,200,0.1);
    border-color: rgba(128,249,200,0.2);
    color: #80f9c8;
  }

  .ct-social-btn .material-symbols-outlined {
    font-size: 15px;
  }

  /* ── Bottom CTA strip ── */
  .ct-bottom-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;
  }

  .ct-cta-card {
    background: #fff;
    border: 1px solid rgba(20,27,43,0.08);
    border-radius: 20px;
    padding: 32px 32px 28px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    cursor: pointer;
    transition: box-shadow 0.2s, transform 0.2s;
  }

  .ct-cta-card:hover {
    box-shadow: 0 8px 32px rgba(20,27,43,0.08);
    transform: translateY(-2px);
  }

  .ct-cta-icon-wrap {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ct-cta-icon-wrap .material-symbols-outlined {
    font-size: 22px;
  }

  .ct-cta-card-title {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: #141b2b;
    margin: 0;
  }

  .ct-cta-card-desc {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 400;
    line-height: 1.6;
    color: rgba(20,27,43,0.5);
    margin: 0;
    flex: 1;
  }

  .ct-cta-card-link {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #0F6E56;
  }

  .ct-cta-card-link .material-symbols-outlined {
    font-size: 15px;
  }

  .bg-green { background: #E8F9F2; color: #0F6E56; }
  .bg-blue  { background: #E6F1FB; color: #185FA5; }
  .bg-dark  { background: #EEEDFE; color: #534AB7; }
`;

const INFO_ITEMS = [
  { icon: "mail",      label: "Email us",      val: "hello@nexov.ai"       },
  { icon: "phone",     label: "Call us",       val: "+1 (800) 639-2682"    },
  { icon: "location_on", label: "Headquarters", val: "San Francisco, CA"   },
  { icon: "schedule",  label: "Response time", val: "Under 2 business hours"},
];

const CTA_CARDS = [
  { icon: "rocket_launch", iconBg: "bg-green", title: "Deploy Now",         desc: "Get your first voice agent live in under 48 hours with white-glove setup.",       link: "Get started" },
  { icon: "engineering",   iconBg: "bg-blue",  title: "Talk to an Engineer",desc: "Book a 30-min technical deep-dive with our solutions team.",                      link: "Book a call"  },
  { icon: "description",   iconBg: "bg-dark",  title: "Read the Docs",      desc: "Explore API references, integration guides, and architecture blueprints.",          link: "Open docs"    },
];

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", company: "", use: "", message: "" });
  const [sent, setSent] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <style>{styles}</style>
      <motion.section
        className="ct-root"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
      >

        {/* ── Heading card ── */}
        <div className="ct-heading-card">
          <svg className="ct-heading-bg" viewBox="0 0 900 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <pattern id="ct-dots" width="28" height="28" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="1.5" fill="#9FE1CB" />
              </pattern>
            </defs>
            <rect width="900" height="240" fill="url(#ct-dots)" />
          </svg>
          <div>
            <div className="ct-eyebrow">Let's talk</div>
            <h2 className="ct-main-title">Start automating<br />conversations today</h2>
          </div>
          <div className="ct-heading-right">
            <p className="ct-heading-body">
              Whether you're ready to deploy or just exploring — our team will
              help you find the right solution for your business.
            </p>
            <div className="ct-response-badge">
              <div className="ct-pulse-dot" />
              <span className="ct-badge-text">Avg. reply under 2 hours</span>
            </div>
          </div>
        </div>

        {/* ── Form + Info ── */}
        <div className="ct-main-row">

          {/* Form */}
          <div className="ct-form-card">
            <div className="ct-form-title">Send us a message</div>
            {sent ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 300, gap: 16, textAlign: "center" }}>
                <div style={{ width: 56, height: 56, background: "#E8F9F2", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 28, color: "#0F6E56" }}>check_circle</span>
                </div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, fontWeight: 800, color: "#141b2b", letterSpacing: "-0.02em" }}>Message sent!</div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(20,27,43,0.5)", lineHeight: 1.6 }}>We'll be in touch within 2 business hours.</div>
                <button onClick={() => setSent(false)} style={{ marginTop: 8, background: "none", border: "1.5px solid rgba(20,27,43,0.12)", borderRadius: 10, padding: "10px 20px", fontFamily: "'Space Grotesk',sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(20,27,43,0.45)", cursor: "pointer" }}>Send another</button>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div className="ct-select-row">
                  <div className="ct-field">
                    <label className="ct-label">Full name</label>
                    <input className="ct-input" name="name" placeholder="Jane Smith" value={form.name} onChange={handle} required />
                  </div>
                  <div className="ct-field">
                    <label className="ct-label">Work email</label>
                    <input className="ct-input" name="email" type="email" placeholder="jane@company.com" value={form.email} onChange={handle} required />
                  </div>
                </div>
                <div className="ct-select-row">
                  <div className="ct-field">
                    <label className="ct-label">Company</label>
                    <input className="ct-input" name="company" placeholder="Acme Inc." value={form.company} onChange={handle} />
                  </div>
                  <div className="ct-field">
                    <label className="ct-label">Use case</label>
                    <select className="ct-input" name="use" value={form.use} onChange={handle}>
                      <option value="">Select one…</option>
                      <option>Healthcare</option>
                      <option>Real Estate</option>
                      <option>E-commerce</option>
                      <option>SaaS / Onboarding</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="ct-field">
                  <label className="ct-label">Message</label>
                  <textarea className="ct-input" name="message" rows={4} placeholder="Tell us about your project…" value={form.message} onChange={handle} />
                </div>
                <button type="submit" className="ct-submit-btn">
                  <span className="material-symbols-outlined">send</span>
                  Send message
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="ct-info-card">
            <div className="ct-info-title">Contact information</div>
            <div className="ct-info-items">
              {INFO_ITEMS.map((item) => (
                <div key={item.label} className="ct-info-item">
                  <div className="ct-info-icon-wrap">
                    <span className="material-symbols-outlined ct-info-icon">{item.icon}</span>
                  </div>
                  <div>
                    <div className="ct-info-item-label">{item.label}</div>
                    <div className="ct-info-item-val">{item.val}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="ct-divider" />
            <div className="ct-info-title" style={{ fontSize: 14, marginBottom: 12 }}>Follow us</div>
            <div className="ct-socials">
              {[{ icon: "alternate_email", label: "Twitter" }, { icon: "work", label: "LinkedIn" }, { icon: "code", label: "GitHub" }].map((s) => (
                <button key={s.label} className="ct-social-btn">
                  <span className="material-symbols-outlined">{s.icon}</span>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom CTA cards ── */}
        {/* <div className="ct-bottom-row">
          {CTA_CARDS.map((c) => (
            <div key={c.title} className="ct-cta-card">
              <div className={`ct-cta-icon-wrap ${c.iconBg}`}>
                <span className="material-symbols-outlined">{c.icon}</span>
              </div>
              <div className="ct-cta-card-title">{c.title}</div>
              <div className="ct-cta-card-desc">{c.desc}</div>
              <div className="ct-cta-card-link">
                {c.link}
                <span className="material-symbols-outlined">arrow_forward</span>
              </div>
            </div>
          ))}
        </div> */}

      </motion.section>
    </>
  );
};

export default ContactSection;