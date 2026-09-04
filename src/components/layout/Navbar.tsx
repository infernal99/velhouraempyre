"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { nav } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Sticky navbar. Past the fold it condenses: the bar tightens, a blurred
 * paper backing fades in and a hairline appears. The change is deliberately
 * small — it should register as focus, not as a different component.
 */
export function Navbar() {
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setCondensed(window.scrollY > 24);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Lock the page while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[var(--ease-expo)]",
        condensed
          ? "border-b border-line bg-paper/72 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div
        className={cn(
          "shell flex items-center justify-between transition-[height] duration-500 ease-[var(--ease-expo)]",
          condensed ? "h-14" : "h-20",
        )}
      >
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="group relative font-mono text-[0.8125rem] font-semibold tracking-[0.24em] text-ink uppercase"
        >
          Velhoura
          <span className="absolute -bottom-1 left-0 h-px w-0 bg-signal transition-[width] duration-500 ease-[var(--ease-expo)] group-hover:w-full" />
        </Link>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Principal">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-[0.875rem] text-ink-soft transition-colors duration-300 hover:text-ink"
            >
              {item.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-ink transition-[width] duration-400 ease-[var(--ease-expo)] group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Wrapper does the hiding: the button base sets its own display
              utility, which would otherwise win over a `hidden` on the same
              element regardless of class order. */}
          <span className="hidden sm:block">
            <ButtonLink href="#contact" size="sm" arrow>
              Start a project
            </ButtonLink>
          </span>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            className="relative flex size-9 items-center justify-center md:hidden"
          >
            <span
              className={cn(
                "absolute h-px w-5 bg-ink transition-transform duration-400 ease-[var(--ease-expo)]",
                menuOpen ? "translate-y-0 rotate-45" : "-translate-y-1",
              )}
            />
            <span
              className={cn(
                "absolute h-px w-5 bg-ink transition-transform duration-400 ease-[var(--ease-expo)]",
                menuOpen ? "translate-y-0 -rotate-45" : "translate-y-1",
              )}
            />
          </button>
        </div>
      </div>

      {/* Mobile sheet — a dedicated layout, not a squeezed desktop nav. */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="border-t border-line bg-paper/95 backdrop-blur-xl md:hidden"
      >
        <nav className="shell flex flex-col py-4" aria-label="Principal (móvil)">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{ transitionDelay: `${i * 40}ms` }}
              className="flex items-center justify-between border-b border-line py-4 text-lg font-medium tracking-tight text-ink last:border-b-0"
            >
              {item.label}
              <span className="t-label">{String(i + 1).padStart(2, "0")}</span>
            </Link>
          ))}

          <ButtonLink
            href="#contact"
            size="lg"
            arrow
            className="mt-5 w-full"
            onClick={() => setMenuOpen(false)}
          >
            Start a project
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
