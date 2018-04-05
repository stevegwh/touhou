let bullets = [];
var spiral, spiral2;

function setup() {
  createCanvas(800, 600);
  angleMode(DEGREES);
  stroke(255);
  strokeWeight(4);
  spiral = new Spiral(width / 2 + 50, height / 2, 5, 60);
  spiral2 = new Spiral(width / 2 - 50, height / 2, 0.5, 60);
}


class Bullet {
  constructor(x, y, v1, v2) {
    this.pos = createVector(x, y);
    this.velocityRate = 2;
    this.velocity = createVector(v1 * this.velocityRate, v2 * this.velocityRate);
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

class Pattern {
  constructor(x, y, rotationRate, amount) {
    this.bullets = [];
    this.dt = 0; //delta time
    this.amount = amount; //amount of bullets to load
    this.count = 1; //says when to push new bullet
    this.pos = createVector(x, y); //position of pattern;
    this.rotationRate = rotationRate;
  }
  draw() {
    for (var i = 1; i < this.bullets.length; i++) {
      this.bullets[i].update();
      this.bullets[i].draw();
    }
  }
  update() {
    if (floor(this.dt) >= this.rotationRate && this.count !== this.amount) {
      this.loadBullet();
      this.dt = 0;
      this.count++;
    } else {
      this.dt++;
    }
  }
}

class Spiral extends Pattern {
  loadBullet() {
    const segment = 360 / this.amount;
    const angle = segment * this.count;
    this.bullets.push(new Bullet(this.pos.x, this.pos.y, cos(angle), sin(angle)));
  }
}

function draw() {
  background(0);
  // spiral.draw();
  // spiral.update();
  spiral2.draw();
  spiral2.update();

}