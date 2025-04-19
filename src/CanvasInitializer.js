// CanvasInitializer.js
export class CanvasInitializer {
  static calculateCanvasSize(rows, padding) {
    const drawW = rows[0].getDrawWidth();
    // add space on left for one animated frame + 10px gap
    const offsetX = drawW + 10;

    const totalSprites = Math.max(...rows.map(r => r.getSprites().length));
    // include offsetX
    const width = offsetX + drawW * totalSprites;

    let height = 0;
    for (const row of rows) {
      height += row.getDrawHeight(); // static row
      height += padding;
      height += row.getDrawHeight(); // animation row (now on same line)
      height += padding;
    }

    return { width, height };
  }

  static initCanvas(...rows) {
    const padding = rows[0].padding;
    const { width, height } = this.calculateCanvasSize(rows, padding);

    const canvas = document.getElementById('gameCanvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = 'lime';
    ctx.lineWidth = 2;

    return { canvas, ctx, width, height };
  }
}
