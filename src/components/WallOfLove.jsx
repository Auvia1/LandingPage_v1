
import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=Space+Grotesk:wght@400;500;700&display=swap');

  @keyframes wl-fade-in-up {
    from {
      opacity: 0;
      transform: translateY(24px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes wl-fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .wl-root {
    font-family: 'Inter', sans-serif;
    background: transparent;
    padding: 32px;
    box-sizing: border-box;
    margin-bottom: 60px;
    margin-top: 182px;
  }

  /* ───────────────── HEADER ───────────────── */

  .wl-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px;
    background: #fff;
    border-radius: 24px;
    padding: 40px 44px;
    margin-bottom: 18px;
    animation: wl-fade-in-up 0.6s ease-out 0.1s both;
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
    font-size: clamp(34px, 4vw, 52px);
    font-weight: 900;
    line-height: 1;
    letter-spacing: -0.05em;
    color: #141b2b;
    margin: 0;
  }

  .wl-subtitle {
    font-size: 15px;
    color: rgba(20,27,43,0.55);
    line-height: 1.7;
    max-width: 340px;
    margin: 0;
  }

  /* ───────────────── CARD ───────────────── */

  .wl-card {
    background: #fff;
    border: 1px solid rgba(20,27,43,0.08);
    border-radius: 22px;
    padding: 32px;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    min-height: 310px;
    transition:
      transform .35s cubic-bezier(.34,1.56,.64,1),
      box-shadow .35s ease,
      border-color .35s ease;
    animation: wl-fade-in-up 0.6s ease-out both;
  }

  .wl-card-wrap {
    animation: wl-fade-in-up 0.6s ease-out both;
  }

  .wl-card-wrap:nth-child(1) { animation-delay: 0.2s; }
  .wl-card-wrap:nth-child(2) { animation-delay: 0.35s; }
  .wl-card-wrap:nth-child(3) { animation-delay: 0.5s; }
  .wl-card-wrap:nth-child(4) { animation-delay: 0.65s; }
  .wl-card-wrap:nth-child(5) { animation-delay: 0.8s; }
  .wl-card-wrap:nth-child(6) { animation-delay: 0.95s; }

  .wl-card:hover {
    transform: translateY(-6px);
    box-shadow:
      0 12px 40px rgba(20,27,43,0.08),
      0 2px 10px rgba(20,27,43,0.05);
  }

  .wl-card.dark {
    background: #141b2b;
    border-color: transparent;
  }

  .wl-card.featured {
    background: #0F6E56;
    border-color: transparent;
  }

  .wl-card-bg {
    position: absolute;
    inset: 0;
    opacity: .07;
    pointer-events: none;
  }

  /* ───────────────── STARS ───────────────── */

  .wl-stars {
    display: flex;
    gap: 5px;
    margin-bottom: 24px;
    position: relative;
    z-index: 2;
  }

  .wl-star {
    width: 14px;
    height: 14px;
    border-radius: 4px;
  }

  /* ───────────────── QUOTE ───────────────── */

  .wl-quote {
    font-size: 15px;
    line-height: 1.8;
    font-style: italic;
    color: #141b2b;
    margin: 0 0 30px;
    flex: 1;
    position: relative;
    z-index: 2;
  }

  .wl-card.dark .wl-quote {
    color: rgba(255,255,255,.88);
  }

  .wl-card.featured .wl-quote {
    color: #E8FFF7;
  }

  /* ───────────────── AUTHOR ───────────────── */

  .wl-author {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-top: auto;
    position: relative;
    z-index: 2;
  }

  .wl-avatar {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 13px;
    letter-spacing: -0.03em;
    flex-shrink: 0;
  }

  .wl-author-name {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .08em;
    color: #141b2b;
  }

  .wl-card.dark .wl-author-name {
    color: #fff;
  }

  .wl-card.featured .wl-author-name {
    color: #fff;
  }

  .wl-author-role {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 10px;
    letter-spacing: .08em;
    text-transform: uppercase;
    margin-top: 4px;
    color: rgba(20,27,43,.45);
  }

  .wl-card.dark .wl-author-role {
    color: rgba(255,255,255,.45);
  }

  .wl-card.featured .wl-author-role {
    color: rgba(255,255,255,.7);
  }

  /* ───────────────── NAVIGATION DOTS ───────────────── */

  .wl-dots {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 22px;
    animation: wl-fade-in 0.6s ease-out 1.1s both;
  }

  .wl-dot {
    border: none;
    height: 6px;
    border-radius: 999px;
    cursor: pointer;
    transition: all .4s cubic-bezier(.34,1.56,.64,1);
  }

  /* ───────────────── RESPONSIVE ───────────────── */

  .wl-helper {
    animation: wl-fade-in 0.6s ease-out 1.2s both;
  }

  @media (max-width: 1100px) {
    .wl-card-wrap {
      min-width: calc(50% - 8px) !important;
      flex: 0 0 calc(50% - 8px) !important;
    }
  }

  @media (max-width: 768px) {
    .wl-root {
      padding: 18px;
    }

    .wl-header {
      flex-direction: column;
      align-items: flex-start;
      padding: 28px;
    }

    .wl-card-wrap {
      min-width: 100% !important;
      flex: 0 0 100% !important;
    }
  }
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
    avatarColor: "#fff",
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
    ? "rgba(255,255,255,.22)"
    : dark
    ? "rgba(255,255,255,.15)"
    : "#dce2f7";

  return (
    <div
      className="wl-star"
      style={{
        background: filled ? filledColor : emptyColor,
      }}
    />
  );
};

const TestimonialCard = ({ t }) => {
  const isDark = t.variant === "dark";
  const isFeatured = t.variant === "featured";

  return (
    <div
      className={`wl-card ${isDark ? "dark" : ""} ${
        isFeatured ? "featured" : ""
      }`}
    >
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

      <blockquote className="wl-quote">
        "{t.quote}"
      </blockquote>

      <div className="wl-author">
        <div
          className="wl-avatar"
          style={{
            background: t.avatarBg,
            color: t.avatarColor,
          }}
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

  const visibleCards =
    window.innerWidth < 768
      ? 1
      : window.innerWidth < 1100
      ? 2
      : 3;

  const maxIndex =
    testimonials.length - visibleCards;

  const goTo = (idx) => {
    const next = Math.max(
      0,
      Math.min(maxIndex, idx)
    );

    setActiveIndex(next);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft")
        goTo(activeIndex - 1);

      if (e.key === "ArrowRight")
        goTo(activeIndex + 1);
    };

    window.addEventListener("keydown", handleKey);

    return () =>
      window.removeEventListener(
        "keydown",
        handleKey
      );
  }, [activeIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === maxIndex ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [maxIndex]);

  return (
    <>
      <style>{styles}</style>

      <section className="wl-root">
        {/* HEADER */}

        <div className="wl-header">
          <div>
            <div className="wl-eyebrow">
              Customer stories
            </div>

            <h2 className="wl-title">
              Wall of
              <br />
              love
            </h2>
          </div>

          <p className="wl-subtitle">
            Real teams, real results. See how
            businesses across industries are
            replacing legacy call centres with
            Nexov voice agents.
          </p>
        </div>

        {/* CAROUSEL */}

        <div
          style={{
            position: "relative",
          }}
        >
          <div
            style={{
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 16,

                transform: `translateX(calc(-${
                  activeIndex * 33.33
                }% - ${activeIndex * 16}px))`,

                transition:
                  "transform .8s cubic-bezier(.22,1,.36,1)",

                padding: "4px",
              }}
            >
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="wl-card-wrap"
                  style={{
                    flex:
                      "0 0 calc(33.333% - 11px)",

                    minWidth:
                      "calc(33.333% - 11px)",
                  }}
                >
                  <TestimonialCard t={t} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DOTS */}

        <div className="wl-dots">
          {Array.from({
            length: maxIndex + 1,
          }).map((_, i) => (
            <button
              key={i}
              className="wl-dot"
              onClick={() => goTo(i)}
              style={{
                width:
                  activeIndex === i
                    ? 28
                    : 6,

                background:
                  activeIndex === i
                    ? "#80f9c8"
                    : "rgba(20,27,43,.18)",
              }}
            />
          ))}
        </div>

        {/* HELPER */}

        <p
          className="wl-helper"
          style={{
            textAlign: "center",
            marginTop: 18,
            fontSize: 11,
            letterSpacing: ".14em",
            textTransform: "uppercase",
            color: "rgba(20,27,43,.38)",
            fontFamily:
              "'Space Grotesk', sans-serif",
          }}
        >
          Swipe or use arrows to browse
        </p>
      </section>
    </>
  );
};

export default WallOfLove;