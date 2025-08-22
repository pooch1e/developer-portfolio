import * as THREE from 'three';
import { createCamera } from './components/camera';
import { createScene } from './components/scene';
import { createRenderer } from './components/render';
import { Resizer } from './services/Resizer';
import { createCube } from './components/cube';
export class World {
  private camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private container: React.RefObject<HTMLCanvasElement>;
  private resizer: Resizer;
  private cube;

  constructor(container: React.RefObject<HTMLCanvasElement>) {
    //canvas ref
    this.container = container;
    //init variables
    this.camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer(this.container.current || undefined);

    if (this.container.current) {
      this.resizer = new Resizer(
        this.container.current,
        this.camera,
        this.renderer
      );
    }

    this.cube = createCube();

    //add cube to scene
    this.scene.add(this.cube, this.camera);
  }

  init() {}
}
