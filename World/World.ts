import * as THREE from 'three';
import { createCamera } from './components/camera';
import { createScene } from './components/scene';
import { createRenderer } from './components/render';
import { Resizer } from './services/Resizer';
import { createCube } from './components/cube';
import { createLights } from '../World/components/light';
import { Loop } from '../World/services/Loop';
import { createBoxHelper } from './components/helpers/boxHelper';
import { createVertexHelper } from '../World/components/helpers/vertexHelper';
import { BackgroundColour } from '../World/services/BackgroundColourTheme';
import { setupCubeInteractions } from '../World/components/helpers/cubeHelper';

import { PostProcesser } from './services/PostProcessing';

export class World {
  private camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private container: HTMLCanvasElement;
  private resizer: Resizer | null = null;
  private cube;
  private lights;
  private boxHelper;
  private vertexHelper;
  private background;
  private loop;
  private postProcessor: PostProcesser;
  private cubeInteractionCleanup: (() => void) | null = null;

  constructor(container: HTMLCanvasElement, isDarkMode: boolean) {
    //canvas ref
    this.container = container;
    //init variables
    this.camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer(this.container);
    this.lights = createLights();

    this.postProcessor = new PostProcesser(
      this.renderer,
      this.scene,
      this.camera
    );
    this.setupPostProcessing();

    this.loop = new Loop(this.camera, this.scene, this.postProcessor);

    //init bg
    this.background = new BackgroundColour(this.renderer, isDarkMode);
    // this.background.setTransitionDuration(3.0);

    if (this.container) {
      this.resizer = new Resizer(this.container, this.camera, this.renderer);
    }

    this.cube = createCube();

    //create box + axes helper
    this.boxHelper = createBoxHelper(this.cube);

    this.vertexHelper = createVertexHelper(this.cube);

    // Setup cube interactions and store cleanup function
    this.cubeInteractionCleanup = setupCubeInteractions(
      this.cube,
      this.camera,
      this.renderer
    );

    //add to scene
    this.scene.add(
      this.cube,
      this.boxHelper,

      this.vertexHelper,
      this.lights[0],
      this.lights[1]
    );

    this.loop.updatables.push(this.camera as any, this.cube, this.background);
  }

  private setupPostProcessing() {
    this.postProcessor.addPass(); // RenderPass
    this.postProcessor.addAfterImage(); // AfterimagePass
    this.postProcessor.output(); // OutputPass
  }

  // Method to control afterimage effect
  public setAfterimageIntensity(intensity: number) {
    if (this.postProcessor.afterImage) {
      this.postProcessor.afterImage.uniforms['damp'].value = intensity;
    }
  }
  init() {}

  getResizer() {
    return this.resizer;
  }

  //set background colour
  public setBackgroundColor(isDarkMode: boolean) {
    console.log('called background colour');
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
    if (this.cubeInteractionCleanup) {
      this.cubeInteractionCleanup();
      this.cubeInteractionCleanup = null;
    }
  }
}
