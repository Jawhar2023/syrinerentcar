import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useIntroGate } from "@/contexts/IntroGateContext";

const SKYLINE_HEIGHTS = [42, 68, 36, 82, 55, 94, 48, 76, 58, 88, 44, 72, 50, 100, 62];

/** Brand accent — matches primary `#dd0426` */
const CAR_ACCENT = "#dd0426";

const INTRO_MS = 3000;
const EXIT_MS = 600;
const SKIP_EXIT_MS = 500;

/** Side-view sports car — SVG */
function SportsCarSilhouette({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 260 72"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="dx-intro-body" x1="0%" y1="0%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#ff5c6e" />
          <stop offset="45%" stopColor={CAR_ACCENT} />
          <stop offset="100%" stopColor="#7a0215" />
        </linearGradient>
        <linearGradient id="dx-intro-glass" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3d1518" />
          <stop offset="100%" stopColor="#140808" />
        </linearGradient>
        <filter id="dx-intro-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="dx-intro-head" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffe4e8" />
          <stop offset="100%" stopColor={CAR_ACCENT} stopOpacity="0.3" />
        </radialGradient>
      </defs>

      <ellipse cx="130" cy="64" rx="118" ry="5" fill="black" opacity="0.45" />
      <path d="M32 54h196l-4 4H36l-4-4z" fill="#020617" opacity="0.85" />
      <path
        d="M28 52V44l8-10 28-6 52-4 64 2 36 8 16 10 4 8v10H28z"
        fill="url(#dx-intro-body)"
        stroke="#f87171"
        strokeOpacity="0.45"
        strokeWidth="0.5"
      />
      <path d="M40 50h178l2 2H38l2-2z" fill="#9f1239" opacity="0.5" />
      <path
        d="M72 30l12-8 48-4 36 2 20 8 2 6H76l-4-4z"
        fill="url(#dx-intro-glass)"
        stroke="#7f1d1d"
        strokeWidth="0.4"
      />
      <path d="M118 22l28-1 24 2-6 10-44-2-2-9z" fill="#0f172a" opacity="0.35" />
      <path d="M18 46l10-2 4 8H18v-6z" fill="#7f1d1d" />
      <path d="M24 44h8v4l-6 1-2-5z" fill="#881337" opacity="0.8" />
      <ellipse cx="22" cy="42" rx="5" ry="3.5" fill="url(#dx-intro-head)" filter="url(#dx-intro-glow)" />
      <ellipse cx="21" cy="41" rx="2" ry="1.2" fill="white" opacity="0.9" />
      <path
        d="M38 38c40-6 88-8 132-2"
        stroke="white"
        strokeOpacity="0.12"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <g>
        <circle cx="62" cy="54" r="11" fill="#0a0a0a" stroke="#1e293b" strokeWidth="1" />
        <circle cx="62" cy="54" r="6.5" fill="#27272a" />
        <circle cx="62" cy="54" r="3.2" fill="#3f3f46" />
        <circle cx="62" cy="54" r="1.6" fill={CAR_ACCENT} opacity="0.85" />
        <path d="M62 48v12M56 54h12" stroke="#52525b" strokeWidth="0.6" opacity="0.6" />
      </g>
      <g>
        <circle cx="198" cy="54" r="11" fill="#0a0a0a" stroke="#1e293b" strokeWidth="1" />
        <circle cx="198" cy="54" r="6.5" fill="#27272a" />
        <circle cx="198" cy="54" r="3.2" fill="#3f3f46" />
        <circle cx="198" cy="54" r="1.6" fill={CAR_ACCENT} opacity="0.85" />
        <path d="M198 48v12M192 54h12" stroke="#52525b" strokeWidth="0.6" opacity="0.6" />
      </g>
      <rect x="232" y="38" width="22" height="5" rx="1.5" fill="#7f1d1d" />
      <rect x="236" y="39" width="14" height="2.5" rx="0.5" fill="#ff3355" opacity="0.95" />
      <path d="M228 34h26l-2 3h-22l-2-3z" fill="#7f1d1d" />
    </svg>
  );
}

