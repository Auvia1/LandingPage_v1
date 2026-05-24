// // const CTA = () => (
// //   <section style={{ borderBottom: "1px solid #000", background: "#6EE7B7" }}>
// //     <div style={{ padding: "96px 48px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
// //       <h2 style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(40px,7vw,80px)", fontWeight: 900, textTransform: "uppercase", lineHeight: 0.9, letterSpacing: "-0.04em", marginBottom: "48px", maxWidth: "900px" }}>Start Automating Conversations Today</h2>
// //       <div style={{ display: "flex", border: "2px solid #000", boxShadow: "8px 8px 0 rgba(0,0,0,0.15)", borderRadius: "8px", overflow: "hidden" }}>
// //         <button style={{ background: "#000", color: "#fff", padding: "20px 40px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", borderRight: "1px solid #000", cursor: "pointer", transition: "all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)", transform: "none" }} onMouseEnter={(e) => { e.target.style.background = "rgba(0,0,0,0.85)"; e.target.style.transform = "translateY(-2px)"; }} onMouseLeave={(e) => { e.target.style.background = "#000"; e.target.style.transform = "translateY(0)"; }}>Deploy Now</button>
// //         <button style={{ background: "transparent", color: "#000", padding: "20px 40px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: "pointer", transition: "all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)" }} onMouseEnter={(e) => { e.target.style.background = "rgba(0,0,0,0.1)"; }} onMouseLeave={(e) => { e.target.style.background = "transparent"; }}>Talk to an Engineer</button>
// //       </div>
// //     </div>
// //   </section>
// // );

// // export default CTA;


// import { useState } from "react";
// import { motion } from "framer-motion";

// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=Space+Grotesk:wght@400;500&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');

//   .ct-root {
//     font-family: 'Inter', sans-serif;
//     background: #f5f5f7;
//     padding: 32px;
//     min-height: 100vh;
//     display: flex;
//     flex-direction: column;
//   }

//   /* ── Top heading card ── */
//   .ct-heading-card {
//     background: #0F6E56;
//     border-radius: 20px;
//     padding: 56px 52px;
//     margin-bottom: 16px;
//     position: relative;
//     overflow: hidden;
//     display: flex;
//     align-items: flex-end;
//     justify-content: space-between;
//     gap: 32px;
//     min-height: 220px;
//   }

//   .ct-heading-bg {
//     position: absolute;
//     inset: 0;
//     opacity: 0.06;
//     pointer-events: none;
//   }

//   .ct-eyebrow {
//     font-family: 'Space Grotesk', sans-serif;
//     font-size: 11px;
//     font-weight: 500;
//     letter-spacing: 0.18em;
//     text-transform: uppercase;
//     color: #5DCAA5;
//     margin-bottom: 16px;
//     position: relative;
//     z-index: 1;
//   }

//   .ct-main-title {
//     font-family: 'Inter', sans-serif;
//     font-size: clamp(36px, 5vw, 64px);
//     font-weight: 900;
//     letter-spacing: -0.04em;
//     line-height: 0.95;
//     color: #E1F5EE;
//     text-transform: uppercase;
//     margin: 0;
//     position: relative;
//     z-index: 1;
//   }

//   .ct-heading-right {
//     position: relative;
//     z-index: 1;
//     flex-shrink: 0;
//     max-width: 300px;
//   }

//   .ct-heading-body {
//     font-family: 'Inter', sans-serif;
//     font-size: 15px;
//     font-weight: 400;
//     line-height: 1.7;
//     color: rgba(225,245,238,0.6);
//     margin: 0 0 28px;
//   }

//   .ct-response-badge {
//     display: inline-flex;
//     align-items: center;
//     gap: 7px;
//     background: rgba(255,255,255,0.08);
//     border: 1px solid rgba(255,255,255,0.12);
//     border-radius: 99px;
//     padding: 7px 14px;
//   }

//   .ct-pulse-dot {
//     width: 7px;
//     height: 7px;
//     border-radius: 50%;
//     background: #80f9c8;
//     animation: ctPulse 2s ease-in-out infinite;
//   }

//   @keyframes ctPulse {
//     0%,100% { opacity:1; transform:scale(1); }
//     50%      { opacity:0.35; transform:scale(0.75); }
//   }

