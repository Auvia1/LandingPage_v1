// import { motion } from "framer-motion";
// import { useState, useRef, useEffect } from "react";

// const features = [
//   {
//     title: "REALTIME REASONING",
//     description: "Processes and responds to conversations instantly, enabling AI agents to think, adapt, and act with near-human responsiveness."
//   },
//   {
//     title: "LOW LATENCY",
//     description: "Ultra-fast infrastructure engineered for sub-second response times across voice processing, inference, and agent execution."
//   },
//   {
//     title: "HUMAN-LIKE VOICE",
//     description: "Natural conversational speech synthesis that captures tone, pacing, emotion, and real-time interaction dynamics."
//   },
//   {
//     title: "MULTI-AGENT INTELLIGENCE",
//     description: "Coordinate multiple AI agents simultaneously to handle complex workflows, parallel tasks, and autonomous decision-making."
//   }
// ];

// export const FullScreenSection = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const sectionRef = useRef(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (!sectionRef.current) return;
//       const rect = sectionRef.current.getBoundingClientRect();
//       const sectionTop = rect.top;
//       const sectionHeight = rect.height;

//       if (sectionTop <= 0 && sectionTop + sectionHeight > 0) {
//         const scrollProgress = Math.abs(sectionTop) / (sectionHeight - window.innerHeight);
//         const newIndex = Math.min(
//           Math.floor(scrollProgress * features.length),
//           features.length - 1
//         );
//         setCurrentIndex(newIndex);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const introVariants = {
//     hidden: { opacity: 0, y: 40 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }
//     },
//     exit: {
//       opacity: 0,
//       y: -40,
//       transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }
//     }
//   };

//   return (
//     <motion.section
//       ref={sectionRef}
//       style={{
//         width: "100%",
//         height: `${features.length * 100}vh`,
//         background: "linear-gradient(135deg, #ffffff 0%, #f4f4f4 100%)",
//         padding: "0",
//         margin: "0",
//         position: "relative",
//         overflow: "hidden"
//       }}
//     >
//       {features.map((feature, index) => (
//         <motion.div
//           key={index}
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100vh",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center"
//           }}
//           initial="hidden"
//           animate={currentIndex === index ? "visible" : "exit"}
//           variants={introVariants}
//         >
//           <div style={{
//             textAlign: "center",
//             maxWidth: "800px",
//             padding: "48px"
//           }}>
//             <h2 style={{
//               fontFamily: "'Inter',sans-serif",
//               fontSize: "clamp(48px, 6vw, 72px)",
//               fontWeight: 900,
//               textTransform: "uppercase",
//               lineHeight: 1.1,
//               letterSpacing: "-0.04em",
//               marginBottom: "32px",
//               color: "#141b2b"
//             }}>
//               {feature.title}
//             </h2>
//             <p style={{
//               fontFamily: "'Inter',sans-serif",
//               fontSize: "18px",
//               lineHeight: 1.6,
//               color: "rgba(20, 27, 43, 0.7)",
//               marginBottom: "48px"
//             }}>
//               {feature.description}
//             </p>
//           </div>
//         </motion.div>
//       ))}
//     </motion.section>
//   );
// };

// export default FullScreenSection;


import { useState, useRef, useEffect, useCallback } from "react";
import SplitText from "./SplitText";

const features = [
  {
    index: "01",
    title: "REALTIME REASONING",
    description:
      "Processes and responds to conversations instantly, enabling AI agents to think, adapt, and act with near-human responsiveness.",
  },
  {
    index: "02",
    title: "LOW LATENCY",
    description:
      "Ultra-fast infrastructure engineered for sub-second response times across voice processing, inference, and agent execution.",
  },
  {
    index: "03",
    title: "HUMAN-LIKE VOICE",
    description:
      "Natural conversational speech synthesis that captures tone, pacing, emotion, and real-time interaction dynamics.",
  },
  {
    index: "04",
    title: "MULTI-AGENT INTELLIGENCE",
    description:
      "Coordinate multiple AI agents simultaneously to handle complex workflows, parallel tasks, and autonomous decision-making.",
  },
];

