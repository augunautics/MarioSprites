// src/main.js
import spriteURL from './assets/characters_big.png';
import { loadSprites } from './spriteLoader.js';

(async () => {
  // 1. Load the sheet just to get its intrinsic dimensions
  const img = await new Promise((resolve, reject) => {
    const i = new Image();
    i.src = spriteURL;
    i.onload = () => resolve(i);
    i.onerror = reject;
  });

  // 2. Define source‑frame size (in sheet pixels)
  const cols   = 28;
  const frameW = img.width / cols;
  const frameH = 355;

  // 3. Define *destination* draw size (in canvas pixels)
  const drawW = 16;
  const drawH = 32;

  // 4. Slice into data‑URLs
  const sprites = await loadSprites(spriteURL, frameW, frameH);
  const row0    = sprites[0];

  // 5. Resize the canvas to fit one row of 16×32 sprites
  const paddingBottom = 16;
  const canvas        = document.getElementById('gameCanvas');
  canvas.width  = drawW * row0.length;
  canvas.height = drawH + paddingBottom;
  const ctx = canvas.getContext('2d');

  // 6. Draw each frame at 16×32
  ctx.font      = '12px sans-serif';
  ctx.textAlign = 'center';

  row0.forEach((url, i) => {
    const frameImg = new Image();
    frameImg.onload = () => {
      const x = i * drawW;
      // drawImage(src, sx, sy, sw, sh, dx, dy, dw, dh)
      ctx.drawImage(frameImg, 0, 0, frameW, frameH, x, 0, drawW, drawH);
      // optional: index below
      ctx.fillStyle = '#fff';
      ctx.fillText(i, x + drawW/2, drawH + paddingBottom * 0.7);
    };
    frameImg.src = url;
  });
})();
