import { useMemo, useEffect, useRef } from 'react';
import { Mesh, MeshStandardMaterial, RepeatWrapping, VideoTexture, Object3D } from 'three';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import type { MutableRefObject } from 'react';

interface UseVideoScreenResult {
  patchedScene: Object3D;
  /** Ref to the screen mesh itself. Resolve world position at trigger time
   *  (after matrices are updated) via screenMeshRef.current.getWorldPosition(). */
  screenMeshRef: MutableRefObject<Mesh | null>;
}


export function useVideoScreen(scene: Object3D, videoTexture: VideoTexture): UseVideoScreenResult {
  const clonedScene = useMemo(() => clone(scene), [scene]);
  const screenMeshRef = useRef<Mesh | null>(null);

  useEffect(() => {
    videoTexture.wrapS = RepeatWrapping;
    videoTexture.wrapT = RepeatWrapping;
    videoTexture.offset.set(-0.08, 0.01);
    videoTexture.flipY = true;
    videoTexture.rotation = Math.PI / 2;

    clonedScene.traverse((child) => {
      if (!(child instanceof Mesh) || child.parent?.name !== 'screen') return;

      // Store the mesh ref — world position is resolved at zoom-trigger time
      // so it reflects the applied scale/position/rotation transforms.
      screenMeshRef.current = child;

      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];

      materials.forEach((mat) => {
        if (mat instanceof MeshStandardMaterial) {
          mat.map = videoTexture;
          mat.emissiveMap = videoTexture;
          mat.emissive.set(0xffffff);
          mat.emissiveIntensity = 1.0;
          mat.needsUpdate = true;
        }
      });
    });
  }, [clonedScene, videoTexture]);

  return { patchedScene: clonedScene, screenMeshRef };
}
