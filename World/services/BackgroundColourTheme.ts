import { Color, WebGLRenderer } from 'three';

export class BackgroundColour {
  private renderer: WebGLRenderer;
  private currentIsDarkMode: boolean;
  private targetBackgroundColor: Color = new Color(0xffffff);
  private currentBackgroundColor: Color = new Color(0xffffff);
  private transitionSpeed: number = 0.05;

  constructor(renderer: WebGLRenderer, isDarkMode: boolean) {
    this.renderer = renderer;
    this.currentIsDarkMode = isDarkMode;
    this.init();
  }

  private init() {
    // Set initial background color based on theme
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

  public update() {
    
    this.currentBackgroundColor.lerp(
      this.targetBackgroundColor,
      this.transitionSpeed
    );
    this.renderer.setClearColor(this.currentBackgroundColor, 1);
  }
}
