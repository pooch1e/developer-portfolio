/**
 * BackgroundColour — owns the WebGL clear colour for the home scene. Theme
 * changes snap instantly; the page-level view transition crossfades the canvas
 * along with the rest of the DOM.
 */
import { Color, WebGLRenderer } from 'three';

// Mirrors --bg-primary in src/index.css. Hardcoded because ThemeProvider
// toggles the .dark class after child effects run, so reading the computed
// token here would return the previous theme's value.
const LIGHT_BG = 0xffffff;
const DARK_BG = 0x222222;

export class BackgroundColour {
  private renderer: WebGLRenderer;
  private color: Color = new Color(LIGHT_BG);

  constructor(renderer: WebGLRenderer, isDarkMode: boolean) {
    this.renderer = renderer;
    this.setBackgroundColor(isDarkMode);
  }

  public setBackgroundColor(isDarkMode: boolean) {
    this.color.setHex(isDarkMode ? DARK_BG : LIGHT_BG);
    this.renderer.setClearColor(this.color, 1);
  }
}
