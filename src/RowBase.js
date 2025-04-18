// RowBase.js

export class RowBase {
  constructor(sheetImg) {
    this.ctx = null;
    this.sheetImg = sheetImg;
    this.sprites = [];
    this.padding = 20;
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

    this.sprites.forEach((url, i) => {
      const x = i * this.getDrawWidth();
      const img = new Image();
      img.onload = () => {
        this.ctx.drawImage(
          img,
          0, 0,
          this.sourceW, this.sourceH,
          x, this.startY,
          this.getDrawWidth(), this.getDrawHeight()
        );
        this.ctx.fillText(i, x + this.getDrawWidth() / 2, this.startY + this.getDrawHeight() + this.padding * 0.7);
        this.ctx.strokeRect(x, this.startY, this.getDrawWidth(), this.getDrawHeight());
      };
      img.src = url;
    });
  }

  animateCenter(canvasWidth, overrideDrawH = null) {
    if (!this.ctx || !this.sprites) return;

    const drawH = overrideDrawH ?? this.getDrawHeight();
    const drawW = this.getDrawWidth();
    const animX = (canvasWidth / 2) - drawW / 2;
    const animY = this.getBottomY();

    let idx = 0;

    setInterval(() => {
      this.ctx.clearRect(0, animY, canvasWidth, drawH + this.padding);

      const img = new Image();
      img.onload = () => {
        this.ctx.drawImage(
          img,
          animX, animY,
          drawW, drawH
        );
        this.ctx.fillText(idx, animX + drawW / 2, animY + drawH + this.padding * 0.7);
      };
      img.src = this.sprites[idx];
      idx = (idx + 1) % this.sprites.length;
    }, 500);
  }
}
