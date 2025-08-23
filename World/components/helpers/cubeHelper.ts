import { Vector2, Raycaster, Camera, WebGLRenderer } from 'three';
import { TickableMesh } from '../cube';
export const setupCubeInteractions = (
  cube: TickableMesh,
  camera: Camera,
  renderer: WebGLRenderer
) => {
  const raycaster = new Raycaster();
  const mouse = new Vector2();

  const onMouseMove = (event: MouseEvent) => {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(cube);

    if (intersects.length > 0) {
      document.body.style.cursor = 'pointer';
      cube.onHover?.();
    } else {
      document.body.style.cursor = 'default';
      cube.onMouseOut?.();
    }
  };

  const onClick = (event: MouseEvent) => {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(cube);

    if (intersects.length > 0) {
      cube.onClick?.();
    }
  };

  renderer.domElement.addEventListener('mousemove', onMouseMove);
  renderer.domElement.addEventListener('click', onClick);

  // Return cleanup function
  return () => {
    renderer.domElement.removeEventListener('mousemove', onMouseMove);
    renderer.domElement.removeEventListener('click', onClick);
  };
};
