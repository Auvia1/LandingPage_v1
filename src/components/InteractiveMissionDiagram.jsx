import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ReactFlow,
  ReactFlowProvider,
  Controls,
  Background,
  BackgroundVariant,
  Handle,
  Position,
  getBezierPath,
  BaseEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

/* ── Icons ─────────────────────────────────────────────── */
const VoiceIcon = () => (
  <svg width={22} height={22} viewBox="0 0 22 22" fill="none" stroke="#888" strokeWidth={1.4} strokeLinecap="round">
    <circle cx={11} cy={11} r={3} fill="#888" stroke="none" />
    <path d="M8 8.5Q5.5 11 8 13.5" strokeLinejoin="round" />
    <path d="M6 6.5Q2 11 6 15.5" strokeLinejoin="round" />
    <path d="M14 8.5Q16.5 11 14 13.5" strokeLinejoin="round" />
    <path d="M16 6.5Q20 11 16 15.5" strokeLinejoin="round" />
  </svg>
);

const WorkflowIcon = () => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" stroke="#888" strokeWidth={1.4}>
    <rect x={2} y={2} width={7} height={7} rx={1.5} />
    <rect x={11} y={2} width={7} height={7} rx={1.5} />
    <rect x={2} y={11} width={7} height={7} rx={1.5} />
    <rect x={11} y={11} width={7} height={7} rx={1.5} />
  </svg>
);

const AutomationIcon = () => (
  <svg width={26} height={26} viewBox="0 0 26 26" fill="none">
    <circle cx={13} cy={13} r={3.5} fill="#006c4e" opacity={0.85} />
    <circle cx={6.5} cy={8} r={2} fill="none" stroke="#006c4e" strokeWidth={1.3} opacity={0.7} />
    <circle cx={19.5} cy={8} r={2} fill="none" stroke="#006c4e" strokeWidth={1.3} opacity={0.7} />
    <circle cx={6.5} cy={18} r={2} fill="none" stroke="#006c4e" strokeWidth={1.3} opacity={0.7} />
    <circle cx={19.5} cy={18} r={2} fill="none" stroke="#006c4e" strokeWidth={1.3} opacity={0.7} />
    <line x1={8.5} y1={8} x2={17.5} y2={8} stroke="#006c4e" strokeWidth={0.8} opacity={0.4} />
    <line x1={8.5} y1={18} x2={17.5} y2={18} stroke="#006c4e" strokeWidth={0.8} opacity={0.4} />
    <line x1={6.5} y1={10} x2={6.5} y2={16} stroke="#006c4e" strokeWidth={0.8} opacity={0.4} />
    <line x1={19.5} y1={10} x2={19.5} y2={16} stroke="#006c4e" strokeWidth={0.8} opacity={0.4} />
  </svg>
);

const DataIcon = () => (
  <svg width={20} height={22} viewBox="0 0 20 22" fill="none" stroke="#888" strokeWidth={1.4}>
    <ellipse cx={10} cy={5} rx={8} ry={3} />
    <line x1={2} y1={5} x2={2} y2={11} />
    <line x1={18} y1={5} x2={18} y2={11} />
    <ellipse cx={10} cy={11} rx={8} ry={3} />
    <line x1={2} y1={11} x2={2} y2={17} />
    <line x1={18} y1={11} x2={18} y2={17} />
    <ellipse cx={10} cy={17} rx={8} ry={3} />
  </svg>
);

const DeployIcon = () => (
  <svg width={22} height={22} viewBox="0 0 22 22" fill="none" stroke="#888" strokeWidth={1.4}>
    <circle cx={11} cy={11} r={8} />
    <ellipse cx={11} cy={11} rx={4.5} ry={8} />
    <line x1={3} y1={11} x2={19} y2={11} />
    <line x1={3.5} y1={7.5} x2={18.5} y2={7.5} />
    <line x1={3.5} y1={14.5} x2={18.5} y2={14.5} />
  </svg>
);

/* ── Custom Node ────────────────────────────────────────── */
function RingNode({ data }) {
  const isHub = data.hub;
  const outerSize = isHub ? 84 : 60;
  const innerSize = isHub ? 64 : 44;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div
        style={{
          width: outerSize,
          height: outerSize,
          borderRadius: "50%",
          border: isHub ? "1px solid #aac9be" : "1px solid #ddddd8",
          background: "rgba(244,243,239,0.85)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          cursor: "grab",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = "scale(1.06)";
          e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.09)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <div
          style={{
            width: innerSize,
            height: innerSize,
            borderRadius: "50%",
            border: isHub ? "1px solid #006c4e" : "0.5px solid #e8e8e3",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: isHub ? 0.85 : 1,
          }}
        >
          {data.icon}
        </div>
      </div>

      <span
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 8.5,
          fontWeight: isHub ? 600 : 500,
          letterSpacing: "0.12em",
          color: isHub ? "#006c4e" : "#141b2b",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        {data.label}
      </span>

      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Left} id="left" style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Right} id="right" style={{ opacity: 0 }} />
    </div>
  );
}

