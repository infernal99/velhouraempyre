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
  /** Fewer sphere segments on constrained devices. */
  detail: "high" | "low";
};

const EARTH_RADIUS = 1.15;
const ATMOSPHERE_RADIUS = EARTH_RADIUS * 1.055;

/**
 * Velhoura's hero centerpiece: a realistic, textured Earth with a thin
 * Fresnel atmosphere glow — a small, elegant technology/scale motif rather
 * than a literal product render.
 *
 * `Float` (drei) supplies the organic idle drift; this component layers the
 * planet's own slow axial spin (independent of Float, on the mesh's own
 * rotation) plus a deliberately subtle pointer-following tilt on the outer
 * group, so the self-rotation always reads as the dominant motion.
 */
export function VelhouraObject({
  values,
  intro,
  pointer,
  detail,
}: VelhouraObjectProps) {
  const outer = useRef<THREE.Group>(null);
  const tilt = useRef({ x: 0, y: 0 });
  const earthRef = useRef<THREE.Mesh>(null);
  const atmosphereMaterial = useRef<THREE.ShaderMaterial>(null);

  // Texture credit: "2k_earth_daymap.jpg" — Solar System Scope
  // (solarsystemscope.com/textures), licensed CC BY 4.0.
  //
  // Loaded via a plain THREE.TextureLoader rather than drei's `useTexture`:
  // colorSpace/anisotropy need to be set on the texture right after creating
  // it (the standard three.js pattern — TextureLoader.load() returns
  // immediately and fills in pixel data asynchronously, applying whatever
  // metadata is already set once it does), and that texture is a value this
  // component owns outright, never a value handed back by a hook.
  const dayMap = useMemo(() => {
    const texture = new THREE.TextureLoader().load(
      "/textures/earth-daymap-2k.jpg",
    );
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    return texture;
  }, []);

  const segments = detail === "high" ? 64 : 28;

  const earthGeometry = useMemo(
    () => new THREE.SphereGeometry(EARTH_RADIUS, segments, segments),
    [segments],
  );

  const atmosphereGeometry = useMemo(
    () => new THREE.SphereGeometry(ATMOSPHERE_RADIUS, segments, segments),
    [segments],
  );

  useFrame((_, delta) => {
    const group = outer.current;
    if (!group) return;

    // Pointer tilt: lerp toward target, kept small so the planet's own spin
    // — not the cursor — is what the eye reads as the primary motion.
    const targetX = pointer.current.y * values.tiltStrength;
    const targetY = pointer.current.x * values.tiltStrength;
    tilt.current.x += (targetX - tilt.current.x) * Math.min(delta * 3, 1);
    tilt.current.y += (targetY - tilt.current.y) * Math.min(delta * 3, 1);

    // Direct-set (not accumulated) from the pointer: this is the group's
    // whole-scene tilt, independent of the Earth mesh's own continuous spin
    // below, which lives on that mesh's local rotation instead.
    group.rotation.x = tilt.current.x;
    group.rotation.y = tilt.current.y;

    // Entrance: scale/opacity driven by the eased progress from the parent.
    const s = intro;
    group.scale.setScalar(0.72 + s * 0.28);

    // The planet's own axial spin — continuous, slow, independent of the
    // pointer tilt above (that rotates the outer group; this rotates the
    // sphere's own local Y axis).
    if (earthRef.current) {
      earthRef.current.rotation.y += values.rotationSpeed * delta;
      const mat = earthRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = s;
    }

    if (atmosphereMaterial.current) {
      atmosphereMaterial.current.uniforms.opacity.value =
        values.atmosphereOpacity * s;
    }
  });

  return (
    <group ref={outer} scale={0.72}>
      <Float
        speed={values.floatSpeed}
        floatIntensity={values.floatIntensity}
        rotationIntensity={0.12}
        floatingRange={[-0.1, 0.1]}
      >
        {/* Earth */}
        <mesh ref={earthRef} geometry={earthGeometry} castShadow={false} receiveShadow={false}>
          <meshStandardMaterial
            map={dayMap}
            roughness={values.earthRoughness}
            metalness={0}
            transparent
            opacity={intro}
          />
        </mesh>

        {/* Atmosphere — a thin Fresnel rim glow on a slightly larger
            backside sphere. Cheap: one extra draw call, no extra texture. */}
        <mesh geometry={atmosphereGeometry}>
          <shaderMaterial
            ref={atmosphereMaterial}
            args={[
              {
                uniforms: { opacity: { value: 0 } },
                vertexShader: ATMOSPHERE_VERTEX,
                fragmentShader: ATMOSPHERE_FRAGMENT,
                side: THREE.BackSide,
                blending: THREE.AdditiveBlending,
                transparent: true,
                depthWrite: false,
              },
            ]}
          />
        </mesh>
      </Float>
    </group>
  );
}

const ATMOSPHERE_VERTEX = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ATMOSPHERE_FRAGMENT = /* glsl */ `
  varying vec3 vNormal;
  uniform float opacity;
  void main() {
    float rim = pow(0.68 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.2);
    vec3 glow = vec3(0.31, 0.56, 1.0);
    gl_FragColor = vec4(glow, clamp(rim, 0.0, 1.0) * opacity);
  }
`;