export default function FullScreenSection() {
  const rootRef = useRef(null);
  const rafRef = useRef(null);

  const [state, setState] = useState({
    currentIndex: 0,
    localProgress: 0,
    scrolled: false,
  });

  const compute = useCallback(() => {
    const el = rootRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const totalScroll = el.scrollHeight - window.innerHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / totalScroll));

    const n = features.length;
    const rawIndex = progress * n;
    const currentIndex = Math.min(Math.floor(rawIndex), n - 1);
    const localProgress = rawIndex - Math.floor(rawIndex);

    setState({
      currentIndex,
      localProgress: currentIndex === n - 1 ? 1 : localProgress,
      scrolled: scrolled > 40,
    });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(compute);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    compute();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [compute]);

  function getSlideStyle(i, currentIndex, localProgress) {
    if (i === currentIndex) {
      return {
        opacity: 1,
        transform: "translateY(0px)",
        filter: "blur(0px)",
        pointerEvents: "auto",
      };
    }

    return {
      opacity: 0,
      transform: "translateY(0px)",
      filter: "blur(0px)",
      pointerEvents: "none",
    };
  }

  const { currentIndex, localProgress, scrolled } = state;
  const overallProgress =
    (currentIndex + (localProgress || 0)) / features.length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');

        .fss-root {
          position: relative;
          height: calc(${features.length} * 100vh);
        }

        .fss-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          overflow: hidden;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Subtle background pattern */
        .fss-bg-pattern {
          position: absolute;
          inset: 0;
          background-image: none;
          background-size: 64px 64px;
          pointer-events: none;
          display: none;
        }

        .fss-slides {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 800px;
          padding: 0 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 50vh;
        }

        .fss-slide {
          position: absolute;
          width: 100%;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          will-change: opacity, transform, filter;
        }

        .fss-title {
          font-family: 'Inter', sans-serif;
          font-size: clamp(48px, 6vw, 72px);
          font-weight: 900;
          text-transform: uppercase;
          line-height: 1.1;
          letter-spacing: -0.04em;
          color: #141b2b;
          margin-bottom: 32px;
        }

        .fss-desc {
          font-family: 'Inter', sans-serif;
          font-size: 18px;
          line-height: 1.6;
          color: rgba(20, 27, 43, 0.7);
          max-width: 560px;
          margin-bottom: 0;
        }

        /* Ghost index number */
        .fss-ghost-number {
          position: absolute;
          right: -24px;
          bottom: -40px;
          font-family: 'Inter', sans-serif;
          font-size: clamp(100px, 18vw, 180px);
          font-weight: 900;
          line-height: 1;
          color: rgba(20, 27, 43, 0.04);
          letter-spacing: -0.06em;
          user-select: none;
          pointer-events: none;
          z-index: 0;
        }

        /* Progress dots — right side */
        .fss-dots {
          position: absolute;
          right: 36px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 10px;
          z-index: 10;
        }

        .fss-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(20, 27, 43, 0.15);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .fss-dot.active {
          height: 22px;
          border-radius: 3px;
          background: #141b2b;
        }

        /* Counter — bottom left */
        .fss-counter {
          position: absolute;
          left: 40px;
          bottom: 44px;
          z-index: 10;
          display: flex;
          align-items: baseline;
          gap: 5px;
          font-family: 'Inter', sans-serif;
        }

        .fss-counter-cur {
          font-size: 26px;
          font-weight: 900;
          color: #141b2b;
          line-height: 1;
          letter-spacing: -0.04em;
        }

        .fss-counter-sep {
          font-size: 13px;
          color: rgba(20, 27, 43, 0.25);
        }

        .fss-counter-total {
          font-size: 13px;
          font-weight: 700;
          color: rgba(20, 27, 43, 0.25);
        }

        /* Progress bar — bottom */
        .fss-progress-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: transparent;
          z-index: 10;
        }

        .fss-progress-fill {
          height: 100%;
          background: #141b2b;
          transition: width 0.1s linear;
        }

        /* Scroll hint — bottom right */
        .fss-scroll-hint {
          position: absolute;
          bottom: 48px;
          right: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          z-index: 10;
          transition: opacity 0.6s ease;
        }

        .fss-scroll-label {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: rgba(20, 27, 43, 0.25);
          writing-mode: vertical-rl;
        }

        .fss-scroll-line {
          width: 1px;
          height: 44px;
          background: rgba(20, 27, 43, 0.1);
          position: relative;
          overflow: hidden;
        }

        .fss-scroll-line::after {
          content: '';
          position: absolute;
          top: -100%;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(20, 27, 43, 0.5);
          animation: scrollLine 1.6s ease-in-out infinite;
        }

        @keyframes scrollLine {
          0%   { top: -100%; }
          100% { top: 100%; }
        }

        @media (max-width: 640px) {
          .fss-slides       { padding: 0 24px; }
          .fss-ghost-number { display: none; }
          .fss-dots         { right: 16px; }
          .fss-counter      { left: 24px; bottom: 32px; }
          .fss-scroll-hint  { display: none; }
          .fss-desc         { font-size: 16px; }
        }
      `}</style>

      <section className="fss-root" ref={rootRef}>
        <div className="fss-sticky">

          {/* Background grid */}
          <div className="fss-bg-pattern" />

          {/* Slides */}
          <div className="fss-slides">
            {features.map((f, i) => {
              const style = getSlideStyle(i, currentIndex, localProgress);
              const isActive = i === currentIndex;
              return (
                <div key={i} className="fss-slide" style={style}>
                  {isActive ? (
                    <>
                      <SplitText
                        text={f.title}
                        className="fss-title"
                        delay={40}
                        duration={1.2}
                        ease="power3.out"
                        splitType="chars"
                        from={{ opacity: 0, y: 40 }}
                        to={{ opacity: 1, y: 0 }}
                        threshold={0.1}
                        rootMargin="-100px"
                        tag="h2"
                      />
                      <SplitText
                        text={f.description}
                        className="fss-desc"
                        delay={30}
                        duration={1.2}
                        ease="power3.out"
                        splitType="words"
                        from={{ opacity: 0, y: 20 }}
                        to={{ opacity: 1, y: 0 }}
                        threshold={0.15}
                        rootMargin="-80px"
                        tag="p"
                      />
                    </>
                  ) : (
                    <>
                      <h2 className="fss-title">{f.title}</h2>
                      <p className="fss-desc">{f.description}</p>
                    </>
                  )}
                  <div className="fss-ghost-number">{f.index}</div>
                </div>
              );
            })}
          </div>

          {/* Progress dots */}
          <div className="fss-dots">
            {features.map((_, i) => (
              <div
                key={i}
                className={`fss-dot${i === currentIndex ? " active" : ""}`}
              />
            ))}
          </div>

          {/* Counter */}
          <div className="fss-counter">
            <span className="fss-counter-cur">
              {features[currentIndex].index}
            </span>
            <span className="fss-counter-sep">/</span>
            <span className="fss-counter-total">
              0{features.length}
            </span>
          </div>

          {/* Scroll hint */}
          <div
            className="fss-scroll-hint"
            style={{ opacity: scrolled ? 0 : 1, pointerEvents: "none" }}
          >
            <span className="fss-scroll-label">SCROLL</span>
            <div className="fss-scroll-line" />
          </div>

        </div>
      </section>
    </>
  );
}
