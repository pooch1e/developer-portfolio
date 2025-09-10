interface cursor {
  cursorX: number;
  cursorY: number;
}
export class Scroll {
  private cursorX;
  private cursorY;
  constructor({ cursorX, cursorY }: cursor) {
    this.cursorX = cursorX;
    this.cursorY = cursorY;
  }

  initScroll(container: HTMLCanvasElement) {
    window.addEventListener('mousemove', (e) => {
      this.cursorX = e.clientX / container.width - 0.5;
      this.cursorY = e.clientY / container.height - 0.5;
      console.log(this.cursorX, this.cursorY);
    });
  }
}
