

// import { useState, useEffect, useRef, forwardRef } from "react";
// import MusicCarousel from "./components/MusicCarousel";

// const injectTailwindConfig = () => {
//   if (window.tailwind) {
//     window.tailwind.config = {
//       darkMode: "class",
//       theme: {
//         extend: {
//           colors: {
//             "secondary": "#006c4e",
//             "secondary-container": "#80f9c8",
//             "on-secondary-container": "#007353",
//             "nexov-mint": "#80f9c8",
//             "surface-container-low": "#f1f3ff",
//             "surface-container-highest": "#dce2f7",
//             "on-surface": "#141b2b",
//           },
//         },
//       },
//     };
//   }
// };

// const styles = `
//   @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=Space+Grotesk:wght@400;500&display=swap');
//   @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

//   * { box-sizing: border-box; margin: 0; padding: 0; }
//   body { font-family: 'Inter', sans-serif; overflow-x: hidden; background: #f4f4f4; color: #141b2b; }

//   .material-symbols-outlined {
//     font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
//     font-size: 20px;
//     font-family: 'Material Symbols Outlined';
//   }

//   @keyframes marquee {
//     0% { transform: translateX(0); }
//     100% { transform: translateX(-50%); }
//   }
//   .marquee-track { display: flex; width: max-content; animation: marquee 40s linear infinite; }

//   .marquee-item {
//     display: flex; align-items: center; justify-content: center;
//     padding: 0 64px; height: 80px;
//     font-family: 'Inter', sans-serif; font-weight: 400; font-size: 24px;
//     letter-spacing: -0.02em; position: relative;
//   }
//   .marquee-item::after {
//     content: ''; position: absolute; right: 0; top: 0; bottom: 0;
//     width: 1px; background: linear-gradient(to bottom, transparent, #000 50%, transparent);
//   }

//   nav a, nav button { cursor: pointer; }

//   @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
//   .animate-pulse { animation: pulse 2s cubic-bezier(.4,0,.6,1) infinite; }
// `;

// const Icon = ({ name, className = "" }) => (
//   <span className={`material-symbols-outlined ${className}`} style={{ fontFamily: "Material Symbols Outlined" }}>
//     {name}
//   </span>
// );

// const Nav = () => (
//   <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "#f4f4f4", borderBottom: "1px solid #000", width: "100%" }}>
//     <div style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", width: "100%" }}>
//       <div style={{ gridColumn: "span 2", borderRight: "1px solid #000", padding: "16px", display: "flex", alignItems: "center" }}>
//         <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "20px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.04em", lineHeight: 1 }}>
//           Nexov<br />AI
//         </span>
//       </div>
//       <div style={{ gridColumn: "span 7", display: "flex", alignItems: "stretch" }}>
//         {["INFRASTRUCTURE", "VOICE MODELS", "API DOCS", "PRICING"].map((label) => (
//           <a key={label} href="#" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", borderRight: "1px solid #000", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textDecoration: "none", color: "#141b2b", padding: "0 8px", textAlign: "center" }}>
//             {label}
//           </a>
//         ))}
//         <div style={{ flex: 2 }} />
//       </div>
//       <div style={{ gridColumn: "span 3", display: "flex", alignItems: "stretch" }}>
//         <div style={{ flex: 1 }} />
//         <a href="#" style={{ display: "flex", alignItems: "center", padding: "0 24px", borderLeft: "1px solid #000", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textDecoration: "none", color: "#141b2b" }}>
//           LOGIN
//         </a>
//         <button style={{ background: "#000", color: "#fff", padding: "0 32px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", border: "none", cursor: "pointer", whiteSpace: "nowrap" }}>
//           GET STARTED
//         </button>
//       </div>
//     </div>
//   </nav>
// );

// const Hero = () => (
//   <section style={{ borderBottom: "1px solid #000", background: "#fff", overflow: "hidden", borderTopLeftRadius: "12px", borderTopRightRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
//     <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "96px 48px" }}>
//       <div style={{ display: "inline-block", border: "1px solid #000", padding: "4px 12px", fontFamily: "'Space Grotesk',monospace", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "32px" }}>
//         V4.2.0 STABLE RELEASE
//       </div>
//       <h1 style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(48px,8vw,80px)", fontWeight: 900, textTransform: "uppercase", lineHeight: 0.95, letterSpacing: "-0.04em", marginBottom: "32px" }}>
//         The infrastructure<br />for AI Voice<br />Agents
//       </h1>
//       <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "18px", lineHeight: 1.6, color: "rgba(20,27,43,.8)", maxWidth: "480px", marginBottom: "48px" }}>
//         Nexov AI provides the sub-100ms latency, human-like reasoning, and scaleable infrastructure required for enterprise-grade autonomous voice operations.
//       </p>
//       <div style={{ display: "flex", border: "1px solid #000" }}>
//         <button style={{ background: "#000", color: "#fff", padding: "20px 40px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", borderRight: "1px solid #000", cursor: "pointer" }}>
//           Start Building
//         </button>
//         <button style={{ background: "#fff", color: "#000", padding: "20px 40px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: "pointer" }}>
//           View Docs
//         </button>
//       </div>
//     </div>
//   </section>
// );

// const MarqueeBar = () => {
//   const LOGOS = ["SALESFORCE", "SLACK", "STRIPE", "GITHUB", "TWILIO", "HUBSPOT"];
//   return (
//     <section style={{ borderTop: "1px solid #000", borderBottom: "1px solid #000", background: "#fff", overflow: "hidden", height: 80, display: "flex", alignItems: "center" }}>
//       <div className="marquee-track">
//         {[...LOGOS, ...LOGOS].map((name, i) => (
//           <div key={i} className="marquee-item" style={{ textTransform: "uppercase" }}>{name}</div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export const TalkToAgent = () => {
//   return <MusicCarousel />;
// };

// const Mission = () => (
//   <section style={{ padding: "96px 48px", borderBottom: "1px solid #000" }}>
//     <div style={{ maxWidth: 1440, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(12,1fr)", gap: "24px" }}>
//       <div style={{ gridColumn: "span 4", borderLeft: "1px solid #000", paddingLeft: "24px" }}>
//         <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(20,27,43,.5)" }}>The Mission</p>
//       </div>
//       <div style={{ gridColumn: "span 8" }}>
//         <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 700, textTransform: "uppercase", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
//           We are an AI agents company building a suite of voice-based AI applications designed to automate real-world business operations.
//         </p>
//       </div>
//     </div>
//   </section>
// );

// const products = [
//   { icon: "call", title: "Call Handling Agent", desc: "Autonomous inbound and outbound call management with human-level natural language processing.", no: "01" },
//   { icon: "calendar_today", title: "Appointment Booking Agent", desc: "Syncs directly with your CRM and calendar to schedule, reschedule, and confirm consultations.", no: "02" },
//   { icon: "support_agent", title: "Customer Support Agent", desc: "Instant resolution for Tier 1 and Tier 2 queries across voice and omnichannel interfaces.", no: "03" },
//   { icon: "leaderboard", title: "Lead Qualification Agent", desc: "Screens potential customers through intelligent dialogue to ensure high-quality pipeline growth.", no: "04" },
//   { icon: "medical_services", title: "Doctor Transcription Tool", desc: "Real-time medical transcription with specialized terminology support and HIPAA compliance.", no: "05" },
// ];

// const ProductCard = ({ icon, title, desc, no }) => {
//   const [hovered, setHovered] = useState(false);
//   return (
//     <div
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       style={{ borderRight: "1px solid #000", borderTop: parseInt(no) > 3 ? "1px solid #000" : "none", padding: "48px", background: hovered ? "#80f9c8" : "#fff", transition: "background .2s", display: "flex", flexDirection: "column", minHeight: "340px", cursor: "default" }}
//     >
//       <div style={{ marginBottom: "48px" }}><Icon name={icon} /></div>
//       <h3 style={{ fontFamily: "'Inter',sans-serif", fontSize: "32px", fontWeight: 600, textTransform: "uppercase", lineHeight: 1.2, letterSpacing: "-0.01em", marginBottom: "16px" }}>{title}</h3>
//       <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "16px", lineHeight: 1.5, marginBottom: "32px" }}>{desc}</p>
//       <div style={{ marginTop: "auto", paddingTop: "32px", borderTop: "1px solid #000" }}>
//         <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Agent No. {no}</span>
//       </div>
//     </div>
//   );
// };

