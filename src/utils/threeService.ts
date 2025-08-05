import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { VertexNormalsHelper } from 'three/addons/helpers/VertexNormalsHelper.js';
import { VertexTangentsHelper } from 'three/addons/helpers/VertexTangentsHelper.js';
import {
  BoxHelper,
  EdgesGeometry,
  WireframeGeometry,
  LineSegments,
} from 'three';

export class ThreeService {
  public camera: THREE.OrthographicCamera | null = null;
  public scene: THREE.Scene | null = null;
  public renderer: THREE.WebGLRenderer | null = null;
  private loader: GLTFLoader = new GLTFLoader();
  private canvas: HTMLCanvasElement | null = null;
  private geometry: THREE.BoxGeometry | null = null;
  private mesh: THREE.Mesh | null = null;
  private material: THREE.Material | null = null;
  private lights: THREE.Light[] = [];
  private animationId: number | null = null;

  // Custom shader attempt
  private customGlitchShader: THREE.ShaderMaterial | null = null;

  public init(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    console.log(this.canvas, 'canvas in class');
    const width: number = window.innerWidth;
    const height: number = window.innerHeight;

    // Set viewport
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    this.renderer.setSize(width, height);

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
    this.addCustomShader();
    this.material = this.customGlitchShader;

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

  private addMaterial(): THREE.MeshPhongMaterial {
    const material: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
      color: 'white',
    });
    material.shininess = 80;
    return material;
  }

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
    geometry: THREE.BufferGeometry,
    material: THREE.Material
  ): THREE.Mesh {
    const flatMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffcc,
      wireframe: true,
      flatShading: true,
    });
    const cube: THREE.Mesh = new THREE.Mesh(geometry, flatMaterial);
    return cube;
  }

  private addCustomShader(): void {
    this.customGlitchShader = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        glitchIntensity: { value: 1 }, // Set to 1 to see effects!
        resolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        mouse: { value: new THREE.Vector2(0.5, 0.5) }, // Initial neutral value
      },
      vertexShader: `
        uniform float time;
        uniform float glitchIntensity;
        uniform vec2 mouse;
        
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec2 vUv;
        
        // Noise function
        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }
        
        void main() {
          vPosition = position;
          vNormal = normal;
          vUv = uv;
          
          vec3 pos = position;
          
          // Glitch displacement
          float glitch = random(vec2(time * 0.1, pos.y * 10.0)) * glitchIntensity;
          pos.x += sin(time * 2.0 + pos.y * 5.0) * glitch * 0.1;
          pos.y += cos(time * 3.0 + pos.x * 8.0) * glitch * 0.1;
          pos.z += sin(time * 1.5 + pos.x * pos.y) * glitch * 0.05;
          
          // Mouse interaction
          vec2 mouseInfluence = mouse * 2.0 - 1.0;
          pos.xy += mouseInfluence * 0.1 * sin(time);
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `uniform float time;
uniform float glitchIntensity;
uniform vec2 resolution;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

// Noise function
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

// HSV to RGB conversion
vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
  vec2 st = gl_FragCoord.xy / resolution.xy;

  // --- CRT screen curvature distortion ---
  vec2 uv = (st - 0.5) * 2.0;
  uv *= 1.1 + 0.2 * uv.yx * uv.yx;
  st = (uv * 0.5) + 0.5;

  // --- Base colour cycling ---
  float hue = time * 0.1 + vPosition.x * 0.5 + vPosition.y * 0.3;
  vec3 baseColor = hsv2rgb(vec3(fract(hue), 0.8, 0.9));

  // --- Color banding (quantisation) ---
  baseColor = floor(baseColor * 6.0) / 6.0;

  // --- RGB split/glitch ---
  float offset = 0.003 * glitchIntensity;
  float r = baseColor.r;
  float g = hsv2rgb(vec3(fract(hue + offset), 0.8, 0.9)).g;
  float b = hsv2rgb(vec3(fract(hue - offset), 0.8, 0.9)).b;

  vec3 finalColor = vec3(r, g, b);

  // --- Digital noise ---
  float noise = random(st + time) * 0.05 * glitchIntensity;
  finalColor += noise;

  // --- Scanlines ---
  float scanline = sin(st.y * 800.0) * 0.2 * glitchIntensity;
  finalColor -= scanline;

  // --- Vignette ---
  float dist = distance(st, vec2(0.5));
  finalColor *= smoothstep(0.8, 0.4, dist);

  // --- Fresnel effect ---
  float fresnel = pow(1.0 - dot(normalize(vNormal), vec3(0, 0, 1.0)), 2.0);
  finalColor += fresnel * 0.3;

  gl_FragColor = vec4(finalColor, 1.0);
}
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });
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

    // Update shader resolution uniform
    if (this.customGlitchShader) {
      this.customGlitchShader.uniforms.resolution.value.set(width, height);
    }
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

  public runLoop(): void {
    this.animationId = requestAnimationFrame(this.runLoop.bind(this));

    // Update animation state
    this.runAnimation();

    // Render updated scene
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
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
