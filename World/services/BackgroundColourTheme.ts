import { Color, WebGLRenderer } from 'three';

export class BackgroundColour {
  private renderer: WebGLRenderer;
  private currentIsDarkMode: boolean;
  private targetBackgroundColor: Color = new Color(0xffffff);
  private currentBackgroundColor: Color = new Color(0xffffff);
  private lerpSpeed: number = 0.02;

  constructor(renderer: WebGLRenderer, isDarkMode: boolean) {
    this.renderer = renderer;
    this.currentIsDarkMode = isDarkMode;
    this.init();
  }

  private init() {
    const initialColor = this.currentIsDarkMode ? 0x3f3f46 : 0xffffff;
    this.currentBackgroundColor.setHex(initialColor);
    this.targetBackgroundColor.setHex(initialColor);
    this.renderer.setClearColor(this.currentBackgroundColor, 1);
  }

  public setBackgroundColor(isDarkMode: boolean) {
    this.currentIsDarkMode = isDarkMode;
    const targetColor = isDarkMode ? 0x3f3f46 : 0xffffff;
    this.targetBackgroundColor.setHex(targetColor);
    
  }

  public tick() {
    this.currentBackgroundColor.lerp(
      this.targetBackgroundColor,
      this.lerpSpeed
    );
    this.renderer.setClearColor(this.currentBackgroundColor, 1);
  }

  public setTransitionSpeed(speed: number) {
    this.lerpSpeed = speed;
  }
}
