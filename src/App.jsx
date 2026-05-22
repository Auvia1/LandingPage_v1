
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import MusicCarousel from "./components/MusicCarousel";
import Navbar from "./components/Navbar";
import InteractiveMissionDiagram, { ProcessFlow } from "./components/InteractiveMissionDiagram";
import DotGrid from "./components/DotGrid";
import VariableProximity from "./components/VariableProximity";
import { LogicFlow } from "./components/LogicFlow";
import UseCases from "./components/UseCases";
import { WhyDifferent } from "./components/WhyDifferent";
import ScrollFloat from "./components/ScrollFloat";
import WallOfLove from "./components/WallOfLove";
import FullScreenSection from "./components/FullScreenSection";

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
  timeSpeed = 0.25, colorBalance = 0.0, warpStrength = 1.0,
  warpFrequency = 5.0, warpSpeed = 2.0, warpAmplitude = 50.0,
  blendAngle = 0.0, blendSoftness = 0.05, rotationAmount = 500.0,
  noiseScale = 2.0, grainAmount = 0.1, grainScale = 2.0,
  grainAnimated = false, contrast = 1.5, gamma = 1.0, saturation = 1.0,
  centerX = 0.0, centerY = 0.0, zoom = 0.9,
  color1 = '#FF9FFC', color2 = '#5227FF', color3 = '#B497CF', style = {},
}) => {
  const containerRef = useRef(null);
  useEffect(() => {
    if (!containerRef.current) return;
    let renderer, raf, ro;
    const init = async () => {
      try {
        const { Renderer, Program, Mesh, Triangle } = await import('ogl');
        renderer = new Renderer({ webgl: 2, alpha: true, antialias: false, dpr: Math.min(window.devicePixelRatio || 1, 2) });
        const gl = renderer.gl;
        const canvas = gl.canvas;
        canvas.style.cssText = 'width:100%;height:100%;display:block;position:absolute;inset:0;';
        containerRef.current.appendChild(canvas);
        const geometry = new Triangle(gl);
        const program = new Program(gl, {
          vertex, fragment,
          uniforms: {
            iTime: { value: 0 }, iResolution: { value: new Float32Array([1, 1]) },
            uTimeSpeed: { value: timeSpeed }, uColorBalance: { value: colorBalance },
            uWarpStrength: { value: warpStrength }, uWarpFrequency: { value: warpFrequency },
            uWarpSpeed: { value: warpSpeed }, uWarpAmplitude: { value: warpAmplitude },
            uBlendAngle: { value: blendAngle }, uBlendSoftness: { value: blendSoftness },
            uRotationAmount: { value: rotationAmount }, uNoiseScale: { value: noiseScale },
            uGrainAmount: { value: grainAmount }, uGrainScale: { value: grainScale },
            uGrainAnimated: { value: grainAnimated ? 1.0 : 0.0 },
            uContrast: { value: contrast }, uGamma: { value: gamma }, uSaturation: { value: saturation },
            uCenterOffset: { value: new Float32Array([centerX, centerY]) }, uZoom: { value: zoom },
            uColor1: { value: new Float32Array(hexToRgb(color1)) },
            uColor2: { value: new Float32Array(hexToRgb(color2)) },
            uColor3: { value: new Float32Array(hexToRgb(color3)) },
          },
        });
        const mesh = new Mesh(gl, { geometry, program });
        const setSize = () => {
          const rect = containerRef.current.getBoundingClientRect();
          renderer.setSize(Math.max(1, Math.floor(rect.width)), Math.max(1, Math.floor(rect.height)));
          const res = program.uniforms.iResolution.value;
          res[0] = gl.drawingBufferWidth; res[1] = gl.drawingBufferHeight;
          renderer.render({ scene: mesh });
        };
        ro = new ResizeObserver(setSize);
        ro.observe(containerRef.current);
        setSize();
        const t0 = performance.now();
        const loop = t => { program.uniforms.iTime.value = (t - t0) * 0.001; renderer.render({ scene: mesh }); raf = requestAnimationFrame(loop); };
        raf = requestAnimationFrame(loop);
      } catch (err) { console.error('Grainient init error:', err); }
    };
    init();
    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      try { const c = containerRef.current?.querySelector('canvas'); if (c) containerRef.current.removeChild(c); } catch { }
    };
  }, [timeSpeed, colorBalance, warpStrength, warpFrequency, warpSpeed, warpAmplitude, blendAngle, blendSoftness, rotationAmount, noiseScale, grainAmount, grainScale, grainAnimated, contrast, gamma, saturation, centerX, centerY, zoom, color1, color2, color3]);
  return <div ref={containerRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden', ...style }} />;
};

