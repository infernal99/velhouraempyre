"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { VelhouraObject } from "./VelhouraObject";
import type { DragSample } from "./VelhouraObject";
import { Particles } from "./Particles";
import { attachStudioInDev, useHeroSceneValues } from "./theatre";

type Tier = "mobile" | "tablet" | "desktop";

/**
 * The Hero's 3D layer.
 *
 * Mounted only on the client (see `HeroSceneLoader`), positioned to bleed off
 * the right side of the frame and masked so it never renders under the text
 * column — see the wrapping classes in `HeroSceneLoader`. This component owns
 * the Canvas, lighting, responsive tuning, the entrance timing, and the
 * drag-to-rotate hotspot (a plain DOM overlay, not R3F raycasting — see
 * `dragHotspotClass` below for why).
 */
export function VelhouraScene() {
  const values = useHeroSceneValues();
  const [tier, setTier] = useState<Tier>("desktop");
  const [reducedMotion, setReducedMotion] = useState(false);
  const drag = useRef<DragSample>({ active: false, dx: 0, dy: 0 });
  const lastPoint = useRef({ x: 0, y: 0 });

  useEffect(() => {
    attachStudioInDev();
  }, []);

  useEffect(() => {
    const widthMq = window.matchMedia("(max-width: 767px)");
    const tabletMq = window.matchMedia("(max-width: 1023px)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      setTier(widthMq.matches ? "mobile" : tabletMq.matches ? "tablet" : "desktop");
      setReducedMotion(motionMq.matches);
    };
    sync();

    widthMq.addEventListener("change", sync);
    tabletMq.addEventListener("change", sync);
    motionMq.addEventListener("change", sync);

    return () => {
      widthMq.removeEventListener("change", sync);
      tabletMq.removeEventListener("change", sync);
      motionMq.removeEventListener("change", sync);
    };
  }, []);

  const particleCount = useMemo(() => {
    if (reducedMotion) return 0;
    const base = values.particleCount;
    if (tier === "mobile") return Math.round(base * 0.35);
    if (tier === "tablet") return Math.round(base * 0.65);
    return base;
  }, [values.particleCount, tier, reducedMotion]);

  const dpr: [number, number] = tier === "mobile" ? [1, 1.5] : [1, 2];
  const detail = tier === "desktop" ? "high" : "low";
  // Biased right of dead-center (never fully centered, so it doesn't sit
  // exactly behind the wordmark) but much closer to it than an off-to-the-
  // side placement — the scrim behind the text is what keeps legibility
  // intact, not distance from the object.
  const cameraX = tier === "mobile" ? 0.3 : tier === "tablet" ? 0.7 : 1.0;

  // Drag handlers live on a plain DOM overlay rather than R3F's own pointer
  // events on the Earth mesh: the Canvas stays `pointer-events: none` across
  // the whole hero (so it never steals clicks from the CTAs — a CSS mask
  // hides paint, not hit-testing, so the canvas element still spans the full
  // section underneath). This overlay is a separate, deliberately generous
  // hotspot sized to the globe's roaming area per tier, positioned clear of
  // the text column and buttons at every breakpoint, and it alone gets
  // `pointer-events: auto`.
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    drag.current.active = true;
    lastPoint.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    drag.current.dx += e.clientX - lastPoint.current.x;
    drag.current.dy += e.clientY - lastPoint.current.y;
    lastPoint.current = { x: e.clientX, y: e.clientY };
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    drag.current.active = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  // Reads and resets `drag.current` in one step. Defined here, where the ref
  // was constructed, rather than in `VelhouraObject` — this project's lint
  // rules (react-hooks/immutability) forbid mutating a ref's contents from a
  // component that only received it as a prop.
  const consumeDrag = (): DragSample => {
    const d = drag.current;
    const sample: DragSample = { active: d.active, dx: d.dx, dy: d.dy };
    d.dx = 0;
    d.dy = 0;
    return sample;
  };

  return (
    <>
      <div
        aria-hidden="true"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={[
          // `pointer-events-auto` is load-bearing: the ancestor wrapper in
          // `HeroSceneLoader` sets `pointer-events: none` so the rest of the
          // hero stays click-through, and that value inherits by default —
          // this is the one region of the layer that opts back in.
          "absolute touch-none cursor-grab pointer-events-auto active:cursor-grabbing",
          dragHotspotClass(tier),
        ].join(" ")}
      />

      <Canvas
        dpr={dpr}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [cameraX, 0.3, 6.4], fov: 32 }}
        frameloop={reducedMotion ? "demand" : "always"}
        // Overrides Canvas's own default inline style (position: relative,
        // pointerEvents: auto) rather than fighting it with `!important`
        // classes. `pointerEvents: none` matters even though the layer is
        // masked to invisible over the text — a mask hides paint, not hit
        // testing, so without this the canvas would still intercept clicks
        // wherever it overlaps the CTAs.
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        <Lighting fullEnvironment={tier !== "mobile"} />

        <group position={[cameraX * 0.75, 0, 0]}>
          <SceneContent
            values={values}
            consumeDrag={consumeDrag}
            detail={detail}
            reducedMotion={reducedMotion}
            particleCount={particleCount}
          />
        </group>
      </Canvas>
    </>
  );
}