// const ProductGrid = () => (
//   <section style={{ borderBottom: "1px solid #000" }}>
//     <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
//       {products.map((p) => <ProductCard key={p.no} {...p} />)}
//       <div style={{ borderTop: "1px solid #000", background: "#000", padding: "48px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden", minHeight: "340px" }}>
//         <div style={{ position: "absolute", inset: 0, opacity: 0.2 }}>
//           <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
//             <defs><pattern id="pg" width="20" height="20" patternUnits="userSpaceOnUse">
//               <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#80f9c8" strokeWidth=".5" />
//             </pattern></defs>
//             <rect fill="url(#pg)" width="100%" height="100%" />
//           </svg>
//         </div>
//         <div style={{ position: "relative", zIndex: 1 }}>
//           <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#80f9c8", display: "block", marginBottom: "16px" }}>Infrastructure Node</span>
//           {[null, null, null].map((_, i) => (
//             <div key={i} style={{ height: 4, width: ["100%", "66%", "75%"][i], background: `rgba(128,249,200,${[.2,.4,.1][i]})`, marginBottom: 8 }} />
//           ))}
//         </div>
//         <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 8, fontFamily: "'Space Grotesk',monospace", fontSize: "10px", color: "rgba(128,249,200,.6)" }}>
//           <span>// GLOBAL_MESH_ACTIVE</span>
//           <span>// LATENCY_OPTIMIZED</span>
//           <span>// 100% UPTIME_PROTOCOL</span>
//         </div>
//       </div>
//     </div>
//   </section>
// );

// const timelineSteps = [
//   { num: "01", label: "UNDERSTANDS", title: "Real-time Audio Processing", desc: "Captures the nuances of human speech and emotional intent with sub-100ms processing cycles.", icon: "settings_voice", align: "right" },
//   { num: "02", label: "PROCESSES", title: "Proprietary LLM Analysis", desc: "Multi-layer analysis modules determine context, intent, and the optimal response strategy in parallel.", icon: "neurology", align: "left" },
//   { num: "03", label: "EXECUTES", title: "Instant Response Action", desc: "Perform complex operations—booking, routing, or transcribing—within the live call stream seamlessly.", icon: "bolt", align: "right" },
//   { num: "04", label: "INTEGRATES", title: "Deep System Sync", desc: "Direct synchronization with CRMs, databases, and enterprise toolchains via high-security API endpoints.", icon: "api", align: "left" },
// ];

// const StepCard = ({ step, align }) => (
//   <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", padding: "40px", backdropFilter: "blur(8px)", textAlign: align, maxWidth: 460, width: "100%" }}>
//     <div style={{ marginBottom: "24px", display: "flex", justifyContent: align === "right" ? "flex-end" : "flex-start" }}>
//       <span className="material-symbols-outlined" style={{ fontSize: 44, color: "#80f9c8", fontFamily: "Material Symbols Outlined" }}>{step.icon}</span>
//     </div>
//     <div style={{ fontFamily: "'Space Grotesk',monospace", fontSize: "11px", letterSpacing: "0.15em", color: "#80f9c8", marginBottom: "10px", textTransform: "uppercase" }}>
//       {step.num}. {step.label}
//     </div>
//     <h4 style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(20px,2vw,26px)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "16px" }}>
//       {step.title}
//     </h4>
//     <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "16px", lineHeight: 1.7 }}>{step.desc}</p>
//   </div>
// );

// const LogicFlow = () => {
//   const trackRef = useRef(null);
//   const stepsRef = useRef([]);
//   const progressRef = useRef(null);
//   const nodeRefs = useRef([]);

//   useEffect(() => {
//     const handler = () => {
//       const track = trackRef.current;
//       if (!track || !progressRef.current) return;
//       const trackRect = track.getBoundingClientRect();
//       const vh = window.innerHeight;
//       const traveled = vh / 2 - trackRect.top;
//       const pct = Math.max(0, Math.min(1, traveled / trackRect.height));
//       progressRef.current.style.transform = `scaleY(${pct})`;
//       stepsRef.current.forEach((step, i) => {
//         if (!step) return;
//         const sr = step.getBoundingClientRect();
//         const active = sr.top < vh * 0.62;
//         step.style.opacity = active ? "1" : "0.1";
//         step.style.transform = active ? "translateY(0)" : "translateY(40px)";
//         const node = nodeRefs.current[i];
//         if (node) {
//           node.style.background = active ? "#80f9c8" : "#000";
//           node.style.boxShadow = active ? "0 0 12px rgba(128,249,200,.9)" : "none";
//         }
//       });
//     };
//     window.addEventListener("scroll", handler, { passive: true });
//     handler();
//     return () => window.removeEventListener("scroll", handler);
//   }, []);

//   return (
//     <section style={{ background: "#000", color: "#fff", display: "flex", flexDirection: "column", backgroundImage: "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)", backgroundSize: "24px 24px" }}>
//       <div style={{ display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid rgba(255,255,255,.1)", paddingTop: "128px", paddingBottom: "64px" }}>
//         <div style={{ textAlign: "center" }}>
//           <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#80f9c8" }}>Architecture</span>
//           <h2 style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(36px,4vw,48px)", fontWeight: 700, textTransform: "uppercase", lineHeight: 1.1, letterSpacing: "-0.02em", marginTop: "16px" }}>The Logic Flow</h2>
//         </div>
//       </div>
//       <div ref={trackRef} style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "0 48px 128px", width: "100%" }}>
//         <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, transform: "translateX(-50%)", background: "rgba(255,255,255,0.08)", zIndex: 0 }} />
//         <div style={{ position: "absolute", left: "50%", top: 0, width: 2, height: "100%", transform: "translateX(-50%)", transformOrigin: "top", zIndex: 1, pointerEvents: "none" }}>
//           <div ref={progressRef} style={{ width: "100%", height: "100%", background: "linear-gradient(to bottom, #80f9c8, #00e5a0)", boxShadow: "0 0 18px rgba(128,249,200,0.7)", transformOrigin: "top", transform: "scaleY(0)", transition: "transform 0.25s ease-out" }} />
//         </div>
//         {timelineSteps.map((step, i) => {
//           const isRight = step.align === "right";
//           return (
//             <div
//               key={step.num}
//               ref={(el) => (stepsRef.current[i] = el)}
//               style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 48px 1fr", alignItems: "center", minHeight: "80vh", paddingTop: "64px", paddingBottom: "64px", opacity: 0.1, transform: "translateY(40px)", transition: "opacity 0.7s cubic-bezier(.16,1,.3,1), transform 0.7s cubic-bezier(.16,1,.3,1)" }}
//             >
//               <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: "40px" }}>
//                 {!isRight && <StepCard step={step} align="right" />}
//               </div>
//               <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex: 10 }}>
//                 <div ref={(el) => (nodeRefs.current[i] = el)} style={{ width: 14, height: 14, borderRadius: "50%", border: "2px solid #80f9c8", background: "#000", transition: "background 0.4s, box-shadow 0.4s", flexShrink: 0 }} />
//               </div>
//               <div style={{ paddingLeft: "40px" }}>
//                 {isRight && <StepCard step={step} align="left" />}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// };

// const UseCases = () => (
//   <section style={{ borderBottom: "1px solid #000" }}>
//     <div style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gap: "24px", padding: "48px" }}>
//       <div style={{ gridColumn: "span 8", background: "#fff", border: "1px solid #000", padding: "32px", display: "flex", flexDirection: "column", justifyContent: "center", minHeight: 300 }}>
//         <h2 style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(36px,4vw,48px)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.04em" }}>Applied Intelligence</h2>
//         <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "18px", color: "rgba(20,27,43,.6)", marginTop: "16px", maxWidth: 480, lineHeight: 1.6 }}>
//           Deploying specialized voice agents across critical industries to optimize workflow and customer experience.
//         </p>
//       </div>
//       {[
//         { n: "01", t: "Healthcare", d: "Automated appointment handling and transcription for clinics and hospitals." },
//         { n: "02", t: "Real Estate", d: "Lead qualification calls that filter serious buyers from cold traffic." },
//       ].map((uc) => (
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
//           <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
//             <defs><pattern id="gb" width="20" height="20" patternUnits="userSpaceOnUse">
//               <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#80f9c8" strokeWidth=".5" />
//             </pattern></defs>
//             <rect fill="url(#gb)" width="100%" height="100%" />
//           </svg>
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
//         <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "16px", color: "rgba(0,115,83,.8)", lineHeight: 1.5, maxWidth: 600 }}>
//           90% reduction in customer onboarding friction through proactive agent-led setup calls, resulting in a 15% increase in month-one retention.
//         </p>
//       </div>
//     </div>
//   </section>
// );

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
//     <div
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: "1px solid #000", background: hovered ? "#000" : index % 2 === 0 ? "#fff" : "#fafafa", transition: "background 0.2s", cursor: "default" }}
//     >
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

