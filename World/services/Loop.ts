import { Clock } from 'three';

const clock = new Clock();

export class Loop {
  private camera;
  private scene;
  private postProcessor;
  public updatables: any;
  constructor(camera, scene, postProcessor) {
    this.camera = camera;
    this.scene = scene;
    this.postProcessor = postProcessor;
    this.updatables = [];
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
