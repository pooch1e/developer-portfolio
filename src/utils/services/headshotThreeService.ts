import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

type RenderMode = 'normal' | 'wireframe' | 'pointcloud' | 'hybrid';

const SWARM_ENTER_SECONDS = 0.9;
const SWARM_EXIT_SECONDS = 0.6;
const SWARM_FOLLOW_RATE = 10;

/**
 * Patched into PointsMaterial's vertex shader after projection. Works in NDC so
 * the cursor maps straight onto the canvas regardless of model rotation. Each
 * point gets a stable random seed from its position: the seed staggers its
 * start, picks a burst direction, and sets its slot in the cloud around the
 * cursor.
 */
const SWARM_HEADER = /* glsl */ `
uniform vec2 uMouse;
uniform float uSwarm;
float swarmHash(vec3 p) {
  return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453);
}
`;

const SWARM_VERTEX = /* glsl */ `
{
  float seed = swarmHash(position);
  float angle = swarmHash(position + 1.7) * 6.28318;
  vec2 dir = vec2(cos(angle), sin(angle));
  float p = clamp((uSwarm - seed * 0.3) / 0.7, 0.0, 1.0);
  float burst = sin(p * 3.14159) * (0.3 + seed * 0.7);
  vec2 target = uMouse + dir * sqrt(seed) * 0.22;
  vec2 ndc = gl_Position.xy / gl_Position.w;
  ndc = mix(ndc, target, smoothstep(0.35, 1.0, p)) + dir * burst;
  gl_Position.xy = ndc * gl_Position.w;
}
`;

export class HeadshotThreeService {
  camera: THREE.PerspectiveCamera | null = null;
  scene: THREE.Scene | null = null;
  renderer: THREE.WebGLRenderer | null = null;
  loader: GLTFLoader;
  canvas: HTMLCanvasElement | null = null;
  model: THREE.Object3D | null = null;
  lights: THREE.Light[] = [];
  animationId: number | null = null;
  mixer: THREE.AnimationMixer | null = null;
  manualControl: boolean = false;

  renderMode: RenderMode = 'normal';
  isDarkMode: boolean = false;
  clock = new THREE.Clock();
  swarmActive: boolean = false;
  swarmPointer = new THREE.Vector2();
  swarmUniforms = {
    uMouse: { value: new THREE.Vector2() },
    uSwarm: { value: 0 },
  };
  pointCloudMaterial: THREE.PointsMaterial | null = null;
  wireframeMaterial: THREE.MeshBasicMaterial | null = null;
  originalMaterials: Map<THREE.Mesh, THREE.Material | THREE.Material[]> =
    new Map();

  constructor() {
    this.loader = new GLTFLoader();
  }

  init(canvas: HTMLCanvasElement, glbPath: string): void {
    this.canvas = canvas;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    this.camera.position.set(-0.3, 0, 4);

    this.scene = new THREE.Scene();

    this.addPortraitLights();
    this.createSpecialMaterials();
    this.loadModel(glbPath);

    window.addEventListener('resize', this.handleResize.bind(this));
    this.runLoop();
  }

  createSpecialMaterials(): void {
    this.pointCloudMaterial = new THREE.PointsMaterial({
      color: 0x00ff88,
      size: 0.02,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8,
      vertexColors: true,
    });
    this.applyPointTheme(this.pointCloudMaterial);

    this.wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
  }

