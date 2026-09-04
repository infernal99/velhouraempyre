import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "whitespace-nowrap transition-[transform,background-color,color,border-color,box-shadow] " +
  "duration-300 ease-[var(--ease-expo)] active:scale-[0.985] will-change-transform";

const variants: Record<Variant, string> = {
  solid:
    "bg-ink text-paper hover:bg-signal shadow-[0_1px_2px_rgba(8,9,10,0.16)] hover:shadow-[0_8px_24px_-6px_color-mix(in_oklab,var(--signal)_45%,transparent)]",
  outline:
    "border border-line-strong text-ink bg-paper/60 backdrop-blur-sm hover:border-ink hover:bg-paper",
  ghost: "text-ink-soft hover:text-ink",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.8125rem]",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-[52px] px-7 text-[0.9375rem]",
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Renders a chevron that slides forward on hover. */
  arrow?: boolean;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "children" | "className">;

export function ButtonLink({
  href,
  children,
  variant = "solid",
  size = "md",
  arrow = false,
  className,
  ...rest
}: ButtonLinkProps) {
  const external = href.startsWith("http");

  const content = (
    <>
      <span>{children}</span>
      {arrow && <Arrow />}
    </>
  );

  const classes = cn(base, variants[variant], sizes[size], className);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}

/** Arrow that accelerates forward on hover — the site's core microinteraction. */
export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cn(
        "size-3.5 shrink-0 transition-transform duration-300 ease-[var(--ease-expo)] group-hover:translate-x-1",
        className,
      )}
    >
      <path
        d="M2.5 8h11m0 0L9 3.5M13.5 8L9 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Inline text link with the same arrow behaviour. */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-ink",
        "transition-colors duration-300 hover:text-signal",
        className,
      )}
    >
      {children}
      <Arrow />
    </Link>
  );
}