// const WhyDifferent = () => (
//   <section style={{ border: "1px solid #000", borderTop: "none", background: "#fff", overflow: "hidden" }}>
//     <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid #000" }}>
//       <div style={{ padding: "64px 48px", borderRight: "1px solid #000" }}>
//         <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(20,27,43,0.4)", marginBottom: "20px" }}>Competitive Analysis</div>
//         <h2 style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(52px,6vw,96px)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.04em", lineHeight: 0.92, marginBottom: "28px" }}>Why Our<br />Agents Are<br />Different</h2>
//         <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "16px", lineHeight: 1.7, color: "rgba(20,27,43,0.55)", maxWidth: "380px" }}>
//           Legacy chatbots were built for text. Nexov was built for the full complexity of live human voice — a fundamentally harder problem, solved.
//         </p>
//       </div>
//       <div style={{ background: "#000", padding: "64px 48px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
//         <div style={{ position: "absolute", inset: 0, opacity: 0.06 }}>
//           <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
//             <defs><pattern id="wd-grid" width="32" height="32" patternUnits="userSpaceOnUse">
//               <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#80f9c8" strokeWidth="0.8"/>
//             </pattern></defs>
//             <rect fill="url(#wd-grid)" width="100%" height="100%"/>
//           </svg>
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
//           <span className="material-symbols-outlined" style={{ fontFamily: "Material Symbols Outlined", fontSize: 13 }}>history</span>
//           Legacy Chatbots
//         </div>
//         <div style={{ padding: "16px 32px", display: "flex", alignItems: "center", gap: "8px", fontFamily: "'Space Grotesk',monospace", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#006c4e", fontWeight: 700 }}>
//           <span className="material-symbols-outlined" style={{ fontFamily: "Material Symbols Outlined", fontSize: 13, color: "#006c4e" }}>bolt</span>
//           Nexov Voice Agents
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

// const Metrics = () => (
//   <section style={{ borderBottom: "1px solid #000", marginTop: "100px" }}>
//     <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
//       {[
//         { val: "90%", label: "Reduction in Wait Times", dark: false },
//         { val: "10K+", label: "Daily Concurrent Calls", dark: true },
//         { val: "<200ms", label: "End-to-End Latency", dark: false },
//       ].map(({ val, label, dark }) => (
//         <div key={label} style={{ padding: "96px 48px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", background: dark ? "#000" : "#fff", borderRight: "1px solid #000" }}>
//           <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(48px,6vw,72px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "16px", color: dark ? "#80f9c8" : "#000" }}>{val}</div>
//           <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: dark ? "rgba(255,255,255,.5)" : "rgba(20,27,43,.5)" }}>{label}</div>
//         </div>
//       ))}
//     </div>
//   </section>
// );

// const Vision = () => (
//   <section style={{ padding: "128px 48px", borderBottom: "1px solid #000", overflow: "hidden", position: "relative" }}>
//     <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
//       <Icon name="format_quote" style={{ fontSize: 48, color: "#006c4e", display: "block", marginBottom: "48px" }} />
//       <blockquote style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 700, textTransform: "uppercase", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "48px" }}>
//         "We believe AI agents will replace repetitive human workflows. We're building the infrastructure for that future."
//       </blockquote>
//       <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>— Nexov Core Vision</div>
//     </div>
//     <div style={{ position: "absolute", bottom: "-80px", left: "-40px", fontFamily: "'Inter',sans-serif", fontSize: "20vw", fontWeight: 900, color: "rgba(0,0,0,.05)", textTransform: "uppercase", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>
//       FUTURE
//     </div>
//   </section>
// );

// const testimonials = [
//   { quote: "The latency is actually unbelievable. We've replaced our entire front-line phone support with Nexov agents and customer satisfaction hasn't dropped a single point.", name: "Sarah Jenkins", role: "CTO, Global Logistics Inc.", stars: 5, dark: false },
//   { quote: "Integrating the API was straightforward. We had a working prototype in three days. The human-like inflection is the best in the industry.", name: "Marcus Thorne", role: "Product Lead, FinTech Pro", stars: 4, dark: true },
//   { quote: "Nexov solved our scalability problem overnight. We can now handle seasonal spikes without hiring temporary staff. Revolutionary for retail.", name: "Elena Rodriguez", role: "Head of Ops, Retail Stream", stars: 5, dark: false },
// ];

// const WallOfLove = () => (
//   <section style={{ borderBottom: "1px solid #000", background: "#fff" }}>
//     <div style={{ borderBottom: "1px solid #000", padding: "48px", textAlign: "center" }}>
//       <h2 style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(40px,6vw,64px)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.04em" }}>Wall of Love</h2>
//     </div>
//     <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
//       {testimonials.map((t) => (
//         <div key={t.name} style={{ padding: "48px", background: t.dark ? "#000" : "#fff", borderRight: "1px solid #000", display: "flex", flexDirection: "column" }}>
//           <div style={{ display: "flex", gap: "4px", marginBottom: "32px" }}>
//             {Array.from({ length: 5 }).map((_, i) => (
//               <div key={i} style={{ width: 16, height: 16, background: i < t.stars ? "#80f9c8" : t.dark ? "rgba(255,255,255,.2)" : "#dce2f7" }} />
//             ))}
//           </div>
//           <blockquote style={{ fontFamily: "'Inter',sans-serif", fontSize: "18px", fontStyle: "italic", lineHeight: 1.6, color: t.dark ? "#fff" : "#141b2b", marginBottom: "48px" }}>
//             "{t.quote}"
//           </blockquote>
//           <div style={{ marginTop: "auto" }}>
//             <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: t.dark ? "#fff" : "#141b2b" }}>{t.name}</div>
//             <div style={{ fontFamily: "'Space Grotesk',monospace", fontSize: "10px", color: t.dark ? "rgba(255,255,255,.5)" : "rgba(20,27,43,.5)", textTransform: "uppercase" }}>{t.role}</div>
//           </div>
//         </div>
//       ))}
//     </div>
//   </section>
// );

// const CTA = () => (
//   <section style={{ borderBottom: "1px solid #000", background: "#6EE7B7" }}>
//     <div style={{ padding: "96px 48px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
//       <h2 style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(40px,7vw,80px)", fontWeight: 900, textTransform: "uppercase", lineHeight: 0.9, letterSpacing: "-0.04em", marginBottom: "48px", maxWidth: "900px" }}>
//         Start Automating Conversations Today
//       </h2>
//       <div style={{ display: "flex", border: "1px solid #000", boxShadow: "8px 8px 0 #000" }}>
//         <button style={{ background: "#000", color: "#fff", padding: "20px 40px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", borderRight: "1px solid #000", cursor: "pointer" }}>
//           Deploy Now
//         </button>
//         <button style={{ background: "transparent", color: "#000", padding: "20px 40px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: "pointer" }}>
//           Talk to an Engineer
//         </button>
//       </div>
//     </div>
//   </section>
// );

// const Footer = () => (
//   <footer style={{ background: "#fff", borderTop: "1px solid #000" }}>
//     <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", padding: "64px 48px", maxWidth: 1440, margin: "0 auto", alignItems: "flex-end" }}>
//       <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
//         <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "20px", fontWeight: 900, textTransform: "uppercase" }}>Nexov AI</div>
//         <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(0,0,0,.4)" }}>
//           © 2024 NEXOV AI — MATHEMATICAL PRECISION IN AGENTIC WORKFLOWS
//         </div>
//       </div>
//       <div style={{ display: "flex", gap: "32px", justifyContent: "flex-end", flexWrap: "wrap" }}>
//         {["Documentation", "Privacy Policy", "System Status", "Twitter/X"].map((link) => (
//           <a key={link} href="#" style={{ fontFamily: "'Inter',sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(0,0,0,.4)", textDecoration: "none" }}>
//             {link}
//           </a>
//         ))}
//       </div>
//     </div>
//   </footer>
// );

