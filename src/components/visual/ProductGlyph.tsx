/**
 * Generated artwork for a product card.
 *
 * Three deterministic compositions keyed off the product's index, drawn as
 * inline SVG: no image requests, no layout shift, perfect at any density, and
 * it scales to any number of products without new assets.
 *
 * ⚠ This is the elegant placeholder. When a product has real UI to show,
 * swap this component for a <next/image> screenshot inside the same box.
 */
export function ProductGlyph({
  seed,
  accent,
}: {
  seed: number;
  accent: string;
}) {
  const variant = seed % 3;

  return (
    <svg
      viewBox="0 0 640 360"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="size-full"
    >
      <defs>
        <linearGradient id={`g-${seed}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.16" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`s-${seed}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={accent} stopOpacity="0" />
          <stop offset="50%" stopColor={accent} stopOpacity="0.55" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="640" height="360" fill="var(--paper-sunk)" />

      {/* Shared substrate: a faint technical grid. */}
      <g stroke="var(--line)" strokeWidth="1">
        {Array.from({ length: 7 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={45 * (i + 1)} x2="640" y2={45 * (i + 1)} />
        ))}
        {Array.from({ length: 13 }, (_, i) => (
          <line key={`v${i}`} x1={45 * (i + 1)} y1="0" x2={45 * (i + 1)} y2="360" />
        ))}
      </g>

      {variant === 0 && (
        // Ascending arc — growth.
        <>
          <path
            d="M0 300 C 140 300, 200 210, 300 180 S 470 120, 640 60 L640 360 L0 360 Z"
            fill={`url(#g-${seed})`}
          />
          <path
            d="M0 300 C 140 300, 200 210, 300 180 S 470 120, 640 60"
            fill="none"
            stroke={accent}
            strokeWidth="2"
            strokeLinecap="round"
          />
          {[
            [300, 180],
            [470, 120],
            [640, 60],
          ].map(([cx, cy]) => (
            <circle key={cx} cx={cx} cy={cy} r="4" fill={accent} />
          ))}
        </>
      )}

      {variant === 1 && (
        // Stacked planes — architecture.
        <g>
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x={110 + i * 46}
              y={86 + i * 40}
              width="300"
              height="128"
              rx="12"
              fill="var(--paper)"
              stroke="var(--line-strong)"
              opacity={0.55 + i * 0.22}
            />
          ))}
          <rect x="202" y="166" width="300" height="128" rx="12" fill={`url(#g-${seed})`} />
          <rect x="228" y="196" width="118" height="8" rx="4" fill={accent} opacity="0.8" />
          <rect x="228" y="216" width="196" height="6" rx="3" fill="var(--line-strong)" />
          <rect x="228" y="232" width="152" height="6" rx="3" fill="var(--line-strong)" />
        </g>
      )}

      {variant === 2 && (
        // Radial nodes — a network taking shape.
        <g>
          <circle cx="320" cy="180" r="118" fill="none" stroke="var(--line-strong)" />
          <circle cx="320" cy="180" r="76" fill="none" stroke="var(--line)" />
          <circle cx="320" cy="180" r="118" fill={`url(#g-${seed})`} />
          {[0, 60, 120, 180, 240, 300].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            // Rounded: raw floats serialise differently on server and client,
            // which trips React hydration on the SVG attributes.
            const x = Math.round((320 + Math.cos(rad) * 118) * 100) / 100;
            const y = Math.round((180 + Math.sin(rad) * 118) * 100) / 100;
            return (
              <g key={deg}>
                <line x1="320" y1="180" x2={x} y2={y} stroke="var(--line-strong)" />
                <circle cx={x} cy={y} r={i % 2 === 0 ? 6 : 4} fill={i % 2 === 0 ? accent : "var(--ink-faint)"} />
              </g>
            );
          })}
          <circle cx="320" cy="180" r="9" fill={accent} />
        </g>
      )}

      {/* The velocity cue, held to a single hairline. */}
      <rect x="0" y={variant === 1 ? 320 : 336} width="640" height="2" fill={`url(#s-${seed})`} />
    </svg>
  );
}
