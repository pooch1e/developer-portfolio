import { BoxGeometry, MeshStandardMaterial, Mesh } from 'three';
export const createCube = () => {
  const geometry = new BoxGeometry(2, 2, 2);
  const material = new MeshStandardMaterial({ color: 0x049ef4 });
  material.metalness = 1;
  const cube = new Mesh(geometry, material);

  cube.rotation.z = 0.2;
  cube.rotation.x = 0.2;

  return cube;
};
