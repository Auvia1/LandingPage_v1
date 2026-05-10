import { useState, useEffect, useRef, forwardRef, useCallback } from "react";

const SEED_SM = [10, 28, 18, 42, 22, 35, 12, 48, 30, 20, 38, 15, 44, 25, 10, 18, 32, 8];
const SEED_LG = [12, 22, 40, 18, 55, 30, 15, 60, 22, 48, 10, 38, 25, 55, 18, 30, 48, 20, 35, 12, 50, 28, 15, 40];

const SONGS = [
  {
    title: "Characters",
    artist: "Voice Profiles v1.4",
    duration: 214,
    accentColor: "#ec4899",
    gradient: "radial-gradient(at 100% 0%, rgb(236, 72, 153), rgb(239, 68, 68), rgb(234, 179, 8))",
    ambientColor: "rgba(236, 72, 153, 0.15)",
    langTag: "ENGLISH",
    audioSrc: "/assets/audio/english final.mp4",
  },
  {
    title: "Narration",
    artist: "Synthetic Storytelling v2.0",
    duration: 187,
    accentColor: "#60a5fa",
    gradient: "radial-gradient(at 100% 100%, rgb(134, 239, 172), rgb(59, 130, 246), rgb(147, 51, 234))",
    ambientColor: "rgba(59, 130, 246, 0.12)",
    langTag: "HINDI",
    audioSrc: "/assets/audio/hindi final.mp4",
  },
  {
    title: "Conversational",
    artist: "Dynamic Interaction v3.2",
    duration: 243,
    accentColor: "#22c55e",
    gradient: "radial-gradient(at 100% 100%, rgb(239, 68, 68), rgb(34, 197, 94))",
    ambientColor: "rgba(34, 197, 94, 0.12)",
    langTag: "TELUGU",
    audioSrc: "/assets/audio/telugu final.mp4",
  },
];

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

const SkipPrevIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
  </svg>
);

const SkipNextIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M6 18l8.5-6L6 6v12zM16 6h2v12h-2z" />
  </svg>
);

const ShuffleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
    <polyline points="16 3 21 3 21 8" />
    <line x1="4" y1="20" x2="21" y2="3" />
    <polyline points="21 16 21 21 16 21" />
    <line x1="4" y1="4" x2="9" y2="9" />
  </svg>
);

const RepeatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
    <polyline points="17 1 21 5 17 9" />
    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
    <polyline points="7 23 3 19 7 15" />
    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
  </svg>
);

const HeartIcon = ({ filled, color }) => (
  <svg viewBox="0 0 24 24" fill={filled ? color : "none"} stroke={filled ? color : "rgba(0,0,0,0.4)"} strokeWidth="2" width="16" height="16">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

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
          const wave =
            Math.sin(t * 3 + phase) * 0.45 +
            Math.sin(t * 1.7 + phase * 1.5) * 0.3 +
            0.3;
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
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 2,
        height: barCount >= 24 ? 28 : 24,
        overflow: "hidden",
        marginBottom: 14,
      }}
    >
      {Array.from({ length: barCount }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (barsRef.current[i] = el)}
          style={{
            flex: 1,
            background: "rgba(0,0,0,0.10)",
            minHeight: 3,
            borderRadius: 2,
            transition: "height 0.08s linear",
          }}
        />
      ))}
    </div>
  );
};

