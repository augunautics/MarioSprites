// SpriteParser.js
import { SpriteRow } from './SpriteRow.js';

export class SpriteParser {
  constructor(sheetImg) {
    this.sheetImg = sheetImg;
  }

  async getRow(index) {
    const config = this.getRowConfig(index);
    const row = new SpriteRow(config);
    await row.loadSprites();
    return row;
  }

  getRowConfig(index) {
    const rows = [
      {
        sheetImg: this.sheetImg,
        centerFrames: 14,
        rowStartY: 0,
        spriteHeight: 360,
        spritesPerRow: 28,
        cropX: 6
      },
      {
        sheetImg: this.sheetImg,
        centerFrames: 16,
        rowStartY: 330,
        spriteHeight: 300,
        spritesPerRow: 32,
        cropX: 12,
        sourceW: 163
      },
      {
        sheetImg: this.sheetImg,
        centerFrames: 14,
        rowStartY: 640,
        spriteHeight: 360,
        spritesPerRow: 28,
        cropX: 6
      },
      {
        sheetImg: this.sheetImg,
        centerFrames: 16,
        rowStartY: 950,
        spriteHeight: 300,
        spritesPerRow: 32,
        cropX: 12,
        sourceW: 163
      },
      {
        sheetImg: this.sheetImg,
        centerFrames: 14,
        rowStartY: 1250,
        spriteHeight: 360,
        spritesPerRow: 28,
        cropX: 6
      }
    ];
    return rows[index];
  }
}