// ─── App config / styles ─────────────────────────────────────────────────────
const injectTailwindConfig = () => {
  if (window.tailwind) {
    window.tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            "secondary": "#006c4e", "secondary-container": "#80f9c8",
            "on-secondary-container": "#007353", "nexov-mint": "#80f9c8",
            "surface-container-low": "#f1f3ff", "surface-container-highest": "#dce2f7",
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

  @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  .marquee-track { display: flex; width: max-content; animation: marquee 40s linear infinite; }
  .marquee-item {
    display: flex; align-items: center; justify-content: center;
    padding: 0 64px; height: 50px;
    font-family: 'Inter', sans-serif; font-weight: 400; font-size: 16px;
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
  <span className={`material-symbols-outlined ${className}`} style={{ fontFamily: "Material Symbols Outlined" }}>{name}</span>
);

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => (
  <motion.section
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
    style={{ borderBottom: "1px solid #000", overflow: "hidden", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", position: "relative" }}>
    <Grainient color1="#80f9c8" color2="#006c4e" color3="#90EE90" timeSpeed={0.2} colorBalance={0.1} warpStrength={1.2} warpFrequency={4} warpSpeed={1.0} warpAmplitude={60} blendAngle={20} blendSoftness={0.08} rotationAmount={400} noiseScale={2.5} grainAmount={0.08} grainScale={2} grainAnimated={false} contrast={1.4} gamma={1} saturation={0.9} centerX={0} centerY={0} zoom={0.85} />
    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 1 }} />
    <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "96px 48px" }}>
      <div style={{ display: "inline-block", border: "1px solid rgba(128,249,200,0.6)", background: "rgba(128,249,200,0.1)", padding: "4px 12px", fontFamily: "'Space Grotesk',monospace", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "32px", color: "#80f9c8" }}>V4.2.0 STABLE RELEASE</div>
      <h1 style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(48px,8vw,80px)", fontWeight: 900, textTransform: "uppercase", lineHeight: 0.95, letterSpacing: "-0.04em", marginBottom: "32px", color: "#ffffff" }}>The infrastructure<br />for AI Voice<br />Agents</h1>
      {/* <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "18px", lineHeight: 1.6, color: "rgba(255,255,255,0.75)", maxWidth: "480px", marginBottom: "48px" }}>Nexov AI provides the sub-100ms latency, human-like reasoning, and scaleable infrastructure required for enterprise-grade autonomous voice operations.</p> */}
      <div style={{ display: "flex", border: "1px solid rgba(128,249,200,0.6)", boxShadow: "0 0 32px rgba(128,249,200,0.15)", borderRadius: "8px", overflow: "hidden" }}>
        <button style={{ background: "#80f9c8", color: "#000", padding: "20px 40px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", borderRight: "1px solid rgba(0,0,0,0.2)", cursor: "pointer", transition: "all 0.3s ease", transform: "none" }} onMouseEnter={(e) => { e.target.style.background = "#5ff3a6"; e.target.style.transform = "scale(1.02)"; }} onMouseLeave={(e) => { e.target.style.background = "#80f9c8"; e.target.style.transform = "scale(1)"; }}>Start Building</button>
        <button style={{ background: "transparent", color: "#fff", padding: "20px 40px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: "pointer", transition: "all 0.3s ease" }} onMouseEnter={(e) => { e.target.style.background = "rgba(128,249,200,0.1)"; }} onMouseLeave={(e) => { e.target.style.background = "transparent"; }}>View Docs</button>
      </div>
    </div>
  </motion.section>
);

const MarqueeBar = () => {
  const LOGOS = ["SALESFORCE", "SLACK", "STRIPE", "GITHUB", "TWILIO", "HUBSPOT"];
  return (
    <section style={{ borderTop: "1px solid #000", borderBottom: "1px solid #000", background: "#fff", overflow: "hidden", height: 50, display: "flex", alignItems: "center", maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" }}>
      <div className="marquee-track">
        {[...LOGOS, ...LOGOS].map((name, i) => (
          <div key={i} className="marquee-item" style={{ textTransform: "uppercase" }}>{name}</div>
        ))}
      </div>
    </section>
  );
};

export const TalkToAgent = () => <MusicCarousel />;

const ScaleInText = ({
  text,
  style,
  className,
  delayOffset = 0
}) => {
  const words = text.split(' ');
  let currentTotalChars = 0;

  return (
    <span style={style} className={className}>
      {words.map((word, wordIdx) => {
        const wordStartOffset = currentTotalChars;
        currentTotalChars += word.length + 1; // +1 for the space

        return (
          <span key={wordIdx} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {word.split('').map((char, charIdx) => (
              <motion.span
                key={charIdx}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{
                  delay: (wordStartOffset + charIdx + delayOffset) * 0.015,
                  type: 'spring',
                  stiffness: 200,
                  damping: 18,
                  mass: 0.6,
                }}
                style={{ display: "inline-block" }}
              >
                {char}
              </motion.span>
            ))}
            {wordIdx < words.length - 1 && (
              <span style={{ display: "inline-block" }}>&nbsp;</span>
            )}
          </span>
        );
      })}
    </span>
  );
};

const Mission = () => {
  const containerRef = useRef(null);

  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
      style={{ padding: "64px 48px", background: "#ffffff", borderRadius: "24px", marginTop: "100px", marginBottom: "40px", border: "1px solid #dddddd" }}>
      <div
        ref={containerRef}
        style={{ maxWidth: 1440, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "start", position: "relative" }}
      >
        {/* Left: ProcessFlow Diagram */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
          <div style={{ background: "transparent", padding: "48px", borderRadius: "8px", width: "100%", maxWidth: "400px" }}>
            <ProcessFlow />
          </div>
        </div>

        {/* Right: Mission Text & Stats */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(20,27,43,.5)", marginBottom: "24px" }}>The Mission</p>

          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(22px, 3vw, 36px)",
            fontWeight: 800,
            textTransform: "uppercase",
            lineHeight: 1.4,
            letterSpacing: "-0.03em",
            color: "#141b2b",
            marginBottom: "32px",
            minHeight: "4em"
          }}>
            <ScaleInText text="We are an AI agents company building a suite of voice-based AI applications designed to " />
            <ScaleInText
              text="automate real-world"
              delayOffset={80}
              style={{ color: "#006c4e", borderBottom: "2.5px solid #80f9c8", paddingBottom: "2px" }}
            />
            <ScaleInText text=" business operations." delayOffset={90} />
          </div>

          <div style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "24px",
            paddingTop: "28px",
            borderTop: "1px solid #000",
          }}>
            {[
              { label: "Founded", val: "2024" },
              { label: "Agents deployed", val: "5+" },
              { label: "Industries served", val: "Healthcare · SaaS · RE" },
              { label: "Infrastructure", val: "14 Global PoPs" },
            ].map((stat, i, arr) => (
              <div key={stat.label} style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
                <span style={{ fontFamily: "'Space Grotesk', monospace", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(20,27,43,0.4)" }}>{stat.label}</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", fontWeight: 700, letterSpacing: "-0.01em", color: "#141b2b" }}>{stat.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};


const products = [
  { icon: "call", title: "Call Handling Agent", desc: "Autonomous inbound and outbound call management with human-level natural language processing.", no: "01" },
  { icon: "calendar_today", title: "Appointment Booking\nAgent", desc: "Syncs directly with your CRM and calendar to schedule, reschedule, and confirm consultations.", no: "02" },
  { icon: "support_agent", title: "Customer Support Agent", desc: "Instant resolution for Tier 1 and Tier 2 queries across voice and omnichannel interfaces.", no: "03" },
  { icon: "leaderboard", title: "Lead Qualification Agent", desc: "Screens potential customers through intelligent dialogue to ensure high-quality pipeline growth.", no: "04" },
  { icon: "medical_services", title: "Doctor Transcription Tool", desc: "Real-time medical transcription with specialized terminology support and HIPAA compliance.", no: "05" },
];

const ProductCard = ({ icon, title, desc, no, index }) => {
  const [hovered, setHovered] = useState(false);
  const [activeBookingIndex, setActiveBookingIndex] = useState(0);
  const [activeCallerIndex, setActiveCallerIndex] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });
  const chatBoxRef = useRef(null);

  const isCallAgent = title.includes("Call Handling");
  const isAppointmentAgent = title.includes("Appointment Booking");
  const isCustomerSupportAgent = title.includes("Customer Support");
  const isLeadQualificationAgent = title.includes("Lead Qualification");
  const isDoctorTranscriptionAgent = title.includes("Doctor Transcription");

  const bookings = [
    { initials: 'SR', name: 'Sarah Reynolds', day: 'Wed', date: 22, time: '10:30 AM' },
    { initials: 'JM', name: 'John Mitchell', day: 'Mon', date: 20, time: '9:00 AM' },
    { initials: 'EW', name: 'Emma Wilson', day: 'Tue', date: 21, time: '2:30 PM' },
    { initials: 'MC', name: 'Michael Chen', day: 'Thu', date: 23, time: '12:00 PM' },
    { initials: 'LT', name: 'Lisa Thompson', day: 'Fri', date: 24, time: '10:30 AM' },
  ];

  const callers = [
    { initials: 'JD', name: 'John Davidson', phone: '+1 (555) 284-9102' },
    { initials: 'AM', name: 'Alice Martinez', phone: '+1 (555) 382-4156' },
    { initials: 'RC', name: 'Robert Chen', phone: '+1 (555) 491-2847' },
    { initials: 'LS', name: 'Lisa Smith', phone: '+1 (555) 627-3891' },
  ];

  useEffect(() => {
    if (isCallAgent) {
      let idx = 0;
      const interval = setInterval(() => {
        setActiveCallerIndex(idx);
        idx = (idx + 1) % callers.length;
      }, 1800);
      return () => clearInterval(interval);
    }
  }, [isCallAgent, callers.length]);

  useEffect(() => {
    if (isCallAgent) {
      const wf = document.getElementById('waveform-card');
      if (wf && !wf.dataset.populated) {
        wf.dataset.populated = 'true';
        const originalHeights = [12, 18, 26, 34, 40, 48, 42, 36, 28, 22, 30, 44, 48, 38, 24, 16, 28, 42, 48, 40, 30, 20, 34, 46, 44, 32, 18, 24, 38, 48, 44, 30, 16, 22, 36, 46, 40, 26, 14, 20, 32, 44, 48, 36, 22, 18, 30, 42, 46, 34];
        const heights = originalHeights.map(h => h * 0.5);
        heights.forEach((h, i) => {
          const b = document.createElement('div');
          b.className = 'bar' + (h < 12.5 ? ' dim' : '');
          b.style.height = h + 'px';
          b.style.animationDelay = (i * 0.04) + 's';
          wf.appendChild(b);
        });
      }
    }
  }, [isCallAgent]);

  useEffect(() => {
    if (isAppointmentAgent) {
      let idx = 0;
      const interval = setInterval(() => {
        setActiveBookingIndex(idx);
        idx = (idx + 1) % bookings.length;
      }, 1800);
      return () => clearInterval(interval);
    }
  }, [isAppointmentAgent, bookings.length]);

  useEffect(() => {
    if (isCustomerSupportAgent && isInView) {
      let frame;
      const startTime = Date.now();
      const scroll = () => {
        if (chatBoxRef.current) {
          chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
        if (Date.now() - startTime < 20000) {
          frame = requestAnimationFrame(scroll);
        }
      };
      frame = requestAnimationFrame(scroll);
      return () => cancelAnimationFrame(frame);
    }
  }, [isCustomerSupportAgent, isInView]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.25, 0.1, 0.25, 1.0]
      }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ border: "none", borderRadius: "24px", padding: "28px", background: hovered ? "#80f9c8" : "#fff", transition: "background .3s ease, transform .3s ease, box-shadow .3s ease", boxShadow: hovered ? "0 20px 40px rgba(0,0,0,0.1)" : "0 4px 20px rgba(0,0,0,0.04)", display: "flex", flexDirection: "column", minHeight: "340px", cursor: "default", overflow: "hidden", position: "relative" }}>

      <div style={{ marginBottom: "16px" }}><Icon name={icon} /></div>

      <h3 style={{ fontFamily: "'Inter',sans-serif", fontSize: "22px", fontWeight: 600, textTransform: "uppercase", lineHeight: 1.3, letterSpacing: "-0.01em", marginBottom: "10px", display: "flex", alignItems: "center" }}>
        <VariableProximity
          label={title}
          fromFontVariationSettings="'wght' 600, 'opsz' 9"
          toFontVariationSettings="'wght' 900, 'opsz' 40"
          containerRef={containerRef}
          radius={100}
          falloff="linear"
        />
      </h3>

      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "13px", color: "rgba(20,27,43,0.8)", lineHeight: 1.5, marginBottom: "16px" }}>
        <VariableProximity
          label={desc}
          fromFontVariationSettings="'wght' 400, 'opsz' 9"
          toFontVariationSettings="'wght' 700, 'opsz' 40"
          containerRef={containerRef}
          radius={100}
          falloff="linear"
        />
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingTop: "12px" }}>

        {isCallAgent && (
          <>
            <style>{`
      .cm-root{
        background:#fff;
        border:1px solid #ececec;
        border-radius:14px;
        padding:14px 14px 12px;
        font-family:'Inter',sans-serif;
        width:100%;
        box-shadow:0 2px 12px rgba(0,0,0,0.05);
        display:flex;
        flex-direction:column;
        gap:10px;
      }

      .cm-header{
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:8px;
      }

      .cm-live-badge{
        display:flex;
        align-items:center;
        gap:5px;
        background:#edfcf4;
        border:1px solid #b8f0d7;
        border-radius:20px;
        padding:4px 10px;
      }

      .cm-live-dot{
        width:5px;
        height:5px;
        border-radius:50%;
        background:#22c693;
        animation:cm-blink 1.4s ease-in-out infinite;
      }

      .cm-live-text{
        font-size:8px;
        font-weight:800;
        color:#006c4e;
        letter-spacing:0.1em;
        text-transform:uppercase;
      }

      .cm-timer{
        font-size:11px;
        font-weight:700;
        color:#9ca3af;
        font-variant-numeric:tabular-nums;
        letter-spacing:0.04em;
      }

      .cm-caller{
        display:flex;
        align-items:center;
        gap:10px;
        background:#f8f9fa;
        border-radius:10px;
        padding:10px;
        animation:cm-fade 0.4s ease-out forwards;
        opacity:0;
      }

      .cm-avatar{
        width:36px;
        height:36px;
        border-radius:50%;
        background:linear-gradient(135deg,#b8f0d7,#58d89b);
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:13px;
        font-weight:800;
        color:#006c4e;
        flex-shrink:0;
        box-shadow:0 2px 6px rgba(34,198,147,0.15);
      }

      .cm-caller-info{
        display:flex;
        flex-direction:column;
        gap:2px;
        flex:1;
      }

      .cm-caller-name{
        font-size:12px;
        font-weight:700;
        color:#111827;
      }

      .cm-caller-num{
        font-size:10px;
        color:#9ca3af;
        font-weight:500;
        letter-spacing:0.02em;
      }

      /* Waveform */

      .cm-wave-wrap{
        width:100%;
        height:34px;
        display:flex;
        align-items:flex-end;
        gap:2px;
        overflow:hidden;
        border-radius:6px;
        padding:0 2px;
      }

      .cm-bar{
        flex:1;
        background:#22c693;
        border-radius:3px 3px 0 0;
        min-height:4px;
        transform-origin:bottom;
        will-change:transform;
        animation:cm-wave 1.2s ease-in-out infinite;
      }

      .cm-bar.d{
        background:#d4f8e8;
        animation:none;
        height:4px !important;
      }

      .cm-stats{
        display:flex;
        align-items:center;
        border-top:1px solid #f0f0f0;
        padding-top:10px;
        gap:0;
      }

      .cm-stat{
        flex:1;
        display:flex;
        flex-direction:column;
        align-items:center;
        gap:2px;
      }

      .cm-stat + .cm-stat{
        border-left:1px solid #f0f0f0;
      }

      .cm-stat-val{
        font-size:13px;
        font-weight:800;
        color:#111827;
      }

      .cm-stat-lbl{
        font-size:8px;
        font-weight:700;
        color:#9ca3af;
        text-transform:uppercase;
        letter-spacing:0.1em;
      }

      .cm-route{
        display:flex;
        align-items:center;
        gap:6px;
        background:#f8f9fa;
        border-radius:8px;
        padding:6px 10px;
      }

      .cm-route-icon{
        width:16px;
        height:16px;
        border-radius:50%;
        background:#22c693;
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:9px;
        flex-shrink:0;
      }

      .cm-route-label{
        font-size:10px;
        color:#374151;
        font-weight:600;
        flex:1;
      }

      .cm-route-badge{
        font-size:8px;
        font-weight:700;
        color:#fff;
        background:#22c693;
        border-radius:4px;
        padding:2px 6px;
        letter-spacing:0.05em;
      }

      @keyframes cm-wave{
        0%,100%{
          transform:scaleY(0.35);
        }
        50%{
          transform:scaleY(1);
        }
      }

      @keyframes cm-blink{
        0%,100%{
          opacity:1;
        }
        50%{
          opacity:0.35;
        }
      }

      @keyframes cm-fade{
        from{
          opacity:0;
          transform:translateY(4px);
        }
        to{
          opacity:1;
          transform:translateY(0);
        }
      }
    `}</style>

            <div className="cm-root">

              {/* Header */}
              <div className="cm-header">
                <div className="cm-live-badge">
                  <div className="cm-live-dot" />
                  <span className="cm-live-text">Live Call</span>
                </div>

                <span className="cm-timer">02:14</span>
              </div>

              {/* Caller */}
              <div className="cm-caller">
                <div className="cm-avatar">
                  {callers[activeCallerIndex].initials}
                </div>

                <div className="cm-caller-info">
                  <span className="cm-caller-name">
                    {callers[activeCallerIndex].name}
                  </span>

                  <span className="cm-caller-num">
                    {callers[activeCallerIndex].phone}
                  </span>
                </div>
              </div>

              {/* Waveform */}
              <div className="cm-wave-wrap">

                {[
                  40, 55, 30, 70, 85, 60, 45, 75, 90, 55,
                  35, 65, 80, 50, 40, 70, 85, 55, 30, 60,
                  75, 45, 65, 80, 50, 35, 70, 90, 55, 40
                ].map((h, i) => (
                  <div
                    key={i}
                    className={`cm-bar${h < 42 ? ' d' : ''}`}
                    style={{
                      height: h * 0.42 + 'px',
                      animationDelay: (i * 0.05) + 's'
                    }}
                  />
                ))}

              </div>

              {/* Route */}
              <div className="cm-route">
                <div className="cm-route-icon">☎</div>

                <span className="cm-route-label">
                  Inbound → Support Queue
                </span>

                <span className="cm-route-badge">
                  AI HANDLING
                </span>
              </div>

              {/* Stats */}
              <div className="cm-stats">

                <div className="cm-stat">
                  <span className="cm-stat-val">1,248</span>
                  <span className="cm-stat-lbl">Calls Today</span>
                </div>

                <div className="cm-stat">
                  <span className="cm-stat-val">98%</span>
                  <span className="cm-stat-lbl">Resolved</span>
                </div>

                <div className="cm-stat">
                  <span className="cm-stat-val">&lt;1.2s</span>
                  <span className="cm-stat-lbl">Response</span>
                </div>

              </div>
            </div>
          </>
        )}

        {isAppointmentAgent && (
          <>
            <style>{`
              .bk-root{background:#fff;border:1px solid #ececec;border-radius:14px;padding:14px 14px 12px;font-family:'Inter',sans-serif;width:100%;box-shadow:0 2px 12px rgba(0,0,0,0.05);display:flex;flex-direction:column;gap:10px;}
              .bk-header{display:flex;align-items:center;justify-content:space-between;}
              .bk-month{font-size:11px;font-weight:800;color:#111827;letter-spacing:-0.01em;}
              .bk-sync{display:flex;align-items:center;gap:4px;background:#edfcf4;border:1px solid #b8f0d7;border-radius:20px;padding:2px 8px;}
              .bk-sync-dot{width:5px;height:5px;border-radius:50%;background:#22c693;animation:bk-blink 1.4s ease-in-out infinite;}
              .bk-sync-text{font-size:8px;font-weight:800;color:#006c4e;letter-spacing:0.1em;text-transform:uppercase;}
              .bk-days{display:flex;gap:4px;}
              .bk-day{flex:1;min-width:0;border-radius:10px;height:52px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;border:1px solid transparent;transition:0.18s ease;}
              .bk-day:hover{background:#f6f6f6;}
              .bk-day-name{font-size:8px;font-weight:700;color:#9ca3af;letter-spacing:0.5px;margin-bottom:3px;}
              .bk-day-num{font-size:17px;font-weight:800;color:#111827;line-height:1;}
              .bk-active{background:#dff9ee;border-color:#b8f0d7;}
              .bk-active .bk-day-name{color:#006c4e;}
              .bk-active .bk-day-num{color:#006c4e;}
              .bk-times{display:flex;gap:5px;}
              .bk-time{flex:1;height:30px;border:1px solid #e5e7eb;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#374151;background:white;cursor:pointer;transition:0.18s ease;letter-spacing:0.3px;}
              .bk-time:hover{border-color:#b8f0d7;}
              .bk-time-active{background:#f0fdf4;border-color:#b8f0d7;color:#006c4e;}
              .bk-confirmed{display:flex;align-items:center;gap:8px;background:#f8f9fa;border-radius:10px;padding:8px 10px;}
              .bk-conf-avatar{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#b8f0d7,#58d89b);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:#006c4e;flex-shrink:0;}
              .bk-conf-info{flex:1;display:flex;flex-direction:column;gap:1px;}
              .bk-conf-name{font-size:11px;font-weight:700;color:#111827;}
              .bk-conf-time{font-size:9px;color:#9ca3af;font-weight:500;}
              .bk-conf-badge{font-size:8px;font-weight:800;color:#006c4e;background:#dff9ee;border:1px solid #b8f0d7;border-radius:4px;padding:2px 6px;white-space:nowrap;}
              .bk-stats{display:flex;align-items:center;border-top:1px solid #f0f0f0;padding-top:10px;gap:0;}
              .bk-stat{flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;}
              .bk-stat+.bk-stat{border-left:1px solid #f0f0f0;}
              .bk-stat-val{font-size:13px;font-weight:800;color:#111827;}
              .bk-stat-lbl{font-size:8px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.1em;}
              @keyframes bk-blink{0%,100%{opacity:1}50%{opacity:0.35}}
            `}</style>
            <div className="bk-root">
              {/* Header */}
              <div className="bk-header">
                <span className="bk-month">May 2026</span>
                <div className="bk-sync">
                  <div className="bk-sync-dot" />
                  <span className="bk-sync-text">CRM Synced</span>
                </div>
              </div>

              {/* Day picker */}
              <div className="bk-days">
                {[{ d: 'MON', n: 20 }, { d: 'TUE', n: 21 }, { d: 'WED', n: 22 }, { d: 'THU', n: 23 }, { d: 'FRI', n: 24 }].map(({ d, n }) => (
                  <div key={n} className={`bk-day${n === bookings[activeBookingIndex].date ? ' bk-active' : ''}`}>
                    <span className="bk-day-name">{d}</span>
                    <span className="bk-day-num">{n}</span>
                  </div>
                ))}
              </div>

              {/* Time slots */}
              <div className="bk-times">
                {['9:00 AM', '10:30 AM', '12:00 PM', '2:30 PM'].map((t, i) => (
                  <div key={t} className={`bk-time${t === bookings[activeBookingIndex].time ? ' bk-time-active' : ''}`}>{t}</div>
                ))}
              </div>

              {/* Confirmed booking */}
              <div className="bk-confirmed">
                <div className="bk-conf-avatar">{bookings[activeBookingIndex].initials}</div>
                <div className="bk-conf-info">
                  <span className="bk-conf-name">{bookings[activeBookingIndex].name}</span>
                  <span className="bk-conf-time">{bookings[activeBookingIndex].day} {bookings[activeBookingIndex].date} · {bookings[activeBookingIndex].time} · 30 min</span>
                </div>
                <span className="bk-conf-badge">✓ BOOKED</span>
              </div>

              {/* Stats bar */}
              <div className="bk-stats">
                <div className="bk-stat">
                  <span className="bk-stat-val">847</span>
                  <span className="bk-stat-lbl">Booked</span>
                </div>
                <div className="bk-stat">
                  <span className="bk-stat-val">3%</span>
                  <span className="bk-stat-lbl">No-show</span>
                </div>
                <div className="bk-stat">
                  <span className="bk-stat-val">&lt;30s</span>
                  <span className="bk-stat-lbl">Book Time</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* {isCustomerSupportAgent && (
          <>
            <style>{`
              .c-root{background:#fff;border:1px solid #ececec;border-radius:14px;padding:16px;font-family:'Inter',sans-serif;width:100%;height:100%;box-shadow:0 2px 12px rgba(0,0,0,0.05);display:flex;flex-direction:column;gap:12px;box-sizing:border-box;}
              .c-header{display:flex;align-items:center;justify-content:space-between;padding-bottom:8px;border-bottom:1px solid #f0f0f0;}
              .c-agent{display:flex;align-items:center;gap:8px;}
              .c-avatar{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#b8f0d7,#58d89b);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:#006c4e;flex-shrink:0;box-shadow:0 2px 6px rgba(34,198,147,0.15);}
              .c-agent-info{display:flex;flex-direction:column;gap:1px;}
              .c-agent-name{font-size:12px;font-weight:700;color:#111827;}
              .c-agent-status{font-size:10px;color:#22c693;font-weight:600;}
              .c-channel{display:flex;align-items:center;gap:5px;background:#f0f7ff;border:1px solid #bfdbfe;border-radius:20px;padding:4px 10px;}
              .c-channel-dot{width:6px;height:6px;border-radius:50%;background:#3b82f6;animation:c-blink 1.4s ease-in-out infinite;}
              .c-channel-text{font-size:9px;font-weight:700;color:#3b82f6;letter-spacing:0.1em;text-transform:uppercase;}
              .c-chat-box{display:flex;flex-direction:column;gap:10px;background:#f8f9fa;border-radius:10px;padding:12px;border:1px solid #f0f0f0;flex:1;overflow-y:auto;min-height:80px;}
              .c-message{max-width:85%;padding:9px 12px;border-radius:8px;font-size:12px;font-weight:500;line-height:1.5;color:#374151;word-wrap:break-word;}
              .c-user{background:#fff;border:1px solid #e5e7eb;align-self:flex-start;border-bottom-left-radius:2px;box-shadow:0 1px 3px rgba(0,0,0,0.05);}
              .c-bot-row{display:flex;align-items:flex-end;gap:6px;align-self:flex-end;}
              .c-bot{background:#22c693;color:#fff;border-bottom-right-radius:2px;box-shadow:0 2px 8px rgba(34,198,147,0.2);}
              .c-wave{display:flex;align-items:center;gap:1.5px;height:14px;}
              .c-wave span{width:2px;background:#22c693;border-radius:10px;animation:c-wave-anim 1s infinite ease-in-out;}
              .c-wave span:nth-child(1){height:6px;animation-delay:0s;}
              .c-wave span:nth-child(2){height:10px;animation-delay:0.1s;}
              .c-wave span:nth-child(3){height:14px;animation-delay:0.2s;}
              .c-wave span:nth-child(4){height:8px;animation-delay:0.3s;}
              .c-wave span:nth-child(5){height:4px;animation-delay:0.4s;}
              .c-stats{display:flex;align-items:center;justify-content:space-between;border-top:1px solid #f0f0f0;padding-top:12px;gap:8px;}
              .c-stat{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;padding:0 8px;}
              .c-stat:not(:last-child){border-right:1px solid #f0f0f0;}
              .c-stat-val{font-size:14px;font-weight:800;color:#111827;}
              .c-stat-lbl{font-size:8px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.15em;}
              @keyframes c-wave-anim{0%,100%{transform:scaleY(0.4);opacity:0.6;}50%{transform:scaleY(1);opacity:1;}}
              @keyframes c-blink{0%,100%{opacity:1}50%{opacity:0.4}}
            `}</style>
            <div className="c-root">
              <div className="c-header">
                <div className="c-agent">
                  <div className="c-avatar">AI</div>
                  <div className="c-agent-info">
                    <span className="c-agent-name">Support Agent</span>
                    <span className="c-agent-status">Online</span>
                  </div>
                </div>
                <div className="c-channel">
                  <div className="c-channel-dot"></div>
                  <span className="c-channel-text">Omnichannel</span>
                </div>
              </div>
              <div className="c-chat-box">
                <div className="c-message c-user">I need help with my appointment.</div>
                <div className="c-bot-row">
                  <div className="c-message c-bot">Sure, I can help you with that.</div>
                </div>
              </div>
              <div className="c-stats">
                <div className="c-stat">
                  <span className="c-stat-val">1,248</span>
                  <span className="c-stat-lbl">Resolved</span>
                </div>
                <div className="c-stat">
                  <span className="c-stat-val">98%</span>
                  <span className="c-stat-lbl">CSAT</span>
                </div>
                <div className="c-stat">
                  <span className="c-stat-val">&lt;1.2s</span>
                  <span className="c-stat-lbl">Response</span>
                </div>
              </div>
            </div>
          </>
        )} */}

        {isCustomerSupportAgent && (
          <>
            <style>{`
      .c-root{
        background:#fff;
        border:1px solid #ececec;
        border-radius:14px;
        padding:16px;
        font-family:'Inter',sans-serif;
        width:100%;
        box-shadow:0 2px 12px rgba(0,0,0,0.05);
        display:flex;
        flex-direction:column;
        gap:12px;
        box-sizing:border-box;
        overflow:hidden;
        max-height:300px;
        min-height:300px;
        
      }

      .c-header{
        display:flex;
        align-items:center;
        justify-content:space-between;
        padding-bottom:8px;
        border-bottom:1px solid #f0f0f0;
        flex-shrink:0;
      }

      .c-agent{
        display:flex;
        align-items:center;
        gap:8px;
      }

      .c-avatar{
        width:32px;
        height:32px;
        border-radius:50%;
        background:linear-gradient(135deg,#b8f0d7,#58d89b);
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:12px;
        font-weight:800;
        color:#006c4e;
        flex-shrink:0;
        box-shadow:0 2px 6px rgba(34,198,147,0.15);
      }

      .c-agent-info{
        display:flex;
        flex-direction:column;
        gap:1px;
      }

      .c-agent-name{
        font-size:12px;
        font-weight:700;
        color:#111827;
      }

      .c-agent-status{
        font-size:10px;
        color:#22c693;
        font-weight:600;
      }

      .c-channel{
        display:flex;
        align-items:center;
        gap:5px;
        background:#f0f7ff;
        border:1px solid #bfdbfe;
        border-radius:20px;
        padding:4px 10px;
      }

      .c-channel-dot{
        width:6px;
        height:6px;
        border-radius:50%;
        background:#3b82f6;
        animation:c-blink 1.4s ease-in-out infinite;
      }

      .c-channel-text{
        font-size:9px;
        font-weight:700;
        color:#3b82f6;
        letter-spacing:0.1em;
        text-transform:uppercase;
      }

      .c-chat-box{
        overflow-x:hidden;
        display:flex;
        flex-direction:column;
        padding-right:4px;
        overflow-y:auto;
        max-height:100%;
      }

      .c-chat-box::-webkit-scrollbar{
        width:4px;
      }

      .c-chat-box::-webkit-scrollbar-thumb{
        background:#d1d5db;
        border-radius:20px;
      }

      .c-message-wrap{
        display:flex;
        width:100%;
        padding-top:10px;
      }

      .c-chat-box > div:first-child .c-message-wrap {
        padding-top:0;
      }

      .c-user-wrap{
        justify-content:flex-start;
      }

      .c-bot-wrap{
        justify-content:flex-end;
      }

      .c-row{
        display:flex;
        align-items:flex-end;
        gap:6px;
      }

      .c-message{
        max-width:82%;
        padding:10px 13px;
        border-radius:10px;
        font-size:12px;
        font-weight:500;
        line-height:1.5;
        word-wrap:break-word;
      }

      .c-user{
        background:#fff;
        border:1px solid #e5e7eb;
        color:#374151;
        border-bottom-left-radius:2px;
        box-shadow:0 1px 3px rgba(0,0,0,0.05);
      }

      .c-bot{
        background:#22c693;
        color:#fff;
        border-bottom-right-radius:2px;
        box-shadow:0 2px 8px rgba(34,198,147,0.2);
      }

      .c-typing{
        display:flex;
        align-items:center;
        gap:4px;
        padding:10px 12px;
        border-radius:10px;
        width:max-content;
      }

      .c-bot-typing{
        background:#22c693;
      }

      .c-typing span{
        width:5px;
        height:5px;
        border-radius:50%;
        background:#fff;
        animation:c-dot 1s infinite ease-in-out;
      }

      .c-typing span:nth-child(2){
        animation-delay:0.15s;
      }

      .c-typing span:nth-child(3){
        animation-delay:0.3s;
      }

      .c-wave{
        display:flex;
        align-items:flex-end;
        gap:1.5px;
        height:14px;
      }

      .c-wave span{
        width:2px;
        background:#22c693;
        border-radius:10px 10px 0 0;
        transform-origin:bottom;
        animation:c-wave-anim 1s infinite ease-in-out;
      }

      .c-wave span:nth-child(1){
        height:5px;
        animation-delay:0s;
      }

      .c-wave span:nth-child(2){
        height:9px;
        animation-delay:0.1s;
      }

      .c-wave span:nth-child(3){
        height:13px;
        animation-delay:0.2s;
      }

      .c-wave span:nth-child(4){
        height:8px;
        animation-delay:0.3s;
      }

      .c-wave span:nth-child(5){
        height:4px;
        animation-delay:0.4s;
      }

      .c-seq, .c-msg-seq, .c-typing-seq {
        opacity:0;
        max-height:0;
        overflow:hidden;
      }

      .c-seq{
        transform:translateY(12px) scale(0.96);
        animation:c-show 0.6s cubic-bezier(.22,1,.36,1) forwards;
      }

      .c-typing-seq{
        animation:
          c-show 0.4s ease forwards,
          c-hide 0.3s ease forwards;
        animation-delay:var(--show-delay), var(--hide-delay);
      }

      .c-msg-seq{
        transform:translateY(12px) scale(0.96);
        animation:c-show 0.6s cubic-bezier(.22,1,.36,1) forwards;
        animation-delay:var(--msg-delay);
      }

      .c-stats{
        display:flex;
        align-items:center;
        justify-content:space-between;
        border-top:1px solid #f0f0f0;
        padding-top:12px;
        gap:8px;
        flex-shrink:0;
      }

      .c-stat{
        flex:1;
        display:flex;
        flex-direction:column;
        align-items:center;
        gap:3px;
        padding:0 8px;
      }

      .c-stat:not(:last-child){
        border-right:1px solid #f0f0f0;
      }

      .c-stat-val{
        font-size:14px;
        font-weight:800;
        color:#111827;
      }

      .c-stat-lbl{
        font-size:8px;
        font-weight:700;
        color:#9ca3af;
        text-transform:uppercase;
        letter-spacing:0.15em;
      }

      @keyframes c-show{
        0%{
          opacity:0;
          transform:translateY(12px) scale(0.96);
          max-height:0;
        }
        40%{
          max-height:200px;
        }
        100%{
          opacity:1;
          transform:translateY(0) scale(1);
          max-height:200px;
          overflow:visible;
        }
      }

      @keyframes c-hide{
        from{
          opacity:1;
          transform:scale(1);
          max-height:60px;
        }
        to{
          opacity:0;
          transform:scale(0.9);
          max-height:0;
          margin:0;
          overflow:hidden;
        }
      }

      @keyframes c-dot{
        0%,80%,100%{
          transform:scale(0.7);
          opacity:0.4;
        }
        40%{
          transform:scale(1);
          opacity:1;
        }
      }

      @keyframes c-wave-anim{
        0%,100%{
          transform:scaleY(0.45);
          opacity:0.6;
        }
        50%{
          transform:scaleY(1);
          opacity:1;
        }
      }

      @keyframes c-blink{
        0%,100%{opacity:1}
        50%{opacity:0.4}
      }
    `}</style>

            <div className="c-root">

              <div className="c-header">
                <div className="c-agent">
                  <div className="c-avatar">AI</div>

                  <div className="c-agent-info">
                    <span className="c-agent-name">Support Agent</span>
                    <span className="c-agent-status">Online</span>
                  </div>
                </div>

                <div className="c-channel">
                  <div className="c-channel-dot"></div>
                  <span className="c-channel-text">Omnichannel</span>
                </div>
              </div>

              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 0 }}>
                <div className="c-chat-box" ref={chatBoxRef}>
                  {isInView && (
                    <>

                      {/* 1 */}
                      <div className="c-seq" style={{ animationDelay: "0.5s" }}>
                        <div className="c-message-wrap c-user-wrap">
                          <div className="c-message c-user">
                            Hi, my KYC verification failed.
                          </div>
                        </div>
                      </div>

                      {/* typing */}
                      <div
                        className="c-typing-seq"
                        style={{
                          "--show-delay": "1.8s",
                          "--hide-delay": "2.7s"
                        }}
                      >
                        <div className="c-message-wrap c-bot-wrap">
                          <div className="c-typing c-bot-typing">
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                        </div>
                      </div>

                      {/* 2 */}
                      <div
                        className="c-msg-seq"
                        style={{
                          "--msg-delay": "3s"
                        }}
                      >
                        <div className="c-message-wrap c-bot-wrap">
                          <div className="c-row">

                            <div className="c-message c-bot">
                              Sorry about that. Which step failed?
                            </div>

                          </div>
                        </div>
                      </div>

                      {/* 3 */}
                      <div className="c-seq" style={{ animationDelay: "4.4s" }}>
                        <div className="c-message-wrap c-user-wrap">
                          <div className="c-message c-user">
                            Face verification.
                          </div>
                        </div>
                      </div>

                      {/* typing */}
                      <div
                        className="c-typing-seq"
                        style={{
                          "--show-delay": "5.4s",
                          "--hide-delay": "6.3s"
                        }}
                      >
                        <div className="c-message-wrap c-bot-wrap">
                          <div className="c-typing c-bot-typing">
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                        </div>
                      </div>

                      {/* 4 */}
                      <div
                        className="c-msg-seq"
                        style={{
                          "--msg-delay": "6.6s"
                        }}
                      >
                        <div className="c-message-wrap c-bot-wrap">
                          <div className="c-row">

                            <div className="c-message c-bot">
                              Please retry in good lighting without glasses.
                            </div>

                          </div>
                        </div>
                      </div>

                      {/* 5 */}
                      <div className="c-seq" style={{ animationDelay: "8s" }}>
                        <div className="c-message-wrap c-user-wrap">
                          <div className="c-message c-user">
                            Still not working.
                          </div>
                        </div>
                      </div>

                      {/* typing */}
                      <div
                        className="c-typing-seq"
                        style={{
                          "--show-delay": "9s",
                          "--hide-delay": "9.9s"
                        }}
                      >
                        <div className="c-message-wrap c-bot-wrap">
                          <div className="c-typing c-bot-typing">
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                        </div>
                      </div>

                      {/* 6 */}
                      <div
                        className="c-msg-seq"
                        style={{
                          "--msg-delay": "10.2s"
                        }}
                      >
                        <div className="c-message-wrap c-bot-wrap">
                          <div className="c-row">

                            <div className="c-message c-bot">
                              I’ll escalate this for manual review.
                            </div>

                          </div>
                        </div>
                      </div>

                      {/* 7 */}
                      <div className="c-seq" style={{ animationDelay: "11.8s" }}>
                        <div className="c-message-wrap c-user-wrap">
                          <div className="c-message c-user">
                            Okay, thanks.
                          </div>
                        </div>
                      </div>

                      {/* typing */}
                      <div
                        className="c-typing-seq"
                        style={{
                          "--show-delay": "12.8s",
                          "--hide-delay": "13.7s"
                        }}
                      >
                        <div className="c-message-wrap c-bot-wrap">
                          <div className="c-typing c-bot-typing">
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                        </div>
                      </div>

                      {/* 8 */}
                      <div
                        className="c-msg-seq"
                        style={{
                          "--msg-delay": "14s"
                        }}
                      >
                        <div className="c-message-wrap c-bot-wrap">
                          <div className="c-row">

                            <div className="c-message c-bot">
                              You’re welcome.
                            </div>

                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="c-stats">

                  <div className="c-stat">
                    <span className="c-stat-val">1,248</span>
                    <span className="c-stat-lbl">Resolved</span>
                  </div>

                  <div className="c-stat">
                    <span className="c-stat-val">98%</span>
                    <span className="c-stat-lbl">CSAT</span>
                  </div>

                  <div className="c-stat">
                    <span className="c-stat-val">&lt;1.2s</span>
                    <span className="c-stat-lbl">Response</span>
                  </div>

                </div>
              </div>

            </div>
          </>
        )}

        {isLeadQualificationAgent && (
          <>
            <style>{`
              .lq-root{background:#fff;border:1px solid #ececec;border-radius:14px;padding:14px 14px 12px;font-family:'Inter',sans-serif;width:100%;box-shadow:0 2px 12px rgba(0,0,0,0.05);display:flex;flex-direction:column;gap:10px;}
              .lq-header{display:flex;align-items:center;justify-content:space-between;}
              .lq-title{font-size:11px;font-weight:800;color:#111827;letter-spacing:-0.01em;}
              .lq-badge{display:flex;align-items:center;gap:4px;background:#edfcf4;border:1px solid #b8f0d7;border-radius:20px;padding:2px 8px;}
              .lq-badge-dot{width:5px;height:5px;border-radius:50%;background:#22c693;animation:lq-blink 1.4s ease-in-out infinite;}
              .lq-badge-text{font-size:8px;font-weight:800;color:#006c4e;letter-spacing:0.1em;text-transform:uppercase;}
              .lq-funnel{display:flex;flex-direction:column;gap:6px;}
              .lq-stage{display:flex;align-items:center;gap:8px;}
              .lq-label{font-size:9px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.08em;width:68px;flex-shrink:0;}
              .lq-bar-track{flex:1;height:22px;background:#f3f4f6;border-radius:6px;overflow:hidden;position:relative;}
              .lq-bar-fill{height:100%;border-radius:6px;display:flex;align-items:center;padding-left:8px;font-size:10px;font-weight:700;color:#fff;white-space:nowrap;transition:width 0.6s ease;}
              .lq-count{font-size:11px;font-weight:800;color:#111827;width:40px;text-align:right;flex-shrink:0;}
              .lq-lead-card{display:flex;align-items:center;gap:8px;background:#f8f9fa;border-radius:10px;padding:7px 10px;}
              .lq-lead-avatar{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#b8f0d7,#58d89b);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:#006c4e;flex-shrink:0;}
              .lq-lead-info{flex:1;display:flex;flex-direction:column;gap:1px;}
              .lq-lead-name{font-size:11px;font-weight:700;color:#111827;}
              .lq-lead-src{font-size:9px;color:#9ca3af;font-weight:500;}
              .lq-score{display:flex;align-items:center;gap:4px;}
              .lq-score-val{font-size:12px;font-weight:800;color:#22c693;}
              .lq-score-lbl{font-size:8px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;}
              .lq-stats{display:flex;align-items:center;border-top:1px solid #f0f0f0;padding-top:10px;gap:0;}
              .lq-stat{flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;}
              .lq-stat+.lq-stat{border-left:1px solid #f0f0f0;}
              .lq-stat-val{font-size:13px;font-weight:800;color:#111827;}
              .lq-stat-lbl{font-size:8px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.1em;}
              @keyframes lq-blink{0%,100%{opacity:1}50%{opacity:0.35}}
            `}</style>
            <div className="lq-root">
              {/* Header */}
              <div className="lq-header">
                <span className="lq-title">Lead Pipeline</span>
                <div className="lq-badge">
                  <div className="lq-badge-dot" />
                  <span className="lq-badge-text">AI Scoring</span>
                </div>
              </div>

              {/* Funnel stages */}
              <div className="lq-funnel">
                {[
                  { label: 'New Leads', count: '2,346', pct: '100%', color: '#22c693' },
                  { label: 'Qualified', count: '842', pct: '36%', color: '#16a97f' },
                  { label: 'Sales Ready', count: '278', pct: '12%', color: '#0d7a5f' },
                ].map(({ label, count, pct, color }) => (
                  <div key={label} className="lq-stage">
                    <span className="lq-label">{label}</span>
                    <div className="lq-bar-track">
                      <div className="lq-bar-fill" style={{ width: pct, background: color }}>{pct}</div>
                    </div>
                    <span className="lq-count">{count}</span>
                  </div>
                ))}
              </div>

              {/* Top lead chip */}
              <div className="lq-lead-card">
                <div className="lq-lead-avatar">MK</div>
                <div className="lq-lead-info">
                  <span className="lq-lead-name">Marcus Klein</span>
                  <span className="lq-lead-src">Inbound call · Enterprise SaaS</span>
                </div>
                <div className="lq-score">
                  <span className="lq-score-val">94</span>
                  <span className="lq-score-lbl">Score</span>
                </div>
              </div>

              {/* Stats bar */}
              <div className="lq-stats">
                <div className="lq-stat">
                  <span className="lq-stat-val">2,346</span>
                  <span className="lq-stat-lbl">Leads</span>
                </div>
                <div className="lq-stat">
                  <span className="lq-stat-val">36%</span>
                  <span className="lq-stat-lbl">Qualified</span>
                </div>
                <div className="lq-stat">
                  <span className="lq-stat-val">12%</span>
                  <span className="lq-stat-lbl">Sales Ready</span>
                </div>
              </div>
            </div>
          </>
        )}

        {isDoctorTranscriptionAgent && (
          <>
            <style>{`
              .dt-root{background:#fff;border:1px solid #ececec;border-radius:14px;padding:14px 14px 12px;font-family:'Inter',sans-serif;width:100%;box-shadow:0 2px 12px rgba(0,0,0,0.05);display:flex;flex-direction:column;gap:10px;}
              .dt-header{display:flex;align-items:center;justify-content:space-between;}
              .dt-title{font-size:11px;font-weight:800;color:#111827;letter-spacing:-0.01em;}
              .dt-badge{display:flex;align-items:center;gap:4px;background:#edfcf4;border:1px solid #b8f0d7;border-radius:20px;padding:2px 8px;}
              .dt-badge-dot{width:5px;height:5px;border-radius:50%;background:#22c693;animation:dt-blink 1.4s ease-in-out infinite;}
              .dt-badge-text{font-size:8px;font-weight:800;color:#006c4e;letter-spacing:0.1em;text-transform:uppercase;}
              .dt-patient{display:flex;align-items:center;gap:8px;background:#f8f9fa;border-radius:10px;padding:7px 10px;}
              .dt-pat-avatar{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#b8f0d7,#58d89b);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:#006c4e;flex-shrink:0;}
              .dt-pat-info{flex:1;display:flex;flex-direction:column;gap:1px;}
              .dt-pat-name{font-size:11px;font-weight:700;color:#111827;}
              .dt-pat-meta{font-size:9px;color:#9ca3af;font-weight:500;}
              .dt-hipaa{font-size:8px;font-weight:800;color:#006c4e;background:#dff9ee;border:1px solid #b8f0d7;border-radius:4px;padding:2px 6px;white-space:nowrap;}
              .dt-audio{display:flex;align-items:center;gap:8px;}
              .dt-play{width:24px;height:24px;border-radius:50%;background:#dff9ee;border:1px solid #b8f0d7;display:flex;align-items:center;justify-content:center;flex-shrink:0;cursor:pointer;position:relative;}
              .dt-play::after{content:'';width:0;height:0;border-top:4px solid transparent;border-bottom:4px solid transparent;border-left:7px solid #006c4e;margin-left:2px;}
              .dt-track{flex:1;height:5px;background:#f0f0f0;border-radius:999px;overflow:hidden;}
              .dt-fill{width:35%;height:100%;background:linear-gradient(90deg,#22c693,#58d89b);border-radius:999px;}
              .dt-time{font-size:9px;font-weight:600;color:#9ca3af;white-space:nowrap;}
              .dt-transcript-box{background:#f8f9fa;border:1px solid #f0f0f0;border-radius:10px;padding:10px 12px;}
              .dt-transcript-lbl{font-size:8px;font-weight:800;color:#9ca3af;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:5px;}
              .dt-transcript-text{font-size:11px;line-height:1.7;font-weight:500;color:#374151;}
              .dt-highlight{color:#006c4e;background:#eafcf3;padding:1px 4px;border-radius:4px;font-weight:700;}
              .dt-fields{display:flex;gap:5px;}
              .dt-field{flex:1;background:#f8f9fa;border:1px solid #f0f0f0;border-radius:8px;padding:6px 8px;display:flex;flex-direction:column;gap:2px;}
              .dt-field-lbl{font-size:8px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.1em;}
              .dt-field-val{font-size:10px;font-weight:700;color:#111827;}
              .dt-stats{display:flex;align-items:center;border-top:1px solid #f0f0f0;padding-top:10px;gap:0;}
              .dt-stat{flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;}
              .dt-stat+.dt-stat{border-left:1px solid #f0f0f0;}
              .dt-stat-val{font-size:13px;font-weight:800;color:#111827;}
              .dt-stat-lbl{font-size:8px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.1em;}
              @keyframes dt-blink{0%,100%{opacity:1}50%{opacity:0.35}}
            `}</style>
            <div className="dt-root">
              {/* Header */}
              <div className="dt-header">
                <span className="dt-title">Live Transcription</span>
                <div className="dt-badge">
                  <div className="dt-badge-dot" />
                  <span className="dt-badge-text">Recording</span>
                </div>
              </div>

              {/* Patient row */}
              <div className="dt-patient">
                <div className="dt-pat-avatar">RJ</div>
                <div className="dt-pat-info">
                  <span className="dt-pat-name">Robert Johnson</span>
                  <span className="dt-pat-meta">DOB: 14 Mar 1978 · Visit #2841</span>
                </div>
                <span className="dt-hipaa">🔒 HIPAA</span>
              </div>

              {/* Audio player */}
              <div className="dt-audio">
                <div className="dt-play" />
                <div className="dt-track"><div className="dt-fill" /></div>
                <span className="dt-time">00:03 / 03:42</span>
              </div>

              {/* Transcript */}
              <div className="dt-transcript-box">
                <div className="dt-transcript-lbl">Transcript</div>
                <div className="dt-transcript-text">
                  Patient reports persistent <span className="dt-highlight">headaches</span> and mild <span className="dt-highlight">dizziness</span> for 3 days. No fever. Prescribing <span className="dt-highlight">rest</span> + follow-up in 5 days.
                </div>
              </div>

              {/* Extracted fields */}
              <div className="dt-fields">
                <div className="dt-field"><span className="dt-field-lbl">Symptoms</span><span className="dt-field-val">Headache, Dizziness</span></div>
                <div className="dt-field"><span className="dt-field-lbl">Duration</span><span className="dt-field-val">3 Days</span></div>
                <div className="dt-field"><span className="dt-field-lbl">Rx</span><span className="dt-field-val">Rest + Follow-up</span></div>
              </div>

              {/* Stats bar */}
              <div className="dt-stats">
                <div className="dt-stat"><span className="dt-stat-val">99%</span><span className="dt-stat-lbl">Accuracy</span></div>
                <div className="dt-stat"><span className="dt-stat-val">&lt;1s</span><span className="dt-stat-lbl">Latency</span></div>
                <div className="dt-stat"><span className="dt-stat-val">HIPAA</span><span className="dt-stat-lbl">Compliant</span></div>
              </div>
            </div>
          </>
        )}

      </div>
    </motion.div>
  );
};