// export default function App() {
//   useEffect(() => { injectTailwindConfig(); }, []);

//   return (
//     <>
//       <style>{styles}</style>
//       <Nav />
//       <div style={{ margin: "0 200px", borderLeft: "1px solid #dddddd", borderRight: "1px solid #dddddd" }}>
//         <main style={{ margin: "0 15px", paddingTop: "15px" }}>
//           <Hero />
//           <MarqueeBar />
//           <TalkToAgent />
//           <Mission />
//           <ProductGrid />
//           <LogicFlow />
//           <UseCases />
//           <WhyDifferent />
//           <Metrics />
//           <Vision />
//           <WallOfLove />
//           <CTA />
//         </main>
//       </div>
//       <Footer />
//     </>
//   );
// }

// ------------------------------------------------------------------------------


import { useState, useEffect, useRef } from "react";
import MusicCarousel from "./components/MusicCarousel";

// ─── Grainient (inlined from react-bits) ────────────────────────────────────
const hexToRgb = hex => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 1, 1];
  return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255];
};

const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uTimeSpeed;
uniform float uColorBalance;
uniform float uWarpStrength;
uniform float uWarpFrequency;
uniform float uWarpSpeed;
uniform float uWarpAmplitude;
uniform float uBlendAngle;
uniform float uBlendSoftness;
uniform float uRotationAmount;
uniform float uNoiseScale;
uniform float uGrainAmount;
uniform float uGrainScale;
uniform float uGrainAnimated;
uniform float uContrast;
uniform float uGamma;
uniform float uSaturation;
uniform vec2 uCenterOffset;
uniform float uZoom;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
out vec4 fragColor;
#define S(a,b,t) smoothstep(a,b,t)
mat2 Rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}
vec2 hash(vec2 p){p=vec2(dot(p,vec2(2127.1,81.17)),dot(p,vec2(1269.5,283.37)));return fract(sin(p)*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);float n=mix(mix(dot(-1.0+2.0*hash(i+vec2(0.0,0.0)),f-vec2(0.0,0.0)),dot(-1.0+2.0*hash(i+vec2(1.0,0.0)),f-vec2(1.0,0.0)),u.x),mix(dot(-1.0+2.0*hash(i+vec2(0.0,1.0)),f-vec2(0.0,1.0)),dot(-1.0+2.0*hash(i+vec2(1.0,1.0)),f-vec2(1.0,1.0)),u.x),u.y);return 0.5+0.5*n;}
void mainImage(out vec4 o, vec2 C){
  float t=iTime*uTimeSpeed;
  vec2 uv=C/iResolution.xy;
  float ratio=iResolution.x/iResolution.y;
  vec2 tuv=uv-0.5+uCenterOffset;
  tuv/=max(uZoom,0.001);
  float degree=noise(vec2(t*0.1,tuv.x*tuv.y)*uNoiseScale);
  tuv.y*=1.0/ratio;
  tuv*=Rot(radians((degree-0.5)*uRotationAmount+180.0));
  tuv.y*=ratio;
  float frequency=uWarpFrequency;
  float ws=max(uWarpStrength,0.001);
  float amplitude=uWarpAmplitude/ws;
  float warpTime=t*uWarpSpeed;
  tuv.x+=sin(tuv.y*frequency+warpTime)/amplitude;
  tuv.y+=sin(tuv.x*(frequency*1.5)+warpTime)/(amplitude*0.5);
  vec3 colLav=uColor1;
  vec3 colOrg=uColor2;
  vec3 colDark=uColor3;
  float b=uColorBalance;
  float s=max(uBlendSoftness,0.0);
  mat2 blendRot=Rot(radians(uBlendAngle));
  float blendX=(tuv*blendRot).x;
  float edge0=-0.3-b-s;
  float edge1=0.2-b+s;
  float v0=0.5-b+s;
  float v1=-0.3-b-s;
  vec3 layer1=mix(colDark,colOrg,S(edge0,edge1,blendX));
  vec3 layer2=mix(colOrg,colLav,S(edge0,edge1,blendX));
  vec3 col=mix(layer1,layer2,S(v0,v1,tuv.y));
  vec2 grainUv=uv*max(uGrainScale,0.001);
  if(uGrainAnimated>0.5){grainUv+=vec2(iTime*0.05);}
  float grain=fract(sin(dot(grainUv,vec2(12.9898,78.233)))*43758.5453);
  col+=(grain-0.5)*uGrainAmount;
  col=(col-0.5)*uContrast+0.5;
  float luma=dot(col,vec3(0.2126,0.7152,0.0722));
  col=mix(vec3(luma),col,uSaturation);
  col=pow(max(col,0.0),vec3(1.0/max(uGamma,0.001)));
  col=clamp(col,0.0,1.0);
  o=vec4(col,1.0);
}
void main(){
  vec4 o=vec4(0.0);
  mainImage(o,gl_FragCoord.xy);
  fragColor=o;
}
`;

const Grainient = ({
  timeSpeed = 0.25,
  colorBalance = 0.0,
  warpStrength = 1.0,
  warpFrequency = 5.0,
  warpSpeed = 2.0,
  warpAmplitude = 50.0,
  blendAngle = 0.0,
  blendSoftness = 0.05,
  rotationAmount = 500.0,
  noiseScale = 2.0,
  grainAmount = 0.1,
  grainScale = 2.0,
  grainAnimated = false,
  contrast = 1.5,
  gamma = 1.0,
  saturation = 1.0,
  centerX = 0.0,
  centerY = 0.0,
  zoom = 0.9,
  color1 = '#FF9FFC',
  color2 = '#5227FF',
  color3 = '#B497CF',
  style = {},
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let renderer, raf, ro;

    const init = async () => {
      try {
        const { Renderer, Program, Mesh, Triangle } = await import('ogl');

        renderer = new Renderer({
          webgl: 2,
          alpha: true,
          antialias: false,
          dpr: Math.min(window.devicePixelRatio || 1, 2),
        });

        const gl = renderer.gl;
        const canvas = gl.canvas;
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.display = 'block';
        canvas.style.position = 'absolute';
        canvas.style.inset = '0';

        const container = containerRef.current;
        container.appendChild(canvas);

        const geometry = new Triangle(gl);
        const program = new Program(gl, {
          vertex,
          fragment,
          uniforms: {
            iTime: { value: 0 },
            iResolution: { value: new Float32Array([1, 1]) },
            uTimeSpeed: { value: timeSpeed },
            uColorBalance: { value: colorBalance },
            uWarpStrength: { value: warpStrength },
            uWarpFrequency: { value: warpFrequency },
            uWarpSpeed: { value: warpSpeed },
            uWarpAmplitude: { value: warpAmplitude },
            uBlendAngle: { value: blendAngle },
            uBlendSoftness: { value: blendSoftness },
            uRotationAmount: { value: rotationAmount },
            uNoiseScale: { value: noiseScale },
            uGrainAmount: { value: grainAmount },
            uGrainScale: { value: grainScale },
            uGrainAnimated: { value: grainAnimated ? 1.0 : 0.0 },
            uContrast: { value: contrast },
            uGamma: { value: gamma },
            uSaturation: { value: saturation },
            uCenterOffset: { value: new Float32Array([centerX, centerY]) },
            uZoom: { value: zoom },
            uColor1: { value: new Float32Array(hexToRgb(color1)) },
            uColor2: { value: new Float32Array(hexToRgb(color2)) },
            uColor3: { value: new Float32Array(hexToRgb(color3)) },
          },
        });

        const mesh = new Mesh(gl, { geometry, program });

        const setSize = () => {
          const rect = container.getBoundingClientRect();
          const width = Math.max(1, Math.floor(rect.width));
          const height = Math.max(1, Math.floor(rect.height));
          renderer.setSize(width, height);
          const res = program.uniforms.iResolution.value;
          res[0] = gl.drawingBufferWidth;
          res[1] = gl.drawingBufferHeight;
          renderer.render({ scene: mesh });
        };

        ro = new ResizeObserver(setSize);
        ro.observe(container);
        setSize();

        const t0 = performance.now();
        const loop = t => {
          program.uniforms.iTime.value = (t - t0) * 0.001;
          renderer.render({ scene: mesh });
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
      } catch (err) {
        console.error('Grainient init error:', err);
      }
    };

    init();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      try {
        const canvas = containerRef.current?.querySelector('canvas');
        if (canvas) containerRef.current.removeChild(canvas);
      } catch {}
    };
  }, [
    timeSpeed, colorBalance, warpStrength, warpFrequency, warpSpeed,
    warpAmplitude, blendAngle, blendSoftness, rotationAmount, noiseScale,
    grainAmount, grainScale, grainAnimated, contrast, gamma, saturation,
    centerX, centerY, zoom, color1, color2, color3,
  ]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        ...style,
      }}
    />
  );
};

// ─── App config / styles ────────────────────────────────────────────────────
const injectTailwindConfig = () => {
  if (window.tailwind) {
    window.tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            "secondary": "#006c4e",
            "secondary-container": "#80f9c8",
            "on-secondary-container": "#007353",
            "nexov-mint": "#80f9c8",
            "surface-container-low": "#f1f3ff",
            "surface-container-highest": "#dce2f7",
            "on-surface": "#141b2b",
          },
        },
      },
    };
  }
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=Space+Grotesk:wght@400;500&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', sans-serif; overflow-x: hidden; background: #f4f4f4; color: #141b2b; }

  .material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
    font-size: 20px;
    font-family: 'Material Symbols Outlined';
  }

  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .marquee-track { display: flex; width: max-content; animation: marquee 40s linear infinite; }

  .marquee-item {
    display: flex; align-items: center; justify-content: center;
    padding: 0 64px; height: 80px;
    font-family: 'Inter', sans-serif; font-weight: 400; font-size: 24px;
    letter-spacing: -0.02em; position: relative;
  }
  .marquee-item::after {
    content: ''; position: absolute; right: 0; top: 0; bottom: 0;
    width: 1px; background: linear-gradient(to bottom, transparent, #000 50%, transparent);
  }

  nav a, nav button { cursor: pointer; }

  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
  .animate-pulse { animation: pulse 2s cubic-bezier(.4,0,.6,1) infinite; }
`;

