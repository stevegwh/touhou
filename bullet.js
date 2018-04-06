class Bullet {
    constructor(x, y, v1, v2, speed) {
      this.pos = createVector(x, y);
      this.velocityRate = 2;
      this.velocity = createVector(v1 * speed, v2 * speed);
      this.acc = createVector(0, 0);
    }
    draw() {
      ellipse(this.pos.x, this.pos.y, 10, 10);
    }
    update() {
      this.pos.add(this.velocity);
      this.velocity.add(this.acc);
      this.acc.mult(0);
    }
  }