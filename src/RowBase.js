// RowBase.js

// 1×1 transparent pixel for blank slots
const BLANK_URL =
  'data:image/png;base64,' +
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQImWNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=';

export class RowBase {
  constructor(sheetImg) {
    this.ctx = null;
    this.sheetImg = sheetImg;
    this.sprites = [];
    this.padding = 0; // vertical spacing is now managed in main.js
    this.startY = 0;
  }

  /**
   * For row index 5 (6th row), only keep frames 12–15; blank out all others.
   */
  filterSpritesForRow(index) {
    if (index === 5) {
      this.sprites = this.sprites.map((url, i) =>
        (i >= 12 && i <= 15) ? url : BLANK_URL
      );
    }
  }

  setContext(ctx) {
    this.ctx = ctx;
  }

  setStartY(y) {
    this.startY = y;
  }

  getSprites() {
    return this.sprites;
  }

  getDrawWidth() {
    return this.baseW * this.scale;
  }

  getDrawHeight() {
    return this.baseH * this.scale;
  }

  getBottomY() {
    return this.startY + this.getDrawHeight() + this.padding;
  }

  draw() {
    if (!this.ctx) return;

    const drawW = this.getDrawWidth();
    // leave 10px to the left for the animated frame, plus a 10px gap
    const offsetX = drawW + 10;

    this.sprites.forEach((url, i) => {
      const x = offsetX + i * drawW;
      const img = new Image();
      img.onload = () => {
        this.ctx.drawImage(
          img,
          0, 0,
          this.sourceW, this.sourceH,
          x, this.startY,
          drawW, this.getDrawHeight()
        );
        this.ctx.fillText(
          i,
          x + drawW / 2,
          this.startY + this.getDrawHeight() + this.padding * 0.7
        );
        this.ctx.strokeRect(
          x, this.startY,
          drawW, this.getDrawHeight()
        );
      };
      img.src = url;
    });
  }

  animateCenter(/* canvasWidth unused */) {
    if (!this.ctx || !this.sprites) return;

    const drawW = this.getDrawWidth();
    const drawH = this.getDrawHeight();
    const animX = 10;             // 10px from left edge
    const animY = this.startY;    // same line

    let idx = 0;
    setInterval(() => {
      this.ctx.clearRect(animX, animY, drawW, drawH + this.padding);

      const img = new Image();
      img.onload = () => {
        this.ctx.drawImage(
          img,
          animX, animY,
          drawW, drawH
        );
        this.ctx.fillText(
          idx,
          animX + drawW / 2,
          animY + drawH + this.padding * 0.7
        );
      };
      img.src = this.sprites[idx];
      idx = (idx + 1) % this.sprites.length;
    }, 500);
  }
}
