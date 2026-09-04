"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Deliberately a small closed union rather than `ElementType`: this project
 * also loads `@react-three/fiber`, which globally augments `JSX.IntrinsicElements`
 * with every three.js element. That augmentation is ambient (applies to the
 * whole app, not just files that import R3F) and is large enough that
 * TypeScript's `JSX.LibraryManagedAttributes` resolution for a bare
 * `ElementType`-typed, ref-forwarding polymorphic component collapses to
 * `never`. Every current call site renders a block-level container anyway,
 * so this union costs nothing in practice.
 */
type RevealTag = "div" | "span" | "li" | "article" | "section";

type RevealProps = {
  children: ReactNode;
  /** Stagger in ms. */
  delay?: number;
  /** Travel distance in px. 0 gives a pure fade. */
  y?: number;
  className?: string;
  as?: RevealTag;
  /** Fire once and disconnect (default) or re-run on re-entry. */
  once?: boolean;
};

/**
 * Scroll reveal built on a single IntersectionObserver per element and a CSS
 * transition — no per-frame JS, no layout-affecting properties, so it stays on
 * the compositor. `prefers-reduced-motion` is handled in globals.css, where the
 * element resolves to its visible state immediately.
 */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
  as: Tag = "div",
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Anything already on screen at mount shows without waiting for a scroll.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-shown", "true");
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.setAttribute("data-shown", "false");
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return (
    <Tag
      // A dynamic `Tag: RevealTag` can't be narrowed to one concrete
      // element, so TS asks for a ref assignable to every tag's specific
      // ref type at once. All five accept a plain HTMLElement ref at
      // runtime — only generic Element APIs (IntersectionObserver,
      // data-attributes) are ever used on it — so this cast is safe.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- see comment above
      ref={ref as any}
      data-shown="false"
      className={cn("reveal", className)}
      style={
        {
          "--reveal-delay": `${delay}ms`,
          "--reveal-y": `${y}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