/**
 * The hotspot's box per tier — generous, and deliberately kept clear of the
 * text column (wordmark through the CTA row all live in the left portion of
 * the hero at every breakpoint) rather than trying to track the globe's
 * roamed position pixel-for-pixel.
 */
function dragHotspotClass(tier: Tier): string {
  if (tier === "mobile") return "right-0 bottom-0 h-[55%] w-[62%]";
  if (tier === "tablet") return "right-0 inset-y-0 w-[56%]";
  return "right-0 inset-y-0 w-[58%]";
}

function Lighting({ fullEnvironment }: { fullEnvironment: boolean }) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[3.5, 4, 3]} intensity={1.4} color="#ffffff" />
      <pointLight position={[-3, -1.5, 2]} intensity={2.2} color="#3b5bff" distance={9} decay={2} />

      {/*
        Procedural studio reflections for the physical materials — no HDR
        file fetched, so this never blocks or delays the initial paint.
        Skipped on mobile: baking it costs a 6-face cube-camera render pass,
        the single most GPU-expensive thing this scene does, and the direct
        lights above are enough for the materials to still read correctly
        without it — just with a flatter highlight instead of full studio
        reflections.
      */}
      {fullEnvironment && (
        <Environment resolution={128}>
          <Lightformer form="rect" intensity={2} position={[3, 2, 4]} scale={[3, 3, 1]} color="#ffffff" />
          <Lightformer form="rect" intensity={1.2} position={[-3, -1, 3]} scale={[2, 4, 1]} color="#8fa3ff" />
          <Lightformer form="ring" intensity={1} position={[0, 3, -3]} scale={5} color="#ffffff" />
        </Environment>
      )}
    </>
  );
}

function SceneContent({
  values,
  consumeDrag,
  detail,
  reducedMotion,
  particleCount,
}: {
  values: ReturnType<typeof useHeroSceneValues>;
  consumeDrag: () => DragSample;
  detail: "high" | "low";
  reducedMotion: boolean;
  particleCount: number;
}) {
  const [intro, setIntro] = useState(reducedMotion ? 1 : 0);
  const start = useRef<number | null>(null);

  useFrame(({ clock }) => {
    if (reducedMotion) return;
    if (intro >= 1) return;

    if (start.current === null) start.current = clock.elapsedTime;
    const elapsed = clock.elapsedTime - start.current - values.introDelay;
    const t = Math.min(Math.max(elapsed / values.introDuration, 0), 1);

    // easeOutCubic — a fast start that settles gently, no overshoot.
    const eased = 1 - Math.pow(1 - t, 3);
    setIntro(eased);
  });

  return (
    <>
      <VelhouraObject values={values} intro={intro} consumeDrag={consumeDrag} detail={detail} />
      <Particles count={particleCount} intro={intro} />
    </>
  );
}
