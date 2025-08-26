import { Clock, Camera, Scene } from 'three';
import { PostProcesser } from './PostProcessing';

const clock = new Clock();
interface Updatable {
  tick(delta: number): void;
}
export class Loop {
  private postProcessor: PostProcesser;
  public updatables: Updatable[] = [];
  private camera: Camera;
  private scene: Scene;
  constructor(camera: Camera, scene: Scene, postProcessor: PostProcesser) {
    this.camera = camera;
    this.scene = scene;
    this.postProcessor = postProcessor;
    this.updatables = [];
  }

  public getCamera(): Camera {
    return this.camera;
  }

  public getScene(): Scene {
    return this.scene;
  }

  start() {
    this.postProcessor.composer.renderer.setAnimationLoop(() => {
      this.tick();
      
      // render through post processor instead of direct renderer
      this.postProcessor.composer.render();
    });
  }
  stop() {
    this.postProcessor.composer.renderer.setAnimationLoop(null);
  }
  // tick clock instead of fps
  tick() {
    const delta = clock.getDelta();

    for (const object of this.updatables) {
      if (object.tick) {
        object.tick(delta);
      }
    }
  }
}
