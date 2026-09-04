"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

/**
 * The hero's atmosphere: layered hairlines, a soft signal bloom, drifting
 * motes and three velocity streaks. Only transform and opacity animate, so the
 * whole composition stays on the compositor.
 *
 * On coarse pointers (touch) no pointermove listener is ever attached and the
 * streaks are dropped, so phones render a cheap, near-static scene.
 */
export function HeroBackdrop() {
  const reduced = useReducedMotion();
  const [fine, setFine] = useState(false);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 55, damping: 22, mass: 0.6 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);

  // One parallax layer per depth. Deeper number = more travel = nearer camera.
  const bloomX = useTransform(sx, (v) => v * 26);
  const bloomY = useTransform(sy, (v) => v * 20);
  const farX = useTransform(sx, (v) => v * 8);
  const farY = useTransform(sy, (v) => v * 6);
  const midX = useTransform(sx, (v) => v * 16);
  const midY = useTransform(sy, (v) => v * 12);
  const nearX = useTransform(sx, (v) => v * 38);
  const nearY = useTransform(sy, (v) => v * 30);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const sync = () => setFine(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!fine || reduced) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      // Coalesce to one write per frame so fast movement can't thrash.
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        px.set((e.clientX / window.innerWidth - 0.5) * 2);
        py.set((e.clientY / window.innerHeight - 0.5) * 2);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [fine, reduced, px, py]);

  const animate = fine && !reduced;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Signal bloom — the only colour in the hero, kept very low. */}
      <motion.div
        style={{ x: bloomX, y: bloomY }}
        className="absolute -top-[20%] left-1/2 h-[64vh] w-[80vw] -translate-x-1/2 rounded-[50%] blur-[90px]
                   bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--signal)_15%,transparent),transparent_68%)]"
      />

      {/* Far layer — horizon rules receding up the frame. */}
      <motion.div style={{ x: farX, y: farY }} className="absolute inset-0">
        {[26, 44, 62, 80].map((top, i) => (
          <span
            key={top}
            className="absolute left-0 h-px w-full"
            style={{
              top: `${top}%`,
              background:
                "linear-gradient(90deg,transparent,var(--line),transparent)",
              opacity: 0.9 - i * 0.16,
            }}
          />
        ))}
      </motion.div>

      {/* Mid layer — velocity streaks. Desktop only. */}
      {animate && (
        <motion.div style={{ x: midX, y: midY }} className="absolute inset-0">
          {STREAKS.map((s, i) => (
            <motion.span
              key={i}
              className="streak"
              style={{ top: s.top, width: s.width, left: 0 }}
              initial={{ x: "-40%", opacity: 0 }}
              animate={{ x: ["-40%", "170%"], opacity: [0, 1, 0] }}
              transition={{
                duration: s.duration,
                delay: s.delay,
                repeat: Infinity,
                repeatDelay: s.repeatDelay,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Near layer — motes. Few, slow, barely there. */}
      <motion.div style={{ x: nearX, y: nearY }} className="absolute inset-0">
        {MOTES.map((m, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              top: m.top,
              left: m.left,
              width: m.size,
              height: m.size,
              background:
                i % 3 === 0
                  ? "color-mix(in oklab, var(--signal) 60%, transparent)"
                  : "color-mix(in oklab, var(--ink) 22%, transparent)",
            }}
            animate={reduced ? undefined : { y: [0, -18, 0], opacity: [0.25, 0.7, 0.25] }}
            transition={{
              duration: m.duration,
              delay: m.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Fade the whole field into the page below. */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-paper" />
    </div>
  );
}

const STREAKS = [
  { top: "22%", width: "38%", duration: 2.6, delay: 0.4, repeatDelay: 5.2 },
  { top: "47%", width: "52%", duration: 2.1, delay: 2.2, repeatDelay: 6.4 },
  { top: "68%", width: "30%", duration: 2.9, delay: 4.1, repeatDelay: 4.8 },
];

const MOTES = [
  { top: "24%", left: "12%", size: 4, duration: 7, delay: 0 },
  { top: "38%", left: "84%", size: 3, duration: 9, delay: 1.2 },
  { top: "62%", left: "22%", size: 5, duration: 8, delay: 0.6 },
  { top: "71%", left: "74%", size: 3, duration: 10, delay: 2.1 },
  { top: "18%", left: "63%", size: 4, duration: 8.5, delay: 1.8 },
  { top: "55%", left: "48%", size: 3, duration: 11, delay: 3 },
];
