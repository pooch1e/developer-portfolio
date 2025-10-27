import { DirectionalLight, AmbientLight } from 'three';
export const createLights = () => {
  const directionalLight = new DirectionalLight('white', 8);

  directionalLight.position.set(10, 10, 10);

  const ambientLight = new AmbientLight('white', 4);

  return [directionalLight, ambientLight];
};