//   .ct-badge-text {
//     font-family: 'Space Grotesk', sans-serif;
//     font-size: 11px;
//     font-weight: 500;
//     letter-spacing: 0.1em;
//     text-transform: uppercase;
//     color: rgba(255,255,255,0.5);
//   }

//   /* ── Main row ── */
//   .ct-main-row {
//     display: flex;
//     flex: 1;
//     gap: 16px;
//     margin-bottom: 16px;
//   }

//   /* ── Form card ── */
//   .ct-form-card {
//     background: #fff;
//     border: 1px solid rgba(20,27,43,0.08);
//     border-radius: 20px;
//     padding: 40px 40px 36px;
//     width: 100%;
//     min-height: min(760px, calc(100vh - 360px));
//     display: flex;
//     flex-direction: column;
//   }

//   .ct-form-title {
//     font-family: 'Inter', sans-serif;
//     font-size: 18px;
//     font-weight: 800;
//     letter-spacing: -0.02em;
//     color: #141b2b;
//     margin: 0 0 28px;
//   }

//   .ct-form-subtitle {
//     font-family: 'Inter', sans-serif;
//     font-size: 14px;
//     line-height: 1.7;
//     color: rgba(20,27,43,0.62);
//     margin: 0;
//   }

//   .ct-form-header {
//     display: flex;
//     align-items: flex-start;
//     justify-content: space-between;
//     gap: 20px;
//     margin-bottom: 28px;
//   }

//   .ct-form-badge {
//     display: inline-flex;
//     align-items: center;
//     gap: 8px;
//     border-radius: 999px;
//     padding: 10px 14px;
//     background: rgba(15,110,86,0.08);
//     color: #0F6E56;
//     border: 1px solid rgba(15,110,86,0.14);
//     font-family: 'Space Grotesk', sans-serif;
//     font-size: 10px;
//     font-weight: 500;
//     letter-spacing: 0.12em;
//     text-transform: uppercase;
//     white-space: nowrap;
//   }

//   .ct-form-badge .material-symbols-outlined {
//     font-size: 15px;
//   }

//   .ct-form-header-copy {
//     max-width: 520px;
//   }

//   .ct-form-card form {
//     display: flex;
//     flex-direction: column;
//     flex: 1;
//   }

//   .ct-form-card form .ct-field:last-of-type {
//     flex: 1;
//     display: flex;
//     flex-direction: column;
//   }

//   .ct-form-card form .ct-field:last-of-type .ct-input {
//     flex: 1;
//     min-height: 120px;
//   }

//   .ct-field {
//     margin-bottom: 12px;
//   }

//   .ct-label {
//     font-family: 'Space Grotesk', sans-serif;
//     font-size: 10px;
//     font-weight: 500;
//     letter-spacing: 0.12em;
//     text-transform: uppercase;
//     color: rgba(20,27,43,0.4);
//     display: block;
//     margin-bottom: 6px;
//   }

//   .ct-input {
//     width: 100%;
//     box-sizing: border-box;
//     border: 1.5px solid rgba(20,27,43,0.1);
//     border-radius: 12px;
//     padding: 10px 12px;
//     font-family: 'Inter', sans-serif;
//     font-size: 13px;
//     font-weight: 400;
//     color: #141b2b;
//     background: #fafafa;
//     outline: none;
//     transition: border-color 0.18s, background 0.18s;
//     resize: none;
//   }

//   .ct-input::placeholder {
//     color: rgba(20,27,43,0.25);
//   }

//   .ct-input:focus {
//     border-color: #0F6E56;
//     background: #fff;
//   }

//   .ct-select-row {
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     gap: 10px;
//     align-items: start;
//   }

//   .ct-submit-btn {
//     width: 100%;
//     margin-top: 8px;
//     background: #141b2b;
//     color: #fff;
//     border: none;
//     border-radius: 12px;
//     padding: 16px 24px;
//     font-family: 'Inter', sans-serif;
//     font-size: 13px;
//     font-weight: 700;
//     letter-spacing: 0.06em;
//     text-transform: uppercase;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 8px;
//     transition: background 0.18s, transform 0.18s;
//   }

