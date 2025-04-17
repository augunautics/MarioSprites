// src/spriteLoader.js

export async function loadSprites(url, frameWidth, frameHeight) {
  const img = await new Promise((resolve, reject) => {
    const image = new Image();
    image.src    = url;
    image.onload  = () => resolve(image);
    image.onerror = reject;
  });

  const extraLeft  = 14;
  const extraRight = 14;
  const startX     = 0;
  const startY     = 0;
  const gapX       = 0;
  const gapY       = 0;

  const cols = Math.floor((img.width  - startX + gapX) / (frameWidth  + gapX));
  const rows = Math.floor((img.height - startY + gapY) / (frameHeight + gapY));

  const spritesByRow = [];
  const offscreen    = document.createElement('canvas');
  const ctx          = offscreen.getContext('2d');

  for (let y = 0; y < rows; y++) {
    const row = [];
    for (let x = 0; x < cols; x++) {
      let srcX  = startX + x * (frameWidth + gapX);
      const srcY = startY + y * (frameHeight + gapY);
      let cropW = frameWidth;

      // Shrink frame 6 (index 6) on right
      if (y === 0 && x === 6) {
        cropW -= extraRight;
      }

      // Shrink frame 10 (index 10) on right
      if (y === 0 && x === 10) {
        cropW -= extraRight;
      }

      // Widen frame 7 (index 7) on left
      if (y === 0 && x === 7) {
        srcX   -= extraLeft;
        cropW += extraLeft;
      }

      // Widen frame 11 (index 11) on left
      if (y === 0 && x === 11) {
        srcX   -= extraLeft;
        cropW += extraLeft; 
      }

      // **Corrected**: widen frame 16 (index 16) by exactly 10px
      if (y === 0 && x === 16) {
        srcX  += 14;   // “give back” 4px on the left
        cropW += 14;  // add 14px on the right
      }

      // Widen frame 17 (index 17) on left by extraLeft
      if (y === 0 && x === 17) {
        srcX += extraLeft;
        cropW += extraLeft;
      }

      offscreen.width  = cropW;
      offscreen.height = frameHeight;
      ctx.clearRect(0, 0, cropW, frameHeight);
      ctx.drawImage(
        img,
        srcX, srcY,
        cropW, frameHeight,
        0,    0,
        cropW, frameHeight
      );
      row.push(offscreen.toDataURL());
    }
    spritesByRow.push(row);
  }

  return spritesByRow;
}