/* ── Custom Edge ────────────────────────────────────────── */
function SpineEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition }) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    curvature: 0.5,
  });

  return (
    <BaseEdge
      id={id}
      path={edgePath}
      style={{
        stroke: "#c8c8c2",
        strokeWidth: 1.4,
        strokeDasharray: "5 4",
        fill: "none",
        animation: "dashMove 2s linear infinite",
      }}
    />
  );
}

/* ── Node & Edge data ───────────────────────────────────── */
const initialNodes = [
  {
    id: "voice",
    type: "ring",
    position: { x: 160, y: 20 },
    data: { label: "Voice Agents", icon: <VoiceIcon /> },
  },
  {
    id: "workflow",
    type: "ring",
    position: { x: 290, y: 130 },
    data: { label: "Workflows", icon: <WorkflowIcon /> },
  },
  {
    id: "automation",
    type: "ring",
    position: { x: 130, y: 250 },
    data: { label: "Automation", icon: <AutomationIcon />, hub: true },
  },
  {
    id: "data",
    type: "ring",
    position: { x: 295, y: 370 },
    data: { label: "Data & Context", icon: <DataIcon /> },
  },
  {
    id: "deploy",
    type: "ring",
    position: { x: 150, y: 480 },
    data: { label: "Deployment", icon: <DeployIcon /> },
  },
];

const initialEdges = [
  { id: "e-voice-auto", source: "voice", target: "automation", type: "spine" },
  { id: "e-workflow-auto", source: "workflow", target: "automation", type: "spine" },
  { id: "e-auto-data", source: "automation", target: "data", type: "spine" },
  { id: "e-auto-deploy", source: "automation", target: "deploy", type: "spine" },
  { id: "e-data-deploy", source: "data", target: "deploy", type: "spine" },
];

const nodeTypes = { ring: RingNode };
const edgeTypes = { spine: SpineEdge };

