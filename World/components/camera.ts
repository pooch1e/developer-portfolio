import { PerspectiveCamera } from 'three';
interface TickableCamera extends PerspectiveCamera {
  tick(delta: number): void;
}
export const createCamera = () => {
  const camera = new PerspectiveCamera(
    35, // FOV
    window.innerWidth / window.innerHeight, // aspect
    0.1,
    100
  ) as TickableCamera;
  // move the camera back so we can view the scene
  camera.position.set(0, 0, 10);

  const radius = 10; // distance from center
  const speed = 0.02; // radians per second - very slow orbit
  let angle = 0;

  camera.tick = (delta: number) => {
    angle += speed * delta;

    camera.position.x = Math.cos(angle) * radius;
    camera.position.z = Math.sin(angle) * radius;
    camera.position.y = 3;

    // Make camera look at center (0,0,0)
    camera.lookAt(0, 0, 0);
  };
  return camera;
};
