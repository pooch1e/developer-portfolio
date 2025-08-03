import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class HeadshotThreeService {
  constructor() {
    this.camera = null;
    this.scene = null;
    this.renderer = null;
    this.loader = new GLTFLoader();
    this.canvas = null;
    this.model = null;
    this.lights = [];
    this.animationId = null;
    this.mixer = null;
    this.manualControl = false;

    // New properties for point cloud/wireframe
    this.renderMode = 'normal'; // 'normal', 'wireframe', 'pointcloud'
    this.pointCloudMaterial = null;
    this.wireframeMaterial = null;
    this.originalMaterials = new Map();
  }

  init(canvas, glbPath) {
    this.canvas = canvas;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Set up renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Set up camera
    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    this.camera.position.set(-0.3, 0, 4);

    // Create scene
    this.scene = new THREE.Scene();

    // Add lights
    this.addPortraitLights();

    // Create special materials
    this.createSpecialMaterials();

    // Load the GLB model
    this.loadModel(glbPath);

    // Handle resize
    window.addEventListener('resize', this.handleResize.bind(this));

    // Start animation loop
    this.runLoop();
  }

  createSpecialMaterials() {
    // Point cloud material
    this.pointCloudMaterial = new THREE.PointsMaterial({
      color: 0x00ff88,
      size: 0.02,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8,
      vertexColors: true, // This will use vertex colors if available
    });

    // Wireframe material
    this.wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
  }

  addPortraitLights() {
    // Key light
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(-2, 2, 3);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    this.scene.add(keyLight);
    this.lights.push(keyLight);

    // Fill light
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
    fillLight.position.set(2, 1, 2);
    this.scene.add(fillLight);
    this.lights.push(fillLight);

    // Rim light
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
    rimLight.position.set(0, 3, -2);
    this.scene.add(rimLight);
    this.lights.push(rimLight);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    this.scene.add(ambientLight);
    this.lights.push(ambientLight);
  }

  loadModel(glbPath) {
    this.loader.load(
      glbPath,
      (gltf) => {
        this.model = gltf.scene;

        // Scale and position
        this.model.scale.setScalar(5);
        this.model.position.set(0, -2.5, 0);

        // Store original materials and set up meshes
        this.model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            // Store original material
            this.originalMaterials.set(child, child.material);
          }
        });

        this.scene.add(this.model);

        // Set up animations
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

  // New method to switch render modes
  setRenderMode(mode) {
    if (!this.model) {
      console.warn('Model not loaded yet');
      return;
    }

    this.renderMode = mode;

    this.model.traverse((child) => {
      if (child.isMesh) {
        const geometry = child.geometry;
        const originalMaterial = this.originalMaterials.get(child);

        // Remove existing point cloud or wireframe objects
        const parent = child.parent;
        const objectsToRemove = [];
        parent.children.forEach((obj) => {
          if (
            obj.isPoints ||
            (obj.isMesh && obj !== child && obj.userData.isWireframe)
          ) {
            objectsToRemove.push(obj);
          }
        });
        objectsToRemove.forEach((obj) => parent.remove(obj));

        switch (mode) {
          case 'normal':
            child.material = originalMaterial;
            child.visible = true;
            break;

          case 'wireframe':
            child.material = this.wireframeMaterial.clone();
            child.visible = true;
            break;

          case 'pointcloud':
            // Hide the original mesh
            child.visible = false;

            // Create point cloud
            const points = new THREE.Points(
              geometry,
              this.pointCloudMaterial.clone()
            );
            points.position.copy(child.position);
            points.rotation.copy(child.rotation);
            points.scale.copy(child.scale);
            points.userData.isPointCloud = true;
            parent.add(points);
            break;

          case 'hybrid':
            // Show both wireframe and points
            child.material = this.wireframeMaterial.clone();
            child.material.opacity = 0.3;
            child.visible = true;

            const hybridPoints = new THREE.Points(
              geometry,
              this.pointCloudMaterial.clone()
            );
            hybridPoints.material.size = 0.01;
            hybridPoints.position.copy(child.position);
            hybridPoints.rotation.copy(child.rotation);
            hybridPoints.scale.copy(child.scale);
            hybridPoints.userData.isPointCloud = true;
            parent.add(hybridPoints);
            break;
        }
      }
    });
  }

  // Method to customize point cloud appearance
  setPointCloudStyle(options = {}) {
    const { color = 0x00ff88, size = 0.02, opacity = 0.8 } = options;

    if (this.pointCloudMaterial) {
      this.pointCloudMaterial.color.setHex(color);
      this.pointCloudMaterial.size = size;
      this.pointCloudMaterial.opacity = opacity;
    }

    // Update existing point clouds in the scene
    if (this.model) {
      this.model.traverse((child) => {
        if (child.isPoints) {
          child.material.color.setHex(color);
          child.material.size = size;
          child.material.opacity = opacity;
        }
      });
    }
  }

  // Method to customize wireframe appearance
  setWireframeStyle(options = {}) {
    const { color = 0x00ff88, opacity = 0.7 } = options;

    if (this.wireframeMaterial) {
      this.wireframeMaterial.color.setHex(color);
      this.wireframeMaterial.opacity = opacity;
    }

    // Update existing wireframes in the scene
    if (this.model && this.renderMode === 'wireframe') {
      this.model.traverse((child) => {
        if (child.isMesh && child.material.wireframe) {
          child.material.color.setHex(color);
          child.material.opacity = opacity;
        }
      });
    }
  }

  enableManualControl() {
    this.manualControl = true;
  }

  handleResize() {
    if (!this.canvas) return;

    const rect = this.canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  setManualRotation(rotationY) {
    if (this.model) {
      this.model.rotation.y = rotationY;
    }
  }

  runAnimation() {
    const time = performance.now() * 0.001;

    // Auto-rotate if not under manual control
    if (this.model && !this.manualControl) {
      this.model.rotation.y = Math.sin(time * 4) * 0.6;
    }

    // Update animations
    if (this.mixer) {
      this.mixer.update(0.016);
    }
  }

  runLoop() {
    this.animationId = requestAnimationFrame(this.runLoop.bind(this));
    this.runAnimation();
    this.renderer.render(this.scene, this.camera);
  }

  stopLoop() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  dispose() {
    this.stopLoop();

    if (this.renderer) {
      this.renderer.dispose();
    }

    if (this.model) {
      this.scene.remove(this.model);
    }

    // Clean up materials
    if (this.pointCloudMaterial) this.pointCloudMaterial.dispose();
    if (this.wireframeMaterial) this.wireframeMaterial.dispose();

    window.removeEventListener('resize', this.handleResize.bind(this));
  }
}