//   .ct-submit-btn:hover {
//     background: #0F6E56;
//     transform: translateY(-1px);
//   }

//   .ct-submit-btn .material-symbols-outlined {
//     font-size: 18px;
//   }

//   /* ── Bottom CTA strip ── */
//   .ct-bottom-row {
//     display: grid;
//     grid-template-columns: 1fr 1fr 1fr;
//     gap: 16px;
//   }

//   .ct-cta-card {
//     background: #fff;
//     border: 1px solid rgba(20,27,43,0.08);
//     border-radius: 20px;
//     padding: 32px 32px 28px;
//     display: flex;
//     flex-direction: column;
//     gap: 14px;
//     cursor: pointer;
//     transition: box-shadow 0.2s, transform 0.2s;
//   }

//   .ct-cta-card:hover {
//     box-shadow: 0 8px 32px rgba(20,27,43,0.08);
//     transform: translateY(-2px);
//   }

//   .ct-cta-icon-wrap {
//     width: 44px;
//     height: 44px;
//     border-radius: 12px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }

//   .ct-cta-icon-wrap .material-symbols-outlined {
//     font-size: 22px;
//   }

//   .ct-cta-card-title {
//     font-family: 'Inter', sans-serif;
//     font-size: 16px;
//     font-weight: 800;
//     letter-spacing: -0.02em;
//     color: #141b2b;
//     margin: 0;
//   }

//   .ct-cta-card-desc {
//     font-family: 'Inter', sans-serif;
//     font-size: 13px;
//     font-weight: 400;
//     line-height: 1.6;
//     color: rgba(20,27,43,0.5);
//     margin: 0;
//     flex: 1;
//   }

//   .ct-cta-card-link {
//     display: inline-flex;
//     align-items: center;
//     gap: 5px;
//     font-family: 'Space Grotesk', sans-serif;
//     font-size: 11px;
//     font-weight: 500;
//     letter-spacing: 0.1em;
//     text-transform: uppercase;
//     color: #0F6E56;
//   }

//   .ct-cta-card-link .material-symbols-outlined {
//     font-size: 15px;
//   }

//   .bg-green { background: #E8F9F2; color: #0F6E56; }
//   .bg-blue  { background: #E6F1FB; color: #185FA5; }
//   .bg-dark  { background: #EEEDFE; color: #534AB7; }
// `;

// export const CONTACT_ITEMS = [
//   { icon: "mail",      label: "Email us",      val: "nexovai12@gmail.com"       },
//   { icon: "phone",     label: "Call us",       val: "+91 7993357555"    },
//   { icon: "location_on", label: "Headquarters", val: "Hyderabad, Telangana"   },
//   { icon: "schedule",  label: "Response time", val: "Under 2 business hours"},
// ];

// export const SOCIAL_LINKS = [
//   { icon: "work", label: "LinkedIn", link: "https://www.linkedin.com/company/nexovai1/" },
//   { icon: "camera_alt", label: "Instagram", link: "https://www.instagram.com/nexovai_pvt_limited/" },
// ];

// const CTA_CARDS = [
//   { icon: "rocket_launch", iconBg: "bg-green", title: "Deploy Now",         desc: "Get your first voice agent live in under 48 hours with white-glove setup.",       link: "Get started" },
//   { icon: "engineering",   iconBg: "bg-blue",  title: "Talk to an Engineer",desc: "Book a 30-min technical deep-dive with our solutions team.",                      link: "Book a call"  },
//   { icon: "description",   iconBg: "bg-dark",  title: "Read the Docs",      desc: "Explore API references, integration guides, and architecture blueprints.",          link: "Open docs"    },
// ];

// const ContactSection = () => {
//   const [form, setForm] = useState({ name: "", email: "", company: "", use: "", message: "" });
//   const [sent, setSent] = useState(false);

//   const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const submit = (e) => {
//     e.preventDefault();
//     setSent(true);
//   };

//   return (
//     <>
//       <style>{styles}</style>
//       <motion.section
//         className="ct-root"
//         initial={{ opacity: 0, y: 60 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true, margin: "-100px" }}
//         transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
//       >

