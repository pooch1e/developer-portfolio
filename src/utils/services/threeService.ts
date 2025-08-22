/*
commented out as refactored... will keep for now
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { AfterimagePass } from 'three/addons/postprocessing/AfterimagePass.js';
import { VertexNormalsHelper } from 'three/examples/jsm/Addons.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

export class ThreeService {
  // Core Three.js components
  public camera: THREE.OrthographicCamera | null = null;
  public scene: THREE.Scene | null = null;
  public renderer: THREE.WebGLRenderer | null = null;

  // Geometry and materials
  
  private geometry: THREE.BoxGeometry | null = null;
  private cubeGroup: THREE.Group | null = null;
  private solidCube: THREE.Mesh | null = null;
  private wireframeCube: THREE.LineSegments | null = null;
  private solidMaterial: THREE.MeshStandardMaterial | null = null;
  private lineMaterial: THREE.LineBasicMaterial | null = null;

  // Lighting
  private lights: THREE.Light[] = [];

  // Animation
  private animationId: number | null = null;

  // Theme and colors
  public currentIsDarkMode: boolean = false;
  private targetBackgroundColor: THREE.Color = new THREE.Color(0xffffff);
  private currentBackgroundColor: THREE.Color = new THREE.Color(0xffffff);
  private transitionSpeed: number = 0.05;

  // Post-processing
  private composer: EffectComposer | null = null;
  private afterImagePass: AfterimagePass | null = null;
  private unrealBloomPass: UnrealBloomPass | null = null;
  private params = { enable: true };

  public init(canvas: HTMLCanvasElement, isDarkMode: boolean): void {
    this.canvas = canvas;
    this.currentIsDarkMode = isDarkMode;

    this.initRenderer(canvas, isDarkMode);
    this.initCamera();
    this.initScene();
    this.setupEventListeners();
    this.createGeometry();
    this.createCube();
    this.setupLighting();
    this.setupPostProcessing();
    this.startAnimationLoop();
  }

  private initRenderer(canvas: HTMLCanvasElement, isDarkMode: boolean): void {
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: false,
      antialias: true,
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // Set initial background colors
    const initialColor = isDarkMode ? 0x3f3f46 : 0xffffff;
    this.currentBackgroundColor.setHex(initialColor);
    this.targetBackgroundColor.setHex(initialColor);
    this.renderer.setClearColor(this.currentBackgroundColor, 1);
  }

  private initCamera(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / height;
    const zoom = 1;

    this.camera = new THREE.OrthographicCamera(
      -aspect * zoom,
      aspect * zoom,
      zoom,
      -zoom,
      0.1,
      1000
    );

    this.camera.position.z = 2;
  }

  private initScene(): void {
    this.scene = new THREE.Scene();
  }

  private setupEventListeners(): void {
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  private createGeometry(): void {
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
  }

  private createCube(): void {
    if (!this.geometry || !this.scene) return;

    // Create group to hold both solid and wireframe
    this.cubeGroup = new THREE.Group();

    // Get theme-appropriate color
    const materialColor = this.getMaterialColor();

    // Create solid cube with higher opacity for light mode
    const solidOpacity = this.currentIsDarkMode ? 0.2 : 0.6;
    this.solidMaterial = new THREE.MeshStandardMaterial({
      color: materialColor,
      opacity: solidOpacity,
      transparent: true,
      emissive: new THREE.Color(materialColor),
      emissiveIntensity: this.currentIsDarkMode ? 0.1 : 0.3,
    });
    this.solidCube = new THREE.Mesh(this.geometry, this.solidMaterial);

    // Create wireframe lines using EdgesGeometry for clean edges
    const edges = new THREE.EdgesGeometry(this.geometry);
    this.lineMaterial = new THREE.LineBasicMaterial({
      color: materialColor,
    });
    this.wireframeCube = new THREE.LineSegments(edges, this.lineMaterial);

    //create normals helper
    const helper = new VertexNormalsHelper(this.solidCube, 0.5, 0xff0000);

    // Add both to group
    this.cubeGroup.add(this.solidCube);

    this.cubeGroup.add(helper);
    this.cubeGroup.add(this.wireframeCube);

    // Add group to scene
    this.scene.add(this.cubeGroup);
  }

  private getMaterialColor(): number {
    return this.currentIsDarkMode ? 0x00ffcc : 0x0066ff; // Cyan for dark, bright blue for light
  }

  private setupLighting(): void {
    if (!this.scene) return;

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 3);
    this.scene.add(ambientLight);
    this.lights.push(ambientLight);

    // Directional light
    const directionalLight = new THREE.DirectionalLight(0x404040, 2);
    this.scene.add(directionalLight);
    this.lights.push(directionalLight);
  }

  private setupPostProcessing(): void {
    if (!this.renderer || !this.scene || !this.camera) return;

    this.composer = new EffectComposer(this.renderer);

    // Render pass
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);

    // Afterimage effect
    this.afterImagePass = new AfterimagePass();
    this.composer.addPass(this.afterImagePass);

    this.unrealBloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.1,
      0.1,
      0.1
    );


    // Output pass
    const outputPass = new OutputPass();
    this.composer.addPass(outputPass);
    this.composer.addPass(this.unrealBloomPass)
  }

  private startAnimationLoop(): void {
    this.runLoop();
  }

  public handleResize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (this.camera) {
      const aspect = width / height;
      const zoom = 1;

      this.camera.left = -aspect * zoom;
      this.camera.right = aspect * zoom;
      this.camera.top = zoom;
      this.camera.bottom = -zoom;

      this.camera.updateProjectionMatrix();
    }

    if (this.renderer) {
      this.renderer.setSize(width, height);
    }

    if (this.composer) {
      this.composer.setSize(width, height);
    }
  }

  private updateAnimation(): void {
    const time = performance.now() * 0.001;

    // Rotate the cube group
    if (this.cubeGroup) {
      this.cubeGroup.rotation.x += 0.01;
      this.cubeGroup.rotation.y += 0.01;
    }

    // Orbital camera movement
    if (this.camera) {
      const radius = 3;
      const speed = 0.5;

      this.camera.position.x = Math.sin(time * speed) * radius;
      this.camera.position.z = Math.cos(time * speed) * radius;
      this.camera.position.y = 1.5;
      this.camera.lookAt(0, 0, 0);
    }
  }

  private updateThemeTransition(): void {
    // Smoothly interpolate background color
    this.currentBackgroundColor.lerp(
      this.targetBackgroundColor,
      this.transitionSpeed
    );

    if (this.renderer) {
      this.renderer.setClearColor(this.currentBackgroundColor, 1);
    }
  }

  private updatePostProcessing(): void {
    if (this.afterImagePass) {
      // Adjust afterimage damping based on theme for better visibility
      // More aggressive damping in light mode to make trails more visible
      this.afterImagePass.uniforms.damp.value = this.currentIsDarkMode
        ? 0.96
        : 0.92;
      this.afterImagePass.enabled = this.params.enable;
    }
  }

  public runLoop(): void {
    this.animationId = requestAnimationFrame(this.runLoop.bind(this));

    this.updateAnimation();
    this.updateThemeTransition();
    this.updatePostProcessing();

    if (this.composer) {
      this.composer.render();
    }
  }

  public setBackgroundColor(isDarkMode: boolean): void {
    console.log('Theme changed to:', isDarkMode ? 'dark' : 'light');
    this.currentIsDarkMode = isDarkMode;

    // Set target background color for smooth transition
    const targetColor = isDarkMode ? 0x3f3f46 : 0xffffff;
    this.targetBackgroundColor.setHex(targetColor);

    // Update cube materials
    this.updateMaterialForTheme();
  }

  private updateMaterialForTheme(): void {
    const materialColor = this.getMaterialColor();
    const solidOpacity = this.currentIsDarkMode ? 0.2 : 0.6;
    const emissiveIntensity = this.currentIsDarkMode ? 0.1 : 0.3;

    if (this.solidMaterial) {
      this.solidMaterial.color.setHex(materialColor);
      this.solidMaterial.opacity = solidOpacity;
      this.solidMaterial.emissive.setHex(materialColor);
      this.solidMaterial.emissiveIntensity = emissiveIntensity;
      this.solidMaterial.needsUpdate = true;
    }

    if (this.lineMaterial) {
      this.lineMaterial.color.setHex(materialColor);
      this.lineMaterial.needsUpdate = true;
    }
  }

  public forceRender(): void {
    if (this.composer) {
      this.composer.render();
    }
  }

  public stopLoop(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  public dispose(): void {
    this.stopLoop();

    // Remove event listeners
    window.removeEventListener('resize', this.handleResize.bind(this));

    // Dispose of materials
    if (this.solidMaterial) {
      this.solidMaterial.dispose();
    }

    if (this.lineMaterial) {
      this.lineMaterial.dispose();
    }

    // Dispose of geometry
    if (this.geometry) {
      this.geometry.dispose();
    }

    // Dispose of renderer
    if (this.renderer) {
      this.renderer.dispose();
    }

    // Dispose of composer
    if (this.composer) {
      this.composer.dispose();
    }

    // Clear scene
    if (this.scene) {
      this.scene.clear();
    }
  }
}*/
