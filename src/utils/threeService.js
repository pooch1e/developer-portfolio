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
  constructor() {
    this.camera = null;
    this.scene = null;
    this.renderer = null;
    this.loader = new GLTFLoader();
    this.canvas = null;
    this.geometry = null;
    this.mesh = null;
    this.material = null;
    this.lights = [];
    this.animationId = null;

    //custom shader attempt
    this.customGlitchShader = null;
  }

  init(canvas) {
    this.canvas = canvas;
    console.log(this.canvas, 'canvas in class');
    const width = window.innerWidth;
    const height = window.innerHeight;
    // set viewport
    this.renderer = new THREE.WebGLRenderer({ canvas });

    this.renderer.setSize(width, height);

    // add camera
    this.camera = this.addCamera(width, height);
    this.camera.position.z = 2;

    // create scene
    this.scene = new THREE.Scene();
    // handle sizing
    window.addEventListener('resize', this.handleResize.bind(this));

    // create geometry
    this.geometry = this.addGeometry();

    //create material
    // this.material = this.addMaterial();
    this.addCustomShader();
    this.material = this.customGlitchShader; // colourful

    //create mesh
    this.mesh = this.addMesh(this.geometry, this.material);
    this.scene.add(this.mesh);
    this.addDebugHelpers(this.mesh);

    //create + add helpers
    // const helper = this.addHelpers();
    // this.scene.add(helper.gridHelper);
    // this.scene.add(helper.polarGridHelper);

    // add lights
    this.addLights();

    // animation loop
    this.runLoop();
  }

  addCamera(width, height) {
    const aspect = width / height;
    const zoom = 1; // lower = more zoomed out
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

  addLights() {
    const ambientLight = new THREE.AmbientLight(0x404040, 3);
    this.scene.add(ambientLight);
    this.lights.push(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x404040, 2);
    this.scene.add(directionalLight);
    this.lights.push(directionalLight);
    return this.lights;
  }

  addGeometry() {
    const box = new THREE.BoxGeometry(1, 1, 1);
    return box;
  }

  addMaterial() {
    const material = new THREE.MeshPhongMaterial({ color: 'white' });
    material.shininess = 80;
    return material;
  }

  addDebugHelpers(mesh) {
    // Recompute tangents if needed (optional, only for loaded geometry)
    if (mesh.geometry.computeTangents) {
      try {
        mesh.geometry.computeTangents();
      } catch (err) {
        console.warn('computeTangents failed:', err);
      }
    }

    // Create a group to scale and position debug helpers
    const group = new THREE.Group();
    group.scale.multiplyScalar(1); // Adjust as needed
    this.scene.add(group);

    group.add(mesh);

    // Update matrices
    group.updateMatrixWorld(true);

    // Normals Helper
    const vnh = new VertexNormalsHelper(mesh, 0.1, 0x00ff00);
    this.scene.add(vnh);

    // Tangents Helper
    const vth = new VertexTangentsHelper(mesh, 0.1, 0xff0000);
    this.scene.add(vth);

    // Box Helper
    const boxHelper = new THREE.BoxHelper(mesh);
    this.scene.add(boxHelper);

    // Wireframe
    const wireframe = new WireframeGeometry(mesh.geometry);
    const wireLine = new LineSegments(wireframe);
    wireLine.material.depthTest = false;
    wireLine.material.opacity = 0.25;
    wireLine.material.transparent = true;
    wireLine.position.x = 1.5;
    group.add(wireLine);
    this.scene.add(new THREE.BoxHelper(wireLine));

    // Edges
    const edges = new EdgesGeometry(mesh.geometry);
    const edgeLine = new LineSegments(edges);
    edgeLine.material.depthTest = false;
    edgeLine.material.opacity = 0.25;
    edgeLine.material.transparent = true;
    edgeLine.position.x = -1.5;
    group.add(edgeLine);
    this.scene.add(new THREE.BoxHelper(edgeLine));

    // Group box
    this.scene.add(new THREE.BoxHelper(group));
  }

  addMesh(geometry, material) {
    const flatMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffcc,
      wireframe: true,
      flatShading: true,
    });
    const cube = new THREE.Mesh(geometry, flatMaterial);
    return cube;
  }

  addCustomShader() {
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

  handleResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  runAnimation() {
    if (this.mesh) {
      this.mesh.rotation.x += 0.01;
      this.mesh.rotation.y += 0.01;
    }

    const time = performance.now() * 0.001; // time in seconds
    const amplitude = 1; // half the distance you want to oscillate
    const baseZ = 3; // middle point between min and max (e.g. (2 + 4) / 2)

    // === Orbital Camera Movement ===
    const radius = 3; // distance from target
    const speed = 0.5; // how fast to orbit

    this.camera.position.x = Math.sin(time * speed) * radius;
    this.camera.position.z = Math.cos(time * speed) * radius;
    this.camera.position.y = 1.5; // optional: some height

    this.camera.lookAt(0, 0, 0); // look at the centre of the scene

    // this.camera.position.z = baseZ + Math.sin(time) * amplitude;
    // === UPDATE UNIFORMS ===
    const t = performance.now() * 0.001;
    this.customGlitchShader.uniforms.time.value = t;

    // Optional: add live mouse movement
    this.canvas.addEventListener('mousemove', (e) => {
      this.customGlitchShader.uniforms.mouse.value.set(
        e.clientX / window.innerWidth,
        1 - e.clientY / window.innerHeight // Flip Y for gl-style coords
      );
    });
  }

  runLoop() {
    this.animationId = requestAnimationFrame(this.runLoop.bind(this));

    // update animation state
    this.runAnimation();

    // render updated scene
    this.renderer.render(this.scene, this.camera);
  }

  stopLoop() {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
}
