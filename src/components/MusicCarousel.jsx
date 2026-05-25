// import { useState, useEffect, useRef, forwardRef, useCallback } from "react";

// const SEED_SM = [10, 28, 18, 42, 22, 35, 12, 48, 30, 20, 38, 15, 44, 25, 10, 18, 32, 8];
// const SEED_LG = [12, 22, 40, 18, 55, 30, 15, 60, 22, 48, 10, 38, 25, 55, 18, 30, 48, 20, 35, 12, 50, 28, 15, 40];

// const SONGS = [
//   {
//     title: "Characters",
//     artist: "Voice Profiles v1.4",
//     duration: 214,
//     accentColor: "#ec4899",
//     gradient: "radial-gradient(at 100% 0%, rgb(236, 72, 153), rgb(239, 68, 68), rgb(234, 179, 8))",
//     ambientColor: "rgba(236, 72, 153, 0.15)",
//     langTag: "ENGLISH",
//     audioSrc: "/assets/audio/english final.mp4",
//   },
//   {
//     title: "Narration",
//     artist: "Synthetic Storytelling v2.0",
//     duration: 187,
//     accentColor: "#60a5fa",
//     gradient: "radial-gradient(at 100% 100%, rgb(134, 239, 172), rgb(59, 130, 246), rgb(147, 51, 234))",
//     ambientColor: "rgba(59, 130, 246, 0.12)",
//     langTag: "HINDI",
//     audioSrc: "/assets/audio/hindi final.mp4",
//   },
//   {
//     title: "Conversational",
//     artist: "Dynamic Interaction v3.2",
//     duration: 243,
//     accentColor: "#22c55e",
//     gradient: "radial-gradient(at 100% 100%, rgb(239, 68, 68), rgb(34, 197, 94))",
//     ambientColor: "rgba(34, 197, 94, 0.12)",
//     langTag: "TELUGU",
//     audioSrc: "/assets/audio/telugu final.mp4",
//   },
// ];

// const PlayIcon = () => (
//   <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
//     <path d="M8 5v14l11-7z" />
//   </svg>
// );

// const PauseIcon = () => (
//   <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
//     <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
//   </svg>
// );

// const SkipPrevIcon = () => (
//   <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
//     <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
//   </svg>
// );

// const SkipNextIcon = () => (
//   <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
//     <path d="M6 18l8.5-6L6 6v12zM16 6h2v12h-2z" />
//   </svg>
// );

// const ShuffleIcon = () => (
//   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
//     <polyline points="16 3 21 3 21 8" />
//     <line x1="4" y1="20" x2="21" y2="3" />
//     <polyline points="21 16 21 21 16 21" />
//     <line x1="4" y1="4" x2="9" y2="9" />
//   </svg>
// );

// const RepeatIcon = () => (
//   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
//     <polyline points="17 1 21 5 17 9" />
//     <path d="M3 11V9a4 4 0 0 1 4-4h14" />
//     <polyline points="7 23 3 19 7 15" />
//     <path d="M21 13v2a4 4 0 0 1-4 4H3" />
//   </svg>
// );

// const HeartIcon = ({ filled, color }) => (
//   <svg viewBox="0 0 24 24" fill={filled ? color : "none"} stroke={filled ? color : "rgba(0,0,0,0.4)"} strokeWidth="2" width="16" height="16">
//     <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
//   </svg>
// );

// const Waveform = ({ isPlaying, barCount = 18, seeds = SEED_SM, accentColor = "#1db954" }) => {
//   const barsRef = useRef([]);
//   const heightsRef = useRef(Array(barCount).fill(3));
//   const rafRef = useRef(null);

//   useEffect(() => {
//     const animate = () => {
//       barsRef.current.forEach((bar, i) => {
//         if (!bar) return;
//         let target;
//         if (isPlaying) {
//           const t = Date.now() / 1000;
//           const phase = (i / barCount) * Math.PI * 2;
//           const wave =
//             Math.sin(t * 3 + phase) * 0.45 +
//             Math.sin(t * 1.7 + phase * 1.5) * 0.3 +
//             0.3;
//           target = Math.max(3, seeds[i % seeds.length] * wave);
//         } else {
//           target = 3 + (seeds[i % seeds.length] / 55) * 6;
//         }
//         heightsRef.current[i] = heightsRef.current[i] * 0.65 + target * 0.35;
//         bar.style.height = heightsRef.current[i] + "px";
//         bar.style.background = isPlaying ? accentColor : "rgba(0,0,0,0.12)";
//       });
//       rafRef.current = requestAnimationFrame(animate);
//     };
//     rafRef.current = requestAnimationFrame(animate);
//     return () => cancelAnimationFrame(rafRef.current);
//   }, [isPlaying, barCount, seeds, accentColor]);

//   return (
//     <div
//       style={{
//         display: "flex",
//         alignItems: "flex-end",
//         gap: 2,
//         height: barCount >= 24 ? 28 : 24,
//         overflow: "hidden",
//         marginBottom: 14,
//       }}
//     >
//       {Array.from({ length: barCount }).map((_, i) => (
//         <div
//           key={i}
//           ref={(el) => (barsRef.current[i] = el)}
//           style={{
//             flex: 1,
//             background: "rgba(0,0,0,0.10)",
//             minHeight: 3,
//             borderRadius: 2,
//             transition: "height 0.08s linear",
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// export const PlayerCard = forwardRef(
//   ({ title, subtitle, langTag, gradient, isCenter, audioSrc, onPlay, accentColor = "#1db954" }, ref) => {
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [currentTime, setCurrentTime] = useState(0);
//     const [duration, setDuration] = useState(0);
//     const [liked, setLiked] = useState(false);
//     const [artHovered, setArtHovered] = useState(false);
//     const [progressHovered, setProgressHovered] = useState(false);
//     const audioRef = useRef(null);

//     useEffect(() => {
//       if (ref) ref.current = audioRef.current;
//     }, [ref]);

//     useEffect(() => {
//       const audio = audioRef.current;
//       if (!audio) return;
//       const onTime = () => setCurrentTime(audio.currentTime);
//       const onMeta = () => setDuration(audio.duration);
//       const onEnd = () => setIsPlaying(false);
//       audio.addEventListener("timeupdate", onTime);
//       audio.addEventListener("loadedmetadata", onMeta);
//       audio.addEventListener("ended", onEnd);
//       return () => {
//         audio.removeEventListener("timeupdate", onTime);
//         audio.removeEventListener("loadedmetadata", onMeta);
//         audio.removeEventListener("ended", onEnd);
//       };
//     }, []);

