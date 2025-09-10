export class Scroll {
  private cursorX;
  private cursorY;
  constructor(cursorX: number, cursorY: number) {
    this.cursorX = cursorX;
    this.cursorY = cursorY;
  }

  initScroll(container) {
    window.addEventListener('mousemove', (e) => {
      this.cursorX = e.clientX / container.width;
      this.cursorY = e.clientY / container.height;
    });
  }
}
