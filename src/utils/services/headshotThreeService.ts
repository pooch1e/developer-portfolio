import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

type RenderMode = 'normal' | 'wireframe' | 'pointcloud' | 'hybrid';

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
              this.pointCloudMaterial!.clone()
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
              this.pointCloudMaterial!.clone()
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
    this.model && this.scene?.remove(this.model);

    this.pointCloudMaterial?.dispose();
    this.wireframeMaterial?.dispose();

    window.removeEventListener('resize', this.handleResize.bind(this));
  }
}
