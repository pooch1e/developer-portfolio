import { PerspectiveCamera } from 'three';

export const createCamera = () => {
  const camera = new PerspectiveCamera(35, 1, 1000, 100);
  // move the camera back so we can view the scene
  camera.position.set(0, 0, 10);

  return camera;
};
