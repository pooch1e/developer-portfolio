/**
 * BackgroundColour — owns the WebGL clear colour for the home scene and
 * eases it toward the active theme's background on each frame.
 */
import { Color, WebGLRenderer } from 'three';

// Mirrors --bg-primary in src/index.css. Hardcoded because ThemeProvider
// toggles the .dark class after child effects run, so reading the computed
// token here would return the previous theme's value.
const LIGHT_BG = 0xffffff;
const DARK_BG = 0x3f3f46;

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
    const initialColor = this.currentIsDarkMode ? DARK_BG : LIGHT_BG;
    this.currentBackgroundColor.setHex(initialColor);
    this.targetBackgroundColor.setHex(initialColor);
    this.renderer.setClearColor(this.currentBackgroundColor, 1);
  }

  public setBackgroundColor(isDarkMode: boolean) {
    this.currentIsDarkMode = isDarkMode;
    const targetColor = isDarkMode ? DARK_BG : LIGHT_BG;
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
