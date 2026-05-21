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
//           <blockquote style={{ fontFamily: "'Inter',sans-serif", fontSize: "18px", fontStyle: "italic", lineHeight: 1.6, color: t.dark ? "#fff" : "#141b2b", marginBottom: "48px" }}>"{t.quote}"</blockquote>
//           <div style={{ marginTop: "auto" }}>
//             <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: t.dark ? "#fff" : "#141b2b" }}>{t.name}</div>
//             <div style={{ fontFamily: "'Space Grotesk',monospace", fontSize: "10px", color: t.dark ? "rgba(255,255,255,.5)" : "rgba(20,27,43,.5)", textTransform: "uppercase" }}>{t.role}</div>
//           </div>
//         </div>
//       ))}
//     </div>
//   </section>
// );

// export default WallOfLove;

import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=Space+Grotesk:wght@400;500;700&display=swap');

  .wl-root {
    font-family: 'Inter', sans-serif;
    background: transparent;
    padding: 32px;
    box-sizing: border-box;
  }

  /* ── Header card ── */
  .wl-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px;
    background: #fff;
    border-radius: 20px;
    padding: 40px 44px;
    margin-bottom: 16px;
  }

  .wl-eyebrow {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(20,27,43,0.35);
    margin-bottom: 12px;
  }

  .wl-title {
    font-family: 'Inter', sans-serif;
    font-size: clamp(30px, 4vw, 48px);
    font-weight: 900;
    line-height: 1.06;
    letter-spacing: -0.04em;
    color: #141b2b;
    margin: 0;
  }

  .wl-subtitle {
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-weight: 400;
    color: rgba(20,27,43,0.55);
    line-height: 1.65;
    max-width: 320px;
    margin: 0;
  }

  /* ── Grid ── */
  .wl-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
  }

  /* ── Testimonial card ── */
  .wl-card {
    background: #fff;
    border: 1px solid rgba(20,27,43,0.08);
    border-radius: 20px;
    padding: 32px 32px 28px;
    display: flex;
    flex-direction: column;
    position: relative;
    transition: box-shadow 0.2s, transform 0.2s;
    cursor: default;
    overflow: hidden;
  }

  .wl-card:hover {
    box-shadow: 0 8px 32px rgba(20,27,43,0.07);
    transform: translateY(-2px);
  }

  .wl-card.dark {
    background: #141b2b;
    border-color: transparent;
  }

  .wl-card.dark:hover {
    box-shadow: 0 8px 32px rgba(20,27,43,0.22);
  }

  .wl-card.featured {
    background: #0F6E56;
    border-color: transparent;
  }

  .wl-card.featured:hover {
    box-shadow: 0 8px 32px rgba(15,110,86,0.25);
  }

  /* dot bg for dark/featured cards */
  .wl-card-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0.07;
    pointer-events: none;
  }

  /* ── Stars ── */
  .wl-stars {
    display: flex;
    gap: 4px;
    margin-bottom: 24px;
    position: relative;
    z-index: 1;
  }

  .wl-star {
    width: 14px;
    height: 14px;
    border-radius: 3px;
    flex-shrink: 0;
    transition: background 0.2s;
  }

  /* ── Quote ── */
  .wl-quote {
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-style: italic;
    line-height: 1.7;
    color: #141b2b;
    margin: 0 0 28px;
    flex: 1;
    position: relative;
    z-index: 1;
  }

  .wl-card.dark .wl-quote  { color: rgba(255,255,255,0.85); }
  .wl-card.featured .wl-quote { color: #E1F5EE; }

  /* ── Author ── */
  .wl-author {
    margin-top: auto;
    display: flex;
    align-items: center;
    gap: 12px;
    position: relative;
    z-index: 1;
  }

  .wl-avatar {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 800;
    flex-shrink: 0;
    letter-spacing: -0.02em;
  }

  .wl-author-name {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #141b2b;
  }

  .wl-card.dark .wl-author-name  { color: #fff; }
  .wl-card.featured .wl-author-name { color: #E1F5EE; }

  .wl-author-role {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 10px;
    color: rgba(20,27,43,0.45);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-top: 2px;
  }

  .wl-card.dark .wl-author-role  { color: rgba(255,255,255,0.4); }
  .wl-card.featured .wl-author-role { color: #9FE1CB; }


`;

const testimonials = [
  {
    quote:
      "Nexov replaced an entire inbound team overnight. Call handling went from hours to seconds, and our CSAT scores actually went up.",
    name: "Priya Nair",
    role: "VP Operations · Healthbridge",
    stars: 5,
    variant: "light",
    initials: "PN",
    avatarBg: "#EEEDFE",
    avatarColor: "#534AB7",
  },
  {
    quote:
      "The voice quality is indistinguishable from a human rep. We closed 40% more qualified leads in the first month alone.",
    name: "Marcus Webb",
    role: "Head of Growth · Propelo",
    stars: 5,
    variant: "dark",
    initials: "MW",
    avatarBg: "rgba(128,249,200,0.15)",
    avatarColor: "#80f9c8",
  },
  {
    quote:
      "Setup took less than 48 hours. The CRM sync is flawless — every call is logged with full transcript before I even refresh the page.",
    name: "Sofia Andersson",
    role: "CTO · Loopline SaaS",
    stars: 5,
    variant: "light",
    initials: "SA",
    avatarBg: "#E6F1FB",
    avatarColor: "#185FA5",
  },
  {
    quote:
      "We handle 10,000+ patient reminder calls per week. Zero dropped calls, zero complaints. It simply works.",
    name: "Dr. James Okoro",
    role: "Director · Clarity Clinics",
    stars: 5,
    variant: "featured",
    initials: "JO",
    avatarBg: "rgba(255,255,255,0.15)",
    avatarColor: "#E1F5EE",
  },
  {
    quote:
      "Our e-commerce returns process was a nightmare. Nexov agents handle every step end-to-end — customers love it.",
    name: "Rachel Kim",
    role: "COO · Drift Commerce",
    stars: 5,
    variant: "light",
    initials: "RK",
    avatarBg: "#FAECE7",
    avatarColor: "#993C1D",
  },
  {
    quote:
      "I was skeptical about AI voice. Three months in, I'd never go back. The persona tuning is genuinely impressive.",
    name: "Theo Marchetti",
    role: "Founder · Ascentio",
    stars: 5,
    variant: "dark",
    initials: "TM",
    avatarBg: "rgba(128,249,200,0.15)",
    avatarColor: "#80f9c8",
  },
];

const DotPattern = ({ id }) => (
  <svg
    className="wl-card-bg"
    viewBox="0 0 400 300"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <defs>
      <pattern id={id} width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="1.5" cy="1.5" r="1.5" fill="#9FE1CB" />
      </pattern>
    </defs>
    <rect width="400" height="300" fill={`url(#${id})`} />
  </svg>
);

const StarIcon = ({ filled, dark, featured }) => {
  const filledColor = "#80f9c8";
  const emptyColor = featured
    ? "rgba(255,255,255,0.2)"
    : dark
    ? "rgba(255,255,255,0.15)"
    : "#dce2f7";
  return (
    <div
      className="wl-star"
      style={{ background: filled ? filledColor : emptyColor }}
    />
  );
};

const TestimonialCard = ({ t }) => {
  const isDark = t.variant === "dark";
  const isFeatured = t.variant === "featured";
  const cardClass = `wl-card${isDark ? " dark" : ""}${isFeatured ? " featured" : ""}`;

  return (
    <div className={cardClass}>
      {(isDark || isFeatured) && (
        <DotPattern id={`dots-${t.name.replace(/\s/g, "")}`} />
      )}

      <div className="wl-stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon
            key={i}
            filled={i < t.stars}
            dark={isDark}
            featured={isFeatured}
          />
        ))}
      </div>

      <blockquote className="wl-quote">"{t.quote}"</blockquote>

      <div className="wl-author">
        <div
          className="wl-avatar"
          style={{ background: t.avatarBg, color: t.avatarColor }}
        >
          {t.initials}
        </div>
        <div>
          <div className="wl-author-name">{t.name}</div>
          <div className="wl-author-role">{t.role}</div>
        </div>
      </div>
    </div>
  );
};

const WallOfLove = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(null);

  const goTo = (newIdx) => {
    const maxIndex = testimonials.length - 3;
    const nextIdx = Math.max(0, Math.min(maxIndex, newIdx));
    setActiveIndex(nextIdx);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") goTo(activeIndex - 1);
      if (e.key === "ArrowRight") goTo(activeIndex + 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  const handleMouseDown = (e) => {
    setDragStartX(e.clientX);
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (dragStartX !== null && Math.abs(e.clientX - dragStartX) > 8) {
      setIsDragging(true);
    }
  };

  const handleMouseUp = (e) => {
    if (isDragging && dragStartX !== null) {
      const dx = e.clientX - dragStartX;
      if (Math.abs(dx) > 60) {
        goTo(activeIndex + (dx < 0 ? 1 : -1));
      }
    }
    setTimeout(() => setIsDragging(false), 50);
    setDragStartX(null);
  };

  const handleTouchStart = (e) => setDragStartX(e.touches[0].clientX);

  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - dragStartX;
    if (Math.abs(dx) > 50) {
      goTo(activeIndex + (dx < 0 ? 1 : -1));
    }
    setDragStartX(null);
  };

  const ArrowButton = ({ direction, onClick }) => (
    <button
      onClick={onClick}
      style={{
        position: "absolute",
        top: "50%",
        [direction === "left" ? "left" : "right"]: "16px",
        transform: "translateY(-50%)",
        zIndex: 10,
        width: 48,
        height: 48,
        borderRadius: "50%",
        background: "rgba(20,27,43,0.1)",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s",
        color: "#141b2b",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(20,27,43,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(20,27,43,0.1)";
      }}
    >
      {direction === "left" ? "←" : "→"}
    </button>
  );

  return (
    <>
      <style>{styles}</style>

      <section className="wl-root">
        {/* ── Header ── */}
        <div className="wl-header">
          <div>
            <div className="wl-eyebrow">Customer stories</div>
            <p className="wl-title">
              Wall of<br />
              love
            </p>
          </div>
          <p className="wl-subtitle">
            Real teams, real results. See how businesses across industries are
            replacing legacy call centres with Nexov voice agents.
          </p>
        </div>

        {/* ── Carousel wrapper ── */}
        <div style={{ position: "relative", paddingBottom: 24 }}>
          {/* ── Carousel container ── */}
          <div
            style={{
              position: "relative",
              width: "100%",
              overflow: "hidden",
              cursor: isDragging ? "grabbing" : "grab",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* ── Carousel track ── */}
            <div
              style={{
                display: "flex",
                width: "100%",
                transform: `translateX(calc(-${activeIndex * 33.33}% - ${activeIndex * 16}px))`,
                transition: isDragging ? "none" : "transform 0.65s cubic-bezier(0.34, 1.2, 0.64, 1)",
                gap: "16px",
                paddingLeft: "16px",
                paddingRight: "16px",
              }}
            >
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  style={{
                    flex: "0 0 calc(33.333% - 11px)",
                    minWidth: "calc(33.333% - 11px)",
                  }}
                >
                  <TestimonialCard t={t} />
                </div>
              ))}
            </div>
          </div>

          {/* ── Arrow buttons ── */}
          <ArrowButton
            direction="left"
            onClick={() => goTo(activeIndex - 1)}
          />
          <ArrowButton
            direction="right"
            onClick={() => goTo(activeIndex + 1)}
          />
        </div>

        {/* ── Navigation dots ── */}
        <div
          style={{
            display: "flex",
            gap: 8,
            justifyContent: "center",
            paddingBottom: 16,
          }}
        >
          {Array.from({ length: testimonials.length - 2 }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial group ${i + 1}`}
              style={{
                width: i === activeIndex ? 24 : 6,
                height: 6,
                borderRadius: 99,
                background:
                  i === activeIndex
                    ? "#80f9c8"
                    : "rgba(20,27,43,0.2)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.4s cubic-bezier(0.34,1.3,0.64,1)",
              }}
            />
          ))}
        </div>

        {/* ── Helper text ── */}
        <p
          style={{
            marginTop: 8,
            fontSize: 11,
            color: "rgba(20,27,43,0.35)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          swipe or use arrows to browse
        </p>
      </section>
    </>
  );
};

export default WallOfLove;