//         {/* ── Heading card ── */}
//         <div className="ct-heading-card">
//           <svg className="ct-heading-bg" viewBox="0 0 900 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
//             <defs>
//               <pattern id="ct-dots" width="28" height="28" patternUnits="userSpaceOnUse">
//                 <circle cx="1.5" cy="1.5" r="1.5" fill="#9FE1CB" />
//               </pattern>
//             </defs>
//             <rect width="900" height="240" fill="url(#ct-dots)" />
//           </svg>
//           <div>
//             <div className="ct-eyebrow">Let's talk</div>
//             <h2 className="ct-main-title">Start automating<br />conversations today</h2>
//           </div>
//           <div className="ct-heading-right">
//             <p className="ct-heading-body">
//               Whether you're ready to deploy or just exploring — our team will
//               help you find the right solution for your business.
//             </p>
//             <div className="ct-response-badge">
//               <div className="ct-pulse-dot" />
//               <span className="ct-badge-text">Avg. reply under 2 hours</span>
//             </div>
//           </div>
//         </div>

//         {/* ── Form + Info ── */}
//         <div className="ct-main-row">
//           <div className="ct-form-card">
//             <div className="ct-form-title">Send us a message</div>
//             {sent ? (
//               <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 300, gap: 16, textAlign: "center" }}>
//                 <div style={{ width: 56, height: 56, background: "#E8F9F2", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                   <span className="material-symbols-outlined" style={{ fontSize: 28, color: "#0F6E56" }}>check_circle</span>
//                 </div>
//                 <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 18, fontWeight: 800, color: "#141b2b", letterSpacing: "-0.02em" }}>Message sent!</div>
//                 <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, color: "rgba(20,27,43,0.5)", lineHeight: 1.6 }}>We'll be in touch within 2 business hours.</div>
//                 <button onClick={() => setSent(false)} style={{ marginTop: 8, background: "none", border: "1.5px solid rgba(20,27,43,0.12)", borderRadius: 10, padding: "10px 20px", fontFamily: "'Space Grotesk',sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(20,27,43,0.45)", cursor: "pointer" }}>Send another</button>
//               </div>
//             ) : (
//               <form onSubmit={submit}>
//                 <div className="ct-select-row">
//                   <div className="ct-field">
//                     <label className="ct-label">Full name</label>
//                     <input className="ct-input" name="name" placeholder="Jane Smith" value={form.name} onChange={handle} required />
//                   </div>
//                   <div className="ct-field">
//                     <label className="ct-label">Work email</label>
//                     <input className="ct-input" name="email" type="email" placeholder="jane@company.com" value={form.email} onChange={handle} required />
//                   </div>
//                 </div>
//                 <div className="ct-select-row">
//                   <div className="ct-field">
//                     <label className="ct-label">Company</label>
//                     <input className="ct-input" name="company" placeholder="Acme Inc." value={form.company} onChange={handle} />
//                   </div>
//                   <div className="ct-field">
//                     <label className="ct-label">Use case</label>
//                     <select className="ct-input" name="use" value={form.use} onChange={handle}>
//                       <option value="">Select one…</option>
//                       <option>Healthcare</option>
//                       <option>Real Estate</option>
//                       <option>E-commerce</option>
//                       <option>SaaS / Onboarding</option>
//                       <option>Other</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div className="ct-field">
//                   <label className="ct-label">Message</label>
//                   <textarea className="ct-input" name="message" rows={3} placeholder="Tell us about your project…" value={form.message} onChange={handle} />
//                 </div>
//                 <button type="submit" className="ct-submit-btn">
//                   <span className="material-symbols-outlined">send</span>
//                   Send message
//                 </button>
//               </form>
//             )}
//           </div>
//         </div>

//         {/* ── Bottom CTA cards ── */}
//         {/* <div className="ct-bottom-row">
//           {CTA_CARDS.map((c) => (
//             <div key={c.title} className="ct-cta-card">
//               <div className={`ct-cta-icon-wrap ${c.iconBg}`}>
//                 <span className="material-symbols-outlined">{c.icon}</span>
//               </div>
//               <div className="ct-cta-card-title">{c.title}</div>
//               <div className="ct-cta-card-desc">{c.desc}</div>
//               <div className="ct-cta-card-link">
//                 {c.link}
//                 <span className="material-symbols-outlined">arrow_forward</span>
//               </div>
//             </div>
//           ))}
//         </div> */}

