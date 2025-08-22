import { PerspectiveCamera } from 'three';

export const createCamera = () => {
  const camera = new PerspectiveCamera(
    35, // FOV
    window.innerWidth / window.innerHeight, // aspect
    0.1,
    100
  );
  // move the camera back so we can view the scene
  camera.position.set(0, 0, 10);

  return camera;
};
