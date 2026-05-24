import { useEffect, useState } from "react";

interface IntroSplashProps {
  onFinish: () => void;
}

export function IntroSplash({ onFinish }: IntroSplashProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitStart = window.setTimeout(() => setIsExiting(true), 900);
    const finish = window.setTimeout(() => onFinish(), 1600);

    return () => {
      window.clearTimeout(exitStart);
      window.clearTimeout(finish);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[200] overflow-hidden transition-opacity duration-700 ease-out ${
        isExiting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00565a_0%,#002d2f_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.1] [background-image:radial-gradient(#67fcc6_1px,transparent_1px)] [background-size:50px_50px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.06)_0%,rgba(0,0,0,0)_35%,rgba(0,0,0,0.06)_100%)]" />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center text-white">
        <div className="relative mb-8">
          <div className="absolute inset-0 rounded-full bg-[#67fcc6]/18 blur-3xl" />
          <svg viewBox="0 0 200 200" className="relative z-10 h-[160px] w-[160px] md:h-[190px] md:w-[190px]" fill="none">
            <path
              className="animate-[drawPath_1.1s_cubic-bezier(0.65,0,0.35,1)_forwards] [stroke-dasharray:900] [stroke-dashoffset:900]"
              d="M100 168C100 168 34 129 34 82C34 54 52 36 75 36C85 36 94 41 100 50C106 41 115 36 125 36C148 36 166 54 166 82C166 129 100 168 100 168Z"
              stroke="#67fcc6"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className="animate-[drawPath_0.9s_cubic-bezier(0.65,0,0.35,1)_0.2s_forwards] [stroke-dasharray:400] [stroke-dashoffset:400]"
              d="M100 58V145"
              stroke="#67fcc6"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeDasharray="5 9"
            />
            <circle cx="100" cy="92" r="4" fill="#67fcc6" className="animate-[heartbeat_1.4s_ease-in-out_infinite]" />
            <circle cx="100" cy="126" r="5" fill="#67fcc6" className="animate-[heartbeat_1.4s_ease-in-out_infinite] [animation-delay:140ms]" />
          </svg>
        </div>

        <h1 className="font-[Manrope] text-6xl font-extrabold tracking-tight text-white md:text-8xl animate-[etherealGlow_2s_ease-in-out_infinite]">
          Nexov
          <span className="text-[#67fcc6] drop-shadow-[0_0_20px_rgba(103,252,198,0.6)] animate-[pulseAIGlow_4s_ease-in-out_infinite]">
            AI
          </span>
        </h1>
        <p className="mt-5 font-[Inter] text-xl font-light tracking-[0.5em] text-[#b8cac9]/70 uppercase md:text-2xl">
          Clinical Intelligence
        </p>
      </main>
    </div>
  );
}
