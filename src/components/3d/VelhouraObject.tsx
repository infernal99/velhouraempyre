"use client";

import { useMemo, useRef } from "react";
import type { RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import type { HeroSceneValues } from "./theatre";

type VelhouraObjectProps = {
  values: HeroSceneValues;
  /** 0 → 1 entrance progress, eased, driven by the parent's clock. */
  intro: number;
  /** Normalised pointer, −1..1. Zero on touch/coarse pointers. */
  pointer: RefObject<{ x: number; y: number }>;
  /** Fewer ring segments on constrained devices. */
  detail: "high" | "low";
};

type RingSpec = {
  radius: number;
  tube: number;
  rotation: [number, number, number];
  axis: "x" | "y" | "z";
  speed: number;
};

const RINGS: RingSpec[] = [
  { radius: 1.55, tube: 0.018, rotation: [Math.PI / 2.4, 0, 0.3], axis: "x", speed: 0.16 },
  { radius: 1.85, tube: 0.014, rotation: [Math.PI / 3.2, Math.PI / 5, -0.4], axis: "z", speed: -0.11 },
  { radius: 2.15, tube: 0.011, rotation: [Math.PI / 1.8, -Math.PI / 6, 0.15], axis: "y", speed: 0.08 },
];

/**
 * Velhoura's hero centerpiece: a faceted ink-dark core in a slow orbit of
 * three thin, semi-translucent rings — a technology/orbit motif rather than a
 * literal product render, kept to primitive geometry so it stays cheap.
 *
 * `Float` (drei) supplies the organic idle drift; this component layers a
 * slow independent spin per ring plus a pointer-following tilt on top.
 */
export function VelhouraObject({
  values,
  intro,
  pointer,
  detail,
}: VelhouraObjectProps) {
  const outer = useRef<THREE.Group>(null);
  const tilt = useRef({ x: 0, y: 0 });
  const ringRefs = useRef<Array<THREE.Mesh | null>>([]);

  const coreGeometry = useMemo(
    () => new THREE.IcosahedronGeometry(0.72, detail === "high" ? 1 : 0),
    [detail],
  );

  const ringSegments = detail === "high" ? 128 : 48;

  useFrame((_, delta) => {
    const group = outer.current;
    if (!group) return;

    // Pointer tilt: lerp toward target so it reads as smooth, weighted motion.
    const targetX = pointer.current.y * values.tiltStrength;
    const targetY = pointer.current.x * values.tiltStrength;
    tilt.current.x += (targetX - tilt.current.x) * Math.min(delta * 3, 1);
    tilt.current.y += (targetY - tilt.current.y) * Math.min(delta * 3, 1);

    group.rotation.x = tilt.current.x;
    group.rotation.y += values.rotationSpeed * delta;
    group.rotation.y = group.rotation.y % (Math.PI * 2);

    // Entrance: scale/opacity driven by the eased progress from the parent.
    const s = intro;
    group.scale.setScalar(0.72 + s * 0.28);

    // Each ring spins independently on its own axis — the source of the
    // "orbital" read — and fades in with the same entrance progress.
    for (let i = 0; i < ringRefs.current.length; i++) {
      const mesh = ringRefs.current[i];
      if (!mesh) continue;

      mesh.rotation[RINGS[i].axis] += RINGS[i].speed * delta;

      const mat = mesh.material as THREE.MeshPhysicalMaterial;
      mat.opacity = values.ringOpacity * s;
    }
  });

  return (
    <group ref={outer} scale={0.72}>
      <Float
        speed={values.floatSpeed}
        floatIntensity={values.floatIntensity}
        rotationIntensity={0.35}
        floatingRange={[-0.12, 0.12]}
      >
        {/* Core */}
        <mesh geometry={coreGeometry} castShadow={false} receiveShadow={false}>
          <meshPhysicalMaterial
            color="#0b0d10"
            metalness={values.coreMetalness}
            roughness={0.22}
            clearcoat={1}
            clearcoatRoughness={0.18}
            envMapIntensity={1.15}
            transparent
            opacity={intro}
          />
        </mesh>

        {/* Orbital rings */}
        {RINGS.map((ring, i) => (
          <mesh
            key={i}
            ref={(el) => {
              ringRefs.current[i] = el;
            }}
            rotation={ring.rotation}
          >
            <torusGeometry args={[ring.radius, ring.tube, 12, ringSegments]} />
            <meshPhysicalMaterial
              color={i === 1 ? "#3b5bff" : "#8790a3"}
              metalness={0.85}
              roughness={0.28}
              clearcoat={1}
              clearcoatRoughness={0.25}
              transparent
              opacity={0}
            />
          </mesh>
        ))}
      </Float>
    </group>
  );
}
