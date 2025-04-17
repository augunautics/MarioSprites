// src/main.js
import spriteURL from './assets/characters_big.png';
import { loadSprites } from './spriteLoader.js';

(async () => {
  // 1. Load sheet to get its size
  const img = await new Promise((res, rej) => {
    const i = new Image();
    i.src = spriteURL;
    i.onload = () => res(i);
    i.onerror = rej;
  });

  // 2. Source‑frame dimensions
  const cols   = 28;
  const frameW = img.width / cols;
  const frameH = 355;

  // 3. Desired draw size
  const baseW = 16, baseH = 32, scale = 2;
  const drawW = baseW * scale, drawH = baseH * scale;

  // 4. Slice into data‑URLs
  const sprites = await loadSprites(spriteURL, frameW, frameH);
  const row0    = sprites[0];

  // 5. Canvas sizing: one grid row + padding + one animation slot + padding
  const padding = 20;
  const canvas  = document.getElementById('gameCanvas');
  canvas.width  = drawW * row0.length;
  canvas.height = drawH + padding + drawH + padding;
  const ctx = canvas.getContext('2d');

  ctx.font      = '14px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fff';
  ctx.strokeStyle = 'lime';
  ctx.lineWidth = 2;

  // 6. Draw static grid at top
  row0.forEach((url, i) => {
    const x = i * drawW;
    const img1 = new Image();
    img1.onload = () => {
      ctx.drawImage(img1, 0, 0, frameW, frameH, x, 0, drawW, drawH);
      ctx.fillText(i, x + drawW/2, drawH + padding * 0.7);
      ctx.strokeRect(x, 0, drawW, drawH);
    };
    img1.src = url;
  });

  // 7. Animate one sprite below
  const animY = drawH + padding;
  const animX = (canvas.width / 2) - drawW/2;
  let idx = 0;

  setInterval(() => {
    // clear previous
    ctx.clearRect(0, animY, canvas.width, drawH + padding);

    // draw new
    const img2 = new Image();
    img2.onload = () => {
      ctx.drawImage(img2, 0, 0, frameW, frameH, animX, animY, drawW, drawH);
      ctx.fillText(idx, animX + drawW/2, animY + drawH + padding * 0.7);
      ctx.strokeRect(animX, animY, drawW, drawH);
    };
    img2.src = row0[idx];

    // advance
    idx = (idx + 1) % row0.length;
  }, 500);
})();
