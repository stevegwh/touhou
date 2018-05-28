class Sprite{
    constructor() {
        this.w = w;
        this.h = h;
        this.file = file;
        this.maxFrames = maxFrames;
        this.frame = 1;
        this.posx = 0;
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
        this.posx = this.w * this.frame;
        image(this.sprite.file, sourceX - sourceR, sourceY - sourceR * 2, this.w,
              this.h, this.posx, 0, this.w, this.h);
    }
}
