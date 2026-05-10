import React, { useState } from "react";
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
        style={{ width: "100%", height: "520px", background: "#f4f3ef", borderRadius: "8px", overflow: "hidden", border: "1px solid #e0e0da" }}
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
  const [nodeTransforms, setNodeTransforms] = React.useState([0, 0, 0, 0, 0]);
  const containerRef = React.useRef(null);
  const nodeRefs = React.useRef([]);

  React.useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const distance = Math.abs(elementCenter - viewportCenter);
      const maxDistance = viewportHeight;

      const brightness = Math.max(0, Math.min(1, 1 - distance / maxDistance));
      setScrollBrightness(brightness);

      const parallax = (rect.top * 0.5) / 100;
      setScrollParallax(parallax);

      const transforms = nodeRefs.current.map((node) => {
        if (!node) return 0;
        const nodeRect = node.getBoundingClientRect();
        const nodeCenter = nodeRect.top + nodeRect.height / 2;
        const nodeDistance = Math.abs(nodeCenter - viewportCenter);
        return Math.max(-20, Math.min(20, (nodeDistance / maxDistance) * -40));
      });
      setNodeTransforms(transforms);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nodes = [
    { label: "Voice Agents", desc: "Human-like conversations powered by advanced voice AI.", icon: "voice" },
    { label: "Workflows", desc: "Intelligent orchestration of tasks and systems.", icon: "workflow" },
    { label: "Data & Context", desc: "Secure data handling and contextual AI understanding.", icon: "data" },
    { label: "Automation", desc: "Automate repetitive processes and reduce operational overhead.", icon: "automation" },
    { label: "Deployment", desc: "Scalable deployment across regions and infrastructure.", icon: "deployment" },
  ];

  const iconComponents = {
    voice: <svg viewBox="0 0 24 24"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>,
    workflow: <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
    data: <svg viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
    automation: <svg viewBox="0 0 24 24"><polyline points="13 2 13 9 20 9"/><path d="M20 9L13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><line x1="9" y1="14" x2="15" y2="14"/><line x1="9" y1="18" x2="13" y2="18"/></svg>,
    deployment: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  };

  const brightnessAmount = 0.4;
  const spineGlowIntensity = scrollBrightness * 0.6;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700&family=Space+Grotesk:wght@400;500;600&display=swap');

        .process-container {
          width: 100%;
          max-width: 380px;
          margin: 0 auto;
          position: relative;
          will-change: transform;
        }

        .spine {
          position: absolute;
          left: 40px;
          top: 40px;
          bottom: 40px;
          width: 2px;
          background: linear-gradient(to bottom, #80f9c8 0%, #006c4e 40%, #006c4e 60%, #80f9c8 100%);
          z-index: 0;
          box-shadow: 0 0 12px rgba(128, 249, 200, 0.3);
          transition: box-shadow 0.6s ease;
          will-change: transform, box-shadow;
        }

        .node-row {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 48px;
          position: relative;
          z-index: 1;
          opacity: 0;
          transform: translateX(-20px);
          animation: fadeSlide 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          will-change: transform, opacity;
        }

        .node-row:nth-child(1) { animation-delay: 0.1s; }
        .node-row:nth-child(2) { animation-delay: 0.2s; }
        .node-row:nth-child(3) { animation-delay: 0.3s; }
        .node-row:nth-child(4) { animation-delay: 0.4s; }
        .node-row:nth-child(5) { animation-delay: 0.5s; }

        @keyframes fadeSlide {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .icon-wrap {
          width: 80px;
          height: 80px;
          min-width: 80px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid #aac9be;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: 0 8px 24px rgba(128, 249, 200, 0.15), 0 0 0 1px rgba(128, 249, 200, 0.1);
          transition: all 0.6s ease;
          cursor: default;
          will-change: transform, box-shadow;
        }

        .icon-wrap svg {
          width: 36px;
          height: 36px;
          stroke: #006c4e;
          fill: none;
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: stroke 0.6s ease;
        }

        .icon-wrap::before {
          content: '';
          position: absolute;
          left: -26px;
          top: 50%;
          transform: translateY(-50%);
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #80f9c8;
          border: 2px solid #f4f3ef;
          box-shadow: 0 0 0 4px rgba(128, 249, 200, 0.25), 0 0 8px rgba(128, 249, 200, 0.4);
          transition: box-shadow 0.6s ease;
          will-change: box-shadow;
        }

        .icon-wrap::after {
          content: '';
          position: absolute;
          left: -20px;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 2px;
          background: linear-gradient(to left, #80f9c8, transparent);
          opacity: 0.6;
          transition: opacity 0.6s ease;
        }

        .text-block {
          flex: 1;
        }

        .label {
          font-family: 'Space Grotesk', monospace;
          font-weight: 600;
          font-size: 12px;
          letter-spacing: 0.12em;
          color: #006c4e;
          text-transform: uppercase;
          margin-bottom: 6px;
          transition: color 0.6s ease;
          will-change: color;
        }

        .desc {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: #5a7868;
          line-height: 1.6;
          transition: color 0.6s ease;
          will-change: color;
        }
      `}</style>
      <div
        className="process-container"
        ref={containerRef}
        style={{ transform: `translateY(${scrollParallax}px)` }}
      >
        <div
          className="spine"
          style={{
            boxShadow: `0 0 ${12 + spineGlowIntensity * 12}px rgba(128, 249, 200, ${0.3 + spineGlowIntensity * 0.3})`,
            transform: `scaleY(${0.9 + scrollBrightness * 0.1})`,
            transformOrigin: 'center',
          }}
        />
        {nodes.map((node, idx) => (
          <div
            key={idx}
            className="node-row"
            ref={el => nodeRefs.current[idx] = el}
            style={{
              transform: `translateX(${nodeTransforms[idx]}px)`,
              opacity: Math.max(0.3, 1 - Math.abs(nodeTransforms[idx]) / 40),
            }}
          >
            <div
              className="icon-wrap"
              style={{
                boxShadow: `0 8px ${24 + scrollBrightness * 16}px rgba(128, 249, 200, ${0.15 + scrollBrightness * 0.15}), 0 0 0 1px rgba(128, 249, 200, ${0.1 + scrollBrightness * 0.1})`,
                transform: `scale(${1 + scrollBrightness * 0.05})`,
              }}
            >
              <svg style={{ stroke: `rgb(0, 108, 78, ${Math.min(1, 0.6 + scrollBrightness * brightnessAmount)})` }} viewBox="0 0 24 24">{iconComponents[node.icon].props.children}</svg>
            </div>
            <div className="text-block">
              <div
                className="label"
                style={{
                  color: `rgba(0, 108, 78, ${Math.min(1, 0.8 + scrollBrightness * brightnessAmount)})`,
                }}
              >
                {node.label}
              </div>
              <div
                className="desc"
                style={{
                  color: `rgba(90, 120, 104, ${Math.min(1, 0.7 + scrollBrightness * brightnessAmount)})`,
                }}
              >
                {node.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