const Icon = ({ name, className = "" }) => (
  <span className={`material-symbols-outlined ${className}`} style={{ fontFamily: "Material Symbols Outlined" }}>
    {name}
  </span>
);

const Nav = () => (
  <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "#f4f4f4", borderBottom: "1px solid #000", width: "100%" }}>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", width: "100%" }}>
      <div style={{ gridColumn: "span 2", borderRight: "1px solid #000", padding: "16px", display: "flex", alignItems: "center" }}>
        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "20px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.04em", lineHeight: 1 }}>
          Nexov<br />AI
        </span>
      </div>
      <div style={{ gridColumn: "span 7", display: "flex", alignItems: "stretch" }}>
        {["INFRASTRUCTURE", "VOICE MODELS", "API DOCS", "PRICING"].map((label) => (
          <a key={label} href="#" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", borderRight: "1px solid #000", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textDecoration: "none", color: "#141b2b", padding: "0 8px", textAlign: "center" }}>
            {label}
          </a>
        ))}
        <div style={{ flex: 2 }} />
      </div>
      <div style={{ gridColumn: "span 3", display: "flex", alignItems: "stretch" }}>
        <div style={{ flex: 1 }} />
        <a href="#" style={{ display: "flex", alignItems: "center", padding: "0 24px", borderLeft: "1px solid #000", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textDecoration: "none", color: "#141b2b" }}>
          LOGIN
        </a>
        <button style={{ background: "#000", color: "#fff", padding: "0 32px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", border: "none", cursor: "pointer", whiteSpace: "nowrap" }}>
          GET STARTED
        </button>
      </div>
    </div>
  </nav>
);

// ─── Hero with Grainient background ─────────────────────────────────────────
const Hero = () => (
  <section style={{
    borderBottom: "1px solid #000",
    overflow: "hidden",
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    position: "relative",
  }}>
    {/* Grainient canvas sits behind all content */}
    <Grainient
      color1="#80f9c8"
      color2="#006c4e"
      color3="#90EE90"
      timeSpeed={0.18}
      colorBalance={0.1}
      warpStrength={1.2}
      warpFrequency={4}
      warpSpeed={1.5}
      warpAmplitude={60}
      blendAngle={20}
      blendSoftness={0.08}
      rotationAmount={400}
      noiseScale={2.5}
      grainAmount={0.08}
      grainScale={2}
      grainAnimated={false}
      contrast={1.4}
      gamma={1}
      saturation={0.9}
      centerX={0}
      centerY={0}
      zoom={0.85}
    />

    {/* Subtle dark overlay so text stays legible */}
    <div style={{
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.35)",
      zIndex: 1,
    }} />

    {/* Content */}
    <div style={{
      position: "relative",
      zIndex: 2,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "96px 48px",
    }}>
      <div style={{
        display: "inline-block",
        border: "1px solid rgba(128,249,200,0.6)",
        background: "rgba(128,249,200,0.1)",
        padding: "4px 12px",
        fontFamily: "'Space Grotesk',monospace",
        fontSize: "10px",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        marginBottom: "32px",
        color: "#80f9c8",
      }}>
        V4.2.0 STABLE RELEASE
      </div>

      <h1 style={{
        fontFamily: "'Inter',sans-serif",
        fontSize: "clamp(48px,8vw,80px)",
        fontWeight: 900,
        textTransform: "uppercase",
        lineHeight: 0.95,
        letterSpacing: "-0.04em",
        marginBottom: "32px",
        color: "#ffffff",
      }}>
        The infrastructure<br />for AI Voice<br />Agents
      </h1>

      <p style={{
        fontFamily: "'Inter',sans-serif",
        fontSize: "18px",
        lineHeight: 1.6,
        color: "rgba(255,255,255,0.75)",
        maxWidth: "480px",
        marginBottom: "48px",
      }}>
        Nexov AI provides the sub-100ms latency, human-like reasoning, and scaleable infrastructure required for enterprise-grade autonomous voice operations.
      </p>

      <div style={{ display: "flex", border: "1px solid rgba(128,249,200,0.6)", boxShadow: "0 0 32px rgba(128,249,200,0.15)" }}>
        <button style={{
          background: "#80f9c8",
          color: "#000",
          padding: "20px 40px",
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          border: "none",
          borderRight: "1px solid rgba(0,0,0,0.2)",
          cursor: "pointer",
        }}>
          Start Building
        </button>
        <button style={{
          background: "transparent",
          color: "#fff",
          padding: "20px 40px",
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          border: "none",
          cursor: "pointer",
        }}>
          View Docs
        </button>
      </div>
    </div>
  </section>
);

const MarqueeBar = () => {
  const LOGOS = ["SALESFORCE", "SLACK", "STRIPE", "GITHUB", "TWILIO", "HUBSPOT"];
  return (
    <section style={{ borderTop: "1px solid #000", borderBottom: "1px solid #000", background: "#fff", overflow: "hidden", height: 80, display: "flex", alignItems: "center" }}>
      <div className="marquee-track">
        {[...LOGOS, ...LOGOS].map((name, i) => (
          <div key={i} className="marquee-item" style={{ textTransform: "uppercase" }}>{name}</div>
        ))}
      </div>
    </section>
  );
};

export const TalkToAgent = () => {
  return <MusicCarousel />;
};