const ProductGrid = () => {
  const infraRef = useRef(null);

  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
      style={{ padding: "96px 15px", background: "transparent" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto", marginBottom: "96px", textAlign: "center" }}>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(20,27,43,.5)", marginBottom: "16px" }}>Innovation Pipeline</p>
        <h2 style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(32px,4vw,44px)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.04em", color: "#141b2b", lineHeight: 1.1 }}>What we are working on</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridAutoRows: "1fr", gap: "15px" }}>
        {products.map((p, idx) => <ProductCard key={p.no} {...p} index={idx} />)}
        <motion.div
          ref={infraRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.7,
            delay: products.length * 0.12,
            ease: [0.25, 0.1, 0.25, 1.0]
          }}
          style={{ border: "none", borderRadius: "24px", background: "#000", padding: "48px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.2 }}>
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs><pattern id="pg" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="#80f9c8" strokeWidth=".5" /></pattern></defs>
              <rect fill="url(#pg)" width="100%" height="100%" />
            </svg>
          </div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <span style={{ display: "inline-block", minHeight: "16px", lineHeight: "1", fontFamily: "'Inter',sans-serif", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#80f9c8", marginBottom: "16px" }}>
              <VariableProximity
                label="Infrastructure Node"
                fromFontVariationSettings="'wght' 700, 'opsz' 9"
                toFontVariationSettings="'wght' 900, 'opsz' 40"
                containerRef={infraRef}
                radius={100}
                falloff="linear"
              />
            </span>
            {[null, null, null].map((_, i) => (
              <div key={i} style={{ height: 4, width: ["100%", "66%", "75%"][i], background: `rgba(128,249,200,${[.2, .4, .1][i]})`, marginBottom: 8 }} />
            ))}
          </div>
          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 8, fontFamily: "'Space Grotesk',monospace", fontSize: "10px", color: "rgba(128,249,200,.6)" }}>
            <VariableProximity
              label="// GLOBAL_MESH_ACTIVE"
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 700, 'opsz' 40"
              containerRef={infraRef}
              radius={100}
              falloff="linear"
            />
            <VariableProximity
              label="// LATENCY_OPTIMIZED"
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 700, 'opsz' 40"
              containerRef={infraRef}
              radius={100}
              falloff="linear"
            />
            <VariableProximity
              label="// 100% UPTIME_PROTOCOL"
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 700, 'opsz' 40"
              containerRef={infraRef}
              radius={100}
              falloff="linear"
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

// ─── Rest of sections ────────────────────────────────────────────

const Vision = () => (
  <section style={{ padding: "128px 48px", position: "relative" }}>
    <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
      <Icon name="format_quote" style={{ fontSize: 48, color: "#006c4e", display: "block", marginBottom: "48px" }} />
      <blockquote style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 700, textTransform: "uppercase", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "48px" }}>
        <ScaleInText text={`"We believe AI agents will replace repetitive human workflows. We're building the infrastructure for that future."`} />
      </blockquote>
      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>— Nexov Core Vision</div>
    </div>
    {/* <div style={{ position: "absolute", bottom: "-80px", left: "-40px", pointerEvents: "none", userSelect: "none" }}>
      <ScrollFloat
        animationDuration={1}
        ease='back.inOut(2)'
        scrollStart='bottom bottom+=50%'
        scrollEnd='top bottom'
        stagger={0.03}
        containerClassName=''
        textClassName=''
      >
        FUTURE
      </ScrollFloat>
    </div> */}
    <div style={{ position: "absolute", bottom: "-90px", left: "-40px", pointerEvents: "none", userSelect: "none" }}>
    <ScrollFloat
      animationDuration={2.5}
      ease='back.inOut(2)'

      stagger={0.1}
    >
      FUTURE
    </ScrollFloat>
  </div>
  </section>
);

