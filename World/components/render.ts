import { WebGLRenderer } from 'three';
export const createRenderer = (canvas: HTMLCanvasElement) => {
  const renderer = new WebGLRenderer({
    antialias: true,
    canvas: canvas,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.physicallyCorrectLights = true;
  return renderer;
};