const Mission = () => (
  <section style={{ padding: "96px 48px", borderBottom: "1px solid #000" }}>
    <div style={{ maxWidth: 1440, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(12,1fr)", gap: "24px" }}>
      <div style={{ gridColumn: "span 4", borderLeft: "1px solid #000", paddingLeft: "24px" }}>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(20,27,43,.5)" }}>The Mission</p>
      </div>
      <div style={{ gridColumn: "span 8" }}>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 700, textTransform: "uppercase", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
          We are an AI agents company building a suite of voice-based AI applications designed to automate real-world business operations.
        </p>
      </div>
    </div>
  </section>
);

const products = [
  { icon: "call", title: "Call Handling Agent", desc: "Autonomous inbound and outbound call management with human-level natural language processing.", no: "01" },
  { icon: "calendar_today", title: "Appointment Booking Agent", desc: "Syncs directly with your CRM and calendar to schedule, reschedule, and confirm consultations.", no: "02" },
  { icon: "support_agent", title: "Customer Support Agent", desc: "Instant resolution for Tier 1 and Tier 2 queries across voice and omnichannel interfaces.", no: "03" },
  { icon: "leaderboard", title: "Lead Qualification Agent", desc: "Screens potential customers through intelligent dialogue to ensure high-quality pipeline growth.", no: "04" },
  { icon: "medical_services", title: "Doctor Transcription Tool", desc: "Real-time medical transcription with specialized terminology support and HIPAA compliance.", no: "05" },
];

const ProductCard = ({ icon, title, desc, no }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ borderRight: "1px solid #000", borderTop: parseInt(no) > 3 ? "1px solid #000" : "none", padding: "48px", background: hovered ? "#80f9c8" : "#fff", transition: "background .2s", display: "flex", flexDirection: "column", minHeight: "340px", cursor: "default" }}
    >
      <div style={{ marginBottom: "48px" }}><Icon name={icon} /></div>
      <h3 style={{ fontFamily: "'Inter',sans-serif", fontSize: "32px", fontWeight: 600, textTransform: "uppercase", lineHeight: 1.2, letterSpacing: "-0.01em", marginBottom: "16px" }}>{title}</h3>
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "16px", lineHeight: 1.5, marginBottom: "32px" }}>{desc}</p>
      <div style={{ marginTop: "auto", paddingTop: "32px", borderTop: "1px solid #000" }}>
        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Agent No. {no}</span>
      </div>
    </div>
  );
};

const ProductGrid = () => (
  <section style={{ borderBottom: "1px solid #000" }}>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
      {products.map((p) => <ProductCard key={p.no} {...p} />)}
      <div style={{ borderTop: "1px solid #000", background: "#000", padding: "48px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden", minHeight: "340px" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.2 }}>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="pg" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#80f9c8" strokeWidth=".5" />
            </pattern></defs>
            <rect fill="url(#pg)" width="100%" height="100%" />
          </svg>
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#80f9c8", display: "block", marginBottom: "16px" }}>Infrastructure Node</span>
          {[null, null, null].map((_, i) => (
            <div key={i} style={{ height: 4, width: ["100%", "66%", "75%"][i], background: `rgba(128,249,200,${[.2,.4,.1][i]})`, marginBottom: 8 }} />
          ))}
        </div>
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 8, fontFamily: "'Space Grotesk',monospace", fontSize: "10px", color: "rgba(128,249,200,.6)" }}>
          <span>// GLOBAL_MESH_ACTIVE</span>
          <span>// LATENCY_OPTIMIZED</span>
          <span>// 100% UPTIME_PROTOCOL</span>
        </div>
      </div>
    </div>
  </section>
);

const timelineSteps = [
  { num: "01", label: "UNDERSTANDS", title: "Real-time Audio Processing", desc: "Captures the nuances of human speech and emotional intent with sub-100ms processing cycles.", icon: "settings_voice", align: "right" },
  { num: "02", label: "PROCESSES", title: "Proprietary LLM Analysis", desc: "Multi-layer analysis modules determine context, intent, and the optimal response strategy in parallel.", icon: "neurology", align: "left" },
  { num: "03", label: "EXECUTES", title: "Instant Response Action", desc: "Perform complex operations—booking, routing, or transcribing—within the live call stream seamlessly.", icon: "bolt", align: "right" },
  { num: "04", label: "INTEGRATES", title: "Deep System Sync", desc: "Direct synchronization with CRMs, databases, and enterprise toolchains via high-security API endpoints.", icon: "api", align: "left" },
];

const StepCard = ({ step, align }) => (
  <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", padding: "40px", backdropFilter: "blur(8px)", textAlign: align, maxWidth: 460, width: "100%" }}>
    <div style={{ marginBottom: "24px", display: "flex", justifyContent: align === "right" ? "flex-end" : "flex-start" }}>
      <span className="material-symbols-outlined" style={{ fontSize: 44, color: "#80f9c8", fontFamily: "Material Symbols Outlined" }}>{step.icon}</span>
    </div>
    <div style={{ fontFamily: "'Space Grotesk',monospace", fontSize: "11px", letterSpacing: "0.15em", color: "#80f9c8", marginBottom: "10px", textTransform: "uppercase" }}>
      {step.num}. {step.label}
    </div>
    <h4 style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(20px,2vw,26px)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "16px" }}>
      {step.title}
    </h4>
    <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "16px", lineHeight: 1.7 }}>{step.desc}</p>
  </div>
);

const LogicFlow = () => {
  const trackRef = useRef(null);
  const stepsRef = useRef([]);
  const progressRef = useRef(null);
  const nodeRefs = useRef([]);

  useEffect(() => {
    const handler = () => {
      const track = trackRef.current;
      if (!track || !progressRef.current) return;
      const trackRect = track.getBoundingClientRect();
      const vh = window.innerHeight;
      const traveled = vh / 2 - trackRect.top;
      const pct = Math.max(0, Math.min(1, traveled / trackRect.height));
      progressRef.current.style.transform = `scaleY(${pct})`;
      stepsRef.current.forEach((step, i) => {
        if (!step) return;
        const sr = step.getBoundingClientRect();
        const active = sr.top < vh * 0.62;
        step.style.opacity = active ? "1" : "0.1";
        step.style.transform = active ? "translateY(0)" : "translateY(40px)";
        const node = nodeRefs.current[i];
        if (node) {
          node.style.background = active ? "#80f9c8" : "#000";
          node.style.boxShadow = active ? "0 0 12px rgba(128,249,200,.9)" : "none";
        }
      });
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <section style={{ background: "#000", color: "#fff", display: "flex", flexDirection: "column", backgroundImage: "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)", backgroundSize: "24px 24px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid rgba(255,255,255,.1)", paddingTop: "128px", paddingBottom: "64px" }}>
        <div style={{ textAlign: "center" }}>
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#80f9c8" }}>Architecture</span>
          <h2 style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(36px,4vw,48px)", fontWeight: 700, textTransform: "uppercase", lineHeight: 1.1, letterSpacing: "-0.02em", marginTop: "16px" }}>The Logic Flow</h2>
        </div>
      </div>
      <div ref={trackRef} style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "0 48px 128px", width: "100%" }}>
        <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, transform: "translateX(-50%)", background: "rgba(255,255,255,0.08)", zIndex: 0 }} />
        <div style={{ position: "absolute", left: "50%", top: 0, width: 2, height: "100%", transform: "translateX(-50%)", transformOrigin: "top", zIndex: 1, pointerEvents: "none" }}>
          <div ref={progressRef} style={{ width: "100%", height: "100%", background: "linear-gradient(to bottom, #80f9c8, #00e5a0)", boxShadow: "0 0 18px rgba(128,249,200,0.7)", transformOrigin: "top", transform: "scaleY(0)", transition: "transform 0.25s ease-out" }} />
        </div>
        {timelineSteps.map((step, i) => {
          const isRight = step.align === "right";
          return (
            <div
              key={step.num}
              ref={(el) => (stepsRef.current[i] = el)}
              style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 48px 1fr", alignItems: "center", minHeight: "80vh", paddingTop: "64px", paddingBottom: "64px", opacity: 0.1, transform: "translateY(40px)", transition: "opacity 0.7s cubic-bezier(.16,1,.3,1), transform 0.7s cubic-bezier(.16,1,.3,1)" }}
            >
              <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: "40px" }}>
                {!isRight && <StepCard step={step} align="right" />}
              </div>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex: 10 }}>
                <div ref={(el) => (nodeRefs.current[i] = el)} style={{ width: 14, height: 14, borderRadius: "50%", border: "2px solid #80f9c8", background: "#000", transition: "background 0.4s, box-shadow 0.4s", flexShrink: 0 }} />
              </div>
              <div style={{ paddingLeft: "40px" }}>
                {isRight && <StepCard step={step} align="left" />}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const UseCases = () => (
  <section style={{ borderBottom: "1px solid #000" }}>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gap: "24px", padding: "48px" }}>
      <div style={{ gridColumn: "span 8", background: "#fff", border: "1px solid #000", padding: "32px", display: "flex", flexDirection: "column", justifyContent: "center", minHeight: 300 }}>
        <h2 style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(36px,4vw,48px)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.04em" }}>Applied Intelligence</h2>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "18px", color: "rgba(20,27,43,.6)", marginTop: "16px", maxWidth: 480, lineHeight: 1.6 }}>
          Deploying specialized voice agents across critical industries to optimize workflow and customer experience.
        </p>
      </div>
      {[
        { n: "01", t: "Healthcare", d: "Automated appointment handling and transcription for clinics and hospitals." },
        { n: "02", t: "Real Estate", d: "Lead qualification calls that filter serious buyers from cold traffic." },
      ].map((uc) => (
        <div key={uc.n} style={{ gridColumn: "span 4", background: "#fff", border: "1px solid #000", padding: "32px" }}>
          <div style={{ fontFamily: "'Space Grotesk',monospace", fontSize: "12px", color: "rgba(20,27,43,.3)", marginBottom: "16px" }}>{uc.n}</div>
          <h3 style={{ fontFamily: "'Inter',sans-serif", fontSize: "22px", fontWeight: 600, textTransform: "uppercase", marginBottom: "8px" }}>{uc.t}</h3>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "16px", color: "rgba(20,27,43,.6)", lineHeight: 1.5 }}>{uc.d}</p>
        </div>
      ))}
      <div style={{ gridColumn: "span 4", background: "#fff", border: "1px solid #000", padding: "32px" }}>
        <div style={{ fontFamily: "'Space Grotesk',monospace", fontSize: "12px", color: "rgba(20,27,43,.3)", marginBottom: "16px" }}>03</div>
        <h3 style={{ fontFamily: "'Inter',sans-serif", fontSize: "22px", fontWeight: 600, textTransform: "uppercase", marginBottom: "8px" }}>E-commerce</h3>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "16px", color: "rgba(20,27,43,.6)", lineHeight: 1.5 }}>Order support and tracking updates handled via conversational voice agents.</p>
      </div>
      <div style={{ gridColumn: "span 4", background: "#000", border: "1px solid #000", padding: "32px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", minHeight: 250 }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.1 }}>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="gb" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#80f9c8" strokeWidth=".5" />
            </pattern></defs>
            <rect fill="url(#gb)" width="100%" height="100%" />
          </svg>
        </div>
        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ width: 48, height: 48, border: "1px solid #80f9c8", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <div className="animate-pulse" style={{ width: 24, height: 24, background: "#80f9c8" }} />
          </div>
          <div style={{ fontFamily: "'Space Grotesk',monospace", fontSize: "9px", color: "#80f9c8", textTransform: "uppercase", letterSpacing: "0.2em" }}>Core_v4_Live</div>
        </div>
      </div>
      <div style={{ gridColumn: "span 8", background: "#80f9c8", border: "1px solid #000", padding: "32px" }}>
        <h4 style={{ fontFamily: "'Inter',sans-serif", fontSize: "22px", fontWeight: 600, textTransform: "uppercase", color: "#007353", marginBottom: "8px" }}>Case Study: SaaS</h4>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "16px", color: "rgba(0,115,83,.8)", lineHeight: 1.5, maxWidth: 600 }}>
          90% reduction in customer onboarding friction through proactive agent-led setup calls, resulting in a 15% increase in month-one retention.
        </p>
      </div>
    </div>
  </section>
);

