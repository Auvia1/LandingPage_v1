
import { useState, useEffect, useRef, forwardRef } from "react";

// ── Constants ─────────────────────────────────────────────────────────────────
const SEED_SM = [10, 28, 18, 42, 22, 35, 12, 48, 30, 20, 38, 15, 44, 25, 10, 18, 32, 8];
const SEED_LG = [12, 22, 40, 18, 55, 30, 15, 60, 22, 48, 10, 38, 25, 55, 18, 30, 48, 20, 35, 12, 50, 28, 15, 40];

// ── Icon (Material Symbols, matches site usage) ───────────────────────────────
const Icon = ({ name, style = {} }) => (
  <span
    className="material-symbols-outlined"
    style={{ fontFamily: "Material Symbols Outlined", fontSize: 20, ...style }}
  >
    {name}
  </span>
);

// ── Waveform visualiser ───────────────────────────────────────────────────────
const Waveform = ({ isPlaying, barCount = 18, seeds = SEED_SM, isCenter = false }) => {
  const barsRef   = useRef([]);
  const heightsRef = useRef(Array(barCount).fill(3));
  const rafRef    = useRef(null);

  useEffect(() => {
    const animate = () => {
      barsRef.current.forEach((bar, i) => {
        if (!bar) return;
        let target;
        if (isPlaying) {
          const t     = Date.now() / 1000;
          const phase = (i / barCount) * Math.PI * 2;
          const wave  =
            Math.sin(t * 2.5 + phase) * 0.4 +
            Math.sin(t * 1.3 + phase * 1.7) * 0.3 +
            0.3;
          target = Math.max(3, seeds[i % seeds.length] * wave);
        } else {
          target = 3 + (seeds[i % seeds.length] / 55) * 6;
        }
        heightsRef.current[i] = heightsRef.current[i] * 0.7 + target * 0.3;
        bar.style.height     = heightsRef.current[i] + "px";
        bar.style.background = isPlaying ? "#000" : "rgba(20,27,43,0.18)";
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPlaying, barCount, seeds]);

  return (
    <div
      style={{
        display:    "flex",
        alignItems: "flex-end",
        gap:        2,
        height:     isCenter ? 40 : 32,
        overflow:   "hidden",
      }}
    >
      {Array.from({ length: barCount }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (barsRef.current[i] = el)}
          style={{
            flex:       1,
            background: "rgba(20,27,43,0.18)",
            minHeight:  3,
            borderRadius: 1,
            transition: "height 0.08s linear",
          }}
        />
      ))}
    </div>
  );
};

// ── PlayerCard ────────────────────────────────────────────────────────────────
export const PlayerCard = forwardRef(
  ({ title, subtitle, langTag, gradient, isCenter, audioSrc, onPlay }, ref) => {
    const [isPlaying,   setIsPlaying]   = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration,    setDuration]    = useState(0);
    const [artHovered,  setArtHovered]  = useState(false);
    const [progHovered, setProgHovered] = useState(false);
    const audioRef = useRef(null);

    // Expose audio element via ref
    useEffect(() => { if (ref) ref.current = audioRef.current; }, [ref]);

    useEffect(() => {
      const audio = audioRef.current;
      if (!audio) return;
      const onTime = () => setCurrentTime(audio.currentTime);
      const onMeta = () => setDuration(audio.duration);
      const onEnd  = () => setIsPlaying(false);
      audio.addEventListener("timeupdate",      onTime);
      audio.addEventListener("loadedmetadata",  onMeta);
      audio.addEventListener("ended",           onEnd);
      return () => {
        audio.removeEventListener("timeupdate",     onTime);
        audio.removeEventListener("loadedmetadata", onMeta);
        audio.removeEventListener("ended",          onEnd);
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
      const pct  = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      if (audioRef.current) audioRef.current.currentTime = pct * duration;
    };

    const fmt = (t) => {
      if (!t || isNaN(t)) return "00:00";
      return `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(
        Math.floor(t % 60)
      ).padStart(2, "0")}`;
    };

    const pct = duration ? (currentTime / duration) * 100 : 0;

    // ── sizing tokens ──
    const W   = isCenter ? 260 : 212;
    const AH  = isCenter ? 260 : 212;
    const SHD = isCenter ? "6px 6px 0 #000" : "4px 4px 0 #000";

    return (
      <div
        style={{
          display:       "flex",
          flexDirection: "column",
          background:    "#fff",
          width:         W,
          border:        "1px solid #000",
          boxShadow:     isPlaying ? `6px 6px 0 #000` : SHD,
          flexShrink:    0,
          transition:    "box-shadow 0.2s",
          fontFamily:    "'Inter', sans-serif",
        }}
      >
        <audio ref={audioRef} src={audioSrc} />

        {/* ── Art cover ─────────────────────────────────────── */}
        <div
          style={{
            position:  "relative",
            width:     "100%",
            height:    AH,
            cursor:    "pointer",
            flexShrink: 0,
            overflow:  "hidden",
            borderBottom: "1px solid #000",
          }}
          onClick={togglePlay}
          onMouseEnter={() => setArtHovered(true)}
          onMouseLeave={() => setArtHovered(false)}
        >
          {/* gradient bg */}
          <div style={{ position: "absolute", inset: 0, background: gradient }} />

          {/* subtle dark overlay */}
          <div
            style={{
              position:   "absolute",
              inset:      0,
              background: `rgba(0,0,0,${artHovered ? 0.06 : 0.18})`,
              transition: "background 0.2s",
            }}
          />

          {/* LIVE / title badge — top-left */}
          <div
            style={{
              position:    "absolute",
              top:         10,
              left:        10,
              background:  isPlaying ? "#80f9c8" : "#000",
              color:       isPlaying ? "#000" : "#fff",
              fontFamily:  "'Space Grotesk', monospace",
              fontSize:    9,
              fontWeight:  700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              padding:     "3px 9px",
              border:      isPlaying ? "1px solid #000" : "none",
              transition:  "background 0.2s, color 0.2s",
            }}
          >
            {isPlaying ? "● LIVE" : title.slice(0, 6).toUpperCase()}
          </div>

          {/* Play / pause circle */}
          <div
            style={{
              position:        "absolute",
              inset:           0,
              display:         "flex",
              alignItems:      "center",
              justifyContent:  "center",
            }}
          >
            <div
              style={{
                width:           isCenter ? 56 : 44,
                height:          isCenter ? 56 : 44,
                background:      artHovered ? "#80f9c8" : "#fff",
                border:          "1px solid #000",
                boxShadow:       artHovered ? "3px 3px 0 #000" : "2px 2px 0 #000",
                display:         "flex",
                alignItems:      "center",
                justifyContent:  "center",
                transition:      "background 0.18s, transform 0.15s, box-shadow 0.15s",
                transform:       artHovered ? "scale(1.06)" : "scale(1)",
              }}
            >
              <Icon
                name={isPlaying ? "pause" : "play_arrow"}
                style={{ fontSize: isCenter ? 22 : 18, color: "#000" }}
              />
            </div>
          </div>
        </div>

        {/* ── Body ──────────────────────────────────────────── */}
        <div
          style={{
            padding:       isCenter ? "18px 20px 16px" : "14px 16px 14px",
            display:       "flex",
            flexDirection: "column",
            gap:           isCenter ? 12 : 10,
            flex:          1,
          }}
        >
          {/* Title + subtitle */}
          <div>
            <div
              style={{
                fontFamily:    "'Inter', sans-serif",
                fontWeight:    900,
                fontSize:      isCenter ? 18 : 14,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                color:         "#141b2b",
                whiteSpace:    "nowrap",
                overflow:      "hidden",
                textOverflow:  "ellipsis",
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontFamily:    "'Space Grotesk', monospace",
                fontSize:      9,
                color:         "rgba(20,27,43,0.4)",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                marginTop:     3,
                fontWeight:    500,
              }}
            >
              {subtitle}
            </div>
          </div>

          {/* Waveform */}
          <Waveform
            isPlaying={isPlaying}
            barCount={isCenter ? 24 : 18}
            seeds={isCenter ? SEED_LG : SEED_SM}
            isCenter={isCenter}
          />

          {/* Progress bar — center only */}
          {isCenter && (
            <>
              <div
                style={{
                  width:        "100%",
                  height:       progHovered ? 5 : 3,
                  background:   "#e8e8e8",
                  border:       "1px solid #000",
                  position:     "relative",
                  cursor:       "pointer",
                  transition:   "height 0.15s",
                }}
                onClick={handleSeek}
                onMouseEnter={() => setProgHovered(true)}
                onMouseLeave={() => setProgHovered(false)}
              >
                <div
                  style={{
                    position:   "absolute",
                    top:        0,
                    left:       0,
                    height:     "100%",
                    width:      `${pct}%`,
                    background: "#000",
                    transition: "width 0.1s linear",
                  }}
                />
                {/* scrubber thumb */}
                <div
                  style={{
                    position:   "absolute",
                    top:        "50%",
                    left:       `${pct}%`,
                    transform:  "translate(-50%, -50%)",
                    width:      10,
                    height:     10,
                    background: "#80f9c8",
                    border:     "1px solid #000",
                    opacity:    progHovered ? 1 : 0,
                    transition: "opacity 0.15s, left 0.1s linear",
                  }}
                />
              </div>
              <div
                style={{
                  display:        "flex",
                  justifyContent: "space-between",
                  fontFamily:     "'Space Grotesk', monospace",
                  fontSize:       8,
                  color:          "rgba(20,27,43,0.38)",
                  letterSpacing:  "0.1em",
                  marginTop:      -4,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                <span>{fmt(currentTime)}</span>
                <span>{fmt(duration)}</span>
              </div>
            </>
          )}

          {/* Divider */}
          <div
            style={{
              height:     1,
              background: "#000",
              margin:     `0 ${isCenter ? -20 : -16}px`,
              opacity:    0.08,
            }}
          />

          {/* Controls */}
          <div
            style={{
              display:        "flex",
              alignItems:     "center",
              justifyContent: "space-between",
            }}
          >
            {/* shuffle */}
            <CtrlBtn disabled={!isCenter}>
              <Icon name="shuffle" style={{ fontSize: 18, color: "inherit" }} />
            </CtrlBtn>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {/* skip prev */}
              <CtrlBtn disabled={!isCenter}>
                <Icon name="skip_previous" style={{ fontSize: 20, color: "inherit" }} />
              </CtrlBtn>

              {/* primary play btn */}
              <button
                onClick={togglePlay}
                style={{
                  background:      isPlaying ? "#80f9c8" : "#000",
                  border:          "1px solid #000",
                  boxShadow:       isPlaying ? "2px 2px 0 #000" : "3px 3px 0 rgba(0,0,0,0.2)",
                  cursor:          "pointer",
                  width:           isCenter ? 44 : 36,
                  height:          isCenter ? 44 : 36,
                  display:         "flex",
                  alignItems:      "center",
                  justifyContent:  "center",
                  transition:      "background 0.15s, box-shadow 0.15s",
                  flexShrink:      0,
                }}
              >
                <Icon
                  name={isPlaying ? "pause" : "play_arrow"}
                  style={{
                    fontSize: isCenter ? 22 : 18,
                    color:    isPlaying ? "#000" : "#80f9c8",
                  }}
                />
              </button>

              {/* skip next */}
              <CtrlBtn disabled={!isCenter}>
                <Icon name="skip_next" style={{ fontSize: 20, color: "inherit" }} />
              </CtrlBtn>
            </div>

            {/* repeat */}
            <CtrlBtn disabled={!isCenter}>
              <Icon name="repeat" style={{ fontSize: 18, color: "inherit" }} />
            </CtrlBtn>
          </div>

          {/* Lang tag + live dot */}
          <div
            style={{
              display:        "flex",
              alignItems:     "center",
              justifyContent: "space-between",
              marginTop:      2,
            }}
          >
            <span
              style={{
                fontFamily:    "'Space Grotesk', monospace",
                fontSize:      8,
                fontWeight:    700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color:         isPlaying ? "#006c4e" : "rgba(20,27,43,0.3)",
                transition:    "color 0.3s",
              }}
            >
              {langTag}
            </span>

            {/* pulsing live indicator */}
            <div
              style={{
                width:        6,
                height:       6,
                background:   isPlaying ? "#80f9c8" : "#d0d0d0",
                border:       isPlaying ? "1px solid #000" : "1px solid #ccc",
                transition:   "background 0.3s, border 0.3s",
                animation:    isPlaying ? "nexovPulse 1.6s ease-in-out infinite" : "none",
              }}
            />
          </div>
        </div>

        {/* keyframe injected once */}
        <style>{`
          @keyframes nexovPulse {
            0%,100% { opacity: 1; }
            50%      { opacity: 0.35; }
          }
        `}</style>
      </div>
    );
  }
);

PlayerCard.displayName = "PlayerCard";

// ── Tiny control button helper ────────────────────────────────────────────────
const CtrlBtn = ({ children, disabled, onClick }) => (
  <button
    onClick={onClick}
    style={{
      background:   "none",
      border:       "none",
      cursor:       disabled ? "default" : "pointer",
      color:        disabled ? "rgba(20,27,43,0.18)" : "rgba(20,27,43,0.38)",
      display:      "flex",
      alignItems:   "center",
      justifyContent: "center",
      padding:      4,
      transition:   "color 0.15s",
    }}
    onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.color = "#141b2b"; }}
    onMouseLeave={(e) => {
      e.currentTarget.style.color = disabled
        ? "rgba(20,27,43,0.18)"
        : "rgba(20,27,43,0.38)";
    }}
  >
    {children}
  </button>
);