//     const togglePlay = () => {
//       const audio = audioRef.current;
//       if (!audio) return;
//       if (isPlaying) {
//         audio.pause();
//         setIsPlaying(false);
//       } else {
//         onPlay?.(audio);
//         audio.play().then(() => setIsPlaying(true)).catch(() => {});
//       }
//     };

//     const handleSeek = (e) => {
//       if (!isCenter) return;
//       const rect = e.currentTarget.getBoundingClientRect();
//       const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
//       if (audioRef.current) audioRef.current.currentTime = pct * duration;
//     };

//     const fmt = (t) => {
//       if (!t || isNaN(t)) return "00:00";
//       return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(Math.floor(t % 60)).padStart(2, "0")}`;
//     };

//     const pct = duration ? (currentTime / duration) * 100 : 0;

//     return (
//       <div
//         style={{
//           width: "100%",
//           background: "rgba(255,255,255,0.7)",
//           border: `1px solid ${isCenter ? accentColor + "40" : "rgba(0,0,0,0.10)"}`,
//           borderRadius: 28,
//           overflow: "hidden",
//           boxShadow: isCenter
//             ? `0 8px 32px rgba(0,0,0,0.08), 0 0 40px ${accentColor}20`
//             : "0 8px 24px rgba(0,0,0,0.06)",
//           transition: "border 0.5s ease, box-shadow 0.5s ease",
//           fontFamily: "'DM Sans', sans-serif",
//         }}
//       >
//         <audio ref={audioRef} src={audioSrc} />

//         <div
//           style={{
//             position: "relative",
//             width: "100%",
//             aspectRatio: "1",
//             overflow: "hidden",
//             cursor: "pointer",
//           }}
//           onClick={isCenter ? togglePlay : undefined}
//           onMouseEnter={() => setArtHovered(true)}
//           onMouseLeave={() => setArtHovered(false)}
//         >
//           <div style={{ position: "absolute", inset: 0, background: gradient }} />

//           <div
//             style={{
//               position: "absolute",
//               inset: 0,
//               background: `radial-gradient(circle at 50% 50%, ${accentColor}30 0%, transparent 70%)`,
//             }}
//           />

//           <div
//             style={{
//               position: "absolute",
//               top: 14,
//               left: 14,
//               background: isPlaying ? accentColor : "rgba(255,255,255,0.85)",
//               color: isPlaying ? "#fff" : "#141b2b",
//               fontFamily: "'Syne', sans-serif",
//               fontSize: 9,
//               fontWeight: 700,
//               letterSpacing: "0.14em",
//               textTransform: "uppercase",
//               padding: "4px 10px",
//               borderRadius: 99,
//               backdropFilter: "blur(8px)",
//               transition: "background 0.3s, color 0.3s",
//             }}
//           >
//             {isPlaying ? "● LIVE" : langTag?.slice(0, 8) || title.slice(0, 6).toUpperCase()}
//           </div>

//           <button
//             onClick={(e) => { e.stopPropagation(); setLiked((l) => !l); }}
//             style={{
//               position: "absolute",
//               top: 14,
//               right: 14,
//               width: 36,
//               height: 36,
//               borderRadius: "50%",
//               background: liked ? accentColor + "20" : "rgba(255,255,255,0.6)",
//               border: `1px solid ${liked ? accentColor : "rgba(0,0,0,0.10)"}`,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               cursor: "pointer",
//               backdropFilter: "blur(10px)",
//               transition: "all 0.2s",
//               transform: liked ? "scale(1.1)" : "scale(1)",
//             }}
//             aria-label={liked ? "Unlike" : "Like"}
//           >
//             <HeartIcon filled={liked} color={accentColor} />
//           </button>

//           {isCenter && (
//             <div
//               style={{
//                 position: "absolute",
//                 inset: 0,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 opacity: artHovered ? 1 : 0,
//                 transition: "opacity 0.25s",
//               }}
//             >
//               <div
//                 style={{
//                   width: 56,
//                   height: 56,
//                   borderRadius: "50%",
//                   background: accentColor,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   boxShadow: `0 0 32px ${accentColor}60`,
//                   transform: artHovered ? "scale(1)" : "scale(0.85)",
//                   transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
//                 }}
//               >
//                 <span style={{ color: "#fff" }}>
//                   {isPlaying ? <PauseIcon /> : <PlayIcon />}
//                 </span>
//               </div>
//             </div>
//           )}
//         </div>

//         <div style={{ padding: isCenter ? "18px 20px 16px" : "14px 16px 14px" }}>
//           <div style={{ marginBottom: 12 }}>
//             <div
//               style={{
//                 fontFamily: "'Syne', sans-serif",
//                 fontWeight: 800,
//                 fontSize: isCenter ? 20 : 16,
//                 color: "#141b2b",
//                 letterSpacing: "-0.02em",
//                 whiteSpace: "nowrap",
//                 overflow: "hidden",
//                 textOverflow: "ellipsis",
//               }}
//             >
//               {title}
//             </div>
//             <div
//               style={{
//                 fontSize: 12,
//                 color: "rgba(20,27,43,0.55)",
//                 marginTop: 3,
//                 fontWeight: 400,
//                 letterSpacing: "0.02em",
//               }}
//             >
//               {subtitle}
//             </div>
//           </div>

//           <Waveform
//             isPlaying={isPlaying}
//             barCount={isCenter ? 24 : 18}
//             seeds={isCenter ? SEED_LG : SEED_SM}
//             accentColor={accentColor}
//           />

