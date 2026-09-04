"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/data/process";

/**
 * From idea to product.
 *
 * A single line is drawn by scroll progress through the section and each step
 * lights up as the line reaches it. The scroll value drives one spring, which
 * drives one scaleY and N opacity transforms — the DOM is never rewritten
 * while scrolling, so the whole thing runs on the compositor.
 *
 * On mobile the track sits on the left edge; on desktop it runs down the
 * gutter between the index column and the copy.
 */
export function ProcessSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    // Start filling as the track enters the lower third, finish just before it leaves.
    offset: ["start 78%", "end 55%"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.35,
  });

  return (
    <section id="process" className="band border-t border-line">
      <div className="shell">
        <SectionHeading
          label="03 — Process"
          lines={["From idea", "to product."]}
          subtitle="Cinco fases. El mismo recorrido para cada producto que construimos."
        />

        <div ref={trackRef} className="relative mt-16 md:mt-24">
          {/* The rail. */}
          <div
            aria-hidden="true"
            className="absolute left-[7px] top-2 bottom-2 w-px bg-line md:left-[calc(16.6667%-0.5px)]"
          />

          {/* The line that fills with scroll. */}
          <motion.div
            aria-hidden="true"
            style={{ scaleY: progress }}
            className="absolute left-[7px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-signal via-signal to-ink md:left-[calc(16.6667%-0.5px)]"
          />

          <ol className="space-y-14 md:space-y-24">
            {processSteps.map((step, i) => (
              <Step
                key={step.index}
                step={step}
                i={i}
                total={processSteps.length}
                progress={progress}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Step({
  step,
  i,
  total,
  progress,
}: {
  step: (typeof processSteps)[number];
  i: number;
  total: number;
  progress: ReturnType<typeof useSpring>;
}) {
  // Where this step sits along the rail, 0..1.
  const at = i / (total - 1);
  const ramp = 0.14;

  const active = useTransform(
    progress,
    [Math.max(at - ramp, 0), at],
    [0, 1],
    { clamp: true },
  );

  const dotScale = useTransform(active, [0, 1], [1, 1.6]);
  const textOpacity = useTransform(active, [0, 1], [0.38, 1]);

  return (
    <li className="relative grid grid-cols-[auto_1fr] gap-x-6 md:grid-cols-12 md:gap-x-10">
      {/* Index column (desktop) */}
      <div className="hidden md:col-span-2 md:block">
        <motion.p style={{ opacity: textOpacity }} className="t-label pt-1">
          {step.index}
        </motion.p>
      </div>

      {/* Node on the rail */}
      <div className="relative flex justify-center pt-[7px] md:col-span-1 md:justify-start md:pt-2">
        <motion.span
          style={{ scale: dotScale }}
          className="relative z-10 block size-[15px] shrink-0 rounded-full border border-line bg-paper md:-ml-[7px]"
        >
          <motion.span
            style={{ opacity: active }}
            className="absolute inset-[3px] rounded-full bg-signal"
          />
        </motion.span>
      </div>

      {/* Copy */}
      <motion.div style={{ opacity: textOpacity }} className="md:col-span-9">
        <p className="t-label md:hidden">{step.index}</p>
        <h3 className="t-h2 mt-1 md:mt-0">{step.title}</h3>
        <p className="t-body mt-3 max-w-[46ch]">{step.body}</p>
      </motion.div>
    </li>
  );
}
