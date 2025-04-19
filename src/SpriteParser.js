// SpriteParser.js
import { SpriteRow } from './SpriteRow.js';

export class SpriteParser {
  constructor(sheetImg) {
    this.sheetImg = sheetImg;
    // List all rows here
    this.rowConfigs = [
      { centerFrames: 14, rowStartY: 0,    spriteHeight: 360, spritesPerRow: 28, cropX: 6 },
      { centerFrames: 16, rowStartY: 330,  spriteHeight: 300, spritesPerRow: 32, cropX: 12, sourceW: 163 },
      { centerFrames: 14, rowStartY: 640,  spriteHeight: 360, spritesPerRow: 28, cropX: 6 },
      { centerFrames: 16, rowStartY: 950,  spriteHeight: 300, spritesPerRow: 32, cropX: 12, sourceW: 163 },
      { centerFrames: 14, rowStartY: 1250, spriteHeight: 360, spritesPerRow: 28, cropX: 6 },
      { centerFrames: 14, rowStartY: 1600, spriteHeight: 290, spritesPerRow: 28, cropX: 6 },
      { centerFrames: 16, rowStartY: 1790, spriteHeight: 290, spritesPerRow: 28, cropX: 6 }
    ].map(cfg => ({ sheetImg: this.sheetImg, ...cfg }));
  }

  /** Returns how many rows are configured */
  getRowCount() {
    return this.rowConfigs.length;
  }

  /** Returns the config object for a given row index */
  getRowConfig(index) {
    return this.rowConfigs[index];
  }

  /** Creates and returns a fully loaded SpriteRow */
  async getRow(index) {
    const config = this.getRowConfig(index);
    const row = new SpriteRow(config);
    await row.loadSprites();
    return row;
  }
}
