"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type PointerEvent } from "react";
import { Arrow } from "@/components/ui/Button";
import { ProductGlyph } from "@/components/visual/ProductGlyph";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

/**
 * One product, presented as its own object rather than a portfolio thumbnail.
 *
 * Hover does four things at once, all cheap: the card lifts, its artwork
 * scales a touch, a signal hairline draws across the top, and the meta row
 * swaps for the call to action. Pointer tracking writes two CSS custom
 * properties for the spotlight — no React state, so it never re-renders.
 */
export function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const frame = useRef(0);

  const onPointerMove = (e: PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el || frame.current) return;

    const { clientX, clientY } = e;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${((clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty("--my", `${((clientY - r.top) / r.height) * 100}%`);
    });
  };

  return (
    <Link
      ref={ref}
      href={`/products/${product.slug}`}
      onPointerMove={onPointerMove}
      aria-label={`${product.name} — ver producto`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-paper",
        "transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-expo)]",
        "hover:-translate-y-1.5 hover:border-line-strong",
        "hover:shadow-[0_28px_60px_-28px_rgba(8,9,10,0.22)]",
        "focus-visible:-translate-y-1.5",
      )}
      style={{ "--accent": product.accent } as React.CSSProperties}
    >
      {/* Signal hairline that draws in from the left on hover. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-20 h-px w-0 bg-[var(--accent)] transition-[width] duration-700 ease-[var(--ease-expo)] group-hover:w-full"
      />

      {/* Cursor spotlight. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx,50%) var(--my,50%), color-mix(in oklab, var(--accent) 8%, transparent), transparent 65%)",
        }}
      />

      {/* Artwork */}
      <div className="relative aspect-[16/10] overflow-hidden bg-paper-sunk sm:aspect-[16/9]">
        <div className="absolute inset-0 transition-transform duration-[900ms] ease-[var(--ease-expo)] group-hover:scale-[1.045]">
          {product.image ? (
            <Image
              src={product.image}
              alt={`Captura de ${product.name}`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-top"
            />
          ) : (
            <ProductGlyph seed={index} accent={product.accent} />
          )}
        </div>

        <span className="absolute left-5 top-5 z-20 rounded-full border border-line bg-paper/80 px-3 py-1 font-mono text-[0.625rem] tracking-[0.14em] text-ink-soft uppercase backdrop-blur-sm">
          {product.category}
        </span>

        <StatusPill status={product.status} />
      </div>

      {/* Meta */}
      <div className="relative z-20 flex flex-1 flex-col p-6 sm:p-7">
        <p className="t-label">
          Producto {String(index + 1).padStart(2, "0")}
        </p>

        <h3 className="t-h3 mt-3 text-ink">{product.name}</h3>

        <p className="t-body mt-2.5 max-w-[40ch] text-[0.9375rem]">
          {product.summary}
        </p>

        {/* Footer row: year slides out, CTA slides in. */}
        <div className="relative mt-7 h-6 overflow-hidden pt-px">
          <span className="absolute inset-x-0 top-0 flex items-center text-sm text-ink-mute transition-[transform,opacity] duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-6 group-hover:opacity-0">
            {product.year}
          </span>
          <span className="absolute inset-x-0 top-0 flex translate-y-6 items-center gap-1.5 text-sm font-medium text-ink opacity-0 transition-[transform,opacity] duration-500 ease-[var(--ease-expo)] group-hover:translate-y-0 group-hover:opacity-100">
            View product
            <Arrow />
          </span>
        </div>
      </div>
    </Link>
  );
}

function StatusPill({ status }: { status: Product["status"] }) {
  const live = status === "LIVE";
  const building = status === "BUILDING";

  return (
    <span className="absolute right-5 top-5 z-20 inline-flex items-center gap-2 rounded-full border border-line bg-paper/80 px-3 py-1 font-mono text-[0.625rem] tracking-[0.14em] text-ink-soft uppercase backdrop-blur-sm">
      <span
        aria-hidden="true"
        className={cn(
          "size-1.5 rounded-full",
          live && "bg-emerald-500",
          building && "bg-[var(--accent)]",
          !live && !building && "bg-ink-faint",
        )}
      />
      {status}
    </span>
  );
}
