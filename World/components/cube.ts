import {
  BoxGeometry,
  MeshStandardMaterial,
  Mesh,
  MathUtils,
  ShaderMaterial,
  RawShaderMaterial,
} from 'three';
import fragmentShader from '../../shaders/fragment.glsl';
import vertexShader from '../../shaders/vertex.glsl';

export interface TickableMesh extends Mesh {
  tick(delta: number): void;
  onHover?(): void;
  onClick?(): void;
  onMouseOut?(): void;
}

export const createCube = () => {
  const geometry = new BoxGeometry(2, 2, 2);
  // const material = new MeshStandardMaterial({
  //   color: 0x049ef4,
  //   metalness: 0.7,
  //   roughness: 0.3
  // });

  //testing custom shader
  const material = new ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  });

  const cube = new Mesh(geometry, material) as unknown as Mesh & TickableMesh;
  cube.rotation.set(-0.5, -0.1, 0.8);
  cube.position.y = -1;

  // Interactive state
  let isHovered = false;
  let isClicked = false;
  let rotationSpeed = MathUtils.degToRad(30);
  let targetScale = 1;
  let currentScale = 1;
  let bobOffset = 0;
  const originalY = cube.position.y;

  // Color variations
  const originalColor = 0x049ef4;
  const hoverColor = 0xff6b35;
  const clickColor = 0x00ff88;

  // Mouse interaction handlers
  cube.onHover = () => {
    if (!isHovered) {
      isHovered = true;
      targetScale = 1.2;
      rotationSpeed = MathUtils.degToRad(60);
      (material as MeshStandardMaterial).color.setHex(hoverColor);
      (material as MeshStandardMaterial).emissive.setHex(0x222222);
    }
  };

  cube.onMouseOut = () => {
    if (isHovered && !isClicked) {
      isHovered = false;
      targetScale = 1;
      rotationSpeed = MathUtils.degToRad(30);
      (material as MeshStandardMaterial).color.setHex(originalColor);
      (material as MeshStandardMaterial).emissive.setHex(0x000000);
    }
  };

  cube.onClick = () => {
    isClicked = !isClicked;

    if (isClicked) {
      targetScale = 1.5;
      rotationSpeed = MathUtils.degToRad(120);
      (material as MeshStandardMaterial).color.setHex(clickColor);
      (material as MeshStandardMaterial).emissive.setHex(0x444444);
      // Add wireframe on click
      (material as MeshStandardMaterial).wireframe = true;
    } else {
      targetScale = isHovered ? 1.2 : 1;
      rotationSpeed = isHovered
        ? MathUtils.degToRad(60)
        : MathUtils.degToRad(30);
      (material as MeshStandardMaterial).color.setHex(
        isHovered ? hoverColor : originalColor
      );
      (material as MeshStandardMaterial).emissive.setHex(
        isHovered ? 0x222222 : 0x000000
      );
      (material as MeshStandardMaterial).wireframe = false;
    }
  };

  // Animation tick method
  cube.tick = (delta: number) => {
    // Smooth rotation
    cube.rotation.z += rotationSpeed * delta;
    cube.rotation.x += rotationSpeed * delta;
    cube.rotation.y += rotationSpeed * delta;

    // Smooth scaling animation
    currentScale = MathUtils.lerp(currentScale, targetScale, delta * 5);
    cube.scale.setScalar(currentScale);

    // Floating/bobbing animation when hovered or clicked
    if (isHovered || isClicked) {
      bobOffset += delta * 3;
      const bobAmount = isClicked ? 0.3 : 0.1;
      cube.position.y = originalY + Math.sin(bobOffset) * bobAmount;
    } else {
      bobOffset = 0;
      cube.position.y = MathUtils.lerp(cube.position.y, originalY, delta * 5);
    }

    // Pulsing effect when clicked
    if (isClicked) {
      const pulse = (Math.sin(bobOffset * 2) + 1) * 0.5;
      (material as MeshStandardMaterial).emissiveIntensity = pulse * 0.3;
    } else {
      (material as MeshStandardMaterial).emissiveIntensity = 0;
    }
  };

  return cube;
};
