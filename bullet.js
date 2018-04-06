class Bullet {
    constructor(x, y, vx, vy, speed) {
        this.pos = createVector(x, y);
        this.velocity = createVector(0, 0);
        this.acc = createVector(vx * speed, vy * speed);
    }
    draw() {
        ellipse(this.pos.x, this.pos.y, 10, 10);
    }
    update() {
        this.pos.add(this.velocity);
        this.velocity.add(this.acc);
        this.acc.mult(0);
        this.draw();
    }
}