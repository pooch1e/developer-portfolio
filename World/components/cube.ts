import { Mesh, MathUtils, ShaderMaterial, SphereGeometry, Color } from 'three';
import fragmentShader from '../../shaders/fragment.glsl';
import vertexShader from '../../shaders/vertex.glsl';

export interface TickableMesh extends Mesh {
  tick(delta: number): void;
  onHover?(): void;
  onClick?(): void;
  onMouseOut?(): void;
}

export const createCube = () => {
  const geometry = new SphereGeometry(1);
  // const material = new MeshStandardMaterial({
  //   color: 0x049ef4,
  //   metalness: 0.7,
  //   roughness: 0.3
  // });

  //testing custom shader
  const material = new ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
      uTime: { value: 0.0 },
      uColor: { value: new Color(0x049ef4) },
    },
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

  // Mouse interaction handlers
  cube.onHover = () => {
    if (!isHovered) {
      isHovered = true;
      targetScale = 1.2;
      rotationSpeed = MathUtils.degToRad(60);
    }
  };

  cube.onMouseOut = () => {
    if (isHovered && !isClicked) {
      isHovered = false;
      targetScale = 1;
      rotationSpeed = MathUtils.degToRad(30);
    }
  };

  cube.onClick = () => {
    isClicked = !isClicked;

    if (isClicked) {
      targetScale = 1.5;
      rotationSpeed = MathUtils.degToRad(120);

      // Add wireframe on click
    } else {
      targetScale = isHovered ? 1.2 : 1;
    }
  };

  // Animation tick method
  cube.tick = (delta: number) => {
    // update shader time uniform
    const shaderMat = cube.material as ShaderMaterial;
    if (shaderMat.uniforms.uTime) {
      shaderMat.uniforms.uTime.value += delta / 10; // accumulate time
    }
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
  };

  return cube;
};