//           {isCenter && (
//             <>
//               <div
//                 style={{
//                   width: "100%",
//                   height: progressHovered ? 5 : 3,
//                   background: "rgba(0,0,0,0.10)",
//                   borderRadius: 99,
//                   position: "relative",
//                   cursor: "pointer",
//                   marginBottom: 6,
//                   transition: "height 0.2s ease",
//                 }}
//                 onClick={handleSeek}
//                 onMouseEnter={() => setProgressHovered(true)}
//                 onMouseLeave={() => setProgressHovered(false)}
//               >
//                 <div
//                   style={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     height: "100%",
//                     width: `${pct}%`,
//                     background: accentColor,
//                     borderRadius: 99,
//                     transition: "width 0.12s linear",
//                   }}
//                 >
//                   <div
//                     style={{
//                       position: "absolute",
//                       right: -6,
//                       top: "50%",
//                       transform: "translateY(-50%)",
//                       width: 12,
//                       height: 12,
//                       borderRadius: "50%",
//                       background: "#fff",
//                       boxShadow: `0 0 0 3px ${accentColor}40`,
//                       opacity: progressHovered ? 1 : 0,
//                       transition: "opacity 0.2s",
//                     }}
//                   />
//                 </div>
//               </div>
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   fontSize: 10,
//                   color: "rgba(20,27,43,0.45)",
//                   letterSpacing: "0.08em",
//                   marginBottom: 14,
//                   fontVariantNumeric: "tabular-nums",
//                 }}
//               >
//                 <span>{fmt(currentTime)}</span>
//                 <span>{fmt(duration)}</span>
//               </div>
//             </>
//           )}

//           <div
//             style={{
//               height: "0.5px",
//               background: "rgba(0,0,0,0.08)",
//               marginBottom: 14,
//             }}
//           />

//           <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//             <CtrlBtn disabled={!isCenter}>
//               <ShuffleIcon />
//             </CtrlBtn>

//             <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//               <CtrlBtn disabled={!isCenter}>
//                 <SkipPrevIcon />
//               </CtrlBtn>

//               <button
//                 onClick={isCenter ? togglePlay : undefined}
//                 style={{
//                   width: isCenter ? 52 : 40,
//                   height: isCenter ? 52 : 40,
//                   borderRadius: "50%",
//                   background: isCenter ? accentColor : "rgba(0,0,0,0.08)",
//                   border: "none",
//                   cursor: isCenter ? "pointer" : "default",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   color: isCenter ? "#fff" : "rgba(0,0,0,0.4)",
//                   boxShadow: isCenter && isPlaying
//                     ? `0 0 28px ${accentColor}40`
//                     : isCenter
//                     ? `0 0 16px ${accentColor}20`
//                     : "none",
//                   transition: "all 0.2s ease",
//                   flexShrink: 0,
//                   outline: "none",
//                 }}
//               >
//                 {isPlaying ? <PauseIcon /> : <PlayIcon />}
//               </button>

//               <CtrlBtn disabled={!isCenter}>
//                 <SkipNextIcon />
//               </CtrlBtn>
//             </div>

//             <CtrlBtn disabled={!isCenter}>
//               <RepeatIcon />
//             </CtrlBtn>
//           </div>

//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               marginTop: 14,
//             }}
//           >
//             <span
//               style={{
//                 fontSize: 9,
//                 fontWeight: 700,
//                 letterSpacing: "0.18em",
//                 textTransform: "uppercase",
//                 color: isPlaying ? accentColor : "rgba(0,0,0,0.35)",
//                 fontFamily: "'Syne', sans-serif",
//                 transition: "color 0.3s",
//               }}
//             >
//               {langTag}
//             </span>
//             <div
//               style={{
//                 width: 6,
//                 height: 6,
//                 borderRadius: "50%",
//                 background: isPlaying ? accentColor : "rgba(0,0,0,0.15)",
//                 boxShadow: isPlaying ? `0 0 8px ${accentColor}` : "none",
//                 transition: "background 0.3s, box-shadow 0.3s",
//               }}
//             />
//           </div>
//         </div>
//       </div>
//     );
//   }
// );

// PlayerCard.displayName = "PlayerCard";

// const CtrlBtn = ({ children, disabled, onClick }) => (
//   <button
//     onClick={onClick}
//     style={{
//       background: "none",
//       border: "none",
//       cursor: disabled ? "default" : "pointer",
//       color: disabled ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.40)",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       padding: 6,
//       borderRadius: "50%",
//       transition: "color 0.18s, transform 0.15s",
//       outline: "none",
//     }}
//     onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.color = "#141b2b"; }}
//     onMouseLeave={(e) => { e.currentTarget.style.color = disabled ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.40)"; }}
//   >
//     {children}
//   </button>
// );

// function getSlotStyle(rel, accentColor) {
//   const configs = {
//     "-2": { x: -480, z: -120, scale: 0.80, opacity: 0,    rot: -10, blur: 0 },
//     "-1": { x: -340, z: -80,  scale: 0.96, opacity: 0.55, rot: -5,  blur: 0 },
//     "0":  { x: 0,    z: 0,    scale: 1,    opacity: 1,    rot: 0,   blur: 0  },
//     "1":  { x: 340,  z: -80,  scale: 0.96, opacity: 0.55, rot: 5,   blur: 0 },
//     "2":  { x: 480,  z: -120, scale: 0.80, opacity: 0,    rot: 10,  blur: 0 },
//   };
//   const k = Math.max(-2, Math.min(2, rel));
//   return configs[String(k)];
// }

// export default function MusicCarousel() {
//   const [activeIndex, setActiveIndex] = useState(1);
//   const [likes, setLikes] = useState({});
//   const [dragStartX, setDragStartX] = useState(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const audioRefs = useRef({});
//   const containerRef = useRef(null);

//   const stopAll = () => {
//     Object.values(audioRefs.current).forEach((a) => { if (a) a.pause(); });
//   };

//   const goTo = useCallback((newIdx) => {
//     stopAll();
//     const next = ((newIdx % SONGS.length) + SONGS.length) % SONGS.length;
//     setActiveIndex(next);
//   }, []);

//   useEffect(() => {
//     const onKey = (e) => {
//       if (e.key === "ArrowLeft") goTo(activeIndex - 1);
//       if (e.key === "ArrowRight") goTo(activeIndex + 1);
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [activeIndex, goTo]);

//   const handleMouseDown = (e) => {
//     setDragStartX(e.clientX);
//     setIsDragging(false);
//   };
//   const handleMouseMove = (e) => {
//     if (dragStartX !== null && Math.abs(e.clientX - dragStartX) > 8) setIsDragging(true);
//   };
//   const handleMouseUp = (e) => {
//     if (isDragging && dragStartX !== null) {
//       const dx = e.clientX - dragStartX;
//       if (Math.abs(dx) > 60) goTo(activeIndex + (dx < 0 ? 1 : -1));
//     }
//     setTimeout(() => setIsDragging(false), 50);
//     setDragStartX(null);
//   };
//   const handleTouchStart = (e) => setDragStartX(e.touches[0].clientX);
//   const handleTouchEnd = (e) => {
//     const dx = e.changedTouches[0].clientX - dragStartX;
//     if (Math.abs(dx) > 50) goTo(activeIndex + (dx < 0 ? 1 : -1));
//     setDragStartX(null);
//   };

