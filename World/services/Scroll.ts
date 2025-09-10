interface cursor {
  cursorX: number;
  cursorY: number;
}
export class Scroll {
  private cursorX: cursor['cursorX'];
  private cursorY: cursor['cursorY'];
  private scrollY: number;
  private currentSelection: number = 0;
  constructor({ cursorX, cursorY }: cursor) {
    this.cursorX = cursorX;
    this.cursorY = cursorY;
  }

  initParralax(container: HTMLCanvasElement) {
    window.addEventListener('mousemove', (e) => {
      this.cursorX = e.clientX / container.width - 0.5;
      this.cursorY = e.clientY / container.height - 0.5;
    });
  }

  initScroll() {
    // SCROLL

    window.addEventListener('scroll', () => {
      scrollY = window.scrollY;
      console.log(scrollY);
    });
  }
}