//       </motion.section>
//     </>
//   );
// };

// export default ContactSection;


import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
export const CONTACT_ITEMS = [
  { icon: "mail",        label: "Email us",      val: "nexovai12@gmail.com"        },
  { icon: "phone",       label: "Call us",        val: "+91 7993357555"             },
  { icon: "location_on", label: "Headquarters",   val: "Hyderabad, Telangana"       },
  { icon: "schedule",    label: "Response time",  val: "Under 2 business hours"     },
];

export const SOCIAL_LINKS = [
  { icon: "work",       label: "LinkedIn",  link: "https://www.linkedin.com/company/nexovai1/"            },
  { icon: "camera_alt", label: "Instagram", link: "https://www.instagram.com/nexovai_pvt_limited/"        },
];

const USE_CHIPS = [
  { icon: "stethoscope",          label: "Healthcare"  },
  { icon: "apartment",            label: "Real Estate" },
  { icon: "shopping_cart",        label: "E-commerce"  },
  { icon: "memory",               label: "SaaS"        },
  { icon: "more_horiz",           label: "Other"       },
];

/* ─────────────────────────────────────────────
   STYLES (injected once)
───────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');

/* ── Root ── */
.cf-root {
  font-family: 'Inter', sans-serif;
  background: transparent;
  padding: 32px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-sizing: border-box;
}

/* ── Hero banner ── */
.cf-hero {
  background: #0F6E56;
  border-radius: 22px;
  padding: 52px 52px 44px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 40px;
}

.cf-hero-dots {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(159,225,203,0.35) 1.5px, transparent 1.5px);
  background-size: 26px 26px;
  pointer-events: none;
}

.cf-hero-glow {
  position: absolute;
  bottom: -80px;
  right: -80px;
  width: 360px;
  height: 360px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(93,202,165,0.18) 0%, transparent 70%);
  pointer-events: none;
}

.cf-eyebrow {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #5DCAA5;
  margin-bottom: 16px;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 8px;
}

.cf-eyebrow::before {
  content: '';
  display: inline-block;
  width: 24px;
  height: 1.5px;
  background: #5DCAA5;
  border-radius: 2px;
}

.cf-hero-title {
  font-size: clamp(32px, 4.5vw, 62px);
  font-weight: 900;
  letter-spacing: -0.045em;
  line-height: 0.92;
  color: #E1F5EE;
  text-transform: uppercase;
  margin: 0;
  position: relative;
  z-index: 1;
}

.cf-hero-right {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  max-width: 280px;
}

.cf-hero-body {
  font-size: 14px;
  line-height: 1.75;
  color: rgba(225,245,238,0.58);
  margin: 0 0 24px;
}

.cf-live-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.11);
  border-radius: 99px;
  padding: 8px 16px;
}

.cf-pulse-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #80f9c8;
  animation: cfPulse 2s ease-in-out infinite;
  flex-shrink: 0;
}

@keyframes cfPulse {
  0%,100% { opacity:1; transform:scale(1); }
  50%      { opacity:0.3; transform:scale(0.7); }
}

.cf-badge-label {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.45);
}

/* ── Main content row ── */
.cf-main-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
  align-items: start;
}

/* ── Form card ── */
.cf-form-card {
  background: #fff;
  border-radius: 22px;
  border: 1px solid rgba(20,27,43,0.07);
  overflow: hidden;
}

/* ── Card header ── */
.cf-card-header {
  padding: 28px 36px 24px;
  border-bottom: 1px solid rgba(20,27,43,0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.cf-card-title {
  font-size: 17px;
  font-weight: 800;
  letter-spacing: -0.025em;
  color: #141b2b;
  margin: 0 0 3px;
}

.cf-card-sub {
  font-size: 12px;
  color: rgba(20,27,43,0.42);
  margin: 0;
}

/* ── Form body ── */
.cf-form-body {
  padding: 32px 36px 0;
}

/* ── Use-case chips ── */
.cf-chips-label {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(20,27,43,0.38);
  margin-bottom: 10px;
}

.cf-chips-row {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-bottom: 28px;
}

.cf-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border: 1.5px solid rgba(15,110,86,0.18);
  border-radius: 99px;
  padding: 6px 13px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.07em;
  color: #0F6E56;
  background: rgba(15,110,86,0.04);
  cursor: pointer;
  user-select: none;
  transition: all 0.18s ease;
}

.cf-chip:hover {
  background: rgba(15,110,86,0.09);
  border-color: rgba(15,110,86,0.3);
  transform: translateY(-1px);
}

.cf-chip.selected {
  background: #0F6E56;
  color: #E1F5EE;
  border-color: #0F6E56;
}

.cf-chip .material-symbols-outlined {
  font-size: 13px;
}

/* ── Field grid ── */
.cf-grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 12px;
}

