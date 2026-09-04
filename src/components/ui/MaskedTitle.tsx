"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type MaskedTitleProps = {
  /** Each string becomes one masked line, rising into view in sequence. */
  lines: string[];
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  /** Delay before the first line, in ms. */
  delay?: number;
  /** Gap between consecutive lines, in ms. */
  stagger?: number;
};

/**
 * Headline that rises line-by-line from behind a mask. The mask is plain
 * `overflow: hidden`; only `transform` animates, so it composites cleanly.
 * Lines are joined with spaces for assistive tech, so the heading still reads
 * as one continuous sentence.
 */
export function MaskedTitle({
  lines,
  className,
  as: Tag = "h2",
  delay = 0,
  stagger = 90,
}: MaskedTitleProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-shown", "true");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} data-shown="false" className={cn(className)}>
      <span className="sr-only">{lines.join(" ")}</span>
      <span aria-hidden="true">
        {lines.map((line, i) => (
          <span
            key={line + i}
            className="line-mask"
            style={
              {
                "--reveal-delay": `${delay + i * stagger}ms`,
              } as React.CSSProperties
            }
          >
            <span>{line}</span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
