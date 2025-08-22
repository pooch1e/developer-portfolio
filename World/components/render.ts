import { WebGLRenderer, Camera, Scene } from 'three';
export const createRenderer = (
  canvas: HTMLCanvasElement,
  scene: Scene,
  camera: Camera
) => {
  const renderer = new WebGLRenderer({
    antialias: true,
    canvas: canvas,
    alpha: true,
  });

  // renderer.setSize(window.innerWidth, window.innerHeight);

  // renderer.useLegacyLights = false;

  // start the loop
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
  return renderer;
};
