import { PerspectiveCamera } from 'three';
interface TickableCamera extends PerspectiveCamera {
  tick(delta: number): void;
}

export const createCamera = (objectsDistance: number) => {
  const camera = new PerspectiveCamera(
    35, // FOV
    window.innerWidth / window.innerHeight, // aspect
    0.1,
    100
  ) as TickableCamera;
  // move the camera back so we can view the scene
  camera.position.set(0, 0, 20);

  const radius = 20; // distance from center
  const speed = 1; // radians per second
  let angle = 0;

  camera.tick = (delta: number) => {
    angle += speed * delta;

    camera.position.x = Math.cos(angle) * radius;
    camera.position.z = Math.sin(angle) * radius;

    //section scrolling
    const totalSections = 3;
    const scrollProgress = Math.min(
      scrollY / (document.body.scrollHeight - window.innerHeight),
      1
    );
    const sectionProgress = scrollProgress * (totalSections - 1);
    const cameraY = -sectionProgress * objectsDistance;
    // Scroll speed
    camera.position.y = cameraY;

    camera.lookAt(0, cameraY, 0);
  };
  return camera;
};