const comparisonRows = [
  { feature: "Response Latency", legacy: ">2,000ms", nexov: "<200ms", detail: "10× faster end-to-end", icon: "speed" },
  { feature: "Reasoning Model", legacy: "Static decision tree", nexov: "Real-time LLM", detail: "Adapts to any conversation", icon: "neurology" },
  { feature: "Interface", legacy: "Text & chat only", nexov: "Voice-first + omnichannel", detail: "Phone, web, API, SMS", icon: "settings_voice" },
  { feature: "CRM Integration", legacy: "Manual export / CSV", nexov: "Live bidirectional sync", detail: "Salesforce, HubSpot & more", icon: "sync_alt" },
  { feature: "Personality", legacy: "Fixed, scripted tone", nexov: "Modular AI personas", detail: "Tune per brand & use-case", icon: "face" },
  { feature: "Scale", legacy: "Limited concurrency", nexov: "10,000+ simultaneous calls", detail: "Auto-scales with demand", icon: "lan" },
];

const ComparisonRow = ({ row, index }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: "1px solid #000", background: hovered ? "#000" : index % 2 === 0 ? "#fff" : "#fafafa", transition: "background 0.2s", cursor: "default" }}
    >
      <div style={{ padding: "28px 32px", borderRight: "1px solid #000", display: "flex", alignItems: "center", gap: "14px" }}>
        <div style={{ width: 36, height: 36, background: hovered ? "rgba(128,249,200,0.12)" : "#f1f3ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.2s" }}>
          <span className="material-symbols-outlined" style={{ fontFamily: "Material Symbols Outlined", fontSize: 18, color: hovered ? "#80f9c8" : "#141b2b", transition: "color 0.2s" }}>{row.icon}</span>
        </div>
        <div>
          <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "13px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: hovered ? "#fff" : "#141b2b", transition: "color 0.2s" }}>{row.feature}</div>
          <div style={{ fontFamily: "'Space Grotesk',monospace", fontSize: "10px", color: hovered ? "rgba(128,249,200,0.7)" : "rgba(20,27,43,0.4)", marginTop: "2px", transition: "color 0.2s" }}>{row.detail}</div>
        </div>
      </div>
      <div style={{ padding: "28px 32px", borderRight: "1px solid " + (hovered ? "rgba(255,255,255,0.1)" : "#000"), display: "flex", alignItems: "center", gap: "12px", transition: "border-color 0.2s" }}>
        <div style={{ width: 22, height: 22, border: "1.5px solid rgba(20,27,43,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span className="material-symbols-outlined" style={{ fontFamily: "Material Symbols Outlined", fontSize: 14, color: "rgba(20,27,43,0.3)" }}>close</span>
        </div>
        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "14px", color: hovered ? "rgba(255,255,255,0.3)" : "rgba(20,27,43,0.4)", textDecoration: "line-through", textDecorationColor: hovered ? "rgba(255,255,255,0.15)" : "rgba(20,27,43,0.2)", transition: "color 0.2s" }}>{row.legacy}</span>
      </div>
      <div style={{ padding: "28px 32px", display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ width: 22, height: 22, background: hovered ? "#80f9c8" : "#141b2b", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.2s" }}>
          <span className="material-symbols-outlined" style={{ fontFamily: "Material Symbols Outlined", fontSize: 14, color: hovered ? "#000" : "#80f9c8", transition: "color 0.2s" }}>check</span>
        </div>
        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "14px", fontWeight: 600, color: hovered ? "#80f9c8" : "#141b2b", transition: "color 0.2s" }}>{row.nexov}</span>
      </div>
    </div>
  );
};

