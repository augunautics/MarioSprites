// main.js

// Import sprite sheet asset and helper classes
import SpriteURL from './assets/characters_big.png';
import { SpriteParser } from './SpriteParser.js';              // Parses and configures sprite rows
import { CanvasInitializer } from './CanvasInitializer.js';    // Handles canvas sizing and creation
import { ImageLoader } from './LoadImage.js';                  // Utility for loading images
import { SmallMario } from './SmallMario.js';                  // Simulated Mario animation controller

(async () => {
  // Step 1: Load the sprite sheet image into memory
  const sheetImg = await ImageLoader.load(SpriteURL);

  // Step 2: Create a parser for the loaded image and retrieve rows
  const parser = new SpriteParser(sheetImg);
  const rows = [];
  for (let i = 0; i < 5; i++) {
    const row = await parser.getRow(i);
    rows.push(row);
  }

  // Step 3: Initialize canvas dimensions based on all rows
  const smallMarioHeight = rows[1].getDrawHeight();
  const { canvas, ctx, width: canvasWidth } = CanvasInitializer.initCanvas(...rows);

  // Step 4: Animate small Mario walking left at the top-left
  const smallMario = new SmallMario(rows[1], ctx, canvasWidth, 0);
  smallMario.startWalking();

  // Step 5: Draw and animate all rows beneath small Mario
  let currentY = smallMarioHeight + rows[1].padding;
  for (const row of rows) {
    row.setContext(ctx);
    row.setStartY(currentY);
    row.draw();
    row.animateCenter(canvasWidth);
    currentY = row.getBottomY() + row.getDrawHeight() + row.padding;
  }
})();
