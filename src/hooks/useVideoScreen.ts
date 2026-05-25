import { useMemo, useEffect, useRef } from 'react';
import { Mesh, MeshStandardMaterial, RepeatWrapping, VideoTexture, Object3D, Vector3 } from 'three';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import type { MutableRefObject } from 'react';

interface UseVideoScreenResult {
  patchedScene: Object3D;
  screenPositionRef: MutableRefObject<Vector3 | null>;
}


export function useVideoScreen(scene: Object3D, videoTexture: VideoTexture): UseVideoScreenResult {
  const clonedScene = useMemo(() => clone(scene), [scene]);
  const screenPositionRef = useRef<Vector3 | null>(null);

  useEffect(() => {
    videoTexture.wrapS = RepeatWrapping;
    videoTexture.wrapT = RepeatWrapping;
    videoTexture.offset.set(-0.08, 0.01);
    videoTexture.flipY = true;
    videoTexture.rotation = Math.PI / 2;

    clonedScene.traverse((child) => {
      if (!(child instanceof Mesh) || child.parent?.name !== 'screen') return;

      const pos = new Vector3();
      child.getWorldPosition(pos);
      screenPositionRef.current = pos;

      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];

      materials.forEach((mat) => {
        if (mat instanceof MeshStandardMaterial) {
          mat.map = videoTexture;
          mat.needsUpdate = true;
        }
      });
    });
  }, [clonedScene, videoTexture]);

  return { patchedScene: clonedScene, screenPositionRef };
}
