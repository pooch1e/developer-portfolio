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
  }

  init(canvas) {
    this.canvas = canvas;
    console.log(this.canvas, 'canvas in class');
    const height = this.canvas.height || 400;
    const width = this.canvas.width || 400;
    // set viewport
    this.renderer = new THREE.WebGLRenderer({ canvas });

    this.renderer.setSize(width, height);
    // this.canvas.appendChild(this.renderer.domElement);
    // add camera
    this.camera = this.addCamera(width, height);
    this.camera.position.z = 2;

    // create scene
    this.scene = new THREE.Scene();

    // create geometry
    this.geometry = this.addGeometry();

    //create material
    this.material = this.addMaterial();

    //create mesh
    this.mesh = this.addMesh(this.geometry, this.material);
    this.scene.add(this.mesh);

    // add lights
    this.addLights();

    this.runAnimation();
  }

  addCamera(width, height) {
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    return this.camera;
  }

  addLights() {
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    this.scene.add(ambientLight);
    this.lights.push(ambientLight);
    return this.lights;
  }

  addGeometry() {
    const box = new THREE.BoxGeometry(1, 1, 1);
    return box;
  }

  addMaterial() {
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    return material;
  }

  addMesh(geometry, material) {
    const cube = new THREE.Mesh(geometry, material);
    return cube;
  }

  runAnimation() {
    if (this.mesh) {
      this.mesh.rotation.x += 0.01;
      this.mesh.rotation.y += 0.01;
    }
    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(this.runAnimation.bind(this));
  }
}