//   const activeSong = SONGS[activeIndex];

//   return (
//     <div
//       style={{
//         position: "relative",
//         width: "100%",
//         minHeight: "100vh",
//         background: "#f5f3f1",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         overflow: "hidden",
//         padding: "40px 0",
//         fontFamily: "'DM Sans', sans-serif",
//       }}
//     >
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
//         @keyframes ambientPulse {
//           0%, 100% { opacity: 0.4; }
//           50%       { opacity: 0.6;   }
//         }
//       `}</style>

//       <h2 style={{ position: "relative", zIndex: 20, marginBottom: "60px", fontFamily: "'Inter', sans-serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.02em", lineHeight: 1.1, color: "#141b2b", textAlign: "center", maxWidth: "600px", paddingTop: "40px" }}>
//         Listen To Our Agent
//       </h2>

//       {/* <div
//         style={{
//           position: "absolute",
//           inset: 0,
//           background: `radial-gradient(ellipse 80% 60% at 50% 85%, ${activeSong.ambientColor}, rgba(244,244,244,0.97))`,
//           transition: "background 1.2s ease",
//           pointerEvents: "none",
//           animation: "ambientPulse 4s ease-in-out infinite",
//         }}
//       /> */}

//       <div
//         ref={containerRef}
//         style={{
//           position: "relative",
//           width: "100%",
//           maxWidth: 900,
//           height: 560,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           perspective: 1200,
//           cursor: isDragging ? "grabbing" : "grab",
//         }}
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//         onMouseLeave={handleMouseUp}
//         onTouchStart={handleTouchStart}
//         onTouchEnd={handleTouchEnd}
//       >
//         {SONGS.map((song, i) => {
//           const rel = ((i - activeIndex + SONGS.length * 5) % SONGS.length);
//           const adjRel = rel > SONGS.length / 2 ? rel - SONGS.length : rel;
//           const cfg = getSlotStyle(adjRel);
//           const zIndex = 100 - Math.abs(adjRel) * 20;
//           const isCenter = adjRel === 0;

//           return (
//             <div
//               key={i}
//               onClick={() => { if (!isDragging && !isCenter) goTo(i); }}
//               style={{
//                 position: "absolute",
//                 width: 290,
//                 transform: `translateX(${cfg.x}px) translateZ(${cfg.z}px) scale(${cfg.scale}) rotateY(${cfg.rot}deg)`,
//                 opacity: cfg.opacity,
//                 zIndex,
//                 filter: cfg.blur > 0 ? `blur(${cfg.blur}px)` : "none",
//                 transition: "all 0.65s cubic-bezier(0.34,1.2,0.64,1)",
//                 cursor: isCenter ? "default" : "pointer",
//                 transformOrigin: "center bottom",
//                 userSelect: "none",
//                 pointerEvents: cfg.opacity === 0 ? "none" : "auto",
//               }}
//             >
//               <PlayerCard
//                 ref={(el) => (audioRefs.current[i] = el)}
//                 title={song.title}
//                 subtitle={song.artist}
//                 langTag={song.langTag}
//                 gradient={song.gradient}
//                 isCenter={isCenter}
//                 audioSrc={song.audioSrc}
//                 accentColor={song.accentColor}
//                 onPlay={stopAll}
//               />
//             </div>
//           );
//         })}
//       </div>

//       <div style={{ display: "flex", gap: 8, marginTop: 28, position: "relative", zIndex: 10 }}>
//         {SONGS.map((_, i) => (
//           <button
//             key={i}
//             onClick={() => goTo(i)}
//             aria-label={`Go to song ${i + 1}`}
//             style={{
//               width: i === activeIndex ? 24 : 6,
//               height: 6,
//               borderRadius: 99,
//               background: i === activeIndex ? activeSong.accentColor : "rgba(0,0,0,0.2)",
//               border: "none",
//               cursor: "pointer",
//               padding: 0,
//               transition: "all 0.4s cubic-bezier(0.34,1.3,0.64,1)",
//             }}
//           />
//         ))}
//       </div>

//       <p
//         style={{
//           marginTop: 18,
//           fontSize: 11,
//           color: "rgba(0,0,0,0.35)",
//           letterSpacing: "0.12em",
//           textTransform: "uppercase",
//           fontFamily: "'DM Sans', sans-serif",
//           fontWeight: 500,
//           position: "relative",
//           zIndex: 10,
//         }}
//       >
//         ← swipe or click cards · arrow keys supported →
//       </p>
//     </div>
//   );
// }

import { useState, useEffect, useRef, forwardRef, useCallback } from "react";
import { motion } from "framer-motion";

// ─── Grainient (inlined from react-bits) ─────────────────────────────────────
const hexToRgb = hex => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 1, 1];
  return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255];
};

const VERT = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const FRAG = `#version 300 es
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
void main(){ vec4 o=vec4(0.0); mainImage(o,gl_FragCoord.xy); fragColor=o; }
`;

