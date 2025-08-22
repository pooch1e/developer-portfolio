import { WebGLRenderer } from 'three';
export const createRenderer = (canvas: HTMLCanvasElement) => {
  const renderer = new WebGLRenderer({
    antialias: true,
    canvas: canvas,
    alpha: true,
  });

  // renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.physicallyCorrectLights = true;

  // start the loop
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
  return renderer;
};