export default function DriveXIntro() {
  const { dismissIntro } = useIntroGate();
  const { t } = useTranslation();
  const [show, setShow] = useState(true);
  const brandText = t("intro.brand");
  const brandHead = "Syrine";
  const brandTail = brandText.startsWith(brandHead) ? brandText.slice(brandHead.length).trim() : brandText;

  useEffect(() => {
    if (!show) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [show]);

  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(() => dismissIntro(), EXIT_MS);
    }, INTRO_MS);
    return () => clearTimeout(timer);
  }, [show, dismissIntro]);

  const handleSkip = () => {
    setShow(false);
    setTimeout(() => dismissIntro(), SKIP_EXIT_MS);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#050505]"
        >
          {/* Light sweep */}
          <motion.div
            initial={{ x: "-120%", opacity: 0 }}
            animate={{ x: "220%", opacity: [0, 0.4, 0.6, 0] }}
            transition={{ duration: 2.4, ease: "easeInOut" }}
            className="absolute inset-y-0 w-40 bg-gradient-to-r from-transparent via-[#dd0426]/35 to-transparent blur-3xl"
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,106,0.08),transparent_60%)]" />

          {/* Skyline — behind road & car */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8 }}
            className="pointer-events-none absolute bottom-0 left-0 right-0 z-[8] flex h-36 items-end justify-center gap-0.5 px-2 sm:h-40 sm:gap-1"
          >
            <div className="flex w-full max-w-5xl items-end justify-between gap-0.5 opacity-[0.22]">
              {SKYLINE_HEIGHTS.map((h, i) => (
                <div
                  key={i}
                  className="min-w-0 flex-1 rounded-t-[2px] bg-gradient-to-t from-white/45 to-white/10"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </motion.div>

          {/* Road + fast lines (no lightning) */}
          <div className="absolute bottom-0 left-0 right-0 z-[9] h-[42%]">
            <div
              className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-black via-black/95 to-transparent"
              aria-hidden
            />
            <div
              className="absolute bottom-0 left-1/2 h-32 w-[200%] origin-bottom overflow-hidden -translate-x-1/2"
              style={{
                transform: "perspective(420px) rotateX(68deg)",
                transformStyle: "preserve-3d",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 to-black" />
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-white/15 to-transparent"
                  style={{ left: `${18 + i * 19}%` }}
                  animate={{ y: ["-20%", "120%"] }}
                  transition={{
                    duration: 1.1 + i * 0.08,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.15,
                  }}
                />
              ))}
            </div>

            <div className="absolute bottom-8 left-0 right-0 h-1 overflow-hidden bg-black ring-1 ring-white/10">
              <motion.div
                className="h-full w-32 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                animate={{ x: ["-40%", "120vw"] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <div className="absolute bottom-[4.25rem] left-0 right-0 flex justify-center overflow-hidden opacity-50">
              <motion.div
                className="flex gap-6"
                animate={{ x: [0, -48] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              >
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="h-0.5 w-8 shrink-0 rounded-full bg-neutral-400/90" />
                ))}
              </motion.div>
            </div>
          </div>

          {/* Car sweep */}
          <motion.div
            className="pointer-events-none absolute bottom-[11%] left-1/2 z-[11] w-[min(380px,88vw)] max-w-[420px] -translate-x-1/2"
            initial={{ x: "-46vw", opacity: 0.9 }}
            animate={{ x: "46vw", opacity: 1 }}
            transition={{ duration: 2.45, ease: [0.33, 1, 0.68, 1] }}
          >
            <motion.div
              className="relative"
              animate={{ y: [0, -2.5, 0] }}
              transition={{ duration: 0.42, repeat: Infinity, ease: "easeInOut" }}
            >
              <SportsCarSilhouette className="h-auto w-full drop-shadow-[0_16px_40px_rgba(221,4,38,0.35)]" />
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute -left-4 bottom-8 h-7 w-7 rounded-full bg-white/30 blur-md"
                  style={{ bottom: `${1.25 + i * 0.4}rem` }}
                  animate={{
                    opacity: [0.65, 0],
                    x: [-6, -36 - i * 8],
                    scale: [0.7, 1.8 + i * 0.2],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.9 + i * 0.12,
                    delay: i * 0.18,
                    ease: "easeOut",
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Big gradient title only (matches “black road + big DriveX” look) */}
          <motion.div
            className="relative z-20 flex flex-col items-center px-6 text-center"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h1
              className="font-display text-7xl font-bold tracking-[0.18em] sm:text-8xl md:text-9xl lg:text-[10rem] lg:leading-none"
              style={{
                filter: "drop-shadow(0 0 28px hsl(351 96% 44% / 0.4))",
              }}
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.12em" }}
              transition={{ delay: 0.85, duration: 1.12, ease: [0.22, 1, 0.36, 1] }}
            >
              {brandText.startsWith(brandHead) ? (
                <>
                  <span className="text-[#dd0426]">{brandHead}</span>
                  {brandTail ? <span className="text-white"> {brandTail}</span> : null}
                </>
              ) : (
                <span className="text-white">{brandText}</span>
              )}
            </motion.h1>
          </motion.div>

          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            onClick={handleSkip}
            className="absolute bottom-10 right-6 z-30 rounded-full border border-white/10 px-5 py-2 text-xs uppercase tracking-widest text-white/40 backdrop-blur-md transition-all hover:text-[#ff6b7a] sm:right-10"
          >
            {t("intro.skip")}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
