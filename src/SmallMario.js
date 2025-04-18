// SmallMario.js

export class SmallMario {
    constructor(row, ctx, canvasWidth, startY) {
      this.row = row;
      this.ctx = ctx;
      this.canvasWidth = canvasWidth;
      this.startY = startY;
  
      // Updated animation frames for left-walk cycle
      this.walkFrames = [13,12,11];
      this.step = 0;
      this.interval = null;
    }
  
    startWalking() {
      const drawW = this.row.getDrawWidth();
      const drawH = this.row.getDrawHeight();
  
      // Updated: position to left instead of center
      const drawX = 20;
      const drawY = this.startY;
  
      this.interval = setInterval(() => {
        this.ctx.clearRect(0, drawY, this.canvasWidth, drawH + this.row.padding);
        const index = this.walkFrames[this.step % this.walkFrames.length];
        const frameImg = new Image();
        frameImg.onload = () => {
          this.ctx.drawImage(
            frameImg,
            0, 0,
            this.row.sourceW,
            this.row.sourceH,
            drawX,
            drawY,
            drawW,
            drawH
          );
        };
        frameImg.src = this.row.getSprites()[index];
        this.step++;
      }, 300);
    }
  
    stop() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    }
  }
  