import { cn } from "../../lib/utils";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          href={item?.link}
          key={item?.link}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </a>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};


import { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import {
  ArrowRight, BarChart3, Clock3, MessageSquare,
  Phone, PhoneCall, Route,
} from "lucide-react";

/* ── Fonts injected once ─────────────────────────────────── */
const FONT_STYLE = `
  .feat-root  { font-family: 'Quicksand', sans-serif; }
  .feat-serif { font-family: 'Merriweather', serif; }
`;

/* ── Feature data ────────────────────────────────────────── */
const FEATURES = [
  {
    icon: Phone,
    title: "AI Call Handling",
    description:
      "Multilingual support in 15+ Indian languages. Seamless transitions from Hindi to English or regional dialects.",
    badge: "MULTILINGUAL",
    accent: "#10b981",   // emerald-500
  },
  {
    icon: Clock3,
    title: "Automated Booking",
    description:
      "Deep integration with top EMR/HMS systems. Real-time slot locking and rescheduling without human intervention.",
    badge: "SYNC-READY",
    accent: "#10b981",
  },
  {
    icon: Route,
    title: "Smart Call Routing",
    description:
      "Intelligently detects emergencies and routes them to a human doctor instantly while handling routine tasks automatically.",
    badge: "SMART TRIAGE",
    accent: "#10b981",
  },
  {
    icon: PhoneCall,
    title: "Missed Call Recovery",
    description:
      "Automatically calls back any missed numbers within 60 seconds to ensure no patient lead is ever lost.",
    badge: "CONVERSION",
    accent: "#10b981",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Bot",
    description:
      "WhatsApp bot for patient chat, appointment booking, follow-ups, confirmation notifications, reminders, and payment integration.",
    badge: "ENGAGEMENT",
    accent: "#10b981",
  },
  {
    icon: BarChart3,
    title: "Clinic Analytics",
    description:
      "Understand call patterns, peak times, and appointment trends with our intuitive management dashboard.",
    badge: "REPORTS",
    accent: "#10b981",
  },
];

/* ── Individual card with tilt + border-glow ─────────────── */
function FeatureCard({ feature, index }: { feature: any; index: number }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  /* smooth spring tilt */
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 22 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 22 });

  /* spotlight position local to card */
  const spotX = useSpring(useMotionValue(50), { stiffness: 200, damping: 22 });
  const spotY = useSpring(useMotionValue(50), { stiffness: 200, damping: 22 });

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const cx = e.clientX - left;
    const cy = e.clientY - top;
    const px = (cx / width - 0.5) * 2;   // -1 → 1
    const py = (cy / height - 0.5) * 2;

    rotateX.set(-py * 8);
    rotateY.set(px * 8);
    spotX.set((cx / width) * 100);
    spotY.set((cy / height) * 100);
  }, [rotateX, rotateY, spotX, spotY]);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    spotX.set(50);
    spotY.set(50);
  }, [rotateX, rotateY, spotX, spotY]);

  const Icon = feature.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 800,
      }}
      className="group relative flex min-h-[288px] flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-shadow duration-300 hover:shadow-[0_20px_48px_-12px_rgba(16,185,129,0.18),0_0_0_1.5px_rgba(16,185,129,0.25)]"
    >
      {/* Per-card spotlight */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              background: `radial-gradient(260px circle at ${spotX.get()}% ${spotY.get()}%, rgba(16,185,129,0.10) 0%, transparent 70%)`,
            }}
          />
        )}
      </AnimatePresence>

      {/* Animated top border line */}
      <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl overflow-hidden">
        <motion.div
          className="h-full w-full bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500"
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: index * 0.08 + 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Icon */}
      <div
        className="mb-6 inline-flex items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 p-3 transition-all duration-300 group-hover:border-emerald-200 group-hover:bg-emerald-100"
        style={{ transform: "translateZ(20px)" }}
      >
        <Icon className="size-[18px] text-emerald-600" />
      </div>

      {/* Text */}
      <h3
        className="feat-serif mb-3 text-[1.45rem] font-normal leading-[1.2] text-slate-900"
        style={{ transform: "translateZ(10px)" }}
      >
        {feature.title}
      </h3>
      <p className="mb-6 text-[0.92rem] leading-relaxed text-slate-500">
        {feature.description}
      </p>

      {/* Badge */}
      <span className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-bold tracking-widest text-emerald-700">
        <span className="size-1.5 rounded-full bg-emerald-400 inline-block" />
        {feature.badge}
      </span>
    </motion.div>
  );
}

/* ── Grid-level spotlight (follows mouse over entire grid) ── */
function SpotlightGrid({ children }) {
  const gridRef = useRef(null);
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);

  const springX = useSpring(mouseX, { stiffness: 120, damping: 24 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 24 });

  const handleMouseMove = useCallback((e) => {
    const rect = gridRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(-9999);
    mouseY.set(-9999);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={gridRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      {/* Large ambient spotlight over the whole grid */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-0 rounded-3xl"
        style={{
          background: `radial-gradient(500px circle at ${springX.get()}px ${springY.get()}px, rgba(16,185,129,0.07) 0%, transparent 60%)`,
        }}
      />
      <div className="relative z-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {children}
      </div>
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────── */
export function Features() {
  return (
    <>
      <style>{FONT_STYLE}</style>

      <section id="features" className="feat-root relative overflow-hidden bg-white px-6 py-28">

        {/* Background texture blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 right-0 size-[480px] rounded-full bg-emerald-50 blur-[96px] opacity-70" />
          <div className="absolute bottom-0 left-10 size-[360px] rounded-full bg-emerald-50/60 blur-[80px]" />
        </div>

        <div className="relative mx-auto max-w-7xl">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <div className="max-w-2xl">
              {/* Eyebrow */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                <span className="text-[11px] font-semibold text-emerald-700 tracking-wide">PLATFORM CAPABILITIES</span>
              </div>

              <h2 className="feat-serif text-[2.6rem] font-normal leading-[1.08] text-slate-900 sm:text-[3.2rem] md:text-[3.8rem]">
                Precision Engineering<br />
                <span className="italic text-emerald-600">for Modern Clinics</span>
              </h2>

              <p className="mt-4 text-[1.05rem] leading-relaxed text-slate-500 sm:text-[1.15rem]">
                Beyond a simple bot — a comprehensive operational engine.
              </p>
            </div>

            <motion.a
              href="#"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="feat-root group inline-flex items-center gap-2 text-[15px] font-semibold text-emerald-700 hover:text-emerald-600 transition-colors shrink-0 mb-1"
            >
              View all features
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </motion.div>

          {/* Cards */}
          <SpotlightGrid>
            {FEATURES.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                index={index}
              />
            ))}
          </SpotlightGrid>

          {/* Bottom CTA strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 flex flex-col items-center gap-3 text-center"
          >
            <p className="text-[0.95rem] text-slate-400">
              All features available on every plan. No hidden limits.
            </p>
            <div className="flex items-center gap-6 text-[13px] text-slate-400">
              {["HIPAA Compliant", "99.9% Uptime SLA", "Live in 48 hrs"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <svg className="size-3.5 text-emerald-500" fill="none" viewBox="0 0 16 16">
                    <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}

export default Features;