const Grainient = ({
  color1 = '#FF9FFC', color2 = '#5227FF', color3 = '#B497CF',
  timeSpeed = 0.25, colorBalance = 0.0, warpStrength = 1.0,
  warpFrequency = 5.0, warpSpeed = 2.0, warpAmplitude = 50.0,
  blendAngle = 0.0, blendSoftness = 0.05, rotationAmount = 500.0,
  noiseScale = 2.0, grainAmount = 0.1, grainScale = 2.0,
  grainAnimated = false, contrast = 1.5, gamma = 1.0, saturation = 1.0,
  centerX = 0.0, centerY = 0.0, zoom = 0.9,
  enableMouseTracking = false,
  style = {},
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    let renderer, raf, ro;

    const init = async () => {
      try {
        const { Renderer, Program, Mesh, Triangle } = await import('ogl');

        const container = containerRef.current;
        if (!container) return;

        renderer = new Renderer({
          webgl: 2,
          alpha: true,
          antialias: false,
          dpr: Math.min(window.devicePixelRatio || 1, 2),
        });

        const gl = renderer.gl;
        const canvas = gl.canvas;

        // ── KEY FIX: make the canvas fill the container absolutely ──
        canvas.style.cssText = [
          'position:absolute',
          'top:0', 'left:0',
          'width:100%', 'height:100%',
          'display:block',
        ].join(';');

        container.appendChild(canvas);

        const geometry = new Triangle(gl);
        const program = new Program(gl, {
          vertex: VERT, fragment: FRAG,
          uniforms: {
            iTime: { value: 0 },
            iResolution: { value: new Float32Array([1, 1]) },
            uTimeSpeed: { value: timeSpeed }, uColorBalance: { value: colorBalance },
            uWarpStrength: { value: warpStrength }, uWarpFrequency: { value: warpFrequency },
            uWarpSpeed: { value: warpSpeed }, uWarpAmplitude: { value: warpAmplitude },
            uBlendAngle: { value: blendAngle }, uBlendSoftness: { value: blendSoftness },
            uRotationAmount: { value: rotationAmount }, uNoiseScale: { value: noiseScale },
            uGrainAmount: { value: grainAmount }, uGrainScale: { value: grainScale },
            uGrainAnimated: { value: grainAnimated ? 1.0 : 0.0 },
            uContrast: { value: contrast }, uGamma: { value: gamma }, uSaturation: { value: saturation },
            uCenterOffset: { value: new Float32Array([centerX, centerY]) },
            uZoom: { value: zoom },
            uColor1: { value: new Float32Array(hexToRgb(color1)) },
            uColor2: { value: new Float32Array(hexToRgb(color2)) },
            uColor3: { value: new Float32Array(hexToRgb(color3)) },
          },
        });

        const mesh = new Mesh(gl, { geometry, program });

        // ── KEY FIX: measure the CONTAINER, not the canvas ──
        const setSize = () => {
          if (!container) return;
          const w = Math.max(1, Math.floor(container.offsetWidth));
          const h = Math.max(1, Math.floor(container.offsetHeight));
          renderer.setSize(w, h);
          program.uniforms.iResolution.value[0] = gl.drawingBufferWidth;
          program.uniforms.iResolution.value[1] = gl.drawingBufferHeight;
          renderer.render({ scene: mesh });
        };

        ro = new ResizeObserver(setSize);
        ro.observe(container);
        setSize();

        // Mouse tracking
        let tX = centerX, tY = centerY, cX = centerX, cY = centerY;
        const onMove = (e) => {
          if (!enableMouseTracking) return;
          const rect = container.getBoundingClientRect();
          tX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.45;
          tY = ((e.clientY - rect.top) / rect.height - 0.5) * -0.45;
        };
        const onLeave = () => { tX = centerX; tY = centerY; };
        if (enableMouseTracking) {
          container.addEventListener('mousemove', onMove);
          container.addEventListener('mouseleave', onLeave);
        }

        const t0 = performance.now();
        const loop = (t) => {
          if (!containerRef.current) return;
          if (enableMouseTracking) {
            cX += (tX - cX) * 0.06;
            cY += (tY - cY) * 0.06;
            program.uniforms.uCenterOffset.value[0] = cX;
            program.uniforms.uCenterOffset.value[1] = cY;
          }
          program.uniforms.iTime.value = (t - t0) * 0.001;
          renderer.render({ scene: mesh });
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        renderer._cleanup = () => {
          if (enableMouseTracking) {
            container.removeEventListener('mousemove', onMove);
            container.removeEventListener('mouseleave', onLeave);
          }
        };
      } catch (err) { console.error('Grainient error:', err); }
    };

    init();
    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      try { renderer?._cleanup?.(); } catch {}
      try {
        const canvas = containerRef.current?.querySelector('canvas');
        if (canvas && containerRef.current?.contains(canvas)) containerRef.current.removeChild(canvas);
      } catch {}
    };
  }, [color1, color2, color3, timeSpeed, colorBalance, warpStrength, warpFrequency,
    warpSpeed, warpAmplitude, blendAngle, blendSoftness, rotationAmount, noiseScale,
    grainAmount, grainScale, grainAnimated, contrast, gamma, saturation,
    centerX, centerY, zoom, enableMouseTracking]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        // Inherit any border-radius passed via style so the canvas is
        // clipped right at the WebGL layer — not just by an ancestor
        borderRadius: 'inherit',
        ...style,
      }}
    />
  );
};

// ─── Song data ────────────────────────────────────────────────────────────────
const SEED_SM = [10, 28, 18, 42, 22, 35, 12, 48, 30, 20, 38, 15, 44, 25, 10, 18, 32, 8];
const SEED_LG = [12, 22, 40, 18, 55, 30, 15, 60, 22, 48, 10, 38, 25, 55, 18, 30, 48, 20, 35, 12, 50, 28, 15, 40];