  addPortraitLights(): void {
    if (!this.scene) return;

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(-2, 2, 3);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(2048, 2048);
    this.scene.add(keyLight);
    this.lights.push(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
    fillLight.position.set(2, 1, 2);
    this.scene.add(fillLight);
    this.lights.push(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
    rimLight.position.set(0, 3, -2);
    this.scene.add(rimLight);
    this.lights.push(rimLight);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    this.scene.add(ambientLight);
    this.lights.push(ambientLight);
  }

  loadModel(glbPath: string): void {
    if (!this.scene) return;

    this.loader.load(
      glbPath,
      (gltf) => {
        this.model = gltf.scene;
        this.model.scale.setScalar(5);
        this.model.position.set(0, -2.5, 0);

        this.model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            this.originalMaterials.set(mesh, mesh.material);
          }
        });

        this.scene!.add(this.model);

        if (gltf.animations && gltf.animations.length > 0) {
          this.mixer = new THREE.AnimationMixer(this.model);
          const action = this.mixer.clipAction(gltf.animations[0]);
          action.play();
        }

        console.log('Model loaded successfully');
      },
      (progress) => {
        console.log(
          'Loading progress:',
          (progress.loaded / progress.total) * 100 + '%'
        );
      },
      (error) => {
        console.error('Error loading model:', error);
      }
    );
  }

  setRenderMode(mode: RenderMode): void {
    if (!this.model) {
      console.warn('Model not loaded yet');
      return;
    }

    this.renderMode = mode;

    this.model.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const geometry = mesh.geometry;
        const parent = mesh.parent!;
        const originalMaterial = this.originalMaterials.get(mesh);

        const objectsToRemove: THREE.Object3D[] = [];
        parent.children.forEach((obj) => {
          if (
            obj instanceof THREE.Points ||
            (obj instanceof THREE.Mesh &&
              obj !== mesh &&
              obj.userData.isWireframe)
          ) {
            objectsToRemove.push(obj);
          }
        });
        objectsToRemove.forEach((obj) => parent.remove(obj));

        switch (mode) {
          case 'normal':
            mesh.material = originalMaterial!;
            mesh.visible = true;
            break;

          case 'wireframe':
            mesh.material = this.wireframeMaterial!.clone();
            mesh.visible = true;
            break;

          case 'pointcloud':
            mesh.visible = false;
            const points = new THREE.Points(
              geometry,
              this.addSwarm(this.pointCloudMaterial!.clone())
            );
            points.position.copy(mesh.position);
            points.rotation.copy(mesh.rotation);
            points.scale.copy(mesh.scale);
            points.userData.isPointCloud = true;
            parent.add(points);
            break;

          case 'hybrid':
            mesh.material = this.wireframeMaterial!.clone();
            mesh.material.opacity = 0.3;
            mesh.visible = true;

            const hybridPoints = new THREE.Points(
              geometry,
              this.addSwarm(this.pointCloudMaterial!.clone())
            );
            hybridPoints.material.size = 0.01;
            hybridPoints.position.copy(mesh.position);
            hybridPoints.rotation.copy(mesh.rotation);
            hybridPoints.scale.copy(mesh.scale);
            hybridPoints.userData.isPointCloud = true;
            parent.add(hybridPoints);
            break;
        }
      }
    });
  }

  setPointCloudStyle(
    options: { color?: number; size?: number; opacity?: number } = {}
  ): void {
    const { color = 0x00ff88, size = 0.02, opacity = 0.8 } = options;

    if (this.pointCloudMaterial) {
      this.pointCloudMaterial.color.setHex(color);
      this.pointCloudMaterial.size = size;
      this.pointCloudMaterial.opacity = opacity;
    }

    if (this.model) {
      this.model.traverse((child) => {
        if ((child as THREE.Points).isPoints) {
          const points = child as THREE.Points;
          const mat = points.material as THREE.PointsMaterial;
          mat.color.setHex(color);
          mat.size = size;
          mat.opacity = opacity;
        }
      });
    }
  }

  /**
   * The scan's vertex colours are dark and multiply with the material colour,
   * so dark mode drops them entirely and renders the points flat white.
   */
  applyPointTheme(mat: THREE.PointsMaterial): void {
    mat.vertexColors = !this.isDarkMode;
    mat.color.setHex(this.isDarkMode ? 0xffffff : 0x00ff88);
    mat.needsUpdate = true;
  }

  /**
   * Material.clone() doesn't carry onBeforeCompile, so every Points material
   * is patched individually; they all share one uniforms object.
   */
  addSwarm(mat: THREE.PointsMaterial): THREE.PointsMaterial {
    mat.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, this.swarmUniforms);
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', `#include <common>\n${SWARM_HEADER}`)
        .replace('#include <project_vertex>', `#include <project_vertex>\n${SWARM_VERTEX}`);
    };
    return mat;
  }

  /** Pointer in NDC: -1..1 on both axes, y up. */
  setSwarmPointer(x: number, y: number): void {
    this.swarmPointer.set(x, y);
  }

  setSwarmActive(active: boolean): void {
    if (active && !this.swarmActive) {
      this.swarmUniforms.uMouse.value.copy(this.swarmPointer);
    }
    this.swarmActive = active;
  }

  updateSwarm(delta: number): void {
    const swarm = this.swarmUniforms.uSwarm;
    const step = delta / (this.swarmActive ? SWARM_ENTER_SECONDS : SWARM_EXIT_SECONDS);
    swarm.value = THREE.MathUtils.clamp(swarm.value + (this.swarmActive ? step : -step), 0, 1);

    this.swarmUniforms.uMouse.value.lerp(
      this.swarmPointer,
      1 - Math.exp(-delta * SWARM_FOLLOW_RATE)
    );
  }

  setDarkMode(isDark: boolean): void {
    this.isDarkMode = isDark;

    if (this.pointCloudMaterial) {
      this.applyPointTheme(this.pointCloudMaterial);
    }

    this.model?.traverse((child) => {
      if ((child as THREE.Points).isPoints) {
        this.applyPointTheme((child as THREE.Points).material as THREE.PointsMaterial);
      }
    });
  }

  setWireframeStyle(options: { color?: number; opacity?: number } = {}): void {
    const { color = 0x00ff88, opacity = 0.7 } = options;

    if (this.wireframeMaterial) {
      this.wireframeMaterial.color.setHex(color);
      this.wireframeMaterial.opacity = opacity;
    }

    if (this.model && this.renderMode === 'wireframe') {
      this.model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;

          const materials = Array.isArray(mesh.material)
            ? mesh.material
            : [mesh.material];

          materials.forEach((mat) => {
            if (
              (mat as THREE.MeshBasicMaterial).wireframe !== undefined &&
              (mat as THREE.MeshBasicMaterial).wireframe
            ) {
              const m = mat as THREE.MeshBasicMaterial;
              m.color.setHex(color);
              m.opacity = opacity;
            }
          });
        }
      });
    }
  }

  enableManualControl(): void {
    this.manualControl = true;
  }

  handleResize(): void {
    if (!this.canvas || !this.renderer || !this.camera) return;

    const rect = this.canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  setManualRotation(rotationY: number): void {
    if (this.model) {
      this.model.rotation.y = rotationY;
    }
  }

  runAnimation(): void {
    const time = performance.now() * 0.001;
    this.updateSwarm(Math.min(this.clock.getDelta(), 0.1));

    if (this.model && !this.manualControl) {
      this.model.rotation.y = Math.sin(time * 4) * 0.6;
    }

    if (this.mixer) {
      this.mixer.update(0.016);
    }
  }

  runLoop(): void {
    this.animationId = requestAnimationFrame(this.runLoop.bind(this));
    this.runAnimation();
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  stopLoop(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  dispose(): void {
    this.stopLoop();

    this.renderer?.dispose();
    this.renderer = null;
    this.model && this.scene?.remove(this.model);

    this.pointCloudMaterial?.dispose();
    this.wireframeMaterial?.dispose();

    window.removeEventListener('resize', this.handleResize.bind(this));
  }
}