.cf-field {
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-bottom: 12px;
}

.cf-field:last-child { margin-bottom: 0; }

.cf-label {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(20,27,43,0.38);
  display: flex;
  align-items: center;
  gap: 4px;
}

.cf-required {
  color: #0F6E56;
  font-size: 13px;
  line-height: 1;
}

/* ── Input wrapper ── */
.cf-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.cf-input-icon {
  position: absolute;
  left: 13px;
  color: rgba(20,27,43,0.22);
  font-size: 16px !important;
  pointer-events: none;
  transition: color 0.18s;
  z-index: 1;
  user-select: none;
}

.cf-input-wrap:focus-within .cf-input-icon {
  color: #0F6E56;
}

.cf-input,
.cf-select {
  width: 100%;
  box-sizing: border-box;
  border: 1.5px solid rgba(20,27,43,0.1);
  border-radius: 13px;
  padding: 11px 13px 11px 38px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: #141b2b;
  background: #fafafa;
  outline: none;
  transition: border-color 0.18s, background 0.18s, box-shadow 0.18s;
  appearance: none;
  -webkit-appearance: none;
}

.cf-input::placeholder { color: rgba(20,27,43,0.2); }

.cf-input:focus,
.cf-select:focus {
  border-color: #0F6E56;
  background: #fff;
  box-shadow: 0 0 0 3.5px rgba(15,110,86,0.09);
}

.cf-input.error {
  border-color: #E24B4A;
  box-shadow: 0 0 0 3.5px rgba(226,75,74,0.09);
}

/* Select arrow */
.cf-select-arrow {
  position: absolute;
  right: 13px;
  color: rgba(20,27,43,0.28);
  font-size: 16px !important;
  pointer-events: none;
  user-select: none;
}

/* ── Textarea ── */
.cf-textarea-wrap {
  position: relative;
}

.cf-textarea-icon {
  position: absolute;
  left: 13px;
  top: 13px;
  color: rgba(20,27,43,0.22);
  font-size: 16px !important;
  pointer-events: none;
  transition: color 0.18s;
  user-select: none;
}

.cf-textarea-wrap:focus-within .cf-textarea-icon {
  color: #0F6E56;
}

.cf-textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1.5px solid rgba(20,27,43,0.1);
  border-radius: 13px;
  padding: 11px 13px 32px 38px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: #141b2b;
  background: #fafafa;
  outline: none;
  resize: none;
  min-height: 118px;
  transition: border-color 0.18s, background 0.18s, box-shadow 0.18s;
  line-height: 1.65;
}

.cf-textarea::placeholder { color: rgba(20,27,43,0.2); }

.cf-textarea:focus {
  border-color: #0F6E56;
  background: #fff;
  box-shadow: 0 0 0 3.5px rgba(15,110,86,0.09);
}

.cf-textarea.error {
  border-color: #E24B4A;
  box-shadow: 0 0 0 3.5px rgba(226,75,74,0.09);
}

.cf-error-msg {
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  color: #E24B4A;
  margin-top: 4px;
  display: block;
}

.cf-char-counter {
  position: absolute;
  bottom: 10px;
  right: 13px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 10px;
  color: rgba(20,27,43,0.22);
  pointer-events: none;
  transition: color 0.18s;
}

.cf-char-counter.warn { color: #0F6E56; }

/* ── Form footer ── */
.cf-form-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 24px 36px 32px;
}

.cf-privacy {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: rgba(20,27,43,0.32);
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 500;
  letter-spacing: 0.02em;
}

