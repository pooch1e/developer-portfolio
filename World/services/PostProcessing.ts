import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { AfterimagePass } from 'three/addons/postprocessing/AfterimagePass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import * as THREE from 'three';
export class PostProcesser {
  public composer: EffectComposer;
  private outputPass: OutputPass;
  private scene;
  private camera;
  public afterImage!: AfterimagePass;

  constructor(
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.Camera
  ) {
    this.composer = new EffectComposer(renderer);
    this.outputPass = new OutputPass();

    this.scene = scene;
    this.camera = camera;
  }

  addPass() {
    this.composer.addPass(new RenderPass(this.scene, this.camera));
  }

  addAfterImage(damping: number = 0.96) {
    this.afterImage = new AfterimagePass(damping);
    this.composer.addPass(this.afterImage);
  }

  output() {
    this.composer.addPass(this.outputPass);
  }

  setAfterimageSettings(damping: number) {
    if (this.afterImage) {
      this.afterImage.uniforms['damp'].value = damping;
    }
  }

  toggleAfterimage(enabled: boolean) {
    if (this.afterImage) {
      this.afterImage.enabled = enabled;
    }
  }
}
