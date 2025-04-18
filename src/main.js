// main.js

// Import sprite sheet asset and helper classes
import SpriteURL from './assets/characters_big.png';
import { SpriteParser } from './SpriteParser.js';              // Parses and configures sprite rows
import { CanvasInitializer } from './CanvasInitializer.js';    // Handles canvas sizing and creation
import { ImageLoader } from './LoadImage.js';                  // Utility for loading images

(async () => {
  // Step 1: Load the sprite sheet image into memory
  const sheetImg = await ImageLoader.load(SpriteURL);

  // Step 2: Create a parser for the loaded image and retrieve rows
  const parser = new SpriteParser(sheetImg);
  const row0 = await parser.getRow(0); // Big Mario row
  const row1 = await parser.getRow(1); // Small Mario row
  const row2 = await parser.getRow(2); // Big Mario clone
  const row3 = await parser.getRow(3); // Small Mario clone

  // Step 3: Initialize canvas dimensions based on row content
  const { canvas, ctx, width: canvasWidth } = CanvasInitializer.initCanvas(row0, row1, row2, row3);

  // Step 4: Render and animate row0
  row0.setContext(ctx);
  row0.setStartY(0);
  row0.draw();
  row0.animateCenter(canvasWidth);

  // Step 5: Render and animate row1 beneath row0
  row1.setContext(ctx);
  row1.setStartY(row0.getBottomY() + row0.getDrawHeight() + row0.padding);
  row1.draw();
  row1.animateCenter(canvasWidth);

  // Step 6: Render and animate row2 beneath row1
  row2.setContext(ctx);
  row2.setStartY(row1.getBottomY() + row1.getDrawHeight() + row1.padding);
  row2.draw();
  row2.animateCenter(canvasWidth);

  // Step 7: Render and animate row3 beneath row2
  row3.setContext(ctx);
  row3.setStartY(row2.getBottomY() + row2.getDrawHeight() + row2.padding);
  row3.draw();
  row3.animateCenter(canvasWidth);
})();
