import {
  Mesh,
  MathUtils,
  ShaderMaterial,
  SphereGeometry,
  TextureLoader,
} from 'three';
import fragmentShader from '../../shaders/texture/fragment.glsl';
import vertexShader from '../../shaders/texture/vertex.glsl';
import grainTexture from '../../src/assets/textures/grain.webp';

export interface TickableMesh extends Mesh {
  tick(delta: number): void;
  onHover?(): void;
  onClick?(): void;
  onMouseOut?(): void;
}

export const createCube = () => {
  const geometry = new SphereGeometry(8, 64, 64);
  // const material = new MeshStandardMaterial({
  //   color: 0x049ef4,
  //   metalness: 0.7,
  //   roughness: 0.3
  // });

  // Load grain texture
  const textureLoader = new TextureLoader();
  const texture = textureLoader.load(grainTexture);

  // Texture shader with sweeping light
  const material = new ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
      uTime: { value: 0.0 },
      uTexture: { value: texture },
    },
    transparent: true,
    depthWrite: false, // Helps with transparency sorting
  });

  const cube = new Mesh(geometry, material) as unknown as Mesh & TickableMesh;
  cube.rotation.set(-0.5, -0.1, 0.8);
  cube.position.y = -1;

  // Interactive state
  let isHovered = false;
  let isClicked = false;
  let rotationSpeed = MathUtils.degToRad(5); // Gentle rotation
  let targetScale = 1;
  let currentScale = 1;
  let bobOffset = 0;
  const originalY = cube.position.y;

  // Mouse interaction handlers
  cube.onHover = () => {
    if (!isHovered) {
      isHovered = true;
      rotationSpeed = MathUtils.degToRad(8); // Slightly faster on hover
    }
  };

  cube.onMouseOut = () => {
    if (isHovered && !isClicked) {
      isHovered = false;
      rotationSpeed = MathUtils.degToRad(5);
    }
  };

  cube.onClick = () => {
    isClicked = !isClicked;

    if (isClicked) {
      rotationSpeed = MathUtils.degToRad(10); // Faster on click
    } else {
      rotationSpeed = isHovered ? MathUtils.degToRad(8) : MathUtils.degToRad(5);
    }
  };

  // Animation tick method
  cube.tick = (delta: number) => {
    // update shader time uniform
    const shaderMat = cube.material as ShaderMaterial;
    if (shaderMat.uniforms.uTime) {
      shaderMat.uniforms.uTime.value += delta / 20; // Moderate light sweep
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