const SONGS = [
  {
    title: "Characters",
    artist: "Voice Profiles v1.4",
    duration: 214,
    accentColor: "#00ffc8",
    g1: "#ffb478", g2: "#00ffc8", g3: "#0f766e",
    ambientColor: "rgba(0, 255, 200, 0.12)",
    langTag: "ENGLISH",
    audioSrc: "/audio/english final.mp4",
    warpFrequency: 4, blendAngle: 15, rotationAmount: 380,
  },
  {
    title: "Narration",
    artist: "Synthetic Storytelling v2.0",
    duration: 187,
    accentColor: "#3b82f6",
    g1: "#7dd3fc", g2: "#3b82f6", g3: "#102a43",
    ambientColor: "rgba(59, 130, 246, 0.12)",
    langTag: "HINDI",
    audioSrc: "/audio/hindi final.mp4",
    warpFrequency: 5, blendAngle: 30, rotationAmount: 420,
  },
  {
    title: "Conversational",
    artist: "Dynamic Interaction v3.2",
    duration: 243,
    accentColor: "#7877ff",
    g1: "#a7ffe9", g2: "#7877ff", g3: "#0f6b5d",
    ambientColor: "rgba(120, 119, 255, 0.12)",
    langTag: "TELUGU",
    audioSrc: "/audio/telugu final.mp4",
    warpFrequency: 3.5, blendAngle: -10, rotationAmount: 350,
  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M8 5v14l11-7z" /></svg>
);
const PauseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
);
const SkipPrevIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" /></svg>
);
const SkipNextIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M6 18l8.5-6L6 6v12zM16 6h2v12h-2z" /></svg>
);
const ShuffleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
    <polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" />
    <polyline points="21 16 21 21 16 21" /><line x1="4" y1="4" x2="9" y2="9" />
  </svg>
);
const RepeatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
    <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" />
    <polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
  </svg>
);
const HeartIcon = ({ filled, color }) => (
  <svg viewBox="0 0 24 24" fill={filled ? color : "none"} stroke={filled ? color : "rgba(255,255,255,0.6)"} strokeWidth="2" width="16" height="16">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

// ─── Waveform ─────────────────────────────────────────────────────────────────
const Waveform = ({ isPlaying, barCount = 18, seeds = SEED_SM, accentColor = "#1db954" }) => {
  const barsRef = useRef([]);
  const heightsRef = useRef(Array(barCount).fill(3));
  const rafRef = useRef(null);

  useEffect(() => {
    const animate = () => {
      barsRef.current.forEach((bar, i) => {
        if (!bar) return;
        let target;
        if (isPlaying) {
          const t = Date.now() / 1000;
          const phase = (i / barCount) * Math.PI * 2;
          const wave = Math.sin(t * 3 + phase) * 0.45 + Math.sin(t * 1.7 + phase * 1.5) * 0.3 + 0.3;
          target = Math.max(3, seeds[i % seeds.length] * wave);
        } else {
          target = 3 + (seeds[i % seeds.length] / 55) * 6;
        }
        heightsRef.current[i] = heightsRef.current[i] * 0.65 + target * 0.35;
        bar.style.height = heightsRef.current[i] + "px";
        bar.style.background = isPlaying ? accentColor : "rgba(0,0,0,0.12)";
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPlaying, barCount, seeds, accentColor]);

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: barCount >= 24 ? 28 : 24, overflow: "hidden", marginBottom: 14 }}>
      {Array.from({ length: barCount }).map((_, i) => (
        <div key={i} ref={(el) => (barsRef.current[i] = el)}
          style={{ flex: 1, background: "rgba(0,0,0,0.10)", minHeight: 3, borderRadius: 2, transition: "height 0.08s linear" }} />
      ))}
    </div>
  );
};

// ─── CtrlBtn ──────────────────────────────────────────────────────────────────
const CtrlBtn = ({ children, disabled, onClick }) => (
  <button onClick={onClick}
    style={{ background: "none", border: "none", cursor: disabled ? "default" : "pointer", color: disabled ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.40)", display: "flex", alignItems: "center", justifyContent: "center", padding: 6, borderRadius: "50%", transition: "color 0.18s", outline: "none" }}
    onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.color = "#141b2b"; }}
    onMouseLeave={(e) => { e.currentTarget.style.color = disabled ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.40)"; }}
  >
    {children}
  </button>
);

// ─── PlayerCard ───────────────────────────────────────────────────────────────
export const PlayerCard = forwardRef(
  ({ title, subtitle, langTag, g1, g2, g3, warpFrequency, blendAngle, rotationAmount,
     isCenter, audioSrc, onPlay, accentColor = "#1db954" }, ref) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [liked, setLiked] = useState(false);
    const [artHovered, setArtHovered] = useState(false);
    const [progressHovered, setProgressHovered] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => { if (ref) ref.current = audioRef.current; }, [ref]);

    useEffect(() => {
      const audio = audioRef.current;
      if (!audio) return;
      const onTime = () => setCurrentTime(audio.currentTime);
      const onMeta = () => setDuration(audio.duration);
      const onEnd = () => setIsPlaying(false);
      audio.addEventListener("timeupdate", onTime);
      audio.addEventListener("loadedmetadata", onMeta);
      audio.addEventListener("ended", onEnd);
      return () => {
        audio.removeEventListener("timeupdate", onTime);
        audio.removeEventListener("loadedmetadata", onMeta);
        audio.removeEventListener("ended", onEnd);
      };
    }, []);

    const togglePlay = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (isPlaying) { audio.pause(); setIsPlaying(false); }
      else { onPlay?.(audio); audio.play().then(() => setIsPlaying(true)).catch(() => {}); }
    };

    const handleSeek = (e) => {
      if (!isCenter) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      if (audioRef.current) audioRef.current.currentTime = pct * duration;
    };

    const fmt = (t) => {
      if (!t || isNaN(t)) return "00:00";
      return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(Math.floor(t % 60)).padStart(2, "0")}`;
    };

    const pct = duration ? (currentTime / duration) * 100 : 0;

    return (
      <div style={{
        width: "100%",
        background: "rgba(255,255,255,0.72)",
        border: `1px solid ${isCenter ? accentColor + "50" : "rgba(0,0,0,0.10)"}`,
        borderRadius: 28,
        overflow: "hidden",
        boxShadow: isCenter
          ? `0 8px 40px rgba(0,0,0,0.10), 0 0 60px ${accentColor}25`
          : "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)",
        transition: "border 0.5s ease, box-shadow 0.5s ease",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <audio ref={audioRef} src={audioSrc} />

        {/* ── Artwork wrapper: this is the key fixed container ── */}
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingBottom: "100%",          // square via padding trick
            overflow: "hidden",
            // Explicitly clip the top corners — WebGL canvases can escape
            // CSS overflow:hidden on the parent card in some browsers
            borderRadius: "27px 27px 0 0",
            cursor: isCenter ? "pointer" : "default",
          }}
          onClick={isCenter ? togglePlay : undefined}
          onMouseEnter={() => setArtHovered(true)}
          onMouseLeave={() => setArtHovered(false)}
        >
          {/* Inner absolute fill — also rounded so the canvas itself is clipped */}
          <div style={{ position: "absolute", inset: 0, borderRadius: "27px 27px 0 0", overflow: "hidden" }}>
            {/* Grainient WebGL canvas — now has a real sized parent */}
            <Grainient
              color1={g1} color2={g2} color3={g3}
              timeSpeed={isPlaying ? 1.4 : 0.55}
              colorBalance={0.05}
              warpStrength={isPlaying ? 2.8 : 1.4}
              warpFrequency={warpFrequency ?? 4}
              warpSpeed={isPlaying ? 8.0 : 3.5}
              warpAmplitude={isPlaying ? 30 : 45}
              blendAngle={blendAngle ?? 15}
              blendSoftness={0.1}
              rotationAmount={rotationAmount ?? 380}
              noiseScale={2.2}
              grainAmount={0.06}
              grainScale={2}
              grainAnimated={isPlaying}
              contrast={1.3}
              gamma={1.05}
              saturation={1.1}
              zoom={0.88}
              enableMouseTracking={isCenter}
            />

            {/* Vignette overlay */}
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.28) 100%)",
              pointerEvents: "none",
              zIndex: 1,
            }} />

            {/* Live / lang tag */}
            <div style={{
              position: "absolute", top: 14, left: 14, zIndex: 2,
              background: isPlaying ? accentColor : "rgba(255,255,255,0.75)",
              color: isPlaying ? "#fff" : "#141b2b",
              fontFamily: "'Syne', sans-serif", fontSize: 9, fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase",
              padding: "4px 10px", borderRadius: 99,
              backdropFilter: "blur(8px)",
              transition: "background 0.3s, color 0.3s",
            }}>
              {isPlaying ? "● LIVE" : langTag?.slice(0, 8) || title.slice(0, 6).toUpperCase()}
            </div>

            {/* Like button */}
            <button
              onClick={(e) => { e.stopPropagation(); setLiked(l => !l); }}
              style={{
                position: "absolute", top: 14, right: 14, zIndex: 2,
                width: 36, height: 36, borderRadius: "50%",
                background: liked ? accentColor + "30" : "rgba(255,255,255,0.55)",
                border: `1px solid ${liked ? accentColor : "rgba(255,255,255,0.4)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", backdropFilter: "blur(10px)",
                transition: "all 0.2s", transform: liked ? "scale(1.12)" : "scale(1)",
              }}
              aria-label={liked ? "Unlike" : "Like"}
            >
              <HeartIcon filled={liked} color={accentColor} />
            </button>

            {/* Center play overlay */}
            {isCenter && (
              <div style={{
                position: "absolute", inset: 0, zIndex: 2,
                display: "flex", alignItems: "center", justifyContent: "center",
                opacity: artHovered ? 1 : 0, transition: "opacity 0.25s",
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: accentColor,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: `0 0 36px ${accentColor}70`,
                  transform: artHovered ? "scale(1)" : "scale(0.82)",
                  transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                }}>
                  <span style={{ color: "#fff" }}>{isPlaying ? <PauseIcon /> : <PlayIcon />}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Controls area ── */}
        <div style={{ padding: isCenter ? "18px 20px 16px" : "14px 16px 14px" }}>
          <div style={{ marginBottom: 12 }}>
            <div style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 400,
              fontSize: isCenter ? 20 : 16, color: "#141b2b",
              letterSpacing: "-0.02em", whiteSpace: "nowrap",
              overflow: "hidden", textOverflow: "ellipsis",
            }}>{title}</div>
            <div style={{ fontSize: 12, color: "rgba(20,27,43,0.55)", marginTop: 3, fontWeight: 400, letterSpacing: "0.02em" }}>
              {subtitle}
            </div>
          </div>

          <Waveform
            isPlaying={isPlaying}
            barCount={isCenter ? 24 : 18}
            seeds={isCenter ? SEED_LG : SEED_SM}
            accentColor={accentColor}
          />

          {isCenter && (
            <>
              <div
                style={{ width: "100%", height: progressHovered ? 5 : 3, background: "rgba(0,0,0,0.10)", borderRadius: 99, position: "relative", cursor: "pointer", marginBottom: 6, transition: "height 0.2s ease" }}
                onClick={handleSeek}
                onMouseEnter={() => setProgressHovered(true)}
                onMouseLeave={() => setProgressHovered(false)}
              >
                <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: `${pct}%`, background: accentColor, borderRadius: 99, transition: "width 0.12s linear" }}>
                  <div style={{ position: "absolute", right: -6, top: "50%", transform: "translateY(-50%)", width: 12, height: 12, borderRadius: "50%", background: "#fff", boxShadow: `0 0 0 3px ${accentColor}40`, opacity: progressHovered ? 1 : 0, transition: "opacity 0.2s" }} />
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "rgba(20,27,43,0.45)", letterSpacing: "0.08em", marginBottom: 14, fontVariantNumeric: "tabular-nums" }}>
                <span>{fmt(currentTime)}</span>
                <span>{fmt(duration)}</span>
              </div>
            </>
          )}

          <div style={{ height: "0.5px", background: "rgba(0,0,0,0.08)", marginBottom: 14 }} />

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <CtrlBtn disabled={!isCenter}><ShuffleIcon /></CtrlBtn>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <CtrlBtn disabled={!isCenter}><SkipPrevIcon /></CtrlBtn>
              <button
                onClick={isCenter ? togglePlay : undefined}
                style={{
                  width: isCenter ? 52 : 40, height: isCenter ? 52 : 40,
                  borderRadius: "50%",
                  background: isCenter ? accentColor : "rgba(0,0,0,0.08)",
                  border: "none", cursor: isCenter ? "pointer" : "default",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: isCenter ? "#fff" : "rgba(0,0,0,0.4)",
                  boxShadow: isCenter && isPlaying ? `0 0 28px ${accentColor}40` : isCenter ? `0 0 16px ${accentColor}20` : "none",
                  transition: "all 0.2s ease", flexShrink: 0, outline: "none",
                }}
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>
              <CtrlBtn disabled={!isCenter}><SkipNextIcon /></CtrlBtn>
            </div>
            <CtrlBtn disabled={!isCenter}><RepeatIcon /></CtrlBtn>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14 }}>
            <span style={{
              fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
              color: isPlaying ? accentColor : "rgba(0,0,0,0.35)",
              fontFamily: "'Syne', sans-serif", transition: "color 0.3s",
            }}>{langTag}</span>
            <div style={{
              width: 6, height: 6, borderRadius: "50%",
              background: isPlaying ? accentColor : "rgba(0,0,0,0.15)",
              boxShadow: isPlaying ? `0 0 8px ${accentColor}` : "none",
              transition: "background 0.3s, box-shadow 0.3s",
            }} />
          </div>
        </div>
      </div>
    );
  }
);

