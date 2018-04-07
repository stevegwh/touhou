class Bullet {
    constructor(x, y, vx, vy, speed) {
        this.pos = createVector(x, y);
        this.velocity = createVector(0, 0);
        this.acc = createVector(vx * speed, vy * speed);
        this.r = 10;
    }
    draw() {
        ellipse(this.pos.x, this.pos.y, this.r);
    }
    update() {
        this.pos.add(this.velocity);
        this.velocity.add(this.acc);
        this.acc.mult(0);
        this.draw();
    }
    checkCollision(d2, offset = 0) {
        let d = int(dist(this.pos.x, this.pos.y, d2.pos.x, d2.pos.y));
        if(d <= this.r + (d2.r - offset)) {
            return true;
        }
    }
}