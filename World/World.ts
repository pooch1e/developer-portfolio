import * as THREE from 'three';
import { createCamera } from './components/camera';
import { createScene } from './components/scene';
import { createRenderer } from './components/render';
import { Resizer } from './services/Resizer';
import { createCube } from './components/cube';
import { createLights } from '../World/components/light';
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

  constructor(container: HTMLCanvasElement, isDarkMode: boolean) {
    //canvas ref
    this.container = container;
    //init variables
    this.camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer(this.container);
    this.lights = createLights();

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

    this.renderer.render(this.scene, this.camera);
  }

  init() {}
  //set background colour
  public setBackgroundColor(isDarkMode: boolean) {
    this.background.setBackgroundColor(isDarkMode);
  }
}
