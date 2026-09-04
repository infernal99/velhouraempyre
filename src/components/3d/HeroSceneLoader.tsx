"use client";

import dynamic from "next/dynamic";

/**
 * Client boundary for the Hero's 3D layer.
 *
 * `next/dynamic`'s `ssr: false` is only permitted inside a Client Component
 * (Next.js throws if used directly in a Server Component) — hence this tiny
 * wrapper. `Hero.tsx` itself stays a server component: it renders this as an
 * ordinary child, and only this file's own bundle is client-only.
 *
 * The Three.js/R3F chunk (several hundred KB) is therefore never part of the
 * initial server-rendered payload and loads in its own split chunk, after
 * hydration — the hero's text and CTAs are already visible and interactive
 * from the CSS-driven entrance before this arrives.
 *
 * Positioning: legibility does NOT rely on keeping this layer's footprint out
 * of the text's bounding box — at desktop sizes the headline alone spans up
 * to ~90% of the viewport width, so there is no reliable gap to place a
 * centerpiece into beside it. The real guarantee is the blurred scrim behind
 * the text column (see `Hero.tsx`). This mask only trims the object's very
 * edges — top (under the navbar), bottom (into the footer fade) — so it
 * reads as a contained scene rather than a hard-edged rectangle.
 */
const VelhouraScene = dynamic(
  () => import("./VelhouraScene").then((m) => m.VelhouraScene),
  { ssr: false, loading: () => null },
);

export function HeroSceneLoader() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_78%_82%_at_58%_46%,black_58%,transparent_100%)]"
    >
      <VelhouraScene />
    </div>
  );
}
