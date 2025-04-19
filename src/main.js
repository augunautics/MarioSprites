// main.js

// Import sprite sheet asset and helper classes
import SpriteURL from './assets/characters_big.png';
import { SpriteParser } from './SpriteParser.js';           // Parses and configures sprite rows
import { CanvasInitializer } from './CanvasInitializer.js'; // Handles canvas sizing and creation
import { ImageLoader } from './LoadImage.js';               // Utility for loading images
import { SmallMario } from './SmallMario.js';               // Simulated Mario animation controller

(async () => {
  // 1) Load the sheet
  const sheetImg = await ImageLoader.load(SpriteURL);

  // 2) Build parser and pull in all rows dynamically
  const parser = new SpriteParser(sheetImg);
  const rows = [];
  const rowCount = parser.getRowCount();
  const vSpacing = 10;

  for (let i = 0; i < rowCount; i++) {
    const row = await parser.getRow(i);
    // apply the filter in RowBase
    row.filterSpritesForRow(i);
    rows.push(row);
  }

  // 3) Initialize canvas to fit every row
  const smallMarioHeight = rows[1].getDrawHeight();
  const { canvas, ctx, width: canvasWidth } = CanvasInitializer.initCanvas(...rows);

  // 4) SmallMario at top
  const smallMario = new SmallMario(rows[1], ctx, canvasWidth, 0);
  smallMario.startWalking();

  // 5) Draw & animate each row with 10px vertical spacing
  let currentY = smallMarioHeight + vSpacing;
  for (const row of rows) {
    row.setContext(ctx);
    row.setStartY(currentY);
    row.draw();
    row.animateCenter(canvasWidth);
    currentY += row.getDrawHeight() + vSpacing;
  }
})();
