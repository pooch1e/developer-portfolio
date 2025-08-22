import * as THREE from 'three';
export class Resizer {
  private container: HTMLElement;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private resizeHandler: () => void;

  constructor(
    container: HTMLElement,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer
  ) {
    this.container = container;
    this.camera = camera;
    this.renderer = renderer;

    this.setSize();

    this.resizeHandler = () => {
      this.setSize();
      this.onResize();
    };

    window.addEventListener('resize', this.resizeHandler);
  }

  onResize() {
    // hook for custom behaviour (can be overridden)
  }

  private setSize() {
    const width = this.container.offsetWidth || window.innerWidth;
    const height = this.container.offsetHeight || window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height, false);
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }

  dispose() {
    window.removeEventListener('resize', this.resizeHandler);
  }
}