PlayerCard.displayName = "PlayerCard";

// ─── Carousel slot positioning ─────────────────────────────────────────────────
function getSlotStyle(rel, isMobile) {
  const configs = isMobile ? {
    "-2": { x: -220, z: -120, scale: 0.80, opacity: 0,    rot: -10 },
    "-1": { x: -160, z: -80,  scale: 0.85, opacity: 0.65, rot: -5  },
    "0":  { x: 0,    z: 0,    scale: 1,    opacity: 1,    rot: 0   },
    "1":  { x: 160,  z: -80,  scale: 0.85, opacity: 0.65, rot: 5   },
    "2":  { x: 220,  z: -120, scale: 0.80, opacity: 0,    rot: 10  },
  } : {
    "-2": { x: -480, z: -120, scale: 0.80, opacity: 0,    rot: -10 },
    "-1": { x: -340, z: -80,  scale: 0.96, opacity: 0.55, rot: -5  },
    "0":  { x: 0,    z: 0,    scale: 1,    opacity: 1,    rot: 0   },
    "1":  { x: 340,  z: -80,  scale: 0.96, opacity: 0.55, rot: 5   },
    "2":  { x: 480,  z: -120, scale: 0.80, opacity: 0,    rot: 10  },
  };
  return configs[String(Math.max(-2, Math.min(2, rel)))];
}

