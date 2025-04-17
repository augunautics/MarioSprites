// src/main.js 
import spriteURL from './assets/characters_big.png';
import { loadSprites } from './spriteLoader.js';

(async () => {
  // Load the sheet to measure its width
  const img = await new Promise((resolve, reject) => {
    const i = new Image();
    i.src = spriteURL;
    i.onload = () => resolve(i);
    i.onerror = reject;
  });

  // Compute frame size (float) for 28 cols across total width
  const cols = 28;
  const frameW = img.width / cols;
  const frameH = 355;
  const scale = 1;
  const drawW = frameW * scale;
  const drawH = frameH * scale;

  // Slice the sheet
  const sprites = await loadSprites(
    spriteURL,
    frameW,
    frameH
  );
  const row0 = sprites[0];

  // Resize canvas to hold all sprites + room for text
  const canvas = document.getElementById('gameCanvas');
  const paddingBottom = 20;
  canvas.width = drawW * row0.length;
  canvas.height = drawH + paddingBottom;
  const ctx = canvas.getContext('2d');

  // Configure text style
  ctx.font = '16px sans-serif';
  ctx.fillStyle = 'lime';
  ctx.textAlign = 'center';

  // Draw sprites and their indices
  row0.forEach((url, i) => {
    const frameImg = new Image();
    frameImg.onload = () => {
      const x = i * drawW;
      // Draw sprite
      ctx.drawImage(frameImg, 0, 0, frameW, frameH, x, 0, drawW, drawH);
      // Draw index below
      ctx.fillText(i.toString(), x + drawW / 2, drawH + paddingBottom * 0.7);
      // Outline the sprite
      ctx.strokeStyle = 'lime';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, 0, drawW, drawH);
    };
    frameImg.src = url;
  });
})();
