class Bullet {
    constructor(x, y, vx, vy, speed, bulletType = "primary") {
        this.pos = createVector(x, y);
        this.velocity = createVector(0, 0);
        this.acc = createVector(vx * speed, vy * speed);
        this.r = 10;
        this.bulletType = bulletType;
    }
    draw() {
        if(this.bulletType == "primary") {
            fill(255);
            ellipse(this.pos.x, this.pos.y, this.r);
        } else if(this.bulletType == "secondary") {
            fill(255,255,255, 0.5);
            ellipse(this.pos.x, this.pos.y, this.r / 0.75);
        }
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
        if (this.pos.x > width || this.pos.x < 0 ||
            this.pos.y > height || this.pos.y < 0 )
            return true;
    }
}

class PowerUp extends Bullet {
    constructor(type, x, y, vx, vy, speed) {
        super(x, y, vx, vy, speed)
        this.gravity = createVector(0, 0.3);
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
    outOfBounds() {
        if (this.pos.x > width || this.pos.x < 0 || this.pos.y > height)
            return true;
    }
    update() {
        this.gravity.limit(0.3)
        this.pos.add(this.velocity);
        this.velocity.add(this.acc);
        this.velocity.add(this.gravity);
        this.acc.limit(0.25)
        this.draw();
    }
}