// ─── MusicCarousel ────────────────────────────────────────────────────────────
export default function MusicCarousel() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [dragStartX, setDragStartX] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const audioRefs = useRef({});

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const stopAll = () => Object.values(audioRefs.current).forEach(a => a && a.pause());

  const goTo = useCallback((newIdx) => {
    stopAll();
    setActiveIndex(((newIdx % SONGS.length) + SONGS.length) % SONGS.length);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") goTo(activeIndex - 1);
      if (e.key === "ArrowRight") goTo(activeIndex + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, goTo]);

  const handleMouseDown = (e) => { setDragStartX(e.clientX); setIsDragging(false); };
  const handleMouseMove = (e) => { if (dragStartX !== null && Math.abs(e.clientX - dragStartX) > 8) setIsDragging(true); };
  const handleMouseUp = (e) => {
    if (isDragging && dragStartX !== null) {
      const dx = e.clientX - dragStartX;
      if (Math.abs(dx) > 60) goTo(activeIndex + (dx < 0 ? 1 : -1));
    }
    setTimeout(() => setIsDragging(false), 50);
    setDragStartX(null);
  };
  const handleTouchStart = (e) => setDragStartX(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - dragStartX;
    if (Math.abs(dx) > 50) goTo(activeIndex + (dx < 0 ? 1 : -1));
    setDragStartX(null);
  };

  const activeSong = SONGS[activeIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      style={{
        position: "relative", width: "100%", minHeight: "100vh",
        background: "transparent",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        overflow: "hidden", padding: "40px 0",
        fontFamily: "'DM Sans', sans-serif",
      }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1.0] }}
        style={{
          position: "relative", zIndex: 20, marginBottom: "60px",
          fontFamily: "'Inter', sans-serif", fontSize: "clamp(28px, 4vw, 48px)",
          fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.02em",
          lineHeight: 1.1, color: "#141b2b", textAlign: "center",
          maxWidth: "600px", paddingTop: "40px",
        }}>
        Listen To Our Agent
      </motion.h2>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
        style={{
          position: "relative", width: "100%", maxWidth: 900, height: 560,
          display: "flex", alignItems: "center", justifyContent: "center",
          perspective: 1200,
          cursor: isDragging ? "grabbing" : "grab",
          touchAction: "pan-y",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {SONGS.map((song, i) => {
          const rel = ((i - activeIndex + SONGS.length * 5) % SONGS.length);
          const adjRel = rel > SONGS.length / 2 ? rel - SONGS.length : rel;
          const cfg = getSlotStyle(adjRel, isMobile);
          const isCenter = adjRel === 0;

          return (
            <div
              key={i}
              onClick={() => { if (!isDragging && !isCenter) goTo(i); }}
              style={{
                position: "absolute", width: 290,
                background: "#fff",
                borderRadius: 28,
                transform: `translateX(${cfg.x}px) translateZ(${cfg.z}px) scale(${cfg.scale}) rotateY(${cfg.rot}deg)`,
                opacity: cfg.opacity,
                zIndex: 100 - Math.abs(adjRel) * 20,
                transition: "transform 0.65s cubic-bezier(0.34,1.2,0.64,1), scale 0.65s cubic-bezier(0.34,1.2,0.64,1), opacity 0.65s ease-out 0.15s",
                cursor: isCenter ? "default" : "pointer",
                transformOrigin: "center bottom",
                userSelect: "none",
                pointerEvents: cfg.opacity === 0 ? "none" : "auto",
              }}
            >
              <PlayerCard
                ref={(el) => (audioRefs.current[i] = el)}
                title={song.title}
                subtitle={song.artist}
                langTag={song.langTag}
                g1={song.g1} g2={song.g2} g3={song.g3}
                warpFrequency={song.warpFrequency}
                blendAngle={song.blendAngle}
                rotationAmount={song.rotationAmount}
                isCenter={isCenter}
                audioSrc={song.audioSrc}
                accentColor={song.accentColor}
                onPlay={stopAll}
              />
            </div>
          );
        })}
      </motion.div>

      {/* Dots */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{ display: "flex", gap: 8, marginTop: 28, position: "relative", zIndex: 10 }}
      >
        {SONGS.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => goTo(i)}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: 0.6 + (i * 0.08) }}
            aria-label={`Go to song ${i + 1}`}
            style={{
              width: i === activeIndex ? 24 : 6, height: 6, borderRadius: 99,
              background: i === activeIndex ? activeSong.accentColor : "rgba(0,0,0,0.2)",
              border: "none", cursor: "pointer", padding: 0,
              transition: "all 0.4s cubic-bezier(0.34,1.3,0.64,1)",
            }}
          />
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.7 }}
        style={{
          marginTop: 18, fontSize: 11, color: "rgba(0,0,0,0.35)",
          letterSpacing: "0.12em", textTransform: "uppercase",
          fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
          position: "relative", zIndex: 10,
        }}>
        ← swipe or click cards · arrow keys supported →
      </motion.p>
    </motion.div>
  );
}