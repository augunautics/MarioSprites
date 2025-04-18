// SpriteRow.js
import { RowBase } from './RowBase.js';

export class SpriteRow extends RowBase {
  constructor({
    sheetImg,
    centerFrames,
    rowStartY,
    spriteHeight,
    spritesPerRow,
    cropX = 6,
    sourceW = null
  }) {
    super(sheetImg);
    this.sheetImg = sheetImg;
    this.baseW = 16;
    this.baseH = 32;
    this.scale = 2;
    this.sourceW = sourceW;
    this.sourceH = spriteHeight;

    this.centerFrames = centerFrames;
    this.rowStartY = rowStartY;
    this.spritesPerRow = spritesPerRow;
    this.cropX = cropX;
  }

  async loadSprites() {
    const img = this.sheetImg;
    const rowY = this.rowStartY;
    this.sourceW = this.sourceW ?? Math.floor(img.width / this.spritesPerRow);

    const cropX = this.cropX;
    const cropW = this.sourceW - cropX * 2;
    const centerX = img.width / 2;

    // Left of center
    for (let i = this.centerFrames - 1; i >= 0; i--) {
      const canvas = document.createElement('canvas');
      canvas.width = cropW;
      canvas.height = this.sourceH;
      const ctx = canvas.getContext('2d');
      const sx = centerX - (i + 1) * this.sourceW;
      ctx.drawImage(img, sx + cropX, rowY, cropW, this.sourceH, 0, 0, cropW, this.sourceH);
      this.sprites.push(canvas.toDataURL());
    }

    // Right of center
    for (let i = 0; i < this.centerFrames; i++) {
      const canvas = document.createElement('canvas');
      canvas.width = cropW;
      canvas.height = this.sourceH;
      const ctx = canvas.getContext('2d');
      const sx = centerX + i * this.sourceW;
      ctx.drawImage(img, sx + cropX, rowY, cropW, this.sourceH, 0, 0, cropW, this.sourceH);
      this.sprites.push(canvas.toDataURL());
    }
  }
}
