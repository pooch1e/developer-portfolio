import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export class ThreeService {
  constructor() {
    this.camera = null;
    this.scene = null;
    this.renderer = null;
    this.loader = new GLTFLoader();
    this.container = null;
    this.geometry = null;
    this.mesh = null;
    this.material = null;
    this.lights = [];
  }

  init(container) {
    this.container = container;
    // set viewport
    this.renderer = new THREE.WebGLRenderer();

    this.renderer.setSize(container.innerHeight / 2, container.innerWidth / 2);

    // add camera
    this.camera = this.addCamera();
    this.camera.position.z = 1;

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
    this.renderer.render(this.scene, this.camera);
  }
}