const WhyDifferent = () => (
  <section style={{ border: "1px solid #000", borderTop: "none", background: "#fff", overflow: "hidden" }}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid #000" }}>
      <div style={{ padding: "64px 48px", borderRight: "1px solid #000" }}>
        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(20,27,43,0.4)", marginBottom: "20px" }}>Competitive Analysis</div>
        <h2 style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(52px,6vw,96px)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.04em", lineHeight: 0.92, marginBottom: "28px" }}>Why Our<br />Agents Are<br />Different</h2>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "16px", lineHeight: 1.7, color: "rgba(20,27,43,0.55)", maxWidth: "380px" }}>
          Legacy chatbots were built for text. Nexov was built for the full complexity of live human voice — a fundamentally harder problem, solved.
        </p>
      </div>
      <div style={{ background: "#000", padding: "64px 48px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.06 }}>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="wd-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#80f9c8" strokeWidth="0.8"/>
            </pattern></defs>
            <rect fill="url(#wd-grid)" width="100%" height="100%"/>
          </svg>
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontFamily: "'Space Grotesk',monospace", fontSize: "10px", color: "rgba(128,249,200,0.6)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "16px" }}>Performance delta</div>
          <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(72px,9vw,120px)", fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1, color: "#80f9c8" }}>10×</div>
          <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "18px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "-0.01em", color: "#fff", marginTop: "8px" }}>Faster than legacy</div>
          <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.4)", marginTop: "8px" }}>Sub-200ms vs. industry avg. 2,000ms+</div>
        </div>
        <div style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "32px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0" }}>
          {[{ v: "99.9%", l: "Uptime SLA" }, { v: "SOC2", l: "Compliant" }, { v: "<48h", l: "Deployment" }].map((s, i) => (
            <div key={s.l} style={{ borderRight: i < 2 ? "1px solid rgba(255,255,255,0.1)" : "none", paddingRight: i < 2 ? "16px" : 0, paddingLeft: i > 0 ? "16px" : 0 }}>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(18px,2vw,24px)", fontWeight: 900, letterSpacing: "-0.03em", color: "#fff" }}>{s.v}</div>
              <div style={{ fontFamily: "'Space Grotesk',monospace", fontSize: "9px", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "4px" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid #000", padding: "64px 48px", background: "#fff" }}>
      <div style={{ textAlign: "center", maxWidth: 800 }}>
        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(20,27,43,.5)", marginBottom: "16px" }}>Feature Matrix</div>
        <h3 style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(32px,4vw,48px)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.1, letterSpacing: "-0.04em" }}>Head-to-Head Comparison</h3>
      </div>
    </div>
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: "1px solid #000", borderTop: "1px solid #000", background: "#f9f9ff" }}>
        <div style={{ padding: "16px 32px", borderRight: "1px solid #000", fontFamily: "'Space Grotesk',monospace", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(20,27,43,0.35)" }}>Capability</div>
        <div style={{ padding: "16px 32px", borderRight: "1px solid #000", display: "flex", alignItems: "center", gap: "8px", fontFamily: "'Space Grotesk',monospace", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(20,27,43,0.35)" }}>
          <span className="material-symbols-outlined" style={{ fontFamily: "Material Symbols Outlined", fontSize: 13 }}>history</span>
          Legacy Chatbots
        </div>
        <div style={{ padding: "16px 32px", display: "flex", alignItems: "center", gap: "8px", fontFamily: "'Space Grotesk',monospace", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#006c4e", fontWeight: 700 }}>
          <span className="material-symbols-outlined" style={{ fontFamily: "Material Symbols Outlined", fontSize: 13, color: "#006c4e" }}>bolt</span>
          Nexov Voice Agents
        </div>
      </div>
      {comparisonRows.map((row, i) => <ComparisonRow key={row.feature} row={row} index={i} />)}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 32px", background: "#141b2b", fontFamily: "'Space Grotesk',monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(255,255,255,0.3)" }}>
        {["Architecture: Neural-Flash", "//", "Security: SOC2 Type II", "//", "Regions: 14 Global PoPs", "//", "Latency: <200ms p99"].map((t, i) => (
          <span key={i} style={{ color: t === "//" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.3)" }}>{t}</span>
        ))}
      </div>
    </div>
  </section>
);

const Metrics = () => (
  <section style={{ borderBottom: "1px solid #000", marginTop: "100px" }}>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
      {[
        { val: "90%", label: "Reduction in Wait Times", dark: false },
        { val: "10K+", label: "Daily Concurrent Calls", dark: true },
        { val: "<200ms", label: "End-to-End Latency", dark: false },
      ].map(({ val, label, dark }) => (
        <div key={label} style={{ padding: "96px 48px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", background: dark ? "#000" : "#fff", borderRight: "1px solid #000" }}>
          <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(48px,6vw,72px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "16px", color: dark ? "#80f9c8" : "#000" }}>{val}</div>
          <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: dark ? "rgba(255,255,255,.5)" : "rgba(20,27,43,.5)" }}>{label}</div>
        </div>
      ))}
    </div>
  </section>
);

const Vision = () => (
  <section style={{ padding: "128px 48px", borderBottom: "1px solid #000", overflow: "hidden", position: "relative" }}>
    <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
      <Icon name="format_quote" style={{ fontSize: 48, color: "#006c4e", display: "block", marginBottom: "48px" }} />
      <blockquote style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 700, textTransform: "uppercase", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "48px" }}>
        "We believe AI agents will replace repetitive human workflows. We're building the infrastructure for that future."
      </blockquote>
      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>— Nexov Core Vision</div>
    </div>
    <div style={{ position: "absolute", bottom: "-80px", left: "-40px", fontFamily: "'Inter',sans-serif", fontSize: "20vw", fontWeight: 900, color: "rgba(0,0,0,.05)", textTransform: "uppercase", lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>
      FUTURE
    </div>
  </section>
);

const testimonials = [
  { quote: "The latency is actually unbelievable. We've replaced our entire front-line phone support with Nexov agents and customer satisfaction hasn't dropped a single point.", name: "Sarah Jenkins", role: "CTO, Global Logistics Inc.", stars: 5, dark: false },
  { quote: "Integrating the API was straightforward. We had a working prototype in three days. The human-like inflection is the best in the industry.", name: "Marcus Thorne", role: "Product Lead, FinTech Pro", stars: 4, dark: true },
  { quote: "Nexov solved our scalability problem overnight. We can now handle seasonal spikes without hiring temporary staff. Revolutionary for retail.", name: "Elena Rodriguez", role: "Head of Ops, Retail Stream", stars: 5, dark: false },
];

const WallOfLove = () => (
  <section style={{ borderBottom: "1px solid #000", background: "#fff" }}>
    <div style={{ borderBottom: "1px solid #000", padding: "48px", textAlign: "center" }}>
      <h2 style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(40px,6vw,64px)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.04em" }}>Wall of Love</h2>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
      {testimonials.map((t) => (
        <div key={t.name} style={{ padding: "48px", background: t.dark ? "#000" : "#fff", borderRight: "1px solid #000", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", gap: "4px", marginBottom: "32px" }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} style={{ width: 16, height: 16, background: i < t.stars ? "#80f9c8" : t.dark ? "rgba(255,255,255,.2)" : "#dce2f7" }} />
            ))}
          </div>
          <blockquote style={{ fontFamily: "'Inter',sans-serif", fontSize: "18px", fontStyle: "italic", lineHeight: 1.6, color: t.dark ? "#fff" : "#141b2b", marginBottom: "48px" }}>
            "{t.quote}"
          </blockquote>
          <div style={{ marginTop: "auto" }}>
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: t.dark ? "#fff" : "#141b2b" }}>{t.name}</div>
            <div style={{ fontFamily: "'Space Grotesk',monospace", fontSize: "10px", color: t.dark ? "rgba(255,255,255,.5)" : "rgba(20,27,43,.5)", textTransform: "uppercase" }}>{t.role}</div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const CTA = () => (
  <section style={{ borderBottom: "1px solid #000", background: "#6EE7B7" }}>
    <div style={{ padding: "96px 48px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
      <h2 style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(40px,7vw,80px)", fontWeight: 900, textTransform: "uppercase", lineHeight: 0.9, letterSpacing: "-0.04em", marginBottom: "48px", maxWidth: "900px" }}>
        Start Automating Conversations Today
      </h2>
      <div style={{ display: "flex", border: "1px solid #000", boxShadow: "8px 8px 0 #000" }}>
        <button style={{ background: "#000", color: "#fff", padding: "20px 40px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", borderRight: "1px solid #000", cursor: "pointer" }}>
          Deploy Now
        </button>
        <button style={{ background: "transparent", color: "#000", padding: "20px 40px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: "pointer" }}>
          Talk to an Engineer
        </button>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer style={{ background: "#fff", borderTop: "1px solid #000" }}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", padding: "64px 48px", maxWidth: 1440, margin: "0 auto", alignItems: "flex-end" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "20px", fontWeight: 900, textTransform: "uppercase" }}>Nexov AI</div>
        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(0,0,0,.4)" }}>
          © 2024 NEXOV AI — MATHEMATICAL PRECISION IN AGENTIC WORKFLOWS
        </div>
      </div>
      <div style={{ display: "flex", gap: "32px", justifyContent: "flex-end", flexWrap: "wrap" }}>
        {["Documentation", "Privacy Policy", "System Status", "Twitter/X"].map((link) => (
          <a key={link} href="#" style={{ fontFamily: "'Inter',sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(0,0,0,.4)", textDecoration: "none" }}>
            {link}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default function App() {
  useEffect(() => { injectTailwindConfig(); }, []);

  return (
    <>
      <style>{styles}</style>
      <Nav />
      <div style={{ margin: "0 200px", borderLeft: "1px solid #dddddd", borderRight: "1px solid #dddddd" }}>
        <main style={{ margin: "0 15px", paddingTop: "15px" }}>
          <Hero />
          <MarqueeBar />
          <TalkToAgent />
          <Mission />
          <ProductGrid />
          <LogicFlow />
          <UseCases />
          <WhyDifferent />
          <Metrics />
          <Vision />
          <WallOfLove />
          <CTA />
        </main>
      </div>
      <Footer />
    </>
  );
}