export const PlayerCard = forwardRef(
  ({ title, subtitle, langTag, gradient, isCenter, audioSrc, onPlay, accentColor = "#1db954" }, ref) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [liked, setLiked] = useState(false);
    const [artHovered, setArtHovered] = useState(false);
    const [progressHovered, setProgressHovered] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
      if (ref) ref.current = audioRef.current;
    }, [ref]);

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
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        onPlay?.(audio);
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
      }
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
      <div
        style={{
          width: "100%",
          background: "rgba(255,255,255,0.7)",
          border: `1px solid ${isCenter ? accentColor + "40" : "rgba(0,0,0,0.10)"}`,
          borderRadius: 28,
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          overflow: "hidden",
          boxShadow: isCenter
            ? `0 8px 32px rgba(0,0,0,0.08), 0 0 40px ${accentColor}20`
            : "0 8px 24px rgba(0,0,0,0.06)",
          transition: "border 0.5s ease, box-shadow 0.5s ease",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <audio ref={audioRef} src={audioSrc} />

        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "1",
            overflow: "hidden",
            cursor: "pointer",
          }}
          onClick={isCenter ? togglePlay : undefined}
          onMouseEnter={() => setArtHovered(true)}
          onMouseLeave={() => setArtHovered(false)}
        >
          <div style={{ position: "absolute", inset: 0, background: gradient }} />

          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(circle at 50% 50%, ${accentColor}30 0%, transparent 70%)`,
            }}
          />

          <div
            style={{
              position: "absolute",
              top: 14,
              left: 14,
              background: isPlaying ? accentColor : "rgba(255,255,255,0.85)",
              color: isPlaying ? "#fff" : "#141b2b",
              fontFamily: "'Syne', sans-serif",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              padding: "4px 10px",
              borderRadius: 99,
              backdropFilter: "blur(8px)",
              transition: "background 0.3s, color 0.3s",
            }}
          >
            {isPlaying ? "● LIVE" : langTag?.slice(0, 8) || title.slice(0, 6).toUpperCase()}
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); setLiked((l) => !l); }}
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: liked ? accentColor + "20" : "rgba(255,255,255,0.6)",
              border: `1px solid ${liked ? accentColor : "rgba(0,0,0,0.10)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backdropFilter: "blur(10px)",
              transition: "all 0.2s",
              transform: liked ? "scale(1.1)" : "scale(1)",
            }}
            aria-label={liked ? "Unlike" : "Like"}
          >
            <HeartIcon filled={liked} color={accentColor} />
          </button>

          {isCenter && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: artHovered ? 1 : 0,
                transition: "opacity 0.25s",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: accentColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 0 32px ${accentColor}60`,
                  transform: artHovered ? "scale(1)" : "scale(0.85)",
                  transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                }}
              >
                <span style={{ color: "#fff" }}>
                  {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </span>
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: isCenter ? "18px 20px 16px" : "14px 16px 14px" }}>
          <div style={{ marginBottom: 12 }}>
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: isCenter ? 20 : 16,
                color: "#141b2b",
                letterSpacing: "-0.02em",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: 12,
                color: "rgba(20,27,43,0.55)",
                marginTop: 3,
                fontWeight: 400,
                letterSpacing: "0.02em",
              }}
            >
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
                style={{
                  width: "100%",
                  height: progressHovered ? 5 : 3,
                  background: "rgba(0,0,0,0.10)",
                  borderRadius: 99,
                  position: "relative",
                  cursor: "pointer",
                  marginBottom: 6,
                  transition: "height 0.2s ease",
                }}
                onClick={handleSeek}
                onMouseEnter={() => setProgressHovered(true)}
                onMouseLeave={() => setProgressHovered(false)}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: `${pct}%`,
                    background: accentColor,
                    borderRadius: 99,
                    transition: "width 0.12s linear",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      right: -6,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: "#fff",
                      boxShadow: `0 0 0 3px ${accentColor}40`,
                      opacity: progressHovered ? 1 : 0,
                      transition: "opacity 0.2s",
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 10,
                  color: "rgba(20,27,43,0.45)",
                  letterSpacing: "0.08em",
                  marginBottom: 14,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                <span>{fmt(currentTime)}</span>
                <span>{fmt(duration)}</span>
              </div>
            </>
          )}

          <div
            style={{
              height: "0.5px",
              background: "rgba(0,0,0,0.08)",
              marginBottom: 14,
            }}
          />

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <CtrlBtn disabled={!isCenter}>
              <ShuffleIcon />
            </CtrlBtn>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <CtrlBtn disabled={!isCenter}>
                <SkipPrevIcon />
              </CtrlBtn>

              <button
                onClick={isCenter ? togglePlay : undefined}
                style={{
                  width: isCenter ? 52 : 40,
                  height: isCenter ? 52 : 40,
                  borderRadius: "50%",
                  background: isCenter ? accentColor : "rgba(0,0,0,0.08)",
                  border: "none",
                  cursor: isCenter ? "pointer" : "default",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: isCenter ? "#fff" : "rgba(0,0,0,0.4)",
                  boxShadow: isCenter && isPlaying
                    ? `0 0 28px ${accentColor}40`
                    : isCenter
                    ? `0 0 16px ${accentColor}20`
                    : "none",
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                  outline: "none",
                }}
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>

              <CtrlBtn disabled={!isCenter}>
                <SkipNextIcon />
              </CtrlBtn>
            </div>

            <CtrlBtn disabled={!isCenter}>
              <RepeatIcon />
            </CtrlBtn>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 14,
            }}
          >
            <span
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: isPlaying ? accentColor : "rgba(0,0,0,0.35)",
                fontFamily: "'Syne', sans-serif",
                transition: "color 0.3s",
              }}
            >
              {langTag}
            </span>
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: isPlaying ? accentColor : "rgba(0,0,0,0.15)",
                boxShadow: isPlaying ? `0 0 8px ${accentColor}` : "none",
                transition: "background 0.3s, box-shadow 0.3s",
              }}
            />
          </div>
        </div>
      </div>
    );
  }
);

PlayerCard.displayName = "PlayerCard";

const CtrlBtn = ({ children, disabled, onClick }) => (
  <button
    onClick={onClick}
    style={{
      background: "none",
      border: "none",
      cursor: disabled ? "default" : "pointer",
      color: disabled ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.40)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 6,
      borderRadius: "50%",
      transition: "color 0.18s, transform 0.15s",
      outline: "none",
    }}
    onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.color = "#141b2b"; }}
    onMouseLeave={(e) => { e.currentTarget.style.color = disabled ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.40)"; }}
  >
    {children}
  </button>
);

function getSlotStyle(rel, accentColor) {
  const configs = {
    "-2": { x: -480, z: -120, scale: 0.60, opacity: 0,    rot: -10, blur: 20 },
    "-1": { x: -260, z: -80,  scale: 0.76, opacity: 0.55, rot: -5,  blur: 10 },
    "0":  { x: 0,    z: 0,    scale: 1,    opacity: 1,    rot: 0,   blur: 0  },
    "1":  { x: 260,  z: -80,  scale: 0.76, opacity: 0.55, rot: 5,   blur: 10 },
    "2":  { x: 480,  z: -120, scale: 0.60, opacity: 0,    rot: 10,  blur: 20 },
  };
  const k = Math.max(-2, Math.min(2, rel));
  return configs[String(k)];
}

export default function MusicCarousel() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [likes, setLikes] = useState({});
  const [dragStartX, setDragStartX] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const audioRefs = useRef({});
  const containerRef = useRef(null);

  const stopAll = () => {
    Object.values(audioRefs.current).forEach((a) => { if (a) a.pause(); });
  };

  const goTo = useCallback((newIdx) => {
    stopAll();
    const next = ((newIdx % SONGS.length) + SONGS.length) % SONGS.length;
    setActiveIndex(next);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") goTo(activeIndex - 1);
      if (e.key === "ArrowRight") goTo(activeIndex + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, goTo]);

  const handleMouseDown = (e) => {
    setDragStartX(e.clientX);
    setIsDragging(false);
  };
  const handleMouseMove = (e) => {
    if (dragStartX !== null && Math.abs(e.clientX - dragStartX) > 8) setIsDragging(true);
  };
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
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        background: "#f4f4f4",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "40px 0",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes ambientPulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.6;   }
        }
      `}</style>

      <h2 style={{ position: "relative", zIndex: 20, marginBottom: "60px", fontFamily: "'Inter', sans-serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.02em", lineHeight: 1.1, color: "#141b2b", textAlign: "center", maxWidth: "600px", paddingTop: "40px" }}>
        Listen To Our Agent
      </h2>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 80% 60% at 50% 85%, ${activeSong.ambientColor}, rgba(244,244,244,0.97))`,
          transition: "background 1.2s ease",
          pointerEvents: "none",
          animation: "ambientPulse 4s ease-in-out infinite",
        }}
      />

      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 900,
          height: 560,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          perspective: 1200,
          cursor: isDragging ? "grabbing" : "grab",
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
          const cfg = getSlotStyle(adjRel);
          const zIndex = 100 - Math.abs(adjRel) * 20;
          const isCenter = adjRel === 0;

          return (
            <div
              key={i}
              onClick={() => { if (!isDragging && !isCenter) goTo(i); }}
              style={{
                position: "absolute",
                width: 290,
                transform: `translateX(${cfg.x}px) translateZ(${cfg.z}px) scale(${cfg.scale}) rotateY(${cfg.rot}deg)`,
                opacity: cfg.opacity,
                zIndex,
                filter: cfg.blur > 0 ? `blur(${cfg.blur}px)` : "none",
                transition: "all 0.65s cubic-bezier(0.34,1.2,0.64,1)",
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
                gradient={song.gradient}
                isCenter={isCenter}
                audioSrc={song.audioSrc}
                accentColor={song.accentColor}
                onPlay={stopAll}
              />
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 28, position: "relative", zIndex: 10 }}>
        {SONGS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to song ${i + 1}`}
            style={{
              width: i === activeIndex ? 24 : 6,
              height: 6,
              borderRadius: 99,
              background: i === activeIndex ? activeSong.accentColor : "rgba(0,0,0,0.2)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.4s cubic-bezier(0.34,1.3,0.64,1)",
            }}
          />
        ))}
      </div>

      <p
        style={{
          marginTop: 18,
          fontSize: 11,
          color: "rgba(0,0,0,0.35)",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
          position: "relative",
          zIndex: 10,
        }}
      >
        ← swipe or click cards · arrow keys supported →
      </p>
    </div>
  );
}
