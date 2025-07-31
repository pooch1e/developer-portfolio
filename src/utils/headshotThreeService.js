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
      alpha: true, // Transparent background
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Set up camera - portrait orientation for headshot
    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    this.camera.position.set(-0.3, 0, 4);

    // Create scene
    this.scene = new THREE.Scene();

    // Add lights optimized for portrait
    this.addPortraitLights();

    // Load the GLB model
    this.loadModel(glbPath);

    // Handle resize
    window.addEventListener('resize', this.handleResize.bind(this));

    // Start animation loop
    this.runLoop();
  }

  addPortraitLights() {
    // Key light (main light from front-left)
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(-2, 2, 3);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    this.scene.add(keyLight);
    this.lights.push(keyLight);

    // Fill light (softer light from right)
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
    fillLight.position.set(2, 1, 2);
    this.scene.add(fillLight);
    this.lights.push(fillLight);

    // Rim light (from behind to create edge lighting)
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
    rimLight.position.set(0, 3, -2);
    this.scene.add(rimLight);
    this.lights.push(rimLight);

    // Ambient light for overall softness
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    this.scene.add(ambientLight);
    this.lights.push(ambientLight);
  }

  loadModel(glbPath) {
    this.loader.load(
      glbPath,
      (gltf) => {
        this.model = gltf.scene;

        // Scale and position the model appropriately for headshot
        this.model.scale.setScalar(5);
        this.model.position.set(0, -2.5, 0); // Adjust as needed

        // Enable shadows
        this.model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        this.scene.add(this.model);

        // Set up animations if they exist
        if (gltf.animations && gltf.animations.length > 0) {
          this.mixer = new THREE.AnimationMixer(this.model);
          // Play first animation (you can modify this logic)
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

    // Only auto-rotate if not under manual control
    if (this.model && !this.manualControl) {
      this.model.rotation.y = Math.sin(time * 4) * 0.6;
    }

    // animation follows mouse
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

    // Clean up resources
    if (this.renderer) {
      this.renderer.dispose();
    }

    if (this.model) {
      this.scene.remove(this.model);
    }

    // Remove event listeners
    window.removeEventListener('resize', this.handleResize.bind(this));
  }
}
