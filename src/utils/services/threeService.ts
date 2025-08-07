import * as THREE from 'three';
import { VertexNormalsHelper } from 'three/addons/helpers/VertexNormalsHelper.js';
import { VertexTangentsHelper } from 'three/addons/helpers/VertexTangentsHelper.js';
import { BoxHelper } from 'three';

export class ThreeService {
  public camera: THREE.OrthographicCamera | null = null;
  public scene: THREE.Scene | null = null;
  public renderer: THREE.WebGLRenderer | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private geometry: THREE.BoxGeometry | null = null;
  private mesh: THREE.Mesh | null = null;
  private material: THREE.Material | null = null;
  private lights: THREE.Light[] = [];
  private animationId: number | null = null;
  public currentIsDarkMode: boolean = false;
  //transition colours
  private targetBackgroundColor: THREE.Color = new THREE.Color(0xffffff);
  private currentBackgroundColor: THREE.Color = new THREE.Color(0xffffff);
  private transitionSpeed: number = 0.05; // Adjust for faster/slower transition

  // Custom shader attempt
  private customGlitchShader: THREE.ShaderMaterial | null = null;

  public init(canvas: HTMLCanvasElement, isDarkMode: boolean): void {
    this.canvas = canvas;
    this.currentIsDarkMode = isDarkMode;
    const width: number = window.innerWidth;
    const height: number = window.innerHeight;

    // Set viewport
    // Set viewport
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: false,
      antialias: true,
    });
    this.setBackgroundColor(isDarkMode); // Use the method we already have
    this.renderer.setSize(width, height);

    this.currentIsDarkMode = isDarkMode;

    // Set initial colors
    const initialColor = isDarkMode ? 0x3f3f46 : 0xffffff;
    this.currentBackgroundColor.setHex(initialColor);
    this.targetBackgroundColor.setHex(initialColor);

    // Add camera
    this.camera = this.addCamera(width, height);
    this.camera.position.z = 2;

    // Create scene
    this.scene = new THREE.Scene();

    // Handle sizing
    window.addEventListener('resize', this.handleResize.bind(this));

    // Create geometry
    this.geometry = this.addGeometry();

    // Create material
    // this.addCustomShader();
    // this.material = this.customGlitchShader;

    // Create mesh
    this.mesh = this.addMesh(this.geometry, this.material!);
    this.scene.add(this.mesh);
    this.addDebugHelpers(this.mesh);

    // Add lights
    this.addLights();

    // Animation loop
    this.runLoop();
  }

  private addCamera(width: number, height: number): THREE.OrthographicCamera {
    const aspect: number = width / height;
    const zoom: number = 1; // Lower = more zoomed out
    this.camera = new THREE.OrthographicCamera(
      -aspect * zoom,
      aspect * zoom,
      zoom,
      -zoom,
      0.1,
      1000
    );
    return this.camera;
  }

  private addLights(): THREE.Light[] {
    const ambientLight: THREE.AmbientLight = new THREE.AmbientLight(
      0x404040,
      3
    );
    this.scene!.add(ambientLight);
    this.lights.push(ambientLight);

    const directionalLight: THREE.DirectionalLight = new THREE.DirectionalLight(
      0x404040,
      2
    );
    this.scene!.add(directionalLight);
    this.lights.push(directionalLight);
    return this.lights;
  }

  private addGeometry(): THREE.BoxGeometry {
    const box: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
    return box;
  }

  // private addMaterial(): THREE.MeshPhongMaterial {
  //   const material: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
  //     color: 'white',
  //   });
  //   material.shininess = 80;
  //   return material;
  // }

  private addDebugHelpers(mesh: THREE.Mesh): void {
    // Recompute tangents if needed (optional, only for loaded geometry)
    if (
      'computeTangents' in mesh.geometry &&
      typeof mesh.geometry.computeTangents === 'function'
    ) {
      try {
        mesh.geometry.computeTangents();
      } catch (err) {
        console.warn('computeTangents failed:', err);
      }
    }

    // Create a group to scale and position debug helpers
    const group: THREE.Group = new THREE.Group();
    group.scale.multiplyScalar(1); // Adjust as needed
    this.scene!.add(group);

    group.add(mesh);

    // Update matrices
    group.updateMatrixWorld(true);

    // Normals Helper
    const vnh: VertexNormalsHelper = new VertexNormalsHelper(
      mesh,
      0.1,
      0x00ff00
    );
    this.scene!.add(vnh);

    // Tangents Helper
    const vth: VertexTangentsHelper = new VertexTangentsHelper(
      mesh,
      0.1,
      0xff0000
    );
    this.scene!.add(vth);

    // Box Helper
    const boxHelper: BoxHelper = new THREE.BoxHelper(mesh);
    this.scene!.add(boxHelper);

    // Wireframe
    // const wireframe: WireframeGeometry = new WireframeGeometry(mesh.geometry);
    // const wireLine: LineSegments = new LineSegments(wireframe);
    // wireLine.material.depthTest = false;
    // wireLine.material.opacity = 0.25;
    // wireLine.material.transparent = true;
    // wireLine.position.x = 1.5;
    // group.add(wireLine);
    // this.scene!.add(new THREE.BoxHelper(wireLine));

    // Edges
    // const edges: EdgesGeometry = new EdgesGeometry(mesh.geometry);
    // const edgeLine: LineSegments = new LineSegments(edges);
    // edgeLine.material.depthTest = false;
    // edgeLine.material.opacity = 0.25;
    // edgeLine.material.transparent = true;
    // edgeLine.position.x = -1.5;
    // group.add(edgeLine);
    // this.scene!.add(new THREE.BoxHelper(edgeLine));

    // Group box
    this.scene!.add(new THREE.BoxHelper(group));
  }

  private addMesh(
    geometry: THREE.BufferGeometry
    // material: THREE.Material
  ): THREE.Mesh {
    const flatMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffcc,
      wireframe: true,
    });
    const cube: THREE.Mesh = new THREE.Mesh(geometry, flatMaterial);
    return cube;
  }

  public handleResize(): void {
    const width: number = window.innerWidth;
    const height: number = window.innerHeight;

    if (this.camera) {
      // For orthographic camera, we need to update the frustum
      const aspect: number = width / height;
      const zoom: number = 1;

      this.camera.left = -aspect * zoom;
      this.camera.right = aspect * zoom;
      this.camera.top = zoom;
      this.camera.bottom = -zoom;

      this.camera.updateProjectionMatrix();
    }

    if (this.renderer) {
      this.renderer.setSize(width, height);
    }

    // // Update shader resolution uniform
    // if (this.customGlitchShader) {
    //   this.customGlitchShader.uniforms.resolution.value.set(width, height);
    // }
  }

  private runAnimation(): void {
    if (this.mesh) {
      this.mesh.rotation.x += 0.01;
      this.mesh.rotation.y += 0.01;
    }

    const time: number = performance.now() * 0.001; // time in seconds
    const radius: number = 3; // distance from target
    const speed: number = 0.5; // how fast to orbit

    // === Orbital Camera Movement ===
    if (this.camera) {
      this.camera.position.x = Math.sin(time * speed) * radius;
      this.camera.position.z = Math.cos(time * speed) * radius;
      this.camera.position.y = 1.5; // optional: some height
      this.camera.lookAt(0, 0, 0); // look at the centre of the scene
    }

    // === UPDATE UNIFORMS ===
    const t: number = performance.now() * 0.001;
    if (this.customGlitchShader) {
      this.customGlitchShader.uniforms.time.value = t;
    }

    // Optional: add live mouse movement
    if (this.canvas && this.customGlitchShader) {
      this.canvas.addEventListener('mousemove', (e: MouseEvent) => {
        this.customGlitchShader!.uniforms.mouse.value.set(
          e.clientX / window.innerWidth,
          1 - e.clientY / window.innerHeight // Flip Y for gl-style coords
        );
      });
    }
  }

  public setBackgroundColor(isDarkMode: boolean): void {
    console.log('setBackgroundColor called with:', isDarkMode);
    this.currentIsDarkMode = isDarkMode;

    // Set the target color instead of immediately changing
    const targetColor = isDarkMode ? 0x3f3f46 : 0xffffff;
    this.targetBackgroundColor.setHex(targetColor);
  }

  public forceRender(): void {
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  public runLoop(): void {
    this.animationId = requestAnimationFrame(this.runLoop.bind(this));

    // Smoothly interpolate background color
    this.currentBackgroundColor.lerp(
      this.targetBackgroundColor,
      this.transitionSpeed
    );

    if (this.renderer) {
      this.renderer.setClearColor(this.currentBackgroundColor, 1);
    }

    // Then render scene
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }

    this.runAnimation();
  }

  public stopLoop(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  public dispose(): void {
    this.stopLoop();

    if (this.renderer) {
      this.renderer.dispose();
    }

    if (this.geometry) {
      this.geometry.dispose();
    }

    if (this.material) {
      this.material.dispose();
    }

    if (this.customGlitchShader) {
      this.customGlitchShader.dispose();
    }
  }
}
