import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { MaskedTitle } from "./MaskedTitle";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** Small mono eyebrow, e.g. "02 — PRODUCTS". */
  label?: string;
  /** Headline, split into masked lines. */
  lines: string[];
  subtitle?: ReactNode;
  className?: string;
  titleClassName?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  label,
  lines,
  subtitle,
  className,
  titleClassName,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        align === "center" && "mx-auto max-w-3xl text-center",
        className,
      )}
    >
      {label && (
        <Reveal y={12}>
          <p className="t-label mb-6 flex items-center gap-3">
            {align === "left" && (
              <span
                aria-hidden="true"
                className="h-px w-6 bg-line-strong"
              />
            )}
            {label}
          </p>
        </Reveal>
      )}

      <MaskedTitle
        lines={lines}
        className={cn("t-h1 text-balance", titleClassName)}
      />

      {subtitle && (
        <Reveal delay={160} y={16}>
          <p
            className={cn(
              "t-lead mt-6 max-w-xl text-pretty",
              align === "center" && "mx-auto",
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