.cf-privacy .material-symbols-outlined { font-size: 14px !important; }

.cf-submit-btn {
  background: #141b2b;
  color: #fff;
  border: none;
  border-radius: 13px;
  padding: 14px 28px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.2s, transform 0.2s;
  white-space: nowrap;
}

.cf-submit-btn:hover { background: #0F6E56; transform: translateY(-1.5px); }
.cf-submit-btn:active { transform: translateY(0); }
.cf-submit-btn .material-symbols-outlined { font-size: 17px !important; }

/* ── Success state ── */
.cf-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 36px;
  text-align: center;
  gap: 12px;
}

.cf-success-icon-wrap {
  width: 64px;
  height: 64px;
  background: #E8F9F2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;
}

.cf-success-icon-wrap .material-symbols-outlined {
  font-size: 28px !important;
  color: #0F6E56;
}

.cf-success-title {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.025em;
  color: #141b2b;
}

.cf-success-sub {
  font-size: 14px;
  color: rgba(20,27,43,0.42);
  line-height: 1.65;
  max-width: 290px;
}

.cf-reset-btn {
  margin-top: 8px;
  background: none;
  border: 1.5px solid rgba(20,27,43,0.1);
  border-radius: 10px;
  padding: 9px 22px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(20,27,43,0.38);
  cursor: pointer;
  transition: border-color 0.18s, color 0.18s;
}

