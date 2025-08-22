import { BoxGeometry, MeshStandardMaterial, Mesh, MathUtils } from 'three';
const radiansPerSecond = MathUtils.degToRad(30);
export const createCube = () => {
  const geometry = new BoxGeometry(2, 2, 2);
  const material = new MeshStandardMaterial({ color: 0x049ef4 });
  // material.wireframe = true;
  material.metalness = 1;
  const cube = new Mesh(geometry, material);

  cube.rotation.set(-0.5, -0.1, 0.8);

  // this method will be called once per frame
  cube.tick = (delta) => {
    // increase the cube's rotation each frame
    cube.rotation.z += radiansPerSecond * delta;
    cube.rotation.x += radiansPerSecond * delta;
    cube.rotation.y += radiansPerSecond * delta;
  };

  return cube;
};