const CTA = () => (
  <section style={{ borderBottom: "1px solid #000", background: "#6EE7B7" }}>
    <div style={{ padding: "96px 48px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
      <h2 style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(40px,7vw,80px)", fontWeight: 900, textTransform: "uppercase", lineHeight: 0.9, letterSpacing: "-0.04em", marginBottom: "48px", maxWidth: "900px" }}>Start Automating Conversations Today</h2>
      <div style={{ display: "flex", border: "2px solid #000", boxShadow: "8px 8px 0 rgba(0,0,0,0.15)", borderRadius: "8px", overflow: "hidden" }}>
        <button style={{ background: "#000", color: "#fff", padding: "20px 40px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", borderRight: "1px solid #000", cursor: "pointer", transition: "all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)", transform: "none" }} onMouseEnter={(e) => { e.target.style.background = "rgba(0,0,0,0.85)"; e.target.style.transform = "translateY(-2px)"; }} onMouseLeave={(e) => { e.target.style.background = "#000"; e.target.style.transform = "translateY(0)"; }}>Deploy Now</button>
        <button style={{ background: "transparent", color: "#000", padding: "20px 40px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", border: "none", cursor: "pointer", transition: "all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)" }} onMouseEnter={(e) => { e.target.style.background = "rgba(0,0,0,0.1)"; }} onMouseLeave={(e) => { e.target.style.background = "transparent"; }}>Talk to an Engineer</button>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer style={{ background: "#fff", borderTop: "1px solid #000" }}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", padding: "64px 48px", maxWidth: 1440, margin: "0 auto", alignItems: "flex-end" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "20px", fontWeight: 900, textTransform: "uppercase" }}>Nexov AI</div>
        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(0,0,0,.4)" }}>© 2024 NEXOV AI — MATHEMATICAL PRECISION IN AGENTIC WORKFLOWS</div>
      </div>
      <div style={{ display: "flex", gap: "32px", justifyContent: "flex-end", flexWrap: "wrap" }}>
        {["Documentation", "Privacy Policy", "System Status", "Twitter/X"].map((link) => (
          <a key={link} href="#" style={{ fontFamily: "'Inter',sans-serif", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(0,0,0,.4)", textDecoration: "none" }}>{link}</a>
        ))}
      </div>
    </div>
  </footer>
);

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  useEffect(() => { injectTailwindConfig(); }, []);
  return (
    <>
      <style>{styles}</style>
      <div style={{ position: 'fixed', inset: 0, zIndex: -1 }}>
        <DotGrid
          dotSize={4}
          gap={15}
          baseColor="#eaeaea"
          activeColor="#80f9c8"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>
      <Navbar />

      <div className="mx-[40px] mt-[10px]">
        <Hero />
      </div>
      <MarqueeBar />
      <FullScreenSection />
      <div style={{ margin: "0 200px"}}>
        <main style={{ margin: "0 15px", paddingTop: "15px" }}>


          <TalkToAgent />
          <Mission />
          <ProductGrid />
          <div style={{ marginBottom: "80px" }}>
            <LogicFlow />
          </div>
          <div style={{ marginBottom: "80px" }}>
            <UseCases />
          </div>
          <WhyDifferent />
          <div style={{ marginBottom: "80px" }}>
            <Vision />
          </div>
          <div style={{ marginBottom: "80px" }}>
            <WallOfLove />
          </div>
          <CTA />
        </main>
      </div>
      <Footer />
    </>
  );
}