/* ── Main Component ─────────────────────────────────────── */
export default function InteractiveMissionDiagram() {
  const [nodes] = useState(initialNodes);
  const [edges] = useState(initialEdges);

  return (
    <>
      {/* Inject dash animation keyframes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500;600&display=swap');
        @keyframes dashMove { to { stroke-dashoffset: -18; } }
        .react-flow__edge-path { animation: dashMove 2s linear infinite; }
        .react-flow__handle { opacity: 0 !important; pointer-events: none; }
        .react-flow__edge-background { opacity: 0; }
        .react-flow__edges { pointer-events: none; }
      `}</style>

      <div
        style={{ width: "100%", height: "520px", background: "transparent", borderRadius: "8px", overflow: "hidden", border: "1px solid #e0e0da" }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            fitView
            fitViewOptions={{ padding: 0.15 }}
            minZoom={1}
            maxZoom={1}
            nodesDraggable={true}
            nodesConnectable={false}
            panOnScroll={false}
            panOnDrag={false}
            zoomOnScroll={false}
            style={{ background: "#f4f3ef" }}
          >
            <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="#d8d8d2" />
            <Controls showInteractive={false} />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </>
  );
}

export const ProcessFlow = () => {
  const [scrollBrightness, setScrollBrightness] = React.useState(0);
  const [scrollParallax, setScrollParallax] = React.useState(0);
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const distance = Math.abs(elementCenter - viewportCenter);
      const maxDistance = viewportHeight;
      setScrollBrightness(Math.max(0, Math.min(1, 1 - distance / maxDistance)));
      setScrollParallax((rect.top * 0.5) / 100);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nodes = [
    { label: "Voice Agents", desc: "Human-like conversations powered by advanced voice AI.", icon: "voice" },
    { label: "Workflows", desc: "Intelligent orchestration of tasks and systems.", icon: "workflow" },
    { label: "Data & Context", desc: "Secure data handling and contextual AI understanding.", icon: "data" },
    { label: "Deployment", desc: "Scalable deployment across regions and infrastructure.", icon: "deployment" },
  ];

  const icons = {
    voice: <><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></>,
    workflow: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    data: <><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></>,
    deployment: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  const nodeVariants = {
    hidden: { opacity: 0, x: -36, scale: 0.93 },
    visible: {
      opacity: 1, x: 0, scale: 1,
      transition: { type: "spring", stiffness: 85, damping: 14 },
    },
  };

  const spineVariants = {
    hidden: { scaleY: 0 },
    visible: { scaleY: 1, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
  };

  const spineGlow = scrollBrightness * 0.7;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        .pf-container {
          width: 100%;
          max-width: 380px;
          margin: 0 auto;
          position: relative;
        }
        .pf-spine-track {
          position: absolute;
          left: 40px;
          top: 40px;
          bottom: 40px;
          width: 2px;
          background: rgba(128,249,200,0.1);
          z-index: 0;
          overflow: hidden;
          border-radius: 2px;
        }
        .pf-spine {
          position: absolute;
          left: 0; top: 0;
          width: 100%; height: 100%;
          transform-origin: top center;
          background: linear-gradient(to bottom, #80f9c8 0%, #006c4e 50%, #80f9c8 100%);
          border-radius: 2px;
        }
        .pf-row {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 40px;
          position: relative;
          z-index: 1;
          cursor: default;
        }
        .pf-row:last-child { margin-bottom: 0; }
        .pf-icon {
          width: 80px; height: 80px; min-width: 80px;
          border-radius: 50%;
          background: linear-gradient(140deg, #ffffff 55%, #edfdf5 100%);
          border: 2px solid rgba(128,249,200,0.45);
          display: flex; align-items: center; justify-content: center;
          position: relative;
          transition: box-shadow 0.35s ease, border-color 0.35s ease;
        }
        .pf-row:hover .pf-icon {
          border-color: #80f9c8;
          box-shadow: 0 0 0 5px rgba(128,249,200,0.22), 0 8px 28px rgba(0,108,78,0.18);
        }
        .pf-icon svg {
          width: 32px; height: 32px;
          stroke: #006c4e; fill: none;
          stroke-width: 1.65; stroke-linecap: round; stroke-linejoin: round;
          transition: stroke 0.3s ease;
        }
        .pf-row:hover .pf-icon svg { stroke: #009e70; }
        .pf-icon::before {
          content: '';
          position: absolute;
          left: -27px; top: 50%;
          transform: translateY(-50%);
          width: 13px; height: 13px;
          border-radius: 50%;
          background: #80f9c8;
          border: 2px solid #f0f4f1;
          box-shadow: 0 0 0 4px rgba(128,249,200,0.2), 0 0 10px rgba(128,249,200,0.5);
          transition: box-shadow 0.35s ease;
        }
        .pf-row:hover .pf-icon::before {
          box-shadow: 0 0 0 6px rgba(128,249,200,0.3), 0 0 18px rgba(128,249,200,0.75);
        }
        .pf-icon::after {
          content: '';
          position: absolute;
          left: -19px; top: 50%;
          transform: translateY(-50%);
          width: 20px; height: 2px;
          background: linear-gradient(to right, transparent, rgba(128,249,200,0.7));
        }
        .pf-text { flex: 1; min-width: 0; }
        .pf-label {
          font-family: 'Space Grotesk', monospace;
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.13em;
          color: #006c4e;
          text-transform: uppercase;
          margin-bottom: 5px;
          transition: color 0.3s ease;
        }
        .pf-row:hover .pf-label { color: #009e70; }
        .pf-desc {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 400;
          color: #5a7868;
          line-height: 1.55;
          transition: color 0.3s ease;
        }
        .pf-row:hover .pf-desc { color: #3a5446; }
        .pf-num {
          font-family: 'Space Grotesk', monospace;
          font-size: 10px;
          font-weight: 600;
          color: rgba(0,108,78,0.22);
          letter-spacing: 0.08em;
          align-self: flex-start;
          padding-top: 2px;
          min-width: 20px;
          text-align: right;
        }
      `}</style>

      <motion.div
        className="pf-container"
        ref={containerRef}
        style={{ transform: `translateY(${scrollParallax}px)` }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {/* Animated spine */}
        <div className="pf-spine-track">
          <motion.div
            className="pf-spine"
            variants={spineVariants}
            style={{
              boxShadow: `0 0 ${10 + spineGlow * 18}px rgba(128,249,200,${0.25 + spineGlow * 0.45})`,
            }}
          />
        </div>

        {nodes.map((node, idx) => (
          <motion.div
            key={idx}
            className="pf-row"
            variants={nodeVariants}
          >
            {/* Icon with individual hover spring */}
            <motion.div
              className="pf-icon"
              style={{
                boxShadow: `0 4px ${14 + scrollBrightness * 14}px rgba(128,249,200,${0.1 + scrollBrightness * 0.12})`,
              }}
              whileHover={{ scale: 1.1, transition: { type: "spring", stiffness: 280, damping: 18 } }}
              whileTap={{ scale: 0.93 }}
            >
              <svg viewBox="0 0 24 24">{icons[node.icon]}</svg>
            </motion.div>

            {/* Text fades up slightly after node slide */}
            <motion.div
              className="pf-text"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 + 0.18, duration: 0.45, ease: "easeOut" }}
            >
              <div className="pf-label">{node.label}</div>
              <div className="pf-desc">{node.desc}</div>
            </motion.div>

            {/* Sequential index number fades in last */}
            <motion.span
              className="pf-num"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 + 0.32, duration: 0.4 }}
            >
              0{idx + 1}
            </motion.span>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