.cf-reset-btn:hover { border-color: #0F6E56; color: #0F6E56; }

/* ── Responsive ── */
@media (max-width: 900px) {
  .cf-hero { flex-direction: column; align-items: flex-start; }
  .cf-hero-right { max-width: 100%; }
  .cf-card-header { flex-direction: column; align-items: flex-start; gap: 14px; }
}

@media (max-width: 600px) {
  .cf-root { padding: 16px; }
  .cf-hero { padding: 32px 24px; }
  .cf-form-body { padding: 24px 20px 0; }
  .cf-form-footer { padding: 20px 20px 24px; flex-direction: column; align-items: stretch; }
  .cf-submit-btn { justify-content: center; }
  .cf-grid-2 { grid-template-columns: 1fr; }
  .cf-card-header { padding: 20px 20px 16px; }
}
`;

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const ContactSection = () => {
  const [state, handleSubmit] = useForm("xnjrzlod");
  const [form, setForm]       = useState({ name: "", email: "", company: "", phone: "", message: "" });
  const [useCase, setUseCase] = useState("");

  const handle = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleChip = (val) => setUseCase((prev) => (prev === val ? "" : val));

  const submit = (ev) => {
    handleSubmit(ev);
  };

  const reset = () => {
    setForm({ name: "", email: "", company: "", phone: "", message: "" });
    setUseCase("");
  };

  const charCount  = form.message.length;
  const charMax    = 400;
  const charWarn   = charCount > 320;

  return (
    <>
      <style>{CSS}</style>

      <motion.div
        className="cf-root"
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* ── Hero ── */}
        <div className="cf-hero">
          <div className="cf-hero-dots" />
          <div className="cf-hero-glow" />
          <div>
            <div className="cf-eyebrow">Let's talk</div>
            <h2 className="cf-hero-title">
              Start automating<br />conversations today
            </h2>
          </div>
          <div className="cf-hero-right">
            <p className="cf-hero-body">
              Whether you're ready to deploy or just exploring — our team will help you find the right solution for your business.
            </p>
            <div className="cf-live-badge">
              <div className="cf-pulse-dot" />
              <span className="cf-badge-label">Avg. reply under 2 hours</span>
            </div>
          </div>
        </div>

        {/* ── Main row ── */}
        <div className="cf-main-row">

          {/* ── Form card ── */}
          <div className="cf-form-card">
            {/* Card header */}
            <div className="cf-card-header">
              <div>
                <div className="cf-card-title">Send us a message</div>
                <div className="cf-card-sub">We'll get back to you within 2 business hours.</div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {state.succeeded ? (
                /* ── Success ── */
                <motion.div
                  key="success"
                  className="cf-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div className="cf-success-icon-wrap">
                    <span className="material-symbols-outlined">check_circle</span>
                  </div>
                  <div className="cf-success-title">Message sent!</div>
                  <div className="cf-success-sub">
                    We'll be in touch within 2 business hours. Keep an eye on your inbox.
                  </div>
                  <button className="cf-reset-btn" onClick={() => window.location.reload()}>
                    Send another message
                  </button>
                </motion.div>
              ) : (
                /* ── Form ── */
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <form onSubmit={submit} noValidate>
                    <input type="hidden" name="use_case" value={useCase} />
                    <div className="cf-form-body">

                      {/* Use-case chips */}
                      <div className="cf-chips-label">I'm interested in</div>
                      <div className="cf-chips-row">
                        {USE_CHIPS.map((c) => (
                          <div
                            key={c.label}
                            className={`cf-chip ${useCase === c.label ? "selected" : ""}`}
                            onClick={() => toggleChip(c.label)}
                          >
                            <span className="material-symbols-outlined">{c.icon}</span>
                            {c.label}
                          </div>
                        ))}
                      </div>

                      {/* Name + Email */}
                      <div className="cf-grid-2">
                        <div className="cf-field">
                          <label className="cf-label">
                            Full name <span className="cf-required">*</span>
                          </label>
                          <div className="cf-input-wrap">
                            <input
                              className="cf-input"
                              type="text"
                              name="name"
                              placeholder="Jane Smith"
                              value={form.name}
                              onChange={handle}
                              autoComplete="name"
                              required
                            />
                            <span className="material-symbols-outlined cf-input-icon">person</span>
                          </div>
                          <ValidationError field="name" errors={state.errors} />
                        </div>
                        <div className="cf-field">
                          <label className="cf-label">
                            Work email <span className="cf-required">*</span>
                          </label>
                          <div className="cf-input-wrap">
                            <input
                              className="cf-input"
                              type="email"
                              name="email"
                              placeholder="jane@company.com"
                              value={form.email}
                              onChange={handle}
                              autoComplete="email"
                              required
                            />
                            <span className="material-symbols-outlined cf-input-icon">mail</span>
                          </div>
                          <ValidationError field="email" errors={state.errors} />
                        </div>
                      </div>

                      {/* Company + Phone */}
                      <div className="cf-grid-2">
                        <div className="cf-field">
                          <label className="cf-label">Company</label>
                          <div className="cf-input-wrap">
                            <input
                              className="cf-input"
                              type="text"
                              name="company"
                              placeholder="Acme Inc."
                              value={form.company}
                              onChange={handle}
                              autoComplete="organization"
                            />
                            <span className="material-symbols-outlined cf-input-icon">business</span>
                          </div>
                        </div>
                        <div className="cf-field">
                          <label className="cf-label">Phone</label>
                          <div className="cf-input-wrap">
                            <input
                              className="cf-input"
                              type="tel"
                              name="phone"
                              placeholder="+91 99999 00000"
                              value={form.phone}
                              onChange={handle}
                              autoComplete="tel"
                            />
                            <span className="material-symbols-outlined cf-input-icon">phone</span>
                          </div>
                        </div>
                      </div>

                      {/* Message */}
                      <div className="cf-field">
                        <label className="cf-label">
                          Message <span className="cf-required">*</span>
                        </label>
                        <div className="cf-textarea-wrap">
                          <textarea
                            className="cf-textarea"
                            name="message"
                            placeholder="Tell us about your project, goals, and expected call volume…"
                            value={form.message}
                            onChange={handle}
                            maxLength={charMax}
                            rows={4}
                            required
                          />
                          <span className="material-symbols-outlined cf-textarea-icon">chat_bubble</span>
                          <div className={`cf-char-counter${charWarn ? " warn" : ""}`}>
                            {charCount} / {charMax}
                          </div>
                        </div>
                        <ValidationError field="message" errors={state.errors} />
                      </div>

                    </div>{/* /cf-form-body */}

                    {/* Footer */}
                    <div className="cf-form-footer">
                      <div className="cf-privacy">
                        <span className="material-symbols-outlined">lock</span>
                        Your info is never sold or shared.
                      </div>
                      <button type="submit" className="cf-submit-btn" disabled={state.submitting}>
                        <span className="material-symbols-outlined">send</span>
                        {state.submitting ? "Sending..." : "Send message"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ContactSection;