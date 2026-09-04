"use client";

import { useMemo } from "react";
import { Sparkles } from "@react-three/drei";

type ParticlesProps = {
  count: number;
  /** 0 → 1 entrance progress; particles fade in with the centerpiece. */
  intro: number;
};

/**
 * A sparse field of soft points around the centerpiece. Built on drei's
 * `Sparkles` (a single instanced draw call) rather than hand-rolled
 * `InstancedMesh` — it is already the cheap, well-tuned option for exactly
 * this "a few drifting motes" effect.
 */
export function Particles({ count, intro }: ParticlesProps) {
  // Two shells at different radii/opacity read as depth rather than a flat cloud.
  const outerCount = useMemo(() => Math.round(count * 0.65), [count]);
  const innerCount = count - outerCount;

  if (count <= 0) return null;

  return (
    <group>
      <Sparkles
        count={outerCount}
        scale={[6.5, 4.5, 4.5]}
        size={1.6}
        speed={0.25}
        opacity={0.35 * intro}
        color="#a9b3c4"
        noise={1.2}
      />
      <Sparkles
        count={innerCount}
        scale={[3.2, 2.6, 2.6]}
        size={2.1}
        speed={0.4}
        opacity={0.55 * intro}
        color="#3b5bff"
        noise={0.8}
      />
    </group>
  );
}
