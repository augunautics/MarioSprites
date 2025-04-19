// RowBase.js
export class RowBase {
  constructor(sheetImg) {
    this.ctx = null;
    this.sheetImg = sheetImg;
    this.sprites = [];
    this.padding = 0; // removed vertical spacing between rows
    this.startY = 0;
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

  animateCenter(/* canvasWidth is unused for positioning */) {
    if (!this.ctx || !this.sprites) return;

    const drawW = this.getDrawWidth();
    const drawH = this.getDrawHeight();
    const animX = 10;           // fixed 10px from the left edge
    const animY = this.startY;  // same line as static sprites

    let idx = 0;
    setInterval(() => {
      // clear only the animation slot
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
