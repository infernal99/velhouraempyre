"use client";

import { getProject, types } from "@theatre/core";
import { useEffect, useState } from "react";

/**
 * Theatre.js control surface for the Hero's 3D scene.
 *
 * SCOPE, DELIBERATELY: `@theatre/r3f` (the official React Three Fiber bridge)
 * requires `@react-three/fiber@^8`, but this project runs R3F v9 (the only
 * version that supports React 19). Installing `@theatre/r3f` here would pull
 * in an incompatible peer and risk broken/undefined behaviour at runtime, so
 * it is intentionally NOT used.
 *
 * Instead, this module uses Theatre's stable, UI-independent core API
 * (`getProject`, `sheet.object`, `object.value`, `object.onValuesChange`) to
 * hold the scene's tunable numbers — entrance timing, float/rotation speed,
 * material opacity, particle count, pointer-tilt strength. Nothing here
 * depends on Theatre's sequencing/keyframe timeline (an internal, harder to
 * hand-verify part of the API); the moment-to-moment animation is computed in
 * the R3F frame loop using whatever values this object currently holds.
 *
 * In development, `@theatre/studio` attaches (see `attachStudioInDev` below)
 * so these exact numbers can be scrubbed live in a floating panel. In
 * production `@theatre/studio` is never imported, so it costs nothing.
 */

const project = getProject("Velhoura", {
  // Values are visible in the dev Studio panel immediately; adjusting them
  // there does not require this file to change.
});

const sheet = project.sheet("Hero Scene");

export const heroSceneObject = sheet.object("Centerpiece", {
  // Entrance
  introDuration: types.number(1.4, { range: [0.6, 3], nudgeMultiplier: 0.05 }),
  introDelay: types.number(0.15, { range: [0, 1.5], nudgeMultiplier: 0.05 }),

  // Idle motion — a planet's axial spin, not an abstract object's tumble, so
  // even a brisker default stays well short of "fast".
  floatSpeed: types.number(0.7, { range: [0, 3], nudgeMultiplier: 0.05 }),
  floatIntensity: types.number(0.32, { range: [0, 2], nudgeMultiplier: 0.05 }),
  rotationSpeed: types.number(0.07, { range: [0, 0.3], nudgeMultiplier: 0.005 }),

  // Drag-to-rotate: radians of rotation per pixel of pointer/touch movement
  // while dragging. Auto-spin pauses for the duration of the drag and
  // resumes from wherever it's released.
  dragSensitivity: types.number(0.008, { range: [0.001, 0.02], nudgeMultiplier: 0.001 }),

  // Material / composition
  atmosphereOpacity: types.number(0.9, { range: [0.2, 1], nudgeMultiplier: 0.01 }),
  earthRoughness: types.number(0.82, { range: [0.4, 1], nudgeMultiplier: 0.01 }),

  // Particles ("stars" around the planet)
  particleCount: types.number(90, { range: [0, 220], nudgeMultiplier: 1 }),
});

export type HeroSceneValues = typeof heroSceneObject.value;

/** Reactive read of the sheet object — re-renders when Studio edits a value. */
export function useHeroSceneValues(): HeroSceneValues {
  const [values, setValues] = useState(heroSceneObject.value);

  useEffect(() => {
    return heroSceneObject.onValuesChange(setValues);
  }, []);

  return values;
}

let studioAttached = false;

/**
 * Attaches the visual Theatre.js editor, development only. Dynamically
 * imported so `@theatre/studio` never reaches a production bundle — it is a
 * sizeable devtool UI with no place in a shipped page.
 */
export function attachStudioInDev() {
  if (studioAttached) return;
  if (process.env.NODE_ENV !== "development") return;
  if (typeof window === "undefined") return;

  studioAttached = true;

  void import("@theatre/studio").then(({ default: studio }) => {
    studio.initialize({ persistenceKey: "velhoura-hero-theatre" });
  });
}
