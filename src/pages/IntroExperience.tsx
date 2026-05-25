import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, PresentationControls, useVideoTexture } from '@react-three/drei';
import { useVideoScreen } from '@/hooks/useVideoScreen';
import { useZoomTrigger } from '@/hooks/useZoomTrigger';
import { useCameraAnimation } from '@/hooks/useCameraAnimation';

const MODEL_PATH = '/computer/computer_nodeNamed.glb';
const VIDEO_PATH = '/videos/dev_compressed.mp4';

const INITIAL_CAMERA_POS = { x: 0, y: 0, z: 5 };
const INITIAL_LOOK_AT    = { x: 0, y: 0, z: 0 };
const INITIAL_FOV        = 45;

interface SceneProps {
  onReady: () => void;
  onIntroComplete: () => void;
}

function Scene({ onReady, onIntroComplete }: SceneProps) {
  const { scene } = useGLTF(MODEL_PATH);
  const videoTexture = useVideoTexture(VIDEO_PATH);
  const [zooming, setZooming] = useState(false);

  const { patchedScene, screenPositionRef } = useVideoScreen(scene, videoTexture);

  const { position, lookAt, fov, handleClick } = useZoomTrigger(
    INITIAL_CAMERA_POS,
    INITIAL_LOOK_AT,
    INITIAL_FOV,
    screenPositionRef,
    onIntroComplete
  );

  useCameraAnimation(position, lookAt, fov);

  // Both assets are resolved by the time Scene renders —
  // useGLTF and useVideoTexture suspend until ready.
  useEffect(() => {
    onReady();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleZoomClick = () => {
    setZooming(true);
    handleClick();
  };

  return (
    <>
      <color args={['#241a1a']} attach="background" />
      <Environment preset="city" />


      {!zooming ? (
        <PresentationControls
          global
          rotation={[0.2, 0.1, 0]}
          polar={[-0.4, 0.2]}
          azimuth={[-0.8, 0.3]}
        >
          <primitive
            object={patchedScene}
            scale={0.5}
            position={[2.0, -1.5, -2.5]}
            rotation-y={1}
            onClick={handleZoomClick}
          />
        </PresentationControls>
      ) : (
        <primitive
          object={patchedScene}
          scale={0.5}
          position={[2.0, -1.5, -2.5]}
          rotation-y={1}
        />
      )}

      <ContactShadows position-y={-1.3} opacity={0.4} scale={5} blur={2.4} />
    </>
  );
}

export interface IntroExperienceProps {
  onReady: () => void;
  onIntroComplete: () => void;
}

export default function IntroExperience({ onReady, onIntroComplete }: IntroExperienceProps) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [INITIAL_CAMERA_POS.x, INITIAL_CAMERA_POS.y, INITIAL_CAMERA_POS.z], fov: INITIAL_FOV }}
        style={{ width: '100%', height: '100%' }}
      >
        <Scene onReady={onReady} onIntroComplete={onIntroComplete} />
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_PATH);
