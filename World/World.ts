import * as THREE from 'three';
import { createCamera } from './components/camera';
import { createScene } from './components/scene';
import { createRenderer } from './components/render';
import { Resizer } from './services/Resizer';
import { createCube } from './components/cube';
import { createLights } from '../World/components/light';
import { Loop } from '../World/services/Loop';
import { createBoxHelper } from './components/helpers/boxHelper';
import { createAxesHelper } from './components/helpers/axesHelper';
import { createVertexHelper } from '../World/components/helpers/vertexHelper';
import { BackgroundColour } from '../World/services/BackgroundColourTheme';

export class World {
  private camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private container: HTMLCanvasElement;
  private resizer: Resizer;
  private cube;
  private lights;
  private boxHelper;
  private axesHelper;
  private vertexHelper;
  private background;
  private loop;

  constructor(container: HTMLCanvasElement, isDarkMode: boolean) {
    //canvas ref
    this.container = container;
    //init variables
    this.camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer(this.container);
    this.lights = createLights();

    this.loop = new Loop(this.camera, this.scene, this.renderer);

    //init bg
    this.background = new BackgroundColour(this.renderer, isDarkMode);

    if (this.container) {
      this.resizer = new Resizer(this.container, this.camera, this.renderer);
    }

    this.cube = createCube();

    //create box + axes helper
    this.boxHelper = createBoxHelper(this.cube);
    this.axesHelper = createAxesHelper();
    this.vertexHelper = createVertexHelper(this.cube);

    //add to scene
    this.scene.add(
      this.cube,
      this.boxHelper,
      this.axesHelper,
      this.vertexHelper,
      this.lights[0],
      this.lights[1]
    );

    this.loop.updatables.push(this.camera as any, this.cube);
  }

  init() {}
  //set background colour
  public setBackgroundColor(isDarkMode: boolean) {
    this.background.setBackgroundColor(isDarkMode);
  }

  //produce single frame
  render() {
    this.renderer.render(this.scene, this.camera);
  }
  // animated loop
  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }
}
