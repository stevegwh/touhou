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
        return d <= this.r + (d2.r - offset);
    }
    outOfBounds() {
        const offset = 100;
        if (this.pos.x > width + offset ||
            this.pos.x < 0 - offset ||
            this.y > height + offset ||
            this.y < 0 - offset)
            return true;
    }
}

class PowerUp extends Bullet {
    constructor(type, x, y, vx, vy, speed) {
        super(x, y, vx, vy, speed)
        this.type = type;
    }
    draw() {
        if (this.type === "power") {
            push();
            fill(255, 0, 0);
            ellipse(this.pos.x, this.pos.y, this.r * 2);
            pop();
        } else if (this.type === "score") {
            push();
            fill(0, 0, 255);
            ellipse(this.pos.x, this.pos.y, this.r * 2);
            pop();
        }
    }
}