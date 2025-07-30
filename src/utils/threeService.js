import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

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

    // add lights
    this.addLights();

    // animation loop
    this.runLoop();
  }

  addCamera(width, height) {
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
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

  addMesh(geometry, material) {
    const cube = new THREE.Mesh(geometry, material);
    return cube;
  }

  addCustomShader() {
    this.customGlitchShader = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        glitchIntensity: { value: 0 },
        resolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
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
      fragmentShader: `
        uniform float time;
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
          
          // Base color cycling through spectrum
          float hue = time * 0.1 + vPosition.x * 0.5 + vPosition.y * 0.3;
          vec3 baseColor = hsv2rgb(vec3(fract(hue), 0.8, 0.9));
          
          // Glitch effects
          float glitch = random(vec2(time * 10.0, floor(st.y * 20.0))) * glitchIntensity;
          
          // RGB shift
          float r = baseColor.r + glitch * 0.3;
          float g = baseColor.g - glitch * 0.2;
          float b = baseColor.b + glitch * 0.4;
          
          // Digital noise
          float noise = random(st + time) * 0.1 * glitchIntensity;
          
          // Scanlines
          float scanline = sin(st.y * 800.0) * 0.05 * glitchIntensity;
          
          vec3 finalColor = vec3(r, g, b) + noise + scanline;
          
          // Fresnel effect
          float fresnel = pow(1.0 - dot(normalize(vNormal), vec3(0, 0, 1)), 2.0);
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
