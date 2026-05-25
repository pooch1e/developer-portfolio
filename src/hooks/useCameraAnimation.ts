import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from 'three';
import type { MutableRefObject } from 'react';

interface PositionRefs {
  x: MutableRefObject<number>;
  y: MutableRefObject<number>;
  z: MutableRefObject<number>;
}


export function useCameraAnimation(
  position: PositionRefs,
  lookAt: PositionRefs,
  fov: MutableRefObject<number>
): void {
  useFrame(({ camera }) => {
    camera.position.set(position.x.current, position.y.current, position.z.current);
    camera.lookAt(lookAt.x.current, lookAt.y.current, lookAt.z.current);

    if (camera instanceof PerspectiveCamera) {
      camera.fov = fov.current;
      camera.updateProjectionMatrix();
    }
  });
}
