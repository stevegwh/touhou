class Sprite{
    constructor(file, w, h, maxFrames, posX = 0, posY = 0) {
        this.w = w;
        this.h = h;
        this.file = file;
        this.maxFrames = maxFrames;
        this.frame = 1;
        this.posX = posX;
        this.posY = posY;
        this.lastAnimation = 5;
        this.animationTimer = 0;
    }
    animate(sourceX, sourceY, sourceR) {
        if(this.animationTimer > this.lastAnimation) {
            this.frame++;
            if(this.frame == this.maxFrames) {
                this.frame = 1;
            }
            this.animationTimer = 0;
        } else {
            this.animationTimer++;
        }
        this.posX = this.w * this.frame;
        image(this.file, sourceX - sourceR, sourceY - sourceR * 2, this.w,
              this.h, this.posX, this.posY, this.w, this.h);
    }
}
