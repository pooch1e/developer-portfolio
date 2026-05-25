import { useEffect, useRef, useCallback } from 'react';
import { Vector3 } from 'three';
import gsap from 'gsap';
import type { MutableRefObject } from 'react';

const ZOOM_FOV = 20;
const ZOOM_DURATION = 1.6;
const ZOOM_EASE = 'power2.inOut';
// How far in front of the screen face the camera stops (world units)
const SCREEN_APPROACH_OFFSET = 0.5;

export interface ZoomRefs {
  position: {
    x: MutableRefObject<number>;
    y: MutableRefObject<number>;
    z: MutableRefObject<number>;
  };
  lookAt: {
    x: MutableRefObject<number>;
    y: MutableRefObject<number>;
    z: MutableRefObject<number>;
  };
  fov: MutableRefObject<number>;
  handleClick: () => void;
}


export function useZoomTrigger(
  initialPos: { x: number; y: number; z: number },
  initialLookAt: { x: number; y: number; z: number },
  initialFov: number,
  screenPositionRef: MutableRefObject<Vector3 | null>,
  onComplete: () => void
): ZoomRefs {
  const hasTriggered = useRef(false);

  // Position refs — GSAP writes, useFrame reads
  const px = useRef(initialPos.x);
  const py = useRef(initialPos.y);
  const pz = useRef(initialPos.z);

  // LookAt refs — GSAP writes, useFrame reads
  const lx = useRef(initialLookAt.x);
  const ly = useRef(initialLookAt.y);
  const lz = useRef(initialLookAt.z);

  const fov = useRef(initialFov);

  const trigger = useCallback(() => {
    if (hasTriggered.current) return;

    const screen = screenPositionRef.current;
    if (!screen) return; 

    hasTriggered.current = true;

    // Compute approach position: step back from the screen toward the
    // camera's starting position so we stop just in front of the screen.
    const startPos = new Vector3(initialPos.x, initialPos.y, initialPos.z);
    const toScreen = new Vector3().subVectors(screen, startPos).normalize();
    const approachPos = screen.clone().addScaledVector(toScreen, -SCREEN_APPROACH_OFFSET);

    // Animate camera position toward the approach point
    gsap.to(px, { current: approachPos.x, duration: ZOOM_DURATION, ease: ZOOM_EASE });
    gsap.to(py, { current: approachPos.y, duration: ZOOM_DURATION, ease: ZOOM_EASE });
    gsap.to(pz, { current: approachPos.z, duration: ZOOM_DURATION, ease: ZOOM_EASE });

    // Animate lookAt toward screen center — creates smooth gaze rotation
    gsap.to(lx, { current: screen.x, duration: ZOOM_DURATION, ease: ZOOM_EASE });
    gsap.to(ly, { current: screen.y, duration: ZOOM_DURATION, ease: ZOOM_EASE });
    gsap.to(lz, { current: screen.z, duration: ZOOM_DURATION, ease: ZOOM_EASE, onComplete });

    // Tighten the lens
    gsap.to(fov, { current: ZOOM_FOV, duration: ZOOM_DURATION, ease: ZOOM_EASE });
  }, [initialPos, screenPositionRef, onComplete]);

  // Passive wheel listener — cleaned up automatically
  useEffect(() => {
    const handler = () => trigger();
    window.addEventListener('wheel', handler, { passive: true });
    return () => window.removeEventListener('wheel', handler);
  }, [trigger]);

  const handleClick = useCallback(() => trigger(), [trigger]);

  return {
    position: { x: px, y: py, z: pz },
    lookAt: { x: lx, y: ly, z: lz },
    fov,
    handleClick,
  };
}
